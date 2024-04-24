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

  .table-container tbody {
    width: 75%;
    /* border-style: solid;
    border-width: 1px; */
  }

  .table-container thead {
    width: 25%;
    /* border-style: solid;
    border-width: 1px; */
  }

  .table-container table.vertical-table {
    /* width: 100%; */
    max-width: 700px;
    display: flex;
  }

  .table-container table thead tr {
    background: #222;
    color: #fff;
  }

  .table-container table tr.vertical-columns {
    display: flex;
    flex-direction: column;
  }

  .table-container table th {
    text-align: center;
    padding: 16px 32px;
  }

  .table-container table td {
    text-align: left;
    padding: 10px 32px;
  }

  .table-container table td.line {
    padding: 16px 32px;
  }

  table tbody td:nth-child(odd) {
    background-color: #f5f5f5;
  }

  /* .table-container table tr {
    border-bottom: 1px solid #eee;
  } */

  .table-menu {
    display: flex;
    justify-content: end;
    max-width: 700px;
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

  .remaining-time {
    display: flex;
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

    .table-container tbody {
      width: 100%;
    }

    .options-container {
      display: flex;
      justify-content: end;
      gap: 10px;
    }

    .table-container table td,
    .table-container table td.line,
    .table-container table th {
      text-align: left;
      padding: 10px;
    }

    .table-container table tr,
    .table-container table tr.vertical-columns {
      display: block;
      margin-bottom: 10px;
      background: #fff;
      box-shadow: 0 4px 15px -8px rgba(0, 0, 0, 0.4);
      border-radius: var(--borderRadius);
    }

    .table-container table,
    .table-container table.vertical-table {
      box-shadow: none;
      background: none;
      width: 100%;
      padding: 0px;
    }

    .page-count-header {
      flex-direction: column;
    }

    .page-count {
      text-align: left;
      font-weight: bold;
    }

    table tbody td.line {
      background-color: #fff;
    }

    .remaining-time {
      flex-direction: column;
      text-align: center;
    }
  }
`;

export default Wrapper;
