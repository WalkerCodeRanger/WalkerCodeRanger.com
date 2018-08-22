---
layout: post
tags: [JavaScript]
author: "Jeff Walker"
title: "Why Dart Isn't the Answer"
series: javascript-minefield
guid: e228a1a9-9305-43be-9749-bf0694827ca6
final: true
---

[Dart](https://www.dartlang.org) is Google's latest answer to how to do large scale web application development.  Dart isn't just a new programming language it is a "platform".  That includes having its own standard libraries and tools.  Additionally, even though Dart compiles to JavaScript, there is also a Dart VM that runs in a preview version of [Chrome](https://www.google.com/chrome) called [Dartium](https://www.dartlang.org/tools/dartium/).  The language itself will feel very familiar to developers who have worked in JavaScript, Java and C#.  Like [TypeScript](http://www.typescriptlang.org) it's "optionally typed".  That means type declarations are optional, but when you provide them the compiler will provide type checking warnings.  Unlike JavaScript, it is class based rather than prototype based. It fixes the problems with both the syntax and semantics of JavaScript

Dart is a much more ambitious project than Microsoft's TypeScript.  It moves further away from both the syntax and semantics of JavaScript.  So the JavaScript produced by the Dart compiler, while quite readable, may not correspond one-to-one with the original Dart source.  The Dart compiler applies more transforms and optimizations to your code.  Beyond that, even core libraries are replaced.  Dart has it's own DOM manipulation library that differs from the standard one provided by browsers.  This allows them to fix not only problems with JavaScript, but problems with the browser APIs which are widely regarded as being one of the worst parts of client side web development. This ambitiousness makes Dart an exciting project that appears to be a real improvement over the current state of affairs.  

Before we look at some problems with Dart, a word about the Dart VM.  Since Google wants Dart to eventually be the platform of the web, they are hoping that they can convince browser makers to include a native Dart VM.  Since they control one of the big three browsers, they are already <sup>1</sup>&frasl;<sub>3</sub> of the way there.  However, many people feel that it is unlikely the other browsers will follow suit.  It wouldn't seem to be to their benefit to spend the time and money doing so.  When Microsoft tried basically the same thing with VBScript in IE, it didn't go well.  Admittedly, the browser market isn't as contentious and political as it was then, but competitors will always be competitors.  To address this, Google has the, quite effective, compile to JavaScript escape hatch.  The situation will be different if all major include a native Dart VM some day, but for now, the idea of a Dart VM is irrelevant to whether Dart is the answer to the [JavaScript Minefield]({% post_url 2014-02-20-javascript-minefield %}).

>I guarantee you that Apple and Microsoft (and Opera and Mozilla, but the first two are enough) will *never* embed the Dart VM.
>
><footer><a href="https://news.ycombinator.com/item?id=2982949">Brendan Eich</a>, creator of the JavaScript language & active partcipant in JavaScript standardization</footer>

<section markdown="1">
## JavaScript Interop
Dart is such a radical departure from JavaScript that it is not possible to interact directly with JavaScript libraries from Dart.  Instead, you must use a [special interop library](https://www.dartlang.org/articles/js-dart-interop/) that exposes wrapped versions of any JavaScript objects you access.  This enables Dart to safely sandbox JavaScript away and prevent its problems from leaking into a Dart application.  This is very reminiscent of what Microsoft had to do with [COM interop](http://en.wikipedia.org/wiki/COM_Interop), for .NET all be it for somewhat different reasons.  Like COM interop, JavaScript interop is not a pleasant experience.  It's a necessary feature for times when the only implementation for a library you need isn't in the platform you are working in, but whenever possible you avoid it.  The problem with that is, it tends to silo you in the platform you have chosen.  Currently, many new and exciting JavaScript libraries are being released and the Dart platform is immature and hasn't had time to fill out with all the options a developer might want.  Being siloed into the Dart platform will be a very high price to pay to avoid the JavaScript minefield.
</section>

<section markdown="1">
## Another GWT?
The [Google Web Toolkit](http://www.gwtproject.org/) (GWT) is a project first released by Google back in 2006.  It provides a platform allowing developers to create client side web application in Java that are then cross-compiled to JavaScript.  The GWT project has a lot of similarities to the Dart project.  Both create a siloed platform with restricted interop options that addresses the pitfalls of working directly in JavaScript and the browser.  The largest difference is that GWT builds on an existing language (Java) and platform which are potentially not as well suited to the needs of web development and semantically more distant from JavaScript.  Never the less, the history of the GWT project is instructive.  While it was released with fanfare and promise, it has remained a niche solution and is not where all the exciting advances in web development are being made today. I don't see why the future of Dart should be any different. 
</section>

<section markdown="1">
## Still not statically typed
It's surprising to me that Google would deviate so far from the semantics of JavaScript and include optional typing but stop short of actually having static type checking.  Dart's type annotations have no effect on the execution of the code and the compiler only reports warnings, not errors, for type violations.  Essentially, it is as if someone took a dynamic language like Ruby and added type annotations to it without actually changing the way the language works.  Because of this, it is possible to put incorrect and misleading type declarations in a program, for example declaring an integer variable as an array of strings, and still have the program execute correctly.  C# has shown with its `dynamic` type that a mix of dynamic and static typing can be interesting and useful.  A language showing another way of mixing the two with dynamic as the default would be very interesting.  Unfortunately, that isn't what Dart is.  Dart is a dynamic language, plain and simple.  Type checking is just a [jsHint](http://www.jshint.com/) style suggestion that something might be wrong.  What's the use of a type declaration if it doesn't mean the value will actually be of that type?

To dig deeper, check out <cite markdown="1">[Why Dart is not the language of the future](http://blogs.perl.org/users/rafael_garcia-suarez/2011/10/why-dart-is-not-the-language-of-the-future.html)</cite> by Rafaël Garcia-Suarez.
</section>

<section markdown="1">
## Not the Answer
Previously we saw <cite>[Why TypeScript Isn't the Answer]({% post_url 2014-02-27-typescript-isnt-the-answer %})</cite>, today we have seen that neither is Dart the answer.  It is much more ambitious and addresses many more of the JavaScript mines, but ultimately, it will be doomed to go the same way as GWT and not be a major player in web development. That is mostly a consequence of it's separate platform approach, but also because of a few poor choices in the design of that platform.
</section>

{% include series.html %}

*[GWT]: Google Web Toolkit