import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Spacer,
  Text,
  Center,
} from "@chakra-ui/react";

type Props = {};

const Signin: React.FC<Props> = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <form>
        <div className="w-80">
          <Center>
            <Text className="text-5xl font-bold">SIGN IN</Text>
          </Center>
          <Spacer h="10" />
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input id="signup-email" name="email" type="email" />
            <FormLabel>Password</FormLabel>
            <Input id="signup-password" name="password" type="password" />
            <Spacer h="5" />
            <Button className="w-full" colorScheme="blue" type="submit">
              SIGN IN
            </Button>
          </FormControl>
          <Spacer h="4" />
          <Center></Center>
        </div>
      </form>
    </div>
  );
};

export default Signin;
