// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch';

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