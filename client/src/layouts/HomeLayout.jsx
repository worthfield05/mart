import { Outlet } from "react-router-dom";
import Header from "../components/common/Header/Header";
import Footer from "../components/common/Footer/Footer";
import MobileButtonBar from "../components/common/Mobile/MobileButtonBar";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <MobileButtonBar />
      <Footer />
    </>
  );
};

export default HomeLayout;
