import Image from 'next/image';
import Link from 'next/link';
import { HeroBlockContent } from '@/types/contentful';
import styles from './HeroBlock.module.css';

interface HeroBlockProps {
  content: HeroBlockContent;
}

export default function HeroBlock({ content }: HeroBlockProps) {
  const { heading, subtitle, ctaText, ctaUrl, backgroundImage } = content;

  return (
    <section className={styles.hero}>
      {backgroundImage && (
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.description || backgroundImage.title}
          fill
          className={styles.backgroundImage}
          priority
          sizes="100vw"
        />
      )}
      
      <div className={styles.overlay} />
      
      <div className={styles.content}>
        <h1 className={styles.heading}>{heading}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {ctaText && ctaUrl && (
          <Link href={ctaUrl} className={styles.cta}>
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}