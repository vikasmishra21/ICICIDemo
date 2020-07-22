import {Injectable} from '@angular/core';
import {Collection} from '../models/collection';
import {Observable} from 'rxjs';
import {HttpClientUtil} from '../util/httpClient';
import {map, mergeMap} from 'rxjs/operators';
import {CollectionOutput} from '../models/collectionOutput';
import {DataTransformer} from '../util/dataTransformer';
import {CollectionUtil} from '../util/collectionUtil';
import {SurveyTree} from '../models/SurveyTree';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private readonly STORAGE_KEYS = {
    QuestionnaireVersion: 'qversion',
    QuestionnaireData: ''
  };

  constructor(private http: HttpClientUtil) {
    const version = localStorage.getItem(this.STORAGE_KEYS.QuestionnaireVersion);
    this.STORAGE_KEYS.QuestionnaireData = `tree_2_${version}`;
    const qData = localStorage.getItem(this.STORAGE_KEYS.QuestionnaireData);
    if (qData !== null) {
      CollectionUtil.setVariableMap(JSON.parse(qData));
    } else {
      //router.navigate(['/']);
    }
    // CollectionUtil.setVariableMap(new SurveyTree().getSurveyTree());
  }

  populateVariableMap(): Observable<void> {
    return this.getQuestionnaireVersion()
      .pipe(
        map(
          (version: string) => {
            localStorage.setItem(this.STORAGE_KEYS.QuestionnaireVersion, version);
            return version;
          }),
        mergeMap(
          (version: string) => this.getExpandedSurveyTree(version, '2')
        )
      );
  }

  getQuestionnaireVersion(): Observable<string> {
    const quesURL = `${this.http.PATHS.PROJECT_URL}Survey/SurveyProperties/`;
    if (localStorage.getItem(this.STORAGE_KEYS.QuestionnaireVersion) === null) {
      return this.http.get(quesURL).pipe(map((response: any) => response.ActiveQuestionnaireVersion + 1));
    } else {
      return Observable
        .create(obs => {
          obs.next(localStorage.getItem(this.STORAGE_KEYS.QuestionnaireVersion));
          obs.complete();
        });
    }
  }

  getExpandedSurveyTree(version: string, type: string): Observable<void> {
    const surveyTreeURL = `${this.http.PATHS.PROJECT_URL}Survey/${version}/SurveyTree/2?expand=true`;
    this.STORAGE_KEYS.QuestionnaireData = `tree_${type}_${version}`;
    // means not present locally then delete locally stored survey tree
    if (localStorage.getItem(this.STORAGE_KEYS.QuestionnaireData) === null) {
      for (const i in localStorage) {
        if (i.indexOf('tree_' + type + '_') > -1) {
          localStorage.removeItem(i);
        }
      }
      return this.http.get(surveyTreeURL)
        .pipe(
          map((response: any) => {
            const variableMap = CollectionUtil.populateVariableMap(response.RootNodes);
            const objMap = Array.from(variableMap).reduce((obj, [key, value]) => (
              Object.assign(obj, {[key]: value})
            ), {});
            localStorage.setItem(this.STORAGE_KEYS.QuestionnaireData, JSON.stringify(objMap));
          }));
    } else {
      return Observable.create(
        obs => {
          if (!CollectionUtil.hasVariableMap()) {
            CollectionUtil.setVariableMap(JSON.parse(localStorage.getItem(this.STORAGE_KEYS.QuestionnaireData)));
          }
          obs.next();
          obs.complete();
        });
    }
  }

  getCollectionOutput(collection: Collection): Observable<CollectionOutput> {
    const url = this.http.PATHS.PROJECT_URL + 'Analysis/Collection';
    return this.http.post(url, collection)
      .pipe(
        map((response: any) => {
          const output = new CollectionOutput();
          // TODO: calculate base logic
          // TODO: if sig test then add
          Object.keys(response[collection.Name]).forEach(value => {
            const flatData =  DataTransformer.toFlatTableOutput(response[collection.Name][value], collection.getAnalysisType());
            output.TableOutput.set(value, flatData.filter(value => {
              return value.SeriesCode !== 'unweightedbase' && value.SeriesCode !== 'effectivebase' && value.SeriesCode !== 'base'
            }));
            output.Bases.set(value, flatData.filter(value => value.SeriesCode === 'unweightedbase'));
            output.EffectiveBases.set(value, flatData.filter(value => value.SeriesCode === 'effectivebase'));
          });
          return output;
        })
      );
  }

  getFilterData(filterSyntax: object): Observable<any> {
    const url = this.http.PATHS.PROJECT_URL + 'Analysis/FilterCascadingwithfilter';
    return this.http.post(url, filterSyntax);
  }

  getFile(fileName: string): Observable<any> {
    return this.http.get(fileName);
  }

}
