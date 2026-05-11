import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";
import { redirect } from "react-router";
import { registerSchema } from "../lib/schema";

function Registrer() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    const result = await authClient.signUp.email({
      email: data.email,
      username: data.username,
      name: data.name,
      password: data.password,
    });

    if (result.error) {
      toast.error("Registration failed", {
        data: {
          title: "Registration failed",
          content: result.error.message || "Unable to register",
        },
      });
      return;
    }
    toast.success("Registration successful!");
    form.reset();
    redirect("/dashboard");
  }
  return (
    <div>
      <Card sx={{ width: "100%", maxWidth: { sm: "md" } }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Register
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Create a new account
          </Typography>

          <form id="register" onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="register-username"
                  sx={{ marginBottom: 1 }}
                  label="Username"
                  placeholder="Ola123"
                  autoComplete="off"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="register-name"
                  sx={{ marginBottom: 1 }}
                  label="Name"
                  placeholder="Ola Nordmann"
                  autoComplete="off"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="register-email"
                  sx={{ marginBottom: 1 }}
                  label="Email"
                  placeholder="ola@eksempel.no"
                  autoComplete="off"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="register-password"
                  sx={{ marginBottom: 1 }}
                  label="Password"
                  type="password"
                  placeholder="********"
                  autoComplete="off"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
          </form>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2, flexWrap: "wrap", gap: 1 }}>
          <Button type="submit" form="register" variant="contained">
            Register
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Registrer;
