import { MjmlSection, MjmlColumn, MjmlText, MjmlRaw } from "mjml-react";
import { colors, fontSize, fontWeight } from "../theme";

type FooterProps = {
  company_name: string;
};

export default function Footer({ company_name }: FooterProps) {
  return (
    <>
      <MjmlSection paddingTop={48}>
        <MjmlColumn>
          <MjmlRaw>
            <tr>
              <td>
                <table
                  border={0}
                  cellPadding={0}
                  cellSpacing={0}
                  role="presentation"
                  width="100%"
                >
                  <tr>
                    <td width="50%" align="right">
                      <a href="https://twitter.com/_agotao">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/civil-glyph-372313.appspot.com/o/assets%2Ftwitter.png?alt=media&token=c68291b0-26b0-43ad-bd5e-e2406c514942"
                          alt="Twitter Logo"
                          height="40px"
                          width="40px"
                          style={{
                            border: 0,
                            display: "block",
                            outline: "none",
                            textDecoration: "none",
                            fontSize: 16,
                            height: 40,
                            width: 40,
                            paddingRight: 6,
                          }}
                        />
                      </a>
                    </td>
                    <td width="50%">
                      <a href="https://www.linkedin.com/company/agotao">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/civil-glyph-372313.appspot.com/o/assets%2Flinkedin.png?alt=media&token=79773483-4830-4755-82af-a4f7723c9c74"
                          alt="LinkedIn Logo"
                          height="40px"
                          width="40px"
                          style={{
                            border: 0,
                            display: "block",
                            outline: "none",
                            textDecoration: "none",
                            fontSize: 16,
                            height: 40,
                            width: 40,
                            paddingLeft: 6,
                          }}
                        />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </MjmlRaw>
        </MjmlColumn>
      </MjmlSection>
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
            color={colors.black.DEFAULT}
          >
            © {new Date().getFullYear()} Agotao. Todos los derechos reservados.
            Construido con ❤️ en Perú.
          </MjmlText>

          <MjmlText
            fontSize={fontSize.xs}
            color={colors.black.DEFAULT}
            align="center"
          >
            Recibes este correo porque has hecho una compra en {company_name},
            que usa los servicios de <b>Agotao</b> para el procesamiento de
            pagos.
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
    </>
  );
}
