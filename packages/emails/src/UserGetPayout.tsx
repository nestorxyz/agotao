import { MjmlSection, MjmlColumn, MjmlImage, MjmlText } from "mjml-react";

import { colors, fontWeight } from "./theme";

import Divider from "./components/Divider";
import InvoiceLayout from "./components/InvoiceLayout";

interface UserGetPayoutEmailProps {
  amount: string;
  company_logo: string;
  company_name: string;
  date: string;
  name: string;
  payment_method: string;
  payment_method_info: string;

  memo?: string;
}

const UserGetPayoutEmail: React.FC<UserGetPayoutEmailProps> = (props) => {
  const {
    amount,
    company_logo,
    company_name,
    date,
    name,
    payment_method,
    payment_method_info,
    memo,
  } = props;

  return (
    <InvoiceLayout company_logo={company_logo} width={480}>
      <MjmlSection
        backgroundColor={"white"}
        padding="20px 30px 0px 30px"
        borderRadius="12px 12px 0px 0px"
      >
        <MjmlColumn>
          <MjmlText color={colors.black[500]} fontWeight={fontWeight.bold}>
            Pago de {company_name}
          </MjmlText>
          <MjmlText
            color={colors.black.DEFAULT}
            fontWeight={fontWeight.medium}
            fontSize="32px"
          >
            {amount}
          </MjmlText>
          <MjmlText color={colors.black[500]}>{date}</MjmlText>
        </MjmlColumn>
        <MjmlColumn>
          <MjmlImage
            src="https://firebasestorage.googleapis.com/v0/b/civil-glyph-372313.appspot.com/o/assets%2Finvoice.png?alt=media&token=c4ecb795-8308-4292-8841-8df3bdcfb807"
            alt="Invoice icon"
            width={100}
            align="right"
          />
        </MjmlColumn>
      </MjmlSection>

      <MjmlSection backgroundColor={"white"}>
        <MjmlColumn>
          <Divider padding={"24px 30px"} />
        </MjmlColumn>
      </MjmlSection>

      <MjmlSection
        backgroundColor={"white"}
        padding="0px 30px"
        textAlign="left"
      >
        <MjmlColumn width={80}>
          <MjmlText color={colors.black[500]}>Para</MjmlText>
        </MjmlColumn>
        <MjmlColumn>
          <MjmlText color={colors.black.DEFAULT} fontWeight={fontWeight.medium}>
            {name}
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
      <MjmlSection
        backgroundColor={"white"}
        padding="0px 30px"
        textAlign="left"
      >
        <MjmlColumn width={80}>
          <MjmlText color={colors.black[500]}>De</MjmlText>
        </MjmlColumn>
        <MjmlColumn>
          <MjmlText color={colors.black.DEFAULT} fontWeight={fontWeight.medium}>
            {company_name}
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
      {memo && (
        <MjmlSection
          backgroundColor={"white"}
          padding="0px 30px"
          textAlign="left"
        >
          <MjmlColumn width={80}>
            <MjmlText color={colors.black[500]}>Mensaje</MjmlText>
          </MjmlColumn>
          <MjmlColumn>
            <MjmlText
              color={colors.black.DEFAULT}
              fontWeight={fontWeight.medium}
            >
              {memo}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      )}
      <MjmlSection
        backgroundColor={"white"}
        padding="0px 30px"
        textAlign="left"
      >
        <MjmlColumn width={80}>
          <MjmlText color={colors.black[500]}>Método</MjmlText>
        </MjmlColumn>
        <MjmlColumn>
          <MjmlText color={colors.black.DEFAULT} fontWeight={fontWeight.medium}>
            {payment_method} - {payment_method_info}
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>

      <MjmlSection
        backgroundColor={"white"}
        padding="0px 30px 30px 30px"
        borderRadius="0px 0px 12px 12px"
      >
        <MjmlColumn></MjmlColumn>
      </MjmlSection>
    </InvoiceLayout>
  );
};

export default UserGetPayoutEmail;
