import {
     trigger,
     transition,
     style,
     query,
     group,
     animateChild,
     animate,
     keyframes
 } from '@angular/animations';



 export const fader = 
 trigger('routeAnimations',[
    transition('*<=>*',[
        query(':enter, :leave',[
            style({
                position: 'absolute',
                left:0,
                width:'100% ',
                opacity:0 ,
               //  transform:'rotate(180deg)',
            }),
        ],{optional:true}),
        query(':enter',[
            animate('500ms ease',
            style({
                opacity:1,
                // transform:'rotate(0deg)'
            })
            )
        ],{optional:true}),
    ]),
 ]);