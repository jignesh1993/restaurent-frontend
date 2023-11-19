import React, { useEffect, useState } from 'react';
import api from "../../utils/api";
import { Link, useNavigate, useParams } from 'react-router-dom';

interface Menu {
    name: string;
    price: number;
    restaurantId: string;
    available: boolean;
}

const AddMenu: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [newMenu, setNewMenu] = useState<Menu>({
        name: '',
        price: 0,
        restaurantId: id ? `${id}` : '',
        available: true,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewMenu((prevMenu) => ({ ...prevMenu, [name]: value }));
    };

    const handleAddMenu = async (e: any) => {
        e.preventDefault();
        const convertedPrice = typeof newMenu.price === 'string' ? parseFloat(newMenu.price) : newMenu.price;
        newMenu.price = convertedPrice;
        const response = await api.post('menu/create-menu', newMenu);
        
        if (response.status == 200) {
            navigate(`/restaurants/${id}`);
        }

        setNewMenu({
            name: '',
            price: 0,
            restaurantId: '',
            available: true,
        });
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Menu</h2>
            <div className="mt-8 mb-5">
                <Link
                    to="/"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full inline-block transition duration-300"
                >
                    Back
                </Link>
            </div>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={newMenu.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600">Price:</label>
                    <input
                        type="text"
                        name="price"
                        value={newMenu.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleAddMenu}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
                >
                    Add Menu
                </button>
            </form>
        </div>
    );
};

export default AddMenu;
