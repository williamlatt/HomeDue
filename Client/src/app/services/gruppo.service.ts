import { GRUPPO_STORAGE } from './../constants';
import { Storage } from '@ionic/storage';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../constants';
import {Observable, BehaviorSubject} from 'rxjs';
import { Gruppo } from '../model/gruppo.model';



export interface newGruppo {
    name: string;
    link: string;
}
@Injectable({
    providedIn: 'root'
})

export class GruppoService {
    private gruppo$: BehaviorSubject<Gruppo> = new BehaviorSubject<Gruppo>({} as Gruppo);
    gruppos;
    constructor(private http: HttpClient, private storage: Storage) {
        this.storage.get(GRUPPO_STORAGE).then((gruppo) => {
            this.gruppo$.next(gruppo);
        });
    }

    listaGruppi(): Observable<Gruppo[]> {
        return this.http.get<Gruppo[]>(URL.GRUPPO);
       }

    nuovoGruppo(g: newGruppo) {
        return this.http.post<newGruppo>(URL.REGISTER_GRUPPO, g);
    }
    joinGroup(a) {
        return this.http.post(URL.GRUPPO_JOIN, a, {responseType: 'text'});
    }
    findGruppo(id) {
        return this.http.post<Gruppo>(URL.GRUPPO_ID, id);
    }
    getGruppo(): BehaviorSubject<Gruppo> {
        return this.gruppo$;
    }
}
