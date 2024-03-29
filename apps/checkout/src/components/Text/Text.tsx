import React, { PropsWithoutRef, RefAttributes } from "react";
import classNames from "classnames";

import {
  H1 as H1Component,
  H2 as H2Component,
  Subtitle as SubtitleComponent,
} from "./names";

export interface TextProps {
  children: React.ReactNode;

  className?: string;
}

const Text = React.forwardRef<HTMLHeadingElement, TextProps>((props, ref) => {
  const { children, className } = props;

  return <p className={classNames(className, "text-black")}>{children}</p>;
});

Text.displayName = "Text";

type TextComponent<
  T,
  P = Record<string, unknown>,
> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> & {
  H1: typeof H1Component;
  H2: typeof H2Component;
  Subtitle: typeof SubtitleComponent;
};

export default Text as TextComponent<HTMLParagraphElement, TextProps>;
