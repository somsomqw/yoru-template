import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { setLocalStorage } from "../../utils/storage";
import { useCartCounter } from "../../context/CartContext";
import { OutputGetCart } from "../../schema/cart.schema";

type Props = {
  carts?: OutputGetCart;
};

const CartDataTable: React.FC<Props> = ({ carts }) => {
  const [count, action] = useCartCounter();
  const [data, setData] = useState<OutputGetCart | undefined>(carts);
  const onClickDelete = (e: any, index: number) => {
    const localCarts = localStorage.getItem("carts");
    if (localCarts) {
      const parsedCarts: OutputGetCart = JSON.parse(localCarts);
      const newCarts = parsedCarts.products?.filter((_, i) => i !== index);
      setLocalStorage<typeof newCarts>("newCarts", newCarts);
      action.decrease();
    }
  };

  useEffect(() => {
    setData({ products: carts?.products ?? null });
  }, [carts]);

  useEffect(() => {
    const localCarts = localStorage.getItem("carts");
    if (localCarts) {
      const newCarts = JSON.parse(localCarts);
      setData({ products: newCarts });
    }
  }, [count]);

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Product title</Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.products?.map((product, index) => (
              <Tr key={index}>
                <Td>
                  <span className="font-bold">{product.title}</span>
                </Td>
                {product.size ? (
                  <Td>
                    size: <span className="font-bold ml-2">{product.size}</span>
                  </Td>
                ) : (
                  <Td></Td>
                )}
                {product.color ? (
                  <Td>
                    color:
                    <span className="font-bold ml-2">{product.color}</span>
                  </Td>
                ) : (
                  <Td></Td>
                )}
                <Td isNumeric>
                  quantity:
                  <span className="font-bold ml-2">{product.quantity}</span>
                </Td>
                <Td isNumeric>
                  <Button onClick={(e) => onClickDelete(e, index)}>
                    DELETE
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartDataTable;
