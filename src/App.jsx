import { Routes,Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import color from './core/color';
import { ConfigProvider } from 'antd';
import { Dashboard, EditProduct, Products } from './pages';
import AddProduct from './pages/product/AddProduct';

const ANT_THEME = {
  token: {
    colorPrimary: color.primaryColor,
    colorLink: color.linkColor,
    colorBgHeader: color.whiteColor,
    colorBgLayout: color.bgColor,
    colorText: color.secondaryColor,
    fontSize: 15,
    fontFamily: "Inter",
  },
  components: {
    Button: {
      primaryShadow: "none",
    },
    Input: {
      activeShadow: color.activeShadowColor,
    },
    Table: {
      headerColor: color.textColor
    }
  },
}

const App = () => {

  return (   
    <ConfigProvider theme={ANT_THEME}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Dashboard/>} />
          <Route path="products" element={<Products/>}/>
          <Route path="create" element={<AddProduct />}/>
          <Route path="products/:id" element={<EditProduct />}/>
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export default App
