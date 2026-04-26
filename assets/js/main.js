function initMilestoneFilter() {
  const milestoneFilter = document.querySelector("#milestone-filter");

  if (!milestoneFilter) {
    return;
  }

  const cards = document.querySelectorAll(".milestone-card");

  milestoneFilter.addEventListener("change", (event) => {
    const selected = event.target.value;

    cards.forEach((card) => {
      const show = selected === "all" || card.dataset.category === selected;
      card.classList.toggle("hidden", !show);
    });
  });
}

function initSiteChrome() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".site-nav");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
}

initSiteChrome();
initMilestoneFilter();
