import styled from "styled-components";

const Wrapper = styled.section`
  h5 {
    margin: 0;
  }

  td button {
    all: unset;
    cursor: pointer;
  }
  .table-contanier {
    padding: 32px;
    font-family: "Roboto", sans-serif;
  }

  .table-container h2.table-heading {
    text-align: center;
    text-transform: uppercase;
    font-size: 24px;
    margin-bottom: 32px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }

  .table-container table {
    width: 100%;
    background: #fff;
    color: #222;
    padding: 24px;
    box-shadow: 0 4px 15px -8px rgba(0, 0, 0, 0.4);
    border-collapse: collapse;
  }

  .table-container table thead tr {
    background: #222;
    color: #fff;
  }

  .table-container table th {
    text-align: center;
    padding: 16px 32px;
  }

  .table-container table td {
    text-align: center;
    padding: 10px 32px;
  }

  table tr:nth-child(even) {
    background-color: #f5f5f5;
  }

  /* .table-container table tr {
    border-bottom: 1px solid #eee;
  } */

  .table-menu {
    display: flex;
    padding: 10px 0 10px 0;
  }

  .single-table-menu {
    display: flex;
    padding: 10px 0 10px 0;
    justify-content: end;
  }

  .space-between {
    display: flex;
    justify-content: space-between;
    padding: 10px 0 10px 0;
  }

  .btn-height {
    height: 50%;
    display: flex;
    align-self: flex-end;
  }

  .page-count-header {
    display: flex;
    flex: 1;
  }

  .page-count {
    flex: 1;
    text-align: center;
  }

  .options-container {
    display: flex;
    justify-content: space-around;
  }

  @media (max-width: 580px) {
    .table-container table thead {
      display: none;
    }

    .table-container table td {
      display: block;
    }

    .table-container table td::before {
      content: attr(data-heading) ": ";
      font-weight: bold;
    }

    .table-container .content-none::before {
      content: none;
    }

    .options-container {
      display: flex;
      justify-content: end;
      gap: 10px;
    }

    .table-container table td,
    .table-container table th {
      text-align: left;
      padding: 10px;
    }

    .table-container table tr {
      display: block;
      margin-bottom: 10px;
      background: #fff;
      box-shadow: 0 4px 15px -8px rgba(0, 0, 0, 0.4);
      border-radius: var(--borderRadius);
    }

    .table-container table {
      box-shadow: none;
      background: none;
    }

    .page-count-header {
      flex-direction: column;
    }

    .page-count {
      text-align: left;
      font-weight: bold;
    }
  }
`;

export default Wrapper;
