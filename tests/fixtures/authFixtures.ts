type status_auth = 'not-authenticated' | 'authenticated' | 'checking' | 'failed';

interface authState {
    status?:     status_auth,
    uid:         string | null,
    email:       string | null,
    displayName: string | null,
    photoURL:    string | null,
    errorMessage?:string | null,
}

export const initialState: authState = {
    status:      'checking',
    uid:         null,
    email:       null,
    displayName: null,
    photoURL:    null,
    errorMessage: null,
}

export const authenticatedState: authState = {
    status:      'authenticated',
    uid:         '123ABC',
    email:       'demo@google.com',
    displayName: 'Demo User',
    photoURL:    'https://demo.jpg',
    errorMessage: null,
}

export const notAuthenticatedState: authState = {
    status:      'not-authenticated',
    uid:         null,
    email:       null,
    displayName: null,
    photoURL:    null,
    errorMessage: null,
}

export const demoUser = {
    uid: 'ABC123',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://foto.jpg'
}