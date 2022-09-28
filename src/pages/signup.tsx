import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Spacer,
  Text,
  Center,
} from "@chakra-ui/react";
import { trpc } from "../utils/trpc";

type Props = {};

const Signup: React.FC<Props> = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { mutate, isLoading } = trpc.user.regist.useMutation({
    onError: (error) => {
      setErrorMessage(error.message);
    },
    onSuccess: () => {
      console.log("success");
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;
    if (password !== passwordConfirm) {
      setErrorMessage("please check password confirm");
    } else {
      mutate({ email, password });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={onSubmit}>
        <div className="w-80">
          <Center>
            <Text className="text-5xl font-bold">SIGN UP</Text>
          </Center>
          <Spacer h="10" />
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input id="signup-email" name="email" type="email" />
            <FormLabel>Password</FormLabel>
            <Input id="signup-password" name="password" type="password" />
            <FormLabel>Password Confirm</FormLabel>
            <Input
              id="signup-password-confirm"
              name="passwordConfirm"
              type="password"
            />
            <Spacer h="5" />
            <Button className="w-full" colorScheme="blue" type="submit">
              SIGN UP
            </Button>
          </FormControl>
          <Spacer h="4" />
          <Center>
            <Text className="text-red-400">{errorMessage}</Text>
          </Center>
        </div>
      </form>
    </div>
  );
};

export default Signup;
