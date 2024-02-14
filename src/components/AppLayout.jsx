import { Layout} from 'antd';``
import { Content } from 'antd/es/layout/layout';
import SideMenu from './SideMenu';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh"}} hasSider>  
      <SideMenu/>
      <Layout style={{marginLeft: '200px'}}>
        <Content style={{margin: "30px 20px 25px 60px"}}>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout