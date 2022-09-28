import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { trpc } from "../utils/trpc";

type Props = {};

const signup: React.FC<Props> = () => {
  const { mutate, isLoading, error } = trpc.user.regist.useMutation({
    onError: (error) => {},
    onSuccess: () => {
      console.log("success");
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;
    mutate({ email, password });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={onSubmit}>
        <div className="w-80">
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
              SIGN IN
            </Button>
          </FormControl>
        </div>
      </form>
    </div>
  );
};

export default signup;
