import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { countries } from '../../utils';
import { useForm } from 'react-hook-form';
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CartContext } from '../../Context/cart/CartContext';

type Inputs = {
    name: string,
    lastName: string,
    address: string,
    address2: string,
    cp: string,
    city: string
    phone: string,
    country: string
};

const getAddressFromCookies = (): Inputs => {
    return {
        name: Cookies.get('name') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        cp: Cookies.get('cp') || '',
        city: Cookies.get('city') || '',
        phone: Cookies.get('phone') || '',
        country: Cookies.get('country') || ''
    }
}

const AddressPage = () => {
    const router = useRouter();
    const { updateAddress } = useContext(CartContext);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        defaultValues: getAddressFromCookies()
    });

    const onSubmit = (data: Inputs) => {
        updateAddress(data);
        router.push('/checkout/summary');
    }

    return (
        <ShopLayout title="Dirección" pageDescription="Confirmar dirección del destino">
            <Typography variant="h1" component='h1'>Dirección</Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Nombre'
                            variant="filled"
                            fullWidth
                            {...register('name', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            autoComplete='false'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Apellido'
                            variant="filled"
                            fullWidth
                            {...register('lastName', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            autoComplete='false'
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Dirección'
                            variant="filled"
                            fullWidth
                            {...register('address', {
                                required: 'Este campo es requerido',
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                            autoComplete='false'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Dirección 2 (opcional)'
                            variant="filled"
                            fullWidth
                            {...register('address2')}
                            error={!!errors.address2}
                            helperText={errors.address2?.message}
                            autoComplete='false'
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Código Postal'
                            variant="filled"
                            fullWidth
                            {...register('cp', {
                                required: 'Este campo es requerido',
                            })}
                            error={!!errors.cp}
                            helperText={errors.cp?.message}
                            autoComplete='false'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Ciudad'
                            variant="filled"
                            fullWidth
                            {...register('city', {
                                required: 'Este campo es requerido',
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                            autoComplete='false'
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                variant="filled"
                                label="País"
                                defaultValue={Cookies.get('country') || countries[0].code}
                                {...register('country', {
                                    required: 'Este campo es requerido',
                                })}
                            >
                                {
                                    countries.map(country => (
                                        <MenuItem value={country.code} key={country.code}>{country.name}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Teléfono'
                            variant="filled"
                            fullWidth
                            {...register('phone', {
                                required: 'Este campo es requerido',
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                            autoComplete='false' />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button color="secondary" className="circular-btn" size="large" type='submit'>
                        Revisar pedido
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    )
}

export default AddressPage;
