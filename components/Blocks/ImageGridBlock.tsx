import Image from 'next/image';
import { ImageGridContent } from '@/types/contentful';
import styles from './ImageGridBlock.module.css';

interface ImageGridBlockProps {
  content: ImageGridContent;
}

export default function ImageGridBlock({ content }: ImageGridBlockProps) {
  const { title, images } = content;
  
  // Ensure we have exactly 4 images, pad with placeholder if needed
  const gridImages = images.slice(0, 4);
  while (gridImages.length < 4) {
    gridImages.push({
      sys: { id: `placeholder-${gridImages.length}` },
      title: 'Placeholder Image',
      description: 'Placeholder image for grid',
      url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
      width: 800,
      height: 800,
      contentType: 'image/jpeg',
    });
  }

  return (
    <section className={styles.imageGrid}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        
        <div className={styles.grid}>
          {gridImages.map((image, index) => (
            <div key={image.sys.id} className={styles.imageContainer}>
              <Image
                src={image.url}
                alt={image.description || image.title}
                fill
                className={styles.image}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
              />
              
              <div className={styles.overlay}>
                <div className={styles.overlayText}>
                  {image.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}