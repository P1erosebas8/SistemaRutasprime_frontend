// src/components/SubirDocumentoSoat.jsx
import React, { useRef } from 'react'; // 🛑 Importar 'useRef'
import { useNavigate } from 'react-router-dom';

// Importación de la imagen del SOAT (asumiendo que resolviste la ruta)
import soatImage from '../assets/ejemplo-soat.jpg'; 

function SubirDocumentoSoat() {
  const navigate = useNavigate();
  // 🛑 1. Crear la referencia para el input de archivo
  const fileInputRef = useRef(null); 

  // 🛑 2. Función para manejar el click del botón visible
  const handleSubirDocumentoClick = () => {
    // Simula un clic en el input de archivo invisible
    fileInputRef.current.click(); 
  };
  
  // 🛑 3. Función para manejar la selección real del archivo (opcional)
  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          // Aquí puedes añadir la lógica para subir o previsualizar el archivo
          alert(`Archivo seleccionado: ${file.name}`);
      }
  }

  return (
    <div className="container-fluid p-0 bg-white min-vh-100">
      
      {/* Header */}
      <header className="bg-dark text-white p-3 mb-4 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-link text-white p-0 me-3" 
            onClick={() => navigate(-1)} 
            aria-label="Atrás"
          >
            <span className="fs-4 fw-bold" style={{ lineHeight: '1' }}>&larr;</span> 
          </button>
          <h1 className="fs-4 m-0">RUTASPRIME</h1>
        </div>
        <button className="btn btn-outline-light btn-sm px-3 py-1">Ayuda?</button>
      </header>
      
      <div className="container p-4" style={{ maxWidth: '600px' }}> 
        
        <h2 className="mb-4 fw-bold">Sube el documento de Soat</h2>
        
        {/* Input de archivo invisible */}
        <input
            type="file"
            ref={fileInputRef} // 🛑 4. Asignar la referencia
            onChange={handleFileChange} // 🛑 5. Manejar el cambio de archivo
            style={{ display: 'none' }} // 🛑 6. Ocultar el input
            accept="image/*, application/pdf" // Opcional: Filtra por tipos de archivo (imágenes y PDF)
        />

        {/* Uso de la imagen importada */}
        <div className="text-center mb-4">
          <img 
            src={soatImage} 
            alt="Ejemplo de documento SOAT"
            className="img-fluid rounded-3 border shadow-sm"
            style={{ maxWidth: '300px', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>
        
        {/* Instrucciones */}
        <p className="mb-5">
          Se verificará el documento a través del registro en línea de la Asociación Peruana de Empresas de Seguros u otros registros oficiales. A continuación se muestran los formatos aceptados: 1. Captura de la verificación de tu placa en la app "Consulta SOAT". 2. SOAT electrónico emitido por tu aseguradora vehicular. 3. SOAT físico emitido por tu aseguradora vehicular.
        </p>
        
        {/* Botón para subir documento */}
        <div className="d-grid">
          <button 
            type="button" 
            className="btn btn-dark text-white p-3" 
            style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            onClick={handleSubirDocumentoClick} // 🛑 Llama a la función que activa el input
          >
            Subir documento
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default SubirDocumentoSoat;