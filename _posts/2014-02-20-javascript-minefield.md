---
layout: post
tags: [JavaScript]
author: "Jeff Walker"
title: "The JavaScript Minefield"
series: javascript-minefield
guid: 4c525d69-dee8-4d0e-b861-19bfa341eb67
modified: 2014-03-22 17:54 -05:00
final: true
---
When I was starting out as a programmer, I learned and worked in C++.  There weren't that many options for [Mac OS 7](https://en.wikipedia.org/wiki/System_7) development at the time.  I had a copy of [MetroWorks CodeWarrior](https://en.wikipedia.org/wiki/CodeWarrior). It sure beat [MPW](https://en.wikipedia.org/wiki/Macintosh_Programmer's_Workshop), which was Apple's own development environment.  For languages the choices were pretty much Pascal, C or C++.  Perhaps Pascal would have been a better first language to learn, but that's not what I picked.  As I really learned C++ and began programming in it, I discovered that C++ is a very large and complex language.  Why?  Well, there are a number of reasons.  One is that it follows the zero overhead principle, basically "What you don’t use, you don’t pay for."  That means every language feature has odd limitations and pitfalls to make sure it can be implemented in a very efficient way.  Another is that, due to the focus on low level efficiency, there are no safety checks built into the language.  So when you make a subtle mistake, which is easy given all the weird edge cases, the program compiles and silently does the wrong thing in a way that maybe succeeds 99% of the time but crashes horribly the remaining 1%.  Finally, the language is designed for maximum power and flexibility; so it lets you do anything, even the things you shouldn't do.  This produces a programming minefield where at any moment one might be blown up by some obscure behaviour of the language.  Because of that and because other developers and the standard library make use of every language feature, one must learn the *whole* language.  However, C++ is so big and convoluted, learning it is really hard.

