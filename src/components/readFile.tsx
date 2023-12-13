import React, { useState, ChangeEvent } from 'react';
import mammoth from 'mammoth';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getAccessTokenFromCookie } from './cookies';

const WordFileUploader: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();
  const { id } = useParams();


  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const fileDataArray: any[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const reader = new FileReader();

        reader.onload = async (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;

          try {
            const result = await mammoth.convertToHtml({ arrayBuffer });
            fileDataArray.push({ name: file.name, content: result.value });
            uploadPostBlogger(result.value, file.name)
            if (fileDataArray.length === selectedFiles.length) {
              // Set the state when all files are processed
              console.log(fileDataArray);
              setFiles(fileDataArray);
            }
          } catch (error) {
            console.error('Error converting docx to HTML:', error);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };


  function uploadPostBlogger(content: string, title: string) {
    console.log(content);
    axios.post(`https://www.googleapis.com/blogger/v3/blogs/${id}/posts/`, {
      "kind": "blogger#post",
      "blog": {
        "id": "8070105920543249955"
      },
      "title": title,
      "content": content
    },
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
          "Content-Type": "application/json"
        },
      }
    ).then(res => console.log(res.data.item)).catch(e => console.log(e));
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Add new post</h1>
      <div className="flex items-center my-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
      <label className="block">
        <span className="sr-only">Choose post</span>
        <input type="file" multiple onChange={handleFileChange} className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
      </label>
      {files && (
        <div>
          <h3 className='text-2xl font-bold'>Post {page}</h3>
          {
            <div >
              <p className='my-2 text-lg font-bold'>Name: {files[page]?.name}</p>
              <div dangerouslySetInnerHTML={{ __html: files[page]?.content }} />
            </div>
          }
          <div className='width-full mt-5 flex flex-row justify-between' >
            <button
              onClick={() => setPage(page - 1)}
              disabled={page == 0 ? true : false}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              back
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page + 1 == files.length ? true : false}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Next
            </button>
          </div>


          {/* {files?.map((fileData, index) => (
            <div key={index}>
              <p>{fileData.name}</p>
              <div dangerouslySetInnerHTML={{ __html: fileData.content }} />
            </div>
          ))} */}
        </div>
      )}
      {/* <button onClick={()=> uploadPostBlogger()} >them</button> */}
    </>
  );
};

export default WordFileUploader;
