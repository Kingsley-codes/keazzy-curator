# Keazzy's Curations — Website Design Specification

## 1. Project Overview

**Website:** Keazzy's Curations  
**Type:** Editorial blog / digital magazine  
**Primary categories:** News, Sports, Fashion, Tech, Science  
**Target platform:** Desktop-first responsive website  
**Design direction:** Premium / Luxury editorial  
**Primary goal:** Make the website feel like a polished independent magazine rather than a generic blog.

The visual system should use strong editorial typography, large photography, generous spacing, restrained colors, thin borders, and a premium black/cream/gold palette.

---

# 2. Brand Direction

## Brand personality

Keazzy's Curations should feel:

- Sophisticated
- Editorial
- Intelligent
- Modern
- Calm
- Premium
- Personal

Avoid a loud, overly colorful news-site appearance.

## Suggested tagline

**Thoughtful stories. Fresh perspectives.**

Alternative supporting line:

**News, ideas and stories worth your time.**

---

# 3. Color System

Use a restrained palette.

| Token | Color | Usage |
|---|---|---|
| `--color-black` | `#111111` | Main text, dark sections |
| `--color-charcoal` | `#1B1B1B` | Footer, dark panels |
| `--color-cream` | `#F7F4EE` | Main warm background |
| `--color-white` | `#FFFFFF` | Cards and clean sections |
| `--color-gold` | `#C89B55` | Buttons, active states, small accents |
| `--color-gold-light` | `#E6C98F` | Hover states and subtle accents |
| `--color-muted` | `#77736C` | Metadata and secondary text |
| `--color-border` | `#DED9D0` | Dividers and card borders |

### Color rule

Gold should remain an accent. Do not use it as a large background color.

The site should mostly feel black, cream and white, with gold used sparingly.

---

# 4. Typography

Use an editorial serif for major headlines and a clean sans-serif for interface elements.

## Recommended fonts

### Display / headlines

**Cormorant Garamond**

Use for:

- Hero headlines
- Page titles
- Article headlines
- Section headings
- Pull quotes

### Interface / body

**Inter**

Use for:

- Navigation
- Buttons
- Article excerpts
- Metadata
- Filters
- Forms
- Footer

### Typography rules

Hero headline:

- Desktop: 56–72px
- Weight: 500–600
- Line height: 0.95–1.05

Page title:

- Desktop: 64px
- Weight: 500
- Line height: 1

Section title:

- 36–44px
- Serif

Article card title:

- 22–27px
- Serif

Body:

- 16–18px
- Line height: 1.6

Metadata:

- 12–13px
- Uppercase or small sans-serif text
- Letter spacing: 0.06em

---

# 5. General Layout

Use a centered container.

```text
Maximum width: 1200–1280px
Desktop horizontal padding: 40px
Tablet horizontal padding: 28px
Mobile horizontal padding: 18px
```

Use generous vertical spacing.

```text
Small section gap: 24px
Medium section gap: 48px
Large section gap: 72–96px
```

Avoid excessive rounded cards. Most editorial cards should use either:

- sharp corners
- very small 2–4px radius

Buttons may use 2–4px radius.

---

# 6. Header

The header should have two levels.

## Utility bar

Dark background.

Contains:

- Short tagline on the left
- Social icons
- Login
- Create Account

Example:

```text
Thoughtful stories. Fresh perspectives.

                                      Facebook  X  Instagram  YouTube
                                      Sign In  Create Account
```

Height: approximately 32–36px.

## Main navigation

Cream/white background.

Left:

**KEAZZY'S**  
**CURATIONS**

Center:

- Home
- News
- Sports
- Fashion
- Tech
- Science
- About Us
- All Posts

Right:

- Search
- Sign In / Account

The logo should use an elegant serif treatment.

Active navigation should use a thin gold underline.

---

# 7. Homepage

## Page structure

```text
Utility Bar
Main Header
Hero
Latest Stories
Explore Categories
Newsletter
Footer
```

## Hero

Use a large editorial feature.

Recommended structure:

