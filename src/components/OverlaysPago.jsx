export const OverlaysPago = ({ pagoExitoso, pagoFallido, errorMessage }) => {
  return (
    <>
      {pagoExitoso && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h3 className="success-text">¡Pago Exitoso!</h3>
            <p className="success-subtitle">Tu pago ha sido procesado correctamente</p>
          </div>
        </div>
      )}

      {pagoFallido && (
        <div className="error-overlay">
          <div className="error-card">
            <div className="error-icon">✕</div>
            <h3 className="error-text">Pago Fallido</h3>
            <p className="error-subtitle">{errorMessage || "No se pudo procesar el pago"}</p>
          </div>
        </div>
      )}

      <style>{`
        .success-overlay,
        .error-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          animation: overlayFadeIn 0.3s ease;
        }

        @keyframes overlayFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .success-card,
        .error-card {
          background: white;
          border-radius: 24px;
          padding: 60px 50px;
          max-width: 480px;
          width: 90%;
          text-align: center;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
          animation: cardSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes cardSlideUp {
          from {
            transform: translateY(60px) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        .success-icon,
        .error-icon {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          margin: 0 auto 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          font-weight: bold;
          color: white;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          animation: iconScale 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }

        .success-icon {
          background: linear-gradient(135deg, #4caf50 0%, #66bb6a 50%, #81c784 100%);
          animation: iconScale 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55), successPulse 2s infinite 1s;
        }

        .error-icon {
          background: linear-gradient(135deg, #f44336 0%, #ef5350 50%, #e57373 100%);
          animation: iconScale 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55), errorShake 0.5s ease 1s;
        }

        @keyframes iconScale {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes successPulse {
          0%, 100% {
            box-shadow: 0 12px 40px rgba(76, 175, 80, 0.3);
          }
          50% {
            box-shadow: 0 12px 40px rgba(76, 175, 80, 0.6), 0 0 0 20px rgba(76, 175, 80, 0);
          }
        }

        @keyframes errorShake {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          25% {
            transform: translateX(-10px) rotate(-5deg);
          }
          75% {
            transform: translateX(10px) rotate(5deg);
          }
        }

        .success-text,
        .error-text {
          font-size: 32px;
          font-weight: 800;
          margin: 0 0 18px 0;
          line-height: 1.2;
          letter-spacing: -0.5px;
          animation: textSlideUp 0.4s ease 0.6s backwards;
        }

        .success-text {
          color: #2e7d32;
        }

        .error-text {
          color: #c62828;
        }

        @keyframes textSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-subtitle,
        .error-subtitle {
          font-size: 17px;
          font-weight: 500;
          color: #666;
          margin: 0;
          line-height: 1.6;
          animation: textSlideUp 0.4s ease 0.75s backwards;
        }

        .error-subtitle {
          color: #d32f2f;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .success-card,
          .error-card {
            padding: 50px 40px;
            max-width: 400px;
            width: 88%;
            border-radius: 20px;
          }

          .success-icon,
          .error-icon {
            width: 120px;
            height: 120px;
            margin-bottom: 30px;
            font-size: 68px;
          }

          .success-text,
          .error-text {
            font-size: 28px;
            margin-bottom: 16px;
          }

          .success-subtitle,
          .error-subtitle {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .success-card,
          .error-card {
            padding: 44px 32px;
            max-width: 340px;
            width: 86%;
            border-radius: 18px;
          }

          .success-icon,
          .error-icon {
            width: 100px;
            height: 100px;
            margin-bottom: 26px;
            font-size: 56px;
          }

          .success-text,
          .error-text {
            font-size: 24px;
            margin-bottom: 14px;
          }

          .success-subtitle,
          .error-subtitle {
            font-size: 15px;
          }
        }

        @media (max-width: 360px) {
          .success-card,
          .error-card {
            padding: 38px 28px;
            max-width: 300px;
            width: 84%;
          }

          .success-icon,
          .error-icon {
            width: 90px;
            height: 90px;
            margin-bottom: 22px;
            font-size: 50px;
          }

          .success-text,
          .error-text {
            font-size: 22px;
            margin-bottom: 12px;
          }

          .success-subtitle,
          .error-subtitle {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  )
}