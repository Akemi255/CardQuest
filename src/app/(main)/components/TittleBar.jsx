import React from "react";

export default function TittleBar() {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Daily Drop Card
        </h2>
        <p className="text-sm text-muted-foreground">
          Pick daily card featuring your favorite character.
        </p>
      </div>
    </div>
  );
}
