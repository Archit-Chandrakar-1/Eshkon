import { GraphQLClient } from 'graphql-request';
import { ContentfulResponse, PageContent, HeroBlockContent, TwoColumnContent, ImageGridContent } from '@/types/contentful';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
});

export const getPageContent = async (slug: string): Promise<PageContent | null> => {
  const query = `
    query GetPage($slug: String!) {
      pageCollection(where: { slug: $slug }, limit: 1) {
        items {
          sys { id }
          title
          slug
          layoutConfig
          seoTitle
          seoDescription
        }
      }
    }
  `;

  try {
    const response = await client.request(query, { slug }) as { pageCollection: { items: PageContent[] } };
    return response.pageCollection.items[0] || null;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return null;
  }
};

export const getHeroContent = async (id: string): Promise<HeroBlockContent | null> => {
  const query = `
    query GetHeroBlock($id: String!) {
      heroBlock(id: $id) {
        sys { id }
        heading
        subtitle
        ctaText
        ctaUrl
        backgroundImage {
          sys { id }
          title
          description
          url
          width
          height
          contentType
        }
      }
    }
  `;

  try {
    const response = await client.request(query, { id }) as { heroBlock: HeroBlockContent };
    return response.heroBlock || null;
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return null;
  }
};

export const getTwoColumnContent = async (id: string): Promise<TwoColumnContent | null> => {
  const query = `
    query GetTwoColumnBlock($id: String!) {
      twoColumnBlock(id: $id) {
        sys { id }
        heading
        subtitle
        ctaText
        ctaUrl
        image {
          sys { id }
          title
          description
          url
          width
          height
          contentType
        }
      }
    }
  `;

  try {
    const response = await client.request(query, { id }) as { twoColumnBlock: TwoColumnContent };
    return response.twoColumnBlock || null;
  } catch (error) {
    console.error('Error fetching two column content:', error);
    return null;
  }
};

export const getImageGridContent = async (id: string): Promise<ImageGridContent | null> => {
  const query = `
    query GetImageGridBlock($id: String!) {
      imageGridBlock(id: $id) {
        sys { id }
        title
        images {
          sys { id }
          title
          description
          url
          width
          height
          contentType
        }
      }
    }
  `;

  try {
    const response = await client.request(query, { id }) as { imageGridBlock: ImageGridContent };
    return response.imageGridBlock || null;
  } catch (error) {
    console.error('Error fetching image grid content:', error);
    return null;
  }
};

export const getAllPages = async (): Promise<PageContent[]> => {
  const query = `
    query GetAllPages {
      pageCollection {
        items {
          sys { id }
          title
          slug
          layoutConfig
          seoTitle
          seoDescription
        }
      }
    }
  `;

  try {
    const response = await client.request(query) as { pageCollection: { items: PageContent[] } };
    return response.pageCollection.items;
  } catch (error) {
    console.error('Error fetching all pages:', error);
    return [];
  }
};