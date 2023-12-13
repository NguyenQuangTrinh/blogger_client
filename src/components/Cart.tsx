import React from 'react';
import { NavLink } from 'react-router-dom';

interface CardProps {
  name: string;
  status: string;
  id: string;
  url: string;
  datapublish: string;
  uli: string;
}

const Card: React.FC<CardProps> = ({ name, status, url, datapublish, id, uli }) => {

 
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
    </div>
  );
};

export default Card;
