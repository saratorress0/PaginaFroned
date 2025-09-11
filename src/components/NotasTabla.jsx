import React, { useState } from "react";
function NotasTabla({ editable }) {
    const columnas = ["Examen 1", "Examen 2", "Examen Final", "H1", "H2", "H3", "H4", "Nota promediada"];
   
    const [notas, setNotas] = useState([
      { estudiante: "Juan Pérez", notas: ["", "", "", "", "", "", "", ""] },
      { estudiante: "María Gómez", notas: ["", "", "", "", "", "", "", ""] },
      { estudiante: "Carlos Ruiz", notas: ["", "", "", "", "", "", "", ""] },
    ]);
   
    const handleNotaChange = (estIndex, colIndex, valor) => {
      const nuevasNotas = [...notas];
      nuevasNotas[estIndex].notas[colIndex] = valor;
      setNotas(nuevasNotas);
    };
   
    const calcularPromedio = (notas) => {
      const numeros = notas.map((n) => parseFloat(n)).filter((n) => !isNaN(n));
      if (numeros.length === 0) return "-";
      return (numeros.reduce((a, b) => a + b, 0) / numeros.length).toFixed(2);
    };
   
    return (
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px", background: "#0d2b45", color: "#fff" }}>Estudiante</th>
            {columnas.map((col, i) => (
              <th key={i} style={{ border: "1px solid #ccc", padding: "8px", background: "#0d2b45", color: "#fff" }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {notas.map((fila, estIndex) => (
            <tr key={estIndex}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{fila.estudiante}</td>
              {fila.notas.map((nota, colIndex) => (
                colIndex === columnas.length - 1 ? (
                  <td key={colIndex} style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                    {calcularPromedio(fila.notas.slice(0, -1))}
                  </td>
                ) : (
                  <td key={colIndex} style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {editable ? (
                      <input
                        type="number"
                        value={nota}
                        onChange={(e) => handleNotaChange(estIndex, colIndex, e.target.value)}
                        style={{ width: "80px", padding: "5px", textAlign: "center" }}
                      />
                    ) : (
                      nota
                    )}
                  </td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

export default NotasTabla;
