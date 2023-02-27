import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDoc,
  doc,
  setDoc,
  getDocs,
  arrayUnion,
  updateDoc,
  where,
  arrayRemove,
  query,
  collection
} from "firebase/firestore";

import { auth, db } from "../../config/firebase.js";

import { signInWithEmailAndPassword } from "firebase/auth";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ email, password }) => {
    let userUid = "";
    let metaData = "";

    await signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        userUid = cred.user.uid;
        metaData = cred.user.metadata;
      })
      .catch((err) => {
        return alert("login error", err.message);
      });

    let userDocRef = doc(db, "users", userUid);

    const res = await getDoc(userDocRef)
      .then((r) => {
        return r.data();
      })
      .catch((e) => alert("error in getDoc-getUser in userSlice:", e));

    return res;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        /*  console.log("loading"); */
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state = action.payload;
       
        return state;
      });
  }
});

const { actions, reducer } = userSlice;

export default reducer;
