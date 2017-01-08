import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { MediaItem } from './MediaItem';
import { MediaItemService } from './media-item.service';

@Component({
  selector: 'mw-media-item-list',
  templateUrl: 'app/media-item-list.component.html',
  styleUrls: ['app/media-item-list.component.css']
})

export class MediaItemListComponent {
  mediaItems: MediaItem[] = [];
  medium: string = '';
  paramsSubscription: Subscription;

  constructor(
    private mediaItemService: MediaItemService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params
      .subscribe(params => {
        let medium: string = params['medium'];
        if (medium.toLowerCase() === 'all') {
          medium = '';
        }
        this.getMediaItems(medium);
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onMediaItemDelete(mediaItem: MediaItem) {
    this.mediaItemService.delete(mediaItem)
      .subscribe(() => {
        this.getMediaItems(this.medium);
      });
  }

  getMediaItems(medium: string) {
    this.medium = medium;
    this.mediaItemService.get(this.medium)
    .subscribe(mediaItems => {
      this.mediaItems = mediaItems;
    });
  }
};
