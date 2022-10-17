import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Sidemenu from "../../../components/profile/Sidemenu";
import { Text, Box, Button, useDisclosure } from "@chakra-ui/react";
import AddModal from "../../../components/profile/addresses/AddModel";
import { trpc } from "../../../utils/trpc";
import AddressCard from "../../../components/profile/addresses/AddressCard";

type Props = {
  email: string;
};

const Addresses: React.FC<Props> = ({ email }) => {
  const { data, refetch } = trpc.address.get.useQuery({ userEmail: email });
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => refetch(),
  });

  return (
    <div className="min-h-screen pl-60 pr-60">
      <Text className="font-bold text-3xl p-10">My Account</Text>
      <div className="flex justify-between">
        <Sidemenu />
        <Box w="50rem" h="100rem" bg="gray.100" rounded="md" p="10" shadow="lg">
          <div className="flex justify-between">
            <Text className="font-bold text-2xl pb-5">My Addresses</Text>
            <Button onClick={onOpen} colorScheme="teal">
              add address
            </Button>
            <AddModal isOpen={isOpen} onClose={onClose} email={email} />
          </div>
          <div className="w-full flex gap-4">
            {data?.map((address) => (
              <AddressCard
                refetch={refetch}
                key={address.id}
                id={address.id}
                userEmail={address.userEmail}
                nameKanji={address.nameKanji}
                nameKana={address.nameKana}
                phone={address.phone}
                zipcode={address.zipcode}
                address1={address.address1}
                address2={address.address2}
                isDefault={address.isDefault}
              />
            ))}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Addresses;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);
  const email = session?.user?.email;
  return {
    props: {
      email,
    },
  };
};
