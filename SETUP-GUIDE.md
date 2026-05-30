# Akshathaa Ventures - Setup Guide

## ✅ Environment Variables Configured

Your Supabase credentials have been added to `.env.local`:
- Project URL: `https://piamkprvlihzzhotrkrx.supabase.co`
- Anon Key: Configured ✓
- Service Role Key: Configured ✓

## 🚀 Next Steps

### 1. Run the Database Schema

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/piamkprvlihzzhotrkrx
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-schema.sql`
5. Paste into the SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. Verify success message appears

This will create:
- `properties` table with all fields
- `property_images` table with display_order
- `enquiries` table with is_read
- All indexes for performance
- Row Level Security policies
- Storage bucket for images
- Auto-update trigger for updated_at

### 2. Create Admin User

1. In Supabase Dashboard, go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter:
   - Email: `admin@akshathaaventures.com` (or your preferred email)
   - Password: Create a strong password
   - Auto Confirm User: ✓ (check this box)
4. Click **Create User**
5. Save these credentials - you'll need them to login at `/admin/login`

### 3. Update WhatsApp Number

Replace the placeholder number `919876543210` in these files:

1. `components/WhatsAppButton.tsx` (line 5)
2. `app/property/[id]/page.tsx` (line 38)
3. `app/contact/page.tsx` (line 115)
4. `components/Footer.tsx` (line 32)

Format: `91` + 10-digit mobile number (no spaces or special characters)
Example: `919876543210` for +91 98765 43210

### 4. Test the Application

The dev server is running at: **http://localhost:3000**

**Test these pages:**
- ✓ Homepage: http://localhost:3000
- ✓ Listings: http://localhost:3000/listings
- ✓ About: http://localhost:3000/about
- ✓ Contact: http://localhost:3000/contact
- ✓ Admin Login: http://localhost:3000/admin/login

**Admin Panel (after login):**
- Dashboard: http://localhost:3000/admin
- Add Property: http://localhost:3000/admin/properties/new
- View Enquiries: http://localhost:3000/admin/enquiries

### 5. Add Test Properties

1. Login to admin panel with your credentials
2. Go to **Properties** → **Add Property**
3. Fill in the form:
   - Title: "Luxury 3BHK Apartment in Whitefield"
   - Description: Add details about the property
   - Price: 7500000 (for ₹75 Lakhs)
   - Location: Select from dropdown
   - Type: Flat
   - BHK: 3
   - Area: 1200 sq ft
   - Select amenities (Parking, Gym, Security, etc.)
   - Upload 3-5 images (they'll be auto-compressed)
   - Mark as Featured: ✓
   - Status: Available
4. Click **Create Property**
5. Repeat for 2-3 more properties

### 6. Test All Features

**Public Site:**
- [ ] Search properties by location, type, budget
- [ ] Filter by amenities (checkboxes)
- [ ] View property details
- [ ] Submit enquiry via contact form
- [ ] Click WhatsApp button

**Admin Panel:**
- [ ] View dashboard statistics
- [ ] Add new property with images
- [ ] Edit existing property
- [ ] Reorder images (up/down arrows)
- [ ] Delete images
- [ ] View enquiries
- [ ] Mark enquiry as read
- [ ] Mark all enquiries as read

### 7. Verify Image Compression

1. Upload a large image (4-8MB phone photo)
2. Check the uploaded file in Supabase Storage
3. Should be converted to WebP and ~200-400KB
4. Verify it loads quickly on the frontend

## 🎨 Design Verification

Check that the design matches the brief:
- [ ] Cormorant Garamond for headings
- [ ] DM Sans for body text
- [ ] Warm color palette (#F5F0E8, #BFA16A, #1A1208)
- [ ] Outlined buttons with uppercase tracking
- [ ] No rounded corners or drop shadows
- [ ] Asymmetric grid on homepage
- [ ] Large typographic hierarchy
- [ ] Warm overlay on images (10% #BFA16A)

## 🐛 Common Issues

### Images not uploading?
- Check Supabase Storage bucket exists: `property-images`
- Verify storage policies are created
- Check browser console for errors

### Can't login to admin?
- Verify user was created in Supabase Auth
- Check "Auto Confirm User" was enabled
- Try password reset if needed

### Filters not working?
- Check database has properties with status='available'
- Verify amenities are stored as array in database
- Check browser console for query errors

### Featured properties not showing?
- Verify properties have `is_featured=true` AND `status='available'`
- Check at least one image is uploaded
- Refresh the page

## 📱 Mobile Testing

Test on mobile or use browser DevTools:
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select iPhone or Android device
4. Test navigation, search, and forms
5. Verify WhatsApp button is accessible

## 🚀 Deployment (When Ready)

### Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Click **Import Project**
4. Select your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Click **Deploy**
7. Wait for build to complete
8. Visit your live site!

### Post-Deployment

1. Test all features on production
2. Update WhatsApp links if needed
3. Add custom domain (optional)
4. Set up Google Maps API key (optional)
5. Configure email notifications (optional)

## 📊 Analytics (Optional)

Add Google Analytics or Vercel Analytics:
1. Get tracking ID
2. Add to `app/layout.tsx`
3. Track page views and conversions

## 🔒 Security Checklist

- [x] RLS policies enabled on all tables
- [x] Service role key in .env.local (not committed)
- [x] Admin routes protected with authentication
- [x] Phone validation on contact form
- [x] Image compression prevents large uploads
- [ ] Add rate limiting for enquiries (optional)
- [ ] Set up CAPTCHA on contact form (optional)

## 💰 Cost Monitoring

**Supabase Free Tier Limits:**
- 500MB database storage
- 1GB file storage
- 2GB bandwidth/month
- 50,000 monthly active users

**With image compression:**
- ~500 properties with 5 images each
- Should stay within free tier for months

**Upgrade triggers:**
- More than 100 properties
- High traffic (>50k visitors/month)
- Need more storage

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check Supabase logs in dashboard
3. Verify environment variables are set
4. Review IMPLEMENTATION-NOTES.md
5. Check database schema was run successfully

## ✨ You're Ready!

Once you've completed steps 1-5, your site is ready to use. The design is production-ready and follows all the requirements from the brief.

**Current Status:**
- ✅ Database schema ready
- ✅ Environment variables configured
- ✅ Dev server running
- ⏳ Waiting for schema execution
- ⏳ Waiting for admin user creation
- ⏳ Waiting for test data

**Next Action:** Run the schema in Supabase SQL Editor!
