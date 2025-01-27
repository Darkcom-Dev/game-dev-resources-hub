// Función para procesar el archivo GPL
    function procesarArchivoGPL(contenido) {
      const lineas = contenido.split('\n');
      const colores = [];

      // Extraer los colores del archivo GPL
      for (const linea of lineas) {
        if (linea.trim() === '' || linea.startsWith('GIMP Palette') || linea.startsWith('Name:') || linea.startsWith('Columns:') || linea.startsWith('#')) {
          continue; // Ignorar líneas no relevantes
        }

        // Extraer los valores RGB y el nombre del color
        const partes = linea.trim().split(/\s+/);
        if (partes.length >= 3) {
          const r = parseInt(partes[0]);
          const g = parseInt(partes[1]);
          const b = parseInt(partes[2]);
          const nombre = partes.slice(3).join(' '); // Unir el resto de las partes como nombre
          colores.push({ r, g, b, nombre });
        }
      }

      return colores;
    }

    // Función para dibujar los cuadrados de colores
    function dibujarColores(colores) {
      const container = document.getElementById('colorContainer');
      container.innerHTML = ''; // Limpiar el contenedor

      for (const color of colores) {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        colorBox.textContent = `${color.nombre}\nRGB(${color.r}, ${color.g}, ${color.b})`;
        container.appendChild(colorBox);
      }
    }

    // Manejar la selección de archivos
    document.getElementById('fileInput').addEventListener('change', function (event) {
      const archivo = event.target.files[0];
      if (!archivo) return;

      const lector = new FileReader();
      lector.onload = function (e) {
        const contenido = e.target.result;
        const colores = procesarArchivoGPL(contenido);
        dibujarColores(colores);
      };
      lector.readAsText(archivo);
    });