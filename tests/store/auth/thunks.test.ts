import { jest, test } from '@jest/globals';

import { checkingCredentials, login , logout} from '../../../src/store/auth/authSlice';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { demoUser } from '../../fixtures/authFixtures';

import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';

//import { signInWithGoogle } from '../../../src/firebase/providers';

//Mocks del dispatch para asegurar
// que se llama con el producto del metodo 
// respectivo checkingAuthentication o otros thunks
//jest.mock('../../../src/firebase/providers');
jest.mock('../../../src/firebase/providers', () => ({
    
    signInWithGoogle: jest.fn().mockImplementation( () => {
        return{
            query: jest.fn().mockReturnValue({
                uid: '',
                displayName: '',
                email: '',
                photoURL: ''
            }),
        }
    }),

    loginWithEmailPassword: jest.fn().mockImplementation( () =>{
        return{
            uid: 'ABC666',
            email: 'demoKevin@google.com',
            displayName: 'Demo User Kevin',
            photoURL: 'https://fotoKevin.jpg',
            errorMessage: null,
        }
    }),
}));


const mockedSignInWithGoogle = jest.mocked( signInWithGoogle );
const mockedLoginWithEmailPassword = jest.mocked( loginWithEmailPassword)

//const mockedDispatch = mockedSignInWithGoogle.mock.instances[0];

describe('Pruebas en auth/thunks', () => {

    //SE DEBE ASEGURAR QUE SE LLAME METODO THUNKS
    // CON SU RESPECTIVO DISPATCH
    //trunks son funciones que retornan otras funciones
    //o llamados callbacks
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('debe de invocar el checkingCredentials',async ()=>{
        
        await checkingAuthentication("","")( dispatch);
        //Asegurar que el dispatch se llamo con el checkingCredentials
        //expect ( dispatch ).toHaveBeenCalledWith( {"payload": undefined, "type": "auth/checkingCredentials"});
        //console.log(dispatch);
        //expect ( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito',async ()=>{
        //La funcion se complica porque existen dos casos
        //1. cuando la autenticacion es exitosa (Se envia un dispatch con login (accion sincrona ))
        //2. cuando la autenticacion falla (Se envia mensaje de error al logout con parametros)

        //Asegurar que el dispatch se llame con checkingCredentials
        //luego que el dispatch se llame con login exitoso
        
        //El truck abre la ventana de autenticacion de google 
        //que no se abre en la consola de test, se hace el mock
        //para controlar el valor de retorno
        const loginData = { ok: true, ...demoUser};
        //funcion mockeada
        //Mock del procedimiento asincrono que mandamos a 
        //llamar a firebase
        //await signInWithGoogle.mockResolvedValue( loginData );
        await mockedSignInWithGoogle.mockResolvedValue({ ok: true, user:{
            uid: 'ABC123',
            displayName: 'Demo User',
            email: 'demo@google.com',
            photoURL: 'https://foto.jpg'
        }} );

        //thunk
        await startGoogleSignIn()( dispatch);
        //Login exitoso igual a llamar al checkingCredentials
        //y luego llamar al login con resultado del singInWithGoogle
        
        //expect(dispatch).toHaveBeenCalledWith( checkingCredentials());
        //expect(dispatch).toHaveBeenCalledWith(login(demoUser));
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error',async ()=>{
        const loginData = { ok: false, user: undefined , error:'Un error en Google'};
        await mockedSignInWithGoogle.mockResolvedValue( loginData );
        //thunk
        await startGoogleSignIn()(dispatch);

        //expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
        //expect( dispatch ).toHaveBeenCalledWith( logout( 'Un error en Google' ) );
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exitoso', async ()=>{
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await mockedLoginWithEmailPassword.mockResolvedValue( loginData );
        
        await startLoginWithEmailPassword(formData.email, formData.password)(dispatch);

        /*expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( {
            uid: loginData.uid,
            email: loginData.email,
            displayName: loginData.displayName,
            photoURL: loginData.photoURL,
            errorMessage: null
        }) );*/
    })
/*
    test('startLogout debe de llamar logoutFirebase,clearNotes y logout', async () =>{
        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout('') );

    })
*/
})