import React, {  useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { GoUpload } from "react-icons/go";
type FileUploaderProps = {
  mediaUrl?: string;
  onChange: React.Dispatch<React.SetStateAction<FileWithPath[]>>
};

const FileUploader = ({ mediaUrl, onChange }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const [file, setFile] = useState<File[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
      console.log("check accptedFile", acceptedFiles[0]);
      onChange(acceptedFiles);
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', 'jpg', '.svg', '.jpeg', '.webp'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className='file flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input className='cursor-pointer' {...getInputProps()} />
      {fileUrl ? (
        <>
        <div className='flex flex-1 justify-center p-1 w-full lg:p-4'>
            <img className='rounded-xl object-cover'  src={fileUrl} />
        </div>
        <p className='file_uploader-label'>Click or grap for change</p>
        </>
        
      ) : (
        <div className='flex flex-col justify-center items-center gap-2 file_uploader-box'>
          <div className='text-3xl'><GoUpload /></div>
          <h3 className='base-medium text-light-2'>Drap photo here.</h3>
          <p className='small-regular text-light-2 text-sm'>PNG, JPG, SVG</p>
          <button className='shad-button_dark_4'>Select From Computer</button>
        </div>
      )}
    </div>

  );
};

export default FileUploader;
