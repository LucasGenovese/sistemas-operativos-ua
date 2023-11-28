import React, { useState } from 'react';
import './InputProcess.css';

function InputProcess(){

    const [procesoX, setProcesoX] = useState(1);
    const [formData, setFormData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const instantArrival = document.getElementById('arrival').value;
        const memoriaRequerida = document.getElementById('require').value;
        const tiempoEjecucion = document.getElementById('exectime').value;

        setProcesoX((prevValue) => prevValue + 1);

        const newFormData = {
            process: procesoX,
            arrival: instantArrival,
            require: memoriaRequerida,
            exectime: tiempoEjecucion,
        };

        setFormData((prevData) => [...prevData, newFormData]);

        document.getElementById('arrival').value = '';
        document.getElementById('require').value = '';
        document.getElementById('exectime').value = '';
    };

    return(
        <div>

        
        <form onSubmit={handleSubmit} className="input-process-form">
            <p>Proceso {procesoX}</p>
            <label htmlFor="">Instante de llegada: </label>
            <input type="number" id="arrival" />
            <label htmlFor="">Memoria requerida: </label>
            <input type="number" id="require" />
            <label htmlFor="">Tiempo de ejecucion: </label>
            <input type="number" id="exectime"/>
            <input type="submit" value="Submit"/>
        </form>
        
        {formData.length > 0 && (
        <div>
          <h2>Lista de procesos:</h2>
          <table>
            <thead>
              <tr>
                <th>Proceso</th>
                <th>Instante de llegada</th>
                <th>Memoria requerida</th>
                <th>Tiempo de ejecucion</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data, index) => (
                <tr key={index}>
                  <td>{data.process}</td>
                  <td>{data.arrival}</td>
                  <td>{data.require}</td>
                  <td>{data.exectime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
        </div>
    );
    
}

export default InputProcess