# Content Builder Platform

A fullstack Next.js application with Contentful integration for building dynamic landing pages through a drag-and-drop interface.

## Features

### Contentful App
- **Fullscreen Interface**: Custom Contentful app that renders in fullscreen mode
- **Drag-and-Drop Builder**: Visual component arrangement with intuitive UX
- **Three Component Types**:
  - Hero Block: heading, subtitle, CTA, background image
  - Two Column Row: left content (heading, subtitle, CTA), right image
  - 2x2 Image Grid: optimized images from Contentful
- **Redux State Management**: 
  - Undo/redo functionality with state history
  - Autosave middleware with 2-second delay
  - Redux Persist for layout restoration after refresh
- **Component Previews**: Thumbnails and descriptions in drag-drop list
- **Preview Button**: Opens live Vercel deployment for testing

### Next.js Frontend
- **App Router**: Next.js 15.3+ with full SSG support
- **Two Landing Pages**: `/landing/page-1` and `/landing/page-2`
- **Dynamic Layout Rendering**: Components rendered based on Contentful config
- **GraphQL Integration**: Efficient content fetching from Contentful
- **Global Navigation**: Links between pages with active states

### Performance & SEO
- **Image Optimization**: next/image for all assets with proper sizing
- **Dynamic Metadata**: SEO titles and descriptions per page
- **JSON-LD Structured Data**: WebPage and BreadcrumbList schemas
- **Lighthouse Optimized**: Designed for ≥90 scores in Performance, SEO, Accessibility
- **Responsive Design**: Mobile-first approach with proper breakpoints

### Architecture
- **TypeScript**: Full type safety for components and data models
- **CSS Modules**: Scoped styling with clean design system
- **Modular Components**: Clean separation of concerns
- **Error Handling**: Robust GraphQL query management
- **Environment Configuration**: Secure API key management

## Tech Stack

- **Frontend**: Next.js 15.3+, TypeScript, React
- **State Management**: Redux Toolkit, Redux Persist
- **CMS**: Contentful (GraphQL API, App SDK)
- **Styling**: CSS Modules (no external UI libraries)
- **Drag & Drop**: @dnd-kit/core with sortable utilities
- **Deployment**: Vercel with automatic builds
- **Version Control**: Git with semantic tagging

## Setup Instructions

### Prerequisites
- Node.js 18+
- Contentful account with space setup
- Vercel account for deployment

### Environment Variables
Copy `.env.example` to `.env.local` and fill in your Contentful credentials:

```bash
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token_here
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token_here

# Next.js Configuration  
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Contentful Content Models

Create these content models in your Contentful space:

#### Page Content Model
- **API ID**: `page`
- **Fields**:
  - `title` (Short text)
  - `slug` (Short text, unique)
  - `layoutConfig` (JSON object) - stores component arrangement
  - `seoTitle` (Short text)
  - `seoDescription` (Long text)

#### Hero Block Content Model
- **API ID**: `heroBlock`
- **Fields**:
  - `heading` (Short text)
  - `subtitle` (Long text)
  - `ctaText` (Short text)
  - `ctaUrl` (Short text)
  - `backgroundImage` (Media, single file)

#### Two Column Block Content Model
- **API ID**: `twoColumnBlock`
- **Fields**:
  - `heading` (Short text)
  - `subtitle` (Long text)
  - `ctaText` (Short text)
  - `ctaUrl` (Short text)
  - `image` (Media, single file)

#### Image Grid Block Content Model
- **API ID**: `imageGridBlock`
- **Fields**:
  - `title` (Short text)
  - `images` (Media, multiple files, exactly 4 images)

## Development Workflow

### Component Development
1. Create component in `components/Blocks/`
2. Add CSS Module in same directory
3. Update `PageRenderer` to handle new component type
4. Add to `AVAILABLE_COMPONENTS` in LayoutBuilder

### Adding New Pages
1. Create route in `app/landing/[page-name]/page.tsx`
2. Implement `generateMetadata` for SEO
3. Add JSON-LD structured data
4. Update navigation if needed

### State Management
- Use Redux actions for layout changes
- Leverage middleware for autosave functionality
- Implement undo/redo with history management
- Persist state across browser sessions

## Deployment

### Vercel Setup
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Enable automatic deployments on push to main
4. Set build command: `npm run build`
5. Set output directory: `.next`

### Git Workflow
```bash
# Development
git checkout -b feature/new-component
git commit -m "feat: add new component type"
git push origin feature/new-component

# Release
git checkout main
git tag -a v1.0.0 -m "Release v1.0.0: Initial production release"
git push origin v1.0.0
```

## Performance Optimizations

- **Static Site Generation**: Pre-built pages at build time
- **Image Optimization**: Automatic WebP conversion and sizing
- **Code Splitting**: Automatic bundling optimization
- **Prefetching**: Next.js automatic route prefetching
- **Caching**: Proper cache headers for static assets

## Testing

Run the test suite:
```bash
npm test
```

### Testing Strategy
- Unit tests for Redux reducers and actions
- Component testing with React Testing Library
- Integration tests for GraphQL queries
- E2E testing for drag-and-drop functionality

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with proper TypeScript types
4. Add tests for new functionality
5. Update documentation
6. Submit pull request

## License

MIT License - see LICENSE file for details.