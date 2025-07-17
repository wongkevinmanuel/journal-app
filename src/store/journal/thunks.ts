import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, Journal, setActiveNote,savingNewNote, setNotes, setSaving, updateNote, setUploadFilesUrls, deleteNoteById } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers";

//Thunk operaciones asincronas
//start = iniciar una operacion asincrona

const sendFirebase = async(uid: string, newNote: Journal) =>{
    //Referencia a la collecion donde se guardara las notas (documento)
    //construir /id-user/journal/notes
    const newDocumento = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    try{
        await setDoc(newDocumento, newNote);
        newNote.id = newDocumento.id;
        return newNote;
    }catch( error ){
        newNote.id = `0`;
        console.log("Error al guardar nota nueva en Firebase:", error);
        return newNote;
    }
}

export const startNewNote = () =>{
    return async ( dispatch: any, getState: any )=>{
        dispatch(savingNewNote());

        const { uid } = getState().auth;
        const newNote: Journal = {
            title: 'Nota prueba 1',
            body: 'Contenido de la nota',
            date: new Date().getTime(),
        }

        const noteUpdate = await sendFirebase(uid, newNote);
        
        dispatch(addNewEmptyNote(noteUpdate));
        dispatch(setActiveNote(noteUpdate));
    }
}

export const startLoadingNotes = () => {
    return async ( dispatch: any, getState: any ) =>{
        const { uid } = getState().auth;
        if(!uid) throw new Error(`El UID del usuario no existe`);
        const notes = await loadNotes(uid);
        dispatch(setNotes( notes ));
    }
}

export const startSaveNote = () => {
    return async ( dispatch: any, getState: any ) => {
        dispatch( setSaving());
        
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };
        //Eliminar el id para no sobreescribirlo en Firestore
        delete noteToFireStore.id; 

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        try{
             //merge mantener campos existentes firestore y objetos
            await setDoc( docRef, noteToFireStore, { merge: true } ); 
        } catch ( error ) {
            console.error("Error al guardar la nota Actualizada:", error);
            throw new Error('Error al guardar la nota Actualizada');
        }
        dispatch( updateNote(note));
    }
}

export const starUploadingFiles = ( files: FileList ) => {
    return async ( dispatch: any, getState: any ) => {
        dispatch( setSaving() );
        const fileUploadPromises: Promise<string>[] = [];

        for ( const file of files ){
            fileUploadPromises.push( fileUpload( file ));
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        dispatch( setUploadFilesUrls( photosUrls) );
    }
}

export const startDeletingNote = ()=> {
    return async(dispatch: any, getState : any)=>{
        const { uid } = getState().auth;
        const { active } = getState().journal;

        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${active.id}`);
        await deleteDoc(docRef);
        
        dispatch(deleteNoteById(uid));
    }
}
