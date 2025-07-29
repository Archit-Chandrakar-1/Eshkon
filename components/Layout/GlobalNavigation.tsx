'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './GlobalNavigation.module.css';

export default function GlobalNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/landing/page-1', label: 'Page 1' },
    { href: '/landing/page-2', label: 'Page 2' },
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Content Builder
        </Link>
        
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}