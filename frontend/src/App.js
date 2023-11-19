import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import CardContent from '@mui/material/CardContent';

import Chip from '@mui/material/Chip';

function App() {
  const [Frameworks, setFrameworks] = useState([]);
  const [Hobbies, setHobbies] = useState([]);
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [summary, setSummary] = useState("");


  useEffect(() => {

    const apiUrl = 'https://localhost:7251/api/users/profile';

    axios.get(apiUrl)
      .then(response => {
        console.log(response);
        setName(response.data.name);
        setLastName(response.data.lastname);
        setEmail(response.data.email);
        setCountry(response.data.country);
        setSummary(response.data.summary);
        setHobbies(response.data.hobbies);
        setCity(response.data.city);
        setFrameworks(response.data.frameworks);
        
      })
      .catch(error => {

        console.error('Error al obtener datos de la API', error);
      });
  }, []); 

  return (
    <div className="App">
    <Box>
      {/* Celeste arriba */}
      <Grid container style={{ backgroundColor: '#87CEEB', minHeight: '33vh' }} alignItems="center" justifyContent="center" >
        <Grid item xs={12} textAlign="center" sx={{marginBottom: 2,  marginTop: 2}}>
          <Typography gutterBottom variant="h4" component="div">
            {Name} {LastName}
          </Typography>
          <Divider variant="middle" />
          
          <Stack direction="row" spacing={1} justifyContent="center" style={{ marginTop: '8px' }}>
            <Chip label={Email} EmailIcon={<EmailIcon />} />
            <Chip label={`${city}, ${country}`} LocationCityIcon={<LocationCityIcon />} />
          </Stack>
        </Grid>
      </Grid>

      {/* Blanco al medio */}
      <Grid container style={{ backgroundColor: '#fff', minHeight: '33vh' }} alignItems="center" justifyContent="center">
        <Grid item xs={12} sx={{marginBottom: 2,  marginTop: 2}}>
          <Typography gutterBottom variant="h4" component="div" align='center'>
            Informacion personal
          </Typography>


          <Grid container spacing={2} justifyContent="center">
            <Card sx={{ width: 800, height: 200, marginBottom: 2,  marginTop: 2}} >
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" textAlign="center" gutterBottom>
                  Resumen del Usuario
                </Typography>
                <Typography variant="body2" textAlign="center">
                  {summary}
                </Typography>
              </CardContent>
            </Card>
           </Grid>

          {/* Contenedor para las Cards */}
          <Grid container spacing={2} justifyContent="center" >
            {Hobbies.map((hobby, index) => (
              <Grid item key={index}>
                <Card sx={{ width: 275,marginBottom: 2,  marginTop: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" textAlign="center" gutterBottom>
                      {hobby.name}
                    </Typography>
                    <Typography variant="body2" textAlign="center">
                      {hobby.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid> 

      {/* Celeste abajo */}
      <Grid container style={{ backgroundColor: '#87CEEB', minHeight: '33vh' }} alignItems="center" justifyContent="center">
        <Grid item xs={12} sx={{marginBottom: 2,  marginTop: 2}}>
          {/* Contenido de la tercera sección (puedes poner lo que quieras aquí) */}
          <header className="App-header">
          <Typography gutterBottom variant="h4" component="div" align='center'>
            Habilidades
          </Typography>
            <div style={{ margin: '0 auto', maxWidth: 800 }}>
              <TableContainer component={Paper} sx={{marginBottom: 2,  marginTop: 2}}>
                <Table sx={{ minWidth: 650, }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell align="right">Nivel</TableCell>
                      <TableCell align="right">Año</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Frameworks && Frameworks.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.level}</TableCell>
                        <TableCell align="right">{row.year}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </header>
        </Grid>
      </Grid>
    </Box>
  </div>
);
}

export default App;