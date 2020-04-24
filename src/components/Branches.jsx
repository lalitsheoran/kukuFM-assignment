import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from './Pagination'
import { addtofavourites, fetchdata, setfiltereddata, usecache } from "./../redux/action";

class Branches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "CHANDIGARH",
      filteredData: ""
    };
  }

  handleApiCall = (query) => {
    const { fetchData, useCache, cachedData } = this.props;
    let checkForCachedData = cachedData.filter((e) => e.city == query)[0];
    if (checkForCachedData) {
      useCache(checkForCachedData.data);
    } else {
      fetchData(query);
    }
  };

  handleLiveSearch = (e) => {
    const { data,filteredData } = this.props;
    let query = e.target.value.toLowerCase();
    if (!data) {
      alert("Problem Occured");
    } else {
      let requiredData = data.filter(
        (e) =>
          e.ifsc.toLowerCase().split(" ").includes(query) ||
          e.bank_id == query ||
          e.branch.toLowerCase().split(" ").includes(query) ||
          e.address.toLowerCase().split(" ").includes(query) ||
          e.city.toLowerCase().split(" ").includes(query) ||
          e.district.toLowerCase().split(" ").includes(query) ||
          e.state.toLowerCase().split(" ").includes(query) ||
          e.bank_name.split(" ").includes(query)
      );
      this.setState({
        filteredData: requiredData,
      },()=>filteredData(this.state.filteredData));
    }
  };

  handleCityChange = (e) => {
    this.setState(
      {
        city: e.target.value,
      },
      () => this.handleApiCall(this.state.city)
    );
  };

  handleFavourite = (e) => {
    const { favourites, addToFavourites } = this.props;
    let requestedBank = e.target.getAttribute("data-ifsc");
    let checkFavourites = favourites.filter((e) => e.ifsc == requestedBank)[0];
    if (checkFavourites) {
      alert("Warning : Already added to favourites");
    } else {
      let bankToAdd = this.state.filteredData.filter(
        (e) => e.ifsc == requestedBank
      )[0];
      console.log("see ", bankToAdd);
      addToFavourites(bankToAdd);
      e.target.textContent = "Added";
      e.target.classList.remove("btn-warning");
      e.target.classList.add("btn-success");
      alert("Successfully added to Favourites");
    }
  };

  componentDidMount() {
    this.handleApiCall(this.state.city);
  }
  render() {
    const { perPage,currentPage } = this.props;
    return (
      <>
        <p className="text-center display-3">Bank Branches</p>
        <div className="col d-flex my-3 justify-content-around align-items-center flex-column flex-md-row ">
          <div className="m-md-0 m-sm-2">
            <label for="cities">Select City</label>
            <select
              onChange={this.handleCityChange}
              className="form-control"
              name=""
              id="cities"
            >
              <option selcted value="CHANDIGARH">
                Chandigarh
              </option>
              <option value="SONIPAT">Sonipat</option>
              <option value="VARANASI">Varanasi</option>
              <option value="PANIPAT">Panipat</option>
              <option value="JAIPUR">Jaipur</option>
            </select>
          </div>
          <input
            onChange={this.handleLiveSearch}
            className="p-0 m-md-0 m-sm-2"
            type="text"
            id="query"
            placeholder="Search"
          />
          <Link to="/favourites">
            <button type="button" className="btn btn-primary m-md-0 m-sm-2">
              View Favourites
            </button>
          </Link>
        </div>
        <div>
          {this.state.filteredData && (
            <table className="table table-striped">
              <thead>
                <th>IFSC</th>
                <th>Bank ID</th>
                <th>Branch</th>
                <th>Address</th>
                <th>City</th>
                <th>District</th>
                <th>State</th>
                <th>Bank Name</th>
                <th>Favourite</th>
                <th>More</th>
              </thead>
              <tbody>
                {this.state.filteredData.filter((a,i)=>i>=perPage*(currentPage-1) && i<perPage*(currentPage)).map((e) => {
                  return (
                    <tr key={e.ifsc}>
                      <td>{e.ifsc}</td>
                      <td>{e.bank_id}</td>
                      <td style={{ maxWidth: "150px", wordWrap: "break-word" }}>
                        {e.branch}
                      </td>
                      <td style={{ maxWidth: "250px", wordWrap: "break-word" }}>
                        {e.address}
                      </td>
                      <td>{e.city}</td>
                      <td>{e.district}</td>
                      <td>{e.state}</td>
                      <td>{e.bank_name}</td>
                      <td>
                        <button
                          data-ifsc={e.ifsc}
                          onClick={this.handleFavourite}
                          style={{ cursor: "pointer" }}
                          className="btn btn-warning"
                        >
                          Add
                        </button>
                      </td>
                      <td>
                        <Link
                          style={{ cursor: "pointer" }}
                          to={`/visit/${e.ifsc}`}
                        >
                          Visit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {!this.state.filteredData && (
            <p className="text-center text-primary h3 mt-5">
              -= Search results will appear here =-
            </p>
          )}
          {this.state.filteredData && <Pagination/>}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.loading,
  cachedData: state.cachedData,
  favourites: state.favourites,
  data: state.data,
  currentPage: state.currentPage,
  perPage: state.perPage,
  length: state.length,
  totalPages: state.totalPages,
});

const mapDispatchToProps = (dispatch) => ({
  addToFavourites: (arg) => dispatch(addtofavourites(arg)),
  fetchData: (arg) => dispatch(fetchdata(arg)),
  filteredData:(arg)=>dispatch(setfiltereddata(arg)),
  useCache: (arg) => dispatch(usecache(arg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Branches);
