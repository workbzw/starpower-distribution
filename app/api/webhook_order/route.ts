import '@shopify/shopify-api/adapters/node';
import axios from "axios";
import {createClient} from "@/utils/supabase/server";

export async function POST(req: Request) {
    try {
        const supabase = createClient();
        const res = await req.json();
        console.log("receive req.body:" + res);
        await supabase.from("rank").insert({order_id: res.id, order_name: res.name});
    } catch (e) {
        return Response.json({code: 200, msg: "error", data: {error: e}});
    }
    return Response.json({code: 200, msg: "success", data: {}});
}

// https://starpower-distribution.vercel.app/api/webhook_order

// curl -d '{"webhook":{"address":"https://starpower-distribution.vercel.app/api/webhook_order","topic":"orders/paid","format":"json"}}' \
// -X POST "https://starpower-market.myshopify.com/admin/api/2024-01/webhooks.json" \
// -H "X-Shopify-Access-Token: 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" \
// -H "Content-Type: application/json"

// curl -X GET "https://starpower-market.myshopify.com/admin/api/2024-01/webhooks.json" \
// -H "X-Shopify-Access-Token: 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"
interface RankItem {
    order_id: number;
    order_created_at: string;
    invitation_code: string;
    country_code: string;
    province_code: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    goods_num: number;
    order_status_url: string;
    order_name: string;
}
