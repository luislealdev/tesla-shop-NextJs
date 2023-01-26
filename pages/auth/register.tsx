import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography, Chip } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import tesloApi from '../../api/tesloApi';
import { ErrorOutlineRounded } from '@mui/icons-material';
import { validations } from '@/utils';

type Inputs = {
    name: string,
    email: string,
    password: string,
};

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [showErrorChip, setShowErrorChip] = useState(false);

    const onSubmit = async ({ name, email, password }: Inputs) => {
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            console.log({ token, user });

        } catch (error) {
            setShowErrorChip(true)
            console.log('No se ha podido crear una cuenta con este correo');
            setTimeout(() => setShowErrorChip(false), 3000);
        }
    }


    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Crear cuenta</Typography>
                        </Grid>

                        {showErrorChip && <Grid item xs={12} display='flex' justifyContent='center'>
                            <Chip color='error' label='El correo ya está en uso' icon={<ErrorOutlineRounded />} className='fadeIn' />
                        </Grid>
                        }

                        <Grid item xs={12}>
                            <TextField
                                label="Nombre"
                                variant="filled"
                                fullWidth
                                type='text'
                                {...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message} />
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
                                helperText={errors.email?.message} />
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
                            <Button color="secondary" className='circular-btn' size='large' fullWidth type='submit' disabled={showErrorChip}>
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href="/auth/login" passHref style={{ textDecoration: 'underline' }}>
                                ¿Ya tienes cuenta?
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage