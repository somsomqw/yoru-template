import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { trpc } from "../../../utils/trpc";

type Props = {
  categories?: Array<{ name: string }>;
  refetch: any;
};

const DataTable: React.FC<Props> = ({ categories, refetch }) => {
  const toast = useToast();
  const { mutate: deleteMutate } = trpc.category.delete.useMutation({
    onError: () => {
      toast({
        title: "Failed delete.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      toast({
        title: "Category deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      refetch();
    },
  });
  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Category name</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories?.map((category, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{category.name}</Td>
                <Td isNumeric>
                  <ButtonGroup>
                    <Button size="sm" colorScheme="teal">
                      EDIT
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => deleteMutate({ name: category.name })}
                    >
                      DELETE
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
