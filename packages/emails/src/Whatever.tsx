import React from "react";
import { MjmlSection, MjmlColumn } from "mjml-react";
import { Template } from "mailing-core";
import BaseLayout from "./components/BaseLayout";
import Text from "./components/Text";
import { spacing } from "./theme";

export interface WhateverProps {
  children: React.ReactNode;
}

const Whatever: Template<WhateverProps> = (props) => {
  const { children } = props;

  return (
    <BaseLayout company_name="asds">
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

export default Whatever;
