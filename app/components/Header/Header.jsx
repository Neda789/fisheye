"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./Header.css";

// Composant d'en-tête global — affiché sur toutes les pages
export default function Header() {
  // Récupère le chemin de la page actuelle
  const pathname = usePathname();

  // Vérifie si l'utilisateur est sur la page d'accueil
  const isHomePage = pathname === "/";

  return (
    <header className="header" role="banner">
      {/* Navigation principale avec lien vers l'accueil */}
      <nav aria-label="Navigation principale">
        <Link href="/" aria-label="FishEye - Retour à l'accueil">
          {/* Logo cliquable qui redirige vers l'accueil */}
          <Image
            className="logo"
            src="/assets/Logo.png"
            alt="FishEye logo"
            width={200}
            height={50}
          />
        </Link>
      </nav>

      {/* Titre affiché uniquement sur la page d'accueil */}
      {isHomePage && <h1>Nos photographes</h1>}
    </header>
  );
}
