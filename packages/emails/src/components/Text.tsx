import React from "react";
import { MjmlText } from "mjml-react";

type TextProps = {
  maxWidth?: number;
} & React.ComponentProps<typeof MjmlText>;

export default function Text({ children }: TextProps) {
  return <MjmlText color={"#515151"}>{children}</MjmlText>;
}
