const baseURL = "https://dummyjson.com/products";

const fetchProducts = async () => {
  const res = await fetch(`${baseURL}?limit=100`);
  const data = await res.json();
  if (data) {
    return data;
  } else {
    return null;
  }
};

export default fetchProducts;
