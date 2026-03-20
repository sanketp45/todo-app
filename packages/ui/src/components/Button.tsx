"use client";

import { ButtonHTMLAttributes, useState } from "react";
import { motion } from "framer-motion";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = ({
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const [pressed, setPressed] = useState(false);
  const DEPTH = size === "md" ? 6 : 5;

  return (
    <motion.button
      className={["btn", `btn--${variant}`, `btn--${size}`, disabled ? "btn--disabled" : "", className]
        .filter(Boolean)
        .join(" ")}
      initial={{ boxShadow: `0 ${DEPTH}px 0 0 #000000`, y: 0 }}
      whileHover={
        !disabled
          ? { scale: 1.02, boxShadow: `0 ${DEPTH + 2}px 0 0 #000000`, transition: { duration: 0.1 } }
          : {}
      }
      whileTap={
        !disabled
          ? { scale: 0.98, y: DEPTH, boxShadow: "0 0px 0 0 #000000", transition: { duration: 0.08 } }
          : {}
      }
      animate={{
        y: pressed ? DEPTH : 0,
        boxShadow: pressed ? "0 0px 0 0 #000000" : `0 ${DEPTH}px 0 0 #000000`,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseDown={() => { if (!disabled) setPressed(true); }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={(e) => { if (onClick && !disabled) onClick(e); }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

Button.displayName = "Button";
