import styled from "styled-components";

const Wrapper = styled.section`
  h5 {
    margin: 0;
  }

  /* h2 {
    margin: 0 0 0 0;
  } */

  h4 {
    text-align: center;
  }

  /* span {
    font-size: x-large;
  } */

  .time-screen {
    display: flex;
    padding: 10px;
    /* justify-content: space-around; */
  }

  .number {
    min-width: 45px;
    text-align: right;
    font-size: 39px;
    margin-right: 2px;
    font-family: sans-serif;
  }

  .day {
    text-align: right;
    font-size: 39px;
    margin-right: 2px;
    font-family: sans-serif;
  }

  .text {
    font-size: x-large;
    margin-right: 2px;
    color: yellow;
    /* align-self: flex-end; */
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
    justify-content: space-between;
  }

  .my-drivers-table {
    width: 68%;
  }

  .team-table {
    width: 30%;
  }

  .my-drivers-table table,
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
  }

  .team-table table th:nth-of-type(1) {
    border-right: 1px solid white;
  }

  .team-table table td:nth-of-type(1) {
    text-align: center;
  }

  .team-table table td:nth-of-type(2) {
    text-align: left;
    padding: 5px 10px;
  }

  .team-table table tr:nth-child(even) {
    background-color: #f5f5f5;
  }

  .my-drivers-table tbody {
    width: 75%;
  }

  .my-drivers-table thead {
    width: 25%;
  }

  .my-drivers-table table.vertical-table {
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
    padding: 10px 10px;
  }

  .my-drivers-table table th:nth-of-type(-n + 5) {
    border-bottom: 1px solid white;
  }

  .my-drivers-table table td {
    text-align: left;
    padding: 10px 20px;
  }

  /* .my-drivers-table table td.line {
    padding: 16px 32px;
  } */

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
    justify-content: center;
    background-color: #006442;
    color: white;
    margin-bottom: 1.38rem;
  }

  .remaining-time h2 {
    margin: 0;
    padding: 10px;
    align-self: center;
  }

  .no-more-bet {
    background-color: #b22222;
    color: white;
    padding: 10px;
    text-align: center;
  }

  @media (max-width: 580px) {
    span {
      font-size: large;
    }

    .flex-box {
      display: block;
    }

    .team-table {
      width: 100%;
    }

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

    .my-drivers-table,
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

    .my-drivers-table table tr {
      width: full;
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

    .table-menu {
      justify-content: end;
    }

    .time-screen {
      margin: auto;
    }

    .number {
      min-width: 40px;
      font-size: 36px;
    }

    .day {
      font-size: 36px;
    }

    .zero {
      font-size: 36px;
    }
  }
`;

export default Wrapper;
