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

const initialState={
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

export const reducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_DATA_REQUEST:
            return{...state,
                loading:true,
            }
        case FETCH_DATA_SUCCESS:
            let cacheFirst={
                city:action.query,
                data:action.payload
            }
            let cachedDataCopy=state.cachedData
            return{...state,
                loading:false,
                error:false,
                cachedData:[...cachedDataCopy,cacheFirst],
                data:action.payload
            }
        case FETCH_DATA_FAILURE:
            return{...state,
                loading:false,
                error:true
            }
        case SET_PER_PAGE:
            return{...state,
            perPage:action.payload
            }
        case SET_CURRENT_PAGE:
            return{...state,
            currentPage:action.payload
        }
        case SET_FILTERED_DATA:
            return{...state,
            filteredData:action.payload,
            length:action.payload.length,
            totalPages:action.payload.length/state.perPage
        }

        case ADD_TO_FAVOURITES:
            let favouritesCopy=state.favourites
            return{...state,
                favourites:[...favouritesCopy,action.payload]
        }
        case USE_CACHE:
            return{...state,
                data:action.payload
            }

        default:
            return state
    }
}
export default reducer;
