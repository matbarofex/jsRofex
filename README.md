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

```
var fes = new jsRofex("reMarkets");

fes.login(user="fes2019", password="xxyyzz", function(callback) {
    if (callback.status == "OK") {
        console.log("Connected Successfully");
    } else {
        console.log("Error in login process");
        console.log(callback);
    }
});
```
1. Obtiene las cuentas asociadas a mi usuario
```
fes.get_accounts(function(data_get) {
    if (JSON.parse(data_get).status == "OK") {
        console.log(data_get);
    } else {
        console.log("Error:");
        console.log(data_get);
    }});
    
{"status":"OK","accounts":[{"id":4500,"name":"FAB2019","brokerId":1,"status":true}]}
```

2. Obtiene los segmentos disponibles
```
fes.get_instruments(type_request="segments", sec_detailed = false, function(data_get) {
    if (JSON.parse(data_get).status == "OK") {
        console.log(data_get);
    } else {
        console.log("Error:");
        console.log(data_get);
    }});
    
{“status":"OK","segments":[{"marketSegmentId":"DDA","marketId":"ROFX"},{"marketSegmentId":"DDF","marketId":"ROFX"},{"marketSegmentId":"DUAL","marketId":"ROFX"},{"marketSegmentId":"TEST","marketId":"ROFX"},{"marketSegmentId":"MAE","marketId":"ROFX"},{"marketSegmentId":"MERV","marketId":"ROFX"},{"marketSegmentId":"MVR","marketId":"ROFX"},{"marketSegmentId":"MVC","marketId":"ROFX"},{"marketSegmentId":"MATBA","marketId":"ROFX"},{"marketSegmentId":"PTPExt","marketId":"ROFX"},{"marketSegmentId":"RFXI","marketId":"ROFX"},{"marketSegmentId":"UFEX","marketId":"ROFX"}]}
```
3. Obtiene la lista de instrumentos disponibles
```
fes.get_instruments(type_request = "securities", sec_detailed = false, function(data_get) {
    if (JSON.parse(data_get).status == "OK") {
        console.log(data_get);
    } else {
        console.log("Error:");
        console.log(data_get);
    }
});
    
{"status":"OK","instruments":[{"instrumentId":{"marketId":"ROFX","symbol":"SOJ.ROSMay20M"},"cficode":"FXXXSX"},{"instrumentId":{"marketId":"ROFX","symbol":"SOJ.ROSMay20 290c"},"cficode":"OCAFXS"},{"instrumentId":{"marketId":"ROFX","symbol":"TRI.ROS 12/01 19"},"cficode":"FXXXXX"},{"instrumentId":{"marketId":"ROFX","symbol":"MAI.ROSDic19 170c"},"cficode":"OCAFXS"},{"instrumentId":{"marketId":"ROFX","symbol":"SOJ.ROSEne20 205p"},"cficode":"OPAFXS"},{"instrumentId":{"marketId":"ROFX","symbol":"TRI.MINJul20"}, "cficode":"FXXXSX"},…]}
```
4. Obtiene la lista detallada de los instrumentos disponibles
```
fes.get_instruments(type_request = "securities", sec_detailed = true, function(data_get) {
    if (JSON.parse(data_get).status == "OK") {
        console.log(data_get);
    } else {
        console.log("Error:");
        console.log(data_get);
    }
});
    
{"status":"OK", … , "instrumentId":{"marketId":"ROFX","symbol":"MERV - XMEV - A2E2 – 24hs"}},{"symbol":null,"segment":  {"marketSegmentId":"DDA","marketId":"ROFX"}, "lowLimitPrice":0.0, "highLimitPrice":1000000.0,"minPriceIncrement":0.100000, "minTradeVol":1.000000,"maxTradeVol":10.000000,"tickSize":1.000000,"contractMultiplier":100.000000,"roundLot":1.000000,"priceConvertionFactor":1.000000,"maturityDate":"20200323","currency":"USD","orderTypes":null,"timesInForce":null,"securityType":null,"settlType":null,"instrumentPricePrecision":1,"instrumentSizePrecision":0,"cficode":"FXXXSX","instrumentId":{"marketId":"ROFX", "symbol":"SOJ.ROSMar20"}}]}
```

