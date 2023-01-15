import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const { children, content } = props;

  return (
    <TooltipPrimitive.Provider delayDuration={500}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content>{content}</TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
