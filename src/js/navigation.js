/** ================================
 * ✅ Cargar Navbar Dinámicamente (Optimizado con async/await)
 * ================================ */
async function loadNavbar() {
    try {
        const navbarContainer = document.createElement("div");
        navbarContainer.id = "navbar-container";
        document.body.prepend(navbarContainer);

        const response = await fetch("components/navbar.html");
        const html = await response.text();

        navbarContainer.innerHTML = html;

        setupNavbarBehavior();  // Oculta/Muestra la navbar en scroll
        setupMobileMenu();      // Configura el menú mobile
        setupDropdownMenu();    // Configura el menú desplegable de "Servicios"
        highlightActiveLink();  // Resalta el link activo en el navbar
    } catch (error) {
        console.error("❌ Error cargando la navbar:", error);
    }
}

/** ================================
 * ✅ Configurar comportamiento de la Navbar (Ocultar/Mostrar en Scroll)
 * ================================ */
function setupNavbarBehavior() {
    let lastScrollTop = 0;
    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        navbar.style.transform =
            scrollTop === 0 ? "translateY(0)" : scrollTop > lastScrollTop ? "translateY(-100%)" : "translateY(0)";

        lastScrollTop = scrollTop;
    });
}

/** ================================
 * ✅ Configurar el Menú Mobile (Hamburguesa)
 * ================================ */
function setupMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add("hidden");
        }
    });
}

/** ================================
 * ✅ Configurar el Dropdown de Servicios (Desktop y Mobile)
 * ================================ */
function setupDropdownMenu() {
    const dropdownToggleDesktop = document.getElementById("dropdownToggle");
    const dropdownMenuDesktop = document.getElementById("dropdownMenu");

    const dropdownToggleMobile = document.getElementById("mobileDropdownToggle");
    const dropdownMenuMobile = document.getElementById("mobileDropdownMenu");

    // Desktop Dropdown
    if (dropdownToggleDesktop && dropdownMenuDesktop) {
        dropdownToggleDesktop.addEventListener("click", () => {
            dropdownMenuDesktop.classList.toggle("hidden");
        });

        document.addEventListener("click", (e) => {
            if (!dropdownToggleDesktop.contains(e.target) && !dropdownMenuDesktop.contains(e.target)) {
                dropdownMenuDesktop.classList.add("hidden");
            }
        });
    }

    // Mobile Dropdown
    if (dropdownToggleMobile && dropdownMenuMobile) {
        dropdownToggleMobile.addEventListener("click", () => {
            dropdownMenuMobile.classList.toggle("hidden");
        });

        document.addEventListener("click", (e) => {
            if (!dropdownToggleMobile.contains(e.target) && !dropdownMenuMobile.contains(e.target)) {
                dropdownMenuMobile.classList.add("hidden");
            }
        });
    }
}

/** ================================
 * ✅ Resaltar Link Activo en Navbar (Mejorado para detectar Home)
 * ================================ */
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");

        // 🔥 Detectar Home correctamente en cualquier servidor
        if ((currentPath === "/" || currentPath === "/index.html") && linkPath === "index.html") {
            link.classList.add("font-bold", "text-brand-500");
        } 
        // 🔥 Comparar los demás enlaces normalmente
        else if (linkPath === currentPath) {
            link.classList.add("font-bold", "text-brand-500");
        } 
        else {
            link.classList.remove("font-bold", "text-brand-500");
        }
    });
}


/** ================================
 * 🚀 Ejecutar la carga de la Navbar
 * ================================ */
document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
});
