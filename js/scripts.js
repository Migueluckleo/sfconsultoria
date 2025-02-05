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
document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll(".testimonial");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.add("hidden");
            testimonial.classList.remove("fade-in");
            if (i === index) {
                testimonial.classList.remove("hidden");
                testimonial.classList.add("fade-in");
            }
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }

    nextButton.addEventListener("click", nextTestimonial);
    prevButton.addEventListener("click", prevTestimonial);

    // Cambiar automáticamente cada 8 segundos
    setInterval(nextTestimonial, 8000);

    // Mostrar el primer testimonial al cargar la página
    showTestimonial(currentIndex);
});
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("opacity-100", "translate-y-0");
                observer.unobserve(entry.target); // Detener observación tras activarse
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".fade-in").forEach(element => {
        element.classList.add("opacity-0", "translate-y-10", "transition-all", "duration-1000", "ease-in-out");
        observer.observe(element);
    });
});
