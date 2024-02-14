import { Table, Input, Typography, Button, Spin, Popconfirm, message, Dropdown, theme, Space, Divider, Select} from 'antd';
import { useState } from 'react';
import styles from '../product.module.css';
import { PlusOutlined, FilterOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteProductMutation, useGetAllProductsQuery, useGetProductQuery, useGetCategoryQuery } from '../../features/product/productApiSlice';
import TypographyTitle from '../../components/typo-title/TypographyTitle';

const { useToken } = theme;

const RoomType = () => {
  const [searchText,setSearchText] = useState("");
  const navigate = useNavigate();  
  const { token } = useToken();
  const [onFilter,setOnfilter] = useState(false);
  const [filterValue,setFilterValue] = useState('All');
  const {data: allProducts, isLoading, error} = useGetAllProductsQuery();
  const [ deleteProduct ] = useDeleteProductMutation();
  const { data: category} = useGetCategoryQuery(filterValue); 

const products = filterValue !== 'All' ? category : allProducts;

const getUniqueTypes = (data) => {
  const types = data?.map(product => product.category);
  return ['All', ...new Set(types)];
}

const options = getUniqueTypes(allProducts).map(category => ({
  value: category,
  label: category,
}))

const confirm = async (id) => {  
  try {
    const { data, error} = await deleteProduct({id});
    if(data){
      message.success("Deleted Successfully");
    }else{
      message.error(error?.error);
    }
  } catch (error) {
    console.error("Error Deleting Product",error);
  }
};

const handleSelectChange = (value) => {
  setFilterValue(value);
}

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',      
      sorter: (a,b) => b.id - a.id,
      align: "center",
      render: (id) => id,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      filteredValue: [searchText],
      onFilter: (value,record) => {
        return (
          String(record.title).toLowerCase().includes(value.toLowerCase()) || String(record.price).toLowerCase().includes(value.toLowerCase()) || String(record.category).toLowerCase().includes(value.toLowerCase())
        )
      },
      render: (image) => (
        <img src={image} style={{height: '30px'}}/>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price) => (
        <p>$ {price}</p>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_,record) => (
          <Link to={`/products/${record?.id}`}>Edit</Link>
        )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_,record) => (
        <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={() => confirm(record.id)}
        okText="Ok"
        cancelText="Cancel"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
        )
    }
  ]

  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

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
    <>
      <div className={styles.header}>
        <TypographyTitle>Products</TypographyTitle>
        <div className={styles.action}>
            <Input.Search placeholder='Search here...' onSearch={(value) => {
              setSearchText(value);
            }} onChange={(e) => {
              setSearchText(e.target.value);
            }}
            />
            <Button type='primary' className='add-btn' onClick={() => navigate('/create')}><PlusOutlined/>Create Product</Button>
            <Dropdown trigger={['click']}
            open={onFilter}
            onOpenChange={open => setOnfilter(open)}
            dropdownRender={() => (
              <div style={contentStyle}>
                <Space>
                  <Typography.Title level={4} style={{marginTop: '5px',marginBottom: 0}}>Filter Category</Typography.Title>
                </Space>
                <Divider style={{margin: "20px 0"}}/>
                <Select options={options} defaultValue={filterValue} onChange={handleSelectChange} style={{marginBottom: '20px',width: 150}} />
              </div>
            )}
            >
              <a onClick={(e) => e.preventDefault()}>
                <FilterOutlined style={{fontSize: "20px"}}/>
              </a>
            </Dropdown>
          </div>
      </div>
      <Table columns={columns} expandable={{
      expandedRowRender: (record) => (
        <p
          style={{
            margin: 0,
          }}
        >
          {record.description}
        </p>
      ),
      rowExpandable: (record) => record.name !== 'Not Expandable',
    }} rowKey={(record) => record.id} loading={isLoading} dataSource={products}  className={styles.table} />
    </>
  )
}

export default RoomType