```text
---------------------------------------------------------
|                                                       |
|                  LARGE FEATURE IMAGE                  |
|                                                       |
|  FASHION                                              |
|                                                       |
|  The New Era of African Fashion                       |
|  on the Global Stage                                  |
|                                                       |
|  Short article description                            |
|                                                       |
|  Read Full Story →                                    |
---------------------------------------------------------
```

Place three smaller stories on the right:

1. Tech
2. Sports
3. Science

Each card should use a strong photograph with text over the image.

The main hero should feel cinematic.

## Latest Stories

Display five cards in one row on large desktop screens.

Each card contains:

- Image
- Category
- Title
- Date
- Reading time

Example:

```text
[ IMAGE ]

NEWS

Nigeria's Economy Shows
Signs of Steady Recovery

Sep 7, 2026 · 5 min read
```

## Explore Categories

Display five category cards:

- News
- Sports
- Fashion
- Tech
- Science

Each card should use an image background with a dark overlay.

Each contains:

- Category name
- Short description
- Explore → link

## Newsletter

Use a dark charcoal section with a subtle texture or photograph.

Copy:

**Get the Best Stories Straight to Your Inbox**

Short supporting text.

Email input + Subscribe button.

Gold should be used for the Subscribe button.

## Footer

Dark charcoal background.

Columns:

1. Brand
2. Quick Links
3. Categories
4. Follow Us

Bottom row:

- Copyright
- Privacy Policy
- Terms of Service
- Contact

---

# 8. About Us Page

## Hero

Large editorial heading:

**Stories Worth Reading. Perspectives Worth Considering.**

Supporting text:

Keazzy's Curations is an independent publication covering news, sports, fashion, technology and science through carefully selected stories and thoughtful commentary.

Use a large editorial photograph beside or below the heading.

## Our Story

Two-column section:

Left:
Large photograph.

Right:
Heading:

**Why Keazzy's Curations?**

Explain:

- What the publication covers
- Why it was created
- What readers can expect
- The editorial approach

## What We Cover

Five category blocks:

### News
Current events and stories that matter.

### Sports
Matches, athletes, analysis and sporting culture.

### Fashion
Style, designers, trends and fashion culture.

### Tech
Technology, products, AI and the digital world.

### Science
Research, discoveries, space, health and scientific ideas.

## Editorial Philosophy

Use a large quote:

> "Good stories inform. Great stories give you something to think about."

Follow it with a short explanation of the publication's approach.

## Newsletter

Reuse the global newsletter component.

---

# 9. All Posts Page

## Hero

Cream background.

Breadcrumb:

```text
Home / All Posts
```

Large heading:

**All Posts**

Supporting text:

**Explore the latest stories, insights and ideas from Keazzy's Curations.**

Use a subtle editorial photograph in the hero background.

## Filter Bar

The filter bar must remain easy to use.

Categories:

```text
All
News
Sports
Fashion
Tech
Science
```

Active category:

- Black background
- White text

Inactive categories:

- Light cream/gray background
- Black text

Also include:

- Search field
- Sort dropdown

Example:

```text
[ All ] [ News ] [ Sports ] [ Fashion ] [ Tech ] [ Science ]

                         [ Search posts... ] [ Sort: Latest ]
```

## Post Grid

Use a three-column grid.

Each card:

```text
IMAGE
CATEGORY
TITLE
SHORT EXCERPT
DATE · READING TIME
```

Keep image ratios consistent.

Recommended ratio:

```text
16:10
```

## Sidebar

On large screens, the right side can contain:

### Stay Updated

Newsletter card.

### Trending Posts

Five compact article cards with:

- Thumbnail
- Category
- Title
- Date

### Quote

Small editorial quote card.

On smaller screens, move the sidebar below the post grid.

## Pagination

Use:

```text
←  1  2  3  4  5  ...  →
```

Active page:

Black background with white text.

---

# 10. Single Post Page

## Structure

```text
Header
Breadcrumb
Article Header
Hero Image
Article Content
Author / Sharing
Related Posts
Comments
Newsletter
Footer
```

## Article Header

Example:

