import {
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BiSearch, BiUser, BiCart } from "react-icons/bi";

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <div className="fixed w-full pl-4 pr-4 h-16 flex justify-between shadow-md bg-gray-200">
      <div className="h-full flex items-center">
        <Text className="font-bold text-lg">TEMPLATE</Text>
      </div>
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
          <IconButton icon={<BiUser />} aria-label="profile" />
          <Button>SIGN IN</Button>
          <Button>SIGN UP</Button>
          <Link href="/admin">
            <Button>ADMIN</Button>
          </Link>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Header;
