"use client";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { EventsValues } from "@/types";
import { createEvent } from "@/actions";
import { CreateEventsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export function CreateEvent() {
  const [isPending, startTransistion] = useTransition();

  const form = useForm<EventsValues>({
    resolver: zodResolver(CreateEventsSchema),
    defaultValues: {
      title: "",
      body: "",
      starttime: new Date().toISOString().split("T")[0],
      endtime: undefined,
    },
  });

  function onSubmit(data: EventsValues) {
    startTransistion(async () => {
      const response = await createEvent(data);
      if (response.success) {
        toast({
          title: "Suksess",
          description: response.success,
          variant: "default",
        });
      } else {
        toast({
          title: "Noe gikk galt",
          description:
            response.error || "En feil oppstod. Vennligst prøv igjen",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className=" pr-10 pl-10 pb-20">
      <Form {...form}>
        <div className=" flex items-center justify-center">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-96"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tittel</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informasjon</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-20 items-center justify-center">
              <div className="w-40">
                <FormField
                  control={form.control}
                  name="starttime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-40">
                <FormField
                  control={form.control}
                  name="endtime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slutt</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-center">
                <Button type="submit" disabled={isPending}>
                  Opprett event
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}
