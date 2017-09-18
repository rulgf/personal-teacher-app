export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function login(userCredentials){
  console.log(userCredentials);
  if(userCredentials.userName === 'testuser' && userCredentials.password=== 'abc123'){
    return {
      type: LOGIN_SUCCESS
    }
  } else {
    return {
      type: LOGIN_ERROR
    }
  }
}
