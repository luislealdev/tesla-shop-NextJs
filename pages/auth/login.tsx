import NextLink from 'next/link';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form';

type Inputs = {
    email: string,
    password: string,
};

const onSubmit = (data: Inputs) => {
    console.log({ data });
}

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Correo" variant="filled" fullWidth type='email' {...register('email')} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Contraseña" type='password' variant="filled" fullWidth {...register('password')} />
                        </Grid>

                        <Grid item xs={12}>
                            <Button color="secondary" className='circular-btn' size='large' fullWidth type='submit'>
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href="/auth/register" passHref style={{ textDecoration: 'underline' }}>
                                ¿No tienes cuenta?
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage