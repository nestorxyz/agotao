import React from "react";
import { MjmlText } from "mjml-react";
import { fontWeight } from "../theme";

type H3Props = {
  maxWidth?: number;
} & React.ComponentProps<typeof MjmlText>;

export default function Text({ children }: H3Props) {
  return (
    <MjmlText color={"#515151"} fontWeight={fontWeight.bold}>
      {children}
    </MjmlText>
  );
}
