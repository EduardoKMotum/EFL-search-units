const fetch = require("node-fetch");

exports.handler = async (event) => {
    const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
    const orden_de_compra = event.queryStringParameters.orden_de_compra;

    if (!orden_de_compra) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Falta el número de Orden de Compra" }),
        };
    }

    const url = `https://api.hubapi.com/crm/v3/objects/unidades?properties=vin,serial,customer,st,orden_de_compra&limit=100&archived=false`;

    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer pat-na1-c6075ea8-0046-4e59-a086-f3cb13525fc0`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        const units = data.results.filter(unit => unit.properties.orden_de_compra === orden_de_compra);

        return {
            statusCode: 200,
            body: JSON.stringify(units),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error al obtener datos de HubSpot" })
        };
    }
};
