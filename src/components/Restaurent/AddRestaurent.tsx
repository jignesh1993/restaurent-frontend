// components/AddRestaurant.tsx
import React, { useEffect, useState } from 'react';
import api from "../../utils/api";
import { Link, useNavigate, useParams } from 'react-router-dom';


interface Restaurant {
    name: string;
    address: string;
    details: string;
    contactNumber: string;
}

const AddRestaurant: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [newRestaurant, setNewRestaurant] = useState<Restaurant>({
        name: '',
        address: '',
        details: '',
        contactNumber: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/restaurent/get-restaurent/${id}`);
                setNewRestaurant(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewRestaurant((prevRestaurant) => ({ ...prevRestaurant, [name]: value }));
    };

    const handleAddRestaurant = async () => {
        if (id == undefined) {
            const response = await api.post('restaurent/create-restaurent', newRestaurant);
            if (response.status == 201) {
                navigate('/');
            }
        } else {
            const response = await api.put(`restaurent/update-restaurent/${id}`, newRestaurant);
            if (response.status == 200) {
                navigate('/');
            }
        }

        setNewRestaurant({
            name: '',
            address: '',
            details: '',
            contactNumber: '',
        });
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">{id == undefined ? "Add Restaurant" : "Update Restaurant"}</h2>
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
                        value={newRestaurant.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={newRestaurant.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600">Details:</label>
                    <textarea
                        name="details"
                        value={newRestaurant.details}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600">Contact Number:</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={newRestaurant.contactNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleAddRestaurant}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
                >
                    {id == undefined ? "Add Restaurant" : "Update Restaurant"}
                </button>
            </form>
        </div>
    );
};

export default AddRestaurant;
