# Digital Business Card

シンプルなデジタル名刺管理アプリです。
supabaseをバックエンドに使用し、毎日ユーザー情報を自動で削除するバッチ処理を組み込んでいます。

---

## 目次

1. [機能](#機能)
2. [使用した技術](#使用した技術)
3. [環境変数](#環境変数)

---

## 機能

- ユーザー登録 / 更新 / 削除
- ユーザーのスキル管理
- 毎朝 6 時に前日のユーザー情報を削除するバッチ処理
- フロントは Vite + React を使用

---

## 使用した技術


- **フロントエンド**: React, Vite, Chakra UI
- **バックエンド / データベース**: Supabase
- **バッチ処理**: Node.js, ts-node
- **CI/CD / 自動化**: GitHub Actions
- **言語**: TypeScript

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)

---

## 環境変数

アプリやバッチ処理で Supabase に接続するため、以下の環境変数を設定します。

### ローカル開発用 (.env ファイル)

```env
# Supabase プロジェクト URL
SUPABASE_URL=https://xxxxxx.supabase.co

# Supabase Service Role Key（バッチ処理用）
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Vite フロント用（Anon Key）
VITE_SUPABASE_URL=https://xxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key