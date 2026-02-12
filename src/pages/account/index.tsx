import { useState } from 'react';
import {
  Card,
  Tabs,
  Avatar,
  Tag,
  Divider,
  Input,
  Space,
  Row,
  Col,
  Button,
  Form,
  message,
} from 'antd';
import {
  HomeOutlined,
  ContactsOutlined,
  ClusterOutlined,
} from '@ant-design/icons';
import { useUserStore } from '@/store';
import styles from './index.module.css';

export default function AccountPage() {
  const { userInfo } = useUserStore();
  const [tabKey, setTabKey] = useState('basic');

  // 渲染左侧个人信息
  const renderUserInfo = () => (
    <Card bordered={false} style={{ marginBottom: 24 }}>
      <div className={styles.avatarHolder}>
        <img
          alt=""
          className={styles.avatar}
          src={
            userInfo?.avatar ||
            'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
          }
        />
        <div className={styles.username}>
          {userInfo?.nickname || userInfo?.username}
        </div>
        <div className={styles.bio}>海纳百川，有容乃大</div>
      </div>
      <div className={styles.detail}>
        <p>
          <ContactsOutlined style={{ marginRight: 8 }} />
          {userInfo?.roles?.includes('admin') ? '超级管理员' : '普通用户'}
        </p>
        <p>
          <ClusterOutlined style={{ marginRight: 8 }} />
          蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED
        </p>
        <p>
          <HomeOutlined style={{ marginRight: 8 }} />
          浙江省杭州市
        </p>
      </div>
      <Divider dashed />
      <div className={styles.tags}>
        <div className={styles.tagsTitle}>标签</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Tag>很有想法的</Tag>
          <Tag>专注设计</Tag>
          <Tag>辣~</Tag>
          <Tag>大长腿</Tag>
          <Tag>川妹子</Tag>
          <Tag>海纳百川</Tag>
        </div>
      </div>
      <Divider dashed />
      <div className={styles.team}>
        <div className={styles.teamTitle}>团队</div>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                size="small"
                style={{ backgroundColor: '#1890ff', marginRight: 8 }}
              >
                A
              </Avatar>
              <span>科学搬砖组</span>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                size="small"
                style={{ backgroundColor: '#52c41a', marginRight: 8 }}
              >
                P
              </Avatar>
              <span>程序员日常</span>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );

  // 基本设置表单
  const BasicSettings = () => (
    <div style={{ maxWidth: 440 }}>
      <TypographyHeading title="基本设置" />
      <Form
        layout="vertical"
        initialValues={{
          email: userInfo?.email || 'antdesign@alipay.com',
          nickname: userInfo?.nickname || 'Serati Ma',
          profile: '海纳百川，有容乃大',
          country: 'China',
          province: 'Zhejiang',
          city: 'Hangzhou',
          address: '西湖区工专路 77 号',
          phone: '0752-268888888',
        }}
        onFinish={() => message.success('更新基本信息成功')}
      >
        <Form.Item
          name="email"
          label="邮箱"
          rules={[{ required: true, message: '请输入邮箱' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nickname"
          label="昵称"
          rules={[{ required: true, message: '请输入昵称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="profile" label="个人简介">
          <Input.TextArea placeholder="个人简介" rows={4} />
        </Form.Item>
        <Form.Item name="country" label="国家/地区">
          <Input />
        </Form.Item>
        <Form.Item name="province" label="所在省市">
          <Space>
            <Input style={{ width: 120 }} />
            <Input style={{ width: 120 }} />
          </Space>
        </Form.Item>
        <Form.Item name="address" label="街道地址">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="联系电话">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            更新基本信息
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  // 安全设置
  const SecuritySettings = () => {
    const data = [
      {
        title: '账户密码',
        description: '当前密码强度：强',
        actions: [<a key="Modify">修改</a>],
      },
      {
        title: '密保手机',
        description: '已绑定手机：138****8293',
        actions: [<a key="Modify">修改</a>],
      },
      {
        title: '密保问题',
        description: '未设置密保问题，密保问题可有效保护账户安全',
        actions: [<a key="Set">设置</a>],
      },
      {
        title: '备用邮箱',
        description: '已绑定邮箱：ant***sign.com',
        actions: [<a key="Modify">修改</a>],
      },
    ];

    return (
      <div>
        <TypographyHeading title="安全设置" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {data.map((item, index) => (
            <div
              key={index}
              style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 24 }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}
                  >
                    {item.title}
                  </div>
                  <div style={{ color: 'rgba(0,0,0,0.45)' }}>
                    {item.description}
                  </div>
                </div>
                {item.actions}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const TypographyHeading = ({ title }: { title: string }) => (
    <div style={{ marginBottom: 24 }}>
      <span style={{ fontSize: 20, fontWeight: 500, lineHeight: '28px' }}>
        {title}
      </span>
    </div>
  );

  return (
    <div className={styles.main}>
      <div className={styles.left}>{renderUserInfo()}</div>
      <div className={styles.right}>
        <Card
          className={styles.tabsCard}
          bordered={false}
          style={{ width: '100%' }}
        >
          <Tabs
            activeKey={tabKey}
            onChange={setTabKey}
            items={[
              {
                key: 'basic',
                label: '基本设置',
                children: <BasicSettings />,
              },
              {
                key: 'security',
                label: '安全设置',
                children: <SecuritySettings />,
              },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}
