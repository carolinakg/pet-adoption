import React from 'react';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import AppProvider from './context/AppProvider';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);


root.render(
    <BrowserRouter>
    <AppProvider>
      <App/> 
    </AppProvider>
     
    </BrowserRouter>
);

//browerRouter permite colocar rotas
//appProvider permite acessar estados de todos os componentes
//app tem que ser filho do app provider
