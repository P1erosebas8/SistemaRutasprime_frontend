import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappBoton = () => {
  return (
    <a
      href="https://wa.me/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        zIndex: 1000,
        cursor: "pointer",
      }}
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsappBoton;
