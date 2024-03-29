import React, { ReactNode } from "react";
import { styled, keyframes } from "@stitches/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});

const AccordionContent = styled(AccordionPrimitive.Content, {
  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

export const Accordion = ({
  items,
  activeTab,
  setActiveTab,
  className,
}: {
  items: { trigger: ReactNode; content: ReactNode }[];
  activeTab?: number;
  setActiveTab?: (index: number) => void;
  className?: string;
}) => {
  return (
    <AccordionPrimitive.Root
      type="single"
      defaultValue={activeTab?.toString()}
      onValueChange={(value) => setActiveTab?.(Number(value))}
      collapsible={true}
      className={className}
    >
      {items.map(({ trigger, content }, index) => (
        <AccordionPrimitive.Item
          key={index}
          value={index.toString()}
          className="overflow-hidden bg-white last:border-none"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between border-b border-gray-100 py-3 ">
              {trigger}
              <ChevronDownIcon
                aria-hidden
                className="group-radix-state-open:rotate-180 mr-6 h-5 w-5 text-gray-600 transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent>{content}</AccordionContent>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
};