> C makes it easy to shoot yourself in the foot; C++ makes it harder,
> but when you do, it blows your whole leg off.
>
> <footer>Bjarne Stroustrup, creator of C++ <cite markdown="1">[Bjarne Stroustrup's FAQ](http://www.stroustrup.com/bs_faq.html#really-say-that)</cite></footer>

<section markdown="1">
## The New Minefield, JavaScript

My days of C++ programming are long past.  But of late, I've been spending more and more of my time in a new programming minefield, Javascript.  When I first started out as a web developer in the early days of .NET web forms, we avoided JavaScript as much as possible.  It was slow and plagued by browser differences.  Now, <cite>JavaScript: The Good Parts</cite> and [jQuery](http://jquery.com) are in our rearview mirror and we have our sights set on JavaScript MV* frameworks like [Ember.js](https://emberjs.com), [AngularJS](http://angularjs.org), and [Backbone.js](http://backbonejs.org). That means, whether we like it or not, we'll be writing a whole lot of JavaScript.  Many people are fully embracing JavaScript, bringing us tools like [Node.js](http://nodejs.org), [RequireJS](http://requirejs.org), [Lineman](http://linemanjs.com) and [Grunt](http://gruntjs.com).  Those are all great things, but they don't change the fact that JavaScript is a minefield.

How is JavaScript a minefield?  Well, JavaScript has all sorts of pitfalls lurking for the developer. Each pitfall is like a mine in the minefield, silently waiting for you to accidentally step on it.  Just like the minefield, JavaScript's mines are hidden in plain sight.  Entire books have been written about all the mines present in JavaScript. Maybe I'll get into what some of those are in future blog posts. Now, if you are going to venture into a minefield, you need a way to avoid stepping on a mine. You need either a safe path through the minefield or a detailed map of all the mine locations.
</section>

<section markdown="1">
## No Safe Path

Douglas Crockford was trying to provide a safe path through the JavaScript minefield when he wrote <cite>JavaScript: The Good Parts</cite>.  He did an admirable job at laying out a subset of the language that was sufficient but avoided many of the mines.  However, the problem with any safe path through a minefield is that if you ever stray from the path, it doesn't help *at all*. Sometimes you *need* to stray from the path, as when you read/modify someone else's code or use a third party library requiring other language features.  Worse than that is when you accidentally stray off the path, something that is all too easy in JavaScript.  That happens when, for example, you inadvertently use a variable without declaring it, even though Douglas Crockford warned you not to do that.  So we see that, the safe path is sufficient for your first foray into the minefield, but not enough if you plan on really getting work done there.
</section>

<section markdown="1">
## When Maps Fail

Given that a safe path through the JavaScript minefield isn't enough, it seems like we need a detailed map of the minefield.  Many books and blogs have been written to provide that map.  <cite>JavaScript: The Definitive Guide</cite> by David Flanagan is one of the most detailed of those books.  The <cite>[JavaScript Garden](http://bonsaiden.github.io/JavaScript-Garden)</cite> is a good place to start learning about the mines online. In a real minefield, a map would let you navigate safely, but at the cost of greatly slowing you down.  In JavaScript, it becomes necessary to hold the complete "map" in your head while you are writing code.  It's just not possible to constantly be looking things up while coding. Also, you still need to remember when to look something up.  The task of programming is already difficult enough as you try to juggle the problem domain and solution while expressing that to the computer without the added cognitive load of keeping the JavaScript minefield map in your head.  I would say most people can't do it, or at least can't do it well.  That is one of the primary reasons languages like Java and C# have beat out C++.

Furthermore,  many of the JavaScript mines are easy to step on even when you know they're there.  For example, you might use a `for in` loop without checking `hasOwnProperty` because you mistakenly think that it is safe in your particular case.  Beyond that, the human mind just isn't set up to handle situations where things do not match their names.  No matter how many times I tell myself that the `this` keyword *doesn't mean this*, my brain still falls back into thinking of it that way.  It's as if someone put a sign reading "Cave Tour" over the bear den. When I'm busy talking to my friend, thinking about how hungry I am and trying to find the cave tour, I'm liable to walk into the bear den no matter how many times I was told the sign is wrong.  The fault isn't with me, it's with the sign.
</section>

<section markdown="1">
## JavaScript History

So how did we end up in this JavaScript minefield?  Well like a lot of minefields, it exists because of a lot of messy history. JavaScript was [created in 10 days in May 1995](http://www.w3.org/community/webed/wiki/A_Short_History_of_JavaScript) by [Brendan Eich](https://brendaneich.com). He incorporated many great ideas from Scheme and prototype based object oriented languages.  However, the syntax and certain other features of Java got tossed in too, and there were plenty of warts for better or worse.  It's just not possible to design a language in such a short time and get everything right.  Since then, the language as evolved through a [messy standardization process that was haunted by the browser wars](http://www.oreillynet.com/pub/a/javascript/2001/04/06/js_history.html).  Today JavaScript is experiencing a renaissance, but it can't escape from its history.
</section>

<section markdown="1">
## Can We Clear the Minefield?
So what are we to do about this JavaScript minefield if we aren't prepared to just accept life in a minefield?  Well, a lot of people have been working on that and trying to offer solutions.  Those solutions fall into three categories, since hey, there is only so much you can do with a minefield.  The three possibilities are:

* Clear the minefield
* Go to a different field
* Build atop the minefield

The most direct approach would seem to be to actually clear the minefield by removing the mines.  Unfortunately, in the case of JavaScript, that means actually changing the language.  That is a very long and difficult proposition.  None the less, that has been done some through the ECMAScript 5 standard, which fixed the fact that the developer could redefine `undefined` and `NaN` as well as adding strict mode to address other mines. Still, that isn't enough for those who need to work in JavaScript now and the process doesn't show any signs of clearing the minefield in the near future. Instead, it looks like ECMAScript 6 will just expand the minefield to encompass more area (to their credit, the new territory looks a lot better and safer than the old).

Then there is the approach of going to a different field.  Unfortunately, there aren't any good alternatives because JavaScript is the only language that runs in the browser.  Various companies have attempted to solve this problem by providing plug-ins and other languages for the browser.  There was [Java applets](http://en.wikipedia.org/wiki/Java_applet) and then [Adobe Flash](http://en.wikipedia.org/wiki/Adobe_Flash) and more recently, [Microsoft Silverlight](http://en.wikipedia.org/wiki/Microsoft_Silverlight) brought .NET to the client. Before that, Microsoft had tried to create an alternative by putting [VBScript](http://en.wikipedia.org/wiki/VBScript) into IE, but no one else jumped on board.  Unfortunately, all of these haven't succeeded in providing a truly cross-browser programming eco-system that developers could count on being installed on client computers.  Most created a sandbox within the web page, rather than integrating with it like JavaScript.  While all those technologies still exist, none of them is a serious contender for the future of rich web app development.

The last option is to build atop the minefield. This is where the minefield metaphor breaks down a little.  But to push on, it is like building a deck over the minefield so that one can enjoy the nice view and safely walk above the mines without any risk of setting one off, even though they are still below you.  One of the first important such technologies is [GWT](http://www.gwtproject.org) from [Google](https://www.google.com). It provides a true Java to JavaScript [cross compiler](http://en.wikipedia.org/wiki/Cross_compiler).  Since then many different projects have appeared to provide cross compiling from various new and old languages into JavaScript.  The [asm.js](http://asmjs.org/) project is even standardizing a subset of JavaScript as the target of such compilers.  The rapidly growing support for [source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps), which allow debugging of cross compiled languages in the browser, promises to significantly reduce the friction of using such tools.  Currently, all the most promising technologies for solving the challenges of JavaScript fall into this final category.

Today, the three main contenders for superseding JavaScript are [CoffeeScript](http://coffeescript.org), [TypeScript](http://www.typescriptlang.org) and [Dart](https://www.dartlang.org).  However, it's not at all clear any of them will be able to dethrone JavaScript despite it being a minefield.  In future posts, we'll look at each of these three alternatives to JavaScript and whether we should adopt them or stay with JavaScript, perhaps with the aid of a tool like [JSHint](http://www.jshint.com).
</section>

{% include series.html %}

*[MPW]: Macintosh Programmer's Workshop
*[GWT]: Google Web Toolkit

**Edit 2018-01-10:** Removed dead link to DailyJs.com about the history of JavaScript.
