# 🐘 Animal Chess (Dou Shou Qi)

A modern web implementation of **Animal Chess** built with **Next.js**, **React**, and **Supabase**. Play against other players online with a responstive interface and real-time gameplay.

In this classic two-player strategy game, players command eight animal pieces of different strengths and compete to capture the opponent's den or eliminate all opposing pieces. Each animal has unique movement and capture abilities, making strategic positioning essential.

The project also includes a **Minimax algorithm** that simulates a computer-controlled opponent for single-player gameplay.

Learn more about:

- [Animal Chess](https://en.wikipedia.org/wiki/Dou_shou_qi)
- [Minimax algorithm](https://www.geeksforgeeks.org/artificial-intelligence/mini-max-algorithm-in-artificial-intelligence/)

## 🌐 Live Demo

[**Play now**](https://animal-chess-6osp.vercel.app/)

## ✨ Features

- Online multiplayer gameplay
- Complete Animal Chess game logic
- Built with Next.js App Router
- Responsive and modern UI
- Supabase integration

## 🛠 Tech Stack

- Framework: Next.js
- Language: TypeScript
- Backend & Database: Supabase
- Styling: Tailwind CSS, Bootstrap
- Deployment: Vercel

## 🚀 Getting Started

### Prerequisitsnpm

- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/KhoaDinhNguyen/animal-chess.git
cd animal-chess
```

Install depdencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to:

```
http://localhost:3000
```

## 🔧 Supabase Setup

### 1. Create a Supabase Project

Create a new project at [Supabase](https://supabase.com)

From the project, copy the following values into your `.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### 2. Create the `games` Table

Create a table named **`games`** with the following columns:

| Column           | Type      | Description                                    |
| ---------------- | --------- | ---------------------------------------------- |
| `id`             | `uuid`    | Primary key                                    |
| `board`          | `jsonb`   | Current board state                            |
| `current_turn`   | `text`    | Current player's turn                          |
| `winner`         | `text`    | Winner of the game (`NULL` if game is ongoing) |
| `mode`           | `varchar` | Game mode                                      |
| `player_1_token` | `text`    | Player 1 session token                         |
| `player_2_token` | `text`    | Player 2 session token                         |
| `last_move`      | `jsonb`   | Most recent move                               |

### 3. Grant Table Permissions

Open the **SQL Editor** in Supabase and execute:

```sql
GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE games
TO anon;
```

This allows the frontend application to read and update game data using the anonymous API key.

> **Note:** This permission setup is intended for development and demonstration purposes. For production deployments, it is recommended to enable **Row Level Security (RLS)** and define appropriate access policies instead of granting unrestricted permissions.

## 📂 Project Structure

```text
.
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── contants/         # Constant values
├── game/             # Animal Chess game logic
├── hooks/            # Custom React hooks
├── lib/              # Supabase client and utilities
```

## 📄 License

This project is licensed under the MIT License.
