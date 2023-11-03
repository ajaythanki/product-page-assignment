import styled from "styled-components";

const ProductCard = ({ title, thumbnail, price, description, rating }) => {
  return (
    <ProductCardWrapper>
      <ProductImageWrapper>
        <img src={thumbnail} alt={title} />
      </ProductImageWrapper>
      <ProductCardBody>
        <div>
          <h3>
              {title}
          </h3>
          <p className="rating">{rating} ⭐⭐⭐⭐⭐</p>
          <p>{description}</p>
        </div>
        <p className="price">${price}</p>
      </ProductCardBody>
    </ProductCardWrapper>
  );
};

export default ProductCard;
const ProductCardWrapper = styled.div`
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  border-width: 1px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  transition-duration: 300ms;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 0.375rem;
  background-color: #e5e7eb;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  @media (min-width: 1024px) {
    height: 20rem;
  }
`;

const ProductCardBody = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  h3 {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #374151;
    span {
      position: absolute;
      inset: 0;
    }
  }
  p.rating {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #6b7280;
  }
  p.price {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: #111827;
  }
`;
