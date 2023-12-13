import axios from 'axios';
import { useDispatch } from 'react-redux'
import { getAllBlogger } from '../redux/feature/dataBlog';
import { getAccessTokenFromCookie } from './cookies';

const fetchBloggerPosts = async () => {
    const dispatch = useDispatch();

  try {
    const response = await axios.get('https://www.googleapis.com/blogger/v3/users/self/blogs', {
      headers: {
        Authorization: `Bearer ${getAccessTokenFromCookie()}`,
      },
    });

    const posts = response.data.items;
    dispatch(getAllBlogger(posts));
    console.log(posts);
  } catch (error) {
    console.error('Error fetching Blogger posts:', error);
  }
};

export default fetchBloggerPosts;
