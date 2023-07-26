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
import { GoogleOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LinkComp from "./Link";

const formSchema = z
    .object({
        companyName: z
            .string({ required_error: "Digite o nome da empresa." })
            .min(2, { message: "Deve ter 2 ou mais caracteres." }),
        email: z.string().email({ message: "Email inválido" }),
        password: z
            .string()
            .min(5, { message: "Deve ter 5 ou mais caracteres." }),
        confirm: z
            .string()
            .min(5, { message: "Deve ter 5 ou mais caracteres." }),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Senha não coincide, tente novamente.",
        path: ["confirm"],
    });

const SignupForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            email: "",
            password: "",
            confirm: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <div className="mx-auto w-2/3 lg:w-full px-4 py-12 lg:py-4 lg:px-20 xl:px-24 sm:px-6">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Crie uma Conta
            </h2>
            <p className="mt-2 text-sm mb-8">
                Ou{" "}
                <LinkComp className="text-red-600 hover:text-red-900" href="#">
                    acesse sua conta
                </LinkComp>
            </p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
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
                    <Button
                        className="w-full"
                        onClick={() => console.log("oi")}
                        type="submit"
                    >
                        Cadastrar
                    </Button>
                    <Button
                        variant="secondary"
                        className="w-full flex items-center gap-2"
                        onClick={() => console.log("oi")}
                        type="submit"
                    >
                        <GoogleOutlined style={{ fontSize: "20px" }} />
                        Entrar com Google
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignupForm;
