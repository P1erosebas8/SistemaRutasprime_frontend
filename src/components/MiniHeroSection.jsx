function MiniHeroSection({
    title,
    subtitle,
    description,
    background,
    height = "35vh",
    overlay = "rgba(0,0,0,0.55)",
    align = "center",
    backgroundPosition = "center",
  }) {
    const alignmentClass =
      align === "left"
        ? "align-items-start text-start ps-5"
        : align === "right"
        ? "align-items-end text-end pe-5"
        : "align-items-center text-center";
  
    return (
      <section
        className={`d-flex flex-column justify-content-center ${alignmentClass} text-white`}
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition,
          width: "100vw",
          height,
          position: "relative",
        }}
      >
        {/* Overlay oscuro */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: overlay }}
        ></div>
  
        {/* Contenido */}
        <div className="position-relative">
          <h1 className="fw-bold" style={{ fontSize: "2.2rem" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mb-1" style={{ fontSize: "1.1rem", fontWeight: "500" }}>
              {subtitle}
            </p>
          )}
          {description && (
            <p className="mb-0" style={{ fontSize: "0.95rem", opacity: 0.9 }}>
              {description}
            </p>
          )}
        </div>
      </section>
    );
  }
  
  export default MiniHeroSection;  