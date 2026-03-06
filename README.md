# 🐾 Abrigando A Los Cañetañitos

Sitio web informativo y plataforma de gestión para el refugio de animales "Abrigando A Los Cañetañitos" (Perú). Este proyecto facilita la adopción, el apadrinamiento y la recaudación de donaciones para perritos y gatitos rescatados.

## 🚀 Estructura del Proyecto

El proyecto está organizado de la siguiente manera para facilitar su mantenimiento:

```text
PERRITOS/
├── css/
│   └── style.css       # Estilos globales y componentes personalizados
├── img/                # Recursos visuales (Logos, fotos de perritos)
├── js/                 # Lógica de programación (Scripts)
├── paginas/            # Vistas principales (Adopta, Donaciones, etc.)
├── peludos/            # Perfiles individuales de los rescatados
└── index.html          # Página de inicio principal
```

## 🧠 Arquitectura de Scripts (JavaScript)

Para optimizar el rendimiento y la organización, la lógica del sitio se ha dividido en módulos:

- **main.js**  
  Controla funciones globales presentes en todo el sitio, como el menú hamburguesa (responsive) y validaciones generales.

- **adopta.js**  
  Gestiona el sistema de filtros (machos, hembras, cachorros) y la paginación dinámica de la galería de adopción.

- **ayuda.js**  
  Contiene la lógica para los formularios de ayuda social y la función de **copiar al portapapeles** para las cuentas bancarias.

- **perfil.js**  
  Maneja la interactividad de las galerías de fotos individuales y el envío de solicitudes específicas por mascota.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 / CSS3**  
  Estructura y diseño a medida.

- **JavaScript (ES6+)**  
  Lógica dinámica y manipulación del DOM.

- **Tailwind CSS**  
  Utilizado para el prototipado rápido en las páginas de perfiles individuales.

- **FontAwesome**  
  Librería de iconos para mejorar la interfaz de usuario.

- **Google Fonts**  
  Tipografías *Poppins* y *Open Sans*.

---

## 📌 Próximas Mejoras (Roadmap)

- [ ] Implementar un visualizador de imágenes (Modal) en los perfiles.  
- [ ] Conectar los formularios con un servicio de envío de correos (EmailJS).  
- [ ] Crear una sección dedicada a las campañas de esterilización.

---

### ❤️ Autor

**Edward Medrano**  
2026

---

### Tips adicionales para tu README:

1.  **Formato Markdown:** El archivo termina en `.md`. Esto permite que GitHub o VS Code rendericen negritas, listas y bloques de código de forma visual.
2.  **Imágenes:** Si tienes una captura de pantalla de cómo se ve el sitio, puedes agregarla con: `![Captura del sitio](ruta/a/tu/imagen.png)`.
3.  **Actualización:** Cada vez que agregues una página nueva o un cambio importante en el CSS, actualiza el apartado de "Estructura".



**¿Te gustaría que te ayude a configurar los formularios para que los mensajes te lleguen de verdad a tu correo sin usar una base de datos?**