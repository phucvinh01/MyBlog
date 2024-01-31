import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


type EditorProps = {
  value: string ,
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function Editor({value, setValue}:EditorProps) {

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'color', 'image'],
      [{ 'code-block': true }],
      ['clean'],
    ],
  };
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'indent',
    'image',
    'code-block',
    'color',
  ];

  const contentStyle = {
    blockquote: {
      borderLeft: '2px solid #ddd',
      paddingLeft: '10px',
      fontStyle: 'italic',
      color: '#888',
      margin: '0',
    },
  };

  return (
    <div className='relative'>
      <ReactQuill
        theme='snow'
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        
        />
    </div>
  );
}
