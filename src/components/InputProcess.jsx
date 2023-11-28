import React, { useState } from 'react';
import './InputProcess.css';

function InputProcess(){

    const [procesoX, setProcesoX] = useState(1);
    const [formData, setFormData] = useState([]);

    const handleSubmit = (e) => { // every time submit button is clicked it excecutes the following
        e.preventDefault(); // prevents the default behaviour of submit button
        
        // gets every field value
        const instantArrival = document.getElementById('arrival').value;
        const memoriaRequerida = document.getElementById('require').value;
        const tiempoEjecucion = document.getElementById('exectime').value;

        if (!instantArrival || !memoriaRequerida || !tiempoEjecucion) {
            alert('Please fill in all fields');
            return; // Prevent form submission
        }

        // increases procesoX value by 1
        setProcesoX((prevValue) => prevValue + 1); 

        // creates an objet to place the data collected from the fields
        const newFormData = {
            process: procesoX,
            arrival: instantArrival,
            require: memoriaRequerida,
            exectime: tiempoEjecucion,
        };

        // saves each object into formData array. 
        setFormData((prevData) => [...prevData, newFormData]);

        // cleans every field value
        document.getElementById('arrival').value = '';
        document.getElementById('require').value = '';
        document.getElementById('exectime').value = '';
    };

    return(
        <div>
            {/*When submit button is clicked it excecutes handleSubmit function*/}
            <form onSubmit={handleSubmit} className="input-process-form">
                <h3>Proceso {procesoX}</h3>
                <label htmlFor="">Instante de llegada: </label>
                <input type="number" id="arrival" />
                <label htmlFor="">Memoria requerida: </label>
                <input type="number" min="100" id="require" />
                <label htmlFor="">Tiempo de ejecucion: </label>
                <input type="number" id="exectime"/>
                <input type="submit" value="Agregar"/>
            </form>
            
            {formData.length > 0 && ( // displays objects from array into a table if there is any
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