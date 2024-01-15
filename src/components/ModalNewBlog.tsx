'use client';
import React, { useId, useState } from 'react';
import { Modal, message } from 'antd';
import { IoCreateOutline } from 'react-icons/io5';
import FileUploader from './FileUploader';
import { IoCloseOutline } from 'react-icons/io5';
import { storage } from '@/config/firebaseConfig';
import { FileWithPath } from 'react-dropzone';
import { useSession } from 'next-auth/react';
import Editor from './RichTextEditor';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import TextArea from 'antd/es/input/TextArea';
const ModalNewBlog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<FileWithPath[]>([]);
  const [imageAsUrl, setImageAsUrl] = useState<string>('');
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [location, setLocation] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const id = useId();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (
      title === '' ||
      tag === '' ||
      location === '' ||
      caption === '' ||
      image.length === 0
    ) {
      message.error('Please fill out all fields');
      setLoading(false);
      return;
    } else {
      const file = image[0];


      // const response = await fetch(`/api/upload?filename=${file.name}`, {
      //   method: 'POST',
      //   body: file,
      // });

      // const newBlob = (await response.json()) as PutBlobResult;
      const storageRef = ref(storage, `files/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setImageAsUrl(downloadURL)
        });
      });

      const blog = {
        title,
        tag,
        location,
        caption,
        image: imageAsUrl,
        author: session?.userId,
      };


      try {
        const res = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            blog,
          }),
        });
        if (res.status === 400) {
          message.error('failed');
          setLoading(false);
        }
        if (res.status === 200) {
          message.success('success');
          setLoading(false);
          setCaption('');
          setLocation('');
          setTag('');
          setTitle('');
          handleCancel();
        }
      } catch (error) {
        console.log(error);
        message.error('failed');
        setLoading(false);
      }
    }
  };

  return (
    <div className='w-full'>
      <button
        onClick={showModal}
        className='flex items-center gap-3   focus:ring-2, focus:ring-blue-500, focus:ring-opacity-50'>
        <IoCreateOutline />
        <p>New</p>
      </button>
      <Modal
        centered
        className='relative w-full'
        footer={null}
        closeIcon={null}
        width={1100}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div className='flex justify-end absolute right-[-10px] top-[-10px] p-1'>
          <button
            className='btn-primary-rounded '
            onClick={handleCancel}>
            {' '}
            <span className='text-xl'>
              <IoCloseOutline />
            </span>
          </button>
        </div>
        <form className='flex gap-4 flex-col'>
          <div className='flex justify-center items-center p-4 border-2 rounded-md min-w-[45%]'>
            <FileUploader onChange={setImage} />
          </div>
          <div className='w-full p-4 flex gap-5 flex-col'>
            <div className='flex gap-2 flex-col justify-center'>
              <label
                className=' text-primary'
                htmlFor={id + 'title'}>
                Title
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type='text'
                id={id + 'title'}
                max={2200}
                className='focus:border-[#333] px-3 py-1 w-full border-b-[2px] outline-none rounded-[20px]'
              />
            </div>
            <div className='flex gap-2 flex-col justify-center'>
              <label
                className=' text-primary'
                htmlFor={id + 'caption'}>
                Caption
              </label>
              {/* <TextArea
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
                maxLength={2200}
                showCount
                size='large'
                id={id + 'caption'}
                style={{
                  height:220
                }}
                className=' focus:!border-[#333] px-3 py-1 w-full !border-b-[2px] !outline-0 hover:!border-[#333]  focus-within:!outline-0  rounded-sm'
              /> */}
              <Editor setValue={setCaption} value={caption} />
            </div>
            <div className='flex gap-2 flex-col justify-center'>
              <label
                className=' text-primary'
                htmlFor={id + 'Tag'}>
                Tag
              </label>
              <input
                onChange={(e) => setTag(e.target.value)}
                value={tag}
                type='text'
                id={id + 'Tag'}
                max={2200}
                className='focus:border-[#333] px-3 py-1 w-full border-b-[2px] outline-none rounded-[20px]'
              />
            </div>
            <div className='flex gap-2 flex-col justify-center'>
              <label
                className=' text-primary'
                htmlFor={id + 'Location'}>
                Location
              </label>
              <input
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                type='text'
                id={id + 'Location'}
                max={2200}
                className='focus:border-[#333] px-3 py-1 w-full border-b-[2px] outline-none rounded-[20px]'
              />
            </div>
          </div>
        </form>
        <div className='flex justify-end'>
          <button
            onClick={handleSubmit}
            type='submit'
            disabled={loading}
            className='btn-primary'>
            {loading ? 'Creating...' : 'Create'}{' '}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalNewBlog;
