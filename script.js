const P1 = {
    process: "P1",
    arrival: 0,
    require: 300,
    exectime: 1
}
const P2 = {
    process: "P2",
    arrival: 0,
    require: 200,
    exectime: 3
}
const P3 = {
    process: "P3",
    arrival: 2,
    require: 100,
    exectime: 1
}
  
const processArray = [P1, P2, P3];
let timeInstance = [];
var memorySize = 2000;
var maxTime = 0;
  
class MemoryManagement { // class for memory
    constructor(memorySize){
        this.memorySize = memorySize;
        this.memory = new Array(memorySize).fill(null);
    }

    execProcess(process, require){
        let allocatedCount = 0;

        for (let i=0; i<this.memorySize && allocatedCount < require; i++){ // loops memory array while allocating the process
            if(this.memory[i]===null){ // empty positions are represented as null. So if there is a null position then the process can be placed
                this.memory[i] = process;
                allocatedCount++;
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
        const nextProcess = processArray[i+1];
    
        if (process.arrival === n) {
            memoryManagement.execProcess(process.process, process.require); //allocates process

            if(!nextProcess || nextProcess.arrival !== process.arrival){ // only push if next arrival is different from current or if nextProcess is undefined
                const getposition = memoryManagement.getPositions();
                timeInstance.push(getposition);
            }

        } else if (process.arrival + process.exectime === n) { // finishing process
            memoryManagement.removeProcess(process.process);
            
            if(!nextProcess || (nextProcess.arrival + nextProcess.exectime) !== (process.arrival+ process.exectime)){ // only pushes when all process of a given time have finished
                const getposition = memoryManagement.getPositions();
                timeInstance.push(getposition);
            }
            
        }
    }
}

console.log(timeInstance);