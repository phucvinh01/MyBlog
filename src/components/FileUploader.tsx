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
        <p className='text-primary'>Click or grap for change</p>
        </>
        
      ) : (
        <div className='flex flex-col justify-center items-center gap-2 file_uploader-box'>
          <div className='text-3xl'><GoUpload /></div>
          <h3 className='base-medium text-primary'>Drap photo here.</h3>
          <p className='small-regular text-primary text-sm'>PNG, JPG, SVG</p>
          <div className='btn-primary'>Select From Computer</div>
        </div>
      )}
    </div>

  );
};

export default FileUploader;
