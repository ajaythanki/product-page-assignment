import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import fetchProducts from "../services/products";
import Pagination from "./Pagination";
import styled from "styled-components";
import Loader from "./Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts()
      .then((productsData) => {
        setProducts(productsData.products);
        setFilteredProducts(productsData.products);
        setTotalPages(Math.round(productsData.total / 8));
        setIsLoading(false);

      })
      .catch((e) => {
        console.log(e.message);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    if (e.target.name === "category") {
      setFilter(e.target.value);
    }
    if (e.target.value === "high-to-low") {
      setFilteredProducts(
        [...filteredProducts]?.sort((a, b) => b.price - a.price)
      );
    }
    if (e.target.value === "low-to-high") {
      setFilteredProducts(
        [...filteredProducts]?.sort((a, b) => a.price - b.price)
      );
    }
  };

  useEffect(() => {
    if (filter !== "ALL" && products.length > 0) {
      const filtered = [
        ...products.filter((product) => {
          return product.category.toLowerCase() === filter.toLowerCase();
        }),
      ];
      setFilteredProducts(filtered);
      setTotalPages(Math.round(filtered.length / 8));
      setCurrentPage(1)
    }
    if (filter === "ALL") {
      setFilteredProducts([...products]);
      setTotalPages(Math.round(products.length / 8));
    }
  }, [filter, products, currentPage]);

  if (isError) return <div>Something went wrong please try again later.</div>;
  if (isLoading) return <Loader />
  return (
    <PageWrapper>
      <Header>
        <PageTitle>Products</PageTitle>
        <FilterWrapper>
          <FilterTitle>Filter</FilterTitle>
          <FilterInputWrapper>
            <FormInput>
              <label htmlFor="category">Category</label>
              <FormField
                id="category"
                name="category"
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="ALL">All</option>
                {categories.map((cat, index) => (
                  <option
                    style={{ textTransform: "capitalize" }}
                    key={index}
                    value={cat}
                  >
                    {cat}
                  </option>
                ))}
              </FormField>
            </FormInput>
            <FormInput>
              <label htmlFor="price">Sort by Price</label>
              <FormField id="price" name="price" onChange={handleFilterChange}>
                <option value="">Select</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </FormField>
            </FormInput>
          </FilterInputWrapper>
        </FilterWrapper>
      </Header>
      <ProductGrid>
        {filteredProducts.length === 0 && (
          <p style={{ textAlign: "center" }}>No products found.</p>
        )}
        {filteredProducts.length > 0 &&
          filteredProducts
            .slice((currentPage - 1) * 8, currentPage * 8)
            .map((product) => <ProductCard key={product.id} {...product} />)}
      </ProductGrid>
      {filteredProducts.length > 8 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </PageWrapper>
  );
};

export default Products;

const PageWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 4rem 1rem;
  max-width: 42rem;

  @media (min-width: 640px) {
    padding: 6rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
    max-width: 80rem;
  }
`;

const Header = styled.div`
  flex-direction: column;
  flex-wrap: wrap;

  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
  }
`;

const PageTitle = styled.h2`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  text-align: center;
  color: #111827;
`;

const FilterWrapper = styled.div`
  margin-top: 1.25rem;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: flex-start;
  }
  @media (min-width: 1280px) {
    margin-top: 0;
    gap: 1.25rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  margin-top: 1.5rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  column-gap: 1.5rem;
  row-gap: 2.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 2rem;
  }
`;

const FilterTitle = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: #1f2937;

  @media (min-width: 1024px) {
    text-align: right;
  }
`;

const FilterInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: 100%;

  @media (min-width: 768px) {
    justify-content: space-around;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
    flex: 1 1 0%;
    align-items: center;
  }
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.select`
  padding: 0.75rem;
  border-width: 1px;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;
