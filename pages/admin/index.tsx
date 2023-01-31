import { AdminLayout } from "@/components/layouts"
import { AttachmentOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined, CreditCardOffOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { SummaryTile } from '../../components/admin';

const DashboardPage = () => {
    return (
        <AdminLayout
            title="Dashboard"
            subtitle="Estadísticas generales"
            icon={<DashboardOutlined />}>

            <Grid container spacing={2}>
                <SummaryTile title='1' subTitle="Ordenes totales" icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />} />
                <SummaryTile title='2' subTitle="Ordenes pagadas" icon={<AttachmentOutlined color="success" sx={{ fontSize: 40 }} />} />
                <SummaryTile title='2' subTitle="Ordenes pendientes" icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />} />
                <SummaryTile title='4' subTitle="Clientes" icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />} />
                <SummaryTile title='5' subTitle="Productos" icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />} />
                <SummaryTile title='6' subTitle="Productos sin existencias" icon={<CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />} />
                <SummaryTile title='7' subTitle="Bajo inventario" icon={<ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} />} />
                <SummaryTile title='8' subTitle="Actualización en" icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />} />


            </Grid>

        </AdminLayout>
    )
}

export default DashboardPage;