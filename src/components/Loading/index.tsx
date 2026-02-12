// 全局加载组件

import { Spin } from 'antd';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: 200,
      }}
    >
      <Spin size="large" />
    </div>
  );
}
