# Akshathaa Ventures - Implementation Notes

## ✅ Completed Features

### 1. Amenities Filtering (Public Site)
- **Location**: `lib/queries/properties.ts`
- **Implementation**: PostgreSQL array contains syntax using `.filter('amenities', 'cs', '{"amenity"}')`
- **Logic**: AND filtering (all selected amenities must be present)
- **UI**: Checkbox list in listings sidebar with real-time filtering

### 2. Mark as Read (Admin Enquiries)
- **Location**: `lib/queries/enquiries.ts`, `app/admin/enquiries/page.tsx`
- **Features**:
  - Individual "Mark Read" button per enquiry
  - "Mark All Read" bulk action
  - Optimistic UI updates (instant feedback)
  - Visual opacity change for read enquiries (50% opacity)
  - Unread count display in header
- **Icons**: Check (single) and CheckCheck (bulk) from Lucide

### 3. Image Reordering (Admin)
- **Location**: `components/admin/ImageReorder.tsx`
- **Implementation**: Up/Down arrow buttons (no drag-drop library needed)
- **Features**:
  - Move images up/down in display order
  - Delete images (removes from storage + database)
  - Auto-reorder after deletion
  - Shows "Position 1 (Featured)" for first image
  - Integrated into edit property page

### 4. Image Compression (Bonus)
- **Location**: `lib/compressImage.ts`
- **Implementation**: Canvas-based WebP conversion at 1400px width, 82% quality
- **Impact**: Reduces 4-8MB phone photos to ~200-400KB
- **Usage**: Automatically applied in both new and edit property forms
- **Critical for**: Indian mobile networks (Jio/Airtel)

## Key Technical Decisions

### Price Formatting
```typescript
// Uses underscores for readability
if (price >= 10_000_000) return `₹${(price / 10_000_000).toFixed(2)} Cr`;
```

### Phone Validation
```typescript
// Indian mobile: 10 digits starting with 6-9
/^(\+91)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
```

### Featured Badge Logic
```typescript
// Only show if featured AND available (not sold/rented)
const showFeatured = property.is_featured && property.status === 'available';
```

### Image Display Order
- All queries sort images by `display_order` field
- First image (display_order: 0) is automatically featured
- Reordering persists via upsert with new display_order values

## Database Schema Highlights

### Separated `is_featured` from `status`
- `is_featured`: boolean (can be featured while sold)
- `status`: 'available' | 'sold' | 'rented'
- Frontend only shows featured badge when both conditions met

### Array Filtering
```sql
-- Correct way to filter amenities
SELECT * FROM properties WHERE 'gym' = ANY(amenities);

-- In Supabase JS
.filter('amenities', 'cs', '{"gym"}')
```

### RLS Policies
- Public: read properties and images
- Admin: full CRUD on properties, images, enquiries
- Anyone: insert enquiries
- Admin: update/delete enquiries (for mark as read)

## Design System

### Colors
- Background: `#F5F0E8` (warm off-white)
- Text: `#1A1208` (near-black with warm undertone)
- Accent: `#BFA16A` (muted gold)
- Secondary: `#EDE8DC` (cards)
- Dark: `#12100C` (warm near-black)

### Typography
- Headings: Cormorant Garamond (elegant serif)
- Body: DM Sans (clean sans-serif)
- Uppercase tracking: `0.15em` for labels

### Buttons
- Outlined style with thin borders
- No filled backgrounds
- Uppercase text with wide letter-spacing
- Hover: background fills with accent color

## Next Steps for Launch

1. **Run Schema in Supabase**
   - Execute `supabase-schema.sql` in SQL Editor
   - Verify all tables and policies created
   - Create admin user in Authentication

2. **Update Environment Variables**
   - Add Supabase URL and keys to `.env.local`
   - Update WhatsApp phone number in components

3. **Seed Test Data**
   - Add 2-3 properties with images
   - Test all filters and features
   - Verify image compression works

4. **Optional: Email Notifications**
   - Set up Resend (free tier) for enquiry notifications
   - Create Supabase Edge Function webhook
   - Or use Interakt for WhatsApp notifications

## File Structure
```
akshathaa-ventures/
├── app/
│   ├── admin/
│   │   ├── properties/
│   │   │   ├── new/
│   │   │   └── edit/[id]/
│   │   ├── enquiries/
│   │   └── login/
│   ├── listings/
│   ├── property/[id]/
│   ├── about/
│   └── contact/
├── components/
│   └── admin/
│       └── ImageReorder.tsx
├── lib/
│   ├── queries/
│   │   ├── properties.ts
│   │   └── enquiries.ts
│   ├── supabase.ts
│   ├── utils.ts
│   └── compressImage.ts
└── types/
    └── index.ts
```

## Performance Optimizations

1. **Image Compression**: Reduces bandwidth by 90%+
2. **Optimistic Updates**: Instant UI feedback for mark as read
3. **Indexed Queries**: All filter fields have database indexes
4. **Image Ordering**: Sorted at query time, not in frontend

## Known Limitations

1. No drag-drop for images (by design - arrows are simpler)
2. No real-time notifications (requires Edge Function)
3. Google Maps requires API key (placeholder in property detail)
4. No image cropping (compression handles size)

## Budget Considerations

- Supabase Free Tier: 500MB storage, 2GB bandwidth
- With compression: ~500 properties with 5 images each
- Resend Free Tier: 100 emails/day (enough for enquiries)
- Total cost: ₹0 for first few months

## Production Checklist

- [ ] Run schema in Supabase
- [ ] Create admin user
- [ ] Update .env.local with real credentials
- [ ] Replace WhatsApp number (3 locations)
- [ ] Add Google Maps API key
- [ ] Test image upload and compression
- [ ] Seed 3-5 properties
- [ ] Test all filters
- [ ] Test mark as read
- [ ] Test image reordering
- [ ] Deploy to Vercel
- [ ] Set up custom domain
- [ ] (Optional) Set up enquiry notifications
