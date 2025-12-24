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
import ChatBox from './components/ChatBox'
import {Toaster} from 'react-hot-toast'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AllListings from './pages/admin/AllListings'
import CredentialChange from './pages/admin/CredentialChange'
import CredentialVerify from './pages/admin/CredentialVerify'
import Transactions from './pages/admin/Transactions'
import Withdrawal from './pages/admin/Withdrawal'

const App = () => {

  const {pathname} = useLocation();
  return (
    <div>
      <Toaster />
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
        <Route path="/admin" element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="verify-credentials" element={<CredentialVerify/>}/>
          <Route path="change-credentials" element={<CredentialChange/>}/>
          <Route path="list-listings" element={<AllListings/>}/>
          <Route path="transactions" element={<Transactions/>}/>
          <Route path="withdrawal" element={<Withdrawal/>}/>

        </Route>
      </Routes>
      <ChatBox/>
    </div>
  )
}

export default App
