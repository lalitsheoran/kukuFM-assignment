import axios from 'axios';
import {
    SET_CURRENT_PAGE,
    SET_PER_PAGE,
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    ADD_TO_FAVOURITES,
    SET_FILTERED_DATA,
    USE_CACHE
} from './actionType'

export const setcurrentpage=(value)=>({
    type:SET_CURRENT_PAGE,
    payload:value
})
export const setperpage=(value)=>({
    type:SET_PER_PAGE,
    payload:value
})

export const addtofavourites=(value)=>({
    type:ADD_TO_FAVOURITES,
    payload:value
})

export const usecache=(value)=>({
    type:USE_CACHE,
    payload:value
})

export const fetchdatarequest=()=>({
    type:FETCH_DATA_REQUEST
})

export const fetchdatasuccess=(query,value)=>({
    type:FETCH_DATA_SUCCESS,
    query:query,
    payload:value
})

export const setfiltereddata=(value)=>({
    type:SET_FILTERED_DATA,
    payload:value
})

export const fetchdatafailure=()=>({
    type:FETCH_DATA_FAILURE
})

export const fetchdata=(query)=>{
    return dispatch =>{
        dispatch(fetchdatarequest())
        axios
        .get("https://vast-shore-74260.herokuapp.com/banks?city="+query)
        .then(res=>dispatch(fetchdatasuccess(query,res.data)))
        .catch(err=>dispatch(fetchdatafailure()))
    }
}





