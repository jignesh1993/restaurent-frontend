import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from "../../utils/api"
interface Restaurant {
  _id: string;
  name: string;
  address: string;
  details: string;
  contactNumber: string
}
interface Menu {
  _id: string,
  name: string,
  price: string,
  restaurantId: string,
  available: boolean,
}

const RestaurantDetails: React.FC = () => {
  const [selectedRestaurant, setselectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedRestaurantMenu, setselectedRestaurantMenu] = useState<Menu[] | null>(null);
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/restaurent/get-restaurent/${id}`);
        setselectedRestaurant(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await api.get(`/menu/get-menu/${id}`);
        setselectedRestaurantMenu(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMenuData();
  }, [selectedRestaurantMenu]);

  const handleDeleteMenu = async (id: string) => {
    try {
      const response = await api.delete(`/menu/delete-menu/${id}`);

      if (response.status === 200) {
        const updatedResponse = await api.get(`/menu/get-menu/${id}`);
        setselectedRestaurantMenu(updatedResponse.data);
      }
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700">
        {selectedRestaurant?.name} Details
      </h2>

      <div className="mt-8 mb-5">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full inline-block transition duration-300"
        >
          Home
        </Link>

        <Link
          to={`/addmenu/${id}`}
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full inline-block transition duration-300"
        >
          Add Menu
        </Link>
      </div>

      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-3/3 px-4 mb-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-300">
            <img
              src={`https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600`}
              alt={selectedRestaurant?.name}
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-4">
              <h3 className="text-lg font-cambria font-bold mb-2">{selectedRestaurant?.address}</h3>
              <p className="text-gray-600 font-cambria font-bold mb-2">{selectedRestaurant?.details}</p>
              <p className="text-gray-600 font-cambria font-bold mb-2">{selectedRestaurant?.contactNumber}</p>
            </div>
          </div>
        </div>
        <div className="w-full px-4 mb-8">
          <div className="bg-white rounded-sm overflow-hidden">
            {selectedRestaurantMenu && selectedRestaurantMenu?.length > 0 && <h3 className="text-lg font-bold mb-4 p-4 bg-gray-200">Menu</h3>}
            <div className="flex flex-wrap -mx-4">
              {selectedRestaurantMenu?.map((menuItem: any, index: number) => (
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-4">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-300">
                    <img
                      src={`https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600`}
                      alt={menuItem.name}
                      className="w-full h-40 object-cover object-center"
                    />
                    <div className="p-4">
                      <h4 className="font-cambria font-bold mb-2">{menuItem.name}</h4>
                      <h4 className="font-cambria font-bold mb-2">₹{menuItem.price}</h4>
                      {menuItem.available === true ? <button className="bg-lime-600 font-cambria font-bold text-white py-2 px-4 rounded-full">
                        Available
                      </button> : <button className="bg-orange-400 font-cambria font-bold text-white py-2 px-4 rounded-full">
                        Not Available
                      </button>}

                      <button
                        className="bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 ml-2"
                        onClick={() => {
                          navigate(`/updatemenu/${menuItem._id}`)
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteMenu(menuItem._id)}
                        className="bg-red-500 font-cambria font-bold text-white py-2 px-4 rounded-full mt-2 hover:bg-red-600 ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
