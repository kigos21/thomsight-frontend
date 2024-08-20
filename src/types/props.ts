import React from "react";

export type ButtonProps = {
  children: React.ReactNode;
  color: "primary" | "secondary";
  roundness: "sm-rounded" | "rounded";

  classNames?: string;
  style?: React.CSSProperties;
};

export type StyledBoxProps = {
  children: React.ReactNode;
  bgColor?: string;
  border?: string;

  classNames?: string;
  style?: React.CSSProperties;
};

export type PaddedContainerProps = {
  children: React.ReactNode;

  classNames?: string;
  style?: React.CSSProperties;
};
