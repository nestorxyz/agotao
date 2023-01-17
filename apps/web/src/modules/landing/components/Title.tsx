import { Button } from "@/shared/components";

export const Title: React.FC = () => {
  return (
    <div className="relative my-4 mt-16 max-w-[800px] space-y-5 md:mt-28">
      <h1 className="text-center text-[40px] font-extrabold leading-[45px] sm:text-5xl md:text-6xl">
        Acepta pagos en Perú desde tu sitio web
      </h1>
      <p className="text-center text-lg text-gray-500">
        Con las APIs y pasarela de pagos de Agotao puedes integrar pagos en tu
        sitio web en minutos.
      </p>
      <Button
        filled
        color="primary"
        size="large"
        className="mx-auto w-fit px-6"
      >
        Crea tu cuenta
      </Button>
    </div>
  );
};
