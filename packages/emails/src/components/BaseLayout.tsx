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
import Footer from "./Footer";
import { themeDefaults } from "../theme";

type BaseLayoutProps = {
  company_name: string;
  children: React.ReactNode;
  preview?: string;
};

export default function BaseLayout({
  company_name,
  children,
  preview,
}: BaseLayoutProps) {
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
      `}</MjmlStyle>
      </MjmlHead>

      <MjmlBody width={640} backgroundColor="#fdfdfd">
        <MjmlWrapper fullWidth={true} padding="24px 16px">
          <MjmlSection paddingBottom={24} backgroundColor="white">
            <MjmlColumn>
              <MjmlImage
                height={10}
                src="https://firebasestorage.googleapis.com/v0/b/civil-glyph-372313.appspot.com/o/assets%2Fcover.png?alt=media&token=c0d0c0ae-2601-44ba-8ca1-9e1c7902bde1"
              />
            </MjmlColumn>
          </MjmlSection>

          {children}

          <Footer company_name={company_name} />
        </MjmlWrapper>
      </MjmlBody>
    </Mjml>
  );
}
