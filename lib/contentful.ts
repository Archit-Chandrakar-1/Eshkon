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
    const response: ContentfulResponse<{ pageCollection: { items: PageContent[] } }> = await client.request(query, { slug });
    return response.data.pageCollection.items[0] || null;
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
    const response: ContentfulResponse<{ heroBlock: HeroBlockContent }> = await client.request(query, { id });
    return response.data.heroBlock || null;
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
    const response: ContentfulResponse<{ twoColumnBlock: TwoColumnContent }> = await client.request(query, { id });
    return response.data.twoColumnBlock || null;
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
    const response: ContentfulResponse<{ imageGridBlock: ImageGridContent }> = await client.request(query, { id });
    return response.data.imageGridBlock || null;
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
    const response: ContentfulResponse<{ pageCollection: { items: PageContent[] } }> = await client.request(query);
    return response.data.pageCollection.items;
  } catch (error) {
    console.error('Error fetching all pages:', error);
    return [];
  }
};