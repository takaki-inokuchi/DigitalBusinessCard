import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Cardmenu = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    if (id.trim() !== "") {
      navigate(`/cards/${id}`);
    } else {
      alert("IDがありません");
    }
  };
  return (
    <div>
      <Box>
        <Card>
          <CardHeader fontSize="3xl">カード検索</CardHeader>
          <CardBody>
            <Input placeholder="IDを入力" value={id} onChange={(e) => setId(e.target.value)}/>
          </CardBody>
        </Card>
      </Box>
      <Button onClick={handleClick}>検索</Button>
    </div>
  );
};
