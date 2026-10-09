import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchContainer from "./pages/searchPage/SearchContainer";
import Preview from "./pages/previewPage/Preview";
import CartContainer from "./pages/cartPage/CartContainer";
import Register from "./pages/register/Register";
import Login from "./pages/loginPage/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import { logout, setAuth } from "./slice/authSlice";
import ProtectedRoute from "./components/UI/ProtectedRoute";
import WishListWrapper from "./pages/wishlistPage/WishListWrapper";
import CheckoutContainer from "./pages/checkout/CheckoutContainer";
import OrdersContainer from "./pages/orders/OrdersContainer";
import ViewOrderContainer from "./pages/viewOrderPage/ViewOrderContainer";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import AdminProtectedRoute from "./components/UI/AdminProtected";
import ManageProducts from "./pages/admin/manageProductsPage/ManageProducts";
import { setAdminAuth } from "./slice/adminAuthSlice";
import ManageOrders from "./pages/admin/manageOrdersPage/ManageOrders";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AddProduct from "./pages/admin/manageProductsPage/addProductPage/AddProduct";
import UpdateProduct from "./pages/admin/manageProductsPage/updateProductPage/UpdateProduct";


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const restoreSession = async () => {
      const { data: { session }, } = await supabase.auth.getSession()

      if (session) {
        dispatch(setAuth({ user: session.user, session: session }))
        dispatch(setAdminAuth({ user: session.user, session: session }))
      } else {
        dispatch(logout())
      }
    }
    restoreSession()
  }, [dispatch])


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchContainer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Preview />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartContainer />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/wishlist" element={<WishListWrapper />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckoutContainer />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/orders" element={<OrdersContainer />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path={`/orders/:id`} element={<ViewOrderContainer />} />
          </Route>
          {/* admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<AdminProtectedRoute />}>
            <Route path="/manage-products" element={<ManageProducts />} />
          </Route>
          <Route element={<AdminProtectedRoute />}>
            <Route path="/manage-products/add" element={<AddProduct />} />
          </Route>
          <Route element={<AdminProtectedRoute />}>
            <Route path="/manage-products/edit/:id" element={<UpdateProduct />} />
          </Route>
          <Route element={<AdminProtectedRoute />}>
            <Route path="manage-orders" element={<ManageOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
