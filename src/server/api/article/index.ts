import { combineRoutes, EffectFactory } from "@marblejs/core";

import { authorize$ } from "../auth/middlewares/auth.middleware";
import { getArticleListEffect$ } from "./effects/get-article-list.effect";
import { getArticleEffect$ } from "./effects/get-article.effect";
import { getDraftListEffect$ } from "./effects/get-draft-list.effect";
import { postArticleEffect$ } from "./effects/post-article.effect";
import { removeArticleEffect$ } from "./effects/remove-article.effect";
import { updateArticleEffect$ } from "./effects/update-article.effect";

const getArticleList$ = EffectFactory.matchPath("/")
  .matchType("GET")
  .use(getArticleListEffect$);

const getDraftList$ = EffectFactory.matchPath("/")
  .matchType("GET")
  .use(getDraftListEffect$);

const getArticle$ = EffectFactory.matchPath("/:id")
  .matchType("GET")
  .use(getArticleEffect$);

const removeArticle$ = EffectFactory.matchPath("/:id")
  .matchType("DELETE")
  .use(removeArticleEffect$);

const updateArticle$ = EffectFactory.matchPath("/:id")
  .matchType("PUT")
  .use(updateArticleEffect$);

const postArticle$ = EffectFactory.matchPath("/")
  .matchType("POST")
  .use(postArticleEffect$);

export const article$ = combineRoutes("/article", {
  effects: [getArticleList$, getArticle$],
});

export const authorizedArticle$ = combineRoutes("/article", {
  effects: [postArticle$, removeArticle$, updateArticle$],
  middlewares: [authorize$],
});

export const authorizedDraft$ = combineRoutes("/draft", {
  effects: [getDraftList$],
  middlewares: [authorize$],
});
