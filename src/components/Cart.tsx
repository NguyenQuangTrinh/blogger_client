import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { getAccessTokenFromCookie } from './cookies';
import { useDispatch } from 'react-redux';
import { deletePostById } from '../redux/feature/post';
import toast from 'react-hot-toast';

interface CardProps {
  name: string;
  status: string;
  id: string;
  url: string;
  datapublish: string;
  uli: string;
}

const Card: React.FC<CardProps> = ({ name, status, url, datapublish, id, uli }) => {

  const dispatch = useDispatch();

  function deletePost() {
    console.log(id);
    console.log(uli.split('/')[1]);
    const deletes = axios.delete(`https://www.googleapis.com/blogger/v3/blogs/${uli.split('/')[1]}/posts/${id}`, {
      headers: { Authorization: `Bearer  ${getAccessTokenFromCookie()}` }
    })
      .then(res => {
        dispatch(deletePostById({id: id}))
      })
      .catch(e => {
        console.log(e);
      })

      toast.promise(
        deletes,
        {
          loading: 'Deleting...',
          success: <b>Deleted</b>,
          error: <b>Delete Error.</b>,
        }
      )
  }

  return (
    <div className="max-w-md bg-white shadow-lg rounded-md overflow-hidden mx-auto m-4 hover:shadow-2xl">
      <NavLink to={`/${uli}/${id}`}>
        <div className="p-4">
          {/* Tên */}
          <h2 className="text-xl font-semibold mb-2">{name}</h2>

          {/* Trạng thái */}
          <p className="text-gray-600 mb-2">Status: {status}</p>

          {/* URL */}
          <p className="text-blue-500 mb-2">
            <span rel="noopener noreferrer">
              {url}
            </span>
          </p>

          {/* Ngày xuất bản */}
          <p className="text-gray-500">Published on: {datapublish}</p>

        </div>
      </NavLink>
      {
        uli !== "listPost" && <div className='p-3'>
          <MdDelete onClick={() => deletePost()} className="w-5 h-5" />
        </div>
      }
    </div>
  );
};

export default Card;
