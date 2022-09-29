import { useToast } from "@chakra-ui/react";

type Props = {
  title: string;
  description?: string;
  status: "error" | "success" | "warning" | "info" | "loading";
};

const useCustomToast = ({ title, description, status }: Props) => {
  const toast = useToast();
  return toast({
    title,
    description,
    status,
    duration: 9000,
    isClosable: true,
  });
};

export default useCustomToast;
