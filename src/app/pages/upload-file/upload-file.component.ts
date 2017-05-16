import {Component, OnInit} from '@angular/core';
import {Headers, RequestOptions, Http} from "@angular/http";
import {Observable} from "rxjs";
import {ConfigService} from "../../core/config.service";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  private urlVariable: string;

  constructor(private config: ConfigService, private http: Http) {
    this.urlVariable = "http://localhost:8080/public/file/imagen.jpg";
  }

  ngOnInit() {
  }


  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      this.http.post('http://localhost:8080/public/file', formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error)).subscribe(
        data => {
          this.urlVariable = "http://localhost:8080/public/file/"+file.name, console.log('success')
        },
        error => console.log(error)
      )
    }
  }
}
