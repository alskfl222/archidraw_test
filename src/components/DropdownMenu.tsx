import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const DropdownMenu = (props: {
  idx: number;
  downloadFn: (idx: number) => void;
  deleteFn: (idx: number) => void;
}) => {
  const { idx, downloadFn, deleteFn } = props;
  const DropdownOptions = (idx: number) => (
    <Menu>
      <Menu.Item key='0' onClick={() => downloadFn(idx)}>
        Download
      </Menu.Item>
      <Menu.Item key='1' onClick={() => deleteFn(idx)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={DropdownOptions(idx)}
      trigger={['click']}
      placement='bottomRight'
    >
      <a
        className='ant-dropdown-link'
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );
};

export default DropdownMenu;
