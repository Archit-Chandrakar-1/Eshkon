import { LayoutComponent, HeroBlockContent, TwoColumnContent, ImageGridContent } from '@/types/contentful';
import HeroBlock from '@/components/Blocks/HeroBlock';
import TwoColumnBlock from '@/components/Blocks/TwoColumnBlock';
import ImageGridBlock from '@/components/Blocks/ImageGridBlock';

interface PageRendererProps {
  layout: LayoutComponent[];
  contentMap: {
    [key: string]: HeroBlockContent | TwoColumnContent | ImageGridContent;
  };
}

export default function PageRenderer({ layout, contentMap }: PageRendererProps) {
  const renderComponent = (component: LayoutComponent) => {
    const content = contentMap[component.contentId];
    
    if (!content) {
      console.warn(`Content not found for component ${component.id} with contentId ${component.contentId}`);
      return null;
    }

    switch (component.type) {
      case 'hero':
        return <HeroBlock key={component.id} content={content as HeroBlockContent} />;
      case 'twoColumn':
        return <TwoColumnBlock key={component.id} content={content as TwoColumnContent} />;
      case 'imageGrid':
        return <ImageGridBlock key={component.id} content={content as ImageGridContent} />;
      default:
        console.warn(`Unknown component type: ${component.type}`);
        return null;
    }
  };

  return (
    <main>
      {layout.map(renderComponent)}
    </main>
  );
}