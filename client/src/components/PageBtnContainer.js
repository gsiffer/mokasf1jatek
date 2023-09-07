import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageButtonContainer = ({ numOfPages, page, type }) => {
  const { changePage } = useAppContext();

  // const range = Array.from({ length: 5 }, (_, index) => index + 1);
  // console.log(range); // Output: [1, 2, 3, 4, 5]

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      // newPage = 1
      // alternative
      newPage = numOfPages;
    }
    changePage(newPage, type);
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      // newPage = numOfPages
      // alternative
      newPage = 1;
    }
    changePage(newPage, type);
  };

  return (
    <Wrapper>
      <div className="pagination-btn">
        <button className="prev-btn" onClick={prevPage}>
          <HiChevronDoubleLeft />
          prev
        </button>

        <div className="btn-container">
          {pages.map((pageNumber) => {
            return (
              <button
                type="button"
                className={pageNumber === page ? "pageBtn active" : "pageBtn"}
                key={pageNumber}
                onClick={() => changePage(pageNumber, type)}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button className="next-btn" onClick={nextPage}>
          next
          <HiChevronDoubleRight />
        </button>
      </div>
    </Wrapper>
  );
};

export default PageButtonContainer;
