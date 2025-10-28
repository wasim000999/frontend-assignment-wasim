
/* script.js - Slider auto-scroll, manual controls, tooltip on hover */

document.addEventListener('DOMContentLoaded', function(){
  const slider = document.getElementById('image-slider');
  const nextBtn = document.querySelector('.slide-btn.next');
  const prevBtn = document.querySelector('.slide-btn.prev');
  const slideWidth = slider.querySelector('.slide').getBoundingClientRect().width + 10; // includes gap
  let autoScrollInterval = null;
  let autoDelay = 2500;

  function scrollNext(){
    slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
  }
  function scrollPrev(){
    slider.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  }

  nextBtn.addEventListener('click', scrollNext);
  prevBtn.addEventListener('click', scrollPrev);

  // Auto-scroll looping behavior
  function startAutoScroll(){
    stopAutoScroll();
    autoScrollInterval = setInterval(()=>{
      // if near end, jump to start smoothly
      if (Math.abs(slider.scrollLeft + slider.clientWidth - slider.scrollWidth) < 10){
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollNext();
      }
    }, autoDelay);
  }
  function stopAutoScroll(){ if(autoScrollInterval) clearInterval(autoScrollInterval); }

  slider.addEventListener('mouseover', stopAutoScroll);
  slider.addEventListener('focusin', stopAutoScroll);
  slider.addEventListener('mouseleave', startAutoScroll);
  slider.addEventListener('focusout', startAutoScroll);

  startAutoScroll();

  // Tooltip behavior for cards
  const tooltip = document.getElementById('tooltip');
  const cards = document.querySelectorAll('.card[data-tooltip]');

  cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const text = card.getAttribute('data-tooltip');
      tooltip.textContent = text;
      const rect = card.getBoundingClientRect();
      const top = rect.top - 12;
      const left = rect.left + rect.width/2;
      tooltip.style.left = (left) + 'px';
      tooltip.style.top = (top) + 'px';
      tooltip.classList.add('show');
    });
    card.addEventListener('mouseleave', () => {
      tooltip.classList.remove('show');
    });
    // For accessibility - focus/blur
    card.setAttribute('tabindex', '0');
    card.addEventListener('focus', (e) => {
      const text = card.getAttribute('data-tooltip');
      tooltip.textContent = text;
      const rect = card.getBoundingClientRect();
      const top = rect.top - 12;
      const left = rect.left + rect.width/2;
      tooltip.style.left = (left) + 'px';
      tooltip.style.top = (top) + 'px';
      tooltip.classList.add('show');
    });
    card.addEventListener('blur', () => { tooltip.classList.remove('show'); });
  });

  // Reposition tooltip on window resize / scroll
  window.addEventListener('scroll', () => tooltip.classList.remove('show'));
  window.addEventListener('resize', () => tooltip.classList.remove('show'));
});
