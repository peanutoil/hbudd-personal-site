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
