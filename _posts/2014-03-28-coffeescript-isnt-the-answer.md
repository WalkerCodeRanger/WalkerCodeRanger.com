---
layout: post
tags: [JavaScript]
author: "Jeff Walker"
title: "Why CoffeeScript Isn't the Answer"
series: javascript-minefield
guid: 497c34ae-a14c-493f-acaa-6f2ef91d152a
modified: 2014-04-10 21:00 -05:00
final: true
---
[CoffeeScript](http://coffeescript.org/) is an open source project that provides a new syntax for JavaScript.  I have to say that I have a lot of respect for CoffeeScript and it got a lot of things right.  The "golden rule" of CoffeeScript is *"It's just JavaScript"*.  That means there is a straightforward equivalent to every line of CoffeeScript.  Consequently, there aren't as many issues with JavaScript interop as there are with [Dart](https://www.dartlang.org/) (see <cite>[Why I'm Ditching CoffeeScript](http://toshokelectric.com/blog/2013/04/04/why-im-ditching-coffeescript/) </cite> by Chris Toshok for a discussion of how this isn't true for accessor properties and a peek into the politics of open source).  It also makes it easy to deal with any shortcomings in tooling, because the developer should be more comfortable switching between CoffeeScript and the compiled JavaScript, for example, when debugging in the browser without the aid of a source map.  Though CoffeeScript has matured enough that a lot of those shortcomings have been resolved.  Nevertheless, the assurance that you can read the compiled output is comforting.  CoffeeScript programs can be very compact and require less typing.  The language also protects you from many of the [JavaScript land mines](http://www.walkercoderanger.com/blog/2014/02/javascript-minefield/). For example, in CoffeeScript `==` compiles to the strict equality operator `===`, making it impossible to use the dangerous loose equality operator.

The strengths of CoffeeScript were the reason that I argued for its use on the last project I was part of.  Indeed, we adopted CoffeeScript and used the [Mindscape Web Workbench](http://www.mindscapehq.com/products/web-workbench) extension for Visual Studio which compiled on save.  For me, the compile on save was helpful in learning CoffeeScript because I could immediately see what the resulting JavaScript was without firing up a browser, as required by many of the other options that compile on the fly as part of an asset pipeline.  If you're seeking a similar approach you might also want to check out the popular [Web Essentials](http://vswebessentials.com/) plug-in.  Though I found merging the compiled JavaScript files to by annoying enough that I am now moving away from that approach.  I spent 6+ months on that project learning and working in CoffeeScript.  Out of [TypeScript](http://www.typescriptlang.org/), [Dart](https://www.dartlang.org/) and [CoffeeScript](http://coffeescript.org/) I really can speak to the strengths and weaknesses of the last from experience.  That experience has led me away from using CoffeeScript on my current project.

<section markdown="1">
## Ambiguous Code

I quickly found that there were situations where I couldn't predict what a given chunk of CoffeeScript would compile to or couldn't figure out how to write the CoffeeScript for the JavaScript I wanted.  The problem arises because in CoffeeScript parenthesis, curly braces and commas are often optional and white-space and indention replace them.  Frequently code I thought should compile didn't.  Consider this valid code.

{% highlight coffeescript %}
func 5, {
   event: -> 45,
   val: 10}
{% endhighlight %}

Now, if the event function needs to be expanded, one would logically think it could be changed like this.

{% highlight coffeescript %}
func 5, {
   event: (e) -> 
     if e.something
       36
     else
       45,
   val: 10}
{% endhighlight %}
 
However, that doesn't compile.  You have to drop the comma or move it onto the next line, before `val`.
 
How about something like `func1 1, func2 2, 3`? Does 3 get passed to the first or second function?  I still frequently forget one place where parenthesis are not optional, leading to unexpected behaviour.  The statement `x = f -> f` looks like it should assign x to the identity function, but it doesn't.  Instead, x is assigned the result of calling f with a function of no arguments returning f. Or how about this, `a + b` adds a and b while `a +b` calls a with the argument `+b`.   There are lots of other examples of ambiguous and confusing syntax in CoffeeScript.  For more examples, check out <cite>[My Take on CoffeeScript](http://ruoyusun.com/2013/03/17/my-take-on-coffeescript.html)</cite> by Ruoyu Sun and this [Gist](https://gist.github.com/tomdale/2481356) from Tom Dale.
</section>
 
<section markdown="1">
## Readable, Think Again
Ambiguous code is only one part of what makes CoffeeScript difficult to read. Everything is an expression (returns a value) and it has lots of control flow and operator aliases.  All of which encourages very English sentence like code.  However, that often makes the code less readable, not more.  The human mind is good at understanding logic in symbols; English is not good at expression logic.  As an example, consider the line `eat food for food in foods when food isnt 'chocolate'` from the [CoffeeScript tutorial](http://coffeescript.org/#loops).  The declaration of what food is occurs in the middle of the line and doesn't even look like a variable declaration.  Furthermore, until you finish reading the line it isn't clear which foods will be eaten.  That code could easily be worse if `unless eat is undefined` was added to the end, making the whole line conditional.  One wouldn't realize it was conditional until reading the end.  Imagine if the expression before the `for` had been a complex multi-line method call with logic in it.  Ryan Florence digs deeper into these issues in his post <cite>[A Case Against Using CoffeeScript](http://ryanflorence.com/2011/case-against-coffeescript/)</cite>.  Suffice it to say, many of the features added to CoffeeScript with the intent of making it "readable" actually have the opposite effect.
</section>

<section markdown="1">
## Variable Capture
In addition to the these confusions, CoffeeScript actually creates new mines that aren't present in JavaScript at all.  As explained by Jesse Donat in <cite>[CoffeeScript's Scoping is Madness](https://donatstudios.com/CoffeeScript-Madness)</cite>, in CoffeeScript's zeal for terseness and "simplicity" it has actually created a major pitfall around variable declarations.  In CoffeeScript there is no variable declaration syntax equivalent to `var` in JavaScript.  Instead, all variables are declared in the scope they are first assigned in.  This means it is easy to accidentally change the scope of a variable and not even realize it.

To see how this would happen, imagine you are in a hurry to implement the next feature. Unbeknownst to you, the following code is near the bottom of the file you are about to modify.

{% highlight coffeescript %}
innocent = (nums) ->
	lastValue = 1
	for num in nums
		doSomething lastValue, num
		lastValue = num
	lastValue
{% endhighlight %}

Now, near the top of a code file you add these lines. So that the file is now.

{% highlight coffeescript %}
value = 42
lastValue = null
changeValue = (newValue) ->
	lastValue = value
	value = newValue


# many pages of code here


innocent = (nums) ->
	lastValue = 1
	for num in nums
		doSomething lastValue, num
		lastValue = num
	lastValue
{% endhighlight %}

Did you catch the error?  Originally, `lastValue` was local to the `innocent` function, but now it is global to the file and the `innocent` function actually modifies it.  We now have a bug waiting to happen when someone calls `innocent` then checks the value of `lastValue`.  Keep in mind there could be multiple screens of code between these two code segments.
</section>

<section markdown="1">
## Not Far Enough
Certainly, a language that is "just JavaScript" won't be able to fix everything. Yet, despite radically altering the syntax of JavaScript and claiming to only expose the good parts of JavaScript, in some ways CoffeeScript doesn't go far enough in fixing the issues of JavaScript. For example, the `+` operator is still both numeric addition and string concatenation.  That is frequently listed as one of the bad parts of JavaScript.  Why no provide separate operators for the two?   Likewise, the `typeof` operator "is probably the biggest design flaw of JavaScript, as it is almost completely broken" according to the [JavaScript Garden](http://bonsaiden.github.io/JavaScript-Garden/#types.typeof), but CoffeeScript brings its behaviour over unchanged.  Instead CoffeeScript could have altered the meaning of `typeof` to something that was more useful, for example the `typeOf()` function [recommend by Douglas Crockford](http://javascript.crockford.com/remedial.html).
</section>

<section markdown="1">
## Classes Are an Illusion

Many developers wish that JavaScript had classes.  This has led to numerous alternative ways to emulate class like functionality in JavaScript and libraries that embody those various approaches.  Many of the different approaches don't interact well with each other.  There is even debate on whether to use constructors requiring the `new` keyword or to make everything a factory function.
CoffeeScript has a `class` keyword that makes it easy to create classes.  However, since "it's just JavaScript" they are just one particular emulation of classes on top of JavaScript.  Consequently, they may not play well with your library of choice.  More troublesome is that they make other language features more confusing.  In particular the `this` keyword.  When creating a class you can't help but feel that `this` should refer to the class everywhere within the body of the class.  That is what it would mean for something to be a *class*.  But the actual semantics of `this` are unchanged. For example, if you declare a class with methods using `this`.

{% highlight coffeescript %}
class Car
  constructor: (@model) -> 

  drive: () ->
    alert "You are driving a " + this.model;

  delayed: () ->
    -> this.model
{% endhighlight %}

Because `Car` is a class, one expects `this` to always refer to the current car object, but instead it behaves like regular JavaScript.

{% highlight coffeescript %}
myRide = new Car("BMW")
letsDrive = myRide.drive

letsDrive() # alerts "You are driving a undefined"

getModel = myRide.delayed()
alert("Delayed model: " + getModel()) # alerts "Delayed model: undefined"
{% endhighlight %}

Ultimately, JavaScript isn't a class based language and classes never quite work right in it.  I believe it is a mistake to push the language in that direction.  For a more in-depth discussion of why this is the case, see <cite>[JavaScript Doesn't Need Class](http://www.i-programmer.info/programming/javascript/3354-javascript-doesnt-need-class.html)</cite> by Ian Elliot.

> I have been writing JavaScript for 8 years now, and I have never once found need to use an uber function. The *super* idea is fairly important in the classical pattern, but it appears to be unnecessary in the prototypal and functional patterns. I now see my early attempts to support the classical model in JavaScript as a mistake.
>
>
><footer>Douglas Crockford <cite markdown="1">[Classical Inheritance in JavaScript](http://www.crockford.com/javascript/inheritance.html)</cite>, author <cite>JavaScript: The Good Parts</cite></footer>

</section>

<section markdown="1">
## And So...
CoffeeScript started from a strong position and good philosophical approach to the problem of the [JavaScript Minefield](http://www.walkercoderanger.com/blog/2014/02/javascript-minefield/).  Unlike TypeScript, it was willing to break with JavaScript and fix its issues.  Unlike Dart, it was intended to remain true to JavaScript and be fully interoperable.  Realistically, the issues I have raised with CoffeeScript don't come up every day.  Ultimately though, they are enough to say we need something better.  I hope to share some thoughts soon on what such a solution might look like.  However, based on feedback in the comments, we'll need to discuss JavaScript linters first.
</section>

{% include series.html %}