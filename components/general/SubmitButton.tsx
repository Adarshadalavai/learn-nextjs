"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-fit" disabled={pending}>
      {pending ? "Submitting" : "Submit"}
    </Button>
  );
}
