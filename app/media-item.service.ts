import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MediaItem } from './MediaItem';

@Injectable()
export class MediaItemService {

  constructor(private http: Http) {}

  get(medium: string): Observable<MediaItem[]> {
    let searchParams = new URLSearchParams();
    searchParams.append('medium', medium);

    return this.http.get('mediaitems', {search: searchParams})
    .map(response => {
      return response.json().mediaItems;
    });
  }

    add(mediaItem: MediaItem): Observable<void> {
      return this.http.post('mediaitems', mediaItem)
      .map(response => {});
    }

    delete(mediaItem: MediaItem): Observable<void> {
        return this.http.delete(`mediaitems/${mediaItem.id}`)
          .map(response => {});
    }
}
