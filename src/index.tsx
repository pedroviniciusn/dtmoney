import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

import { createServer, Model } from "miragejs";
import Modal from 'react-modal';


    createServer({
      models: {
        transactions: Model,
      },

      seeds(server) {
        server.db.loadData({
          transactions: [
          {
            id: 1,
            title: 'teclado gamer',
            type:'withdraw',
            category: 'setup',
            amount: 400,
            createdAt: new Date('2022-05-4 17:00:00')
          },
          {
            id: 2,
            title: 'fone gamer',
            type:'withdraw',
            category: 'setup',
            amount: 500,
            createdAt: new Date('2022-05-4 17:00:00')
          }
        ]
        })
      },

      routes() {
        this.namespace ='api'

        this.get("/transactions", () => {
          return this.schema.all('transactions')
    })

    this.post('/transactions',(schema, request) => {
      const data = JSON.parse(request.requestBody)
      
      return schema.create('transactions', data)
    })
  }
})

Modal.setAppElement('#root');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


