// src/App.tsx
import React from 'react';
import RestaurantList from './components/Restaurent/RestaurantList';
import { Route, Routes } from 'react-router-dom';
import RestaurantDetails from './components/Restaurent/RestaurantDetail';
import AddRestaurant from './components/Restaurent/AddRestaurent';
import AddMenu from './components/Menu/AddMenu';
import UpdateMenu from './components/Menu/UpdateMenu';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RestaurantList />}/>
        <Route path="/restaurants/:id" element={<RestaurantDetails />}/>
        <Route path='/addrestaurent' element={<AddRestaurant />}/>
        <Route path='/addrestaurent/:id' element={<AddRestaurant />}/>
        <Route path='/addmenu/:id' element={<AddMenu />}/>
        <Route path='/updatemenu/:id' element={<UpdateMenu />}/>
      </Routes>
    </div>
  );
};

export default App;
