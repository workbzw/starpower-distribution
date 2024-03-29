import '@shopify/shopify-api/adapters/node';
import axios from "axios";
import {createClient} from "@/utils/supabase/server";

export async function POST(req: Request) {
    try {
        const supabase = createClient();
        const order = await req.json();
        console.log("receive order.body:" + order.toString());
        await supabase.from("rank").insert({
            order_id: order.id,
            order_name: order.name,
            order_created_at: order.customer.created_at ?? "",
            invitation_code: order.billing_address.address2 ?? "",
            country_code: order.billing_address.country_code ?? "",
            province_code: order.billing_address.province_code ?? "",
            email: order.customer.email ?? "",
            first_name: order.customer.first_name ?? "",
            last_name: order.customer.last_name ?? "",
            phone: order.customer.phone ?? "",
            goods_num: order.line_items[0].goods_num ?? 0,
            order_status_url: order.order_status_url ?? ""
        });
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
