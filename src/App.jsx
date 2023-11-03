import styled from "styled-components";
import Products from "./components/Products";

function App() {

  return (
    <PageBody>
       <Products />
    </PageBody>
  );
}

export default App;


const PageBody = styled.main`
  width: 100%;

  @media (min-width: 768px) {
    padding: 2.5rem;
  }
`;