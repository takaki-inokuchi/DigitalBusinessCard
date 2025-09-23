import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";

type User = {
  user_id: string;
  name: string;
  description: string;
  github_id: string;
  qiita_id: string;
  x_id: string;
  created_at: string;
};

type Skill = {
  id: number;
  name: string;
};

export const SampleId = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
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

      setUser(userData);

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
        <div>
          <p>名前: {user.name}</p>
          <p>自己紹介: {user.description}</p>
          <p>スキル:</p>
          <ul>
            {skills.map((skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
          <p>GitHub: {user.github_id}</p>
          <p>qiita: {user.qiita_id}</p>
          <p>GitHub: {user.x_id}</p>
        </div>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
};
