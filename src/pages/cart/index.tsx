import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CartDataTable from "../../components/cart/CartDataTable";
import { OutputGetCart } from "../../schema/cart.schema";
import { trpc } from "../../utils/trpc";

type Props = {
  cartId: number;
};

const Cart: React.FC<Props> = ({ cartId }) => {
  const { data, refetch } = trpc.cart.get.useQuery({ cartId });
  const [carts, setCarts] = useState<OutputGetCart>();
  useEffect(() => {
    setCarts({ products: data?.products ?? null });
  }, [data]);

  return (
    <div>
      <CartDataTable carts={carts} refetch={refetch} />
    </div>
  );
};

export default Cart;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);
  const cartId = session?.cartId ?? null;
  if (!cartId)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  return {
    props: {
      cartId,
    },
  };
};
