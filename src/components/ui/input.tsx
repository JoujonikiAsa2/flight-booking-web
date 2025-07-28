import React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("border w-full h-10 p-2 rounded focus:outline-1", className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
