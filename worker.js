const express = require('express')
const app = express()

const PORT = 3000;
app.get('/', (req, res)=>{
        res.send(String(process.pid))
    })
    
//Blocking route
app.get('/block', (req, res)=>{
    let time = Date.now()
    let blockingTime = 10000 
    console.log(`Blocking operation at ${new Date(Date.now()).toLocaleString()}`)
    while((time + blockingTime) > Date.now()){
        console.log(Date.now())
    }
    let releaseTime = new Date(Date.now()).toLocaleString()
    console.log(`released at ${releaseTime}`)
    res.send(`released at ${releaseTime}`)
})

const server = app.listen(PORT, ()=>{ 
    console.log(`Server has started on PORT ${PORT}`)
    console.log(process.pid)
})

process.on('SIGINT', ()=>{
    shutdown('SIGINT'); 
})
process.on('SIGTERM', ()=>{
    shutdown('SIGTERM');
})

process.on('SIGUSR2', ()=>{
    shutdown('SIGUSR2');
})

function shutdown(signal){
    server.close((err)=>{
        if(err){
            process.exit(1)
        }
        console.log(`${signal} was recieved`)
        
        //We'll check the exit code in the cluster to restart ot not restart a worker
        if(signal === 'SIGUSR2'){
            process.exit(1)
        }else{
            process.exit(0)
        }
    })
}