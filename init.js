import fs from 'fs'
const db = {data:{}}

function initFromFile(){
    var data = JSON.parse(fs.readFileSync('./db.json'));
    db.data = data
    return db
}
function autoIncrementId (data,start = 1000){
    let index = start
    while(!!data[index.toString()]){
        index++
    }
    return index
}

export {autoIncrementId, initFromFile }