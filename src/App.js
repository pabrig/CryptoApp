import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import Cotizacion from './components/Cotizacion';
import Logo from './logo.png'



function App() {

  const [moneda, guardarMoneda ] = useState ('');
  const [ cryptomoneda, guardarCryptomoneda ] = useState ('');
  const [ cargando, guardarCargando ] = useState (false);
  const [ resultado, guardarResultado ] = useState ({});

  useEffect (() => {
    const cotizarCriptomoneda = async () => {

      //si no ahi monda no ejecutar
      if (moneda === '') return;
       
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);
  
      //mostrar spinner y agregar resultado
      guardarCargando(true);

      setTimeout(() => {
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[cryptomoneda][moneda])
      }, 3000)
    }

    cotizarCriptomoneda();
  },[cryptomoneda, moneda]);

  //mostrar spinner o resultado

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado = {resultado} />;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
        <h2 className="titulo"><img src={Logo} alt ="logo" className="center-image mt-2"/>Crypto App</h2>
          <img src={imagen} alt="imagen" className="logotipo1"/>
        </div>
        <div className="col-md-6">

               <Formulario
               guardarMoneda = {guardarMoneda}
               guardarCryptomoneda = {guardarCryptomoneda}
          />
          {componente}
        </div>
      </div>
    </div>

  );
}

export default App;
