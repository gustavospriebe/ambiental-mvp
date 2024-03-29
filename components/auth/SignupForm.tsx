"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GoogleOutlined, LoadingOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Logo from "../Logo";
import LinkComp from "./Link";

const formSchema = z
  .object({
    companyName: z
      .string({ required_error: "Digite o nome da empresa." })
      .min(2, { message: "Deve ter 2 ou mais caracteres." }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(5, { message: "Deve ter 5 ou mais caracteres." }),
    confirm: z.string().min(5, { message: "Deve ter 5 ou mais caracteres." }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Senha não coincide, tente novamente.",
    path: ["confirm"],
  });

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        name: values.companyName,
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error === null) router.replace("/login");
    } catch (error) {
      console.error(`Erro no envio da requisição: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="m-auto w-3/4 px-4 py-10 sm:w-2/3 sm:px-6 lg:w-full lg:px-20 lg:py-5 xl:px-24">
      <Logo />
      <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
        Crie uma Conta
      </h2>
      <p className="mb-6 mt-2 text-sm">
        Ou{" "}
        <LinkComp className="text-red-600 hover:text-red-900" href="/login">
          acesse sua conta
        </LinkComp>
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Empresa</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? (
            <Button className="w-full" type="submit">
              <LoadingOutlined style={{ fontSize: "20px" }} />
            </Button>
          ) : (
            <Button className="w-full" type="submit">
              Cadastrar
            </Button>
          )}
        </form>
      </Form>
      {isLoading ? (
        <Button
          variant="secondary"
          className="mt-4 flex w-full items-center gap-2"
          type="submit"
        >
          <LoadingOutlined style={{ fontSize: "20px" }} />
        </Button>
      ) : (
        <Button
          variant="secondary"
          disabled
          className="mt-4 flex w-full items-center gap-2"
          type="submit"
        >
          <GoogleOutlined style={{ fontSize: "20px" }} />
          Entrar com Google
        </Button>
      )}
    </div>
  );
};

export default SignupForm;
