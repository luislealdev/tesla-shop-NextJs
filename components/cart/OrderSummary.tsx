import { currency } from "@/utils";
import { TravelExploreSharp } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material"
import { useContext, FC } from 'react';
import { CartContext } from '../../Context/cart/CartContext';

interface Props {
    summaryValues?: {
        numberOfItems: number,
        subTotal: number,
        tax: number,
        total: number
    }
}

export const OrderSummary: FC<Props> = ({ summaryValues }) => {

    const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

    const infoToShow = summaryValues ? summaryValues : { numberOfItems, subTotal, tax, total };

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{infoToShow.numberOfItems} {infoToShow.numberOfItems > 1 ? 'productos' : 'producto'}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(infoToShow.subTotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE)})%</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(infoToShow.tax)}</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
                <Typography variant="subtitle1">{currency.format(infoToShow.total)}</Typography>
            </Grid>

        </Grid>
    )
}
