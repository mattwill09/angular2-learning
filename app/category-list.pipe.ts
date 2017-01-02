import { Pipe } from '@angular/core';

import {
  MediaItem
} from './MediaItem';

@Pipe({
    name: 'categoryList',
    pure: true
})

export class CategoryListPipe {
    transform(mediaItems: MediaItem[]) {
        let categories: string[] = [];

        mediaItems.forEach(mediaItem => {
            if (categories.indexOf(mediaItem.category) < 0) {
                categories.push(mediaItem.category);
            }
        });

        return categories.join(', ');
    }
}
