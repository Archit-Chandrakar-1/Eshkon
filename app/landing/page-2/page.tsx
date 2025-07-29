import { Metadata } from 'next';
import { getPageContent } from '@/lib/contentful';
import PageRenderer from '@/components/PageRenderer/PageRenderer';
import { LayoutComponent } from '@/types/contentful';

// Sample data for page 2 - different layout
const sampleLayoutConfig: LayoutComponent[] = [
  { id: 'two-col-2', type: 'twoColumn', contentId: 'sample-two-col-2' },
  { id: 'hero-2', type: 'hero', contentId: 'sample-hero-2' },
  { id: 'grid-2', type: 'imageGrid', contentId: 'sample-grid-2' },
];

const sampleContentMap = {
  'sample-two-col-2': {
    sys: { id: 'sample-two-col-2' },
    heading: 'Our Proven Track Record',
    subtitle: 'With over 500 successful projects and 95% client satisfaction rate, we deliver excellence every time. See what makes us different.',
    ctaText: 'View Portfolio',
    ctaUrl: '/portfolio',
    image: {
      sys: { id: 'track-record-img' },
      title: 'Success metrics',
      description: 'Charts showing our success',
      url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      width: 800,
      height: 600,
      contentType: 'image/jpeg',
    },
  },
  'sample-hero-2': {
    sys: { id: 'sample-hero-2' },
    heading: 'Ready to Scale Your Business?',
    subtitle: 'Join thousands of companies who trust us to deliver exceptional results and drive growth',
    ctaText: 'Start Your Journey',
    ctaUrl: '/get-started',
    backgroundImage: {
      sys: { id: 'hero-bg-2' },
      title: 'Business growth background',
      description: 'Modern office space',
      url: 'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg',
      width: 1920,
      height: 1080,
      contentType: 'image/jpeg',
    },
  },
  'sample-grid-2': {
    sys: { id: 'sample-grid-2' },
    title: 'Featured Success Stories',
    images: [
      {
        sys: { id: 'success-1' },
        title: 'E-commerce Transformation',
        description: '300% increase in online sales',
        url: 'https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg',
        width: 800,
        height: 800,
        contentType: 'image/jpeg',
      },
      {
        sys: { id: 'success-2' },
        title: 'Digital Marketing Campaign',
        description: '500% ROI improvement',
        url: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg',
        width: 800,
        height: 800,
        contentType: 'image/jpeg',
      },
      {
        sys: { id: 'success-3' },
        title: 'Process Automation',
        description: '60% reduction in manual work',
        url: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg',
        width: 800,
        height: 800,
        contentType: 'image/jpeg',
      },
      {
        sys: { id: 'success-4' },
        title: 'Customer Experience Redesign',
        description: '95% customer satisfaction',
        url: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg',
        width: 800,
        height: 800,
        contentType: 'image/jpeg',
      },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seoTitle = 'Page 2 - Success Stories & Results';
  const seoDescription = 'Explore our proven track record of success with detailed case studies and client testimonials that showcase real results.';
  
  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/landing/page-2`,
      images: [
        {
          url: 'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg',
          width: 1200,
          height: 630,
          alt: 'Page 2 Hero Image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ['https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg'],
    },
  };
}

export default async function Page2() {
  const layout = sampleLayoutConfig;
  const contentMap = sampleContentMap;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Page 2 - Success Stories & Results',
    description: 'Explore our proven track record of success with detailed case studies and client testimonials.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/landing/page-2`,
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
          name: 'Page 2',
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/landing/page-2`,
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