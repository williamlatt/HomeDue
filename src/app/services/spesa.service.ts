import { GruppoService } from 'src/app/services/gruppo.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../constants';
import {Observable} from 'rxjs';
import { Spesa } from '../model/spesa.model';
import { Feed } from '../model/feed.model';
import { Gruppo } from '../model/gruppo.model';


@Injectable({
    providedIn: 'root'
})

export class SpesaService {
    private $gruppo = this.gruppoService.getGruppo();
    private $g: Gruppo;
    constructor(private http: HttpClient, private gruppoService: GruppoService) {
    this.$gruppo.subscribe((element) => this.$g = element);
    }
    listaSpese(): Observable<Spesa[]> {
        return this.http.post<Spesa[]>(URL.SPESA_ALL, this.$g);
       }

    addSpesa(result) {
       return this.http.post(URL.ADD_SPESA, result);
    }
    delete(s: Spesa) {
        const url = `${URL.DELETE_SPESA}/${this.$g.id}`;
        return this.http.post<Spesa>(url, s);
    }
    restoreSpesa(s: Feed) {
        return this.http.post<Spesa>(URL.RESTORE_SPESA, s);
    }
    Saldo(s: Feed, accettato: boolean) {
        const apiURL = `${URL.SALDO}/${accettato}`;
        return this.http.post<Feed>(apiURL, s);
    }
    addSaldo(valori) {
        const url2 = `${URL.ADD_SALDO}/${this.$g.id}`;
        return this.http.post(url2, valori);
    }
}
