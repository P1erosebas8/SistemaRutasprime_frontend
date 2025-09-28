# 🎨 SistemaRutasprime Frontend

Este proyecto es el **frontend** de RutasPrime, una aplicación web desarrollada con **React** y **React-Bootstrap** para la gestión de rutas y ciudades de transporte.  
Incluye un diseño **responsivo**, navegación con **React Router**, y componentes reutilizables con estilos modernos.

---

## 📖 Tabla de Contenidos

* [✨ Características](#-características)
* [⚙️ Dependencias](#-dependencias)
* [📂 Estructura del Proyecto](#-estructura-del-proyecto)
* [🛠️ Configuración](#-configuración)
* [▶️ Ejecución](#-ejecución)
* [🌍 Páginas Principales](#-páginas-principales)
* [💡 Notas finales](#-notas-finales)

---

## ✨ Características

* 🎨 **UI moderna** con **React-Bootstrap**.
* 📱 **Diseño responsivo** adaptado a móviles, tablets y escritorio.
* 🗺️ **Gestión de rutas y ciudades** con visualización clara.
* 🔄 **Navegación SPA** con **React Router DOM**.
* 🖼️ **Hero sections dinámicas** en cada página.
* 🛠️ **Componentes reutilizables** (Header, Footer, HeroSection).
* 📂 Estructura organizada para escalabilidad.

---

## ⚙️ Dependencias

Definidas en `package.json`:

* **react** → Librería principal para la UI.
* **react-dom** → Renderizado en el navegador.
* **react-router-dom** → Manejo de rutas y navegación.
* **react-bootstrap** → Componentes listos para usar con Bootstrap 5.
* **bootstrap** → Estilos base de Bootstrap.
* **vite** → Bundler y servidor de desarrollo rápido.

---

## 📂 Estructura del Proyecto
```
src/
├── assets/ # Imágenes y recursos estáticos
├── components/ # Componentes reutilizables
│   ├── CardConDescripcion.jsx
│   └── CaruselConCards.jsx
│   └── HeroSection.jsx
│   └── ListadoConImagen.jsx
│   └── MyFooter.jsx
│   └── ...
├── pages/ # Páginas principales (Home, Rutas, Ciudades, Soporte, Contacto)
│   └── AcercaDe.jsx
│   └── Contactanos.jsx
│   └── inicio.jsx
│   └── PrguntasFrec.jsx
│   └── reclamaciones.jsx
│   └── terminos.jsx
│   └── ...
├── App.jsx # Configuración de rutas y layout principal
├── main.jsx # Punto de entrada de la aplicación
└── index.css # Estilos globales
```
---

## 🛠️ Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/P1erosebas8/React-BootStrap.git
cd React-BootStrap
```
### 2. Instalar dependencias
```bash
npm install
```
---

## ▶️ Ejecución

```bash
npm run dev
```
La aplicación estará disponible en:

http://localhost:5173


## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
