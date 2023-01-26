import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography, Chip } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { ErrorOutlineRounded, Router } from '@mui/icons-material';
import { validations } from '@/utils';
import { AuthContext } from '../../Context/auth/AuthContext';
import { useRouter } from 'next/router';

type Inputs = {
    name: string,
    email: string,
    password: string,
};

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const router = useRouter();
    console.log(router);
    
    const [showErrorChip, setShowErrorChip] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const destination = router.query.p?.toString() || '/';
    console.log(destination);
    

    const { onRegisterUser } = useContext(AuthContext);

    const onSubmit = async ({ name, email, password }: Inputs) => {
        setShowErrorChip(false);
        const { hasError, message } = await onRegisterUser(name, email, password);

        if (hasError) {
            setShowErrorChip(true);
            setErrorMessage(message!);
            setTimeout(() => setShowErrorChip(false), 3000);
            return;
        }
        router.replace(destination);
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
                            <NextLink href={`/auth/login?p=${destination}`} passHref style={{ textDecoration: 'underline' }}>
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