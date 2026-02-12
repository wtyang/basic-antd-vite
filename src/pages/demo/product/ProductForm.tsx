// 演示 — 商品表单（新增/编辑）

import { Card, Space, Button, App } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import {
  ProForm,
  ProFormText,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-components'
import { useNavigate, useParams } from 'react-router-dom'
import { ProFormItem } from '@ant-design/pro-components'
import FileUpload from '@/components/FileUpload'
import RichTextEditor from '@/components/RichTextEditor'

export default function ProductForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { message } = App.useApp()
  const isEdit = !!id

  const handleSubmit = async (values: Record<string, unknown>) => {
    console.log('表单提交:', values)
    message.success(isEdit ? '编辑成功' : '创建成功')
    navigate(-1)
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        />
        <span style={{ fontSize: 20, fontWeight: 500, lineHeight: '32px' }}>
          {isEdit ? '编辑商品' : '新增商品'}
        </span>
      </Space>

      <Card>
        <ProForm
          onFinish={handleSubmit}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
        >
          <ProFormText
            name="name"
            label="商品名称"
            placeholder="请输入商品名称"
            rules={[{ required: true, message: '请输入商品名称' }]}
            initialValue={isEdit ? `商品 ${id}` : undefined}
          />
          <ProFormDigit
            name="price"
            label="价格"
            placeholder="请输入价格"
            min={0}
            fieldProps={{ precision: 2, prefix: '¥' }}
            rules={[{ required: true, message: '请输入价格' }]}
            initialValue={isEdit ? 99.0 : undefined}
          />
          <ProFormSelect
            name="category"
            label="分类"
            placeholder="请选择分类"
            options={[
              { label: '电子产品', value: '电子产品' },
              { label: '食品饮料', value: '食品饮料' },
              { label: '服装鞋帽', value: '服装鞋帽' },
              { label: '家居用品', value: '家居用品' },
            ]}
            rules={[{ required: true, message: '请选择分类' }]}
          />
          <ProFormItem name="images" label="商品图片" trigger="onChange">
            <FileUpload maxSize={5} accept="image/*" listType="picture" />
          </ProFormItem>
          <ProFormItem name="description" label="详细描述" trigger="onChange">
            <RichTextEditor height={300} placeholder="请输入商品详细介绍..." />
          </ProFormItem>
        </ProForm>
      </Card>
    </Space>
  )
}
