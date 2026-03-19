"use client";
import { useState, useEffect, useRef } from "react";
import "./ContactModal.css";

// Composant de modale de contact
// Reçoit le nom du photographe en propriété (prop)
export default function ContactModal({ photographerName }) {
  // État pour gérer l'ouverture et la fermeture de la modale
  const [isOpen, setIsOpen] = useState(false);

  // États pour stocker les valeurs des champs du formulaire
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Référence vers la modale pour gérer le focus (accessibilité)
  const modalRef = useRef(null);

  // Fonction pour ouvrir la modale
  const openModal = () => setIsOpen(true);

  // Fonction pour fermer la modale
  const closeModal = () => setIsOpen(false);

  // Gestion de la touche ESC pour fermer la modale
  useEffect(() => {
    const handleEsc = (event) => {
      // Vérifie si la touche pressée est "Escape"
      if (event.key === "Escape") {
        closeModal();
      }
    };

    // Ajoute l'écouteur uniquement si la modale est ouverte
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    // Nettoyage de l'écouteur pour éviter les fuites mémoire
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  // Met le focus sur la modale lorsqu'elle s'ouvre (accessibilité clavier)
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // Gestion de la soumission du formulaire
  const handleContact = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Affichage des données dans la console (à remplacer par un vrai traitement)
    console.log("Données de contact :");
    console.log("Prénom:", firstName);
    console.log("Nom:", lastName);
    console.log("Email:", email);
    console.log("Message:", message);

    // Ferme la modale après soumission
    closeModal();
  };

  return (
    <>
      {/* Bouton pour ouvrir la modale */}
      <button
        className="contact-btn"
        onClick={openModal}
        aria-label={`Contacter ${photographerName}`}
      >
        Contactez-moi
      </button>

      {/* Affichage conditionnel de la modale */}
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={closeModal} // Ferme la modale si clic en dehors
          role="dialog"
          aria-modal="true"
        >
          {/* Conteneur de la modale */}
          <div
            className="modal"
            ref={modalRef}
            tabIndex="-1" // Permet de recevoir le focus clavier
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture au clic intérieur
          >
            {/* Bouton de fermeture */}
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Fermer la modale"
            >
              ✕
            </button>

            {/* Titre de la modale */}
            <h2>
              Contactez-moi
              <br />
              {photographerName}
            </h2>

            {/* Formulaire de contact */}
            <form onSubmit={handleContact}>
              {/* Champ prénom */}
              <label htmlFor="firstname">Prénom</label>
              <input
                id="firstname"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              {/* Champ nom */}
              <label htmlFor="lastname">Nom</label>
              <input
                id="lastname"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              {/* Champ email */}
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Champ message */}
              <label htmlFor="message">Votre Message</label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              {/* Bouton d'envoi */}
              <button type="submit" className="submit-btn">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
