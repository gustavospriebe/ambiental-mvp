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
import { ForwardOutlined, GoogleOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LinkComp from "./Link";

const formSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(5, { message: "Deve ter 5 ou mais caracteres." }),
});

const SignupForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // setIsLoading(loading => !loading)

        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <div className="m-auto w-3/4 sm:w-2/3 lg:w-full px-4 py-10 lg:py-5 lg:px-20 xl:px-24 sm:px-6">
            <ForwardOutlined rotate={270} style={{ fontSize: "40px" }} />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Acesse sua conta
            </h2>
            <p className="mt-2 text-sm mb-8">
                Ou{" "}
                <LinkComp
                    className="text-red-600 hover:text-red-900"
                    href="register"
                >
                    crie uma nova conta
                </LinkComp>
            </p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
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
                                        className="text-red-600 text-sm hover:text-red-900"
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

                    <Button
                        className="w-full"
                        onClick={() => console.log("oi")}
                        type="submit"
                    >
                        Entrar
                    </Button>
                    <Button
                        variant="secondary"
                        className="w-full flex items-center gap-2"
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
