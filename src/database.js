import { writeFile, readFile } from 'node:fs/promises'

const databasPath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    readFile(databasPath, 'utf8').then(data => (
      this.#database = JSON.parse(data)
    )).catch(() =>{
      this.#persist()
    })
  }

  #persist (){
    writeFile(databasPath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  delete(table, id){
    if(Array.isArray(this.#database[table])) {
      this.#database[table] = this.#database[table].filter( item => item.id !== id)

      this.#persist()
    } 
  }

  update(table, id, newData){
    const indexUser = this.#database[table].findIndex( item => item.id === id)
    if(indexUser !== -1) {
      this.#database[table][indexUser] = {...this.#database[table][indexUser], ...newData }

      this.#persist()
    } 
  }
}