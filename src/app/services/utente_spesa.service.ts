import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../constants';
import {Observable} from 'rxjs';
import { Utente_spesa } from '../model/utente_spesa.model';
import { Gruppo } from '../model/gruppo.model';
import { GruppoService } from './gruppo.service';


@Injectable({
    providedIn: 'root'
})
export class Utente_spesaService {

    private $gruppo = this.gruppoService.getGruppo();
    private $g: Gruppo;
    constructor(private http: HttpClient, private gruppoService: GruppoService) {
        this.$gruppo.subscribe((element) => this.$g = element);
    }

    listaSpesaUtente(): Observable<Utente_spesa[]> {
        return this.http.get<Utente_spesa[]>(URL.SPESA_ALL);
    }
    listaSpese(): Observable<Utente_spesa[]> {
        return this.http.post<Utente_spesa[]>(URL.SPESA_UTENTE, this.$g.id);
    }
   
}
