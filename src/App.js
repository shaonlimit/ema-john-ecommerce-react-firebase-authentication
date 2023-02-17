import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ManageInventory from "./components/ManageInventory/ManageInventory";
import ReviewOrder from "./components/ReviewOrder/ReviewOrder";
import NotFound from "./components/NotFound/NotFound";

import ProductDetails from "./components/ProductDetails/ProductDetails";
import OrderPage from "./components/OrderPage/OrderPage";
import Shipment from "./components/Shipment/Shipment";
import Login from "./components/Login/Login";
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const MyContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <MyContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <p>{loggedInUser.name}</p>
        <p>{loggedInUser.email}</p>
        <Header></Header>


        <Routes>
          <Route path="/" element={<Shop></Shop>}></Route>
          <Route path="/shop" element={<Shop></Shop>}></Route>

          <Route path="/review-order" element={<ReviewOrder></ReviewOrder>}></Route>

          <Route path="/*" element={<PrivateRoute></PrivateRoute>}>
            <Route path="shipment" element={<Shipment></Shipment>}></Route>
            <Route path="manage-inventory" element={<ManageInventory />}></Route>

          </Route>

          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/products/:productKey" element={<ProductDetails></ProductDetails>} />
          <Route path="/order-page" element={<OrderPage></OrderPage>} />
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>

      </Router>
    </MyContext.Provider>
  );
}

export default App;
