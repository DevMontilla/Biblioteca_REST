### Biblioteca REST - NodeJS

Este proyecto fue creado como resolución de un challenge para una entrevista laboral para *we do web*.

Se trata de una API Rest desarrollada con _NodeJs_ y _Express_

Para almacenar los registros se utilizó una base de datos NoSQL como _MongoDB_ y _mongoose_ para hacer la conexión.

El desarrollo permite: 

* Registrar usuarios:
* Loguearse
* Listar los libros disponibles
* Reservar libros 

Pueden leer la documentación completa de la API para cada uno de sus endpoints [acá](https://documenter.getpostman.com/view/15415863/2s8ZDU6QVe)

### Instrucciones para levantar el proyecto

1. Clonar el repositorio _git clone https://documenter.getpostman.com/view/15415863/2s8ZDU6QVe_
2. Instalar los paquetes de node _npm i_
3. Crear un archivo .env y agregar las claves adjuntas en el mail de entrega necesarias para la conexión a la DB y la generación y lectura del token de sesión.
4. Ubicarse sobre la carpeta del repositorio y levantar el proyecto _npm run start_

### Cronjob

Para tal proposito se utilizó _node-cron_

En el challenge se solicita crear un cronjob que se ejecute una vez al día. Se configuró para que la acción se ejecute cada día a las 8 de la mañana, pero si se quiere modificar se puede hacer desde el archivo _cronjob.js_ comentando la línea 6 ( " 0 0 8 * * * " ) y descomentando la línea 7 ( " * * */1 * * * " ) para que el trabajo se ejecute cada 1seg.