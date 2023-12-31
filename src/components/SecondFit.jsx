import React, { useState } from 'react';
import Graphic from './Graphic';
import './Fit.css';

function SecondFit(props) {
    // button function
    const processArray = props.formData;
    const [timeInstance, setTimeInstance] = useState([]);

    const handleClick = () => { // first fit logic
        let timeInstanceData = [];
        let lastPlacementIndex = 0;
        var memorySize = 2000;
        var maxTime = 0;

        class MemoryManagement { // class for memory
            constructor(memorySize){
                this.memorySize = memorySize;
                this.memory = new Array(memorySize).fill(null);
            }
        
            execProcess(process, require) {
                let allocatedCount = 0;
                let currentNullRange = 0;
                let found = false;
            
                for (let i = lastPlacementIndex; i < this.memorySize; i++) { // Start from last placement
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
            
                        lastPlacementIndex = i + 1; // Update the last placement index
                        found = true;
                        break; // Stop searching once a suitable range is found
                    }
                }
            
                // If not found in the first pass, wrap around and search from the beginning
                if (!found) {
                    for (let i = 0; i < lastPlacementIndex; i++) {
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
            
                            lastPlacementIndex = i + 1; // Update the last placement index
                            break; // Stop searching once a suitable range is found
                        }
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
        <div className='container'>
            <button onClick={handleClick} className='button'>Segundo Hueco</button>
            
            {timeInstance.map((instance, index) => (
                <Graphic key={index} instance={instance} index={index} />
            ))}
        </div>
    );
  }
  
export default SecondFit