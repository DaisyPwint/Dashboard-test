import { useState, useEffect } from "react";
import { Menu, Layout, theme, ConfigProvider} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './sidemenu.module.css'
import Logo from '../assets/logo.webp';
import Ninjar from '../assets/ninjar.png'

const { Sider } = Layout;

const SideMenu = () => {
  const { token: {colorText}} = theme.useToken();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const items = [
    { label: "Dashboard", key: "/", icon: <span className="material-symbols-outlined" style={{fontSize: "20px"}}>
    home
  </span> },
    { label: "Products", 
      key: "/products",
      icon: <span className="material-symbols-outlined" style={{fontSize: "20px"}}>
      view_cozy
    </span>, 
    },
  ];

  return (
        <Sider 
          width={230} 
          style={{
          background: colorText,
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 2,
          bottom: 0,
          }} 
          >
            <ConfigProvider theme={{
              components: {
                Menu: {
                  itemColor: "#A9A9A9",
                  itemSelectedColor: colorText,
                  popupBg: colorText,
                  itemHoverBg: "#34495E",
                  itemActiveBg: "#34495E",
                  itemHoverColor: "#fff",
                }
              }
            }}>
              <img src={Logo} className={styles.logo}/>
              <Menu onClick={({ key }) => {
                  navigate(key);
                }}
                selectedKeys={[selectedKeys]}
                mode="inline"
                items={items}
                style={{background: colorText,marginTop: '10px',padding: '12px'
                }}
              />
            </ConfigProvider>
            <div className={styles.imageContainer}>
              <img src={Ninjar} style={{width: '100px',marginTop: '200px',marginLeft: '28px'}} className={styles.image}/>
            </div>
        </Sider>
  );
};

export default SideMenu;
