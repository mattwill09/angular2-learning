import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { MediaItem } from './MediaItem';

export class MockXHRBackend {
  private _mediaItems: MediaItem[] = [{
    id: 1,
    name: 'Firebug',
    medium: 'Series',
    category: 'Science Fiction',
    year: 2010,
    watchedOn: 1294166565384,
    isFavorite: false
  }, {
    id: 2,
    name: 'The Small Tall',
    medium: 'Movies',
    category: 'Comedy',
    year: 2015,
    watchedOn: null,
    isFavorite: true
  }, {
    id: 3,
    name: 'The Redemption',
    medium: 'Movies',
    category: 'Action',
    year: 2016,
    watchedOn: null,
    isFavorite: false
  }, {
    id: 4,
    name: 'Hoopers',
    medium: 'Series',
    category: 'Drama',
    year: null,
    watchedOn: null,
    isFavorite: true
  }, {
    id: 5,
    name: 'Happy Joe: Cheery Road',
    medium: 'Movies',
    category: 'Action',
    year: 2015,
    watchedOn: 1457166565384,
    isFavorite: false
  }];
  constructor() {}

  createConnection(request: Request) {
    let response = new Observable((responseObserver: Observer < Response > ) => {
      // let responseData;
      let responseOptions: ResponseOptions;
      switch (request.method) {
        case RequestMethod.Get:
          if (request.url.indexOf('mediaitems?medium=') >= 0 || request.url === 'mediaitems') {
            let medium: string;
            if (request.url.indexOf('?') >= 0) {
              medium = request.url.split('=')[1];
              if (medium === 'undefined') {
                medium = '';
              }
            }

            let mediaItems: MediaItem[];
            if (medium) {
              mediaItems = this._mediaItems.filter(mediaItem => mediaItem.medium === medium);
            } else {
              mediaItems = this._mediaItems;
            }

            responseOptions = new ResponseOptions({
              body: {
                mediaItems: JSON.parse(JSON.stringify(mediaItems))
              },
              status: 200
            });
          } else {
            let id = parseInt(request.url.split('/')[1], 10);

            let mediaItems = this._mediaItems.filter(mediaItem => mediaItem.id === id);

            responseOptions = new ResponseOptions({
              body: JSON.parse(JSON.stringify(mediaItems[0])),
              status: 200
            });
          }
          break;
        case RequestMethod.Post:
          let mediaItem: MediaItem = JSON.parse(request.text().toString());
          mediaItem.id = this._getNewId();
          this._mediaItems.push(mediaItem);
          responseOptions = new ResponseOptions({
            status: 201
          });
          break;
        case RequestMethod.Delete:
          let id = parseInt(request.url.split('/')[1], 10);
          this._deleteMediaItem(id);
          responseOptions = new ResponseOptions({
            status: 200
          });
          break;
      }

      let responseObject = new Response(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => {};
    });
    return {
      response
    };
  }

  private _deleteMediaItem(id: number) {
    let mediaItem = this._mediaItems.find(item => item.id === id);
    let index = this._mediaItems.indexOf(mediaItem);

    if (index >= 0) {
      this._mediaItems.splice(index, 1);
    }
  }

  private _getNewId(): number {
    if (this._mediaItems.length > 0) {
      return Math.max.apply(Math, this._mediaItems.map(item => item.id)) + 1;
    }
  }
}

