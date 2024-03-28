import '@shopify/shopify-api/adapters/node';
import axios from "axios";
import {createClient} from "@/utils/supabase/server";

export async function GET() {
    const supabase = createClient();

    // await supabase.from("rank").insert({
    //     order_id: 1,
    //     order_created_at: "",
    //     invitation_code: "",
    //     country_code: "",
    //     province_code: "",
    //     email: "",
    //     first_name: "",
    //     last_name: "",
    //     phone: "",
    //     goods_num: 0,
    //     order_name: "",
    //     order_status_url: ""
    // });
    const pageSize = 10;
    const instance = axios.create({
        baseURL: 'https://starpower-market.myshopify.com',
        headers: {
            'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN!.toString(),
        }
    });
    let sinceId = null;
    let sinceIdStr = "";
    const r = await instance.get("/admin/api/2024-01/orders/count.json?financial_status=paid");
    console.log("count:" + r.data.count);
    console.log("count/pageSize:" + Math.ceil(r.data.count / pageSize));
    for (let i = 0; i < Math.ceil(r.data.count / pageSize); i++) {
        console.log("第 " + i + " 次执行");
        if (sinceId) {
            sinceIdStr = "&since_id=" + sinceId;
        }
        console.log("sinceId:" + sinceId);
        const rankArray: RankItem[] = [];
        let res = await instance.get("/admin/api/2024-01/orders.json?financial_status=paid&limit=" + pageSize + sinceIdStr);
        for (let i = 0; i < res.data.orders.length; i++) {
            try {
                let order = res.data.orders[i];
                console.log("order.id:" + order.id);
                // if (i === 0) {
                sinceId = order.id;
                // }
                console.log(res.data.orders[i].billing_address.address2 + ":" + res.data.orders[i].financial_status);
                console.log(res.data.orders[i].id);
                console.log('-------------------------------');
                let code = order.billing_address.address2;
                // rankArray.push({
                //     order_id: order.id,
                //     order_created_at: order.customer.created_at ?? "",
                //     invitation_code: code ?? "",
                //     country_code: order.billing_address.country_code ?? "",
                //     province_code: order.billing_address.province_code ?? "",
                //     email: order.customer.email ?? "",
                //     first_name: order.customer.first_name ?? "",
                //     last_name: order.customer.last_name ?? "",
                //     phone: order.customer.phone ?? "",
                //     goods_num: order.line_items.goods_num ?? 0,
                //     order_name: order.name ?? "",
                //     order_status_url: order.order_status_url ?? "",
                // });
            } catch (e) {
                console.log(e);
            }
        }
    }
    return Response.json({code: 200, msg: "", data: {}});
}

async function req(pageSize: number, sinceId?: number): Promise<RankItem[]> {
    console.log("current time:" + pageSize);
    const instance = axios.create({
        baseURL: 'https://starpower-market.myshopify.com',
        headers: {
            'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN!.toString(),
        }
    });
    let sinceIdStr = "";
    if (sinceId) {
        sinceIdStr = "&since_id=" + sinceId;
    }
    // sinceIdStr = "&since_id=5865631220031";
    let currentPageIndex = 1;
    const rankArray: RankItem[] = [];
    await instance.get("/admin/api/2024-01/orders.json?financial_status=any&limit=" + pageSize + sinceIdStr).then((res) => {
        for (let i = 0; i < res.data.orders.length; i++) {
            try {
                console.log(res.data.orders[i].billing_address.address2 + ":" + res.data.orders[i].financial_status);
                console.log(res.data.orders[i].id);
                console.log('-------------------------------');
                let order = res.data.orders[i];
                let code = order.billing_address.address2;
                rankArray.push({
                    order_id: order.id,
                    order_created_at: order.customer.created_at ?? "",
                    invitation_code: code ?? "",
                    country_code: order.billing_address.country_code ?? "",
                    province_code: order.billing_address.province_code ?? "",
                    email: order.customer.email ?? "",
                    first_name: order.customer.first_name ?? "",
                    last_name: order.customer.last_name ?? "",
                    phone: order.customer.phone ?? "",
                    goods_num: order.line_items.goods_num ?? 0,
                    order_name: order.name ?? "",
                    order_status_url: order.order_status_url ?? "",
                });
            } catch (e) {
                console.log(e);
            }
        }
    }).catch((err) => {
        console.log("shopify error:" + err)
    })
    return rankArray;
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
