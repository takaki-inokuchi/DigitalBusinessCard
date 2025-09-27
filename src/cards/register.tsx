import { Box, Button, Card, CardBody, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

type FormData = {
  user_id: string;
  name: string;
  description: string;
  github_id: string;
  qiita_id: string;
  x_id: string;
};


export const Register = () => {
  const {
    register, // inputをフォームに登録する
    handleSubmit, // submit時の処理をラップ
    formState: { errors }, // バリデーションエラー
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    console.log("送信データ:", data);
    const { error } = await supabase.from("users").insert([data]);
    navigate("/");

    if (error) {
      console.log(error.message);
      alert("登録エラー");
    } else {
      alert("登録しました！");
    }
  };

  return (
    <div>
      <h1>新規名刺登録</h1>
      <Box>
        <Card>
          <CardBody>
            <Text>好きなid</Text>
            <Input
              aria-label="好きなid"
              {...register("user_id", { required: "英単語は必須です" })}
            />
            {errors.user_id && (
              <Text color="red">{errors.user_id.message}</Text>
            )}

            <Text>お名前</Text>
            <Input
              aria-label="お名前"
              {...register("name", { required: "名前は必須です" })}
            />
            {errors.name && <Text color="red">{errors.name.message}</Text>}

            <Text>自己紹介</Text>
            <Input
              aria-label="自己紹介"
              {...register("description", { required: "自己紹介は必須です" })}
            />
            {errors.description && (
              <Text color="red">{errors.description.message}</Text>
            )}

            <Text>GithubId</Text>
            <Input aria-label="github_id"
              {...register("github_id", {
                pattern: {
                  value: /^[A-Za-z]*$/,
                  message: "GithubIDは英字のみで入力して下さい",
                },
              })}
            />
            {errors.github_id && (
              <Text color="red">{errors.github_id.message}</Text>
            )}

            <Text>QiitaId</Text>
            <Input aria-label="qiita_id"
              {...register("qiita_id", {
                pattern: {
                  value: /^[A-Za-z]*$/,
                  message: "qiitaIDは英字のみで入力して下さい",
                },
              })}
            />
            {errors.qiita_id && (
              <Text color="red">{errors.qiita_id.message}</Text>
            )}

            <Text>TwitterId</Text>
            <Input aria-label="x_id"
              {...register("x_id", {
                pattern: {
                  value: /^[A-Za-z]*$/,
                  message: "xIDは英字のみで入力して下さい",
                },
              })}
            />
            {errors.x_id && <Text color="red">{errors.x_id.message}</Text>}
          </CardBody>

          <Button onClick={handleSubmit(onSubmit)}>登録</Button>
        </Card>
      </Box>
    </div>
  );
};
