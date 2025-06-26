/** ================================
 * ✅ Seguimiento de WhatsApp
 * ================================ */
document.addEventListener("DOMContentLoaded", function () {
  const whatsappBtn = document.getElementById("whatsapp-btn");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Previene navegación inmediata
      const url = whatsappBtn.href;

      gtag('event', 'conversion', {
        'send_to': 'AW-17233902589/HmmZCP_u5OMaEP334ZlA',
        'event_callback': function () {
          window.location = url;
        }
      });

      // Fallback por si el callback no responde
      setTimeout(function () {
        window.location = url;
      }, 1000);

      return false;
    });
  }
});

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
 * ✅ Carrusel de Logos
 * ================================ */
const carousel = document.querySelector(".logos-carousel");
if (carousel) {
  carousel.addEventListener("mouseenter", () => carousel.style.animationPlayState = "paused");
  carousel.addEventListener("mouseleave", () => carousel.style.animationPlayState = "running");
}

/** ================================
 * ✅ Swiper Testimoniales
 * ================================ */
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    new Swiper(".mySwiper", {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }, 100);
});

/** ================================
 * ✅ Observador de Mensaje
 * ================================ */
document.addEventListener("DOMContentLoaded", function () {
  const message = document.getElementById("message");
  if (message) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          message.classList.add("opacity-100", "translate-y-0");
        }
      });
    }, { threshold: 0.2 });

    observer.observe(message);
  }
});

/** ================================
 * ✅ Lógica de Blog (API + UI)
 * ================================ */
const API_URL = 'https://api.sheetbest.com/sheets/b69712ec-0c87-4695-9bd7-952f18b0b131';
const loader = document.getElementById('loader');

function showLoader() {
  if (loader) loader.style.display = 'flex';
}

function hideLoader() {
  if (loader) loader.style.display = 'none';
}

async function getPosts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    console.log("✅ Datos recibidos:", data);
    return data;
  } catch (error) {
    console.error('❌ Error al obtener los datos:', error);
    return [];
  }
}

// HOME - Mostrar todos los posts
const postsContainer = document.getElementById('posts-container');
if (postsContainer) {
  (async () => {
    try {
      showLoader();
      const data = await getPosts();
      hideLoader();

      if (!Array.isArray(data) || data.length === 0) {
        postsContainer.innerHTML = `
          <div class="w-full text-center py-10 text-gray-600 text-xl">
            No hay publicaciones disponibles en este momento.
          </div>
        `;
        return;
      }

      const sortedPosts = data.sort((a, b) => new Date(b['Fecha']) - new Date(a['Fecha']));
      sortedPosts.forEach(post => {
        const titulo = post['Título'] || 'Sin título';
        const autor = post['Autor'] || 'Anónimo';
        const fecha = post['Fecha'] || '';
        const imagen = post['Imagen Hero'] || 'https://via.placeholder.com/800x400?text=Sin+Imagen';
        const resumen = post['Párrafo 1'] ? post['Párrafo 1'].substring(0, 100) + '...' : '';

        postsContainer.innerHTML += `
          <article class="bg-white rounded-xl shadow-md overflow-hidden border-gray-800 border-2 ">
            <a href="post.html?id=${post['ID']}">
              <img src="${imagen}" alt="${titulo}" class="w-full h-48 object-cover">
              <div class="p-4">
                <h2 class="text-2xl font-bold mb-2">${titulo}</h2>
                <p class="text-gray-600 text-sm mb-4">${fecha} - ${autor}</p>
                <p class="text-gray-700">${resumen}</p>
              </div>
            </a>
          </article>
        `;
      });
    } catch (error) {
      hideLoader();
      console.error("❌ Error al renderizar los posts:", error);
      postsContainer.innerHTML = `<p class="text-red-500">No se pudieron cargar los artículos.</p>`;
    }
  })();
}

// POST - Mostrar contenido individual del post
const postHero = document.getElementById('post-hero');
if (postHero) {
  (async () => {
    try {
      showLoader();
      const params = new URLSearchParams(window.location.search);
      const postId = params.get('id');
      const data = await getPosts();
      hideLoader();

      const post = data.find(item => item['ID'] === postId);
      if (post) {
        const title = document.getElementById('post-title');
        const author = document.getElementById('post-author');
        const date = document.getElementById('post-date');
        const subtitleOne = document.getElementById('subtitle-one');
        const paragraphOne = document.getElementById('post-paragraph-one');
        const interBanner = document.getElementById('inter-banner');
        const subtitleTwo = document.getElementById('subtitle-two');
        const paragraphTwo = document.getElementById('post-paragraph-two');

        if (title) title.textContent = post['Título'];
        if (author) author.textContent = post['Autor'];
        if (date) date.textContent = post['Fecha'];
        if (postHero) postHero.style.backgroundImage = `url('${post['Imagen Hero']}')`;
        if (subtitleOne) subtitleOne.innerHTML = post['Subtítulo 1'];
        if (paragraphOne) paragraphOne.innerHTML = post['Párrafo 1'];

        if (interBanner) {
          if (post['Inter Banner']) {
            interBanner.src = post['Inter Banner'];
          } else {
            interBanner.style.display = 'none';
          }
        }

        if (subtitleTwo && paragraphTwo) {
          if (post['Párrafo 2'] && post['Subtítulo 2']) {
            subtitleTwo.textContent = post['Subtítulo 2'];
            paragraphTwo.innerHTML = post['Párrafo 2'];
          } else {
            subtitleTwo.style.display = 'none';
            paragraphTwo.style.display = 'none';
          }
        }
      } else {
        console.error('⚠️ Post no encontrado');
        postHero.innerHTML = `<p class="text-2xl text-center">Lo sentimos, no encontramos este post.</p>`;
      }
    } catch (error) {
      hideLoader();
      console.error("❌ Error al cargar el post:", error);
    }
  })();
}
// ===============================
// ✅ Cargar botón flotante en móvil desde wa-button.html
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 768) { // Solo para móvil
    fetch('wa-button.html')
      .then(res => res.text())
      .then(html => {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        document.body.appendChild(temp.firstElementChild);

        // Tracking para botón móvil
        const btn = document.getElementById("whatsapp-btn-mobile");
        if (btn) {
          btn.addEventListener("click", function (e) {
            e.preventDefault();
            const url = btn.href;

            gtag('event', 'conversion', {
              'send_to': 'AW-17233902589/HmmZCP_u5OMaEP334ZlA',
              'event_callback': function () {
                window.location = url;
              }
            });

            setTimeout(function () {
              window.location = url;
            }, 1000);

            return false;
          });
        }
      })
      .catch(err => console.error("No se pudo cargar wa-button.html:", err));
  }
});
