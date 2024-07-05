import styled from "styled-components";

const Wrapper = styled.section`
  form {
    display: flex;
    flex-direction: column;
  }

  input {
    height: 36px;
    border-width: 1px;
    border-style: solid;
    border-radius: 0.25rem;
    padding: 2px 8px;
    border-color: lightgray;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .close-x-btn {
    padding: 0;
    border: none;
    background-color: white;
    display: flex;
    align-items: top;
    color: lightgray;
  }

  .close-x-btn:hover {
    color: gray;
    cursor: pointer;
  }

  .btn-container {
    display: flex;
    justify-content: end;
    margin-top: 20px;
    gap: 10px;
  }

  .error-message {
    display: flex;
  }

  .error-message span {
    color: red;
  }

  .input-error {
    border-color: red;
  }

  .alert {
    position: absolute;
    width: 96%;
    left: 0;
    right: 0;
    top: 1.5rem;
    margin: auto;
  }

  @media (max-width: 580px) {
  }
`;

export default Wrapper;
