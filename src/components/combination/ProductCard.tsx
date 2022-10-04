import { Badge, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getDiscountPrice } from "../../utils/caculate";

type Props = {
  id: string;
  url: string;
  title: string;
  price: number;
  discount: boolean;
  discountRate: number | null;
};

const ProductCard: React.FC<Props> = ({
  id,
  url,
  title,
  price,
  discount,
  discountRate,
}) => {
  return (
    <Link href={`product/${id}`}>
      <div className="shadow-md cursor-pointer hover:opacity-80 transition-all">
        <div className="relative">
          <Image src={url} width={200} height={300} />
          {discount && (
            <Badge className="absolute right-2 bottom-4" colorScheme="red">
              sale
            </Badge>
          )}
        </div>
        <div className="p-2 w-48">
          <Text className="font-bold truncate">{title}</Text>
        </div>
        <div className="p-2">
          <span className={`font-bold ${discount && "line-through"}`}>
            ￥{price}
          </span>
          {discount && discountRate && (
            <span className="font-bold ml-4">
              ￥{getDiscountPrice(price, discountRate)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
