"use client";

import { logout } from "@/services";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push(`/login`);
  }, []);

  return;
}
