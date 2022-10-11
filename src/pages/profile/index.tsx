import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import {
  Text, Icon, Box, Input, Button, Spacer, InputGroup, InputRightElement
} from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";
import { useSession, getSession} from "next-auth/react";
import Sidemenu from "../../components/profile/Sidemenu";

type Props = {
  email: string;
};

const Profile: React.FC<Props> = ({ email }) => {
  const { data, refetch } = trpc.user.get.useQuery({email: email})
  const [show, setShow] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const handleClick = () => setShow(!show)
  const editText = () => setEdit(!edit)

  return (
    <div className="min-h-screen pl-60 pr-60">
      <Text className="font-bold text-3xl p-10">My Account</Text>
      <div className="flex justify-between">
        <Sidemenu />
        <Box w="50rem" h="100rem" bg="gray.100" rounded="md" p="10" shadow="lg">
          <div className="flex justify-between">
            <Text className="font-bold text-2xl pb-5">My details</Text>
            <Button w="140px" colorScheme="green" onClick={editText}>edit</Button>
          </div>
          <Text p="2">email</Text>
          <Input
            value={data?.email}
            w="340px"
            bg="white"
            readOnly={edit ? true :false}/>
          <Spacer h="5" />
          <Text p="2">password</Text>
          <InputGroup size='md'>
            <Input 
              w="340px"
              value={data?.password}
              type={show ? 'text' : 'password'}
              bg="white"
              readOnly/>
            <InputRightElement w="52rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Spacer h="5" />
        </Box>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);
  const email = session?.user?.email
  console.log(session)
  return {
    props: {
      email
    },
  };
};
