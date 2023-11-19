import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

interface Menu {
    name: string;
    price: number;
    available: boolean;
}

const UpdateMenu: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [updatedMenu, setUpdatedMenu] = useState<Menu>({
        name: '',
        price: 0,
        available: false,
    });

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await api.get(`/menu/get-menu-by-id/${id}`);
                setUpdatedMenu(response.data[0]);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        fetchMenu();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUpdatedMenu((prevMenu) => ({ ...prevMenu, [name]: value }));
    };

    const handleUpdateMenu = async () => {
        try {
            const response = await api.put(`/menu/update-menu/${id}`, updatedMenu);
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error updating menu:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Update Menu</h2>
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
                        value={updatedMenu.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={updatedMenu.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600">Availability:</label>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="available"
                            name="available"
                            value="true"
                            checked={updatedMenu.available === true}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <label htmlFor="available">Available</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="notAvailable"
                            name="available"
                            value="false"
                            checked={updatedMenu.available === false}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <label htmlFor="notAvailable">Not Available</label>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleUpdateMenu}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
                >
                    Update Menu
                </button>
            </form>
        </div>
    );
};

export default UpdateMenu;
