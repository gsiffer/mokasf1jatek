import styled from "styled-components";

export const TeamContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const TeamItem = styled.li`
  padding: 10px;
  margin: 5px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: grab;
  transition: background-color 0.3s ease, box-shadow 0.4s ease;

  &:hover {
    background-color: #e9e9e9;
  }

  &:active {
    cursor: grabbing;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #e9e9e9;
  }
`;
