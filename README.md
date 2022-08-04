![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Individual Project - Henry Food

<p align="right">
  <img height="200" src="./cooking.png" />
</p>

## Objetivos logrados en el Proyecto

- Construcción de una App utlizando React, Redux, Node y Sequelize.
- Conección de los conceptos aprendidos en la carrera.
- Aprendizaje de mejores prácticas.
- Práctica del workflow de GIT.

Siéntanse libres de seguir estos pasos para probar en sus equipos el trabajo que realicé:
 1. Forkear el repositorio para tener una copia del mismo en sus cuentas
 2. Clonar el repositorio en sus computadoras para ejecutarlo y probarlo

Tecnologías usadas:

- __react__: 17.0.1
- __react-dom__: 17.0.1
- __react-router-dom__: 5.2.0
- __redux__: 4.0.5
- __react-redux__: 7.2.3

Estando en Visual Studio con el proyecto abierto, será suficiente con colocar los comandos npm install, tanto en la carpeta client, como en la carpeta api. Luego aguardar a que se instalen las tecnologías necesarias, y a continuación ejecutar npm start en las dos carpetas mencionadas. El puerto por defecto para correr el frontend es el 3000, ingresando desde el browser a http://localhost:3000. El puerto por defecto para correr el backend es el 3001, se puede ingresar desde el browser a http://localhost:3001. Los endpoints disponibles para visualizar el funcionamiento del backend son `3001/recipes`; `3001/recipes/${id}`, ingresando cualquier id entre 1 y 100; y `3001/diets`.

Variables de entorno del backend.
Copiar y pegar en un archivo .env creado en la carpeta api las siguientes variables:
```env
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
apiKey=7587feff06f344559b1c88608c337687
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. 

Adicionalmente será necesario que creen desde psql una base de datos llamada `spoondiets`

En la aplicación se pueden ver distintas recetas de comida junto con información relevante de las mismas utilizando la api externa [spoonacular](https://spoonacular.com/food-api) y a partir de ella se puede, entre otras cosas:

- Buscar recetas
- Filtrarlas / Ordenarlos
- Crear nuevas recetas propias
- 
### A continuación, algunas imágenes de los endpoints del proyecto

#### `/recipes`
![home](https://user-images.githubusercontent.com/94709834/182886066-4bcbed0f-33a7-446e-93e0-31731405c32a.png)

#### `/recipes/${id}` //cualquier número entre 1 y 100
![detail1](https://user-images.githubusercontent.com/94709834/182885899-1147af0c-08a0-46f1-a4fc-9604ab9e9eba.png)

#### `/create`
![pi imagen para job prep](https://user-images.githubusercontent.com/94709834/182885669-ee9c351c-c613-4817-b33f-90261d136510.png)


