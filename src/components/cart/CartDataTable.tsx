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

type Props = {
  carts?: CartType;
};

const CartDataTable: React.FC<Props> = ({ carts }) => {
  const [count, action] = useCartCounter();
  const [data, setData] = useState<CartType | undefined>(carts);
  const onClickDelete = (e: any, index: number) => {
    const localCarts = localStorage.getItem("carts");
    if (localCarts) {
      const parsedCarts: CartType = JSON.parse(localCarts);
      const newCarts = parsedCarts.filter((_, i) => i !== index);
      setLocalStorage<CartType>("newCarts", newCarts);
      action.decrease();
    }
  };

  useEffect(() => {
    setData(carts);
  }, [carts]);

  useEffect(() => {
    const localCarts = localStorage.getItem("carts");
    if (localCarts) {
      const newCarts: CartType = JSON.parse(localCarts);
      setData(newCarts);
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
            {data?.map((product, index) => (
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
