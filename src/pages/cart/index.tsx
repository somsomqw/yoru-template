import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CartDataTable from "../../components/cart/CartDataTable";
import { OutputGetCart } from "../../schema/cart.schema";
import { trpc } from "../../utils/trpc";

type Props = {
  cartId: number;
};

const Cart: React.FC<Props> = ({ cartId }) => {
  const { data } = trpc.cart.get.useQuery({ cartId });
  const [carts, setCarts] = useState<OutputGetCart>();
  useEffect(() => {
    if (!cartId) {
      const localCarts = localStorage.getItem("carts");
      if (localCarts) {
        const parsedCarts: OutputGetCart = JSON.parse(localCarts);
        setCarts(parsedCarts);
      }
    } else {
      setCarts({ products: data?.products ?? null });
    }
  }, [data]);

  return (
    <div>
      <CartDataTable carts={carts} />
    </div>
  );
};

export default Cart;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);
  const cartId = session?.cartId;
  return {
    props: {
      cartId,
    },
  };
};
