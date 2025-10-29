// src/components/TomarFotoPerfil.jsx
import React, { useRef } from 'react'; // 🛑 Importar 'useRef'
import { useNavigate } from 'react-router-dom';

// 🛑 Importación de la imagen de perfil de ejemplo
// Asegúrate de que el archivo 'foto_de_perfil.jpg' exista en src/assets/
import profileImage from '../assets/foto_de_perfil.jpg'; 

function TomarFotoPerfil() {
  const navigate = useNavigate();
  // 1. Crear la referencia para el input de archivo
  const fileInputRef = useRef(null); 

  // Función para manejar el click del botón visible ("Usar Teléfono")
  const handleUsarTelefonoClick = () => {
    // Simula un clic en el input de archivo invisible, abriendo el explorador
    fileInputRef.current.click(); 
  };
  
  // Función para manejar la selección real del archivo (opcional)
  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          // Aquí puedes añadir la lógica para subir o previsualizar el archivo
          alert(`Foto seleccionada: ${file.name}. Lista para previsualización/subida.`);
      }
  }

  return (
    <div className="container-fluid p-0 bg-white min-vh-100">
      
      {/* Header Negro con navegación y ayuda */}
      <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {/* Botón de Atrás */}
          <button 
            className="btn p-0 me-3 text-white" 
            onClick={() => navigate(-1)} 
            aria-label="Volver atrás"
            style={{ fontSize: '1.5rem' }} 
          >
            &larr; {/* Flecha hacia la izquierda */}
          </button>
          <h1 className="fs-4 m-0">RUTASPRIME</h1>
        </div>
        <button className="btn btn-outline-light rounded-pill border-2" style={{ fontWeight: 'bold' }}>
          Ayuda?
        </button>
      </header>
      
      <div className="container p-4" style={{ maxWidth: '500px' }}> 
        
        {/* Título */}
        <h2 className="mb-4 fw-bolder">Haz tu foto de perfil</h2>
        
        {/* Input de archivo invisible (El que realmente abre el explorador) */}
        <input
            type="file"
            ref={fileInputRef} // 🛑 Asignar la referencia
            onChange={handleFileChange} // Manejar el archivo seleccionado
            style={{ display: 'none' }} // 🛑 Ocultar visualmente
            accept="image/jpeg, image/png" // Aceptar solo formatos de imagen
        />
        
        {/* Imagen de Perfil (Simulación) */}
        <div className="text-center mb-5">
          <img 
            src={profileImage} 
            alt="Ejemplo de foto de perfil"
            className="img-fluid rounded-3 border shadow-sm"
            style={{ maxWidth: '300px', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>

        {/* Instrucciones */}
        <ol className="list-unstyled mb-5">
          <li className="mb-3">1. Mira a la cámara directamente con los ojos y la boca claramente visibles.</li>
          <li className="mb-3">2. Asegúrate de que la foto esté bien iluminada, sin reflejos y enfocada.</li>
          <li className="mb-3">3. No se aceptan fotos de una foto, filtros ni nada que modifique la foto original.</li>
        </ol>

        {/* Botón Principal "Usar Teléfono" / "Subir foto" */}
        <div className="d-grid gap-2">
          <button 
            className="btn btn-dark text-white p-3" 
            onClick={handleUsarTelefonoClick} // 🛑 Llama a la función que activa el explorador
            style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
          >
            Usar Teléfono 
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default TomarFotoPerfil;