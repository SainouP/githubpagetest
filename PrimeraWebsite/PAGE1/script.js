// Menú hamburguesa
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
const menuBtns = document.querySelectorAll('.menu-btn');
const menuInfo = document.getElementById('menu-info');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const infoContent = {
  explorar: "Aquí puedes comenzar la exploración del modelo 3D de la computadora.",
  aprender: "Aprende más sobre los componentes internos y su funcionamiento.",
  contacto: "Matias (912 999 028) Rodrigo (982 798 340).",
  creadores: "Proyecto realizado por Matias Espinoza y Rodrigo Jara.",
  redes: "IG: espinozaa___l y sainouu1."
};

menuBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-info');
    navLinks.classList.remove('active'); // Cierra el menú al hacer clic

    if (key === 'explorar') {
      window.location.href = '/PrimeraWebsite/PAGE2/HTML/exploracion.html';
    } else if (key === 'aprender' || key === 'contacto') {
      const section = document.getElementById(key === 'aprender' ? 'aprender-mas' : 'contacto');
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
      menuInfo.innerHTML = infoContent[key] || "";
    } else {
      menuInfo.innerHTML = infoContent[key] || "";
    }
  });
});

