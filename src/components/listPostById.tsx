import Card from '../components/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../redux/store';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { getPost } from '../redux/feature/post';
import { FaArrowLeft } from 'react-icons/fa';
import { getAccessTokenFromCookie } from './cookies';
import toast from 'react-hot-toast';


export default function ListPostById() {

    const { id } = useParams();
    const navigate = useNavigate();

    const listPost = useSelector((state: RootState) => state.posts.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const promis = axios.get(`https://www.googleapis.com/blogger/v3/users/self/blogs/${id}/posts`, {
            headers: {
                Authorization: `Bearer ${getAccessTokenFromCookie()}`,
            },
        }).then(res => {
            console.log(res.data);
            dispatch(getPost(res.data))
        }).catch(e => console.log(e))

        toast.promise(
            promis,
            {
              loading: 'Loading...',
              success: <b>Success</b>,
              error: <b>Could not save.</b>,
            }
          )
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
            <h1 className="text-2xl font-semibold mb-4">List Post</h1>
            {listPost !== null && (
                listPost.items.map((i, index) => {
                    return (
                        <Card key={index} uli={`post/${id}`} name={i.post.title} id={i.post.id} status={""} url={i.post.author.url} datapublish={i.post.published} />
                    )
                })
            )}
        </>
    )
}