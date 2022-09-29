import { Button, ButtonGroup, IconButton, Text } from "@chakra-ui/react";
import { BiUser } from "react-icons/bi";
import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <div className="fixed w-full pl-4 pr-4 h-16 flex justify-between shadow-md bg-gray-200 z-50">
      <div className="h-full flex items-center">
        <Link href="/admin">
          <Text className="font-bold text-lg cursor-pointer">
            ADMIN TEMPLATE
          </Text>
        </Link>
      </div>
      <div className="h-full flex items-center">
        <ButtonGroup>
          <IconButton icon={<BiUser />} aria-label="profile" />
          <Button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            SIGN OUT
          </Button>
          <Link href="/">
            <Button>TO SHOP</Button>
          </Link>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Header;
