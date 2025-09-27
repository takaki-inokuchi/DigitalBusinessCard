import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { AppUser } from "../user/user";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
  Link,
  HStack,
  Button,
} from "@chakra-ui/react";

import { FaGithub } from "react-icons/fa";
import { FaXTwitter, FaWallet } from "react-icons/fa6";

export const SampleId = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<AppUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", id)
        .single();
      if (userError) {
        console.log(userError);
      }
      if (!userData) return;

      setUser(AppUser.fromDB(userData));
    };
    fetchUser();
  }, [id]);

  return (
    <div>
      {user ? (
        <Box maxW="600px" mx="auto" mt={10}>
          <Card shadow="md" borderWidth="1px" borderRadius="lg" p={3}>
            <CardHeader>
              <Heading size="lg">{user.name}</Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing={1}>
                <Text fontWeight="bold">自己紹介</Text>
                <p>{user.description}</p>

                <Text fontWeight="bold">好きな技術</Text>
                <p>{user.skills?.join(",")}</p>

                <HStack justify="center" spacing={4}>
                  {user.github_id && (
                    <Text>
                      <Link
                        href={user.github_id}
                        display="inline-flex"
                        alignItems="center"
                        isExternal
                        aria-label="github_id"
                      >
                        <FaGithub />
                      </Link>
                    </Text>
                  )}

                  {user.qiita_id && (
                    <Text>
                      <Link
                        href={user.qiita_id}
                        display="inline-flex"
                        alignItems="center"
                        isExternal
                        aria-label="qiita_id"
                      >
                        <FaWallet />
                      </Link>
                    </Text>
                  )}
                  {user.x_id && (
                    <Text>
                      <Link
                        href={user.x_id}
                        display="inline-flex"
                        alignItems="center"
                        isExternal
                        aria-label="x_id"
                      >
                        <FaXTwitter />
                      </Link>
                    </Text>
                  )}
                </HStack>
              </Stack>
            </CardBody>
          </Card>
          <Button m={3} onClick={() => navigate("/")}>
            戻る
          </Button>
        </Box>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
};
