'use strict';

// login variables
const loginPage = document.querySelector('[login-page]');
const loginCloseBtn = document.querySelector('[login-close-btn]');
const loginCloseOverlay = document.querySelector('[login-close-overlay]');

// login function
const loginCloseFunc = function () {
  loginPage.classList.add('closed');
};

// login eventListener
loginCloseOverlay.addEventListener('click', loginCloseFunc);
loginCloseBtn.addEventListener('click', loginCloseFunc);


// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
  };

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
}


// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {
        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');
      }
    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}