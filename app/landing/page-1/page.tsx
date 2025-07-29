import { Metadata } from 'next';
import { getPageContent, getHeroContent, getTwoColumnContent, getImageGridContent } from '@/lib/contentful';
import PageRenderer from '@/components/PageRenderer/PageRenderer';
import { LayoutComponent } from '@/types/contentful';

// Sample data for development - replace with actual Contentful data
const sampleLayoutConfig: LayoutComponent[] = [
  { id: 'hero-1', type: 'hero', contentId: 'sample-hero-1' },
  { id: 'grid-1', type: 'imageGrid', contentId: 'sample-grid-1' },
  { id: 'two-col-1', type: 'twoColumn', contentId: 'sample-two-col-1' },
];

const sampleContentMap = {
  'sample-hero-1': {
    sys: { id: 'sample-hero-1' },
    heading: 'Welcome to Our Amazing Platform',
    subtitle: 'Transform your business with our cutting-edge solutions and expert guidance',
    ctaText: 'Get Started Today',
    ctaUrl: '/contact',
    backgroundImage: {
      sys: { id: 'hero-bg' },
      title: 'Hero Background',
      description: 'Beautiful landscape background',
      url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      width: 1920,
      height: 1080,
      contentType: 'image/jpeg',
    },
  },
  'sample-grid-1': {
    sys: { id: 'sample-grid-1' },
    title: 'Our Work in Action',
    images: [
      {
        sys: { id: 'grid-img-1' },
        title: 'Project Alpha',
        description: 'Innovative solution for modern challenges',
        url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
        width: 800,
        height: 800,
        contentType: 'image/jpeg',
      },
      {
        sys: { id: 'grid-img-2' },
        title: 'Project Beta',
        description: 'Creative design meets functionality',
        url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
        width: 800,
        height: 800,
        contentType: 'image/jpeg',
      },
      {
        sys: { id: 'grid-img-3' },
        title: 'Project Gamma',
        description: 'Cutting-edge technology implementation',
        url: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg',
        width: 800,
        height: 800,
        contentType: 'image/jpeg',
      },
      {
        sys: { id: 'grid-img-4' },
        title: 'Project Delta',
        description: 'Seamless user experience design',
        url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
        width: 800,
        height: 800,
        contentType: 'image/jpeg',
      },
    ],
  },
  'sample-two-col-1': {
    sys: { id: 'sample-two-col-1' },
    heading: 'Why Choose Our Solution?',
    subtitle: 'We combine industry expertise with innovative technology to deliver results that exceed expectations. Our team is dedicated to your success.',
    ctaText: 'Learn More',
    ctaUrl: '/about',
    image: {
      sys: { id: 'two-col-img' },
      title: 'Team collaboration',
      description: 'Our team working together',
      url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
      width: 800,
      height: 600,
      contentType: 'image/jpeg',
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seoTitle = 'Page 1 - Content Builder Platform';
  const seoDescription = 'Discover our innovative solutions and see how we can transform your business with cutting-edge technology and expert guidance.';
  
  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/landing/page-1`,
      images: [
        {
          url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
          width: 1200,
          height: 630,
          alt: 'Page 1 Hero Image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ['https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'],
    },
  };
}

export default async function Page1() {
  // In production, fetch from Contentful:
  // const pageContent = await getPageContent('page-1');
  // const layout = pageContent?.layoutConfig || [];
  
  // For now, use sample data
  const layout = sampleLayoutConfig;
  const contentMap = sampleContentMap;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Page 1 - Content Builder Platform',
    description: 'Discover our innovative solutions and see how we can transform your business.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/landing/page-1`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: process.env.NEXT_PUBLIC_SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Landing',
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/landing`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Page 1',
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/landing/page-1`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageRenderer layout={layout} contentMap={contentMap} />
    </>
  );
}