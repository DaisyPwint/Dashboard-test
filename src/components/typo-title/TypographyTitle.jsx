import { Typography } from 'antd'

const TypographyTitle = ({children}) => {
  return (
    <Typography.Title level={3} style={{ fontSize: "28px",margin: 0,color:"#262626",fontFamily:'Times New Roman, serif'}}>{children}</Typography.Title>
    )
}

export default TypographyTitle