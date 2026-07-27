"use client";

import {

Button,

Paper,

Stack,

Typography

} from "@mui/material";

export default function OrderSummary(){

return(

<Paper

sx={{

p:4,

borderRadius:4

}}

>

<Typography

variant="h5"

sx={{fontWeight:700,

mb:3}}

>

Order Summary

</Typography>

<Stack
spacing={2}
>

<Typography>

Subtotal: $620

</Typography>

<Typography>

Shipping: $20

</Typography>

<Typography>

Tax: $10

</Typography>

<Typography

variant="h6"

sx={{fontWeight:700}}

>

Total: $650

</Typography>

<Button

variant="contained"

fullWidth

href="/checkout"

>

Proceed To Checkout

</Button>

</Stack>

</Paper>

);

}