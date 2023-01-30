import UserGetPayoutEmail from "../UserGetPayout";

export const UserGetPayoutPreview = () => {
  return (
    <UserGetPayoutEmail
      amount="S/ 1,000.00"
      company_logo="https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?w=2000"
      company_name="Fake Store"
      date="2021-01-01"
      name="John Doe"
      memo="Pago de prueba"
      payment_method="BCP"
      payment_method_info="1234567890123456"
    />
  );
};
