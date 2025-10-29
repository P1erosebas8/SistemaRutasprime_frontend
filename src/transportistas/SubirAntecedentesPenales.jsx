import React, { useRef } from 'react'; // 🛑 Importar 'useRef'
import { useNavigate } from 'react-router-dom';

// Importar la imagen de antecedentes desde tu ruta
import antecedentesImage from '../assets/ejemplo-antecedentes.jpg'; 

function SubirAntecedentesPenales() {
  const navigate = useNavigate();
  // 1. Crear la referencia para el input de archivo
  const fileInputRef = useRef(null); 

  // Función para manejar el click del botón visible ("Subir documento")
  const handleSubirDocumentoClick = () => {
    // Simula un clic en el input de archivo invisible, abriendo el explorador
    fileInputRef.current.click(); 
  };
  
  // Función para manejar la selección real del archivo (opcional)
  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          // Aquí puedes añadir la lógica para subir o previsualizar el archivo
          // Se usa un alert() en lugar de console.log() según las instrucciones del entorno.
          alert(`Documento de Antecedentes seleccionado: ${file.name}.`);
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
        <h2 className="mb-4 fw-bolder">Sube el documento de tu Certificado de Antecedentes Penales</h2>
        
        {/* Input de archivo invisible (El que realmente abre el explorador) */}
        <input
            type="file"
            ref={fileInputRef} // 🛑 Asignar la referencia
            onChange={handleFileChange} // Manejar el archivo seleccionado
            style={{ display: 'none' }} // 🛑 Ocultar visualmente
            accept="image/*, application/pdf" // Aceptar imágenes o PDFs
        />

        {/* Imagen del Certificado (Simulación) */}
        <div className="text-center mb-5">
          {/* Usar la variable importada (antecedentesImage) */}
          <img 
            src={antecedentesImage} 
            alt="Ejemplo de Certificado de Antecedentes Penales"
            className="img-fluid rounded-3 border shadow-sm"
            style={{ maxWidth: '300px', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>

        {/* Instrucciones y Requisitos */}
        <p className="mb-5 text-secondary">
          Debes subir una foto del documento en la que se vean las cuatro esquinas completas, con buena nitidez, sin 
          reflejos del flash ni partes borrosas, de modo que todo el texto sea legible; el documento será rechazado si 
          aparece incompleto o cubierto, y solo se aceptan aquellos emitidos en los últimos 90 días, verificando que en 
          la imagen se distingan claramente tu nombre, número de identidad, fecha de emisión y los códigos de 
          registro; para más información sobre cómo obtener este documento, puedes ingresar a: 
          <a href="https://cape.pj.gob.pe/cape/" target="_blank" rel="noopener noreferrer"> https://cape.pj.gob.pe/cape/</a>.
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

export default SubirAntecedentesPenales;
