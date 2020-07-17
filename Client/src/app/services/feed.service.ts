import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../constants';
import {Observable} from 'rxjs';
import { Feed } from '../model/feed.model';


@Injectable({
    providedIn: 'root'
})

export class FeedService {
    constructor(private http: HttpClient) {

    }
    allFeed(): Observable<Feed[]> {
        return this.http.get<Feed[]>(URL.FEED_ALL);
    }
}
