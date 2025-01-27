function obtenerListaArchivos(url) {
            fetch(url)
            .then(response => response.json())
            .then(data => {
              const listaArchivos = data.map(item => item.name); // Guarda los nombres de los archivos en una variable
              console.log('Archivos en la carpeta:', listaArchivos);
							readGPLPaletteFile(listaArchivos);
            })
            .catch(error => console.error('Error al obtener la lista de archivos:', error));
        }
        
        url = 'https://api.github.com/repos/Darkcom-Dev/game-dev-resources-hub/contents/static/palettes'
        obtenerListaArchivos(url);