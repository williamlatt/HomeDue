import { Gruppo } from './gruppo.model';


export class Spesa {
    id: number;
    descrizione: string;
    importo: number;
    link: string;
    immagine: String;
    dataPubblicazione: Date;
    gruppo: Gruppo;
    requested: boolean;
    accettata: boolean;
    deleted: boolean;
}
