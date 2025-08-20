import { Directive,Inject,OnInit,PLATFORM_ID,TemplateRef,ViewContainerRef } from "@angular/core";
import { isPlatformServer } from "@angular/common";

@Directive({
  selector: '[appShellRender]'
})
export class AppShellRenderDirective implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    // console.log(`[appShellRender] Platform: ${ this.platformId }`);
    if (isPlatformServer(this.platformId)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
