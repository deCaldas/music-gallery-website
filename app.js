// Estructuración en un módulo
const SongGallery = (() => {
  // Variables privadas
  let songs = [];
  const gallery = document.getElementById("gallery");
  const searchInput = document.getElementById("search");
  const message = document.getElementById("message");

  // Cache de búsquedas para mejor performance
  const searchCache = new Map();

  // Función privada para sanitizar contenido (prevenir XSS)
  const sanitize = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  // Función privada para crear una tarjeta de canción
  const createSongCard = (song) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h2>${sanitize(song.title)}</h2>
      <p><strong>${sanitize(song.artist)}</strong> (${sanitize(song.year)})</p>
      ${song.youtubeId ? `
        <button class="play-btn" data-id="${song.youtubeId}">▶ Play</button>
      ` : ''}
    `;
    return card;
  };
  
  // Agrega al init():
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("play-btn")) {
      const videoId = e.target.dataset.id;
      window.open(`https://youtube.com/watch?v=${videoId}`, "_blank");
    }
  });

  // Función privada optimizada para filtrar canciones
  const filterSongs = (filter = "") => {
    const lowerFilter = filter.toLowerCase();
    
    if (searchCache.has(lowerFilter)) {
      return searchCache.get(lowerFilter);
    }

    const filtered = songs.filter(song => 
      ['title', 'artist', 'year', 'album', 'genre', 'youtubeId'].some(
        key => String(song[key]).toLowerCase().includes(lowerFilter)
      )
    );

    searchCache.set(lowerFilter, filtered);
    return filtered;
  };

  // Renderizado optimizado con DocumentFragment
  const renderSongs = (filter = "") => {
    gallery.innerHTML = "";
    message.textContent = "";

    const filtered = filterSongs(filter);

    if (filter && filtered.length === 0) {
      const suggestion = getBestMatch(filter);
      message.textContent = suggestion 
        ? `Tal vez estás buscando: ${suggestion.title}`
        : `Por favor verifica tu escritura.`;
      return;
    }

    const fragment = document.createDocumentFragment();
    filtered.forEach(song => {
      fragment.appendChild(createSongCard(song));
    });
    gallery.appendChild(fragment);
  };

  // Función de distancia Levenshtein optimizada
  const levenshteinDistance = (a, b) => {
    if (!a.length) return b.length;
    if (!b.length) return a.length;

    const matrix = Array(b.length + 1).fill(null).map(() => 
      Array(a.length + 1).fill(null)
    );

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + cost
        );
      }
    }

    return matrix[b.length][a.length];
  };

  // Búsqueda de coincidencia más cercana con límite
  const getBestMatch = (query) => {
    const normalizedQuery = query.toLowerCase();
    const MAX_DISTANCE = 3;

    return songs.reduce((bestMatch, song) => {
      const distance = levenshteinDistance(normalizedQuery, song.title.toLowerCase());
      return distance < bestMatch.distance && distance <= MAX_DISTANCE
        ? { song, distance }
        : bestMatch;
    }, { song: null, distance: Infinity }).song;
  };

  // Cargar canciones con manejo de errores mejorado
  const loadSongs = async () => {
    try {
      const response = await fetch("songs.json");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      songs = data.songs;
      renderSongs();
    } catch (error) {
      console.error("Error al cargar canciones:", error);
      gallery.innerHTML = "<p>Error al cargar las canciones. Intenta recargar la página.</p>";
    }
  };

  // Inicialización con debounce para la búsqueda
  const init = () => {
    let timeout;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => renderSongs(e.target.value), 300);
    });

    loadSongs();
  };

  // Exponer solo lo necesario
  return { init };
})();

// Iniciar la aplicación
SongGallery.init();