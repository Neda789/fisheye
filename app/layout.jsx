import "./globals.css";
import Header from "./components/Header/Header";

// Métadonnées de l'application — utilisées pour le titre et la description de la page
export const metadata = {
  title: "FishEye",
  description: "Photographes indépendants",
};

// Layout racine — enveloppe toutes les pages de l'application
export default function RootLayout({ children }) {
  return (
    // Langue définie en français pour l'accessibilité
    <html lang="fr">
      <head>
        {/* Import de la police DM Sans depuis Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* En-tête affiché sur toutes les pages */}
        <Header />

        {/* Contenu de la page courante injecté ici */}
        {children}
      </body>
    </html>
  );
}
