# Proyecto1-MyP Web Service

Creación de una pagina web para cosultar el clima de 3000 vuelos diarios o de la ubiación deseada haciendo uso de javascript, html y css.

## Ejecucion

Para ejecutar nuestra pagina web localmente es necesario primero instalar local-web-browser para eso ejecutaremos en la terminal

```bash
npm install -g local-web-server
```

Y para ejecutarlo nos situaremos en la carpeta src y ejecutaremos el siguiente comando

```bash
ws
```

Posteriormente buscar en el navegador cualquiera de los urls dados en la terminal.

Para buscar el clima deseado primero es necesario ingresar una key correcta y posteriormente
colocar la ciudad de donde desea saber el clima o la clave unica del aeropuerto de destino.

## Ejecución Pruebas

Para la ejecución de las pruebas se deberá correr el siguiente comando.

```bash
npm run test
```
Es importante que para las pruebas de Weather.js se cambien todas las coincidencias de "Mi key"
por una key valida, de otra forma no pasará las pruebas y soltará errores.

## Uso bibliotecas

jquery-csv: Fue usada para tranformar la base de datos dada por la ayudante en un arreglo de objetos en javascript.

## Versiones del software

npm Version: 8.19.21

node Version: 18.8.00

jquery-csv Version: 1.0.21    