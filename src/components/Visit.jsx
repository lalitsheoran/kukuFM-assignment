import React from 'react';
import {connect} from 'react-redux'

class Visit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            bankToShow:""
        }
    }
    componentDidMount(){
        const {data} = this.props
        let bankToVisit=data.filter(e=>e.ifsc==this.props.match.params.id)[0]
        this.setState({
            bankToShow:bankToVisit
        })


    }
    render(){
        const {bankToShow}=this.state
        return(
            <>
            {bankToShow && <div>
                <p className="display-3 text-center text-warning">{bankToShow.bank_name}</p>                    
                    <div className="d-flex flex-column align-items-center">
                        <p className="h4">-= IFSC CODE =-</p>
                        <p className="text-success">{bankToShow.ifsc}</p>
                        <p className="h4">-= BRANCH =-</p>
                        <p className="text-success">{bankToShow.branch}</p>
                        <p className="h4">-= BANK ID =-</p>
                        <p className="text-success">{bankToShow.bank_id}</p>
                        <p className="h4">-= ADDRESS =-</p>
                        <p className="text-success">{bankToShow.address}</p>
                        <p className="h4">-= CITY =-</p>
                        <p className="text-success">{bankToShow.city}</p>
                        <p className="h4">-= DISTRICT =-</p>
                        <p className="text-success">{bankToShow.district}</p>
                        <p className="h4">-= STATE =-</p>
                        <p className="text-success">{bankToShow.state}</p>
                    </div>
            </div>}
            </>
        )
        
    }
}
const mapStateToProps = (state) => ({
    data:state.data
})
export default connect(mapStateToProps,null)(Visit)
