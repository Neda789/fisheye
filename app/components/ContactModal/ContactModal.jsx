"use client";

import { useState, useEffect, useRef } from "react";
import "./ContactModal.css";

// Composant de modal de contact pour un photographe
export default function ContactModal({ photographerName }) {
  // État pour gérer l'ouverture de la modal
  const [isOpen, setIsOpen] = useState(false);

  // États pour stocker les valeurs des champs du formulaire
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Référence vers la modal pour le focus et trap clavier
  const modalRef = useRef(null);

  // Fonctions pour ouvrir et fermer la modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Fermeture de la modal avec la touche ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") closeModal();
    };

    if (isOpen) document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Gestion du focus et "tab trap" pour accessibilité clavier
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    // Sélectionne tous les éléments focusables
    const focusable = modalRef.current.querySelectorAll(
      "button, input, textarea",
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // Met le focus sur la modal à l'ouverture
    modalRef.current.focus();

    const handleTab = (e) => {
      if (e.key !== "Tab") return;

      // Si Shift + Tab sur le premier élément, boucle vers le dernier
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
      // Si Tab sur le dernier élément, boucle vers le premier
      else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // Gestion de la soumission du formulaire
  const handleContact = (e) => {
    e.preventDefault();
    // Ici tu pourrais envoyer les données vers un serveur
    closeModal();
  };

  return (
    <>
      {/* Bouton pour ouvrir la modal */}
      <button
        className="contact-btn"
        onClick={openModal}
        aria-label={`Contacter ${photographerName}`}
      >
        Contactez-moi
      </button>

      {/* Affichage conditionnel de la modal */}
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={closeModal} // Ferme si clic en dehors
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal"
            ref={modalRef}
            tabIndex="0"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture si clic à l'intérieur
          >
            {/* Bouton de fermeture */}
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Fermer la modale"
            >
              ✕
            </button>

            {/* Titre de la modal */}
            <h2>
              Contactez-moi
              <br />
              {photographerName}
            </h2>

            {/* Formulaire de contact */}
            <form onSubmit={handleContact}>
              <label htmlFor="firstname">Prénom</label>
              <input
                id="firstname"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <label htmlFor="lastname">Nom</label>
              <input
                id="lastname"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

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
