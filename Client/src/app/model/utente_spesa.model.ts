import { Spesa } from './spesa.model';
import { Utente } from './utente.model';
import { ProviderAst, MethodCall } from '@angular/compiler';

// tslint:disable-next-line: class-name
export class Utente_spesa {
    spesa: Spesa;
    utente: Utente;
    proprietario: boolean;
    importo: number;
}