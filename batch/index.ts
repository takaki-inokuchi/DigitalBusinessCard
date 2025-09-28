import { supabase } from "../supabaseClient.ts";

async function deleteYesterdayData() {
  const yesterday = new Date();
  // yesterday.setDate(yesterday.getDate() - 1);
  const yyyymmdd = yesterday.toISOString().split("T")[0];

  // users 削除
  const { error: userErr } = await supabase
    .from("users")
    .delete()
    .gte("created_at", `${yyyymmdd}T00:00:00Z`)
    .lt("created_at", `${yyyymmdd}T23:59:59Z`);
  if (userErr) console.error("users削除エラー:", userErr);

  // user_skill 削除 途中でskillsをusersにまとめたため、使用せず
  // const { error: skillErr } = await supabase
  //   .from("user_skill")
  //   .delete()
  //   .gte("created_at", `${yyyymmdd}T00:00:00Z`)
  //   .lt("created_at", `${yyyymmdd}T23:59:59Z`);
  // if (skillErr) console.error("user_skill削除エラー:", skillErr);

  console.log("前日データ削除完了:", yyyymmdd);
}

deleteYesterdayData();