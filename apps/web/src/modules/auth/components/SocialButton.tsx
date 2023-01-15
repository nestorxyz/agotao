import classNames from "classnames";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export interface SocialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  social: "facebook" | "google";

  className?: string;
}

export const SocialButton: React.FC<SocialButtonProps> = (props) => {
  const { social, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={classNames(
        className,
        social === "facebook" && " text-[#2374f2]",
        social === "google" && " text-gray-600",
        "flex h-12 w-full items-center justify-center whitespace-nowrap rounded-full border border-gray-50 bg-white px-4 text-base font-semibold shadow-sm transition-all",
      )}
    >
      {social === "facebook" && <BsFacebook className="mr-2 h-6 w-6" />}
      {social === "google" && <FcGoogle className="mr-2 h-6 w-6" />}
      {social === "facebook" && "Facebook"}
      {social === "google" && "Google"}
    </button>
  );
};
