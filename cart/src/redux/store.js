    import { createStore, applyMiddleware } from 'redux'; // Import createStore and applyMiddleware
    import { thunk } from 'redux-thunk'; // Import Redux Thunk middleware
    import axios from 'axios'
    
    let initialState = {
        loggedIn: false,
        email: '',
        name: '',
        isAdmin:false,
        isSeller:false,
        cart: [],
    };
    
    // Action Types
    const LOGIN = 'LOGIN';
    const updateAdmin = 'updateAdmin';
    const LOGOUT = 'LOGOUT';
    const ADD_TO_CART = 'ADD_TO_CART';
    const UPDATE_CART = 'UPDATE_CART';
    
    // Action Creators
    export const login = (email, name, isAdmin,isSeller) => ({
        type: LOGIN,
        email,
        name,
        isAdmin,
        isSeller
    });
    export const updateCart = (updatedCart) => ({
        type: UPDATE_CART,
        payload: updatedCart
    });
    
    export const logout = () => ({
        type: LOGOUT
    });
    
    export const addToCart = ({ url, product, quantity }) => async(dispatch, getState) => {
        
        try {
            const response = await axios.post(
                `${url}/api/cart/add`,
                { product, quantity },
                    {
                    withCredentials:true
                }
            );
            dispatch(updateCart(response.data.cart));
            } catch (error) {
            console.error('Error adding item to cart:', error);
            }
    };
    // Reducer
    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case LOGIN:
                return {
                    ...state,
                    loggedIn: true,
                    email: action.email,
                    name: action.name,
                    isAdmin: action.isAdmin,
                    isSeller: action.isSeller,
                };
            case updateAdmin:
                return{
                    ...state,
                    admin:true,
                }
            case LOGOUT:
                return {
                    ...state,
                    loggedIn: false,
                    email: '',
                    name: ''
                };
            case ADD_TO_CART:
                return {
                    ...state,
                    cart: [...state.cart, action.product]
                };

            case UPDATE_CART:
                return {
                    ...state,
                    cart: action.payload
                };
            
            default:
                return state;
        }
    };
    // Create store with thunk middleware applied
    const store = createStore(reducer, applyMiddleware(thunk));
    
    export default store;