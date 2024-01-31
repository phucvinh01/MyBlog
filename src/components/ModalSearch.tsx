import { useState } from 'react';
import { Modal,Divider  } from 'antd';
import { CiSearch } from 'react-icons/ci';
import { MdClose } from 'react-icons/md';
const ModalSearch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button
        onClick={showModal}
        className='border border-transparent rounded-full bg-[#f3f4f6] text-xl px-4 lg:px-5 py-2 lg:py-2.5'>
        <CiSearch />
      </button>

      <Modal
        footer={null}
        closeIcon={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        centered
        >
        <div className='overflow-scroll'>
            <div className='flex gap-1 justify-between items-center'>
            <div className='w-[80%] gap-1 flex p-1'>
                <button className='text-lg'>
                <CiSearch />
                </button>
                <input
                className='py-1 focus:outline-none w-full'
                type='text'
                />
            </div>

            <button onClick={handleCancel} className='text-lg'>
                <MdClose />
            </button>
            </div>
            <Divider  />
            <h3>POSTS</h3>
            <Divider  />

            <div className='h-[350px]'></div>

        </div>
        
      </Modal>
    </>
  );
};

export default ModalSearch;
