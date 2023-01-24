export const format = (value: number)=>{
    const formatter = new Intl.NumberFormat('es-MX',{
        style:'currency',
        currency:'MXN',
        maximumFractionDigits:2,
        minimumFractionDigits:2,
    });

    return formatter.format(value);
}