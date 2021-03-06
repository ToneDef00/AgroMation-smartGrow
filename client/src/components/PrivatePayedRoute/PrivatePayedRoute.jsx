import React from "react";
import { Route, Redirect } from "react-router-dom";
import {  useSelector, shallowEqual } from "react-redux";



function PrivatePayedRoute({ component: Component, ...rest }) {
    let { Auth } = useSelector(state => ({
        Auth: state.auth.authenticated,
    }), shallowEqual)
    let isAuthenticated = false;
    // console.log(rest);
    if(Auth && Auth !== "" && Auth.stripeRole){
      if( Auth.stripeRole==="premium" || Auth.stripeRole==="business" || Auth.stripeRole==="admin"){
        isAuthenticated=true
      }   
    }
    
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Settings" />
        )
      }
    />
  );
}

export default PrivatePayedRoute;