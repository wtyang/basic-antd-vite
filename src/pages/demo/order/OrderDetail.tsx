// 演示 — 订单详情

import { Card, Descriptions, Steps, Button, Space, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

export default function OrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        />
        <span style={{ fontSize: 20, fontWeight: 500, lineHeight: '32px' }}>
          订单详情
        </span>
      </Space>

      <Card title="订单进度">
        <Steps
          current={2}
          items={[
            { title: '提交订单' },
            { title: '付款成功' },
            { title: '商品发货' },
            { title: '确认收货' },
          ]}
        />
      </Card>

      <Card title="订单信息">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="订单号">{id}</Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color="cyan">已发货</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="买家">示例用户</Descriptions.Item>
          <Descriptions.Item label="金额">¥199.00</Descriptions.Item>
          <Descriptions.Item label="收货地址" span={2}>
            北京市朝阳区XX路XX号
          </Descriptions.Item>
          <Descriptions.Item label="创建时间" span={2}>
            2026-01-15 14:30:00
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
}
