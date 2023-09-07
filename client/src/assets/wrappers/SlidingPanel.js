import styled from "styled-components";

const Wrapper = styled.section`
  .cover-box {
    position: fixed;
    inset: 0;
    background: black;
    z-index: 20;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s ease-out;
  }

  .cover-over {
    opacity: 25%;
    visibility: visible;
    transition: 0.3s ease-out;
  }

  .panel-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 22rem;
    z-index: 20;
    /* width: 100%; */
    /* border: 3px solid #73ad21; */
    transform: translateX(100%);
    transition: 0.3s ease-out;
  }

  .panel {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    /* color: #eee; */
    overflow: auto;
    padding: 1em;
  }

  .slide-in {
    transform: translateX(0);
  }

  @media (max-width: 580px) {
    .panel-wrap {
      width: 20rem;
    }
  }
`;
export default Wrapper;
