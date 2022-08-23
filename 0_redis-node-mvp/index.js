const { createClient } = require('redis')
const express = require('express')
const app = express()
const fetch = require('node-fetch')
const port = 3000

const client = createClient()

client
.on('error', err => console.error(err))
client.connect()
    .then(() => {
        console.log(`Client ready`)
    })

app.get('/', async (req, res) => {

    // 1. Try get from cache
    let result = await client.get('any_unique_key_here')
    if(!result){
        // 2. Not found in cache. Retrieve again from source, and set in cache
        console.log(`CACHE MISS`)

        result = await fetch(`https://jsonplaceholder.typicode.com/photos`)
       .then(res => res.json())

       client.set('any_unique_key_here', JSON.stringify(result))
    }else{
        console.log(`CACHE HIT`)
    }
    res.send(result)
})

app.get('/flush', async (req, res) => {
    // 3. To remove all cache
    await client.flushAll()

    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})