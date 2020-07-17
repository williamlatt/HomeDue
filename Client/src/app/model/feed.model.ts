import { Spesa } from 'src/app/model/spesa.model';

export class Feed {
    id: number;
    note: string;
    dataPubblicazione: Date;
    spesa: Spesa;
}
