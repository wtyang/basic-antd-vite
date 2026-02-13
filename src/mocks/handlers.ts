// Mock Service Worker 处理器
import { http, HttpResponse, delay } from 'msw';

const API_PREFIX = '/api';

export const handlers = [
  // 登录接口
  http.post(`${API_PREFIX}/auth/login`, async () => {
    await delay(100);
    return HttpResponse.json({
      code: 0,
      data: {
        accessToken: 'mock-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: 3600,
      },
      message: '登录成功',
    });
  }),

  // 退出登录
  http.post(`${API_PREFIX}/auth/logout`, async () => {
    await delay(50);
    return HttpResponse.json({
      code: 0,
      data: null,
      message: '退出成功',
    });
  }),

  // 获取当前用户信息
  http.get(`${API_PREFIX}/user/info`, async () => {
    await delay(50);
    return HttpResponse.json({
      code: 0,
      data: {
        id: 1,
        username: 'admin',
        name: '管理员',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        roles: ['admin'],
        permissions: ['*:*:*'],
      },
      message: 'success',
    });
  }),

  // 获取菜单
  http.get(`${API_PREFIX}/user/menus`, async () => {
    await delay(50);
    return HttpResponse.json({
      code: 0,
      data: {
        permissions: ['*:*:*'],
        menus: [
          {
            id: 'dashboard',
            path: '/dashboard',
            name: 'Dashboard',
            icon: 'DashboardOutlined',
            component: 'dashboard/index',
          },
          {
            id: 'demo',
            path: '/demo',
            name: '演示页面',
            icon: 'AppstoreOutlined',
            children: [
              {
                id: 'product',
                path: '/demo/product',
                name: '商品管理',
                children: [
                  {
                    id: 'product-list',
                    path: '/demo/product/list',
                    name: '商品列表',
                    component: 'demo/product/ProductList',
                  },
                  {
                    id: 'product-create',
                    path: '/demo/product/create',
                    name: '新增商品',
                    component: 'demo/product/ProductForm',
                    hidden: true,
                  },
                  {
                    id: 'product-edit',
                    path: '/demo/product/edit/:id',
                    name: '编辑商品',
                    component: 'demo/product/ProductForm',
                    hidden: true,
                  },
                  {
                    id: 'product-detail',
                    path: '/demo/product/detail/:id',
                    name: '商品详情',
                    component: 'demo/product/ProductDetail',
                    hidden: true,
                  },
                ],
              },
              {
                id: 'order',
                path: '/demo/order',
                name: '订单管理',
                children: [
                  {
                    id: 'order-list',
                    path: '/demo/order/list',
                    name: '订单列表',
                    component: 'demo/order/OrderList',
                  },
                  {
                    id: 'order-detail',
                    path: '/demo/order/detail/:id',
                    name: '订单详情',
                    component: 'demo/order/OrderDetail',
                    hidden: true,
                  },
                ],
              },
            ],
          },
          {
            id: 'account',
            path: '/account',
            name: '个人中心',
            icon: 'UserOutlined',
            component: 'account/index',
            hidden: true,
          },
        ],
      },
      message: 'success',
    });
  }),

  // 获取商品列表（可选，如果需要支持分页/搜索）
  // http.get(`${API_PREFIX}/products`, ...)

  // 获取门户系统列表
  http.get(`${API_PREFIX}/portal/systems`, async () => {
    await delay(100);
    return HttpResponse.json({
      code: 0,
      data: [
        {
          category: '门店运营',
          iconCategory: 'ShopOutlined',
          apps: [
            {
              name: 'PMS管理后台',
              desc: '门店日常运营管理后台',
              icon: 'CloudServerOutlined',
              color: '#52c41a',
            },
            {
              name: '酒店收益管理',
              desc: '帮助店长监控流量并自动预警',
              icon: 'PayCircleOutlined',
              color: '#faad14',
            },
            {
              name: 'CRS管理平台',
              desc: '实时预订服务的专有平台',
              icon: 'SolutionOutlined',
              color: '#eb2f96',
            },
            {
              name: '营销管理平台',
              desc: '营销活动、营销工具配置后台',
              icon: 'SnippetsOutlined',
              color: '#722ed1',
            },
            {
              name: '智慧客房',
              desc: '即时房务管理平台',
              icon: 'SecurityScanOutlined',
              color: '#13c2c2',
            },
          ],
        },
        {
          category: '数据应用',
          iconCategory: 'BarChartOutlined',
          apps: [
            {
              name: '报表平台',
              desc: '提供自定义报表设计',
              icon: 'BarChartOutlined',
              color: '#2f54eb',
            },
            {
              name: 'BI分析平台',
              desc: '商业智能分析平台',
              icon: 'BarChartOutlined',
              color: '#1890ff',
            },
          ],
        },
      ],
      message: 'success',
    });
  }),
];
