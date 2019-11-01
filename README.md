---
# Documentación jsRofex
---

## Descripción general

jsRofex es un paquete de Javascript que permite interacciones con las API Rest de ROFEX.

El paquete está diseñado para facilitar a los desarrolladores la conexión con las API de ROFEX y que su objetivo sea la programación de las operaciones a realizar.

Se recomienda leer la documentación oficial de la API para familiarizarse con las respuestas y la funcionalidad de la API.

## Instalación

`const jsRofex = require("./jsRofex.js");`

## Credenciales API

Para utilizar el paquete se debe tener credenciales de autenticación correctas para el entorno.

Para obtener nuevas credenciales:

Remarket: alta en [Remarket](https://remarkets.primary.ventures/index.html)

Production: contacte al equipo de MPI (Market and Platform Integration, correo: <mpi@primary.com.ar>)

## Características

Esta sección describe la funcionalidad y los componentes del paquete para realizar solicitudes a la API REST y devolver la respuesta correspondiente.

Nota: Antes de comenzar a usar el paquete se debe inicializar el entorno con el que desea conectarse.

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

Si la autenticación falla, la propiedad status del callback será “ERROR”.

```
const jsRofex = require("./jsRofex.js");

var fes = new jsRofex("reMarkets");

fes.login(user="fes2019", password="xxyyzz", function(rta) {
    if (rta.status == "OK") {
        console.log("Connected Successfully");
    } else {
        console.log("Error in login process");
        console.log(rta);
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

5. Obtiene los datos del mercado en tiempo real
```
fes.get_market_data(market_id = "ROFX", symbol = "RFX20Dic19", entries = ["BI", "OF", "LA"], depth = 1, function(data_get) {
    if (JSON.parse(data_get).status == "OK") {
        console.log(data_get);
    } else {
        console.log("Error:");
        console.log(data_get);
    }
});
    
{"status":"OK","marketData":{"LA":{"price":45465,"size":1,"date":1571491925262},"OF":[{"price":45730,"size":1}],"BI":[{"price":45465,"size":4}]},"depth":1,"aggregated":true}
```

6. Obtiene las operaciones históricas para un instrumento dado
```
fes.get_trade_history(market_id = "ROFX", symbol = "RFX20Dic19", date_query = "2018-10-04", date_from = "", date_to = "", function(data_get) {
    if (JSON.parse(data_get).status == "OK") {
        console.log(data_get);
    } else {
        console.log("Error:");
        console.log(data_get);
    }
});
    
{"status":"OK","symbol":"RFX20Dic19","market":"ROFX","trades":[]}
```

7. Enviar una nueva orden al mercado
```
fes.new_order(symbol = "RFX20Dic19", side = "Buy", quantity = 1, price = 47000.0, order_type = "Limit", time_in_force = "Day", iceberg = false, expire_date = null, display_quantity = null, account = "FAB2019", cancelPrev = false, function(data_get) {
        if (JSON.parse(data_get).status == "OK") {
            console.log(data_get);
        } else {
            console.log("Error:");
            console.log(data_get);
        }
    });
    
{"status":"OK","order":{"clientId":"310059219481980","proprietary":"PBCP"}}
```

8. Obtiene el estado de una orden especifica
```
fes.get_order_status(lookup_type = "COID", order_id = "310059219481980", proprietary = "PBCP", function(data_get) {
    if (JSON.parse(data_get).status == "OK") {
        console.log(data_get);
    } else {
        console.log("Error:");
        console.log(data_get);
    }
});
    
{"status":"OK","order":{"orderId":"138874950","clOrdId":"310059219481980","proprietary":"PBCP","execId":"T4890257","accountId":{"id":"FAB2019"}, "instrumentId":{"marketId":"ROFX","symbol":"RFX20Dic19"},"price":47000,"orderQty":1,"ordType":"LIMIT", "side":"BUY", "timeInForce":"DAY","transactTime":"20191019-12:33:39.289-0300","avgPx":45730.000, "lastPx":45730, "lastQty":1,"cumQty":1,"leavesQty":0,"status":"NEW","text":"Aceptada"}}
```

9. Obtiene el estado de las ordenes para una cuenta especifica
```
fes.get_all_orders_status(accountId = "FAB2019", function(data_get) {
    if (JSON.parse(data_get).status == "OK") {
        console.log(data_get);
    } else {
        console.log("Error:");
        console.log(data_get);
    }
});
    
{"status":"OK","orders":[{"orderId":"138874950","clOrdId":"310059219481980","proprietary":"PBCP","execId":"T4890257","accountId":{"id":"FAB2019"}, "instrumentId":{"marketId":"ROFX","symbol":"RFX20Dic19"}, "price":47000,"orderQty":1,"ordType":"LIMIT", "side":"BUY","timeInForce":"DAY","transactTime":"20191019-12:33:39.289-0300","avgPx":0,"lastPx":0,"lastQty":0,"cumQty":0, "leavesQty":1,"status":"NEW","text":"Aceptada"}]}
```

10. Cancelar una orden especifica
```
fes.cancel_order(order_id = "310059219481980", proprietary = "PBCP", function(data_get) {
    if (JSON.parse(data_get).status == "OK") {
        console.log(data_get);
    } else {
        console.log("Error:");
        console.log(data_get);
    }
});

{"status":"OK","order":{"clientId":"310060290499141","proprietary":"PBCP"}}
```

11. Conectarse por Web Socket
```
var socketRofex;
var request = require('request');
var WebSocket = require('ws');
var base_url = "http://api.remarkets.primary.com.ar/";

function rofex_iniciarWS(pUsuario, pClave, pCallback) {
    try {

        request.post(
            base_url + "j_spring_security_check?j_username=" + pUsuario + "&j_password=" + pClave, { form: { key: 'value' } },
            function(error, response, body) {
                if (!error && response.statusCode == 200) {} else {
                    if (!response || typeof(response) == "undefined") {
                        pCallback("error");
                    } else {
                        if (typeof(response.headers) == "undefined" || typeof(response.headers['set-cookie']) == "undefined" || !response.headers['set-cookie']) {
                            pCallback("error");
                        } else {
                            var token = response.headers['set-cookie'].toString().split(";")[0];
                            pCallback(token);
                        }}}});
    } catch (error) {
        pCallback("error");
    }
}

function suscribir(datos){
    if (socketRofex && socketRofex.readyState == 1) {
        socketRofex.send(JSON.stringify(datos));
        console.log("Conectado con socketRofex", JSON.stringify(datos), socketRofex.readyState);}
   }

var simbolosProd = [{ symbol: "RFX20Dic19", marketId: "ROFX" },{ symbol: "DODic19", marketId: "ROFX" }];

var pedido = {"type": "smd", "level": 1, "entries": ["BI", "OF", "LA", "IV","NV","OI"],
    "products": simbolosProd, "depth": 10 };

rofex_iniciarWS(user="fes2019", password="xxyyzz", function(pTk) {
    if (pTk != "error") {
        socketRofex = new WebSocket("ws://api.remarkets.primary.com.ar/", null, { headers: { Cookie:   pTk } });
        socketRofex.on('open', function open() {
            suscribir(pedido);});
        socketRofex.on('error', function(e) {
            console.log("error de scoket", e);
        });
        socketRofex.on('message', function(data, flags) {
            try {
                var p = JSON.parse(data);
                console.log("socketRofex on message", p);
            } catch (error) {
                console.log(error);}
        });
    } else {
        console.log("Error in login process");
        console.log(pLogin);
    }});


socketRofex on message { type: 'Md',
  timestamp: 1572635234484,
  instrumentId: { marketId: 'ROFX', symbol: 'RFX20Dic19' },
  marketData: 
   { LA: { price: 49210, size: 3, date: 1572635216341 },
     OF: [ [Object], [Object], [Object], [Object], [Object] ],
     IV: null,
     OI: { size: 95, date: 1569456000000 },
     BI: [ [Object], [Object], [Object], [Object], [Object] ],
     NV: 1886 }}
```

## Agradecimientos

El desarrollo de este software fue impulsado por [Primary](https://www.primary.com.ar/) como parte de una iniciativa de Código Abierto de [Grupo Rofex](https://www.rofex.com.ar/).

