import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { addNewEmptyNote, savingNewNote } from '../../../src/store/journal/journalSlice';
import { startNewNote } from '../../../src/store/journal/thunks';
import { FirebaseDB } from '../../../src/firebase/config';
describe('Pruebas en Journal Thunks', () => {
    
    const dispatch = jest.fn();
    const getState = jest.fn();
    //Por el uso de mocks global,
    //para asegurar que funciones mocks esten limpias
    //en estado inicial
    beforeEach( () => jest.clearAllMocks() );

    test('startNewNote debe crear una nueva nota en blanco', async () =>{
        const uid = 'TEST-UID';
        
        // getState.mockReturnValue({ auth: {uid:uid }});
        // await startNewNote()( dispatch, getState );
        // expect( dispatch ).toHaveBeenCalledWith( savingNewNote());

        // expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
        //      body: 'Contenido de la nota',
        //      title: 'Nota de prueba 1',
        //      id: expect.any(String),
        //      date: expect.any(Number),
        // }));
         
         //Borrar de firebase
            /*const coollectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
            const docs = await getDocs( coollectionRef);
            const deletePromises: any = [];
            docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref)));
            await Promise.all( deletePromises );*/
         //console.log(docs);
    });

})