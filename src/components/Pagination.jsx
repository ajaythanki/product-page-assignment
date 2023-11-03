import { useState, useEffect } from "react";
import styled from "styled-components";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    setVisiblePages(
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    );
  }, [currentPage, totalPages]);

  return (
    <PaginationWrapper>
      <PaginationButton
        onClick={() =>
          setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)
        }
      >
        Previous
      </PaginationButton>
      {visiblePages.map((pageNum) => {
        return (
          <PageNumber
            className={
              currentPage === pageNum
                ? `active`
                : ``
            }
            key={`page${pageNum}`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </PageNumber>
        );
      })}
      <PaginationButton
        onClick={() =>
          setCurrentPage(
            currentPage === totalPages ? currentPage : currentPage + 1
          )
        }
      >
        Next
      </PaginationButton>
    </PaginationWrapper>
  );
};

export default Pagination;



const PaginationWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;
`;

const PaginationButton = styled.span`
  padding: 0.75rem;
  border-width: 1px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  transition-duration: 200ms;
  cursor: pointer;

  &:hover {
    color:gray;
  }
`;

const PageNumber = styled.span`
  display: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  transition-duration: 200ms;
  cursor: pointer;
  color: #374151; 
  background-color: #ffffff; 

  &.active{
    color: #ffffff; 
    background-color: #374151; 
  }
  @media (min-width: 640px) {
    display: flex;
  }

  &:hover {
    color: #ffffff;
    background-color: rgb(51 65 85);
  }
`;