import { Button, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import AddModal from "../../../components/admin/campaigns/AddModal";

type Props = {};

const Campaigns: React.FC<Props> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <Text className="font-bold text-3xl">Campaigns</Text>
        <Button colorScheme="teal" onClick={onOpen}>
          ADD CAMPAIGN
        </Button>
      </div>
      <Spacer h="10" />
      <AddModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Campaigns;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);
  const isAdmin = session?.isAdmin;
  if (!isAdmin)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  return {
    props: {
      isAdmin: isAdmin,
    },
  };
};
