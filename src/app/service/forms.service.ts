import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {catchError, Observable, tap, throwError} from 'rxjs'
import config from "../../../config/config.json";

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  constructor(
    private http: HttpClient
  ) {
  }

  forms: any[] = [];

  getForms(): Observable<any> {
    return this.http.get<any>(config.oformsUrl).pipe(
      tap(response => {
          var fileOforms = response.data.map((item: { attributes: { file_oform: { data: any[] } } }) => {
              return item.attributes.file_oform.data.find((f) => f.attributes.ext === ".oform");
          });

          var forms = fileOforms.map((form: { attributes: { url: any; name: any } }) => {
            return form && form.attributes
              ? { value: { title:form.attributes.name, url: form.attributes.url }, label: form.attributes.name }
              : null;
          }).filter((o: any) => o != null);

        this.forms = forms;
      }),
      catchError(error => throwError(() => error.message))
    )
  }
}