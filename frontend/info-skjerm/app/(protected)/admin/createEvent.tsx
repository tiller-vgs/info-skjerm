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
import { toast } from "sonner";
import { useTransition } from "react";
import { EventsValues } from "@/types";
import { createEvent } from "@/actions";
import { CreateEventsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function CreateEvent() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<EventsValues>({
    resolver: zodResolver(CreateEventsSchema),
    defaultValues: {
      title: "",
      body: "",
      starttime: formatDate(new Date()),
      endtime: undefined,
    },
  });

  function onSubmit(data: EventsValues) {
    startTransition(async () => {
      const response = await createEvent({
        ...data,
        starttime: new Date(data.starttime),
        endtime: data.endtime ? new Date(data.endtime) : undefined,
      });
      if (response.success) {
        toast(response.success);
      } else {
        toast(response.error || "En feil oppstod. Vennligst prøv igjen");
      }
    });
  }

  return (
    <div className="pr-10 pl-10 pb-20">
      <Form {...form}>
        <div className="flex items-center justify-center">
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
                        <Input
                          {...field}
                          type="date"
                          value={
                            field.value ? formatDate(new Date(field.value)) : ""
                          }
                          onChange={(e) => field.onChange(e.target.value)}
                        />
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
                        <Input
                          {...field}
                          type="date"
                          value={
                            field.value ? formatDate(new Date(field.value)) : ""
                          }
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button type="submit" disabled={isPending}>
                Opprett event
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}
