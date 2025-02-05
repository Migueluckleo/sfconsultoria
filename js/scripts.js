document.addEventListener("DOMContentLoaded", function () {
    /** =========================================
     * ✅ 1. Menú Móvil (Toggle)
     * ========================================= */
    function activarMenuMovil() {
        const mobileMenuBtn = document.getElementById("mobile-menu-btn");
        const mobileMenu = document.getElementById("mobile-menu");

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener("click", function () {
                mobileMenu.classList.toggle("hidden");
            });
        } else {
            console.error("❌ No se encontraron los elementos del menú móvil.");
        }
    }

    /** =========================================
     * ✅ 2. Animación de Contadores con Símbolos
     * ========================================= */
    const counters = document.querySelectorAll(".counter");
    const speed = 200;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute("data-target"), 10);
                const suffix = counter.getAttribute("data-suffix") || "";

                let count = 0;
                const increment = target / speed;

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count) + suffix;
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target + suffix;
                    }
                };

                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    /** =========================================
     * ✅ 3. Carrusel de Testimonios con Animación
     * ========================================= */
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

    if (prevButton && nextButton) {
        nextButton.addEventListener("click", nextTestimonial);
        prevButton.addEventListener("click", prevTestimonial);
    }

    setInterval(nextTestimonial, 8000);
    showTestimonial(currentIndex);

    /** =========================================
     * ✅ 4. Animación de Aparición en Scroll
     * ========================================= */
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("opacity-100", "translate-y-0");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".fade-in").forEach(element => {
        element.classList.add("opacity-0", "translate-y-10", "transition-all", "duration-1000", "ease-in-out");
        fadeObserver.observe(element);
    });

    /** =========================================
     * ✅ Ocultar Navbar en Scroll Down y Mostrar en Scroll Up
     * ========================================= */
    function activarScrollNavbar() {
        let lastScrollTop = 0;
        const navbar = document.getElementById("navbar");

        if (!navbar) return;

        window.addEventListener("scroll", function () {
            let currentScroll = window.scrollY;

            if (currentScroll > 100) {
                if (currentScroll > lastScrollTop) {
                    navbar.classList.add("-translate-y-full");
                } else {
                    navbar.classList.remove("-translate-y-full");
                }
            } else {
                navbar.classList.remove("-translate-y-full");
            }

            lastScrollTop = Math.max(0, currentScroll);
        });
    }

    /** =========================================
     * ✅ Cargar Navbar desde navbar.html y ejecutar scripts
     * ========================================= */
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;

            // Esperamos un pequeño tiempo para asegurarnos de que la navbar ya esté en el DOM
            setTimeout(() => {
                activarScrollNavbar();
                activarMenuMovil();
            }, 100);
        })
        .catch(error => console.error("Error al cargar la navbar:", error));
});
