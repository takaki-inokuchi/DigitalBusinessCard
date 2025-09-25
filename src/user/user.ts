// src/models/User.ts
export type UserProps = {
  user_id: string;
  name: string;
  description: string;
  github_id: string;
  qiita_id: string;
  x_id: string;
  created_at: string;
};

export class AppUser {
  user_id: string;
  name: string;
  description: string;
  github_id?: string;
  qiita_id?: string;
  x_id?: string;
  created_at?: string;

  constructor(
    user_id: string,
    name: string,
    description: string,
    github_id?: string,
    qiita_id?: string,
    x_id?: string,
    created_at?: string
  ) {
    this.user_id = user_id;
    this.name = name;
    this.description = description;
    this.github_id = github_id;
    this.qiita_id = qiita_id;
    this.x_id = x_id;
    this.created_at = created_at;
  }

  // ファクトリーメソッド
  static fromDB(data: UserProps): AppUser {
    return new AppUser(
      data.user_id,
      data.name,
      data.description,
      data.github_id ? `https://github.com/${data.github_id}` : undefined,
      data.qiita_id ? `https://qiita.com/${data.qiita_id}` : undefined,
      data.x_id ? `https://x.com/${data.x_id}` : undefined,
    );
  }
}
