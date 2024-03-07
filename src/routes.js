import bodyParser from 'body-parser';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto'

const database = new Database()

const jsonParser = bodyParser.json();

export const routes = [
  {
    method: 'GET',
    path: 'http://localhost:3333/users',
    handle: (req, res) => {
      const users = database.select('users')

      return res.end(JSON.stringify(users))
    } 
  },
  {
    method: 'POST',
    path: 'http://localhost:3333/users',
    handle: (req, res) => {
      jsonParser(req, res,  () => { 

        const {name, email} = req.body

        const user = {
          id: randomUUID(),
          name,
          email
        }

        database.insert('users', user)

        res.writeHead(201).end()
      })

    return;
    } 
  },
  {
    method: 'DELETE',
    path: 'http://localhost:3333/users',
    handle: (req, res) => {
      const userID = url.split('/')[2];
  
      database.delete('users', userID);
  
      return res.writeHead(204).end();
    } 
  }
]