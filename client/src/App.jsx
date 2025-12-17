import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import MarketPlace from './pages/MarketPlace'
import MyListing from './pages/MyListing'
import ListingDetails from './pages/ListingDetails'
import ManageListing from './pages/ManageListing'
import Messages from './pages/Messages'
import MyOrders from './pages/MyOrders'
import Loading from './pages/Loading'
import Navbar from './components/Navbar'
import Projects from './components/Projects'

import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  const {pathname} = useLocation();
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>  
      {!pathname.includes('/admin') && !pathname.includes('/projects') && <Navbar />}
     
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/my-listings" element={<MyListing />} />
        <Route path="/listing/:listingId" element={<ListingDetails />} />
        <Route path="/create-listing" element={<ManageListing />} />
        {/* in the projects route hide navbar */}
        
        <Route path="/projects" element={<Projects/>} />
        <Route path="/edit-listing/:id" element={<ManageListing />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
  )
}

export default App
