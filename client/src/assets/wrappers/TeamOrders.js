import styled from "styled-components";

export const TeamContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  max-width: 800px;
  margin: auto;
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

export const Wrapper = styled.section`
  h4 {
    align-self: center;
    margin: 0;
  }

  h2.table-heading {
    text-align: center;
    text-transform: uppercase;
    font-size: 24px;
    margin: 0 auto 32px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }

  .btn-height {
    height: 50%;
    display: flex;
    align-self: flex-end;
    align-self: center;
  }

  .table-menu {
    display: flex;
    justify-content: space-between;
    padding: 10px 0 10px 0;
    max-width: 800px;
    margin: 0 auto;
  }

  @media (max-width: 580px) {
  }
`;
