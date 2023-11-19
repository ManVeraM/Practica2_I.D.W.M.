# Practica_2_IDWM
For the backend
  This is a project powered by .NET 7 and uses sqlite to store data, to run correctly the App you need to do the following steps:
  You need to check if you have .NET 7 on your machine. To do that you can execute
    dotnet help
    
  Install if you don´t have it.
  
  Open a git bash (or terminal) into a custom folder and clone the repository inside them.
  Install dependencies, with the following command in the terminal
    dotnet restore
  Run the project, with 
    dotnet run

For the frontend:
  How to run
  Use the following command to enter the frontend folder:
    cd frontend
  Install dependencies, with the following command in the terminal
    npm install.
  Update the backend server address or domain name in app.js
  Run the project, with 
    npm start.
  It will be hosted on http://localhost:3000.

  La seed de datos se encuentra en la carpeta models y debe ser cargada desde postman o swagger mediante una peticion post 
