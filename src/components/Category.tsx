import { Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

type Props = {};
type ItemProps = {
  children: ReactNode;
  to: string;
};

const Item: React.FC<ItemProps> = ({ children, to }) => {
  return (
    <Link href={to}>
      <a className="cursor-pointer hover:bg-gray-200 p-2 flex justify-between items-center w-40 rounded-md">
        <Text className="">{children}</Text>
        <Icon color="GrayText" as={MdKeyboardArrowRight} />
      </a>
    </Link>
  );
};

const Category: React.FC<Props> = () => {
  return (
    <div className="w-56 flex flex-col">
      <Item to="/categories">category a</Item>
      <Item to="/categories">category a</Item>
      <Item to="/categories">category a</Item>
      <Item to="/categories">category a</Item>
      <Item to="/categories">category a</Item>
      <Item to="/categories">category a</Item>
    </div>
  );
};

export default Category;
