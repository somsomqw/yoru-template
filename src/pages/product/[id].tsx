import {
  Button,
  Center,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Category from "../../components/Category";
import Counter from "../../components/combination/Counter";
import { useCartCounter } from "../../context/CartContext";
import { setLocalStorage } from "../../utils/storage";
import { trpc } from "../../utils/trpc";

type Props = {
  id: number;
  session: Session;
};

const ProductDetail: React.FC<Props> = ({ id, session }) => {
  const toast = useToast();
  const { data } = trpc.product.getSingle.useQuery({ id: Number(id) });
  const [, action] = useCartCounter();
  const [options, setOptions] = useState<{
    size?: string;
    color?: string;
    quantity: number;
  }>({ quantity: 1 });

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.name === "cart") {
      if (session) {
      } else {
        const result = setLocalStorage<{
          id: number;
          size?: string;
          color?: string;
          quantity: number;
          title: string;
        }>("carts", {
          id,
          size: options?.size,
          color: options?.color,
          quantity: options.quantity,
          title: data?.title ?? "",
        });
        toast({
          title: result.message,
          status: result.status,
          duration: 5000,
          isClosable: true,
        });
        action.increase();
      }
    }
  };
  return (
    <div className="p-10 flex">
      <Category />
      <div>
        <Image
          src="https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
          width={500}
          height={750}
          layout="fixed"
        />
        <Center>
          <Text className="w-112">{data?.description}</Text>
        </Center>
      </div>
      <form method="POST" onSubmit={onSubmit}>
        <div className="p-12 w-128">
          <Text className="text-2xl font-bold mb-2">{data?.title}</Text>
          <Text className="text-2xl font-bold">￥{data?.price}</Text>
          {data?.size && data.size.length > 0 && (
            <div>
              <Text>Size</Text>
              <Select
                placeholder="please select"
                onChange={(e) =>
                  setOptions((prev) => ({ ...prev, size: e.target.value }))
                }
                required
              >
                {data.size.map((s: string) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </div>
          )}
          {data?.color && data.color.length > 0 && (
            <div>
              <Text>Color</Text>
              <Select
                placeholder="please select"
                onChange={(e) =>
                  setOptions((prev) => ({ ...prev, color: e.target.value }))
                }
                required
              >
                {data.color.map((c: string) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
          )}
          <div>
            <Text>Quantity</Text>
            <Center>
              <Counter
                count={options.quantity}
                onDecrease={() => {
                  if (options.quantity > 1)
                    setOptions((prev) => ({
                      ...prev,
                      quantity: prev.quantity - 1,
                    }));
                }}
                onIncrease={() => {
                  if (data?.quantity && options.quantity < data?.quantity)
                    setOptions((prev) => ({
                      ...prev,
                      quantity: prev.quantity + 1,
                    }));
                }}
              />
            </Center>
          </div>
          <VStack spacing={4}>
            <Button
              type="submit"
              name="cart"
              className="w-full"
              colorScheme="teal"
            >
              ADD CART
            </Button>
            <Button
              type="submit"
              name="purchase"
              className="w-full"
              colorScheme="teal"
            >
              PURCHASE
            </Button>
          </VStack>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const id = ctx.params?.id;
  const session = await getSession(ctx);
  return {
    props: {
      id,
      session,
    },
  };
};
