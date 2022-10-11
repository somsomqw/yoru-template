import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import type { NextPage } from "next";
import {
  Text, Icon, Box, Input, Button, Spacer, InputGroup, InputRightElement
} from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { trpc } from "../utils/trpc";
import { useSession, getSession} from "next-auth/react";

type Props = {
  email: string;
};

const Profile: React.FC<Props> = ({ email }) => {
  const { data, refetch } = trpc.user.get.useQuery({email: email})
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <div className="min-h-screen pl-60 pr-60">
      <div className="p-10">
        <Text className="font-bold text-3xl">My Account</Text>
      </div>
      <div className="flex justify-between">
        <div className="w-56 flex flex-col">
          <a className="cursor-pointer hover:bg-gray-200 p-2 flex justify-between items-center w-40 rounded-md">
            <Text className="">My details</Text>  
            <Icon color="GrayText" as={MdKeyboardArrowRight} />
          </a>
          <a className="cursor-pointer hover:bg-gray-200 p-2 flex justify-between items-center w-40 rounded-md">
            <Text className="">My orders</Text>
            <Icon color="GrayText" as={MdKeyboardArrowRight} />
          </a>
        </div>
        <div>
          <Box w="50rem" h="100rem" bg="gray.100" rounded="md" p={10} shadow="lg">
            <Text className="font-bold text-2xl">My details</Text>
            <Text>email</Text>
            <Input 
              value={data?.email}
              w="15rem"
              bg="white"/>
            <Text>password</Text>
            <InputGroup size='md'>
              <Input 
                value={data?.password}
                type={show ? 'text' : 'password'}
                bg="white"
                readOnly/>
              <InputRightElement w="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            
            <Spacer h="5" />
            <Button w="15rem" colorScheme="blue" type="submit">
              save
            </Button>
          </Box>
        </div>
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
