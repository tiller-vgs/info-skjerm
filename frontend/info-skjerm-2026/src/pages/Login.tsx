import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { loginSchema } from "../lib/schema";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";
import { redirect } from "react-router";

function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const result = await authClient.signIn.username({
      username: data.username,
      password: data.password,
    });

    if (result.error) {
      toast.error("Login failed", {
        data: {
          title: "Login failed",
          content: result.error.message || "Unable to login",
        },
      });
      return;
    }
    toast.success("Login successful!");
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex items-center justify-center">
      <Paper
        sx={{
          color: "#e2e2e2",
          backgroundColor: "#1e2227",
          width: "100%",
          mt: 10,
          maxWidth: { sm: "md" },
        }}
        variant="elevation"
        elevation={24}
        square={false}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Login
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Login to an existing user
          </Typography>

          <form id="login" onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextField
                  sx={{
                    input: {
                      color: "#e2e2e2",
                    },

                    label: {
                      color: "#e2e2e2",
                    },

                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#e2e2e2",
                      },
                    },
                    paddingBottom: "1rem",
                    paddingTop: "0.1rem",
                  }}
                  {...field}
                  id="login-username"
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
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextField
                  sx={{
                    input: {
                      color: "#e2e2e2",
                    },

                    label: {
                      color: "#e2e2e2",
                    },

                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#e2e2e2",
                      },
                    },
                  }}
                  {...field}
                  id="login-password"
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
          <Button type="submit" form="login" variant="contained">
            Login
          </Button>
        </CardActions>
      </Paper>
    </div>
  );
}

export default Login;