```text
TECH

The Best Tech Gadgets
of 2026 (So Far)

From AI-powered devices to smarter homes,
here are the standout gadgets making life
easier, smarter and more exciting this year.

By Keazzy · Sep 4, 2026 · 5 min read

Share:  Facebook  X  LinkedIn  Copy Link
```

The title should use the large serif display font.

## Hero Image

Use a large horizontal photograph.

Recommended ratio:

```text
16:8–16:9
```

Place the image inside the main content column.

## Article Layout

Desktop:

```text
------------------------------------------------------
|              Article Content       | Related Posts |
|                                    |               |
| Paragraph                         | Post           |
| Paragraph                         | Post           |
|                                    | Post           |
| Heading                            | Newsletter    |
| Paragraph                          |               |
------------------------------------------------------
```

Main content width:

```text
680–760px
```

Article sidebar:

```text
280–320px
```

## Article Content

Use:

- Serif headings
- Sans-serif body
- Large readable paragraphs
- Pull quotes
- Numbered lists
- Images
- Captions
- Inline links

Avoid narrow line spacing.

## Pull Quote

Example:

> "The best technology disappears into the way we live."

Style:

- Serif
- 26–32px
- Gold vertical line

---

# 11. Comments

Comments require an account.

Display:

```text
Comments (12)

Sign in to join the conversation.
```

If logged in:

```text
Write a comment...

[ Post Comment ]
```

Each comment contains:

- Avatar
- Username
- Date
- Comment
- Reply
- Like/reaction

Example:

```text
Tunde A.
Sep 4, 2026

Really informative. I've been looking for a new
laptop and this helped me narrow down my options.

Reply    ♡
```

Keep the comments section clean and editorial.

---

# 12. Related Posts

Show 3–4 related articles.

Each item:

- Small image
- Category
- Title
- Date

The system should prioritize articles from the same category or related tags.

---

# 13. Admin Area

The first design phase focuses on public pages, but the backend should support an admin dashboard.

Required admin functionality:

- Admin login
- Create post
- Edit post
- Delete post
- Draft posts
- Publish posts
- Upload featured image
- Select category
- Add tags
- Add excerpt
- Add article content
- Set author
- Set publication date
- Manage comments

Suggested admin routes:

```text
/admin/login
/admin
/admin/posts
/admin/posts/new
/admin/posts/[id]/edit
/admin/comments
```

The admin UI can use a simpler dashboard design while keeping the same colors and typography.

---

# 14. Post Data Model

Each post should support:

```ts
{
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: "news" | "sports" | "fashion" | "tech" | "science";
  tags: string[];
  author: string;
  authorImage?: string;
  status: "draft" | "published";
  publishedAt?: Date;
  readingTime?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

---

# 15. Category System

Use the same five categories everywhere.

```text
News
Sports
Fashion
Tech
Science
```

Category labels should use restrained colors.

Suggested accents:

| Category | Accent |
|---|---|
| News | Burgundy |
| Sports | Deep Green |
| Fashion | Rose |
| Tech | Royal Blue |
| Science | Deep Violet |

These colors should remain small accents on badges, filters and icons. The overall website should still feel black, cream and gold.

---

# 16. Image Direction

Photography should feel like an editorial magazine.

## News

Use:

- Real locations
- People
- Cities
- Politics
- Economy
- Current events

## Sports

Use:

- Athletes in action
- Stadiums
- Training
- Competition

## Fashion

Use:

- High-end street photography
- Fashion portraits
- Editorial styling
- Clothing details

## Tech

Use:

- Devices
- Workspaces
- AI
- Software
- Modern technology

## Science

Use:

- Space
- Laboratories
- Scientists
- Nature
- Microscopy
- Scientific equipment

### Image treatment

Avoid excessive filters.

Use:

- Natural photography
- High contrast where appropriate
- Slight dark overlays for text-on-image cards

---

# 17. Buttons

Primary button:

```text
Background: #111111
Text: #FFFFFF
Border: none
Radius: 2–4px
```

Hover:

```text
Background: #C89B55
```

Secondary button:

```text
Background: transparent
Border: 1px solid #111111
Text: #111111
```

Gold accent button:

```text
Background: #C89B55
Text: #111111
```

---

# 18. Cards

Cards should feel editorial rather than like app UI.

Use:

- Minimal borders
- Very small radius
- Large photography
- Serif headlines
- Plenty of whitespace

Avoid:

- Heavy shadows
- Excessive rounded corners
- Large gradients
- Excessive icons

---

# 19. Responsive Behaviour

## Desktop

- Full navigation
- Three-column post grids
- Sidebars visible
- Large hero layouts

## Tablet

- Two-column post grids
- Reduced hero size
- Sidebar may move below content

## Mobile

- Compact header
- Hamburger menu
- One-column article grid
- Hero becomes vertical
- Sidebar moves below content
- Filters become horizontally scrollable
- Article content uses full width
- Newsletter stacks vertically

---

# 20. Navigation

Primary navigation:

```text
Home
News
Sports
Fashion
Tech
Science
About Us
All Posts
```

Header actions:

```text
Search
Sign In
Create Account
```

The "All Posts" page should remain easy to reach from both the main navigation and homepage.

---

# 21. Search

Search should allow users to search:

- Post titles
- Excerpts
- Content
- Tags

Search results should reuse the All Posts card layout.

Example:

```text
Search results for "AI"

