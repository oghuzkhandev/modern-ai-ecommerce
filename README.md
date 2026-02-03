# 🏠 Luxe Home - Modern E-Commerce Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=for-the-badge&logo=sanity)

**A premium furniture e-commerce platform featuring AI-powered shopping assistance, real-time inventory management, and seamless checkout experience.**

[Live Demo](https://luxe-home.vercel.app) · [Documentation](#documentation) · [Report Bug](#issues)

</div>

---

## ✨ Features

### 🛍️ Shopping Experience
- **AI Shopping Assistant** - Claude-powered conversational shopping with natural language product search
- **Smart Product Filtering** - Advanced filtering by category, material, color, price range, and stock availability
- **Real-time Inventory** - Live stock updates using Sanity Live queries
- **Pagination & Grid Layouts** - Customizable product views (1-4 columns, 12-48 items per page)
- **Wishlist & Quick View** - Save favorites and preview products without leaving the page

### 💳 Commerce Features
- **Stripe Integration** - Secure payment processing with webhook-driven order creation
- **Guest & Authenticated Checkout** - Seamless experience for all users
- **Order Tracking** - Real-time order status updates and history
- **Automatic Stock Management** - Inventory decrements on successful purchases
- **Email Notifications** - Order confirmations and shipping updates

### 🤖 AI & Admin
- **AI Admin Dashboard** - Claude-powered insights, sales trends, and inventory recommendations
- **Order Management** - Comprehensive admin panel for order processing
- **Inventory Control** - Stock monitoring with low-stock alerts
- **Analytics & Reporting** - Sales metrics and product performance tracking

### 🎨 Design & UX
- **Premium UI/UX** - Luxurious design with subtle animations and micro-interactions
- **Dark Mode** - Full dark mode support with smooth transitions
- **Mobile-First** - Fully responsive design optimized for all devices
- **Accessibility** - WCAG 2.1 AA compliant with proper ARIA labels

---

## 🏗️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router & Server/Client Components
- **[React 19](https://react.dev/)** - Latest React with Server Actions
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animations

### Backend & Services
- **[Sanity CMS](https://www.sanity.io/)** - Headless CMS with real-time data mutations
  - Sanity Live for real-time UI updates
  - TypeGen for type-safe GROQ queries
  - Embedded Studio for content management
- **[Clerk](https://clerk.com/)** - Authentication with AgentKit integration
- **[Stripe](https://stripe.com/)** - Payment processing with webhooks
- **[Vercel AI SDK](https://sdk.vercel.ai/)** - Multi-provider LLM support (Claude, GPT, Cohere)

### State Management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **localStorage persistence** - Cart persistence across sessions

### AI & Tools
- **[Claude Sonnet 4](https://www.anthropic.com/claude)** - Primary AI model for shopping assistant
- **Custom AI Tools** - Product search, order tracking, scoped to authenticated users
- **AI Gateway** - Multi-provider LLM routing and fallback

---

## 📁 Project Structure

```
modern-ecommerce/
├── app/                          # Next.js App Router
│   ├── (admin)/                 # Admin dashboard routes
│   │   └── admin/
│   │       ├── inventory/       # Stock management
│   │       ├── orders/          # Order processing
│   │       └── page.tsx         # Admin home with AI insights
│   ├── (app)/                   # Main application routes
│   │   ├── checkout/            # Checkout flow
│   │   ├── orders/              # User order history
│   │   ├── products/            # Product detail pages
│   │   └── page.tsx             # Homepage
│   ├── api/                     # API routes
│   │   ├── admin/insights/      # AI admin insights
│   │   ├── chat/                # AI shopping assistant
│   │   └── webhooks/stripe/     # Stripe webhook handler
│   └── studio/                  # Embedded Sanity Studio
│
├── components/
│   ├── app/                     # Application components
│   │   ├── Cart/                # Shopping cart
│   │   ├── Filters/             # Product filters
│   │   ├── Header.tsx           # Navigation
│   │   ├── Footer.tsx           # Footer
│   │   ├── ProductCard.tsx      # Product display
│   │   └── ...
│   └── ui/                      # shadcn/ui components
│
├── lib/
│   ├── actions/                 # Server actions
│   │   ├── checkout.ts          # Checkout logic
│   │   └── customer.ts          # Customer management
│   ├── ai/                      # AI configuration
│   │   ├── shopping-agent.ts    # AI agent setup
│   │   └── tools/               # Custom AI tools
│   ├── store/                   # Zustand stores
│   │   ├── cart-store.ts        # Cart state
│   │   └── chat-store.ts        # Chat state
│   └── utils.ts                 # Utility functions
│
├── sanity/
│   ├── lib/                     # Sanity client setup
│   ├── queries/                 # GROQ queries
│   ├── schemaTypes/             # Content schemas
│   └── ...
│
└── public/                      # Static assets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm/yarn
- Sanity account
- Clerk account
- Stripe account
- Anthropic API key (for Claude)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/luxe-home.git
   cd luxe-home
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file:
   ```env
   # Sanity
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_WRITE_TOKEN=your_write_token

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
   STRIPE_SECRET_KEY=your_secret_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret

   # AI
   ANTHROPIC_API_KEY=your_anthropic_key

   # App
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Import sample data**
   ```bash
   # Navigate to Sanity directory
   cd sanity
   
   # Import furniture data
   npx sanity dataset import full-furniture-data-with-images.ndjson production --replace
   ```

5. **Run development server**
   ```bash
   pnpm dev
   ```

6. **Open in browser**
   - Application: [http://localhost:3000](http://localhost:3000)
   - Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## 🎯 Key Features Deep Dive

### AI Shopping Assistant
The AI assistant uses Claude Sonnet 4 with custom tools to help customers:
- Natural language product search
- Personalized recommendations
- Order tracking (authenticated users only)
- Product comparison and specifications

**Implementation:**
```typescript
// Custom AI tool for product search
export const searchProductsTool = tool({
  description: 'Search products by query with filters',
  parameters: z.object({
    searchQuery: z.string(),
    categorySlug: z.string().optional(),
    material: z.string().optional(),
    // ... more filters
  }),
  execute: async ({ searchQuery, ...filters }) => {
    const products = await sanityFetch({
      query: AI_SEARCH_PRODUCTS_QUERY,
      params: { searchQuery, ...filters },
    });
    return products;
  },
});
```

### Real-time Data with Sanity Live
All product data updates in real-time without polling:
```typescript
const { data: products } = await sanityFetch({
  query: PRODUCTS_QUERY,
  // Automatic subscription to live updates
});
```

### Type-Safe GROQ Queries
TypeGen generates TypeScript types from GROQ queries:
```typescript
export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    price,
    images[]{asset->{url}},
    // ... more fields
  }
`);

// Type automatically generated: PRODUCT_BY_SLUG_QUERYResult
```

---

## 🔐 Security Features

- **Server-side authentication** - Clerk integration with server actions
- **Webhook verification** - Stripe webhook signature validation
- **User-scoped data** - AI tools only access user's own orders
- **API key rotation** - Support for multiple AI providers
- **CSRF protection** - Built-in Next.js protection
- **Content Security Policy** - Secure headers configuration

---

## 📊 Performance Optimizations

- **Server Components** - Reduced JavaScript bundle size
- **Streaming SSR** - Progressive page rendering
- **Image Optimization** - Next.js Image component with blur placeholders
- **Code Splitting** - Dynamic imports for heavy components
- **Edge Runtime** - Fast API responses
- **CDN Caching** - Optimized asset delivery

---

## 🧪 Testing

```bash
# Run type checking
pnpm type-check

# Run linting
pnpm lint

# Build for production
pnpm build
```

---

## 📦 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Stripe Webhooks
Configure webhook endpoint:
```
https://your-domain.com/api/webhooks/stripe
```

Events to listen for:
- `checkout.session.completed`
- `payment_intent.succeeded`

---

## 🛠️ Development Workflow

### Adding New Products
1. Access Sanity Studio at `/studio`
2. Navigate to **Products**
3. Click **Create new product**
4. Add details, images, and publish

### Creating New Categories
1. Go to **Categories** in Studio
2. Add category with image
3. Products will automatically filter by category

### Customizing AI Agent
Edit `lib/ai/shopping-agent.ts`:
```typescript
export const shoppingAgent = createAgent({
  model: 'claude-sonnet-4-20250514',
  systemPrompt: 'Your custom prompt...',
  tools: [searchProductsTool, getMyOrdersTool],
});
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact & Support

<div align="center">

**Oguzhan Dogan**

[![Portfolio](https://img.shields.io/badge/Portfolio-oguzhandogan.com-000000?style=for-the-badge&logo=vercel)](https://oguzhandogan.com)
[![Email](https://img.shields.io/badge/Email-oguzhandogandev@hotmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:oguzhandogandev@hotmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](linkedin.com/in/oguzhandogandev/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/oghuzkhandev)

</div>

---

<div align="center">

**Made with ❤️ by Oguzhan Dogan**

*If you found this project helpful, please consider giving it a ⭐️*

</div>
