import { Directive,Inject,OnInit,PLATFORM_ID,TemplateRef,ViewContainerRef } from "@angular/core";
import { isPlatformServer } from "@angular/common";

@Directive({
  selector: '[appShellNoRender]'
})
export class AppShellNoRenderDirective implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    // console.log(`[appShellNoRender] Platform: ${ this.platformId }`);
    if (isPlatformServer(this.platformId)) {
      this.viewContainerRef.clear();
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

}
