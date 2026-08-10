import type { PropsWithChildren } from "react";
import { authClient } from "../lib/auth-client";
import { Navigate } from "react-router";
import { toast } from "react-toastify";

export const Authorization = ({
  children,
  allowedRoles,
}: PropsWithChildren & { allowedRoles: string[] }) => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;
  if (!session?.user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(session.user.role)) {
    toast.error("You do not have permission to access this page.");
    return <Navigate to="/login" />;
  }

  return children;
};
