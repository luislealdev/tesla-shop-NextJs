import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';


interface Props {
  currentValue: number,
  maxValue: number
  onUpdateQuantity: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, onUpdateQuantity }) => {
  return (
    <Box display='flex' alignItems='center'>
      {
        !(currentValue == 1) && (
          <IconButton onClick={() => onUpdateQuantity(currentValue - 1)}>
            <RemoveCircleOutline />
          </IconButton>
        )
      }
      <Typography sx={{ width: 40, textAlign: 'center' }}> {currentValue} </Typography>
      {
        !(currentValue == maxValue) && (
          <IconButton onClick={() => onUpdateQuantity(currentValue + 1)} >
            <AddCircleOutline />
          </IconButton>
        )
      }
    </Box>
  )
}
