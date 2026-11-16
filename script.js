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


// Mobile navigation and product sidebar controls
const mobileNavigationMenu = document.querySelector('.mobile-navigation-menu');
const productSidebar = document.querySelector('.sidebar');
const mobileNavigationOpenBtns = document.querySelectorAll('.mobile-bottom-navigation [data-mobile-menu-open-btn]');
const mobileNavigationCloseBtn = document.querySelector('[data-mobile-menu-close-btn]');
const sidebarOpenBtn = mobileNavigationOpenBtns[1];
const sidebarCloseBtn = document.querySelector('[data-sidebar-close-btn]');

const sidebarBackdrop = document.createElement('button');
sidebarBackdrop.type = 'button';
sidebarBackdrop.className = 'sidebar-backdrop';
sidebarBackdrop.setAttribute('aria-label', 'Close categories sidebar');
sidebarBackdrop.setAttribute('aria-hidden', 'true');
document.body.appendChild(sidebarBackdrop);

const closeMobileNavigation = function () {
  mobileNavigationMenu?.classList.remove('active');
};

const closeProductSidebar = function () {
  productSidebar?.classList.remove('active');
  sidebarBackdrop.classList.remove('active');
  document.body.classList.remove('sidebar-open');
  sidebarOpenBtn?.setAttribute('aria-expanded', 'false');
};

mobileNavigationOpenBtns[0]?.addEventListener('click', function () {
  mobileNavigationMenu?.classList.add('active');
});

mobileNavigationCloseBtn?.addEventListener('click', closeMobileNavigation);

sidebarOpenBtn?.setAttribute('aria-controls', 'product-sidebar');
sidebarOpenBtn?.setAttribute('aria-expanded', 'false');
productSidebar?.setAttribute('id', 'product-sidebar');

sidebarOpenBtn?.addEventListener('click', function () {
  if (window.matchMedia('(min-width: 1024px)').matches) return;
  productSidebar?.classList.add('active');
  sidebarBackdrop.classList.add('active');
  document.body.classList.add('sidebar-open');
  sidebarOpenBtn.setAttribute('aria-expanded', 'true');
});

sidebarCloseBtn?.addEventListener('click', closeProductSidebar);
sidebarBackdrop.addEventListener('click', closeProductSidebar);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeMobileNavigation();
    closeProductSidebar();
  }
});

window.addEventListener('resize', function () {
  if (window.matchMedia('(min-width: 1024px)').matches) {
    closeProductSidebar();
  }
});

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

// Product search: filters the existing product cards without changing the layout.
const searchField = document.querySelector('.search-field');
const searchButton = document.querySelector('.search-btn');
const productBox = document.querySelector('.product-box');

if (searchField && productBox) {
  const productCards = Array.from(productBox.querySelectorAll('.product-minimal .showcase'));
  const productSections = Array.from(productBox.querySelectorAll('.product-minimal .product-showcase'));
  const searchStatus = document.createElement('p');

  searchStatus.className = 'search-status';
  searchStatus.setAttribute('role', 'status');
  searchStatus.setAttribute('aria-live', 'polite');
  searchStatus.style.cssText = 'display:none; padding:16px; margin:0 0 16px; border:1px solid #e5e5e5; border-radius:8px; color:#555; text-align:center;';
  productBox.prepend(searchStatus);

  const runProductSearch = function () {
    const query = searchField.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    productCards.forEach(function (card) {
      const matches = !query || card.textContent.toLocaleLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    productSections.forEach(function (section) {
      const visibleCards = section.querySelectorAll('.showcase:not([hidden])');
      section.hidden = visibleCards.length === 0;
    });

    searchStatus.style.display = query && visibleCount === 0 ? 'block' : 'none';
    searchStatus.textContent = query && visibleCount === 0
      ? 'No products found. Try another search.'
      : '';
  };

  searchField.addEventListener('input', runProductSearch);
  searchButton?.addEventListener('click', function () {
    runProductSearch();
    searchField.focus();
    productBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  searchField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      runProductSearch();
      productBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (event.key === 'Escape') {
      searchField.value = '';
      runProductSearch();
    }
  });
}

// Keep hidden product cards hidden when the search is active.
