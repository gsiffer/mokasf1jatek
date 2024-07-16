import styled from "styled-components";

const Wrapper = styled.section`
  .team-container ul {
    list-style-type: none;
    padding: 0;
  }

  .team-container ul li {
    position: relative;
    padding: 10px;
    margin: 5px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: grab;
    transition: transform 0.3s ease, background-color 0.3s ease,
      box-shadow 0.5s ease;
    z-index: 1;
    min-width: 200px;

    &:hover {
      background-color: ${(props) => (props.dragged ? "#f9f9f9" : "#e9e9e9")};
    }

    &:active {
      cursor: grabbing;
      box-shadow: ${(props) =>
        props.dragged ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    }
  }

  .dragged {
    opacity: 0.5;
    transform: scale(0.95);
    z-index: 2; /* Ensure the dragged item is on top during drag */
  }
`;

export default Wrapper;
