import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFoundPage({ timeout }) {
  const router = useRouter();

  useEffect(() => {
    if (timeout) {
      setTimeout(() => {
        router.push(`/`);
      }, timeout);
    }
  }, []);

  return "Страница не найдена!";
}
