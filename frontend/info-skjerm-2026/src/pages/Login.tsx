import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { loginSchema } from "../lib/schema";
import { signIn } from "../lib/auth-client";


function login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const result = await signIn.username({
      username: data.username,
      password: data.password,
    });

    if (result.error) {
      toast.error("Login failed", {
      description: result.error.message || "Unable to login",
      });
      return;
    }
    toast.success("Login successful!");
  }
  return (
    <Box display="flex" justifyContent="center">
      <Card sx={{ width: "100%", mt: 10, maxWidth: { sm: "md" } }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Login
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Login to an existing user
          </Typography>

          <Box
            component="form"
            id="login"
            onSubmit={form.handleSubmit(onSubmit)}
            display="flex"
            flexDirection="column"
            gap={2}
            mt={2}
          >
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextField
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
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2, flexWrap: "wrap", gap: 1 }}>
          <Button type="submit" form="login" variant="contained">
            Login
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default login;
