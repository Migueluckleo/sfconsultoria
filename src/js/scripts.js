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

/** ================================
 * ✅ testimoniales
 * ================================ */
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        new Swiper(".mySwiper", {
            loop: true, // Hace que el carrusel sea infinito
            autoplay: {
                delay: 3000, // Cambia de slide cada 3 segundos
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

document.addEventListener("DOMContentLoaded", function () {
    const message = document.getElementById("message");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                message.classList.add("opacity-100", "translate-y-0");
            }
        });
    }, { threshold: 0.2 }); // Se activa cuando el 20% del elemento es visible

    observer.observe(message);
});

// contacto.js

// Inicializa EmailJS con tu Public Key
(function() {
    emailjs.init("YOUR_PUBLIC_KEY");
  })();
  
  // Referencias al formulario y mensaje de estado
  const form = document.getElementById('form-contacto');
  const status = document.getElementById('form-status');
  
  form.addEventListener('submit', function (e) {
    e.preventDefault();
  
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
      .then(() => {
        // Muestra mensaje de éxito
        status.classList.remove('hidden');
        status.textContent = 'Mensaje enviado correctamente.';
        form.reset();
      }, (err) => {
        alert('Error al enviar. Intenta más tarde.');
        console.error('EmailJS Error:', err);
      });
  });
  
  //Código async para cargar los datos del blog

const API_URL = 'https://api.sheetbest.com/sheets/bd1db17a-99ef-4486-b8c5-dbf1944f3a08';

// Loader
const loader = document.getElementById('loader');

function showLoader() {
  loader.danger
  if (loader) loader.style.display = 'flex';
}

function hideLoader() {
  if (loader) loader.style.display = 'none';
}

// Función global para obtener datos
async function getPosts() {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return [];
  }
}

// HOME - Mostrar posts recientes
const postsContainer = document.getElementById('posts-container');

if (postsContainer) {
  (async () => {
    showLoader();
    const data = await getPosts();
    hideLoader();

    const sortedPosts = data.sort((a, b) => new Date(b['Fecha']) - new Date(a['Fecha']));
    const recentPosts = sortedPosts.slice(0, 3);

    recentPosts.forEach(post => {
      postsContainer.innerHTML += `
        <article class="bg-white rounded-xl shadow-md overflow-hidden border-black border-2 border-r-8 border-b-8">
          <a href="post.html?id=${post['ID']}">
            <img src="${post['Imagen Hero']}" alt="${post['Título']}" class="w-full h-48 object-cover">
            <div class="p-4">
              <h2 class="text-2xl font-bold mb-2">${post['Título']}</h2>
              <p class="text-gray-600 text-sm mb-4">${post['Fecha']} - ${post['Autor']}</p>
              <p class="text-gray-700">${post['Párrafo 1'].substring(0, 100)}...</p>
            </div>
          </a>
        </article>
      `;
    });
  })();
}

// POST - Mostrar contenido individual del post
const postHero = document.getElementById('post-hero');

if (postHero) {
  (async () => {
    showLoader();
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    const data = await getPosts();
    hideLoader();

    const post = data.find(item => item['ID'] === postId);

    if (post) {
      document.getElementById('post-title').textContent = post['Título'];
      document.getElementById('post-author').textContent = post['Autor'];
      document.getElementById('post-date').textContent = post['Fecha'];
      postHero.style.backgroundImage = `url('${post['Imagen Hero']}')`;

      document.getElementById('subtitle-one').innerHTML = post['Subtítulo 1'];
      document.getElementById('post-paragraph-one').innerHTML = post['Párrafo 1'];

      const interBanner = document.getElementById('inter-banner');
      if (post['Inter Banner']) {
        interBanner.src = post['Inter Banner'];
      } else {
        interBanner.style.display = 'none';
      }

      const subtitleTwo = document.getElementById('subtitle-two');
      const paragraphTwo = document.getElementById('post-paragraph-two');

      if (post['Párrafo 2'] && post['Subtítulo 2']) {
        paragraphTwo.innerHTML = post['Párrafo 2'];
        subtitleTwo.textContent = post['Subtítulo 2'];
      } else {
        paragraphTwo.style.display = 'none';
        subtitleTwo.style.display = 'none';
      }

    } else {
      console.error('Post no encontrado');
      postHero.innerHTML = `<p class="text-2xl">Lo sentimos mucho, no encontramos ese Post</p>`;
    }
  })();
}