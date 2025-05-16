# README 

## 🎵 Galería Interactiva de Canciones

Una galería web dinámica que permite explorar, buscar y filtrar canciones de forma interactiva usando JavaScript.

### 🚀 Características

- ✅ Búsqueda en tiempo real por título, artista, año, álbum o etiqueta.
- ✅ Visualización tipo tarjeta para cada canción.
- ✅ Corrección de errores ortográficos y sugerencias inteligentes.
- ✅ Gestión de estados vacíos con mensajes personalizados.
- ✅ Arquitectura limpia con datos externos (`songs.json`).

---

### 🧠 Tecnologías Usadas

- HTML5
- CSS3
- JavaScript
<!-- - GitHub Pages / servidor local (para pruebas) -->

---

### 📁 Estructura del Proyecto

```

📦 galeria-canciones/
│
├── index.html              # Interfaz principal
├── styles.css              # Estilos básicos
├── app.js                  # Lógica de renderizado, búsqueda y sugerencias
├── songs.json              # Base de datos de canciones
└── README.md               # Documentación del proyecto

```

---

### 📝 songs.json - Formato del archivo

Este archivo contiene un arreglo de canciones con esta estructura:

```json
{
  "songs": [
    {
      "title": "The Message",
      "artist": "Grandmaster Flash & The Furious Five",
      "year": 1982,
      "album": "The Message",
      "genre": [
        "Hip-Hop",
        "Conscious Rap"
      ],
      "youtubeId": "gYMkEMCHtJ4"
    },
    {
      "title": "Planet Rock",
      "artist": "Afrika Bambaataa & The Soul Sonic Force",
      "year": 1982,
      "album": "Planet Rock: The Album",
      "genre": [
        "Electro",
        "Hip-Hop"
      ],
      "youtubeId": "9J3lwZjHenA"
    }
  ]
}
```

> 🔐 **Nota**: El campo `year` debe ser una **cadena de texto**, no un número, para evitar errores al aplicar `.toLowerCase()`.

---

### 💡 Sugerencias Inteligentes

Cuando un término no coincide exactamente, se sugiere el resultado más cercano:

```
🧠 Tal vez quisiste decir: "Madonna"
```

Y si no se encuentra nada:

```
😕 No se encontraron coincidencias. Verifica tu escritura.
```

---

### 🧪 Cómo ejecutar el proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/galeria-canciones.git
```

2. Asegúrate de usar un servidor local para evitar problemas de CORS con `fetch`. Puedes usar:

```bash
# Con Python 3
python -m http.server

# Con Node.js (instala http-server si no lo tienes)
npx http-server .
```

3. Abre en tu navegador:

```
http://localhost:8000
```

---

### 📈 Próximos pasos (Fase 2)

* 🎚️ Agregar filtros dinámicos por artista, año, álbum o género.
* 🔊 Reproductor de audio integrado por canción.
* 💽 Subida de canciones desde una interfaz de administrador.
* 🛒 Evolucionar hacia una tienda digital de beats, demos o tracks exclusivos.

---

### 👤 Autor

Desarrollado por **\[Tu Nombre o Alias]**
Inspirado en la música rap, la cultura hip hop y la pasión por el desarrollo web.

---

### 🫱🏻‍🫲🏻 Licencia

Este proyecto se distribuye bajo la licencia MIT.

```

---

¿Quieres que también lo traduzca al inglés o te ayudo a generar una versión adaptada para subirlo a GitHub con imágenes o badges?
```
