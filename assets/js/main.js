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

function initForcedDownloads() {
  const downloadLinks = document.querySelectorAll("[data-force-download]");

  const triggerDownload = (href, filename) => {
    const tempLink = document.createElement("a");

    tempLink.href = href;
    tempLink.download = filename;
    tempLink.style.display = "none";
    document.body.appendChild(tempLink);
    tempLink.click();
    tempLink.remove();
  };

  downloadLinks.forEach((link) => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();

      const href = link.getAttribute("href");
      const filename = link.dataset.forceDownload;

      if (!href || !filename) {
        return;
      }

      try {
        const response = await fetch(href, { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Download failed");
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        triggerDownload(objectUrl, filename);
        window.setTimeout(() => URL.revokeObjectURL(objectUrl), 30000);
      } catch (error) {
        triggerDownload(href, filename);
      }
    });
  });
}

initSiteChrome();
initMilestoneFilter();
initForcedDownloads();
