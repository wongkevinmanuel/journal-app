// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch';
/* FErnando codigo
process.env.GLOBAL_VAR = 'global_mock';

require('dotenv').config((
    {
        path:'.env.test'
    }
));

jest.mock('./src/helpers/getEnvironments', () =>{
    getEnvironments: () => ({
        ...process.env
    })
})

// Mock del de import.meta.env en Jest
*/
Object.defineProperty( import.meta, 'env', {
    value: {
        VITE_API_URL: 'https://gracias-chatgpt.com',
        VITE_APP_NAME: 'Mi Aplicación de Pruebas'
    }
})