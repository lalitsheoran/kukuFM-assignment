import { createStore,applyMiddleware,compose } from 'redux'
import {reducer} from './reducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function persistToLocalStorage(state){
    try{
        const currentState= JSON.stringify(state)
        localStorage.setItem("state",currentState)
    }
    catch(err){
        console.log(err)
    }
}

function getFromLocalStorage(){
    try{
        const currentState = localStorage.getItem("state")
        if(currentState===null){
            return {
                cachedData:[],
                favourites:[],
                currentPage:1,
                perPage:10,
                data:[],
                loading:false,
                error:false,
                filteredData:"",
                length:0,
                totalPages:0
            }
        }
        return JSON.parse(currentState)
    }
    catch(err){
        console.log(err)
        return undefined
    }
}

const getFromLocalStorageKey=getFromLocalStorage()

const store = createStore(reducer,getFromLocalStorageKey,composeEnhancers(applyMiddleware(thunk)))

store.subscribe(()=>persistToLocalStorage(store.getState()))


export default store;

