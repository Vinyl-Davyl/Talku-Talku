import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      // This creates a Firestore reference to a specific document in the "userChats" collection with the ID equal to the current user's UID.
      const docRef = doc(db, "userChats", currentUser.uid);
      // This listens to changes in the specified Firestore document and runs the provided callback function whenever a change occurs. It also returns a function that unsubscribes from the listener when called.
      const unsub = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          //This sets the "chats" state variable to the data of the specified Firestore document.
          setChats(doc.data());
        }
      });
    
      return () => {
        unsub();
      };
    };

    //This is a React Hook that runs the provided function whenever the dependency array (in this case, [currentUser.uid]) changes.
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {/* This is mapping through the "chats" state variable (which is an object with multiple entries) and sorting them based on the date field in descending order. Then it renders each chat entry as a div element with a class name of "userChat". */}
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          // This triggers the dispatch function with a "CHANGE_USER" action and the selected chat user's information as a payload.
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
