import { Form,Input,Checkbox,Row,Col,Button, Typography, Space, InputNumber, Spin, message} from "antd";
import styles from '../product.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEditProductMutation, useGetProductQuery, useGetAllCategoriesQuery } from "../../features/product/productApiSlice";
import TypographyTitle from "../../components/typo-title/TypographyTitle";

const EditRoomType = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {id} = useParams();
  const [ editProduct] = useEditProductMutation();
  const { data: product, isLoading, error} = useGetProductQuery(parseInt(id)); 
  const { data: categories} = useGetAllCategoriesQuery();
  
const onFinish = async (values) => {
  const productId = parseInt(id)
  try {
    const {data,error} = await editProduct({productId,values});
    if(data){
      message.success("Edited Successfully");
      navigate('/products');
    }else{
      message.error(error?.error);
    }
  } catch (error) {
    console.error("Error Creating Product",error);
  }
}

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
    <div className={styles['add-header']}>      
      <span className="material-symbols-outlined" style={{cursor: 'pointer'}} onClick={() => navigate(-1)}>
      arrow_back
      </span>
      <TypographyTitle className={styles['add-title']}>Edit Product</TypographyTitle>
    </div>
    <Form layout="vertical" form={form} className={styles['form-container']} onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="title" label="Name" initialValue={product.title} rules={[
            {
              required: true,
              message: 'Please input product\'s name'
            }
          ]}>
            <Input autoComplete="off"/>
          </Form.Item>  
        </Col>
        <Col span={12}>                         
          <Form.Item name="price" label="Price" initialValue={product.price} rules={[
            {
              required: true,
              message: 'Please input product\'s price'
            }
          ]}>
            <InputNumber min={1} addonBefore="$" style={{width: '100%'}}/>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="category" label="Select category" initialValue={product.category} rules={[
            {
              required: true,
              message: 'Please input product\'s category'
            }
          ]}>
        <Checkbox.Group>
          <Row>
              {categories?.map((category,index) => (
              <Col span={8} key={index}>
                  <Checkbox value={category}>
                    {category}
                  </Checkbox>
              </Col>
              ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item name="image" label="Image URL" initialValue={product.image} rules={[
            {
              required: true,
              message: 'Please input product\'s image'
            }
          ]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="description" label="Description" initialValue={product.description} rules={[
            {
              required: true,
              message: 'Please input product\'s description'
            }
          ]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item className={styles['btn-group']}>
          <Space>
            <Button onClick={() => form.resetFields()}>Clear</Button>
            <Button type="primary" className={`add-btn`} htmlType="submit">
             Save
            </Button>
          </Space>
      </Form.Item>
    </Form>
    </>
  )
}

export default EditRoomType
