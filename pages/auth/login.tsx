import NextLink from 'next/link';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form';
import { validations } from '@/utils';

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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Correo"
                                variant="filled"
                                fullWidth
                                type='email'
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />

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