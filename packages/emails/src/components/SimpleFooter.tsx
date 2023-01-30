import { MjmlSection, MjmlColumn, MjmlText, MjmlImage } from "mjml-react";
import { colors, fontSize, fontWeight } from "../theme";

export default function SimpleFooter() {
  return (
    <>
      <MjmlSection paddingTop={48} cssClass="hidden-mobile">
        <MjmlColumn verticalAlign="middle" width={80}>
          <MjmlText
            fontWeight={fontWeight.normal}
            fontSize={14}
            color={colors.black[400]}
          >
            Powered by
          </MjmlText>
        </MjmlColumn>
        <MjmlColumn width={65} verticalAlign="middle">
          <MjmlImage
            src="https://firebasestorage.googleapis.com/v0/b/civil-glyph-372313.appspot.com/o/assets%2Fagotao-h49.png?alt=media&token=5bab2889-2c0a-4ae8-8565-dade391d5cfc"
            alt="Agotao Logo"
            width={65}
            height={22}
            href="https://agotao.com"
          />
        </MjmlColumn>
        <MjmlColumn width={20} verticalAlign="middle">
          <MjmlImage
            src="https://firebasestorage.googleapis.com/v0/b/civil-glyph-372313.appspot.com/o/assets%2Fvertical-separator.png?alt=media&token=c57c83ef-8e6e-407d-8f80-368a8fd962a9"
            alt="Vertical Separator"
            width={20}
          />
        </MjmlColumn>
        <MjmlColumn width={20} verticalAlign="middle">
          <MjmlImage
            src="https://firebasestorage.googleapis.com/v0/b/civil-glyph-372313.appspot.com/o/assets%2Ftwitter.png?alt=media&token=c68291b0-26b0-43ad-bd5e-e2406c514942"
            alt="Twitter Logo"
            width={20}
            href="https://twitter.com/_agotao"
          />
        </MjmlColumn>
        <MjmlColumn width={10} verticalAlign="middle"></MjmlColumn>
        <MjmlColumn width={20} verticalAlign="middle">
          <MjmlImage
            src="https://firebasestorage.googleapis.com/v0/b/civil-glyph-372313.appspot.com/o/assets%2Flinkedin.png?alt=media&token=79773483-4830-4755-82af-a4f7723c9c74"
            alt="LinkedIn Logo"
            width={20}
            href="https://www.linkedin.com/company/agotao"
          />
        </MjmlColumn>
      </MjmlSection>

      {/* <MjmlSection paddingTop={48} mjClass="hidden-desktop">
        <MjmlColumn verticalAlign="middle" width={80}>
          <MjmlText
            fontWeight={fontWeight.normal}
            fontSize={14}
            color={colors.black[400]}
            align="center"
          >
            Powered by
          </MjmlText>
        </MjmlColumn>
        <MjmlColumn width={65} verticalAlign="middle">
          <MjmlImage
            src="https://firebasestorage.googleapis.com/v0/b/civil-glyph-372313.appspot.com/o/assets%2Fagotao-h49.png?alt=media&token=5bab2889-2c0a-4ae8-8565-dade391d5cfc"
            alt="Agotao Logo"
            width={65}
            height={22}
            href="https://agotao.com"
          />
        </MjmlColumn>
      </MjmlSection> */}

      <MjmlSection
        paddingTop={16}
        paddingBottom={32}
        paddingLeft={10}
        paddingRight={10}
      >
        <MjmlColumn>
          <MjmlText
            fontSize={fontSize.xs}
            fontWeight={fontWeight.bold}
            align="center"
            color={colors.black[400]}
          >
            © {new Date().getFullYear()}{" "}
            <a href="https://agotao.com/">Agotao</a>. Todos los derechos
            reservados.
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
    </>
  );
}
