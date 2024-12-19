import { use } from "react";
import { useState, useEffect } from "react";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]); // State til at gemme listen af produkter hentet fra API'et.
  const [error, setError] = useState(null); // State til at gemme fejlmeddelelsen, hvis noget går galt.
  const [isLoading, setIsLoading] = useState(false); // State til at indikere, om der er et igangværende API-kald.

  // Funktion til at hente produkterne fra API'et
  const fetchProducts = async () => {
    try {
      setIsLoading(true); // Sætter `isLoading` til true, mens produkterne hentes.
      const response = await fetch("https://legekrogen.webmcdm.dk/products"); // Gør et GET-kald til API-endpointet.
      const data = await response.json(); // Konverterer API-svaret til JSON.
      setProducts(data); // Gemmer de hentede produkter i `products` state.
    } catch (error) {
      setError(error.message); // Gemmer fejlmeddelelsen i `error` state, hvis der opstår fejl.
      console.log(error); // Logger fejlen til debugging.
    } finally {
      setIsLoading(false); // Sætter `isLoading` til false, når kaldet er færdigt (uanset succes eller fejl).
    }
  };

  // Filtrerer produkterne, så kun de med `recommended: true` gemmes i `recommended`.
  let recommended = products.filter((e) => e.recommended === true);

  // Henter produkterne fra API'et, når komponenten renderes første gang.
  useEffect(() => {
    fetchProducts(); // Kalder fetchProducts for at hente data.
  }, []); // Tom afhængighedsarray sikrer, at `useEffect` kun kører én gang.

  // Returnerer produkterne, de anbefalede produkter, fejl og loading-status.
  return { products, recommended, error, isLoading };
};

export default useFetchProducts;
