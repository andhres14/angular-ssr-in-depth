import { inject, Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { CoursesService } from './courses.service';
import { first, tap } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';


@Injectable()
export class CourseResolver implements Resolve<Course> {

  private transferState = inject(TransferState);

  constructor(
    private coursesService: CoursesService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Course> {
    const courseId = route.params['id'];

    const COURSE_KEY = makeStateKey<Course>( `courseKey-${courseId}` );

    if ( this.transferState.hasKey( COURSE_KEY ) ) {
      // console.log(`Desde el ${ this.platformId } consumo el valor`)
      const course = this.transferState.get(COURSE_KEY, null);
      // lo eliminamos del almacenamiento del state transfer
      this.transferState.remove( COURSE_KEY );
      return of(course);
    } else {
      return this.coursesService.findCourseById( courseId )
        .pipe(
          first(),
          tap( course => {
            if ( isPlatformServer(this.platformId) ) {
              // console.log(`Desde el ${ this.platformId } seteo el valor`)
              this.transferState.set( COURSE_KEY, course );
            }
          })
        );
    }
  }

}
