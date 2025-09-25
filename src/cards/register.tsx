import { Box, Button, Card, CardBody, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type FormData = {
  word: string;
  name: string;
  description: string;
  github: string;
  qiita: string;
  x: string;
};

export const Register = () => {
  const {
    register, // inputをフォームに登録する
    handleSubmit, // submit時の処理をラップ
    formState: { errors }, // バリデーションエラー
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("送信データ:", data);
    // 登録処理
  };

  return (
    <div>
      <h1>新規名刺登録</h1>
      <Box>
        <Card>
          <CardBody>
            <Text>好きな英単語</Text>
            <Input {...register("word", { required: "英単語は必須です" })} />
            {errors.word && <Text color="red">{errors.word.message}</Text>}

            <Text>お名前</Text>
            <Input {...register("name", { required: "名前は必須です" })} />
            {errors.name && <Text color="red">{errors.name.message}</Text>}

            <Text>自己紹介</Text>
            <Input {...register("description")} />

            <Text>GithubId</Text>
            <Input {...register("github",{
              pattern:{
                value:/^[A-Za-z]*$/,
                message:"GithubIDは英字のみで入力して下さい"
              }
            })} />
            {errors.github && <Text color="red">{errors.github.message}</Text>}

            <Text>QiitaId</Text>
            <Input {...register("qiita",{
              pattern:{
                value:/^[A-Za-z]*$/,
                message:"qiitaIDは英字のみで入力して下さい"
              }
            })} />
            {errors.qiita && <Text color="red">{errors.qiita.message}</Text>}

            <Text>TwitterId</Text>
            <Input {...register("x",{
              pattern:{
                value:/^[A-Za-z]*$/,
                message:"xIDは英字のみで入力して下さい"
              }
            })} />
             {errors.x && <Text color="red">{errors.x.message}</Text>}
          </CardBody>

          <Button onClick={handleSubmit(onSubmit)}>登録</Button>
        </Card>
      </Box>
    </div>
  );
};
