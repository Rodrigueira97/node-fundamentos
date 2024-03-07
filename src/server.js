import { createServer } from 'node:http'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import bodyParser from 'body-parser';

const database = new Database()

const jsonParser = bodyParser.json();

const server = createServer((req, res) => {
  
  const {method, url} = req

    if(method === 'GET' && url === '/users'){

      const users = database.select('users')

      return res.end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/users'){

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

    if(method === 'DELETE' && url.startsWith('/users/')) {
      const userID = url.split('/')[2];
  
      database.delete('users', userID);
  
      return res.writeHead(204).end();
  }


    if(method === 'PUT' && url.startsWith('/users/')) {
      const userID = url.split('/')[2];

      jsonParser(req, res,  () => { 

      const {name, email} = req.body

      const dataUser = {
        name,
        email
      }

      database.update('users', userID, dataUser)

      res.writeHead(201).end()
    })

    return; 
}
    return res.writeHead(404).end()   
})

server.listen(3333)