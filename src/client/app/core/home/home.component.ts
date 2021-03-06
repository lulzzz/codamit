import { html, TemplateResult } from "lit-html";
import { profile } from "./profile";
import { twitterFeed } from "./twitter-feed";
import { LitElement } from "@polymer/lit-element/lit-element";

export default class Home extends LitElement {
  profileConfiguration = {
    name: "Edouard Bozon",
    description:
      "Web developer at @CoSpirit from French Alps. I play every day with #TypeScript and #PHP",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/963311893279625216/xdYbJgZm_400x400.jpg",
  };

  render(): TemplateResult {
    return html`
      <ez-page>
        ${profile(this.profileConfiguration)}
        ${twitterFeed()}
        <ez-article-feed></ez-article-feed>
      </ez-page>
    `;
  }
}
