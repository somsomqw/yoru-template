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
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {};

const Signin: React.FC<Props> = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!res?.ok) {
      setErrorMessage("email or password is wrong");
    } else {
      router.push("/");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <form method="POST" onSubmit={onSubmit}>
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
          <Center>
            <Text className="text-red-400">{errorMessage}</Text>
          </Center>
        </div>
      </form>
    </div>
  );
};

export default Signin;
