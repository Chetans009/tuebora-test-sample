import { useState, useEffect } from "react";

const Pagination = (props) => {
  const [totalPages, setTotalPages] = useState(0);
  const [pageList, setPageList] = useState([]);

  useEffect(() => {
    if( props.totalCount > 0 && props.recordsPerPage > 0){
        let totalCount = props.totalCount;
        let recordPerPage = props.recordsPerPage;
        let totalPages =  Math.ceil(totalCount / recordPerPage)
        setTotalPages(totalPages);
        let newArray = Array.from({ length: totalPages },(value, index) => index + 1);
        setPageList(newArray);
    }
  }, [props.totalCount]);

  const onChangePageHandler = (page) => {
    if(props.currentPage !== page)
        props.setPageChange(page);
  }

  const onChangePreviousHandler = () => {
    props.setPageChange(props.currentPage-1);
  }

  const onChangeNextHandler = () => {
    props.setPageChange(props.currentPage+1);
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className={`${
                      props.currentPage == 1 ? "page-link disabled" : "page-link"
                    }`} href="#" onClick={() => onChangePreviousHandler()}>
              Previous
            </a>
          </li>
          {pageList.length > 0 &&
            pageList.map((page) => {
              return (
                <li className="page-item" key={`page` + page}>
                  <a
                    className={`${
                      props.currentPage == page ? "active " : ""
                    } page-link`}
                    href="#" onClick={() => onChangePageHandler(page)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          <li className="page-item">
            <a className={`${
                      props.currentPage == totalPages ? "page-link disabled" : "page-link"
                    }`} href="#" onClick={() => onChangeNextHandler()}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
