import Image from "next/image";
import Link from "next/link";
import { TwitterLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export const Footer: React.FC = () => {
  return (
    <footer className="px-4 py-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] sm:p-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="https://agotao.com/" className="flex items-center">
              <Image
                src="/isotipo.svg"
                width={124}
                height={30}
                className="mr-3 h-8"
                alt="Agotao Logo"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">
                Enlaces
              </h2>
              <ul className="text-gray-600">
                <li className="mb-4">
                  <a
                    href="https://demo.agotao.com/"
                    className="hover:underline"
                  >
                    Demo
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.agotao.com/"
                    className="hover:underline"
                  >
                    Documentación{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 ">
                Síguenos
              </h2>
              <ul className="text-gray-600 ">
                <li className="mb-4">
                  <a
                    href="https://twitter.com/_agotao"
                    className="hover:underline"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/agotao/"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            {/* <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              Legal
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div> */}
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2023{" "}
            <Link href="https://agotao.com/" className="hover:underline">
              Agotao
            </Link>
            . Todos los derechos reservados. Construido con ❤️ en Perú.
          </span>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <a
              href="https://twitter.com/_agotao"
              className="text-gray-500 hover:text-gray-900"
            >
              <TwitterLogoIcon className="h-6 w-6" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="https://www.linkedin.com/company/agotao/"
              className="text-gray-500 hover:text-gray-900"
            >
              <LinkedInLogoIcon className="h-6 w-6" />
              <span className="sr-only">LinkedIn account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
