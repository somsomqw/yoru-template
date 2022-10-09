import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useCartCounter } from "../../context/CartContext";
import { OutputGetCart } from "../../schema/cart.schema";
import { trpc } from "../../utils/trpc";

type Props = {
  carts?: OutputGetCart;
  refetch: () => void;
};

const CartDataTable: React.FC<Props> = ({ carts, refetch }) => {
  const toast = useToast();
  const [count, action] = useCartCounter();
  const { mutate } = trpc.cart.delete.useMutation({
    onError: () =>
      toast({
        title: "System error is occured",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
    onSuccess: () => {
      toast({
        title: "Product deleted from cart",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      action.decrease();
    },
  });

  const onClickDelete = (e: any, index: number) => {
    mutate({ cartDataId: index });
  };

  useEffect(() => {
    refetch();
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
            {carts?.products?.map((product, index) => (
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
                  <Button onClick={(e) => onClickDelete(e, product.id)}>
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
