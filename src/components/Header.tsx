import { Button, ButtonGroup, IconButton, Input, Text } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BiSearch, BiUser, BiCart } from "react-icons/bi";

type Props = {};

const Header: React.FC<Props> = () => {
  const session = useSession();
  return (
    <div className="fixed w-full pl-4 pr-4 h-16 flex justify-between shadow-md bg-gray-200 z-50">
      <Link href="/">
        <div className="h-full flex items-center cursor-pointer">
          <Text className="font-bold text-lg">TEMPLATE</Text>
        </div>
      </Link>
      <form className="h-full flex items-center">
        <Input
          type="text"
          placeholder="Search"
          variant="filled"
          roundedTopRight="none"
          roundedBottomRight="none"
        />
        <IconButton
          icon={<BiSearch />}
          type="submit"
          aria-label="search product"
          roundedTopLeft="none"
          roundedBottomLeft="none"
        />
      </form>
      <div className="h-full flex items-center">
        <ButtonGroup>
          <IconButton icon={<BiCart />} aria-label="cart" />
          {session.status === "authenticated" ? (
            <>
              <IconButton icon={<BiUser />} aria-label="profile" />
              <Button onClick={() => signOut()}>SIGN OUT</Button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button>SIGN IN</Button>
              </Link>
              <Link href="/signup">
                <Button>SIGN UP</Button>
              </Link>
            </>
          )}
          {session.data?.isAdmin ? (
            <Link href="/admin">
              <Button>ADMIN</Button>
            </Link>
          ) : null}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Header;
