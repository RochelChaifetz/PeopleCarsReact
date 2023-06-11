import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import AddCar from './AddCar';
import DeleteCars from './DeleteCars';
import Layout from './Layout';
import AddPerson from './AddPerson';

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addperson" element={<AddPerson />} />
                <Route path="/addcar/:personId" element={<AddCar />} />
                <Route path="/deletecars/:personId" element={<DeleteCars />} />
            </Routes>
        </Layout>
    );
};

export default App;
