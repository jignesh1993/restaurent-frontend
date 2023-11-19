import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../../utils/api"
interface Restaurant {
    _id: string;
    name: string;
    address: string;
    details: string;
    contactNumber: string
}

const RestaurantList: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/restaurent/get-all-restaurents');
                setRestaurants(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [restaurants]);

    const handleDelete = async (id: string) => {
        try {
            const response = await api.delete(`/restaurent/delete-restaurent/${id}`);

            if (response.status === 200) {
                const updatedResponse = await api.get('/restaurent/get-all-restaurents');
                setRestaurants(updatedResponse.data);
            }
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    }

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700">
                Explore Delicious Restaurants
            </h2>
            <div className="mt-8 mb-5 text-center">
                <Link
                    to="/addrestaurent"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full inline-block transition duration-300"
                >
                    Add New Restaurant
                </Link>
            </div>
            <div className="flex flex-wrap -mx-4">
                {restaurants?.map((restaurant: any) => (
                    <div key={restaurant._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8">
                        <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-300">
                            <img
                                src={`https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600"`}
                                alt={restaurant.name}
                                className="w-full h-40 object-cover object-center"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-cambria font-bold mb-2">{restaurant.name}</h3>
                                <p className="text-gray-600 font-cambria font-bold mb-2">{restaurant.cuisine} cuisine</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 mr-2"
                                        onClick={() => {
                                            navigate(`/addrestaurent/${restaurant._id}`)
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 mr-2"
                                        onClick={() => handleDelete(restaurant._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
                                        onClick={() => {
                                            navigate(`/restaurants/${restaurant._id}`)
                                        }}
                                    >
                                        View Menu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantList;
