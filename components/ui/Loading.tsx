import { CircularProgress, Box, Typography } from '@mui/material';
import React from 'react'

export const Loading = () => {
  return (
    <Box
    display='flex' 
    justifyContent='center' 
    alignItems='center' 
    height='calc(100vh - 200px)'
    flexDirection='column'
>
    <Typography component='h2' fontWeight={200}>Loading...</Typography>
    <CircularProgress/>
</Box>
  )
}
