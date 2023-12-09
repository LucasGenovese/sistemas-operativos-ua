import React from 'react';
import './Graphic.css';

const Graphic = ({ instance, index }) => (
    <div key={index}>
    <h3>Instancia de tiempo: {index}</h3>
    <div className="memory-container">
      {instance.map((partition, partitionIndex) => (
        <div
          key={partitionIndex}
          className="memory-partition"
          style={{ width: `${(partition.size / 2000) * 100}%` }}
        >
          {partition.state || 'Vacío'} <br />
          ({partition.size})
        </div>
      ))}
    </div>
  </div>
);

export default Graphic;
