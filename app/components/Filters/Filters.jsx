"use client";
import { useState } from "react";

// Composant de filtrage — reçoit la liste des médias et une fonction de callback pour le tri
export default function Filters({ medias, onSort }) {
  // État du critère de tri actif (par défaut : popularité)
  const [sortBy, setSortBy] = useState("likes");

  // État pour contrôler l'ouverture/fermeture du menu déroulant
  const [isOpen, setIsOpen] = useState(false);

  // Liste des options de tri disponibles
  const options = [
    { value: "likes", label: "Popularité" },
    { value: "date", label: "Date" },
    { value: "title", label: "Titre" },
  ];

  // Gestion du tri au clic sur une option
  const handleSort = (value) => {
    setSortBy(value); // Met à jour le critère actif
    setIsOpen(false); // Ferme le menu déroulant

    // Crée une copie triée du tableau de médias selon le critère choisi
    const sorted = [...medias].sort((a, b) => {
      if (value === "likes") return b.likes - a.likes; // Tri par popularité décroissante
      if (value === "date") return new Date(b.date) - new Date(a.date); // Tri par date décroissante
      if (value === "title") return a.title.localeCompare(b.title); // Tri alphabétique
      return 0;
    });

    // Envoie le tableau trié au composant parent
    onSort(sorted);
  };

  // Récupère le label de l'option actuellement sélectionnée
  const currentLabel = options.find((o) => o.value === sortBy)?.label;

  return (
    <div className="sort-container">
      {/* Label accessible lié au bouton via aria-labelledby */}
      <span id="sort-label" className="sort-label">
        Trier par
      </span>

      {/* Menu déroulant personnalisé — classe is-open ajoutée dynamiquement */}
      <div className={`custom-select ${isOpen ? "is-open" : ""}`}>
        {/* Bouton principal qui affiche l'option sélectionnée */}
        <button
          className="select-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="sort-label"
        >
          {currentLabel}
          {/* Flèche qui change de direction selon l'état du menu */}
          <span className={`arrow ${isOpen ? "up" : "down"}`}></span>
        </button>

        {/* Liste des options — affichée uniquement si le menu est ouvert */}
        {isOpen && (
          <div className="options-list" role="listbox">
            {options
              .filter((option) => option.value !== sortBy) // Masque l'option déjà sélectionnée
              .map((option) => (
                <div
                  key={option.value}
                  className="option-item"
                  role="option"
                  tabIndex={0} // Permet la navigation au clavier
                  onClick={() => handleSort(option.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSort(option.value)
                  } // Sélection via la touche Entrée
                >
                  {option.label}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
