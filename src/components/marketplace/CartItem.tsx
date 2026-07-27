"use client";

import DeleteIcon from "@mui/icons-material/Delete";

import {

Box,

Button,

IconButton,

Paper,

Stack,

Typography

} from "@mui/material";

export default function CartItem(){

return(

<Paper

sx={{

p:3,

mb:3,

borderRadius:4

}}

>

<Stack

sx={{direction:"row",

spacing:3,

alignItems:"center"}}

>

<Box

component="img"

src="/images/seed.png"

sx={{

width:120

}}

/>

<Box sx={{flex:1}}>

<Typography

variant="h6"

sx={{fontWeight:700}}

>

Hybrid Seeds

</Typography>

<Typography>

$320

</Typography>

</Box>

<Stack

direction="row"

spacing={1}

>

<Button>-</Button>

<Button>

1

</Button>

<Button>+</Button>

</Stack>

<IconButton>

<DeleteIcon/>

</IconButton>

</Stack>

</Paper>

);

}