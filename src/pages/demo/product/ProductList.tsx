// 演示 — 商品列表

import { Button, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { useNavigate } from 'react-router-dom';
import { globalPaginationConfig, globalTableScroll } from '@/config/table';
import Access from '@/components/Access';

interface ProductItem {
  id: number;
  name: string;
  price: number;
  status: 'on' | 'off';
  category: string;
  createdAt: string;
}

// 模拟数据
const mockData: ProductItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `商品 ${i + 1}`,
  price: Math.floor(Math.random() * 10000) / 100,
  status: Math.random() > 0.3 ? 'on' : 'off',
  category: ['电子产品', '食品饮料', '服装鞋帽', '家居用品'][i % 4],
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

export default function ProductList() {
  const navigate = useNavigate();

  const columns: ProColumns<ProductItem>[] = [
    { title: 'ID', dataIndex: 'id', width: 60, search: false },
    { title: '商品名称', dataIndex: 'name', ellipsis: true },
    {
      title: '价格',
      dataIndex: 'price',
      search: false,
      render: (_, record) => `¥${record.price.toFixed(2)}`,
    },
    {
      title: '分类',
      dataIndex: 'category',
      valueEnum: {
        电子产品: { text: '电子产品' },
        食品饮料: { text: '食品饮料' },
        服装鞋帽: { text: '服装鞋帽' },
        家居用品: { text: '家居用品' },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        on: { text: '上架', status: 'Success' },
        off: { text: '下架', status: 'Default' },
      },
      render: (_, record) => (
        <Tag color={record.status === 'on' ? 'green' : 'default'}>
          {record.status === 'on' ? '上架' : '下架'}
        </Tag>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => (
        <Space>
          <a onClick={() => navigate(`/demo/product/detail/${record.id}`)}>
            查看
          </a>
          <Access permission="product:edit">
            <a onClick={() => navigate(`/demo/product/edit/${record.id}`)}>
              编辑
            </a>
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<ProductItem>
      headerTitle="商品列表"
      columns={columns}
      dataSource={mockData}
      rowKey="id"
      scroll={globalTableScroll}
      search={{ labelWidth: 'auto' }}
      pagination={globalPaginationConfig}
      toolBarRender={() => [
        <Access key="create" permission="product:create">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/demo/product/create')}
          >
            新增商品
          </Button>
        </Access>,
      ]}
    />
  );
}
