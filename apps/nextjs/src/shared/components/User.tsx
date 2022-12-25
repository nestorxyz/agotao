import Image from "next/image";
import { PersonIcon } from "@radix-ui/react-icons";

export interface UserProps {
  image?: string;
  name: string;
  username: string;
}

export const User: React.FC<UserProps> = (props) => {
  const { image, name, username } = props;

  return (
    <div className="space-x-2">
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
