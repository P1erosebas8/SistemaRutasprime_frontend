function HeroSection({
    title,
    subtitle,
    background,
    height = "80vh",
    overlay = "rgba(0,0,0,0.5)",
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
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{ backgroundColor: overlay }}
            ></div>
            <div className="position-relative">
                <h1 className="display-3 fw-bold">{title}</h1>
                {subtitle && <p className="lead">{subtitle}</p>}
            </div>
        </section>
    );
}

export default HeroSection;
