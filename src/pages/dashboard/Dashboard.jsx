import { Space,Spin,Typography} from 'antd';
import styles from './dashboard.module.css';
import { DashboardCard } from '../../components';
import { useGetAllProductsQuery } from '../../features/product/productApiSlice';
import { useGetAllCustomersQuery } from '../../features/customer/customerApiSlice';
import TypographyTitle from '../../components/typo-title/TypographyTitle';

const Dashboard = () => {

  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const { data: customers} = useGetAllCustomersQuery();

  const productCount = products?.length;
  const customerCount = customers?.length;

  if (isLoading) {
    return (
      <div className="spin-container">
        <Spin size="large"/>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <TypographyTitle>Overview</TypographyTitle>
      <Space size={'large'} direction='horizontal'>
        <DashboardCard title="Products" value={productCount} icon="widgets" />
        <DashboardCard title="Customers" value={customerCount} icon="group" />
      </Space>
    </div>
  )
}

export default Dashboard
