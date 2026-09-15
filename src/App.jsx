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

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const restoreSession = async () => {
      const { data: { session }, } = await supabase.auth.getSession()

      if (session) {
        dispatch(setAuth({ user: session.user, session: session }))
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
          <Route path="/cart" element={<CartContainer />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
