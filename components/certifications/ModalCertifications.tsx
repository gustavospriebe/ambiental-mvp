"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert } from "../ui/alert";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";

interface ModalCertificationsProps {
  sessionId?: string;
  children?: string;
  className?: string;
}

const formSchema = z.object({
  name: z
    .string({ required_error: "Digite o nome da certificação." })
    .min(2, { message: "Deve ter 2 ou mais caracteres." }),
  description: z.string(),
  due: z.date({ required_error: "Selecione o Vencimento" }),
});

const ModalCertifications = ({
  sessionId,
  className,
}: ModalCertificationsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState("none");

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setToast("none");
    try {
      let data = {
        name: values.name,
        description: values.description,
        due: values.due,
      };

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/certifications",
        headers: {
          "session-id": sessionId,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const req = await axios.request(config);

      console.log(req);

      setToast("send");
      if (req.status === 200) {
        router.replace(`/certification/${req.data.newData.id}`);
      }
      return req;
    } catch (error) {
      console.error(`Erro no envio da requisição: ${error}`);

      setToast("error");
    } finally {
      form.reset();
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("", className ?? "")}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Criar nova Certificação</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar nova Certificação</DialogTitle>
            <DialogDescription>
              Preencha os seguintes dados para criar uma nova certificação.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Certificação</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Escreva uma breve descrição da certificação"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="due"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Vencimento</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Escolha uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
          </div>
          {toast === "send" && (
            <Alert>
              <p>
                <span className="font-medium">Sucesso! </span>
                Sua certificação foi criada.
              </p>
            </Alert>
          )}
          {toast === "error" && (
            <Alert variant={"destructive"}>
              <p>
                <span className="font-medium">Erro! </span>
                Sua certificação não pode ser criado, tente novamente.
              </p>
            </Alert>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalCertifications;
