import { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Carousel,
  Button,
  Tooltip,
  Spin,
  message,
} from 'antd';
import {
  ShopOutlined,
  BarChartOutlined,
  CloudServerOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  SecurityScanOutlined,
  PayCircleOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  AuditOutlined,
  MoreOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import styles from './index.module.css';

const { Title, Text } = Typography;

// Icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  ShopOutlined,
  BarChartOutlined,
  CloudServerOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  SecurityScanOutlined,
  PayCircleOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  AuditOutlined,
  MoreOutlined,
  AppstoreOutlined,
};

interface AppItem {
  name: string;
  desc: string;
  icon: string;
  color?: string;
}

interface SystemGroup {
  category: string;
  iconCategory: string;
  apps: AppItem[];
}

export default function PortalPage() {
  const [systems, setSystems] = useState<SystemGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await axios.get('/api/portal/systems');
        if (response.data.code === 0) {
          setSystems(response.data.data);
        } else {
          message.error(response.data.message || 'Failed to fetch systems');
        }
      } catch (error) {
        console.error('Error fetching systems:', error);
        message.error('Error fetching systems');
      } finally {
        setLoading(false);
      }
    };

    fetchSystems();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Banner */}
      <Carousel autoplay className={styles.carousel}>
        <div className={styles.bannerSlide}>
          <div className={styles.bannerContent}>
            <Title level={2} style={{ color: '#fff', marginBottom: 16 }}>
              欢迎体验全新统一应用门户
            </Title>
            <Text style={{ color: '#fff', fontSize: 16 }}>
              集成多业务系统，打造一站式工作台
            </Text>
          </div>
        </div>
        <div
          className={styles.bannerSlide}
          style={{
            background: 'linear-gradient(135deg, #13c2c2 0%, #006d75 100%)',
          }}
        >
          <div className={styles.bannerContent}>
            <Title level={2} style={{ color: '#fff', marginBottom: 16 }}>
              数据驱动决策
            </Title>
            <Text style={{ color: '#fff', fontSize: 16 }}>
              报表数据平台，助力精细化运营
            </Text>
          </div>
        </div>
      </Carousel>

      {/* System Grid */}
      <div className={styles.systemList}>
        {systems.map((group, index) => {
          const GroupIcon = iconMap[group.iconCategory] || AppstoreOutlined;
          return (
            <div key={index} className={styles.groupSection}>
              <div className={styles.groupHeader}>
                <span className={styles.groupIcon}>
                  <GroupIcon />
                </span>
                <Title
                  level={4}
                  style={{
                    margin: 0,
                    display: 'inline-block',
                    verticalAlign: 'middle',
                  }}
                >
                  {group.category}
                </Title>
              </div>
              <Row gutter={[24, 24]}>
                {group.apps.map((app, appIndex) => {
                  const IconComponent = iconMap[app.icon] || AppstoreOutlined;
                  return (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} key={appIndex}>
                      <Card
                        hoverable
                        className={styles.appCard}
                        bodyStyle={{
                          padding: '24px 16px',
                          textAlign: 'center',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <div className={styles.appIcon}>
                          <IconComponent
                            style={{
                              fontSize: 48,
                              color: app.color || '#1890ff',
                            }}
                          />
                        </div>
                        <Title
                          level={5}
                          className={styles.appName}
                          ellipsis={{ tooltip: app.name }}
                        >
                          {app.name}
                        </Title>
                        <div className={styles.appDesc} title={app.desc}>
                          {app.desc}
                        </div>

                        <div className={styles.cardOverlay}>
                          <div className={styles.overlayContent}>
                            <Button
                              type="primary"
                              shape="round"
                              icon={<AppstoreAddOutlined />}
                            >
                              申请权限
                            </Button>
                          </div>
                        </div>

                        <div className={styles.moreAction}>
                          <Tooltip title="更多操作">
                            <MoreOutlined className={styles.moreIcon} />
                          </Tooltip>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          );
        })}
      </div>
    </div>
  );
}
