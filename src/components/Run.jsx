import React, { useState } from 'react';
import './Run.css';

function Run(props) {
    // button function
    const processArray = props.formData;
    const [timeInstance, setTimeInstance] = useState([]);

    const handleClick = () => { // first fit logic
        let timeInstanceData = [];
        var memorySize = 2000;
        var maxTime = 0;

        class MemoryManagement { // class for memory
            constructor(memorySize){
                this.memorySize = memorySize;
                this.memory = new Array(memorySize).fill(null);
            }
        
            execProcess(process, require) { // checks if tere is any null range emtpy and if it fits the process
                let allocatedCount = 0;
                let currentNullRange = 0;
            
                for (let i = 0; i < this.memorySize; i++) {
                    if (this.memory[i] === null) {
                        currentNullRange++;
                    } else {
                        currentNullRange = 0; // Reset the null range counter
                    }
            
                    if (currentNullRange >= require) {
                        // Found a null range big enough to fit 'require'
                        for (let j = i - currentNullRange + 1; j <= i; j++) {
                            this.memory[j] = process;
                            allocatedCount++;
                        }
            
                        break; // Stop searching once a suitable range is found
                    }
                }
            }
        
            removeProcess(process){ // removes process turning their position into null
                for(let i=0; i<this.memorySize; i++){
                    if(this.memory[i] === process){
                        this.memory[i] = null;
                    }
                }
            }
            getPositions(){ // show memory status by making an object for every memory partition and appending it to an array
                let result = [];
                let current = undefined;
                let size = 0;
                for (let i = 0; i < this.memory.length; i++) {
                    if (this.memory[i] !== current) {
                        if (current !== undefined) {
                            result.push({ starting_position: i - size, state: current, size: size });
                        }
                        current = this.memory[i];
                        size = 1;
                    } else {
                        size++;
                    }
                }
                if (current !== undefined) {
                    result.push({ starting_position: this.memory.length - size, state: current, size: size });
                }
                return result;
            }
        }

        const memoryManagement = new MemoryManagement(memorySize); // I create memoryManagement object with memorySize 2000

        processArray.forEach((process) => { // Gets the max time a process will be executed
            var calculateTime = process.arrival+process.exectime;
            if(calculateTime > maxTime){
                maxTime = calculateTime;
            }
        });
        
        for (let n = 0; n <= maxTime; n++) { // for each time instance checks which process needs execution
            for (let i = 0; i < processArray.length; i++) { // loops through processArray
                const process = processArray[i];
            
                if (process.arrival === n) {
                    memoryManagement.execProcess(process.process, process.require); //allocates process
        
                } else if (process.arrival + process.exectime === n) { // finishing process
                    memoryManagement.removeProcess(process.process);
                }
            }
            const getposition = memoryManagement.getPositions();
            timeInstanceData.push(getposition);
        }

        setTimeInstance(timeInstanceData);
    };

    return(
        <div>
            <button onClick={handleClick}>Ejecutar</button>
            
            {timeInstance.map((instance, index) => (
                <div key={index}>
                <h3>Instancia de tiempo: {index}</h3>
                <div className="memory-container">
                    {instance.map((partition, partitionIndex) => (
                    <div
                        key={partitionIndex}
                        className="memory-partition"
                        style={{ width: `${(partition.size / 2000) * 100}%` }}
                    >
                        {partition.state || 'Vacío'} ({partition.size})
                    </div>
                    ))}
                </div>
                </div>
            ))}
        </div>
    );
  }
  
export default Run