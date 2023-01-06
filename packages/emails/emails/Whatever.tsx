import React from "react";
import { MjmlSection, MjmlColumn } from "mjml-react";
import { Template } from "mailing-core";
import BaseLayout from "./components/BaseLayout";
import Text from "./components/Text";
import { spacing } from "./theme";

export interface WhateverProps {
  children: React.ReactNode;
}

export const Whatever: Template<WhateverProps> = (props) => {
  const { children } = props;

  return (
    <BaseLayout width={600}>
      <MjmlSection>
        <MjmlColumn>
          <Text paddingTop={spacing.s7} paddingBottom={spacing.s7}>
            {children}
          </Text>
        </MjmlColumn>
      </MjmlSection>
    </BaseLayout>
  );
};
