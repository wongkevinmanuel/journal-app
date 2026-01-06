import { authSlice, login, logout } from '../../../src/store/auth/authSlice';
import { demoUser, initialState } from '../../fixtures/authFixtures';

describe('Prueba en el authSlice', ()=>{
    test('debe de regresar el estado inicial y llamarse auth', ()=>{
        //console.log(authSlice);
        expect(authSlice.name).toBe('auth');

        const state = authSlice.reducer( initialState, { type: '' } );
        /*
        console.log('State');
        console.log(state);

        console.log('State initial ');
        console.log(initialState);
        */
        expect( state ).toEqual(initialState);

    })

    test('debe de realizar la autenticacion', ()=>{

        const state = authSlice.reducer( initialState, login( demoUser));
        
        expect( state.status ).toEqual( 'authenticated');
        expect ( state ).toEqual({
            status:      'authenticated',
            uid:         demoUser.uid,
            email:       demoUser.email,
            displayName: demoUser.displayName,
            photoURL:    demoUser.photoURL,
            errorMessage: null
        });
    })

    test('debe de realizar el logout sin argumentos', ()=>{
        //authenticatedState //logout sin argumentos
        const state = authSlice.reducer( initialState, logout(''));
        expect( state. status ).toEqual( 'not-authenticated');
        //console.log(state.status);
        expect(state).toEqual({
            status:      'not-authenticated',
            uid:         null,
            email:       null,
            displayName: null,
            photoURL:    null,
            errorMessage: null,
        });

    })
    
    test('debe de realizar el logout y mostrar un mensaje de error',()=>{
        //authenticatedState //logout con argumentos
        const errorMessage = 'Credenciales no son correctas';
        const state = authSlice.reducer( initialState, logout(errorMessage));
        console.log(state);
        expect ( state.errorMessage).toEqual( errorMessage );
        expect( state ).toEqual({
            status:      'not-authenticated',
            uid:         null,
            email:       null,
            displayName: null,
            photoURL:    null,
            errorMessage: errorMessage,
        });
    })
})