import Image from 'next/image';
import Link from 'next/link';
import { TwoColumnContent } from '@/types/contentful';
import styles from './TwoColumnBlock.module.css';

interface TwoColumnBlockProps {
  content: TwoColumnContent;
}

export default function TwoColumnBlock({ content }: TwoColumnBlockProps) {
  const { heading, subtitle, ctaText, ctaUrl, image } = content;

  return (
    <section className={styles.twoColumn}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.heading}>{heading}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {ctaText && ctaUrl && (
            <Link href={ctaUrl} className={styles.cta}>
              {ctaText}
            </Link>
          )}
        </div>
        
        {image && (
          <div className={styles.imageContainer}>
            <Image
              src={image.url}
              alt={image.description || image.title}
              width={image.width}
              height={image.height}
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}