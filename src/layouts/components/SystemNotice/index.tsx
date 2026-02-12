import { Carousel } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import styles from './index.module.css';

interface SystemNoticeProps {
  data?: string[];
}

export default function SystemNotice({ data }: SystemNoticeProps) {
  // 默认 Mock 数据
  const notices = data || [
    '系统公告：本周六凌晨 2:00 进行系统维护，预计耗时 2 小时。',
    '温馨提示：请及时完善个人资料，以免影响账户使用。',
    '新功能上线：报表导出功能现已支持 Excel 格式。',
  ];

  if (!notices.length) return null;

  return (
    <div className={styles.noticeContainer}>
      <SoundOutlined className={styles.icon} />
      <div className={styles.content}>
        {notices.length > 1 ? (
          <Carousel
            autoplay
            dots={false}
            vertical
            autoplaySpeed={5000}
            className={styles.carousel}
          >
            {notices.map((notice, index) => (
              <div key={index} className={styles.noticeItem}>
                <span className={styles.text} title={notice}>
                  {notice}
                </span>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className={styles.noticeItem}>
            <span className={styles.text} title={notices[0]}>
              {notices[0]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
