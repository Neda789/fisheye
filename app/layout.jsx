import './globals.css';
import Header from './components/Header/Header';

export const metadata = {
  title: 'FishEye',
  description: 'Photographes indépendants',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}