import { Gruppo } from './model/gruppo.model';
export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost:8080/mydues/api';

export const URL = {

    // UTENTE URL
    LOGIN: URL_BASE + '/login',
    LOGOUT: URL_BASE + '/logout',
    REGISTER_UTENTE: URL_BASE + '/signup',

    // GRUPPO URL
    REGISTER_GRUPPO: URL_BASE + '/gruppo/register',
    GRUPPO_ID: URL_BASE + '/gruppo/id',
    GRUPPO: URL_BASE + '/gruppo',
    GRUPPO_SINGOLO: URL_BASE + '/gruppo/singolo',

    // UTENTE_GRUPPO URL
    GRUPPO_JOIN: URL_BASE + '/utente_gruppo/join',
    GRUPPO_UTENTE_ALL: URL_BASE + '/utente_gruppo/all',
    GRUPPO_UTENTE: URL_BASE + '/utente_gruppo',

    // UTENTE_SPESA URL
    SPESA_UTENTE: URL_BASE + '/utente_spesa',
    // SPESA URL
    SPESA_ALL: URL_BASE + '/spesa/all',
    ADD_SPESA: URL_BASE + '/spesa/add',
    DELETE_SPESA: URL_BASE + '/spesa/delete',
    RESTORE_SPESA: URL_BASE + '/spesa/restore',
    SALDO: URL_BASE + '/spesa/salda/',
    ADD_SALDO: URL_BASE + '/spesa/addSaldo',
    // FEED URL
    FEED_ALL: URL_BASE + '/feed/all',
    // IMG URL
    UPLOAD: URL_BASE + '/spesa/img'
};

export const LOGIN_ERROR_TITLE = 'Login Fallito!';

export const LOGIN_ERROR_SUB_TITLE = 'Username o Password ERRATI';

export const SIGNUP_ERROR_TITLE = 'La registrazione NON è andata a buon fine!';

export const SIGNUP_ERROR_SUB_TITLE = 'L\'email inserita esiste già';

export const X_AUTH = 'X-Auth';

export const AUTH_TOKEN = 'auth-token';

export const UTENTE_STORAGE = 'utente';

export const GRUPPO_STORAGE = 'gruppo';

