import { Effect } from "@marblejs/core";
import { of } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import { ArticleDao } from "../model/article.dao";

export const getArticleListEffect$: Effect = req$ =>
  req$.pipe(
    mergeMap(req =>
      of(req).pipe(
        mergeMap(ArticleDao.findAllPublished),
        map(articleList => ({ body: articleList })),
      ),
    ),
  );
