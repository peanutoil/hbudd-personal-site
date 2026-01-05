# Full-Stack Portfolio Website

A modern, full-featured portfolio website built with Next.js, Supabase, and deployed on Vercel for free.

## Features

- **Homepage**: Bio, profile photo, social links, and work experience
- **Blog**: Full blog with markdown support and emoji reactions
- **Feed**: Twitter-like feed for short posts with heart reactions
- **Contact Page**: Private contact form + public comments section
- **Admin Panel**: Password-protected interface for content management
- **Anonymous Interactions**: Emoji reactions and comments without user accounts
- **Email Notifications**: Contact form messages sent to your email

## Tech Stack

- **Frontend**: Next.js 15 with App Router, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Deployment**: Vercel (free tier)
- **Markdown**: React Markdown with GitHub Flavored Markdown

## Project Structure

```
├── app/
│   ├── page.tsx                 # Homepage
│   ├── blog/                    # Blog pages
│   ├── feed/                    # Twitter-like feed
│   ├── contact/                 # Contact page
│   ├── admin/                   # Admin panel
│   └── api/                     # API routes
│       ├── reactions/           # Emoji reactions
│       ├── comments/            # Comment submissions
│       ├── contact/             # Contact form emails
│       └── admin/               # Admin authentication
├── components/
│   ├── Navigation.tsx           # Main navigation
│   ├── EmojiReact.tsx           # Emoji reaction component
│   ├── FeedPost.tsx             # Individual feed post
│   ├── ContactForm.tsx          # Contact form
│   ├── CommentsSection.tsx      # Comments display/submission
│   └── admin/                   # Admin components
├── lib/
│   ├── supabase.ts              # Supabase client
│   └── adminAuth.ts             # Admin authentication
├── types/
│   └── database.ts              # TypeScript types
└── supabase-schema.sql          # Database schema
```

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Go to the SQL Editor in your Supabase dashboard
4. Copy the contents of `supabase-schema.sql` and run it
5. This creates all necessary tables with Row Level Security

### 3. Set Up Resend (for emails)

1. Go to [resend.com](https://resend.com) and create an account
2. Get your API key from the dashboard
3. You get 10,000 free emails per month

### 4. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your environment variables:
   ```env
   # Get these from your Supabase project settings
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Get this from Resend
   RESEND_API_KEY=your_resend_api_key

   # Set a secure password for admin access
   ADMIN_PASSWORD=your_secure_admin_password

   # Your email for contact form notifications
   CONTACT_EMAIL=your_email@example.com
   ```

### 5. Customize Your Content

Edit the following files with your information:

1. **Homepage** (`app/page.tsx`):
   - Update name, bio, and profile photo
   - Add your social links
   - Update work experience

2. **Layout** (`app/layout.tsx`):
   - Update site title and description
   - Update footer text

3. **Navigation** (`components/Navigation.tsx`):
   - Customize navigation links if needed

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your repository
4. Add environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY`
   - `ADMIN_PASSWORD`
   - `CONTACT_EMAIL`
5. Click "Deploy"

Your site will be live at `your-project.vercel.app`!

## Managing Content

### Creating Blog Posts

1. Go to your admin panel: `your-site.com/admin`
2. Login with your `ADMIN_PASSWORD`
3. Follow the instructions to use Supabase dashboard

**To create a blog post:**
1. Go to Supabase → Table Editor → posts
2. Click "Insert row"
3. Fill in:
   - `title`: Your post title
   - `content`: Markdown content
   - `excerpt`: Short preview (optional)
   - `type`: Select "blog"
   - `slug`: URL-friendly version (e.g., "my-first-post")
   - `published`: Set to `true` when ready
4. Click "Save"

### Creating Feed Posts (Tweets)

Same as blog posts, but:
- Set `type` to "tweet"
- `title` can be short or same as content
- Keep content brief (Twitter-style)

### Managing Comments

1. Go to Supabase → Table Editor → comments
2. View pending comments (`status = 'pending'`)
3. To approve: Change `status` to "approved"
4. To reject: Change `status` to "rejected"
5. To reply: Add text to `reply_from_admin` field

### Viewing Contact Messages

1. Go to Supabase → Table Editor → messages
2. View all contact form submissions
3. Messages are also emailed to your `CONTACT_EMAIL`

## Markdown Support

Blog posts support GitHub Flavored Markdown:

- **Bold**: `**text**`
- *Italic*: `*text*`
- Headers: `# H1`, `## H2`, etc.
- Links: `[text](url)`
- Images: `![alt](url)`
- Code blocks: ` ```language ... ``` `
- Lists, tables, and more

## Customization Ideas

1. **Add more emoji options**: Edit `availableEmojis` in `components/EmojiReact.tsx`
2. **Change colors**: Update Tailwind classes throughout components
3. **Add more pages**: Create new folders in `app/`
4. **Add analytics**: Install Vercel Analytics or Google Analytics
5. **Add SEO**: Customize metadata in page files
6. **Add dark mode**: Implement theme toggle with Tailwind's dark mode

## Free Tier Limits

- **Vercel**: Unlimited bandwidth, 100GB bandwidth/month
- **Supabase**: 500MB database, 2GB bandwidth, 50,000 monthly active users
- **Resend**: 10,000 emails/month, 100 emails/day

Perfect for a personal portfolio!

## Troubleshooting

### Database connection errors
- Check that environment variables are correct
- Verify Supabase project is active

### Emails not sending
- Verify `RESEND_API_KEY` is set
- Check Resend dashboard for errors
- Make sure `CONTACT_EMAIL` is valid

### Admin panel not working
- Ensure `ADMIN_PASSWORD` is set in environment variables
- Re-deploy after changing environment variables

### Posts not showing
- Verify `published` is set to `true` in database
- Check `type` field is "blog" or "tweet"
- Ensure slug is unique

## License

MIT License - feel free to use this for your portfolio!

## Support

For issues or questions, open an issue on GitHub or check the Next.js and Supabase documentation.
