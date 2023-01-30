import React from "react";
import {
  Mjml,
  MjmlBody,
  MjmlHead,
  MjmlFont,
  MjmlStyle,
  MjmlAttributes,
  MjmlAll,
  MjmlRaw,
  MjmlPreview,
  MjmlWrapper,
  MjmlSection,
  MjmlColumn,
  MjmlImage,
} from "mjml-react";
import SimpleFooter from "./SimpleFooter";
import { themeDefaults } from "../theme";

type InvoiceLayoutProps = {
  company_logo: string;
  children: React.ReactNode;
  preview?: string;
  width?: number;
};

export default function InvoiceLayout({
  company_logo,
  children,
  preview,
  width = 640,
}: InvoiceLayoutProps) {
  return (
    <Mjml>
      <MjmlHead>
        {preview && <MjmlPreview>{preview}</MjmlPreview>}
        <MjmlRaw>
          <meta name="color-scheme" content="light" />
          <meta name="supported-color-schemes" content="light" />
        </MjmlRaw>
        <MjmlFont
          name="Manrope"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700"
        />
        <MjmlAttributes>
          <MjmlAll {...themeDefaults} />
        </MjmlAttributes>
        <MjmlStyle>{`
          body {
            -webkit-font-smoothing: antialiased;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
          @media only screen and (max-width: 480px) {
            .hidden-mobile {
              display: none !important;
            } 
          }
          @media only screen and (min-width: 480px) {
            .hidden-desktop {
              display: none !important;
            }
          }
      `}</MjmlStyle>
      </MjmlHead>

      <MjmlBody width={width} backgroundColor="#f6f9fb">
        <MjmlWrapper fullWidth={true} padding="24px 16px">
          <MjmlSection paddingBottom={16}>
            <MjmlColumn>
              <MjmlImage align="left" width={120} src={company_logo} />
            </MjmlColumn>
          </MjmlSection>

          {children}

          <SimpleFooter />
        </MjmlWrapper>
      </MjmlBody>
    </Mjml>
  );
}
