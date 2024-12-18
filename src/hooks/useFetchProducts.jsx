import { use } from "react";
import { useState, useEffect } from "react";

const useFetchProducts = () => {
  // her opretter vi en state til produkterne

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // her henter vi produkterne fra API'en

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://legekrogen.webmcdm.dk/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      // hvis der er en fejl, så udskriver vi fejlen
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // her filtrerer jeg productet så i apiet er recommended det precis samme som true
  let recommended = products.filter((e) => e.recommended === true);

  // her udskriver jeg produkterne

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, recommended, error, isLoading };
};

export default useFetchProducts;
