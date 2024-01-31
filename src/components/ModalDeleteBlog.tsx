import React, { useState } from 'react';
import { Button, Divider, Modal, message } from 'antd';
import { Delete, Trash } from 'lucide-react';
import { deleteBlogBySlug } from '@/services/blogServices';


const ModalDeleteBlog = ({slug}:{slug:string}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      const result = await fetch(`/api/blog/${slug}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if(result) message.success("Deleted")
      else message.error("Delete failed");
    } catch (error: any) {
      message.info(error)
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
   <>
      <button onClick={() => showModal()} title='Delete' className='flex gap-1 items-center'>
          <span>
            <Trash color='black' size={18}  />
          </span>
          <span className='text-black'>
            Delete
          </span>
        </button>
      <Modal centered width={300} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
      okText={"Delete"}
      okButtonProps={
        {
          danger: true,
        }
      }
      >
        <div>
          <h2 className="font-bold text-lg">Are you sure?</h2>
          <Divider style={{
            margin:"10px"
          }} />
          <p>You can not restore, if you want to delete it.</p>
        </div>
       
      </Modal>
    </>
  )
}

export default ModalDeleteBlog