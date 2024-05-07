// pages/signout.js
"use client";

import { handleSignOut } from "@/actions";
import { useEffect } from "react";

export default function SignOut() {
  useEffect(() => {
    handleSignOut();
  }, []);

  // const handleSignOutVerify = async () => {
  //   const response = await handleSignOut();
  //   console.log(response);
  // };

  return (
    <main className=" flex flex-col items-center justify-center min-h-screen ">
      <h1>Signing out...</h1>
    </main>
  );
}
