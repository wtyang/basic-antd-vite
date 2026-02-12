// 演示 — 订单列表

import { Tag } from 'antd'
import { ProTable } from '@ant-design/pro-components'
import type { ProColumns } from '@ant-design/pro-components'
import { useNavigate } from 'react-router-dom'
import { globalPaginationConfig, globalTableScroll } from '@/config/table'

interface OrderItem {
  id: string
  productName: string
  amount: number
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'
  createdAt: string
  buyer: string
}

const statusMap = {
  pending: { text: '待付款', color: 'orange' },
  paid: { text: '已付款', color: 'blue' },
  shipped: { text: '已发货', color: 'cyan' },
  completed: { text: '已完成', color: 'green' },
  cancelled: { text: '已取消', color: 'default' },
}

const mockOrders: OrderItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: `ORD${String(202600001 + i)}`,
  productName: `商品 ${i + 1}`,
  amount: Math.floor(Math.random() * 50000) / 100,
  status: (['pending', 'paid', 'shipped', 'completed', 'cancelled'] as const)[
    i % 5
  ],
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  buyer: `用户${i + 1}`,
}))

export default function OrderList() {
  const navigate = useNavigate()

  const columns: ProColumns<OrderItem>[] = [
    { title: '订单号', dataIndex: 'id', copyable: true },
    { title: '商品', dataIndex: 'productName', ellipsis: true },
    { title: '买家', dataIndex: 'buyer' },
    {
      title: '金额',
      dataIndex: 'amount',
      search: false,
      render: (_, r) => `¥${r.amount.toFixed(2)}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: Object.fromEntries(
        Object.entries(statusMap).map(([k, v]) => [k, { text: v.text }]),
      ),
      render: (_, r) => (
        <Tag color={statusMap[r.status].color}>{statusMap[r.status].text}</Tag>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => (
        <a onClick={() => navigate(`/demo/order/detail/${record.id}`)}>
          查看
        </a>
      ),
    },
  ]

  return (
    <ProTable<OrderItem>
      headerTitle="订单列表"
      columns={columns}
      dataSource={mockOrders}
      rowKey="id"
      scroll={globalTableScroll}
      search={{ labelWidth: 'auto' }}
      pagination={globalPaginationConfig}
    />
  )
}
