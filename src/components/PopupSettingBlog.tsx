import { IBlog } from '@/types/backend';
import { Button, Divider, message, Popconfirm, Popover } from 'antd';
import { Delete, Edit, Save, Settings } from 'lucide-react';
import { useState } from 'react';
import ModalDeleteBlog from './ModalDeleteBlog';

const confirm = (e: any) => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = (e: any) => {
  console.log(e);
  message.error('Click on No');
};

const PopupSettingBlog = ({blog}:{blog:IBlog}) => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: any) => {
    setOpen(newOpen);
  };

  const content = (
    <>
      <div className='flex flex-col  px-1'>
        <ModalDeleteBlog slug={blog.slug as string} />
        <Divider style={{
            margin:"5px"
        }}/>
        <button title='Save' className='flex gap-1 items-center'>
          <span>
            <Save size={18} color='black'  />
          </span>
           <span>
            Save
          </span>
        </button>
         <Divider style={{
            margin:"5px"
        }}/>
        <button title='Edit' className='flex gap-1 items-center'>
          <span>
            <Edit size={18}  color='gray' />
          </span>
           <span>
            Edit 
          </span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <Popover
      zIndex={10}
        placement='rightTop'
        content={content}
        trigger='click'
        open={open}
        onOpenChange={handleOpenChange}>
        <Button
          type='link'
          ghost
          icon={
            <Settings
              className={`${open ? 'rotate-90' : ''} transition-transform`}
            />
          }
        />
      </Popover>
    </>
  );
};

export default PopupSettingBlog;
