import { getAllBlogger } from '../redux/feature/dataBlog';
import Card from '../components/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../redux/store';
import axios from 'axios';
import { getAccessTokenFromCookie } from './cookies';


export default function ListBlogger(){
    const listBlogger = useSelector((state: RootState) => state.bloggers.value);
    const dispatch = useDispatch();



    useEffect(() => {
        try {
            axios.get('https://www.googleapis.com/blogger/v3/users/self/blogs', {
                headers: {
                    Authorization: `Bearer ${getAccessTokenFromCookie()}`,
                },
            }).then(
                (res) => {
                    dispatch(getAllBlogger(res.data.items));
                }
            ).catch(e => console.log(e))

        } catch (error) {
            console.error('Error fetching Blogger posts:', error);
        }
    }, [])
    return(
        <>
        <h1 className="text-2xl font-semibold mb-4">List Blogger</h1>
        {listBlogger !== null && (
                    listBlogger.map((i,  index) => {
                        return (
                            <Card key={index} uli='listPost' name={i.name} id={i.id} status={i.status} url={i.url} datapublish={i.published} />
                        )
                    })
                )}
        </>
    )
}