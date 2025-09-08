import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import VerifyEmail from "./pages/Register/VerifyEmail";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home/Home";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Search from "./pages/Search/Search";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Shop from "./pages/Shop/Shop";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />

        {/* Shop and Product */}
        <Route path="shop" element={<Shop />} />
        <Route path="product-detail" element={<ProductDetail />} />

        <Route element={<ProtectedRoute requireAuth={true} />}>
          {/* Cart and Checkout */}
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Auth */}
        <Route element={<ProtectedRoute requireAuth={false} />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
