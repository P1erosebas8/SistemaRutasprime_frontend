// src/components/TomarFotoLicencia.jsx
import React, { useRef } from 'react'; // 🛑 Importar 'useRef'
import { useNavigate } from 'react-router-dom';

// Importar la imagen de la licencia
import licenciaImage from '../assets/ejemplo-licencia.jpg'; 

function TomarFotoLicencia() {
  const navigate = useNavigate();
  // 1. Crear la referencia para el input de archivo
  const fileInputRef = useRef(null); 

  // Función para manejar el click del botón visible ("Subir foto")
  const handleSubirFotoClick = () => {
    // Simula un clic en el input de archivo invisible, abriendo el explorador
    fileInputRef.current.click(); 
  };
  
  // Función para manejar la selección real del archivo (opcional)
  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          // Aquí puedes añadir la lógica para subir o previsualizar el archivo
          alert(`Archivo de licencia seleccionado: ${file.name}.`);
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
      
      <div className="container p-4" style={{ maxWidth: '600px' }}> 
        
        {/* Título */}
        <h2 className="mb-4 fw-bolder">Haz una foto de tu Permiso de conducir (Anverso)</h2>
        
        {/* Input de archivo invisible (El que realmente abre el explorador) */}
        <input
            type="file"
            ref={fileInputRef} // 🛑 Asignar la referencia
            onChange={handleFileChange} // Manejar el archivo seleccionado
            style={{ display: 'none' }} // 🛑 Ocultar visualmente
            accept="image/*, application/pdf" // Aceptar imágenes o PDFs
        />

        {/* Imagen de la Licencia (Simulación) */}
        <div className="text-center mb-5">
          <img 
            src={licenciaImage} 
            alt="Ejemplo de licencia de conducir de Perú"
            className="img-fluid rounded-3 border shadow-sm"
            style={{ maxWidth: '350px', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>

        {/* Instrucciones y Requisitos */}
        <p className="mb-5 text-secondary">
          Recuerda que es necesario tener como mínimo 21 años. En caso cuentes con un permiso de conducir 
          policial o militar, deberás subir una foto nítida donde aparezca dicho documento junto con tu 
          identificación en la misma imagen. Es importante que se visualicen claramente las cuatro esquinas 
          de ambos documentos, ya que esta información permitirá verificar tu permiso en los registros 
          oficiales del Ministerio de Transporte y Comunicaciones.
        </p>

        {/* Botón Principal "Subir foto" */}
        <div className="d-grid gap-2">
          <button 
            className="btn btn-dark text-white p-3" 
            onClick={handleSubirFotoClick} // 🛑 Llama a la función que activa el explorador
            style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
          >
            Subir foto
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default TomarFotoLicencia;