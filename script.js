const header = document.querySelector(".site-header");
const progressBar = document.querySelector(".progress-bar");
const cursorGlow = document.querySelector(".cursor-glow");
const revealItems = document.querySelectorAll(".reveal");
const companyButtons = document.querySelectorAll(".company-list button");
const jobPanels = document.querySelectorAll(".job-panel");
const tiltCards = document.querySelectorAll(".tilt-card");
const projectVideoPanels = document.querySelectorAll(".project-video");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function updateChrome() {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;

  header.classList.toggle("is-scrolled", scrollTop > 24);
  progressBar.style.width = `${progress}%`;
}

companyButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    companyButtons.forEach((item) => item.classList.remove("active"));
    jobPanels.forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    jobPanels[index].classList.add("active");
  });
});

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

projectVideoPanels.forEach((panel) => {
  panel.addEventListener("toggle", () => {
    const iframe = panel.querySelector("iframe");
    if (!iframe) return;

    if (panel.open) {
      projectVideoPanels.forEach((otherPanel) => {
        if (otherPanel !== panel) {
          otherPanel.open = false;
          const otherIframe = otherPanel.querySelector("iframe");
          if (otherIframe) otherIframe.removeAttribute("src");
        }
      });
      iframe.src = iframe.dataset.src;
    } else {
      iframe.removeAttribute("src");
    }
  });
});

window.addEventListener("scroll", updateChrome, { passive: true });
window.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

updateChrome();
