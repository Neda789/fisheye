"use client";
import { useState } from "react";

// Composant pour filtrer et trier les médias
export default function Filters({ medias, onSort }) {
  // État pour le critère de tri actuel (likes, date, titre)
  const [sortBy, setSortBy] = useState("likes");

  // État pour savoir si le menu déroulant est ouvert ou fermé
  const [isOpen, setIsOpen] = useState(false);

  // Options de tri disponibles
  const options = [
    { value: "likes", label: "Popularité" },
    { value: "date", label: "Date" },
    { value: "title", label: "Titre" },
  ];

  // Fonction pour trier les médias selon le critère sélectionné
  const handleSort = (value) => {
    setSortBy(value); // Met à jour le critère actif
    setIsOpen(false); // Ferme le menu déroulant après sélection

    // Copie et tri des médias selon le critère choisi
    const sorted = [...medias].sort((a, b) => {
      if (value === "likes") return b.likes - a.likes; // Tri par popularité (likes décroissant)
      if (value === "date") return new Date(b.date) - new Date(a.date); // Tri par date (la plus récente d'abord)
      if (value === "title") return a.title.localeCompare(b.title); // Tri par titre (ordre alphabétique)
      return 0;
    });

    // Envoi des médias triés au composant parent
    onSort(sorted);
  };

  // Récupère le label de l'option actuellement sélectionnée
  const currentLabel = options.find((o) => o.value === sortBy)?.label;

  return (
    <div className="sort-container">
      {/* Label du menu de tri */}
      <span id="sort-label" className="sort-label">
        Trier par
      </span>

      {/* Menu déroulant personnalisé */}
      <div className={`custom-select ${isOpen ? "is-open" : ""}`}>
        {/* Bouton principal qui ouvre/ferme le menu */}
        <button
          className="select-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox" // Indique que c'est un menu
          aria-expanded={isOpen} // Accessibilité : menu ouvert ou fermé
          aria-labelledby="sort-label" // Label pour les lecteurs d'écran
        >
          {currentLabel} {/* Affiche le critère sélectionné */}
          <span className={`arrow ${isOpen ? "up" : "down"}`}></span>{" "}
          {/* Flèche indiquant l'état */}
        </button>

        {/* Liste des options (affichée seulement si le menu est ouvert) */}
        {isOpen && (
          <div className="options-list" role="listbox">
            {options
              .filter((option) => option.value !== sortBy) // On n'affiche pas l'option déjà sélectionnée
              .map((option) => (
                <button
                  key={option.value}
                  className="option-item"
                  role="option"
                  onClick={() => handleSort(option.value)} // Trie quand on clique sur une option
                >
                  {option.label}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
