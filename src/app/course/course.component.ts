import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

import { Lesson } from '../model/lesson';
import { Meta,Title } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { AppShellNoRenderDirective } from "../directives/app-shell-no-render.directive";


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: [ './course.component.scss' ],
  imports: [ NgIf,MatProgressSpinnerModule,MatTableModule,AppShellNoRenderDirective ]
})
export class CourseComponent implements OnInit {


  course: Course;

  dataSource: MatTableDataSource<Lesson>;

  displayedColumns = [ "seqNo","description","duration" ];


  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private title: Title,
    private meta: Meta) {

  }


  ngOnInit() {
    this.course = this.route.snapshot.data["course"];

    this.title.setTitle(this.course.description);
    this.meta.updateTag({ name: 'description', content: this.course.longDescription });
    this.meta.updateTag({ name: 'image', content: this.course.iconUrl });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@andhres14' });
    this.meta.updateTag({ name: 'twitter:title', content: this.course.description });
    this.meta.updateTag({ name: 'twitter:description', content: this.course.longDescription });
    this.meta.updateTag({ name: 'twitter:image', content: this.course.iconUrl });

    this.meta.updateTag({ name: 'og:description', content: this.course.longDescription });
    this.meta.updateTag({ name: 'og:image', content: this.course.iconUrl });



    this.dataSource = new MatTableDataSource([]);

    this.coursesService.findAllCourseLessons(this.course.id)
      .subscribe(lessons => this.dataSource.data = lessons);

  }


}
