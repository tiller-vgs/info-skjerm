import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider, CssBaseline, Paper } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "react-toastify";
import { announcementSchema } from "../lib/schema";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function AnnouncementForm() {
  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(data: z.infer<typeof announcementSchema>) {
    console.log(data);
    toast.success("Kunngjøring opprettet!");
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Paper>
        <form id="announcement" onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button type="submit" form="announcement" variant="contained">
          Lag ny kunngjøring
        </Button>
      </Paper>
    </ThemeProvider>
  );
}

export default AnnouncementForm;
