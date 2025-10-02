import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";

function PasswordInput({
  value,
  onChange,
  name,
  placeholder = "Contraseña",
  required = true,
  withStrength = false,
}) {
  const [show, setShow] = useState(false);

  // Reglas de validación
  const rules = [
    { regex: /.{8,}/, label: "Al menos 8 caracteres" },
    { regex: /[A-Z]/, label: "Una letra mayúscula" },
    { regex: /[a-z]/, label: "Una letra minúscula" },
    { regex: /\d/, label: "Un número" },
    { regex: /[@$!%*?&]/, label: "Un carácter especial (@$!%*?&)" },
  ];

  // Cálculo de fuerza
  const getStrength = (password) => {
    let score = rules.filter((r) => r.regex.test(password)).length;
    if (score <= 2) return { label: "Débil", color: "danger", percent: 40 };
    if (score === 3) return { label: "Medio", color: "warning", percent: 70 };
    if (score >= 4) return { label: "Fuerte", color: "success", percent: 100 };
  };

  const strength = withStrength && value ? getStrength(value) : null;
  const allPassed = rules.every((r) => r.regex.test(value));

  return (
    <div className="mb-2">
      <div className="input-group">
        <input
          type={show ? "text" : "password"}
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
        <span
          className="input-group-text"
          role="button"
          onClick={() => setShow(!show)}
          style={{
            cursor: "pointer",
            transition: "transform 0.2s ease",
            transform: show ? "scale(1.2)" : "scale(1)",
          }}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </div>

      {/* Barra de fuerza */}
      {strength && (
        <div className="mt-1">
          <div className="progress" style={{ height: "5px" }}>
            <div
              className={`progress-bar bg-${strength.color}`}
              role="progressbar"
              style={{ width: `${strength.percent}%` }}
            ></div>
          </div>
          <small className={`text-${strength.color}`}>
            {strength.label} contraseña
          </small>
        </div>
      )}

      {/* Tooltip dinámico con reglas o mensaje global */}
      {withStrength && value && (
        <>
          {allPassed ? (
            <div className="mt-2 text-success d-flex align-items-center">
              <Check size={16} className="me-1" /> Contraseña segura
            </div>
          ) : (
            <ul
              className="list-unstyled mt-2 mb-0"
              style={{ fontSize: "0.85rem" }}
            >
              {rules.map((rule, i) => {
                const passed = rule.regex.test(value);
                return (
                  <li
                    key={i}
                    className={`d-flex align-items-center ${
                      passed ? "text-success" : "text-danger"
                    }`}
                  >
                    {passed ? (
                      <Check size={14} className="me-1" />
                    ) : (
                      <X size={14} className="me-1" />
                    )}
                    {rule.label}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default PasswordInput;