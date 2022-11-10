
import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

//define initial state
// initial state
const initialState = {
  //what we want our start to be, null
  user: null,
  fetchingUser: true,
  completeToDos: [],
  incompleteToDos: [],
};

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
    case "RESET_USER":
      return {
        ...state,
        user: null,
        completeToDos: [],
        incompleteToDos: [],
        fetchingUser: false,
      };
    default:
      return state;
  }
};

// create the context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  //everytime the app starts or its refreshed/loads up
  //we want to make an api call to get the current user, to see if theres an access token in the cookies. if there is an access token we need to set up the current data.
  useEffect(() => {
    getCurrentUser();
  }, []);
  // new action this function will gett all the data we when we think the user is logged in,
  const getCurrentUser = async () => {
    console.log("HEYYY CAN YOU SEE ME");
    try {
      //making a call to our backend Api 
      const res = await axios.get("http://localhost:3002/api/auth/current");
      console.log("HEYYY RESSSSS!!!!", res);
      //if theres a user present we will expect res.data, if there is datat returned it would be on the res
      if (res.data) {
        //grab the users todos to then store in state
        const toDosRes = await axios.get("http://localhost:3002/api/todos/current");
        // if we have data and the user is logged in then we will grab the todos.
        if (toDosRes.data) {
          console.log("HEYYY inside IF BLOCK!!!!", toDosRes.data);
          //dispatch will speak with out reducer and we are passing the payload. to get the user infomation.
          //payload has the users data info.
          dispatch({ type: "SET_USER", payload: res.data });
          dispatch({
            type: "SET_COMPLETE_TODOS",
            payload: toDosRes.data.complete,
          });
          dispatch({
            type: "SET_INCOMPLETE_TODOS",
            payload: toDosRes.data.incomplete,
          });
        }
      }
      else {
        // console.log("HEYYY inside else!!!!", data);
        dispatch({ type: "RESET_USER" });

      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "RESET_USER" });
    }
  };

  const logout = async () => {
    try {
      await axios.put("http://localhost:3002/api/auth/logout");

      dispatch({ type: "RESET_USER" });
    } catch (err) {
      console.log(err);
      dispatch({ type: "RESET_USER" });
    }
  };


  const addToDo = (toDo) => {
    dispatch({
      type: "SET_INCOMPLETE_TODOS",
      payload: [toDo, ...state.incompleteToDos],
    });
  };

  const toDoComplete = (toDo) => {
    dispatch({
      type: "SET_INCOMPLETE_TODOS",
      payload: state.incompleteToDos.filter(
        (incompleteToDo) => incompleteToDo._id !== toDo._id
      ),
    });

    dispatch({
      type: "SET_COMPLETE_TODOS",
      payload: [toDo, ...state.completeToDos],
    });
  };

  const toDoIncomplete = (toDo) => {
    dispatch({
      type: "SET_COMPLETE_TODOS",
      payload: state.completeToDos.filter(
        (completeToDo) => completeToDo._id !== toDo._id
      ),
    });

    const newIncompleteToDos = [toDo, ...state.incompleteToDos];

    dispatch({
      type: "SET_INCOMPLETE_TODOS",
      payload: newIncompleteToDos.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    });
  };

  const removeToDo = (toDo) => {
    if (toDo.complete) {
      dispatch({
        type: "SET_COMPLETE_TODOS",
        payload: state.completeToDos.filter(
          (completeToDo) => completeToDo._id !== toDo._id
        ),
      });
    } else {
      dispatch({
        type: "SET_INCOMPLETE_TODOS",
        payload: state.incompleteToDos.filter(
          (incompleteToDo) => incompleteToDo._id !== toDo._id
        ),
      });
    }
  };

  const updateToDo = (toDo) => {
    if (toDo.complete) {
      const newCompleteToDos = state.completeToDos.map((completeToDo) =>
        completeToDo._id !== toDo._id ? completeToDo : toDo
      );

      dispatch({
        type: "SET_COMPLETE_TODOS",
        payload: newCompleteToDos,
      });
    } else {
      const newIncompleteToDos = state.incompleteToDos.map((incompleteToDo) =>
        incompleteToDo._id !== toDo._id ? incompleteToDo : toDo
      );

      dispatch({
        type: "SET_INCOMPLETE_TODOS",
        payload: newIncompleteToDos,
      });
    }
  };
  // this is returning the state to then be able to access it on like 37
  const value = {
    ...state,
    getCurrentUser,
    logout,
    addToDo,
    toDoComplete,
    toDoIncomplete,
    removeToDo,
    updateToDo,
  };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
