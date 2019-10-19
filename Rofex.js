class jsRofex {

    constructor(pDominio) {
        this.autenticado = false;
        this.Entorno_token = "";
        this.base_url = "";
        this.accounts = "";
        if (pDominio == "reMarkets" || pDominio == "production") {
            if (pDominio == "reMarkets") {
                this.base_url = "http://api.remarkets.primary.com.ar";
            } else {
                if (pDominio == "production") {
                    this.base_url = "https://api.primary.com.ar";
                }
            }
        } else {
            console.log("Error");
        }
    }


    login(user, password, pCallback) {

        var new_url = this.base_url.concat("/auth/getToken");

        var request = require('request');
        var token_int = "";
        try {
            request.post({
                    headers: {
                        "X-Username": user,
                        "X-Password": password
                    },
                    url: new_url
                },
                function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        this.oContexto.Entorno_token = response.headers['x-auth-token'];
                        this.oContexto.autenticado = true;
                        
                        pCallback({status:"OK"});
                    } else {
                        if (!response || typeof(response) == "undefined") {
                            pCallback({status:error});
                        } else {
                            if (typeof(response.headers) == "undefined" || typeof(response.headers['set-cookie']) == "undefined" || !response.headers['set-cookie']) {
                                pCallback({status:error});
                            } else {
                                token_int = response.headers['X-Auth-Token'].toString().split(";")[0];
                                this.Entorno_token = token_int;
                                this.autenticado = true;
                                pCallback({status:"OK"});
                            }
                        }
                    }
                }.bind({
                    oContexto: this
                })
            );
        } catch (error) {
            pCallback({status:error});
        }
    }


    get_accounts(pCallback) {
        var new_url = this.base_url.concat("/rest/accounts");
        this.query_get(new_url, function(Id_accounts) {
            if (Id_accounts != "error") {
                this.accounts = Id_accounts;
                console.log(Id_accounts);
                pCallback(Id_accounts)
            } else {
                pCallback(Id_accounts)
            }
        });
    }

    query_get(new_url, Callback_get) {
        var request = require('request');

        request.get({
                headers: {
                    "X-Auth-Token": this.Entorno_token
                },
                url: new_url
            },
            function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (body.indexOf("j_spring_security_check") > 0) {
                        this.autenticado = false;
                        pCallback({status:error});
                    }
                    Callback_get( body);
                } else {
                    Callback_get("The query returned an unexpected result.");
                }
            });
    }

    get_instruments(type_request, sec_detailed = false, Callback_get) {
        var new_url = "";
        if (type_request == "segments" || type_request == "securities") {
            if (type_request == "segments") {
                new_url = this.base_url.concat("/rest/segment/all");
            } else {
                if (type_request == "securities" && sec_detailed == false) {
                    new_url = this.base_url.concat("/rest/instruments/all");
                } else {
                    new_url = this.base_url.concat("/rest/instruments/details");
                }
            }
        } else {
            Callback_get("Invalid  type of 'request' parameter.");
        }
        this.query_get(new_url, Callback_get);
    }

    get_market_data(market_id = "ROFX", symbol, entries = "", depth = 1, Callback_get) {
        var new_url = this.base_url.concat("/rest/marketdata/get?marketId=", market_id, "&symbol=", symbol, "&entries=", entries.join(), "&depth=", depth);
        this.query_get(new_url, Callback_get);
    }

    get_trade_history(market_id = "ROFX", symbol, date_query = "", date_from = "", date_to = "", Callback_get) {

        var new_url = this.base_url.concat("/rest/data/getTrades?marketId=", market_id, "&symbol=", symbol);
        if (date_query == "") {
            new_url = new_url.concat("&dateFrom=", date_from, "&dateTo=", date_to)
        } else {
            new_url = new_url.concat("&date=", date_query);
        }
        this.query_get(new_url, Callback_get);
    }

    get_order_status(lookup_type = "", order_id = "", proprietary = "", Callback_get) {

        var new_url = this.base_url.concat("/rest/order/id?clOrdId=", order_id, "&proprietary=", proprietary);
        this.query_get(new_url, Callback_get);
    }

    get_all_orders_status(accountId = "", Callback_get) {

        var new_url = this.base_url.concat("/rest/order/actives?accountId=", accountId);
        this.query_get(new_url, Callback_get);
    }


    new_order(symbol = "", side = "", quantity = 0, price = 0.0, order_type = "Limit", time_in_force = "Day", iceberg = false, expire_date = null,
        display_quantity = null, account = "", cancelPrev = false, Callback_get) {

        var market_id = "ROFX";

        var new_url = this.base_url.concat("/rest/order/newSingleOrder?marketId=", market_id, "&symbol=", symbol,
            "&side=", side, "&orderQty=", quantity, "&price=", price, "&ordType=", order_type, "&timeInForce=", time_in_force,
            "&expireDate=", expire_date, "&account=", account);
        if (iceberg == true) new_url = new_url.concat("&iceberg=true&displayQty=", displayQty);
        if (cancelPrev == true) new_url = new_url.concat("&cancelPrevious=true");

        this.query_get(new_url, Callback_get);
    }

    cancel_order(order_id = "", proprietary = "", Callback_get) {
        var new_url = this.base_url.concat("/rest/order/cancelById?clOrdId=", order_id, "&proprietary=", proprietary);
        this.query_get(new_url, Callback_get);
    }
}
