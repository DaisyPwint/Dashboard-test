import React from 'react';
import { UserOutlined } from "@ant-design/icons"
import { Avatar,Dropdown, theme } from "antd"
import styles from './appHeader.module.css';

const { useToken } = theme;

const AppHeader = () => {

  const { token: {colorBgHeader,colorPrimary}} = theme.useToken();
  const { token } = useToken();

  const items = [
    {
      key: '1',
      label: 'Change password',
    },
    {
      key: '3',
      danger: true,
      label: 'Log out',
    },
  ];
  
  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };

  return (
    <header style={{backgroundColor: colorPrimary}}>
        <nav style={{
          paddingRight: '50px',
          justifyContent: 'end',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          backgroundColor: colorBgHeader,
          border: '2px solid #fff',
          }} className={styles.nav}>
          <Dropdown trigger={['click']}
            menu={{
              items,
            }}
            dropdownRender={(menu) => (
          <div style={contentStyle}>
            {React.cloneElement(menu, {
              style: menuStyle,
            })}
          </div>
        )}
      >      
        <a onClick={(e) => e.preventDefault()}>
          <Avatar style={{ backgroundColor: '#181818', color: '#fff' }}>
            <UserOutlined/>
          </Avatar>
        </a>
        </Dropdown>
        </nav>
    </header>
  )
}

export default AppHeader