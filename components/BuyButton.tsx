'use client';
import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Typography
} from "@mui/material";
import {Transition} from "@react-spring/core";
import {gray} from "next/dist/lib/picocolors";
import {CopyAll, CopyAllSharp, Copyright, Image} from "@mui/icons-material";
import {State} from "@popperjs/core";
import Box from "@mui/material/Box";

export default function BuyButton({invitationCode}: { invitationCode: string }) {
    const [open, setOpen] = React.useState(false);
    const [hasCopy, setHasCopy] = React.useState(false);
    const [showTip, setShowTip] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleCopy = () => {
        setHasCopy(true);
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(invitationCode).then(r => {
                console.log("copy success");
                setShowTip(true);
            }).catch((reason) => {
                console.log(reason.toString())
            });
        }
    };

    const handleClose = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(invitationCode).then(r => console.log("copy success")).catch((reason) => {
                console.log(reason.toString())
            })
        }
        setOpen(false);
        setShowTip(false);
    };
    const gotoStarpower = () => {
        if (!hasCopy) {
            alert("Please make sure you have copied the referral code");
            return;
        }
        setOpen(false);
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(invitationCode).then(r => console.log("copy success")).catch((reason) => {
                console.log(reason.toString())
            })
            window.open('https://www.starpower.world/preorder?pre=1711372176574') //这里是打开新窗口
        }
    };
    // {/*{`Copy Referral Code:${invitationCode} And Buy Now ➔`}*/}
    return (
        <>
            <Button variant="outlined" color={"warning"} onClick={handleClickOpen}>
                {`Buy Now`}
            </Button>

            <Dialog
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"⚠️ Buying tips"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Please copy the referral code and fill in the referral code in the order form.
                    </DialogContentText>
                    <Box className="flex items-center">
                        <div color={"green"}>Referral Code:</div>
                        <DialogContentText sx={{marginLeft: 1}} color={"purple"}
                                           id="alert-dialog-slide-description-code">
                            {invitationCode}
                        </DialogContentText>
                        <Button sx={{marginLeft: 1}} variant="outlined" onClick={handleCopy} color={"success"}>
                            <CopyAll color={"success"}/>Copy
                        </Button>

                    </Box>
                    <Box sx={{display: showTip ? 'block' : 'none'}}>
                        <Typography color={'error'}>
                            Copy referral code success! Please fill the referral code into the input box in order form.
                        </Typography>
                        <img src={'https://pic.superbed.cc/item/660a52c3f989f2fb97838e9e.png'}/>
                    </Box>
                </DialogContent>
                <DialogActions>
                    {/*<Button onClick={handleClose} color={"inherit"}>close</Button>*/}
                    <Button onClick={gotoStarpower}>GOTO ORDER PAGE ➔</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}
