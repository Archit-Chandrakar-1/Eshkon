import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Content Builder Platform</h1>
        <p className={styles.subtitle}>
          Build dynamic pages with drag-and-drop components powered by Contentful
        </p>
      </header>
      
      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href="/contentful-app" className={styles.card}>
            <h2>Contentful App</h2>
            <p>Access the drag-and-drop layout builder interface</p>
          </Link>
          
          <Link href="/landing/page-1" className={styles.card}>
            <h2>Page 1</h2>
            <p>View the first landing page with your configured layout</p>
          </Link>
          
          <Link href="/landing/page-2" className={styles.card}>
            <h2>Page 2</h2>
            <p>View the second landing page with different content</p>
          </Link>
        </div>
        
        <div className={styles.features}>
          <h2>Key Features</h2>
          <ul>
            <li>Drag-and-drop component arrangement</li>
            <li>Redux-powered state management with undo/redo</li>
            <li>Automatic saves with conflict prevention</li>
            <li>Three component types: Hero, Two Column, 2x2 Image Grid</li>
            <li>Contentful GraphQL integration</li>
            <li>SEO optimized with metadata and JSON-LD</li>
            <li>Performance optimized images with next/image</li>
            <li>Responsive design for all devices</li>
          </ul>
        </div>
      </main>
    </div>
  );
}