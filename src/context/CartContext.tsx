import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
export const CartContext = createContext<any>(null);
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const session = useSession();
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    if (session.status === "authenticated") {
      //if session is existed set cart count from db
      setCount(0);
    } else {
      //if session is not existed set cart count from local storage
      const storageCart = localStorage.getItem("carts");
      if (storageCart) {
        setCount(JSON.parse(storageCart).length);
      } else {
        setCount(0);
      }
    }
  }, [session]);
  const action = useMemo(
    () => ({
      increase: () => setCount((prev) => prev + 1),
      decrease: () => setCount((prev) => prev - 1),
    }),
    []
  );
  const value = useMemo(() => [count, action], [count, action]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export const useCartCounter = () => {
  const value = useContext(CartContext);
  return value;
};
