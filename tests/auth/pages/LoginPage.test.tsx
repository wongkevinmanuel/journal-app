/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react"
import { LoginPage } from "../../../src/auth/pages"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../../src/store/auth/authSlice"
import { notAuthenticatedState } from "../../fixtures/authFixtures"
import { startGoogleSignIn } from "../../../src/store/auth/thunks"

const mockStartGoogleSignIn = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    //Especificar el estado inicial para login 
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('Pruebas en <LoginPage />', () =>{
    test('Debe de mostrar el componente correctamente', ()=> {
        render(
            <Provider store= {store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );
        screen.debug();
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    })

    test('boton de google debe de llamar el startGoogleSignIn', ()=>{
        // TODO el componente
        render(
            <Provider store = {store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        )
        //Buscar el boton en LoginPage y simular el click
        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);
        //Verificar llamada a la funcion con lo argumentos esperados
        //Mockear la funcion startGoogleSignIn y de los thrunk
        expect( mockStartGoogleSignIn ).toHaveBeenCalled();
    })
})