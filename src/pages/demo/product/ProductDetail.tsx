// 演示 — 商品详情

import { Card, Descriptions, Button, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function ProductDetail() {
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
          商品详情
        </span>
      </Space>

      <Card>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="商品ID">{id}</Descriptions.Item>
          <Descriptions.Item label="商品名称">示例商品 {id}</Descriptions.Item>
          <Descriptions.Item label="价格">¥99.00</Descriptions.Item>
          <Descriptions.Item label="分类">电子产品</Descriptions.Item>
          <Descriptions.Item label="状态">上架</Descriptions.Item>
          <Descriptions.Item label="创建时间">
            2026-01-01 12:00:00
          </Descriptions.Item>
          <Descriptions.Item label="描述" span={2}>
            这是一个演示商品，展示 Descriptions 组件的用法。
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
}
