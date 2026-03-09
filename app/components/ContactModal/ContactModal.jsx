'use client';

import { useState } from 'react';
import './ContactModal.css';

export default function ContactModal({ photographerName }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className="contact-btn" onClick={openModal}>
        Contactez-moi
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Fermer la modale">✕</button>
<h2>Contactez-moi<br />{photographerName}</h2>

<label>Prénom</label>
<input type="text" placeholder="" aria-label="Prénom" />

<label>Nom</label>
<input type="text" placeholder="" aria-label="Nom" />

<label>Email</label>
<input type="email" placeholder="" aria-label="Email" />

<label>Votre Message</label>
<textarea placeholder="" aria-label="Votre message" rows={4} />

<button className="submit-btn">Envoyer</button>
          </div>
        </div>
      )}
    </>
  );
}