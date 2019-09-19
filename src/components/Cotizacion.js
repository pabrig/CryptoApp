import React from 'react';
import Logo from '../logo.png'


const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).length === 0 ) return null;
   
      return (
          <div className="resultado">
          <div class="card border-primary mb-3 mt-4" >
  <div className="card-header">
     <p className="precio"><img src={Logo} alt="logos" className="logo2 mt-2"/>Cotizacion: <span>{resultado.PRICE}</span></p>
  </div>
  <div className="card-body">
    <h2 className="card-title"><p>Ultima Actualizacion : <span>{resultado.LASTUPDATE}</span></p></h2>
         <p>Mayor cotizacion /24Hs : <span>{resultado.HIGHDAY}</span></p>
         <p>Menor cotizacion /24Hs : <span>{resultado.LOWHDAY}</span></p>
         <p>Variacion /24Hs : <span>{resultado.CHANGEPCT24HOUR}</span></p>
  </div>
           </div>
           
           
          </div>
      )
}

export default Cotizacion;