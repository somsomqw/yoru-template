import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CartDataTable from "../../components/cart/CartDataTable";

type Props = {};

const Cart: React.FC<Props> = () => {
  const session = useSession();
  const [carts, setCarts] = useState<CartType>();
  useEffect(() => {
    if (session.status === "unauthenticated") {
      const localCarts = localStorage.getItem("carts");
      if (localCarts) {
        const parsedCarts: CartType = JSON.parse(localCarts);
        setCarts(parsedCarts);
      }
    } else if (session.status === "authenticated") {
    }
  }, [session]);

  return (
    <div>
      <CartDataTable carts={carts} />
    </div>
  );
};

export default Cart;
