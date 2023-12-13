import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoIosAdd } from "react-icons/io"; // Import icon từ thư viện react-icons
import { Profile } from '../Object/profile';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getAccessTokenFromCookie, handleRemoveCookie } from '../components/cookies';
import { Toaster } from 'react-hot-toast'
import { googleLogout } from '@react-oauth/google';


function Home() {
    const [selectedMenuItem, setSelectedMenuItem] = useState<any>(null);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<Profile>();
    const navigate = useNavigate();
    const location = useLocation();

    const path = location.pathname.split("/");


    useEffect(() => {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
                headers: {
                    Authorization: `Bearer ${getAccessTokenFromCookie()}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                console.log(res);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err.response.data.error.status)
                if (err.response.data.error.status == "UNAUTHENTICATED") {
                }
            });
    }, [])



    const menuItems = [
        { id: 1, label: 'Blooger', content: 'ListBlogger', path: "read" },
        // Thêm các mục khác cần thiết
    ];

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const logout = () => {
        handleRemoveCookie();
        googleLogout();
        navigate("/login")
    }

    return (
        <div onClick={() => isMobileMenuOpen && setMobileMenuOpen(false)} className="min-h-screen staic flex flex-col md:flex-row">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {/* Icon menu trên điện thoại */}
            <div className="md:hidden fixed top-4 left-4">
                <button
                    onClick={toggleMobileMenu}
                    className="text-gray-400 cursor-pointer focus:outline-none"
                >
                    <FaBars />
                </button>
            </div>

            {/* Cột menu */}
            <div
                className={`bg-white min-h-screen fixed text-gray-800 w-1/4 p-4 md:w-64 shadow-lg ${isMobileMenuOpen ? 'md:translate-x-0' : '-translate-x-full md:translate-x-0'
                    } transform transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col`}
            >
                {/* Phần đầu của menu */}
                <div className="flex flex-col items-center mb-4">
                    <div className="rounded-full overflow-hidden mr-3">
                        <img
                            src={user?.picture}
                            alt="Avatar"
                            className="w-8 h-8 object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">{user?.name}</p>
                        {/* Các thông tin khác của người dùng */}
                    </div>
                </div>

                {/* Các mục trong menu */}
                <div className='flex flex-col'>
                    {/* {menuItems.map((item) => (
                        <Link
                            to={`/${item.path}`}
                            key={item.id}
                            className={`text-gray-400 cursor-pointer ${selectedMenuItem === item.id ? 'font-bold text-gray-700' : ''
                                }`}
                            onClick={() => {
                                setSelectedMenuItem(item.id);
                                setMobileMenuOpen(false);
                            }}
                        >
                            {item.label}
                        </Link>
                    ))} */}
                </div>

                {/* Nút đăng nhập ở cuối menu */}
                <div className="mt-auto"> {/* Sử dụng mt-auto để đẩy nút xuống cuối cùng */}
                    <button onClick={() => logout()} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Logout
                    </button>
                </div>
            </div>

            {/* Cột nội dung chính */}
            <div className="flex-1 overflow-y-auto md:pl-72 p-8">
                <Outlet />
                {
                    location.pathname.search("listPost") > -1 &&
                    <div onClick={() => navigate(`/addPost/${path[path.length-1]}`)} className='fixed top-5 right-5'><IoIosAdd className='w-10 h-10 border rounded-full hover:bg-slate-200 cursor-pointer' /></div>

                }
            </div>
        </div>
    );
}

export default Home;
