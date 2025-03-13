/** ================================
     * ✅ Animación de Contadores
     * ================================ */
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        let target = parseInt(counter.dataset.target, 10);
        let count = 0, increment = target / 100;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count) + (counter.dataset.suffix || "");
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target + (counter.dataset.suffix || "");
            }
        };
        updateCount();
        counterObserver.unobserve(counter);
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

/** ================================
 * ✅ Animación Carrusel de Logos
 * ================================ */
const carousel = document.querySelector(".logos-carousel");
if (carousel) {
    carousel.addEventListener("mouseenter", () => carousel.style.animationPlayState = "paused");
    carousel.addEventListener("mouseleave", () => carousel.style.animationPlayState = "running");
}
