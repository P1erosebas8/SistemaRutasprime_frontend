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
* [🌱 Cómo integrarte al proyecto React-BootStrap](#-cómo-integrarte-al-proyecto-react-bootstrap)
- [💡 Notas finales](#-notas-finales)  

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

---

## 🌱 Cómo integrarte al proyecto React-BootStrap

Sigue estos pasos si te unes al proyecto para asegurar que todo fluya bien con Git, ramas y actualizaciones.


### 1. Clonar el repositorio

En tu equipo, abre una terminal (o VS Code) y ejecuta:

```bash
git clone https://github.com/P1erosebas8/React-BootStrap.git
cd React-BootStrap
```

### 2. Crear tu rama de trabajo

Antes de hacer algún cambio, crea tu propia rama. No trabajes directo sobre main o master.

```bash
git checkout -b nombre-de-tu-rama
```

### 3. Verificar en qué rama estás

Para asegurarte de que estás en la rama correcta:

```bash
git branch
```
Verás algo como:
```bash
  main
* nombre-de-tu-rama
```

### 4. Hacer cambios, commit y push

Cuando hayas hecho cambios:

```bash
git add .
git commit -m "feat: agregar formulario de login"
git push origin nombre-de-tu-rama
```
La primera vez que empujes esa rama puede que necesites:

```bash
git push -u origin nombre-de-tu-rama
```

### 5. Mantener tu rama al día con los cambios de main

```bash
# Ve a main (o master)
git checkout main

# Trae los cambios más recientes del repositorio remoto
git pull origin main

# Regresa a tu rama de trabajo
git checkout nombre-de-tu-rama

# Fusiona los cambios de main a tu rama
git merge main
```
Si el mensaje dice Already up to date, significa que tu rama ya tiene todo lo que hay en main.

Si hay conflictos, tendrás que resolverlos manualmente en los archivos afectados, luego:
```bash
git add <archivo modificado o agregado>
git commit

```
### 6. Crear un Pull Request (PR)
6. Crear un Pull Request (PR)

Cuando termines tu funcionalidad:

* Asegúrate de que tu rama esté actualizada (paso 5).

* Empuja tus últimos cambios (git push).

* En GitHub, ve a la pestaña Pull requests → New Pull Request.

    * Base: main
    * Compare: tu rama

* Describe lo que hiciste y somete el PR para revisión.

* Alguien más revisa y hace el merge al proyecto principal.

### 7. Puntos Importates

Algunas veces se requerira instalar otras dependecias, en caso no se descarguen automaticamente se usa:
```bash
npm install react-toastify
npm install lucide-react
```
## 💡 Notas finales
- El Frontend está diseñado para integrarse directamente con el **Backend de RutasPrime**.  
- Para revisar o contribuir en la lógica de negocio, APIs y base de datos, consulta el repositorio del **Backend**:  

👉 [🌐 SistemaRutasprime Backend](https://github.com/JeancarloMejia/SistemaRutasprime_backend)

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
