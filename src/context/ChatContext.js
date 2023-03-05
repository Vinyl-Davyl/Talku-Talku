import {
  createContext,
  useContext,
  useReducer,
} from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          //This returns a new state object with updated values based on the action's payload.
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    // This creates a new context provider which provides the "data" property as the current state and the "dispatch" function as a way to update the state. It wraps around the children components to allow them to access the context data.
    <ChatContext.Provider value={{ data:state, dispatch }}>
      {/* This refers to the child components that are wrapped by the context provider. */}
      {children}
    </ChatContext.Provider>
  );
};
