import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from "axios";
import {useEffect, useState} from "react";
interface P {
    rankToken:string
}
export default function Orders(props:P) {

    const [orders, setOrders] = useState<RankItem[]>([]);

    useEffect(() => {
        axios.get("/api/rank/" + props.rankToken).catch((e) => {
            console.log(e)
        }).then((res: any) => {
            console.log(res.data.data.data);
            setOrders(res.data.data.data);
        });
    }, []);

    return (
        <React.Fragment>
            <div className="h-10"/>
            <Title>Your Orders</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>User Name</TableCell>
                        <TableCell>Ship To</TableCell>
                        <TableCell align="right">Sale Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((row) => (
                        <TableRow key={row.order_id}>
                            <TableCell>{row.order_created_at}</TableCell>
                            <TableCell>{row.order_name}</TableCell>
                            <TableCell>{row.first_name + " " + row.last_name}</TableCell>
                            <TableCell>{row.province_code + "," + row.country_code}</TableCell>
                            <TableCell align="right">{`${row.goods_num}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/*<Link color="primary" href="#"  sx={{ mt: 3 }}>*/}
            {/*    See more orders*/}
            {/*</Link>*/}
        </React.Fragment>
    );
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
