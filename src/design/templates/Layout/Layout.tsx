import style from "./Layout.styles";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      layout
      {children}
    </>
  );
};
