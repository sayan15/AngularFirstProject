import { Directive, ElementRef, HostListener,  Renderer2 } from "@angular/core";

@Directive({
    selector:'[bsCard]',
})

export class BsCardDirectives{
    constructor(private elementRef:ElementRef, private renderer:Renderer2){}

    ngOnInit(){
        this.renderer.setStyle(this.elementRef.nativeElement,'backgroundColor','yellow');
        this.renderer.setStyle(this.elementRef.nativeElement,'padding','10px');
        this.renderer.setStyle(this.elementRef.nativeElement,'color','white');
    }

    @HostListener('mouseenter') mouseHover(){
        this.renderer.setStyle(this.elementRef.nativeElement,'backgroundColor','blue');
    }
}