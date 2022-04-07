const { readFileSync, writeFileSync } = require('fs')

const dbA = readFileSync('dbA.txt', 'utf-8').split('\n').map(item => item ? item.trim() : item);
const dbB = readFileSync('dbB.txt', 'utf-8').split('\n').map(item => item ? item.trim() : item);

let newDb = ''

let control = {dbA: dbA.length, dbB: dbB.length, total: (dbA.length + dbB.length), removidas: 0, nova_db: 0}

const replicadas = (line) => {
  if(dbA.includes(line)){
    control.removidas += 1
    return
  }else{
    newDb += line + '\n'
    control.nova_db += 1
    return
  }
}

dbB.forEach(line => {
  replicadas(line)
})

writeFileSync('nova_db.txt', newDb)

console.log(control)