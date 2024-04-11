"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function page() {
  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  return (
    <form>
      <Input onChange={handleChange} />
      <Input type="submit" placeholder="submit" />
    </form>
  );
}
