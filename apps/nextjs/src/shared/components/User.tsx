import Image from "next/image";
import classNames from "classnames";
import { PersonIcon } from "@radix-ui/react-icons";

export interface UserProps {
  image?: string;
  name: string;
  username: string;

  className?: string;
  onClick?: () => void;
}

export const User: React.FC<UserProps> = (props) => {
  const { image, name, username, className, onClick } = props;

  return (
    <div
      className={classNames(className, "flex space-x-2 p-3")}
      onClick={onClick}
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="h-12 w-12 rounded-full">
          <PersonIcon />
        </div>
      )}
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-gray-500">@{username}</div>
      </div>
    </div>
  );
};
