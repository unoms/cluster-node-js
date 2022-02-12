const cluster = require('cluster')
const os = require('os')

//We are going to fork the main process 
//so we should check if we are in master or in worker
if(cluster.isMaster){
    const cpusCount = os.cpus().length
    console.log(`The number of cpus: ${cpusCount}`)
    console.log(`The main PID: ${process.pid}`)
    //Usually we start the number of workers equal to the number of CPUs - 1
    //Because one cpu is needed to handle with the master process
    for(let i = 0; i < cpusCount -1; i++){
        const worker = cluster.fork()
        console.log(`Worker id ${worker.process.pid}`)
    }

    cluster.on('exit', (worker, code)=>{
        console.log(`Worker with id ${worker.process.pid} has died`)
        console.log(`Code ${code}`)
        if(code === 0){
            const worker = cluster.fork()
            console.log(`Worker id ${worker.process.pid}`)
        }
    })
}else{
    //Start express in workers
    require('./worker.js')
}
