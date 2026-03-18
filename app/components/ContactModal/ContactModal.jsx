"use client";
import { useState } from "react";
import "./ContactModal.css";

// Composant modal de contact — reçoit le nom du photographe en prop
export default function ContactModal({ photographerName }) {
  // État pour contrôler l'ouverture/fermeture de la modale
  const [isOpen, setIsOpen] = useState(false);

  // États pour les champs du formulaire
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Fonctions pour ouvrir et fermer la modale
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Gestion de la soumission du formulaire
  const handleContact = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log("Données de contact :");
    console.log("Prénom:", firstName);
    console.log("Nom:", lastName);
    console.log("Email:", email);
    console.log("Message:", message);
    closeModal(); // Ferme la modale après envoi
  };

  return (
    <>
      {/* Bouton qui ouvre la modale */}
      <button
        className="contact-btn"
        onClick={openModal}
        aria-label={`Contacter ${photographerName}`}
      >
        Contactez-moi
      </button>

      {/* Affichage conditionnel de la modale */}
      {isOpen && (
        // Overlay — clic en dehors ferme la modale
        <div
          className="modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          {/* Contenu de la modale — stopPropagation évite la fermeture au clic intérieur */}
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {/* Bouton de fermeture */}
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Fermer la modale"
            >
              ✕
            </button>

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

              {/* Bouton de soumission */}
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
