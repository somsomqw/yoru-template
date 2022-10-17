import React, { useState } from "react";
import {
  Text,
  Box,
  Button,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

type Props = {
  refetch: () => void;
  id: string;
  userEmail: string;
  nameKanji: string;
  nameKana: string;
  phone: string;
  zipcode: string;
  address1: string;
  address2: string;
  isDefault: boolean;
};

const AddressCard: React.FC<Props> = ({
  refetch,
  id,
  userEmail,
  nameKanji,
  nameKana,
  phone,
  address1,
  address2,
  isDefault,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: editOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();

  const [selected, setSelected] = useState<string>("");

  return (
    <div className="w-1/2 cursor-pointer hover:bg-gray-100 bg-gray-50 rounded-mg ">
      <div className="flex">
        <Text className="text-lg pt-5 pl-5 pr-1">{nameKanji}</Text>
        <Text className="text-lg pt-5 pl-5 pr-1">{nameKana}</Text>
        <Text className="font-thin p-5">{phone}</Text>
      </div>
      <Text className="pl-5">{address1}</Text>
      <Text className="pl-5">{address2}</Text>
      <div className="flex justify-between">
        {isDefault ? (
          <Box
            border="1px"
            borderColor="gray.500"
            fontWeight="light"
            fontSize="12px"
            className="m-5"
            width="fit-content"
          >
            デフォルト住所
          </Box>
        ) : (
          <Box className="m-5" width="fit-content"></Box>
        )}
        <ButtonGroup>
          <Button
            type="submit"
            fontWeight="light"
            fontSize="12px"
            bg="none"
            mt="3"
            onClick={() => {
              setSelected(id);
              editOnOpen();
            }}
          >
            edit
          </Button>
          <Button
            type="submit"
            fontWeight="light"
            fontSize="12px"
            bg="none"
            mt="3"
            mr="2"
            onClick={() => {
              setSelected(id);
              onOpen();
            }}
          >
            delete
          </Button>
        </ButtonGroup>
      </div>
      <EditModal
        id={id}
        isOpen={editOpen}
        onClose={editOnClose}
        selected={selected}
        refetch={refetch}
      />
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        selected={selected}
        refetch={refetch}
      />
    </div>
  );
};

export default AddressCard;
