import type { TablePaginationConfig } from 'antd'

// 分页配置
export const DEFAULT_PAGE_SIZE = 50; // 默认每页显示条数
export const PAGE_SIZE_OPTIONS = ['20', '50', '100', '200'] // 每页显示条数选项
export const globalPaginationConfig: TablePaginationConfig = {
    defaultPageSize: DEFAULT_PAGE_SIZE, // 默认每页显示条数
    pageSizeOptions: PAGE_SIZE_OPTIONS, // 每页显示条数选项
    showSizeChanger: true, // 是否显示每页显示条数选项
    showQuickJumper: true, // 是否显示快速跳转
    showTotal: (total) => `共 ${total} 条`, // 是否显示总数
}

// 表格滚动配置 (内部滚动)
export const globalTableScroll = {
    x: 'max-content', // 水平滚动设置全宽
    y: 'calc(100vh - 400px)', // 大约减去 顶部栏+Tabs+工具栏+分页+Padding 的高度
}
