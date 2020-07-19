import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../constants';
import {Observable, BehaviorSubject} from 'rxjs';
import { Feed } from '../model/feed.model';
import { Gruppo } from '../model/gruppo.model';
import { GruppoService } from './gruppo.service';


@Injectable({
    providedIn: 'root'
})

export class FeedService {
    private $gruppo = this.gruppoService.getGruppo();
    private $g: Gruppo;

    constructor(private http: HttpClient,private gruppoService: GruppoService) {
        this.$gruppo.subscribe((element) => this.$g = element);
    }
    allFeed(): Observable<Feed[]> {
        return this.http.post<Feed[]>(URL.FEED_ALL, this.$g.id);
    }
}
