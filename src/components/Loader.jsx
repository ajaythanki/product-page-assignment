import styled from 'styled-components'

const Loader = () => {
  return (
    <LoaderWrapper>
      <div></div>
      loading...
    </LoaderWrapper>
  )
}

export default Loader

const LoaderWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
  height:100vh;
  width: 100%;
  gap:0.5rem;
  div{

    width: 50px;
    height: 50px;
    border: 10px solid #eee;
    border-top: 10px solid #363b3e;
    border-radius: 100%;
    animation: loader 1s infinite linear;
    @keyframes loader {
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;