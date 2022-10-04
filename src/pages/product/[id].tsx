import { Button, Center, Select, Text, VStack } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import React, { useEffect } from "react";
import { trpc } from "../../utils/trpc";

type Props = {
  id: string;
};

const ProductDetail: React.FC<Props> = ({ id }) => {
  const { data } = trpc.product.getSingle.useQuery({ id });
  return (
    <div className="p-10 flex">
      <div>
        <Image
          src="https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
          width={500}
          height={750}
          layout="fixed"
        />
        <Center>
          <Text className="w-112">{data?.product.description}</Text>
        </Center>
      </div>
      <div className="p-12 w-128">
        <Text className="text-2xl font-bold mb-2">{data?.product.title}</Text>
        <Text className="text-2xl font-bold">￥{data?.product.price}</Text>
        {data?.product.size && (
          <div>
            <Text>Size</Text>
            <Select>
              {data.product.size.map((s: string) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
        )}
        {data?.product.color && (
          <div>
            <Text>Color</Text>
            <Select>
              {data.product.color.map((c: string) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
        )}
        <VStack spacing={4}>
          <Button className="w-full" colorScheme="teal">
            ADD CART
          </Button>
          <Button className="w-full" colorScheme="teal">
            PURCHASE
          </Button>
        </VStack>
      </div>
    </div>
  );
};

export default ProductDetail;

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.params?.id;
  return {
    props: {
      id,
    },
  };
};
