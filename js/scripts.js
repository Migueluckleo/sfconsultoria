document.addEventListener("DOMContentLoaded", function () {
    // ✅ Funcionalidad del Menú Móvil
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");
        });
    } else {
        console.error("No se encontraron los elementos del menú.");
    }

    // ✅ Animación de Contadores con Símbolos
    const counters = document.querySelectorAll(".counter");
    const speed = 200; // Ajusta la velocidad de la animación

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute("data-target"), 10);
                const suffix = counter.getAttribute("data-suffix") || ""; // Agregar sufijo si existe
                
                let count = 0;
                const increment = target / speed;

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count) + suffix;
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target + suffix; // Agregar sufijo al final
                    }
                };

                updateCount();
                observer.unobserve(counter); // Detiene la animación una vez ejecutada
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});
