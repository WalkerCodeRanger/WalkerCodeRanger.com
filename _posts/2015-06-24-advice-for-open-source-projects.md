---
layout: post
tags: ["Open-Source"]
author: "Jeff Walker"
title: "Advice for Open-Source Projects"
guid: e6f11d4f-f9c9-4c76-ac7d-9f5877c6544b
final: true
---
Recently, I've been comparing [JavaScript build tools]({% post_url 2015-06-17-state-of-js-build-tools-2015 %}) and their plug-ins.  At the same time, I've been checking out static site generators like [Jekyll](http://jekyllrb.com), [Hexo](https://hexo.io), [Middleman](https://middlemanapp.com), [Metalsmith](http://www.metalsmith.io), [DocPad](https://docpad.org), [Champ](https://github.com/lukevenediger/champ), [Assemble](http://assemble.io) and others. For a more complete list, see [StaticGen.com](https://www.staticgen.com) and this [survey of .NET static site generators](http://www.daveaglick.com/posts/a-survey-of-dotnet-static-site-generators).  However, I don't really want to talk about static site generators today.

What I want to talk about is all the things that go into an open-source project besides the idea and the code.  Now of course, one should have a cool idea for an open-source project and someone is going to have to write the code.  I absolutely care deeply about quality, clean code.  Yet with an open-source project there is a lot of other stuff that goes into it. Often times, it is all that other stuff that makes an open-source project great and gets people to use it.  Now I can't promise you that if you do all these things people will use your project, but it will certainly help.

<section markdown="1">
## All Open-Source Projects
There were a couple things I saw that we all need to do better at, regardless of whether one manages a massive project with hundreds of contributors or just wrote some code in a hour and posted it on [GitHub](https://github.com/).  

<section markdown="1">
### Clearly Indicate the Status of the Project
The most important thing you can do with any code you post online is clearly say at the top of the read me or other most visible place, the status of your project.  This should answer questions about the current state of the code and about the likely future path of development.  Here are some ideas for statuses one might use. Though a couple sentences of explanation in addition will always be helpful.

To describe the state of the code:

* Works for Me or No Warranty: Indicates this is some code you threw together, it solved your problem or met your goal, but there has been no effort spent making sure it is suitable for others to use.
* Sample, Example or Starting Point: The code demonstrates how to do something, but shouldn't be taken as production code.  It should probably be incorporated into other projects as their own code that they will own and further develop in the future.
* Pre-release or Beta: The project has gone through multiple rounds of active development with a goal of reaching a stable release version, but is not there yet.
* Stable/Release: The project has reached a stable point where there should be a minimum of bugs and the necessary features are present. Use this even if there is a previous stable release, but you are working on a new version that is in beta.

To describe the future path of development:

* Active (with Date): This indicates people are currently actively contributing and addressing issues and questions on a semi-regular basis. The current date should always be included with an active status and updated at least twice a year so that people know it is true and not just a statement that hasn't been updated correctly.
* Inactive: The project is not currently being maintained, but there are still people who would notice if someone reported a horrible bug or submitted a pull request.  No guarantee is made that they would be addressed though they would at least get a reply.
* Hiatus: The project is currently inactive, but there is an intention that it will return to an active status in the future.  An idea of the time-frame is helpful here.
* Ignored: This code is not being maintained, issues, questions, bugs and pull requests will not be looked at.
* Legacy: The project was once active and may have had a reasonable community.  There are is still some work to fix important bugs and answer some questions, but no major features will be added.
* Obsolete: The project uses technologies or versions of those technologies or approaches the owner and contributors think are obsolete and not worth further development. The code remains available for existing users or new users who are for some reason stuck on the old technologies. It may be helpful to combine this with a status like inactive, ignored or legacy to give a better indication of what users can expect.

You might imagine that large open-source projects with slick websites are exempt from needing to describe the project status because their website indicates the amount of effort being invested into the project.  However, it is not uncommon to come across a beautiful open-source project website that was created four years ago and the site and project have been ignored ever since.
</section>

<section markdown="1">
### State a Clear Value Proposition
Explain in a short paragraph what your project is and does and why people would want to use it.  Don't assume other technologies you reference are known to the reader. They may have stumbled across your project even though they work in a totally different technology stack.  When referencing other technologies, provide a link and a couple word description of what it is.  Make sure it is clear what your project does.  It is very easy for you, who knows the project inside and out, to not make this clear, because it is so obvious to you.  Finally, include why someone would choose your project over other options.  Try to avoid purely technical features like performance.  Focus on features that are distinctive and not shared by most projects like yours.  If you really want others to use your project, think of this as your sales pitch.
</section>
</section>

<section markdown="1">
## Committed Open-Source Projects
The above two things are what I think every bit of open-source code thrown up on the web needs to do.  But what if you are actually wanting to start an open-source project that you hope people will use? Or what if you become a core contributor to a project you want to see succed?  The follow is my advice on how to make that project a success.

<section markdown="1">
### Recognize the Commitment and Make it
Creating and maintaining a successful open-source project is a lot of work.  It is often as big as any project you might tackle at your job.  Furthermore, you will be called on to do tasks you probably aren't responsible for at work, like documentation and website design.  There will be important bugs that if not fixed in a timely manner risk alienating your user base.  There will be lots of questions and requests for help, many of which will be pretty "stupid" questions. All that will be done in your free time when you could be doing something else (unless you are one of the lucky few who is responsible for an open-source project at work).  While you are spending your free time, there will be long stretches with little to no positive feedback.  All that will take a lot of commitment.  The most important thing you can do before starting an open-source project or becoming an important contributor to one is to carefully consider all the work it will entail.  Don't shy away from it, you need to face it upfront so when difficult days come you will know you anticipated them.  If after all that, you still want to do the project.  Then make a firm commitment to do the project and stick with it.  The most successful open-source projects generally have a core team of contributors who were very committed for a very long time.
</section>

<section markdown="1">
### Don’t try to be All Things to All People

Given that this is an open-source project and not a product one is profiting from, it is important to limit the scope and focus on the important things.  In large part, that means you don't need to cater to every option and work style your users might have.  It is good for your project to be opinionated and focused.  If users don't like those aspects, there are lots of other projects for them to choose from.  It is much more important for the project to be excellent for a small dedicated user base.  Trying to include as many users as possible often leads to a system that is incomplete and buggy.  For example, the [Pretzel](https://github.com/Code52/pretzel) project is trying to create a .NET port of the popular [Jekyll](http://jekyllrb.com/) static site generator.  However, at the same time they are throwing in support for the razor template engine.  Now their effort and focus is divided and they have twice as many things to test and document.  I think this is leading to reduced quality.  For example, when I last downloaded the project, the sample razor template site didn't even compile.  Once a project has successfully completed its core and has a growing user base, then it can expand to other functionality if it makes sense.
</section>

<section markdown="1">
### Docs Are as Important as Features

I see this all the time, a project is described in glowing terms and lists really cool features, so I go to use it only to discover there is no documentation except for one or two blog posts that barely count as an introduction.  What the majority of potential users do at that point is look for other options.  That is why your documentation is just as important as your features.  Commit yourself to writing the documentation for a feature as soon as it is in a state where it is ready to be used.  Also, don't forget to update them as features are changed.  That way the docs will always be up to date.  The documentation needs to be a website or wiki or read me available on the web.  If users have to download something to read the docs, a certain percentage of them won't bother.  Also, a bunch of blog posts don't count as documentation.  Blog posts are great for introducing new projects and features and for promoting a project, but they aren't documentation. They can't be updated to match the current version.  It is incredibly frustrating to be referred to a blog post as documentation only to find that the API and features have changed significantly since then.  Often there is no post describing the changes. Even if there is, it now takes twice as much work to read both posts and synthesize an understanding of the project.
</section>

<section markdown="1">
### Learn the Lessons of Your Predecessors

Typically there have been projects like yours before in your technology stack or in others.  They have tried what you are doing and discovered the pitfalls and best practices.  Look carefully at other projects doing what your project does.  Make sure you understand how they work and why they work that way.  Read through the issues they had.  You might discover your exact approach has been tried but found wanting.  You will likely save yourself a lot of time in the less core areas of the project which you haven't been carefully thinking about.
</section>

<section markdown="1">
### A Slick Website Looks Professional

As developers we don't value beautiful marketing material as much as we should.  Even though your project isn't a product you are selling for money, you are basically selling the use of it to your users.  Having a slick website to sell the project gives people a good feeling about your project and makes it look very professional.  If you can invest the time for a great website, then you must have the time to invest in a great project.  The site doesn't have to be large.  Even a couple pages of description, features and contact information with links to documentation, code and downloads will go a long way.
</section>

<section markdown="1">
### Make Sure the Project Runs out of the box

If you have a sample project or example of using your library, be absolutely certain that it works immediately out of the box after users download and install it.  If a user's first experience with your project is that you can't get the sample to work, they will be left with a very bad taste in their mouth.  With each new version, test the sample.  If possible make unit tests to cover as much of it as possible.  Another way to fail in this area is to have the download instructions or link not updated so that they point at an old or broken version.
</section>
</section>

<section markdown="1">
## Practising What I Preach

Looking at all these open-source projects and realizing the important things I listed above, I realized some of my projects are failing in one or more of these areas.  My next step is to go through each of the projects I have posted online and address these.

In summary, here again is my advice. The first two are for all open-source code posted online.  The rest are for serious open-source projects:

1. Clearly Indicate the Status of the Project
2. State a Clear Value Proposition
3. Recognize the Commitment and Make it
4. Don’t try to be All Things to All People
5. Docs Are as Important as Features
6. Learn the Lessons of Your Predecessors
7. A Slick Website Looks Professional
8. Make Sure the Project Runs out of the box
</section>