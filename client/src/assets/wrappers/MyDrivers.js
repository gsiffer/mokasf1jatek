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

  .flex-box {
    display: flex;
    /* justify-content: space-between; */
  }

  .my-drivers-table {
    width: 70%;
  }

  .team-table {
    width: 30%;
  }

  .my-drivers-table,
  .team-table table {
    width: 100%;
    background: #fff;
    color: #222;
    padding: 5px;
    box-shadow: 0 4px 15px -8px rgba(0, 0, 0, 0.4);
    border-collapse: collapse;
  }

  .team-table table thead tr {
    background: #222;
    color: #fff;
  }

  .team-table table th {
    text-align: center;
    /* padding: 16px 32px; */
  }

  .team-table table td {
    text-align: center;
    /* padding: 10px 32px; */
  }

  .team-table table tr:nth-child(even) {
    background-color: #f5f5f5;
  }

  .my-drivers-table tbody {
    width: 75%;
    /* border-style: solid;
    border-width: 1px; */
  }

  .my-drivers-table thead {
    width: 25%;
    /* border-style: solid;
    border-width: 1px; */
  }

  .my-drivers-table table.vertical-table {
    /* width: 100%; */
    /* max-width: 550px; */
    /* width: 800px; */
    display: flex;
  }

  .my-drivers-table table thead tr {
    background: #222;
    color: #fff;
  }

  .my-drivers-table table tr.vertical-columns {
    display: flex;
    flex-direction: column;
  }

  .my-drivers-table table th {
    text-align: center;
    padding: 16px 32px;
  }

  .my-drivers-table table td {
    text-align: left;
    padding: 10px 32px;
  }

  .my-drivers-table table td.line {
    padding: 16px 32px;
  }

  .my-drivers-table table tbody td:nth-child(odd) {
    background-color: #f5f5f5;
  }

  .table-menu {
    display: flex;
    justify-content: start;
    max-width: 550px;
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
    .my-drivers-table table thead {
      display: none;
    }

    .my-drivers-table table td {
      display: block;
    }

    .my-drivers-table table td::before {
      content: attr(data-heading) ": ";
      font-weight: bold;
    }

    .table-container .content-none::before {
      content: none;
    }

    .my-drivers-table tbody {
      width: 100%;
    }

    .options-container {
      display: flex;
      justify-content: end;
      gap: 10px;
    }

    .my-drivers-table table td,
    .my-drivers-table table td.line,
    .my-drivers-table table th {
      text-align: left;
      padding: 10px;
    }

    .my-drivers-table table tr,
    .my-drivers-table table tr.vertical-columns {
      display: block;
      margin-bottom: 10px;
      background: #fff;
      box-shadow: 0 4px 15px -8px rgba(0, 0, 0, 0.4);
      border-radius: var(--borderRadius);
    }

    .my-drivers-table table,
    .my-drivers-table table.vertical-table {
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

    .my-drivers-table table tbody td.line {
      background-color: #fff;
    }

    .remaining-time {
      flex-direction: column;
      text-align: center;
    }
  }
`;

export default Wrapper;
