const darkModeToggle = document.getElementById('dark-mode-toggle');
const root = document.documentElement;

darkModeToggle.addEventListener('click', () => {
  // Alternar la clase 'dark-mode' en el elemento raíz
  root.classList.toggle('dark-mode');

  // Actualizar el ícono del botón (opcional)
  if (root.classList.contains('dark-mode')) {
    darkModeToggle.textContent = '☀️'; // Ícono de sol para modo claro
  } else {
    darkModeToggle.textContent = '🌙'; // Ícono de luna para modo oscuro
  }

  // Guardar la preferencia en el almacenamiento local
  localStorage.setItem('theme', root.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Al cargar la página, aplicar el tema según la preferencia guardada
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    root.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  } else {
    root.classList.remove('dark-mode');
    darkModeToggle.textContent = '🌙';
  }
});
