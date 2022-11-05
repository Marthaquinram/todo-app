import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

//define initial state
const initialState = {
  //what we want our start to be, null
  user: null,
  fetchingUser: true,
  completeToDos: [],
  incompleteToDos: [],
}

//REDUCER, itll tell us how to interact with this state, what to set the state object to.
const globalReducer = (state, action) => {
  switch (action.type) {
    //if we have a user we are setting it here.
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
      };
    case "SET_COMPLETE_TODOS":
      return {
        ...state,
        completeToDos: action.payload,
      };
    case "SET_INCOMPLETE_TODOS":
      return {
        ...state,
        incompleteToDos: action.payload,
      };
    case "REST_USER":
      return {
        ...state,
        user: null,
        fetchingUser: true,
        completeToDos: [],
        incompleteToDos: [],
        fetchingUser: false,
      };
    default:
      return state;
  }
}

//creating the Context
export const GlobalContext = createContext(initialState)


//provider comp.
export const GlobalProvider = (props) => {
  //wiring up reducer
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    getCurrentUser();
  }, [])

  //action: to get current user.

  const getCurrentUser = async () => {
    try {
      const res = await axios.get("/api/auth/current");
      if (res.data) {
        const toDosRes = await axios.get("/api/todos/current");
        if (toDosRes.data) {
          dispatch({ type: "SET_USER", payload: res.data });
          dispatch({
            type: "SET_COMPLETE_TODOS",
            payload: toDosRes.data.complete
          });
          dispatch({
            type: "SET_INCOMPLETE_TODOS",
            payload: toDosRes.data.incomplete
          });
        }
      } else {
        dispatch({ type: "REST_USER" });
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: "REST_USER" });
    }
  }
  const logout = async () => {
    try {
      await axios.put("/api/auth/logout");
      dispatch({ type: "REST_USER" })
    } catch (e) {
      console.log(e)
      dispatch({ type: "RESET_USER" });
    }

  }
  // this is returning the state to then be able to access it on like 37
  const value = {
    ...state,
    getCurrentUser,
    logout,
  }


  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
