import '@shopify/shopify-api/adapters/node';
import axios from "axios";
import {createClient} from "@/utils/supabase/server";

export async function POST({data}: { data: any }) {
    const supabase = createClient();
    console.log("receive data:" + JSON.stringify(data));
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
