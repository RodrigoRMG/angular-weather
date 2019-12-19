import { trigger,state,style,transition, animate,query, stagger } from "@angular/animations"

export const shoUpStaggered = trigger('showUpCollection',[
    transition('* => *', [
        query(':enter',[
            style({opacity:0, transform:'scale(0)'}),
            stagger(70,[
                animate(200, style({ opacity:1, transform: 'scale(1)'}))
            ]),
           
        ], {optional: true})
    ])
])

export const showUp = trigger('showUpElement',[
    state('in', style({ opacity:1, transform: 'scale(1)'})),
    transition(':enter', [
        style({opacity:0, transform:'scale(0)'}),
        animate(250)
    ])
]);