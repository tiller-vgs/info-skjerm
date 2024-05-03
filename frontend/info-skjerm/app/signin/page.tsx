"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoginValue } from "@/types";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { LoginSchema } from "@/schemas";

export default function LogIn() {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginValue) => {
    startTransition(async () => {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (result && result.error) {
        if (result.error === "CredentialsSignin") {
          toast({
            title: "Feil",
            description: "Ugyldig legitimasjon eller bruker eksisterer ikke",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Feil",
            description: "En feil oppstod. Vennligst prøv igjen",
            variant: "destructive",
          });
        }
      } else {
        window.location.href = "/min-side";
      }
    });
  };

  return (
    <>
      <head>
        <title>Logg inn</title>
        <meta name="description" content="Logg inn" />
      </head>
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <Card className=" w-[400]">
          <CardHeader>
            <CardTitle className="font-bold">Logg inn</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-post</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            id="email"
                            type="email"
                            placeholder="Email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passord</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="password"
                            id="Password"
                            placeholder="Password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-3">
                  <Link href="/auth/register">
                    <Button className="w-full" variant="outline">
                      Har du ikke konto?
                    </Button>
                  </Link>
                  <Button
                    className="w-full"
                    variant="secondary"
                    type="submit"
                    disabled={isPending}
                  >
                    Logg inn
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
