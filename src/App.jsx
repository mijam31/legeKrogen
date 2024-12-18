import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Announcement from "./components/announcement/announcement";
import Products from "./pages/products/Products";
import Faq from "./pages/faq/Faq";
import CustomerClub from "./pages/customerclub/CustomerClub";
import Footer from "./components/Footer";

function App() {
  const routes = useRoutes([
    { path: "/home", element: <Home /> },
    { path: "/products", element: <Products /> },
    { path: "/faq", element: <Faq /> },
    { path: "/customerclub", element: <CustomerClub /> },
    
  ]);
  return (
    <div>
      <Announcement />
      <Navigation />
      <div>{routes}</div>
      <Footer />
    </div>
  );
}

export default App;
