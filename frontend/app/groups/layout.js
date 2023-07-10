"use client";

import Amount from "@/components/Amount";

export default function GroupLayout({ children }) {
  return (
    <>
      <Amount />
      {children}
    </>
  );
}
