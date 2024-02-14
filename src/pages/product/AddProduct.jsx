import { Form,Input,Checkbox,Row,Col,Button, Typography, Space, InputNumber, message, Spin} from "antd";
import styles from '../product.module.css';
import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery,useCreateProductMutation } from "../../features/product/productApiSlice";
import TypographyTitle from "../../components/typo-title/TypographyTitle";

const AddRoomType = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {data: categories,isLoading,error} = useGetAllCategoriesQuery();
  const [ createProduct ] = useCreateProductMutation();

const onFinish = async (values) => {
  try {
    const {data,error} = await createProduct(values);
    if(data){
      message.success("Created Successfully");
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
      <TypographyTitle className={styles['add-title']}>Create Product</TypographyTitle>
    </div>
    <Form layout="vertical" form={form} className={styles['form-container']} onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="title" label="Name" rules={[
            {
              required: true,
              message: 'Please input product\'s name'
            }
          ]}>
            <Input autoComplete="off"/>
          </Form.Item>  
        </Col>
        <Col span={12}>                         
          <Form.Item name="price" label="Price" rules={[
            {
              required: true,
              message: 'Please input product\'s price'
            }
          ]}>
            <InputNumber min={1} addonBefore="$" style={{width: '100%'}}/>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="category" label="Select category" rules={[
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
      <Form.Item name="image" label="Image URL" rules={[
            {
              required: true,
              message: 'Please input product\'s image'
            }
          ]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[
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
             Create
            </Button>
          </Space>
      </Form.Item>
    </Form>
    </>
  )
}

export default AddRoomType
