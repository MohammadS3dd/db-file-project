import fs from 'fs'
import express from 'express'
import { bookRouter } from './books.js'
import { sellerRouter } from './sellers.js'
import { buyersRouter } from './buyers.js'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const db = {data:{}}


function initFromFile(){
    var data = JSON.parse(fs.readFileSync('./db.json'));
    db.data = data
}
function autoIncrementId (data,start = 1000){
    let index = start
    while(!!data[index.toString()]){
        index++
    }
    return index
}


initFromFile()
console.log(db, );



app.use('/books' ,bookRouter)
app.use('/sellers' ,sellerRouter)
app.use('/buyers' ,buyersRouter)
app.listen(3000, ()=>{
    console.log("listeniing at port:3000")
}) 