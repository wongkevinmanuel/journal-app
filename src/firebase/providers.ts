import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

export type UserPropsGoogle= {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    uid: string;
}

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async ()=> {
    try{
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        const user:UserPropsGoogle= {
            uid:         result.user.uid,
            displayName: result.user.displayName || null,   
            email:       result.user.email || null,
            photoURL:    result.user.photoURL || null,
        };

        return {
            ok: true,
            user: user
        }
    }catch( error ){
        return {
            ok: false,
            error: (error as Error).message,
        }
    }
}

export const registerUserWithEmailPassword = async ( email: string, password: string, displayName: string)=>{
    try{
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email, password);
        const { uid, photoURL } = resp.user;
 
        updateProfileFireB(displayName, photoURL!);

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
        }
    }catch( error ){
        return {
            ok: false,
            errorMessage: error instanceof Error ?
                 error.message : 'Error al crear el usuario',
        }
    }
}

const updateProfileFireB = async( displayName: string, photoURL:string)=>{
    try{
        await updateProfile(FirebaseAuth.currentUser!, { displayName, photoURL});
        return;
    }catch( error){
        console.log(error);
        return {
            ok: false,
            errorMessage: error instanceof Error ?
                 error.message : 'Error al actualizar el perfil',
        }
    }
}

export const loginWithEmailPassword = async( email: string, password: string)=>{
    try{
        //Llamar con Firebase Auth
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, displayName, photoURL } = resp.user;
        return {
            ok: true,
            uid,
            email,
            displayName: displayName!,
            photoURL: photoURL,
        };
    }catch( error){
        return {
            ok: false,
            errorMessage: error instanceof Error ?
                error.message : 'Error al iniciar sesion',
        }
    }
}

export const logoutFirebase = async ()=> {
    try{
        return await FirebaseAuth.signOut();
    }catch(error ){
        
        return {
        ok: false,
        errorMesage: error instanceof Error ?
            error.message : 'Error al logout sesion'
        }
    }
} 