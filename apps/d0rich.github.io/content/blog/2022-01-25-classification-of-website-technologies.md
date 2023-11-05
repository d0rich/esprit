---
description: Nowadays there are a lot of technologies for building websites. You
  might be disoriented trying to choose something for your site. I did the big
  research, and I want share information I found.
date: 2022-01-25
tags:
  - DocOps
  - Frontend
image: /blog/2022-01-25/cover.png
---

# Classification of website technologies 


Once my team met one challenge. We needed to create a documentation site 
for a technology. It should be easy to work with for a non-specialist in web 
technologies and just give great *User Experience (UX)*.  


We found some experience from *DocOps* specialists on the internet.  

By the by, DocOps specialists are people who create documentation 
for technologies. But I found classic DocOps technologies unsuitable for our 
purposes. Templates for documentation are designed to get information from only one repository. But technology we want to describe is more complicated than other, because it includes many repositories and we need to get fresh info about all components. So I put forward the idea of looking for something new.  


## What do we know?  


Nowadays, as I see, web developers community identifies 3 types of 
frameworks for website development. I realized it searching a lot of documentations
and communicating with people from my university.  


So there is my representation of site types in the triangle:  


<figure style="text-align: center">  

  ![Classic Sites Triangle](/blog/2022-01-25/Classic-Sites-Triangle.png)  

  <figcaption>Classic Sites Triangle</figcaption>  
</figure>  


As you can see,  

- Static site is the best choice, if you want to use hardware as little as possible  
- Dynamic site is very useful for constantly changed data (eg forum)  
- Single Page Application significantly improves *User Experience (UX)*  

### Static Sites  


The most simple way to deploy a site is just put heap of HTML, JS, and CSS files 
into hosting and get it from browser. And static sites are about it.  


Of course, you can just write all pages by yourself. But there is a list of technologies, 
that can generate all pages by template and required information. Such technologies 
are called *Static Site Generators (SSG)*.  


You can see how browser works with pages in this site on the diagram below:  


<figure style="text-align: center">  

  ![Static Site Workflow](/blog/2022-01-25/Static-Site-Workflow.png)  

  <figcaption>Static Site Workflow</figcaption>  
</figure>  


Working principle of static sites is pretty easy. Browser just get HTML file any time 
you want to view a new page. Any. Time. It recreates even pattern elements, that exist 
on the page (eg header, navigation, footer), that you already see. You can notice 
flashing of the screen while new page is loading on such sites.  


Anyway, this technology provides content that we want with easy usage. Some of available SSG:  

