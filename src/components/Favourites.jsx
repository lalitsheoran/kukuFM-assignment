import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

function Favourites(props){
    const {favourites}=props
    return(
        <>
        <p className="display-4 text-center">Favourite Bank Branches</p>
        {favourites.length > 0 ? <table className="table table-dark">
                <thead>
                    <th>IFSC</th>
                    <th>Bank ID</th>
                    <th>Branch</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>District</th>
                    <th>State</th>
                    <th>Bank Name</th>
                    <th>More</th>
                </thead>
                <tbody>
                    {favourites.map((e)=>{
                        return (
                        <tr key={e.ifsc}>
                            <td>{e.ifsc}</td>
                            <td>{e.bank_id}</td>
                            <td>{e.branch}</td>
                            <td>{e.address}</td>
                            <td>{e.city}</td>
                            <td>{e.district}</td>
                            <td>{e.state}</td>
                            <td>{e.bank_name}</td>
                            <td><Link style={{cursor:"pointer"}} to={`/visit?${e.ifsc}`}>Visit</Link></td>
                        </tr>)
                    })}
                </tbody>
                </table> : <p className="h3 text-center text-warning my-5">No favourite bank branches found.<span className="text-secondary h2">Kindly add some.</span></p>}
        </>
    )
}
const mapStateToProps = (state) => ({
    favourites:state.favourites

})

export default connect(mapStateToProps,null)(Favourites)

