import React, { useRef } from 'react'; // 🛑 Importar 'useRef'
import { useNavigate } from 'react-router-dom';

// Importación de tu imagen específica
import tarjetaCirculacionImage from '../assets/ejemplo-tarjeta-circulacion.jpg'; 

function SubirTarjetaCirculacion() {
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
          alert(`Documento de Tarjeta de Circulación seleccionado: ${file.name}.`);
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
        <h2 className="mb-4 fw-bolder">Sube el documento de Tarjeta de circulación</h2>
        
        {/* Input de archivo invisible (El que realmente abre el explorador) */}
        <input
            type="file"
            ref={fileInputRef} // 🛑 Asignar la referencia
            onChange={handleFileChange} // Manejar el archivo seleccionado
            style={{ display: 'none' }} // 🛑 Ocultar visualmente
            accept="image/*, application/pdf" // Aceptar imágenes o PDFs
        />
        
        {/* Imagen del Documento */}
        <div className="text-center mb-5">
          <img 
            src={tarjetaCirculacionImage} 
            alt="Ejemplo de Tarjeta Única de Circulación"
            className="img-fluid rounded-3 border shadow-sm"
            style={{ maxWidth: '300px', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>

        {/* Instrucciones y Requisitos */}
        <p className="mb-5 text-secondary">
          Debes subir el documento de la tarjeta de propiedad en formato digital, asegurándote de que esté 
          completo, nítido y legible, sin partes borrosas ni información cubierta; será rechazado si se encuentra 
          incompleto o con datos poco claros. Solo se aceptan documentos emitidos en los últimos 90 días, y deben 
          visualizarse correctamente el número de placa, los datos del propietario, la fecha de emisión y los códigos de 
          registro.
        </p>

        {/* Botón Principal "Subir documento" */}
        <div className="d-grid gap-2">
          <button 
            className="btn btn-dark text-white p-3" 
            onClick={handleSubirDocumentoClick} // 🛑 Llama a la función que activa el explorador
            style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
          >
            Subir documento
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default SubirTarjetaCirculacion;
