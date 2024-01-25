'use client'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebase_app from "./config"


const auth = getAuth(firebase_app)

const signUserUp = async(email:string, password:string) =>{

    let result = null
    let error = null

    try {
        result = await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
        error = e;
    }

    return {result, error}
}

const signUserIn = async(email:string, password:string) =>{

    let result = null
    let error = null

    try {
        result = await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
        error = e;
    }

    return {result, error}
}


const signUserOut = async(email:string, password:string) =>{

    let result = null
    let error = null

    try {
        result = await signOut(auth)
    } catch (e) {
        error = e;
    }

    return {result, error}
}


export {signUserIn, signUserOut, signUserUp}