import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { RiChatSmile3Fill } from "react-icons/ri";

const Register = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    // Check if an image has been uploaded
    if (!file){
      setErr("Please select an image.");
      setLoading(false);
      return;
    }

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        //getDownloadURL function retrieves a download URL for the uploaded image. This URL will be used as the user's profile picture.
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            setImageUploaded(true);
            //create empty user chats on firestore This document will be used to store the user's chat messages.
            await setDoc(doc(db, "userChats", res.user.uid), {});
            // When everything is okay and user successfully registers, redirect to home page
            navigate("/login");
          } catch (err) {
            console.log(err);
            setErr("Something went wrong");
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Talku Talku <RiChatSmile3Fill /></span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password 23ab#$*" />
          <input required style={{ display: "none" }} type="file" id="file" />
          {/* Image upload */}
          <label htmlFor="file" required>
            <img src={Add} alt="" />
            <span>{imageUploaded ? "Image Uploaded" : <p>Add an avatar <span style={{color: "red"}}>*</span></p>}</span>
          </label>

          <button className="onboard-button" disabled={loading}>
            {loading ? (
              <Spinner width="50px" height="50px" />
            ) : (
              "Sign up"
            )}
          </button>
          {loading && <p style={{ fontSize: "12px"}}>Crunching Image, Please wait...</p>}
          {err && <p>{err}</p>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
