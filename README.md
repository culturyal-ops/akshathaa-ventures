# Akshathaa Ventures - Real Estate Website

A full-stack real estate website for Akshathaa Ventures, a Bangalore-based property company.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Storage)
- **Language**: TypeScript

## Features

### Public Website
- Homepage with search functionality
- Property listings with advanced filters
- Detailed property pages with image galleries
- About and Contact pages
- WhatsApp integration for instant enquiries
- Mobile-first responsive design

### Admin Panel
- Secure authentication
- Dashboard with statistics
- Property management (CRUD operations)
- Image upload and management
- Enquiry tracking

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Run the SQL schema from `supabase-schema.sql` in the SQL Editor
4. Create a storage bucket named `property-images` (should be created by the schema)

### 3. Configure Environment Variables

Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Update WhatsApp Number

Replace the placeholder phone number in:
- `components/WhatsAppButton.tsx`
- `app/property/[id]/page.tsx`
- `app/contact/page.tsx`

Update `919876543210` with your actual WhatsApp number (with country code, no spaces or special characters).

### 5. Create Admin User

In Supabase Dashboard > Authentication > Users, create a new user with email and password for admin access.

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

## Project Structure

```
akshathaa-ventures/
├── app/
│   ├── admin/              # Admin panel routes
│   │   ├── properties/     # Property management
│   │   ├── enquiries/      # Enquiry management
│   │   └── login/          # Admin login
│   ├── listings/           # Property listings page
│   ├── property/[id]/      # Property detail page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   └── page.tsx            # Homepage
├── components/             # Reusable components
├── lib/                    # Utilities and Supabase client
├── types/                  # TypeScript interfaces
└── supabase-schema.sql     # Database schema
```

## Database Tables

- **properties**: Property listings with details
- **property_images**: Images associated with properties
- **enquiries**: Customer enquiries from contact form

## Admin Access

Navigate to `/admin/login` and use your Supabase credentials to access the admin panel.

## Customization

### Colors
The brand colors (navy + gold) are defined in `app/globals.css` and used throughout the components.

### Locations
Update Bangalore locations in `lib/utils.ts` in the `BANGALORE_LOCATIONS` array.

### Google Maps
Add your Google Maps API key in `app/property/[id]/page.tsx` to enable map embeds.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel project settings
4. Deploy

## Support

For issues or questions, contact: info@akshathaaventures.com
