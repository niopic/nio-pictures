/* ============================================================
   NiO PICTURES — NIO CHAT BUBBLE
   ============================================================ */

(function () {
  'use strict';

  const bubble = document.querySelector('.chat-bubble');
  const btn = document.querySelector('.chat-btn');
  const popup = document.querySelector('.chat-popup');

  if (!bubble || !btn || !popup) return;

  let open = false;
  let hideTimer = null;

  const openPopup = () => {
    clearTimeout(hideTimer);
    popup.classList.add('open');
    open = true;
  };

  const closePopup = () => {
    popup.classList.remove('open');
    open = false;
  };

  const togglePopup = () => {
    open ? closePopup() : openPopup();
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopup();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (open && !bubble.contains(e.target)) {
      closePopup();
    }
  });

  // Auto-show after delay on first visit
  const hasSeenBubble = sessionStorage.getItem('nio_bubble_shown');
  if (!hasSeenBubble) {
    setTimeout(() => {
      openPopup();
      sessionStorage.setItem('nio_bubble_shown', '1');
      // Auto-hide after 6s
      hideTimer = setTimeout(closePopup, 6000);
    }, 3500);
  }

  // Escape key close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) closePopup();
  });

})();
