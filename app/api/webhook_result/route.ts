import '@shopify/shopify-api/adapters/node';
import axios from "axios";
import {createClient} from "@/utils/supabase/server";

export async function GET() {
    // const supabase = createClient();
    // await axios.post("https://starpower-market.myshopify.com/admin/api/2024-01/webhooks.json", {
    //     webhook: {
    //         address: "https://starpower-distribution.vercel.app/api/webhook_order",
    //         topic: "orders/paid",
    //         format: "json"
    //     }
    // }, {
    //     headers: {
    //         "X-Shopify-Access-Token": "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",
    //         "Content-Type": "application/json",
    //     }
    // })
    return Response.json({code: 200, msg: "", data: {}});
}

