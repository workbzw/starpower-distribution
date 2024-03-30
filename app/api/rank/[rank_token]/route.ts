import '@shopify/shopify-api/adapters/node';
import {createClient} from "@/utils/supabase/server";

export async function GET(req: Request) {
    const supabase = createClient();
    const invitationToken = req.url.slice(req.url.lastIndexOf('/') + 1)
    const {data: ambassador} = await supabase.from('ambassador').select('*').eq("rank_token", invitationToken)
    if (ambassador) {
        const res = await supabase.from('rank').select('*').eq("invitation_code", ambassador[0].invitation_code)
        console.log(res.data);
    }
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
