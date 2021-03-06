import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MediaItem } from './MediaItem';
import { MediaItemService } from './media-item.service';

import { lookupListToken }  from './providers';

@Component({
    selector: 'mw-media-item-form',
    templateUrl: 'app/media-item-form.component.html',
    styleUrls: ['app/media-item-form.component.css']
})

export class MediaItemFormComponent {
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private mediaItemService: MediaItemService,
        @Inject(lookupListToken) public lookupLists: any,
        private router: Router) { }

    ngOnInit() {
        this.form = this.formBuilder.group( {
            medium: this.formBuilder.control('Movies'),
            name: this.formBuilder.control('', Validators.compose([
                Validators.pattern('[\\w\\-\\s\\/]+'),
                Validators.required
            ])),
            category: this.formBuilder.control(''),
            year: this.formBuilder.control('', this.yearValidator)
        });
    }

    onSubmit(mediaItem: MediaItem) {
        this.mediaItemService.add(mediaItem)
            .subscribe(() => {
                this.router.navigate(['/', mediaItem.medium]);
            });
    }

    yearValidator(control: FormControl) {
        if (control.value.trim().length === 0) {
            return null;
        }

        let year = parseInt(control.value, 10);
        let minYear = 1875;
        let maxYear = 2017;
        if (year >= minYear && year <= maxYear) {
           return null;
        }

        return {'year': {min: minYear, max: maxYear}};
    }
}
