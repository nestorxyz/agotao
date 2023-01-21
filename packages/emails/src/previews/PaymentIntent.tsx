import PaymentIntentMail from "../PaymentIntent";

export const PaymentIntentPreview = () => {
  return (
    <PaymentIntentMail
      company_image="https://scontent.flim20-1.fna.fbcdn.net/v/t39.30808-6/325948175_883618989354809_2872433780187773691_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEfHf_b43te8QueGUSM0kSGdl9Auo3exgF2X0C6jd7GATDBdF-goctyzgQu2qzPu7Elt9A6WHGJvO7SIpuoqdLU&_nc_ohc=lDi8F-BFjHgAX960-oQ&_nc_ht=scontent.flim20-1.fna&oh=00_AfCXfUzPgXmzygLcNZC88PVEzQRGOJ9jr86b0sgeKAiuQQ&oe=63D042F5"
      company_name="Facebook"
      payment_method="Visa"
      products={[
        {
          name: "Producto 1",
          total: "$100",
          quantity: 1,
        },
        {
          name: "Producto 2",
          total: "$200",
          quantity: 2,
        },
      ]}
      total="$500"
    />
  );
};
