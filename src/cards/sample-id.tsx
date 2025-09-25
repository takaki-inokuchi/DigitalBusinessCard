import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@chakra-ui/react";

import { FaGithub } from "react-icons/fa";
import { FaXTwitter, FaWallet } from "react-icons/fa6";

type Skill = {
  id: number;
  name: string;
};

export const SampleId = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<AppUser | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

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

      const { data: userSkills, error: userSkillsError } = await supabase
        .from("user_skill")
        .select("skill_id")
        .eq("user_id", id);

      if (userSkillsError) {
        console.log(userSkillsError);
        return;
      }
      const skillIds = userSkills?.map((us) => us.skill_id) || [];
      if (skillIds.length === 0) {
        setSkills([]);
        return;
      }
      const { data: skillsData, error: skillsError } = await supabase
        .from("skills")
        .select("*")
        .in("id", skillIds);
      if (skillsError) {
        console.log(skillsError);
        return;
      }
      setSkills(skillsData || []);
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
                <p>
                  {skills.map((skill, index) => (
                    <span key={skill.id}>
                      {skill.name}
                      {index < skills.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>

                <HStack  justify="center" spacing={4}>
                  {user.github_id && (
                    <Text>
                      <Link href={user.github_id} display="inline-flex" alignItems="center" isExternal>
                        <FaGithub />
                      </Link>
                    </Text>
                  )}

                  {user.qiita_id && (
                    <Text>
                      <Link href={user.qiita_id} display="inline-flex" alignItems="center" isExternal>
                      <FaWallet />
                      </Link>
                    </Text>
                  )}
                  {user.x_id && (
                    <Text>
                      <Link href={user.x_id} display="inline-flex" alignItems="center" isExternal>
                      <FaXTwitter />
                      </Link>
                    </Text>
                  )}
                </HStack>
              </Stack>
            </CardBody>
          </Card>
        </Box>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
};
