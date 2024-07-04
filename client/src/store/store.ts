import { combineReducers,createStore } from 'redux';
import reducerProfile from './reducer/reducerProfile';

const rootReducer = combineReducers({
    reducerProfile
})
const store:any = createStore(rootReducer)

export default store;