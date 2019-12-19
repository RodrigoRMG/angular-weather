import { trigger,state,style,transition, animate } from "@angular/animations"

export const showUp = trigger('showUpElement',[
    state('in', style({ opacity:1, transform: 'scale(1)'})),
    transition(':enter', [
        style({opacity:0, transform:'scale(0)'}),
        animate(250)
    ])
]);