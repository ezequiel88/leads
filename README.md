# 🚀 Mini Seller Console

> A lightweight, modern React application for triaging leads and converting them into opportunities. Built with love, caffeine, and a healthy dose of TypeScript magic! ☕

## 🎯 What's This All About?

This is a **Mini Seller Console** that helps sales teams manage their leads like pros. Think of it as your sales pipeline's best friend - it takes messy lead data and turns it into organized, actionable opportunities. No more spreadsheet nightmares!

### 🌟 The Cool Stuff We Built

**📋 Leads Management**

- **Smart Lead List**: Loads 50 sample leads from local JSON (because who has time for real APIs during demos?)
- **Search & Filter**: Find leads by name/company, filter by status, sort by score (descending, because high scores deserve attention!)
- **Responsive Design**: Works on desktop and mobile - your sales team can hustle anywhere

**🔍 Lead Detail Panel**

- **Slide-over Magic**: Click any lead row to open a smooth slide-over panel
- **Inline Editing**: Edit status and email with real-time validation (we actually check if emails look like emails!)
- **Save/Cancel Actions**: With proper error handling because nobody likes broken forms

**💰 Lead to Opportunity Conversion**

- **One-Click Convert**: Transform leads into opportunities with a single button click
- **Smart Data Mapping**: Automatically creates opportunities with proper fields (id, name, stage, amount, accountName)
- **Opportunities Table**: View all converted opportunities in a clean, organized table

**🎨 UX/UI States**

- **Loading States**: Smooth skeleton loading with staggered animations
- **Empty States**: Friendly messages when no data is found
- **Error Handling**: Basic but effective error states
- **Performance**: Handles 100+ leads without breaking a sweat

## 🛠️ Tech Stack

**Core Technologies:**

- **React 19** with **TypeScript** - Because we like our code typed and our bugs caught early
- **Vite** - Lightning-fast development server (seriously, it's fast!)
- **Tailwind CSS** - Utility-first styling that doesn't make you cry
- **TanStack Router** - Modern routing that actually makes sense

**UI & Animations:**

- **Radix UI** - Accessible components that work out of the box
- **Framer Motion** - Smooth animations that don't feel janky
- **Lucide React** - Beautiful icons that don't look like they're from 2010
- **Sonner** - Toast notifications that users actually notice

**State Management:**

- **React Context** - For global state management
- **Local Storage** - Persistent filters and data (survives browser refreshes!)
- **Custom Hooks** - Clean, reusable logic

**Developer Experience:**

- **ESLint & TypeScript** - Code quality that doesn't compromise
- **Vitest** - Testing framework that doesn't hate you
- **PostCSS & Autoprefixer** - CSS that works everywhere

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (because we live in the future)
- pnpm (or npm/yarn if you're old school)

### Installation

```bash
# Clone the repo
git clone <repository-url>
cd leads

# Install dependencies (pnpm is faster, just saying)
pnpm install

# Start the development server
pnpm dev
```

The app will be running at `http://localhost:3000` - open it up and start managing those leads! 🎉

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm serve    # Preview production build
pnpm test     # Run tests
```

## 📁 Project Structure

```
src/
├── @data/             # JSON data files (leads & opportunities)
├── components/        # Reusable UI components
│   ├── ui/            # Base UI components (buttons, tables, etc.)
│   ├── leads-table.tsx
│   ├── opportunities-table.tsx
│   └── lead-detail.tsx
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── routes/            # TanStack Router routes
├── types/             # TypeScript type definitions
└── styles.css         # Global styles


## 🎨 Features Deep Dive

### Lead Management
- **50 Sample Leads**: Pre-loaded with realistic Brazilian company data
- **Real-time Search**: Instant filtering as you type
- **Status Filtering**: Filter by New, Contacted, Qualified, or Disqualified
- **Score Sorting**: Automatically sorted by score (highest first)
- **Pagination**: Smooth pagination with customizable page sizes

### Data Persistence
- **localStorage Integration**: Filters and sort preferences persist across sessions
- **Optimistic Updates**: UI updates immediately, with rollback on errors
- **Simulated Latency**: setTimeout used to simulate real API delays

### Responsive Design
- **Mobile-First**: Works beautifully on phones and tablets
- **Desktop Enhanced**: Takes advantage of larger screens
- **Touch Friendly**: Proper touch targets and gestures

## 🔧 Technical Decisions

**Why TanStack Router?**
Because React Router is so 2022. TanStack Router gives us type-safe routing with better developer experience.

**Why Radix UI?**
Accessibility is not optional. Radix gives us WAI-ARIA compliant components without the headache.

**Why Framer Motion?**
Because smooth animations make users happy, and happy users convert better.

**Why Local JSON?**
No backend means faster development and easier demo deployment. Plus, it simulates real API responses with setTimeout.

## 🎯 Challenge Requirements Met

✅ **Leads List**: Load from local JSON with all required fields
✅ **Search & Filter**: Name/company search, status filter, score sorting
✅ **Lead Detail Panel**: Slide-over with inline editing
✅ **Email Validation**: Proper email format validation
✅ **Save/Cancel Actions**: With error handling
✅ **Convert to Opportunity**: One-click conversion with proper data mapping
✅ **Opportunities Table**: Clean display of converted opportunities
✅ **Loading States**: Skeleton loading and smooth transitions
✅ **Empty States**: Friendly no-data messages
✅ **Error Handling**: Basic error states throughout
✅ **Performance**: Handles 100+ leads smoothly

**Nice-to-Haves Implemented:**
✅ **localStorage Persistence**: Filters and sort preferences saved
✅ **Optimistic Updates**: Immediate UI updates with rollback
✅ **Responsive Layout**: Desktop to mobile responsive design

## 🤝 Contributing

Found a bug? Want to add a feature? PRs are welcome! Just make sure your code is:
- Properly typed (TypeScript is your friend)
- Tested (at least the happy path)
- Accessible (screen readers matter)
- Responsive (mobile users exist)

## 📝 License

MIT License - because sharing is caring! 🎁

---

*Built with ❤️ and way too much coffee by a developer who believes good UX is not optional.*
```
