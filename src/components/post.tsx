import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { FaArrowLeft } from 'react-icons/fa';
import { getAccessTokenFromCookie } from './cookies';
import { getPostByIds } from '../redux/feature/postById';
import { toast } from "react-hot-toast"


export const Post: React.FC = () => {

  const { idBlog, idPost } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => state.postById.value);
  const navigate = useNavigate();

  const getPostById = (idBlog: string | undefined, idPost: string | undefined) => {

    const promis = axios.get(`https://www.googleapis.com/blogger/v3/blogs/${idBlog}/posts/${idPost}`, {
      headers: {
        Authorization: `Bearer ${getAccessTokenFromCookie()}`,
      },
    }).then(res => {
      dispatch(getPostByIds(res.data))
    }).catch(e => console.log(e))

    toast.promise(
      promis,
      {
        loading: 'Loading...',
        success: <b>Success</b>,
        error: <b>Could not save.</b>,
      }
    )

  }

  useEffect(() => {
    getPostById(idBlog, idPost);
  }, [])


  return (
    <>
      <div className="flex items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
      <div className="max-w-3xl mx-auto my-8">
        <a href={post?.url} >Xem bài post</a>
        <h3 className="text-xl font-semibold mb-2">{post?.author.displayName}</h3>

        <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: post?.content }} />
      </div>
    </>
  );
};

