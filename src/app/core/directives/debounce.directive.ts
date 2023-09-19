import { EventEmitter, Input, OnDestroy, OnInit, Self } from '@angular/core';
import { Directive, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Directive({
    selector: '[ngModel][onDebounce]'
})
export class DebounceDirective implements OnInit, OnDestroy {

    @Output()
    public onDebounce = new EventEmitter<any>();

    @Input('debounce')
    public debounceTime: number = 500;

    private subscription: Subscription = new Subscription();

    constructor(@Self() public model: NgControl) {
    }

    ngOnInit() {
        if (this.model?.valueChanges) {
            this.subscription = this.model?.valueChanges
                .pipe(
                    debounceTime(this.debounceTime),
                    distinctUntilChanged(),
                    tap(value => {
                        if (typeof value !== 'undefined') this.onDebounce.emit(value);
                    })
                )
                .subscribe();
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
