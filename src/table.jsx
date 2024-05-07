import React, { useState, useEffect } from "react";

function Table({ messages }) {
  const [cryptoData, setCryptoData] = useState({});

  useEffect(() => {
    // Función para actualizar o agregar datos de una moneda
    const updateCryptoData = (newData) => {
      setCryptoData((prevData) => {
        const updatedData = { ...prevData };
        updatedData[newData.coin] = newData;
        return updatedData;
      });
    };

    // Procesar los mensajes y actualizar el estado
    messages.forEach((message) => {
      const { coin, values, operations, time } = message;
      const { max, min, average, lastValue } = calculateStats(values);
      const lastOperation = operations[0];
      const lastTime = time[0];

      updateCryptoData({
        coin,
        lastValue,
        max,
        min,
        average: average.toFixed(2),
        lastOperation,
        lastTime,
      });
    });
  }, [messages]);

  const calculateStats = (values) => {
    const max = Math.max(...values.map(parseFloat));
    const min = Math.min(...values.map(parseFloat));
    const sum = values.reduce((acc, val) => acc + parseFloat(val), 0);
    const average = sum / values.length;
    const lastValue = values[0];
    return { max, min, average, lastValue };
  };

  return (
    <table>
      <thead>
        <tr>
          <th className="td-left">Crypto</th>
          <th className="td-right">Actual Pric.</th>
          <th className="td-right">Higest 1H</th>
          <th className="td-right">Lower 1H</th>
          <th className="td-right">AVG Price</th>
          <th>Signal(B|S)</th>
          <th>Last Upd.</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(cryptoData).map((item, index) => (
          <tr key={index}>
            <td className="td-left">{item.coin}</td>
            <td className="td-right number-cell">{item.lastValue}</td>
            <td className="td-right number-cell">{item.max}</td>
            <td className="td-right number-cell">{item.min}</td>
            <td className="td-right number-cell">{item.average}</td>
            <td
              className={
                item.lastOperation === "BUY"
                  ? "buy-operation"
                  : "sell-operation"
              }
            >
              {item.lastOperation}
            </td>
            <td className="number-cell">{item.lastTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
