import { Effect, use } from "@marblejs/core";
import { Joi, validator$ } from "@marblejs/middleware-joi";
import { writeFile } from "fs";
import { Observable, Observer, throwError } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

const imageValidator$ = validator$({
  body: Joi.binary(),
});

const upload$ = (file: any): Observable<string> =>
  Observable.create((observer: Observer<string>) => {
    const path = "/tmp/" + new Date().getTime();

    writeFile(path, file, err => {
      if (err) {
        observer.error(err);
      }

      observer.next(path);
      observer.complete();
    });
  });

export const postImageEffect$: Effect = req$ =>
  req$.pipe(
    use(imageValidator$),
    map(req => {
      console.log(req.headers);
      return req.body;
    }),
    mergeMap(req => upload$(req.body)),
    catchError(err => throwError(err)),
    map(fileUrl => {
      console.log(fileUrl);
      return { body: fileUrl };
    }),
  );