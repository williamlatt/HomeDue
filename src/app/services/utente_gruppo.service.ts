import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../constants';
import {Observable} from 'rxjs';
import { Utente_gruppo } from '../model/utente_gruppo.model';
import { Gruppo } from '../model/gruppo.model';
import { GruppoService } from './gruppo.service';


@Injectable({
    providedIn: 'root'
})
// tslint:disable-next-line: class-name
export class Utente_gruppoService {

    private $gruppo = this.gruppoService.getGruppo();
    private $g: Gruppo;
    constructor(private http: HttpClient, private gruppoService: GruppoService) {
    this.$gruppo.subscribe((element) => this.$g = element);
    }

    listaGruppoUtente(): Observable<Utente_gruppo[]> {
        return this.http.post<Utente_gruppo[]>(URL.GRUPPO_UTENTE, this.$g.id);
    }
    listaGruppoAllUtente(): Observable<Utente_gruppo[]> {
        return this.http.get<Utente_gruppo[]>(URL.GRUPPO_UTENTE_ALL);
    }
}
