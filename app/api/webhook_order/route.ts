import '@shopify/shopify-api/adapters/node';
import axios from "axios";
import {createClient} from "@/utils/supabase/server";

export async function POST(req: Request) {
    const supabase = createClient();
    const res = await req.json();
    console.log("receive req.body:" + JSON.stringify(req.body));
    await supabase.from("rank").insert({order_id: JSON.parse(res).id, order_name: JSON.parse(res).name});
    return Response.json({code: 200, msg: "", data: {}});
}

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
