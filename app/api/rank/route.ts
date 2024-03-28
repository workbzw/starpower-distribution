import '@shopify/shopify-api/adapters/node';
import {ApiVersion, shopifyApi} from '@shopify/shopify-api';
import axios from "axios";

export async function GET() {
    //   const shopify = shopifyApi({
    //       apiVersion: ApiVersion.Unstable, isEmbeddedApp: false,
    //       // The next 4 values are typically read from environment variables for added security
    //       apiKey: 'APIKeyFromPartnersDashboard',
    //       apiSecretKey: 'APISecretFromPartnersDashboard',
    //       scopes: ['read_products'],
    //       hostName: 'ngrok-tunnel-address'
    //   });
    //   const client = new shopify.clients.Graphql({session});
    //   const data = await client.query({
    //       data: `query {
    //   orders(first: 10) {
    //     edges {
    //       node {
    //         id
    //       }
    //     }
    //   }
    // }`,
    //   });
    await req(2);

    return Response.json({code: 200, msg: "", data: {}});
}

async function req(limit: number, sinceId?: number) {
    const instance = axios.create({
        baseURL: 'https://starpower-market.myshopify.com',
        headers: {
            'X-Shopify-Access-Token': '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',
        }
    });
    const res = await instance.get("/admin/api/2024-01/orders.json?financial_status=paid&limit="+limit+"&since_id="+sinceId);
    for (let i = 0; i < res.data.orders.length; i++) {
        console.log(res.data.orders[i].billing_address.address2 + ":" + res.data.orders[i].financial_status);
        // console.log(res.data.orders[i]);
        // console.log(res.headers.toString());
        console.log('-------------------------------');
    }
}
