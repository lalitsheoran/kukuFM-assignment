import React from "react";
import { connect } from "react-redux";
import { setcurrentpage } from "./../redux/action";

export class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { perPage, currentPage, totalPages, setCurrentPage } = this.props;
    const pageList = [];
    for (
      let i = currentPage - 1;
      i >= 0 && i <= currentPage + 3 && i <= totalPages;
      i++
    ) {
      if (i === currentPage - 1) {
        if (i !== 0) {
          pageList.push(
            <button
              key={i}
              onClick={() => setCurrentPage(currentPage - 1)}
              type="button"
              className="ml-1  btn btn-danger"
            >
              Previous
            </button>
          );
        }
        continue;
      } else if (i === currentPage + 3) {
        pageList.push(
          <button
            key={i}
            onClick={() => setCurrentPage(currentPage + 1)}
            type="button"
            className="ml-1 btn btn-success"
          >
            Next
          </button>
        );
        continue;
      }
      pageList.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          type="button"
          className={`ml-1  btn ${
            currentPage == i ? "btn-primary" : "btn-secondary"
          }`}
        >
          {i}
        </button>
      );
    }
    console.log(pageList);
    return (
      <>
        <div className="text-center">{totalPages !== 0 && pageList}</div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  perPage: state.perPage,
  currentPage: state.currentPage,
  totalPages: state.totalPages,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentPage: (payload) => dispatch(setcurrentpage(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
