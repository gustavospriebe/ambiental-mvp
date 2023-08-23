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

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(5, { message: "Deve ter 5 ou mais caracteres." }),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.error) {
        setIsError(res.error);
        form.reset();
      }

      // console.log(res);
      if (res?.error === null) router.replace("/home");
    } catch (error) {
      console.error("Erro no envio da requisição:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="m-auto w-3/4 px-4 py-10 sm:w-2/3 sm:px-6 lg:w-full lg:px-20 lg:py-5 xl:px-24">
      <Logo />
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
        Acesse sua conta
      </h2>
      <p className="mb-8 mt-2 text-sm">
        Ou{" "}
        <LinkComp className="text-red-600 hover:text-red-900" href="register">
          crie uma nova conta
        </LinkComp>
      </p>

      {/* componentizar o form de forma a passar a prop pra dizer se é LOGIN ou REGISTRO */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <FormLabel>Senha</FormLabel>
                  <LinkComp
                    className="text-sm text-red-600 hover:text-red-900"
                    href="register"
                  >
                    Esqueceu a senha?
                  </LinkComp>
                </div>
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
            <>
              {" "}
              <Button className="w-full" type="submit">
                Entrar
              </Button>
            </>
          )}
        </form>
      </Form>
      {isError && <h1 className="mt-2">{isError}</h1>}
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
      <p className="mt-4">
        Use user@email.com e password to see the application with data or create a new account.
      </p>
    </div>
  );
};

export default LoginForm;