12 results found
```

---

# 22. Account / Authentication

Users need an account before commenting.

Account functionality:

- Sign up
- Sign in
- Sign out
- Forgot password
- Profile
- Comment history

The public website should allow visitors to read articles without creating an account.

Account creation should only become necessary for features such as commenting.

---

# 23. UX Rules

1. Every article card should clearly show its category.
2. Every article should show publication date and reading time.
3. Images should always have useful alt text.
4. Article titles should remain readable over hero images.
5. Filters should work without a full page reload where possible.
6. The active category should always be visually obvious.
7. Search should have a clear empty state.
8. Deleted posts should not appear on the public website.
9. Draft posts should never appear publicly.
10. Published articles should have clean SEO-friendly slugs.

---

# 24. SEO

Every article should support:

- SEO title
- Meta description
- Canonical URL
- Open Graph image
- Open Graph title
- Open Graph description
- Article schema
- Breadcrumb schema

Recommended article URL:

```text
/news/nigerias-economy-shows-signs-of-steady-recovery
```

or:

```text
/posts/nigerias-economy-shows-signs-of-steady-recovery
```

Keep URLs lowercase and use hyphens.

---

# 25. Accessibility

The website should:

- Use semantic HTML
- Provide alt text
- Support keyboard navigation
- Maintain readable contrast
- Have visible focus states
- Use accessible form labels
- Provide accessible buttons
- Avoid relying only on color to communicate state

---

# 26. Overall Visual Rule

The website should feel like a **premium digital magazine**.

Think:

```text
Editorial photography
+
Elegant serif headlines
+
Clean sans-serif UI
+
Cream backgrounds
+
Black typography
+
Small gold accents
+
Generous whitespace
```

Avoid turning the design into a generic SaaS dashboard, colorful news portal, or card-heavy social media interface.

The public pages should feel calm, polished and magazine-like while remaining easy to navigate.

---

# 27. Frontend Architecture & Styling Standards

## Component architecture

- Build pages from focused, reusable components rather than placing an entire screen in one large page file.
- Keep route files responsible for route data, metadata and page composition.
- Put shared site chrome in `components/site`, editorial primitives in `components/editorial`, and feature-specific components in folders such as `components/home` and `components/posts`.
- Keep post types, mock content and shared editorial data in a dedicated module under `lib` until a backend data source replaces it.
- Reuse a component whenever the same content pattern appears on more than one screen.
- When a touched file contains an unnecessarily large or poorly structured implementation, refactor the relevant portion as part of the work. Unrelated files do not need speculative cleanup.

## Styling

- Use Tailwind utility classes directly in components for layout and component styling.
- Do not add page-specific or component-specific class selectors to `app/globals.css`.
- Keep `app/globals.css` limited to the Tailwind import and genuinely global theme tokens or base rules.
- Prefer responsive Tailwind variants and arbitrary values where the design requires precise editorial measurements.
- Avoid inline `style` objects when an equivalent Tailwind utility is available.
