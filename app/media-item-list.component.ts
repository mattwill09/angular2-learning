import { Component } from '@angular/core';

import { MediaItem } from './MediaItem';
import { MediaItemService } from './media-item.service';

@Component({
  selector: 'mw-media-item-list',
  templateUrl: 'app/media-item-list.component.html',
  styleUrls: ['app/media-item-list.component.css']
})

export class MediaItemListComponent {
  mediaItems: MediaItem[];

  constructor(private mediaItemService: MediaItemService) {}

  ngOnInit() {
    this.mediaItems = this.mediaItemService.get();
  }

  onMediaItemDelete(mediaItem: MediaItem) {
    this.mediaItemService.delete(mediaItem);
  }
};
