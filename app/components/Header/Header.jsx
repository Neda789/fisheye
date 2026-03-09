"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './Header.css';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="header">
      <Link href="/">
        <Image
        className="logo"
          src="/assets/Logo.png"
          alt="FishEye logo"
          width={200}
          height={50}
        />
      </Link>
      {isHomePage && <h1>Nos photographes</h1>}
    </header>
  );
}