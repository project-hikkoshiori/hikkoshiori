import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { postUser } from "../../../src/api/UserAPI";
import {
  genderUI,
  userTypeUI,
  workPatternUI,
} from "../../../src/utils/convert";
import {
  genderList,
  UserForm,
  userTypeList,
  workPatternList,
} from "../../../src/utils/types";

const RegisterUser: NextPage = () => {
  const toast = useToast();
  const router = useRouter();
  const { handleSubmit, register } = useForm<UserForm>();
  const { data: session } = useSession();
  if (!session || !session.user) {
    return <Text>ユーザー認証が終わっていません</Text>;
  }
  const addUser = async (form: UserForm) => {
    form.name = session?.user?.name ?? "";
    const { isError } = await postUser(form);
    if (!isError) {
      router.push("/");
      toast({
        title: "ユーザー登録が完了しました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Center>
      <Box>
        <Heading my="8">ユーザー情報を登録する</Heading>
        <form onSubmit={handleSubmit(addUser)}>
          <FormControl isRequired>
            <FormLabel htmlFor="gender">性別</FormLabel>
            <Select id="gender" {...register("gender")}>
              {genderList.map((g) => (
                <option value={g} key={g}>
                  {genderUI(g)}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="userType">属性</FormLabel>
            <Select id="userType" {...register("user_type")}>
              {userTypeList.map((u) => (
                <option value={u} key={u}>
                  {userTypeUI(u)}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="workPattern">勤務体系</FormLabel>
            <Select id="workPattern" {...register("work_pattern")}>
              {workPatternList.map((w) => (
                <option value={w} key={w}>
                  {workPatternUI(w)}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button colorScheme="brand" type="submit" mt="5" width="full">
            登録
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default RegisterUser;
