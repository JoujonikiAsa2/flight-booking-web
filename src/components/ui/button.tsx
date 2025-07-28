import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn("w-fit h-10 p-2 rounded mt-2", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
