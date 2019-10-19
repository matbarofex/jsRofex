---
# Documentación jsRofex
---

## Descripción general

jsRofex es un paquete de Javascript que permite interacciones con las API Rest de ROFEX.

El paquete está diseñado para facilitar a los desarrolladores la conexión con las API de ROFEX y que su objetivo sea la programación de las operaciones a realizar.

Se recomienda leer la documentación oficial de la API para familiarizarse con las respuestas y la funcionalidad de la API.

## Instalación

`import jsRofex;`

## Credenciales API
Para utilizar el paquete se debe tener credenciales de autenticación correctas para el entorno.

Para obtener nuevas credenciales:

Remarket:  alta en [Remarket](https://remarkets.primary.ventures/index.html)

Production: contacte al equipo de MPI (Market and Platform Integration, correo: <mpi@primary.com.ar>)

## Características

Esta sección describe la funcionalidad y los componentes del paquete para realizar solicitudes a la API REST y devolver la respuesta correspondiente.

Nota: Antes de comenzar a usar el paquete se debe inicial izar el entorno con el que desea conectarse.

## Métodos disponibles

Todos los métodos retornan un diccionario de la respuesta `JSON`.

- login: autentica al usuario en la API de Primary.
- get_accounts:  obtiene las cuentas asociadas a un usuario.
- get_instruments:  obtiene una lista de los Segmentos disponibles o una lista con todos los instrumentos disponibles para negociarse en ROFEX.
- get_market_data: obtiene los datos del mercado en tiempo real.
- send_order: envía una nueva orden al mercado.
- cancel_order: cancela una orden.
- get_order_status: obtiene el estado de una orden especifica.
- get_all_orders_status:  obtiene el estado de las ordenes para una cuenta especifica.

## Modo de uso

La inicialización se debe realizar en dos pasos. En el primer paso setea el ambiente y en el segundo paso se autentifica con servidor de Rofex por medio usuario y contraseña. 

Si la autenticación falla, la propiedad status del callback será “null”.

`var fes = new jsRofex("reMarkets");

fes.login(user="fes2019", password="xxyyzz", function(callback) {
    if (callback.status == "OK") {
        console.log("Connected Successfully");
    } else {
        console.log("Error in login process");
        console.log(callback);
    }
});




`
