"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./Header.css";
// Le composant Header affiche le logo de l'application et, si l'utilisateur est sur la page d'accueil, un titre indiquant "Nos photographes". Il utilise le hook usePathname pour déterminer la page actuelle et conditionnellement afficher le titre.
export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
// Vérifie si l'utilisateur est sur la page d'accueil en comparant le pathname actuel à "/". Si c'est le cas, isHomePage sera true, ce qui permettra d'afficher le titre "Nos photographes".
  return (
    <div className="header-container">
      <header className="header" role="banner">
        <nav aria-label="Navigation principale">
          <Link href="/" aria-label="FishEye - Retour à l'accueil">
            <Image
              className="logo"
              src="/assets/Logo.png"
              alt="FishEye logo"
              width={200}
              height={50}
              priority
            />
          </Link>
        </nav>
        {/* Affiche le titre "Nos photographes" uniquement si l'utilisateur est sur la page d'accueil */}
        {isHomePage && <h1 className="home-title">Nos photographes</h1>}
      </header>
    </div>
  );
}
