import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider, CssBaseline, Paper } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import z from "zod";
import { toast } from "react-toastify";
import { announcementSchema } from "../lib/schema";
import type { AnnouncementType } from "@types";
import { useAnnouncementMutations } from "../hooks/useAnouncements";

// Definerer mørkt tema med MUI
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

type AnnouncementFormProps = {
  initialAnnouncement?: AnnouncementType;
  submitLabel?: string;
  onSubmitted?: () => void;
};

function AnnouncementForm({
  initialAnnouncement,
  submitLabel = "Lag ny kunngjøring",
  onSubmitted,
}: AnnouncementFormProps) {
  const { createAnnouncement, updateAnnouncement } = useAnnouncementMutations();
  const isEditing = Boolean(initialAnnouncement?.id);
  const today = new Date().toISOString().slice(0, 10);

  // Setter opp skjema med validering via zod
  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: initialAnnouncement?.title ?? "",
      content: initialAnnouncement?.content ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      title: initialAnnouncement?.title ?? "",
      content: initialAnnouncement?.content ?? "",
    });
  }, [form, initialAnnouncement]);

  // Kjøres når skjemaet sendes inn
  async function onSubmit(data: z.infer<typeof announcementSchema>) {
    const payload: AnnouncementType = {
      ...(initialAnnouncement?.id ? { id: initialAnnouncement.id } : {}),
      title: data.title,
      content: data.content,
      dateStart: initialAnnouncement?.dateStart ?? today,
      dateEnd: initialAnnouncement?.dateEnd ?? today,
    };

    try {
      if (isEditing) {
        await updateAnnouncement.mutateAsync(payload);
        toast.success("Kunngjøring oppdatert!");
      } else {
        await createAnnouncement.mutateAsync(payload);
        toast.success("Kunngjøring opprettet!");
        form.reset({ title: "", content: "" });
      }

      onSubmitted?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Noe gikk galt.");
    }
  }

  return (
    // Bruker mørkt tema på hele komponenten
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Paper>
        <form id="announcement" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Tittel-felt */}
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                id="announcement-title"
                sx={{ marginBottom: 1 }}
                label="title"
                placeholder="text"
                autoComplete="on"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                fullWidth
                required
              />
            )}
          />

          {/* Innhold-felt */}
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                id="announcement-content"
                sx={{ marginBottom: 1 }}
                label="content"
                placeholder="text"
                autoComplete="on"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                fullWidth
                required
              />
            )}
          />
        </form>

        {/* Send-inn knapp */}
        <Button type="submit" form="announcement" variant="contained">
          {submitLabel}
        </Button>
      </Paper>
    </ThemeProvider>
  );
}

export default AnnouncementForm;
