import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from '@reduxjs/toolkit';

export type Journal = {
    id?: string;
    title: string;
    body: string;
    date: number,
    imageUrls?: string [] | null;
}

interface journalState {
    isSaving : boolean,
    messagesSaved: string,
    notes: Journal[],
    active: Journal | null,
}

const initialState: journalState = {
    isSaving: false,
    messagesSaved: '',
    notes: [],
    active: null,
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    //Acciones sincronas !!!
    reducers: {
        savingNewNote: (state) =>{
            state.isSaving = true;
            state.messagesSaved = ``;//'Inicializando guardado Note';
        },
        addNewEmptyNote: ( state, action: PayloadAction<Journal>)=>{
            //Crear una nueva nota vacía, se tienen que agregar los datos de la nota
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action: PayloadAction<Journal>)=>{
            //Establecer que la nota activa es la que se ha seleccionado (Click)
            state.active = action.payload;
            state.messagesSaved = ``;
        },
        setNotes: (state, action: PayloadAction<Journal[]>)=>{
            //Establecer las notas que se han cargado desde el servidor
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true ;
            //TODO: mensaje de error...
            state.messagesSaved = ``;
        },
        updateNote: (state, action: PayloadAction<Journal | null>)=>{
            //Actualizar la referencia de la nota de app localmente
            state.isSaving = false;
            state.notes = state.notes.map( (note) => { 
                    if( note.id === action.payload!.id){
                        return action.payload!;
                    } 
                    return note;
                });
            state.messagesSaved = `${action.payload!.title} : actualizada correctamente.`;
        },
        setUploadFilesUrls: ( state, action: PayloadAction<string[]>)=>{
            state.active?.imageUrls!.push(...action.payload);
        },
        clearNotesLogout: (state)=>{
            state.isSaving = false;
            state.messagesSaved = '';
            state.active = null;
            state.notes = [];
        },
        deleteNoteById: (state, action: PayloadAction<string>)=>{
            //store quitar la nota activa
            state.active = null;
            //quitar arreglos de la notas
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        }, 
    }
})

export const {
        clearNotesLogout,
        savingNewNote,
        addNewEmptyNote, 
        setActiveNote,
        setNotes,
        setSaving,
        updateNote,
        setUploadFilesUrls, 
        deleteNoteById} = journalSlice.actions;