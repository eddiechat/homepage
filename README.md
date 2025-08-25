# Eddie - Email Infrastructure for Fast Growing Companies

Eddie is building the infrastructure for fast-growing companies to run agents and automations securely on their email and proprietary data.

## What is Eddie?

Eddie is an Email Client that delivers:
- **Communication superpowers** - Enhanced email capabilities
- **Automations that actually work** - Reliable workflow automation
- **Open Source & Agent-Native** - Built for AI agents from the ground up
- **Backwards-Compatible** - Works with existing email systems

## Features

Eddie provides example skills for fast-growing companies including:
- Market Research
- Sales Outreach
- Lead Enrichment
- Procurement
- Finance
- Customer Support
- Product Data Management

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up Google Sheets integration (see [SETUP-GOOGLE-SHEETS.md](./SETUP-GOOGLE-SHEETS.md))

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the landing page

## Project Structure

- `src/app/page.tsx` - Main landing page with waitlist form
- `src/components/` - React components
- `google-apps-script.js` - Google Apps Script for waitlist form handling
- `SETUP-GOOGLE-SHEETS.md` - Detailed setup instructions

## Development

The project uses:
- [Next.js 14](https://nextjs.org/) with App Router
- TypeScript
- Tailwind CSS
- Lucide React icons

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Contributing

This is a private project for Eddie. For questions or support, please contact the Eddie team.

## License

Private - All rights reserved.
