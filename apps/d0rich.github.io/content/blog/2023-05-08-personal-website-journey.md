---
description: Here is my experience building several versions of my personal website throughout the years.
date: 2023-05-08
tags:
  - Frontend
  - Backend
  - Architecture
image: /blog/2023-05-08/v4-intro.png
---

# Personal website building journey

Personal website is a great way to show your skills and experience. It is also a great way to learn new technologies and improve your skills. 

In my case my personal website was the first IT project for me. And it evolved with my knowledge and experience.

Here I want to share my experience building several versions of my personal website throughout the years. You can notice changes in my approach to software development and architecture at different stages of my career.

## Version 1 (2020)

My first acquaintance with web technologies.

At that moment, I was immersed in creating video and believed that I needed a site with a presentation of myself as a specialist in development and video creation at the same time. A site where the user could see examples of my work, see the prices for my services, get acquainted with my work pipeline and send a request for cooperation. Support for different languages was also planned.

![](/blog/2023-05-08/v1-loading.png)

The idea was good and interesting, but I stumbled upon a lack of experience with the technologies used. At first I created static pages, then I transferred everything to a single page application. Maintainability only suffered from this.

| Technology used | Purpose |
| --- | --- |
| Vue.js | Frontend framework |
| GitHub Pages | Frontend hosting |
| Node.js | Backend runtime |
| Express | Backend framework for building simple REST API |
| Heroku | Backend hosting |
| MongoDB | Database |
| Firebase | Analytics |

```plantuml
left to right direction

node Client [
Client
----
Vue.js
]

cloud Firebase

node Server [
Server
----
Node.js
Express
]

database MongoDB [
Content DB
----
MongoDB
]

Client -- Firebase
Client -d- Server
Server -d- MongoDB

```

Previously, this site occupied `d0rich.github.io` domain, and it can be considered the very first version. I manually placed the images for it in the project repository, and now they are no longer here of course, so I see no reason to launch this project for viewing at a different address, but you can familiarize yourself with the client's source code to compare my skills then and today.

| Component | Source code |
| --- | --- |
| Web client | https://github.com/d0rich/d0rich.github.io/tree/v1.0.0 |
| Node.js server | https://github.com/d0rich/backend.d0rich.github.io/tree/v1.0.0 |

## Version 2 (2021)

I needed a resource that would demonstrate my web development competence in itself and simply by describing what I can.

![](/blog/2023-05-08/v2-3-intro.jpeg)

Here information is provided directly about me, here projects that I want to share with others are collected, here resumes have been worked out for possible responses to vacancies. It is also planned to create a blog with related functionality.

This was the project in which I put the most of my heart. When writing new functionality, I tried to use some new technology for myself, so as not to stand still. And of course I tried to make it comfortable, I hope you felt it.

| Technology used | Purpose |
| --- | --- |
| Vue.js | Frontend framework |
| Vuetify | UI framework |
| GitHub Pages | Frontend hosting |
| Node.js | Backend runtime |
| Fastify | Backend framework for building REST API |
| PostgreSQL | Database for authentification and projects |
| Firebase | Database for resume |
| Heroku | Backend hosting, PostgreSQL databases |
| Dropbox | File storage |

```plantuml
left to right direction

node Client [
Client
----
Vue.js
Vuetify
]
node Server [
Server
----
Node.js
Fastify
]
cloud FileStore [
File Store
----
Dropbox <&box>
]

database AuthDb [
Authentification DB
----
PostgreSQL
]

database ProjectsDb [
Projects DB
----
PostgreSQL
]

database ResumeDb [
Resume DB
----
Firebase
]

Client -d- Server
Client -- FileStore
Server -l- FileStore
Server -d- AuthDb
Server -d- ProjectsDb
Server -d- ResumeDb

```

You cannot try most of the functionality, since it is related to data editing and is available only to me. However, be sure everything is beautifully done.

| Component | Source code |
| --- | --- |
| Web client | https://github.com/d0rich/d0rich.github.io/tree/v2.0.0 |
| Node.js server | https://github.com/d0rich/backend.d0rich.github.io/tree/v2.0.0 |

## Version 3 (2022)

