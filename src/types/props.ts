import React from "react";

export type ButtonProps = {
  color: "primary" | "secondary";
  roundness: "sm-rounded" | "rounded";
  classNames?: string;
  children: React.ReactNode;
};
