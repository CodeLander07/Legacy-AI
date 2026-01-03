# LegacyAI - The Digital Time Capsule

**Preserve Your Wisdom. Guide Future Generations.**

LegacyAI is a premium digital platform designed for families to store life experiences, values, and lessons as a secure digital time capsule. It leverages AI to allow future generations to interact with and learn from their family's collective wisdom.

![LegacyAI Banner](https://via.placeholder.com/1200x600/050505/f59e0b?text=LegacyAI+Dashboard)

## 🚀 Features

- **✨ Premium SaaS UI**: A calm, confident, and eternal design aesthetic using a custom dark theme and smooth scroll animations (Framer Motion).
- **🔐 Secure Authentication**: Email and password login powered by Supabase Auth.
- **📝 Memory Vault**: A dedicated space to record stories, life lessons, and experiences with tagging support.
- **🤖 Ask LegacyAI**: An AI-powered chat interface (Google Gemini) that answers questions based *only* on your stored memories.
- **📱 Responsive Design**: Fully optimized for desktop and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend / Auth**: [Supabase](https://supabase.com/)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/) (@google/generative-ai)

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/legacy-ai.git
cd legacy-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Database Setup

1.  Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Navigate to the **SQL Editor**.
3.  Run the following SQL script to create the `memories` table and set up Row Level Security (RLS):

```sql
-- Create the memories table
create table if not exists memories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  tags text[],
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table memories enable row level security;

-- Create policies
create policy "Users can insert their own memories" on memories for insert with check (auth.uid() = user_id);
create policy "Users can view their own memories" on memories for select using (auth.uid() = user_id);
create policy "Users can update their own memories" on memories for update using (auth.uid() = user_id);
create policy "Users can delete their own memories" on memories for delete using (auth.uid() = user_id);
```

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
├── app/
│   ├── api/chat/          # AI Chat API Route (Gemini integration)
│   ├── dashboard/         # Protected Dashboard Routes
│   │   ├── add-memory/    # Page to create new memories
│   │   ├── chat/          # AI Chat Interface
│   │   └── vault/         # Grid view of all memories
│   ├── login/             # Login Page
│   ├── signup/            # Signup Page
│   ├── globals.css        # Global styles & Tailwind setup
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing Page
├── components/            # Reusable UI Components
│   ├── AuthForm.tsx       # Login/Signup Form
│   ├── FeatureCard.tsx    # Dashboard Cards
│   ├── Footer.tsx         # Site Footer
│   └── Navbar.tsx         # Responsive Navbar
├── lib/
│   └── supabaseClient.ts  # Supabase Client Initialization
└── public/                # Static Assets
```

## 🛡️ Security

- **Row Level Security (RLS)**: Ensures users can only access and modify their own data.
- **Server-Side Validation**: API routes verify authentication tokens before processing requests.
- **Environment Variables**: Sensitive keys are stored securely in `.env.local`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