At this moment I finally realized that using just hyped SPA is not the best solution for my website. I decided to migrate to SSG (Static Site Generator) to improve SEO and reduce costs.

I had several problems with second iteration:
1. Maintaining server and database is quite expensive for small website.
2. At the moment for its development GitHub pages did not support HTML5 history mode for router. So SEO was completely impossible.
3. SPA are not optimized for Search Engines.
4. Open Graph protocol does not work with SPA.
5. Creating editor features only for me takes too long.

To solve all these problems, I migrated to Gridsome SSG. As it is built over Vue.js, I was able to move all existing styles and components to new project without problems. And the results as follows:
1. Databases are not needed now as all the content is inside client repository in form of `.md` files.
2. Gridsome creates HTML page for each webpage, so it is possible to have common routing without `#`.
  ::alert{type=info}
    It is problem from past. GitHub pages now supports HTML5 history mode.
  ::
3. SEO works ideally with prerendered HTML.
4. There are no problems for Open Graph to parse content of prerendered HTML.
5. Now it is possible to edit content as markdown, and I don't need to implement my own features.

Website still works as SPA and it has all features of SPA. 

| Technology used | Purpose |
| --- | --- |
| Vue.js | Frontend framework |
| Gridsome | Static Site Generator |
| Vuetify | UI framework |
| GitHub Pages | Frontend hosting |

```plantuml
left to right direction

node Client [
Client
----
Vue.js
Gridsome
Vuetify
]

```

Copy of this version is currently hosted on subdomain [`v3.d0rich.me`](https://v3.d0rich.me). You can try it out.

| Component | Source code |
| --- | --- |
| Web client | https://github.com/d0rich/d0rich.github.io/tree/v3.0.0 |

## Version 4 (2023)

This a website you are currently looking at.

Gridsome was a good choice, but it has some problems:
1. It uses Vue.js 2, but Vue.js 3 is already released.
2. It uses old JavaScript imports via `require()` and it is not possible to use new libraries ES6 imports.
3. It became unmaintained.

At the moment of this realization, I was already familiar with Nuxt.js and it was in release candidate stage for the version 3. It looked like a game changer for me, because of several features:
1. Nuxt content module with convenient API for markdown content
2. Nitro prerender mode, which works as SSG
3. Modern libraries suppport

Also, I finished Persona 5 Royal PC port. It really inspired me to build UI like in this game. It was the final reason to recreate whole website using new technology.

![](/blog/2023-05-08/v4-intro.png)

| Technology used | Purpose |
| --- | --- |
| Vue.js | Frontend framework |
| Nuxt.js | Static Site Generator |
| TailwindCSS | CSS framework |
| GSAP | Animations framework |
| GitHub Pages | Frontend hosting |

```plantuml
left to right direction

node Client [
Client
----
Vue.js
TailwindCSS
Nuxt.js
]
```

Additionally specific Nuxt theme was created for creating documentation websites for my projects: [d0xigen](https://d0xigen.d0rich.me/). This theme implements the same Persona 5 UI style. For conveniency my personal components was separated into Nuxt layer package: [@d0rich/nuxt-design-system](https://design.d0rich.me/).

```plantuml
package "@d0rich/nuxt-design-system"
package "@d0rich/nuxt-content-mermaid"
package d0xigen
node "d0rich.me"
node "<project>.d0rich.me"

"@d0rich/nuxt-design-system" --> "d0rich.me"
"@d0rich/nuxt-content-mermaid" --> "d0rich.me"
"@d0rich/nuxt-design-system" --> d0xigen
"@d0rich/nuxt-content-mermaid" --> d0xigen
d0xigen --> "<project>.d0rich.me"
```

## Summary

To sum up, I drammatically improved my hard skills during all these changes of website. Of course, it is not cool to rewrite website every year, but I have reasons for that. The main lesson learned here is:

> Simpler - better. If you can make something simpler, do it.

Beeing newbie I was really drived by working with different technologies, such as databases, server runtimes. I felt really good because of building complex systems. But I also realized that managing all this stuff is quite time consuming. That's why now I more like to work with SQLite rather than with full-fledged database.

Complex system is to much for small website. And there are convenient solutions for content management in source code. So I just made it simpler.