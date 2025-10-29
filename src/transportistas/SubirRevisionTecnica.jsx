// src/components/SubirRevisionTecnica.jsx
import React, { useRef } from 'react'; // 🛑 Importar 'useRef'
import { useNavigate } from 'react-router-dom';

// AJUSTE DE IMPORTACIÓN
import revisionTecnicaImage from '../assets/ejemplo-revision-tecnica.jpg'; 

function SubirRevisionTecnica() {
  const navigate = useNavigate();
  // 1. Crear la referencia para el input de archivo
  const fileInputRef = useRef(null); 

  // Función para manejar el click del botón visible ("Subir documento")
  const handleSubirDocumentoClick = () => {
    // 2. Simula un clic en el input de archivo invisible, abriendo el explorador
    fileInputRef.current.click(); 
  };
  
  // Función para manejar la selección real del archivo (opcional)
  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          // Aquí puedes añadir la lógica para subir o previsualizar el archivo
          alert(`Documento de Revisión Técnica seleccionado: ${file.name}.`);
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
        
        <h2 className="mb-4 fw-bold">Sube el documento de revisión técnica</h2>

        {/* Input de archivo invisible (El que realmente abre el explorador) */}
        <input
            type="file"
            ref={fileInputRef} // 🛑 Asignar la referencia
            onChange={handleFileChange} // Manejar el archivo seleccionado
            style={{ display: 'none' }} // 🛑 Ocultar visualmente
            accept="image/*, application/pdf" // Aceptar imágenes o PDFs
        />
        
        {/* Uso de la imagen importada */}
        <div className="text-center mb-4">
          <img 
            src={revisionTecnicaImage} 
            alt="Ejemplo de Certificado de Inspección Técnica Vehicular"
            className="img-fluid rounded-3 border shadow-sm"
            style={{ maxWidth: '300px', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>
        
        {/* Instrucciones */}
        <p className="mb-5">
          El certificado de revisión técnica debe estar vigente y en buen estado. Es obligatorio que el documento se muestre completo y sin alteraciones, de manera que se pueda verificar claramente la placa del vehículo, los datos del propietario, la fecha de emisión, el resultado de la inspección y el número de registro correspondiente.
        </p>
        
        {/* Botón para subir documento */}
        <div className="d-grid">
          <button 
            type="button" 
            className="btn btn-dark text-white p-3" 
            style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            onClick={handleSubirDocumentoClick} // 🛑 Llama a la nueva función
          >
            Subir documento
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default SubirRevisionTecnica;
