import { signInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email:string, password: string) =>{
    return async (dispatch: any) =>{
        dispatch( checkingCredentials());
    }
}

//start en el nombre para especificar el inicio de tarea asyncrona
export const startGoogleSignIn = () => {
    return async (dispatch:any) => {
        // Simulate Google Sign-In
        dispatch(checkingCredentials());
        // llama metodos de autenticacion nueva ventana.
        const result = await signInWithGoogle();
        
        //console.log({result});

        if(!result.ok){
            //return evita que se ejecute el resto del codigo 
            return dispatch( logout( result.error ) );
        }

        dispatch(
            login({
                status: 'authenticated',
                uid: result.user!.uid,
                email:result.user!.email,
                displayName: result.user!.displayName,
                photoURL: result.user!.photoURL,
                errorMessage: null,
            } ));
    }
}

export const startCreatingUserWithEmailPassword = (email:string, password: string, displayName: string )=>{
    return async( dispatch: any) => {
        // Proceso sincrono
        dispatch( checkingCredentials());
        // Proceso asincrono
        const {ok, uid, photoURL, errorMessage} = 
                    await registerUserWithEmailPassword(email, password, displayName);
        
        if(!ok){
            return  dispatch( logout(errorMessage ?? 'Unknown error:thunk.ts/startCreatingUserWithEmailPassword'));
        }

        dispatch(login({
            uid: uid!,
            email: email!,
            displayName: displayName!,
            photoURL: photoURL ?? null,
            errorMessage: errorMessage!,
        }));
    }
}

export const startLoginWithEmailPassword = (email:string, password: string) => {
    return async ( dispatch : any )=>{
        //Proceso sincrono
        dispatch( checkingCredentials());
        //Proceso asincrono
        const { ok, uid, photoURL, displayName, errorMessage } =
            await loginWithEmailPassword(email, password);

        if(!ok){
            return dispatch(logout(errorMessage ?? `Unknown error:thunk.ts/startLoginWithEmailPassword`));
        }

        /*console.log('Disparado en startLoginWithEmailPassword');
        console.log({
                uid: uid!,
                email: email!,
                displayName: displayName!,
                photoURL: photoURL ?? null,
                errorMessage: null,
        });*/

        dispatch(
            login({
                uid: uid!,
                email: email!,
                displayName: displayName!,
                photoURL: photoURL ?? null,
                errorMessage: null,
        }));
    }
}

export const startLogout = () =>{
    return async(dispatch: any)=>{
        //Proceso asincrono
        await logoutFirebase();
        //Proceso sincrono
        dispatch(clearNotesLogout());
        //dispatch(logout('store.auth.thunks.logoutFirebase') );
        dispatch(logout('') );
    };
}