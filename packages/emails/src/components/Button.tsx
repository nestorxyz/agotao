import React from "react";
import { MjmlButton } from "mjml-react";

import { colors, fontSize, borderRadius, lineHeight } from "../theme";

type ButtonProps = React.ComponentProps<typeof MjmlButton>;

export default function Button(props: ButtonProps) {
  return (
    <MjmlButton
      lineHeight={lineHeight.tight}
      fontSize={fontSize.base}
      padding="12px 0px 0px"
      innerPadding="16px 24px"
      align="left"
      backgroundColor={colors.primary.DEFAULT}
      color={"white"}
      borderRadius={borderRadius.base}
      {...props}
    />
  );
}
