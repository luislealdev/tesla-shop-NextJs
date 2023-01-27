import NextLink from 'next/link';
import { GetServerSideProps } from 'next'
import { Box, Button, Chip, Grid, TextField, Typography, Divider } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form';
import { validations } from '@/utils';
import { useState, useContext, useEffect } from 'react';
import { ErrorOutlineRounded } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext } from '../../Context/auth/AuthContext';
import { getProviders, getSession, signIn } from 'next-auth/react';

type Inputs = {
    email: string,
    password: string,
};

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [showErrorChip, setShowErrorChip] = useState(false);
    const [providers, setProviders] = useState<any>({});

    const router = useRouter();

    const { onLoginUser } = useContext(AuthContext);

    const destination = router.query.p?.toString() || '/';

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov);
        })
    }, [])


    const onSubmit = async ({ email, password }: Inputs) => {
        setShowErrorChip(false);

        await signIn('credentials', { email, password });

        //CUSTOM AUTH
        // const isValidLogin = await onLoginUser(email, password);
        // if (!isValidLogin) {
        //     setShowErrorChip(true);
        //     setTimeout(() => setShowErrorChip(false), 3000);
        //     return;
        // }
        // router.replace(destination);
    }

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                        </Grid>

                        {showErrorChip && <Grid item xs={12} display='flex' justifyContent='center'>
                            <Chip color='error' label='Verifica tu información de inicio' icon={<ErrorOutlineRounded />} className='fadeIn' />
                        </Grid>
                        }

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
                                autoComplete='false'
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
                                autoComplete='false'
                            />

                        </Grid>

                        <Grid item xs={12}>
                            <Button color="secondary" className='circular-btn' size='large' fullWidth type='submit' disabled={showErrorChip}>
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href={`/auth/register?p=${destination}`} passHref style={{ textDecoration: 'underline' }}>
                                ¿No tienes cuenta?
                            </NextLink>
                        </Grid>

                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values(providers).map((provider: any) => {

                                    if (provider.id == 'credentials') return (<div id='credentials'></div>)

                                    return (
                                        <Button
                                            key={provider.id}
                                            variant='outlined'
                                            fullWidth
                                            color='primary'
                                            sx={{ mb: 1 }}
                                            onClick={() => signIn(provider.id)}
                                        >
                                            {provider.name}
                                        </Button>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>

                </Box>
            </form>
        </AuthLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });

    const { p = '/' } = query

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }
    return {
        props: {

        }
    }
}

export default LoginPage