- [Go Hugo](https://gohugo.io/)  
- [Ruby Jekyll](https://jekyllrb.com/)  
- [NodeJS Hexo](https://hexo.io/)  
- [Python Sphinx](https://www.sphinx-doc.org/en/master/)  

Capabilities of all these engines are about to be equal. Rendering speed is not important 
as it happens not in real time. So the only difference is only in programming language 
syntax while creating template.  


### Dynamic Sites  


From the user side dynamic site can seem a static one. It's because on the browser side 
workflow is the same. But all magic at the server side.  


<figure style="text-align: center">  

  ![Dynamic Site Workflow](/blog/2022-01-25/Dynamic-Site-Workflow.png)  

  <figcaption>Dynamic Site Workflow</figcaption>  
</figure>  


Yeah, this time browser make request not to file storage, but to server, 
that generates HTML in real time. And dynamic sites have the same problem as 
the static ones - flashing between pages.  


You can create dynamic site with:  

- [PHP Laravel](https://laravel.com/)  
- [ASP.NET MVC Pattern](https://docs.microsoft.com/en-us/aspnet/mvc/)  
- [Java Spring Boot](https://spring.io/projects/spring-boot)  
- [Python Django](https://www.djangoproject.com/)  
- [Ruby on Rails](https://rubyonrails.org/)  

These technologies have different requirements to server and ways to work with database.  


### Single Pages Applications  


This type of site provides more slightly UX as browser doesn't recreate whole page, 
but only elements when it is needed to change content. Technically, it is static site 
with one HTML file. But HTML files exists there only because it might exist anyway to 
run JavaScript.  


<figure style="text-align: center">  

  ![SPA Workflow](/blog/2022-01-25/SPA-Workflow.png)  

  <figcaption>SPA Workflow</figcaption>  
</figure>  


SPA's don't flash, but browser need to download whole site while first request. 
And if you have a lot of content, it will be a huge file. 
There is another way, when browser require data to show on the third-party resource. 
In this case your site won't contain needed information on initial state. As I know, 
initial state is important for *Search Engine Optimization (SEO)*. Also, user will wait 
twice:  

1. Getting SPA  
2. Getting data for SPA  

Somebody may call disadvantage that it works on the JavaScript. There you can decide: support 
HTML only site for people with old gadgets or create cool app to use it with pleasure. 
I think, that liquidation of flashing is killer feature.  


You can try SPA with:  

- [React](https://reactjs.org/)  
- [Vue](https://vuejs.org/)  
- [Nuxt.js (static mode)](https://nuxtjs.org/docs/concepts/static-site-generation/)  
- [Swelte](https://svelte.dev/)  
- [Angular](https://angular.io/)  

## What is wrong?  


Time is running, technologies are constantly improved. Business decided that UX is the main
feature  for sites. Because our site should be more comfortable than competitor’s one.  


So sites mixed with SPA began to appear: SPA with *Server Side Rendering (SSR)*, SPA with SSG. Some newbie can be confused. May be he want seamless experience for site, but 

- without any database in background for delivering content to SPA  
- with small await time for user  
- with stable SEO  

These 3 bad associations comes to my mind when I hear SPA. But SPA with SSR and SPA with SSG don’t have these problems. Anyway, I deny these technologies because of the phrase “I am SPA” in documentation.  


So I propose a solution for this problem. We can call this mixed types of sites as “Hybrid”. Basically they are some blend of classic static sites with SPA, dynamic sites with SPA (with inherited advantages and solved problems).  


<figure style="text-align: center">  

  ![Sites Triangle](/blog/2022-01-25/Sites-Triangle.png)  

  <figcaption>Sites Triangle</figcaption>  
</figure>  


SPA is the part of the each hybrid technology. It provides seamless work. Today every hybrid framework is based on the popular SPA framework.  


### Static Hybrid  


Static Hybrid sites are just *Static Site Generators (SSG)* that generate all possible HTML files for your site with SPA code in JavaScript. But these HTML files have special section for the case you want not to load all page but to update some information on your site.  


You can see workflow of the Static Hybrid Site below:  


<figure style="text-align: center">  

  ![Static Hybrid Workflow](/blog/2022-01-25/Static-Hybrid-Workflow.png)  

  <figcaption>Static Hybrid Workflow</figcaption>  
</figure>  


Firstly, browser gets full generated page in initial state (SEO problem of SPA is solved). After that SPA starts on the page and allow site to get only useful information from page requests until it is closed (seam problem of static sites is solved).  


You can try static hybrid sited with:  

- [Gridsome (Vue)](https://gridsome.org/)  
- [Gatsby (React)](https://www.gatsbyjs.com/)  
- [Docusaurus (React)](https://docusaurus.io/)  

### Dynamic Hybrid  


Basically, we can say that Dynamic Hybrid sites and static hybrid ones have similar idea. Browser get full page on initial page request and then it loads useful information only.  


The only difference is that Dynamic Hybrid site generates pages not while creating, but during runtime. This feature increases latencies a bit, but it proposes you a possibility to update data on your site often or get data from frequently changed resource.  


<figure style="text-align: center">  

  ![Dynamic Hybrid Workflow](/blog/2022-01-25/Dynamic-Hybrid-Workflow.png)  

  <figcaption>Dynamic Hybrid Workflow</figcaption>  
</figure>  


There are some dynamic hybrid technologies:  

- [Nuxt.js (Vue)](https://nuxtjs.org/)  
- [Next.js (React)](https://nextjs.org/)  
- [Remix (React)](https://remix.run/)  
- [Angular Universal (Angular)](https://angular.io/guide/universal)  
- [Swelte Kit (Swelte)](https://kit.svelte.dev/)  

## Jamstack  


> Jamstack is an architecture designed to make the web faster, more secure, and easier to scale. It builds on many of the tools and workflows which developers love, and which bring maximum productivity.  

Basically, Jamstack frameworks are cheaper to maintain, because there is no runtime app needed. Only technologies, that generates static files can be considered as Jamstack. You can see these frameworks on the sites triangle, proposed by me.  


<figure style="text-align: center">  

  ![Sites Triangle with Jamstack Architecture](/blog/2022-01-25/Sites-Triangle-with-Jamstack-Architecture.png)  

  <figcaption>Sites Triangle with Jamstack Architecture</figcaption>  
</figure>  

- Static Site - generates static HTML files  
- Single Page Application - generates small HTML file and big JavaScript file with content for site  
- Static Hybrid - generate static HTML files with special script for seamless interpage transitions  

## Summary  


To sum up, in my point of view there 5 types of sites:  

1. Static  
2. Dynamic  
3. Single Page Application  
4. Static Hybrid  
5. Dynamic Hybrid  

I think, that static and dynamic sites are obsolete. But there can be reasons to use it, if:  

1. You / your team know appropriate technology really well  
2. UX is not the main thing you need from web site  
3. You need to cover vanishingly small community with old browsers or with disabled JavaScript in browser  

In other cases, I’d advice you to choose SPA or Hybrid sites.  

- Single Page Application is the best choice for some GUI (eg calculator, dashboard, map).  
- Static Hybrid should be used if content on your site changes infrequently (eg blog, documentation, portfolio)  
- Dynamic Hybrid is the most expensive site type to maintain, but it provides the biggest potential for features. Mostly this type is used when content is constantly changing (eg forums, social networks)  

If you are not sure whether static site covers all your needs, you can start from dynamic analog. And then switch to static one, if it is possible.  


As for my choice, I chose Nuxt.js (Dynamic Hybrid) for the documentation site. It is so, because we need to fetch info about a lot of repositories, and there are some ideas of helping tools and API’s.  

