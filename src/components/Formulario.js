import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import Cryptomoneda from './Cryptomoneda';
import Error from './Error'


function Formulario ({guardarMoneda, guardarCryptomoneda}) {

    const [cryptomonedas, guardarCryptomonedas] = useState([]);
    const [ monedaCotizar, guardarMonedaCotizar] = useState('');
    const [cryptoCotizar, guardarCryptoCotizar]  = useState('');
    const [ error,guardarError] = useState(false)

    useEffect(() => {
     
        const consultarAPI = async () => {
                  const url =  'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

                  const resultado = await axios.get(url);

                  guardarCryptomonedas(resultado.data.Data)
        }

        consultarAPI ();
    }, []);
    //validar que el usuario llene ambos campos
    const cotizarMoneda = e => {

        e.preventDefault();

        //validar si ambos campos estan llenos
        if(monedaCotizar === '' || cryptoCotizar === '') {
            guardarError(true);
            return;
        }
        //pasar datos al componente principal
        guardarError(false);
        guardarMoneda(monedaCotizar);
        guardarCryptomoneda(cryptoCotizar);
    }

        //mostrar el error
        const componente = (error) ?  <Error mensaje="Ambos campos son obligatorios"/> : null;
   
      return(
        <form
        onSubmit={cotizarMoneda}
        >
            {componente}
            <div className="row">
                <select
                className="form-control form-control ml-2 mr-2" type="text" 
                onChange={e => guardarMonedaCotizar(e.target.value)}
                >
                    <option value="">Selecionar Moneda</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="ARS">Peso Argentino</option>
                    <option value="EUR">EURO</option>

                </select>
            </div>

            <div className="row">
                <select
                className="form-control form-control mt-2 ml-2 mr-2"
                onChange={e => guardarCryptoCotizar(e.target.value)}

                >

                { cryptomonedas.map(cryptomoneda => (
                    <Cryptomoneda
                         key={cryptomoneda.CoinInfo.Id}
                        cryptomoneda={cryptomoneda}
                    />

                ))}
                <option value="">Selecionar Cryptomoneda</option>

                </select>
            </div>
            <input 
            type="submit" 
            className="btn btn-primary btn-block mt-2 "
            value="Cotizar"
             />
        </form>
    )
}

export default Formulario