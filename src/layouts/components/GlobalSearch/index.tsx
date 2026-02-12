import { useState, useMemo, useEffect } from 'react';
import { Modal, Select, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMenuStore } from '@/store';
import styles from './index.module.css';

export default function GlobalSearch() {
  const navigate = useNavigate();
  const { menus } = useMenuStore();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Reset search value when modal closes/opens
  // useEffect(() => {
  //     if (!open) {
  //         setSearchValue('')
  //     }
  // }, [open])

  // 扁平化菜单并生成选项，同时保留主菜单上下文
  const options = useMemo(() => {
    const result: { name: string; path: string; rootName?: string }[] = [];

    const traverse = (items: any[], rootName?: string) => {
      items.forEach((item) => {
        if (item.hidden) return;

        if (item.children?.length) {
          // 传递一级菜单名称作为 rootName
          traverse(item.children, rootName || item.name);
        } else if (item.path) {
          result.push({
            name: item.name,
            path: item.path,
            rootName,
          });
        }
      });
    };

    traverse(menus);

    return result.map((item) => ({
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontWeight: 500 }}>{item.name}</span>
            {item.rootName && (
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  color: '#888',
                  backgroundColor: 'rgba(0,0,0,0.04)',
                  padding: '2px 6px',
                  borderRadius: 4,
                }}
              >
                {item.rootName}
              </span>
            )}
          </div>
          <span style={{ color: '#bbb', fontSize: 12 }}>{item.path}</span>
        </div>
      ),
      value: item.path,
      search: `${item.name} ${item.path} ${item.rootName || ''}`,
    }));
  }, [menus]);

  const handleSelect = (path: string) => {
    navigate(path);
    setSearchValue('');
    setOpen(false);
  };

  // 快捷键 Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className={styles.actionItem} onClick={() => setOpen(true)}>
        <SearchOutlined className={styles.icon} />
      </div>

      <Modal
        open={open}
        footer={null}
        closable={false}
        destroyOnClose
        onCancel={() => setOpen(false)}
        afterClose={() => setSearchValue('')}
        width={600}
        style={{ top: 100 }}
        className={styles.searchModal}
        maskClosable
      >
        <Select
          className={styles.searchSelect}
          showSearch
          value={undefined} // Don't show selected value
          searchValue={searchValue} // Control search input
          onSearch={setSearchValue}
          open={!!searchValue} // Only show dropdown when searching
          placeholder="搜索页面  快捷键：Ctrl + K (Win) 或 Cmd + K (Mac)  "
          defaultOpen={false}
          autoFocus
          defaultActiveFirstOption
          filterOption={(input, option) =>
            ((option as any)?.search || '')
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          onChange={handleSelect}
          options={options}
          notFoundContent={
            <div style={{ padding: '20px 0' }}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="未找到相关页面"
              />
            </div>
          }
          suffixIcon={
            <SearchOutlined style={{ fontSize: 18, color: '#999' }} />
          }
        />
      </Modal>
    </>
  );
}
