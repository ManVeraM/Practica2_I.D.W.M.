import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Definir la URL de la API que deseas consultar
    const apiUrl = 'https://localhost:7251/api/users/profile';

    // Realizar la solicitud a la API utilizando Axios
    axios.get(apiUrl)
      .then(response => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch(error => {
        // Manejar errores si la solicitud falla
        console.error('Error al obtener datos de la API', error);
      });
  }, []); // El segundo argumento de useEffect es un array de dependencias. En este caso, es un array vacío, lo que significa que solo se ejecutará una vez al montar el componente.

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {userData && (
          <div>
            <h2>User Data</h2>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;