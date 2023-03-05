import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { RiChatSmile3Fill } from "react-icons/ri";


const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className="logo">Talku Talku <RiChatSmile3Fill /></span>
      <div className="user">
        {/* Gets image of current user and display name */}
        <img src={currentUser.photoURL} alt="" />
        <span className='name'>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar