// 仪表盘首页

import { Card, Col, Row, Statistic, Typography, Space } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  RiseOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function Dashboard() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={4}>工作台</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="今日订单"
              value={128}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="新增用户"
              value={36}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="今日营收"
              value={9280}
              precision={2}
              prefix={<DollarOutlined />}
              suffix="元"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="转化率"
              value={12.8}
              precision={1}
              prefix={<RiseOutlined />}
              suffix="%"
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="欢迎使用">
        <Paragraph>
          本项目是一个基于 <strong>React + Ant Design v6 + Vite</strong>{' '}
          构建的后台管理系统基础架构。
        </Paragraph>
        <Paragraph>
          包含动态路由、权限管理、主题切换、SSO 认证等企业级功能，开箱即用。
        </Paragraph>
      </Card>
    </Space>
  );
}
