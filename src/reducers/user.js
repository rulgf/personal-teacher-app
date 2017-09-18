import {
  LOGIN_SUCCESS
}from '../actions/';

let cloneObject = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}

let newState =
{
  user:{
    loggedIn: false
  }
};

export default function (state, action){
  switch (action.type) {
    case LOGIN_SUCCESS:
      newState = cloneObject(state);
      newState.user.loggedIn = true;
      console.log(newState);
      return newState;
    default:
    console.log("Hola");
      return state || newState;
  }
}
