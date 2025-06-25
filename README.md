🪄 JoyfulSpender
JoyfulSpender is a personal finance app designed to help users manage spending, set savings goals, and visualize financial habits—without the friction. Built with modern web technologies and a mindful UX, it’s both a portfolio project and a thoughtful take on money management.

✨ Features
🧾 Transaction Tracker – Add and manage income/expenses with intuitive modals

🎯 Savings Goals – Set targets, monitor progress, and stay accountable

📊 Dashboard View – Get a snapshot of spending patterns and financial health

🔐 Auth System – (WIP) Secure sign up/sign in with Supabase + NextAuth

🛠️ Responsive UI – Built with TailwindCSS and custom component library

📦 Tech Stack
Next.js 14 (App Router)

TypeScript

Prisma + Supabase (PostgreSQL)

NextAuth.js (for authentication)

TailwindCSS + ShadCN UI

🚧 Status
The core functionality is built, UI is polished, and the app is styled for portfolio readiness. Some backend features (like full auth flows) are still being tested locally.

🧠 Lessons & Highlights
Integrated Supabase with custom user signup endpoint

Debugged NextAuth in App Router context

Built responsive components with developer experience in mind

Focused on clean code and a scalable folder structure

📸 Preview
Add a screenshot/gif here if possible!

🛠️ Setup
bash
git clone https://github.com/yourusername/joyfulspender.git
cd joyfulspender
npm install
cp .env.example .env.local
# Add your Supabase URL and keys
npm run dev
