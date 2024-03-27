import '@shopify/shopify-api/adapters/node';
import {ApiVersion, shopifyApi} from '@shopify/shopify-api';

export async function GET() {
    const shopify = shopifyApi({
        apiVersion: ApiVersion.Unstable, isEmbeddedApp: false,
        // The next 4 values are typically read from environment variables for added security
        apiKey: 'APIKeyFromPartnersDashboard',
        apiSecretKey: 'APISecretFromPartnersDashboard',
        scopes: ['read_products'],
        hostName: 'ngrok-tunnel-address'
    });
    return Response.json({code: 200, msg: "", data: {}});
}
