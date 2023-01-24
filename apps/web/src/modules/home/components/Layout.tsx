import { HomeScreen } from "@/modules/home/types";
import { Button } from "@/shared/components";

interface LayoutProps {
  children: React.ReactNode;
  setScreen: (screen: HomeScreen) => void;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col p-6 md:flex-row md:p-8">
      {/* <section className="w-full space-y-4 md:max-w-xs md:px-8">
        <Button
          className="w-full"
          color="black"
          ghost
          onClick={() => props.setScreen(HomeScreen.project)}
        >
          Proyecto
        </Button>
        <Button
          className="w-full"
          color="black"
          ghost
          onClick={() => props.setScreen(HomeScreen.project)}
        >
          Developers
        </Button>
      </section> */}
      <section className="mx-auto max-w-3xl flex-1">{children}</section>
    </main>
  );
};
