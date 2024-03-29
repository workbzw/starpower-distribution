import '@shopify/shopify-api/adapters/node';
import axios from "axios";
import {createClient} from "@/utils/supabase/server";

export async function GET() {
    const supabase = createClient();
    const r = await axios.post("https://starpower-market.myshopify.com/admin/api/2024-01/webhooks.json", {
        webhook: {
            address: "https://starpower-distribution.vercel.app/api/webhook_order",
            topic: "orders/paid",
            format: "json"
        }
    }, {
        headers: {
            "X-Shopify-Access-Token": "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",
            "Content-Type": "application/json",
        }
    })
    console.log("================================");
    console.log(JSON.stringify(r.data));
    console.log("================================");
    const rr = await axios.get("https://starpower-market.myshopify.com/admin/api/2024-01/webhooks.json", {
        headers: {
            "X-Shopify-Access-Token": "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",
        }
    });
    console.log(JSON.stringify(rr.data));
    console.log("================================");
    return Response.json({code: 200, msg: "", data: {}});
}

