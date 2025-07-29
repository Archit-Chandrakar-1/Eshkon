export interface ContentfulAsset {
  sys: {
    id: string;
  };
  title: string;
  description: string;
  url: string;
  width: number;
  height: number;
  contentType: string;
}

export interface HeroBlockContent {
  sys: { id: string };
  heading: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImage: ContentfulAsset;
}

export interface TwoColumnContent {
  sys: { id: string };
  heading: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  image: ContentfulAsset;
}

export interface ImageGridContent {
  sys: { id: string };
  title: string;
  images: ContentfulAsset[];
}

export interface LayoutComponent {
  id: string;
  type: 'hero' | 'twoColumn' | 'imageGrid';
  contentId: string;
}

export interface PageContent {
  sys: { id: string };
  title: string;
  slug: string;
  layoutConfig: LayoutComponent[];
  seoTitle: string;
  seoDescription: string;
}

export interface ContentfulResponse<T> {
  data: {
    [key: string]: T;
  };
}