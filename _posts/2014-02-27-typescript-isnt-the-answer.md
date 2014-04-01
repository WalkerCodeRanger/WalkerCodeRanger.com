---
layout: post
tags: [JavaScript]
author: "Jeff Walker"
title: "Why TypeScript Isn't the Answer"
series: javascript-minefield
guid: 52814372-82e9-4945-916a-bb2dd7915c7b
modified: 2014-03-31 21:45 -05:00
final: true
---
<div class="with-aside aside-right aside-down-4" markdown="1">
I previously wrote about the [minefield that is JavaScript]({% post_url 2014-02-20-javascript-minefield %}){:class="internal"} programming and several possible answers to the problem.  One possible answer is [TypeScript](http://www.typescriptlang.org/). It's an OpenSource project from Microsoft and the language "is a typed superset of JavaScript that compiles to plain JavaScript". It builds on JavaScript by adding classes, modules, interfaces and optional type declarations.  When compiled, the type declarations are erased and ECMAScript 3 compatible code is generated. When possible, TypeScript tries to match syntax and semantics to proposals for ECMAScript 6. Some parts of those proposals are still very much in flux and it's not clear what the final spec will be, so we'll have to see how TypeScript is able to handle that.

<aside markdown="1">
###What is a module?
Many developers with a background in C# or Java development may not be aware what a module actually is, as opposed to a namespace. A module is very much like a namespace except it can directly contain a method, or variable.  In C# and Java namespaces are really just a way of changing the names of classes to make them unique.  Whereas in TypeScript a module is essentially an object.
</aside>
</div>

<section markdown="1">
##Fixes the Wrong Problem
TypeScript enhances JavaScript with types, classes and interfaces.  Some people think that is the problem with JavaScript.  It's not.  The problem with JavaScript is not that it is a dynamically typed prototype based object-oriented language without classes.  That is actually JavaScript's strength.  The problem is that it is a poorly designed language, filled with many hidden land mines awaiting the unsuspecting developer.

>I think that JavaScript's loose typing is one of its best features and that type checking is way overrated. TypeScript adds sweetness, but at a price. It is not a price I am willing to pay.﻿
>
><footer><a href="https://plus.google.com/+DouglasCrockfordEsq/posts/MgzNUSTwjRt">Douglas Crockford</a>, author <cite>JavaScript: The Good Parts</cite></footer>
</section>

<section markdown="1">
##Who Maintains Type Definitions?
TypeScript adds optional type declarations, but when interacting with existing JavaScript libraries there are no type declarations and a lot of TypeScript's benefits disappear.  To deal with that, TypeScript supports type definition files.  These are hand written files that provide the missing type declarations for an existing JavaScript library.  Having good type definition files for the JavaScript libraries you want to use is an important part of having a good TypeScript experience.  Microsoft points to the [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) project as the source of type definitions for popular JavaScript libraries.  However, what happens when the library you want to use isn't popular enough or is too new?  Or, what if there are type definitions, but not for the particular version of the library you need to use?  Have you actually looked at how frequently many of these JavaScript libraries release new versions?  How can you be sure the definitions are correct?  They are just one more source of potential development issues.  Any such library add-ons are bound to be an additional [source of headaches](http://typescript.codeplex.com/workitem/267) if they are not maintained by the library author.  Recently, I experienced problems like this when the [NuGet](http://www.nuget.org) packages for the somewhat new [Ember.js](http://emberjs.com) library were out of date, and when the package for [jQuery](http://jquery.com) failed to correctly support side by side installs of the 1.x and 2.x code lines.
</section>

<section markdown="1">
##Still JavaScript
The real problem with TypeScript is contained in the statement that it is a "**superset of JavaScript.**"  That means that all legal JavaScript programs are also legal typescript programs.  TypeScript *doesn't fix anything in JavaScript* beyond some things that were fixed in ECMA Script 5.  So, for example, the non-strict equality operator `==` is still there and still has the shorter more natural syntax than the strict equality operator `===`. There is still the strangeness of semicolon insertion.  In some cases, the additional features actually make it more likely a developer will adopt the wrong mental model of the language semantics and walk right into a mine.  Classes make the unchanged behaviour of the `this` keyword more confusing.  For example, in a class like `Greeter` from the [TypeScript playground](http://www.typescriptlang.org/Playground), the use of `this` is confusing:

{% highlight javascript %}
class Greeter {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}
	greet() {
		return "Hello, " + this.greeting;
	}
}
{% endhighlight %}

One can't help but feel the `this` keyword in the methods of `Greeter` should always reference a `Greeter` instance.  However, the semantics of `this` are unchanged from JavaScript:

{% highlight javascript %}
var greeter = new Greeter("world");
var unbound = greeter.greet;
alert(unbound());
{% endhighlight %}

The above code displays "Hello, undefined" instead of the naively expected "Hello, world".

**Update**  
A commenter ([alleycat5](http://www.reddit.com/user/alleycat5) on [Reddit](http://www.reddit.com/r/typescript/comments/21qxlh/why_typescript_isnt_the_answer/)) pointed out that TypeScript partially addresses issues with `==` because it will produce type errors for comparisons with `==` when it has type information.

{% highlight javascript %}
var a = "ssdf";
var b = 5;
alert(a==b); // "Operator '==' cannot be applied to types 'string' and 'number'."
{% endhighlight %}

However, if either variable has type `Object` or `any` it will not produce an error and continues to evaluate loose equality.
</section>

<section markdown="1">
##Not the Answer

I conclude that TypeScript is not the answer.  Or perhaps it's more accurate to say it is the answer to a different problem.  If you love JavaScript, warts and all, but wish it had classes, modules, interfaces and static typing then TypeScript is the answer.  My prediction is that in time people will come to realize TypeScript doesn't eliminate the JavaScript minefield and only makes it more confusing by providing the illusion of safety.  TypeScript will become just another tool along the web development roadside used by a niche market of developers.
</section>

{% include series.html %}
