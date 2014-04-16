---
layout: post
tags: [JavaScript]
author: "Jeff Walker"
title: "The JavaScript Minefield: A Proposal"
series: javascript-minefield
guid: 6af478db-fa08-4a47-9f4d-5786a5fa9b3b
final: true
---
In the first post of this series I laid out why [JavaScript is like a minefield](http://www.walkercoderanger.com/blog/2014/02/javascript-minefield/).  In subsequent posts I laid out why I believe that [TypeScript](http://www.walkercoderanger.com/blog/2014/02/typescript-isnt-the-answer/), [Dart](http://www.walkercoderanger.com/blog/2014/03/dart-isnt-the-answer/) and [CoffeeScript](http://www.walkercoderanger.com/blog/2014/03/coffeescript-isnt-the-answer/) are not the answer to the problems posed by the JavaScript Minefield.  I then took a post to consider whether [JavaScript linters are the answer](http://www.walkercoderanger.com/blog/2014/03/coffeescript-isnt-the-answer/); they're not.  That has finally brought us to the point where we are ready to discuss some ideas I have about what an answer to the JavaScript minefield might look like.

My father was a recovering alcoholic, who was sober for 30+ years before his death this past fall.  I don't remember a time before he was sober, but I do remember going to AA meetings with him when I was a little boy.  Those meetings were often opened and closed with the Serenity Prayer.  Over the years I have found this simple prayer to hold a great deal of life wisdom for dealing not only with addiction, but most of life's challenges.

> God, grant me the serenity to accept the things I cannot change,  
> The courage to change the things I can,  
> And wisdom to know the difference.  

It might seem trite or trivial to do so, but it can be applied to the JavaScript minefield.  The reality is, JavaScript is *the* language of the web.  That is unlikely to change any time soon (despite Google's hopes to the contrary with Dart).  Furthermore, JavaScript is littered with land mines.  This puts developers in a difficult predicament.  We want to develop great software for the web, but we also want to have great tools.  How can we change this situation to make it better?  We can't entirely and we will need the serenity to accept what we cannot change about the situation.  Despite that, there are ways to address some of the problems with improved tools and languages.  That path has been opened to us by the example of TypeScript, Dart and CoffeeScript, but it takes real courage to imagine an alternative to the status quo and even more to work to change it.  More important than either serenity or courage, is wisdom to know when to apply each.  Without that we easily go astray trying to change the unchangeable, or timidly fall short of the mark.

I've worked in JavaScript for a number of years now in my professional career, and I have to admit that I have never particularly enjoyed the experience.  I've also written [a small JavaScript library for input masking](https://github.com/WalkerCodeRanger/RangerMask) where unit testing was critical to ensuring correct behaviour.  In that experience I got to really dig into the JavaScript object model.  Through all that, I have felt that there must be a better way.  All tools and languages have shortcomings and are better suited to certain tasks than others.  However, compared to languages like C#, Java and C++ that I have worked in or languages like Scheme and Haskell that I have studied, JavaScript has more than its share of problems.  If I had the power to design a language from scratch to be the language of the web that ran in all browsers, I would probably design some kind of statically typed multi-paradigm language combining the best of functional and object-oriented approaches.  Unfortunately, we have inherited JavaScript and I recognize that is something outside my power to change.  It is, however, possible that we could create an open source language compiled to JavaScript that could dramatically improve on it.  I know many are attempting to do just that with varying degrees of success.  I believe that no one has yet hit upon the right mix of features and syntax for such a language, and the language that will come to be seen as the successor to JavaScript has yet to be created.  Based on my experience, research and ascetics I humbly propose 4 guiding principles or philosophies for such a project.

1. It's Just JavaScript, but Better
2. Syntax Matters
3. Embrace Prototypes
4. Interoperate, don't Imitate

Let's explore each and see how they might be embodied in some proposed syntax. Please note that all code examples are just one possible syntax out of many.

<section markdown="1">
## It's Just JavaScript, but Better
The example of CoffeeScript has clearly shown the advantages of an "It's Just JavaScript" approach.  A clear and direct mapping between the language and JavaScript makes it easy for the developer to understand what is happening and what they can expect.  It aids early adoption when support for source maps may not be available yet.  It provides a clear path to JavaScript interoperability.  Importantly, this approach greatly simplifies the problem for an Open Source project that doesn't have the resources to tackle a whole new platform approach the way Google has done with Dart.  However, being just JavaScript doesn't preclude deviations in semantics, not just syntax. CoffeeScript often shows an unwillingness to change JavaScript's semantics even when it would be easy to do so and provide significant improvements to the developer.  Instead we should strive to improve on JavaScript semantics when possible.  That's why, rather than "It's Just JavaScript" or even "It's Just JavaScript, the Good Parts" I propose "It's Just JavaScript, but Better".

###Proposed Syntax
In syntax, "boring" is good.  Deviating from syntax that is widely known without a good reason will probably just confuse people and hurt language adoption.  I propose a largely C-style syntax with proper variable scoping.  That is to say, you can't use a variable or function before it is declared or outside the scope it is declared in.  C# has carefully considered a lot of the issues and won't, for example, allow one to shadow a variable or parameter in a method with another in the method.  Scoping should just *work*, not cause any surprises and protect against unintended behaviour. Semicolons should be required statement terminators and white-space shouldn't be significant.  Parenthesis, commas and curly braces are required in the same places languages like Java, C# and JavaScript require them.  All of that creates a language that is clear, unambiguous, easy to read and fast to compile.

{% highlight javascript %}
forkeys(var key in obj)  // loops through Object.keys(obj)
{
  var inner = obj[key];
  inner.method(outer); // error can't access outer before it is declared
}
inner.method(); // error can't access inner that is not in scope
var outer = 3;
{% endhighlight %}

To improve on JavaScript, each operator should have a single result type regardless of the types passed to it. This rule is followed in other languages with implicit conversions like VB.NET.  Although the flexibility of JavaScript's boolean operator leads to cute idioms like using `||` for null coalescing, it does nothing for readability or bug prevention.   Boolean operators should always result in a boolean value.

{% highlight javascript %}
var x;
x = false or 5; // x == true;
x = "5" + 5;    // x == 10
x = 5 & 5;      // x == "55"
x = 1 == "1";   // false (== compiles to ===)
x = null ?? 5;  // x == 5, ?? returns the right side if the left is null or undefined
x = 4?;         // x == true, ? checks value is not null or undefined
// the existential operator '?' can also be combined
x = something?.method?(); // simply returns null rather than throwing an exception on null
{% endhighlight %}

To increase safety, all code should compile to JavaScript strict mode and be wrapped in an [IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression/).  Additionally, all uses of global scope should be explicit.
{% highlight javascript %}
::console.log("diagnotistic message"); // use :: to access global
use $; // pull global variables into the local scope explicitly
$('#myButton').click(); // because of 'use' the '$' doesn't need '::' before it
{% endhighlight %}
</section>

<section markdown="1">
##Syntax Matters
The words you use for something matter.  Words and syntax can either aid in comprehension and remind us of how things work, or can obscure meaning and consistently mislead.  Having syntax for something can change how you think about it, how often you use it and ultimately how you program.  The first time I remember being truly struck by that was when [anonymous inner classes](http://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html) were added to Java.  For those not familiar with Java, that feature allows one to create an unnamed "class" inside a method and instantiate an instance of it that has access to the containing scope.  It is very much like being able to declare an object literal inside a function in JavaScript and have access to the function closure.  In Java, there are enough restrictions on anonymous classes to make for a straight forward translation to Java without that feature.  In fact, that is how the compiler implements it.  Nevertheless, this feature provided syntax for something and changed how most people wrote Java code even though it didn't strictly add any capabilities.  It was always possible to do before, but was so awkward that it was rarely done.  For JavaScript the situation is a little different.  With JavaScript there is certain semantics that we will not be able to change without too great a performance or complexity penalty.  In those cases, we need to come up with syntax that clarifies the semantics of JavaScript.

###Proposed Syntax
I have repeatedly raised the issue of the confusing semantics of `this` in JavaScript.  Attempts to improve JavaScript have generally made no attempt to address this issue.  One of the two pillars of my approach is a new syntax for `this`.  In other object oriented languages, `this` *always* refers to the current instance of the class lexically containing the occurrence of `this`.  In JavaScript, it actually has a significantly different meaning, but the value of `this` ends up being equal to what it would have been given the more common definition in many situations.  That is the root of the confusion.  In order to create a syntax that clarifies this, we must first ask what are the semantics of `this` in JavaScript.  The value of `this` can be determined in four different ways.  Namely, through invoking a function after the `.` operator, invoking the function with a value for `this` using `call` or `apply`, or by invoking it as a constructor function using the `new` operator. Additionally, it can be fixed to a particular value by calling `bind`.  The value of this could be better termed the *context* of the function call.  A further confusion arises when functions are nested and have different contexts.  In that situation, it is far too easy to accidentally reference the wrong context with `this`, because one forgets that the context of the nested function is different from the context of the outer function.  This mistake is so frequently made because the more common definition of `this` is lexically based and the nested function is lexically nested, so it seems it should have the same context.  I propose that both of these issues can be clarified by making the context a special named parameter of the function.  Perhaps listed before the other parameters and separated from the rest by a dot rather than a comma, since the most common way of establishing the context of a function is with the dot operator.

{% highlight javascript %}
use $; // use jQuery
$("li").map( (item . index) -> // jQuery passes each item as the context to the function
  {
    return cssClass -> item.hasClass(cssClass);
  });
{% endhighlight %}

You see above that I have also shortened the verbose function syntax to simply `->`.  The arrow is widely recognized as a function operator and is [a proposed addition to ES6](http://wiki.ecmascript.org/doku.php?id=harmony:arrow_function_syntax).  I propose that it be the only function declaration syntax.  Additionally, the return line shows that the parenthesis around the argument can be omitted when there is a single argument and the body can be shortened when the function returns a single expression. This functionality is like lambda expressions in C#. So the return line is equivalent to `return (cssClass) -> { return item.hasClass(cssClass); };`. Notice how there is no ambiguity over the context in the inner function because the context of the outer function is clearly and uniquely named.  The typical mistake in JavaScript would be to write that line as `return function(cssClass) { return this.hasClass(cssClass); };`, but that would be incorrect because `this` does not refer to the context of the outer function inside the inner function.

A fully defined JavaScript alternative would probably have many other niceties like [splats](http://coffeescript.org/#splats), [array slicing](http://coffeescript.org/#slices), [string interpolation](http://coffeescript.org/#strings), date literals, modules, default parameters, a call operator (perhaps `..`) and some kind of asynchronous programming support [like C#](http://msdn.microsoft.com/en-us/library/hh191443.aspx), but built on top of promises and callbacks. 
</section>

<section markdown="1">
##Embrace Prototypes
JavaScript doesn't have classes.  Instead it has object prototypes and constructor functions.  Yet, many developers yearn for classes and try to extend JavaScript with class like functionality.  However each implementation of classes in JavaScript is different and [many are incompatible with each other](http://www.bennadel.com/blog/2180-Your-Javascript-Constructor-Logic-May-Break-Prototypal-Inheritance.htm). JavaScript developers can't even agree on whether/how to use the `new` keyword and declare constructors.  As many authors, including [Douglas Crockford](http://javascript.crockford.com/prototypal.html), have noted, it is much simpler to embrace the prototype based nature of JavaScript and avoid not only classes but constructor functions by using `Object.create(...)` to directly setup prototype chains.  David Walsh has a great three part write up on this (part [1](http://davidwalsh.name/javascript-objects), [2](http://davidwalsh.name/javascript-objects-distractions), [3](http://davidwalsh.name/javascript-objects-deconstruction)).  By accepting this simple truth and embracing it we can greatly simplify both the semantics and syntax of our language. Following the principle that syntax matters we need a syntax that clarifies this.  We can further simplify our language if we accept that JavaScript doesn't have private properties (at least without introducing a reasonable amount of overhead).

###Proposed Syntax
I think the syntax for objects is important and while I propose a concrete syntax here, I think there is further room for improvement.  A syntax for prototypical inheritance is the second pillar of my approach. The essential idea is that all object construction is through object literals, we simply need a way to specify the prototype object when declaring an object literal.  Additionally, our syntax can be much clearer if object literals have a clearly distinct syntax from function bodies (this is needed to support the lambda expression style syntax described before). 

{% highlight javascript %}
var anObject = {**}; // an empty object, equivalent to { } in JavaScript

use console&.log; // The & is the bind operator used to bind the context
                  // so this is equivalent to console.log.bind(console)

var animal =
  {**
    // the constructor property of an object is special. When a
    // object is created with animal as it's prototype the
    // the constructor will be called on it (unless it has it's own
    // constructor).
    constructor = (animal . name) -> { animal.name = name; },
    legs = 4,
    eat = (animal . food) ->
      {
	    // Here we see the ability to embed expressions in strings
        log('{animal.name} ate {food} on {animal.legs} legs');
      },
    speak = -> { throw "speak not implemented"; },
  };
  
var dog =
  {*animal* // here we declare what the prototype is
    // We should call the animal constructor from our constructor.
    constructor = (dog . name) ->
    {
      // Notice we use the proto keyword to access it's
      // prototype.  When a function is called on proto, the
      // context is the original object (in this case dog)
      dog.proto.constructor(name);
    },
    // As in Javascript, this speak property will hide the prototype
    // speak property.
    speak = -> { log('Woof!'); },
  };
  
 var cat =
  {*animal*
    constructor = (cat . name) ->
    {
      cat.proto.constructor(name);
      // after calling the proto constructor, we can do our
      // own initialization
      cat.lives = 9;
    },
    eat = (cat . food) ->
    {
      if(cat.lives > 0)
        cat.proto.eat(food);
      else
        log('The {food} sits uneaten :(');
    },
    speak = (cat.) -> { if(cat.lives > 0) log('Meow!'); },
    oops = (cat.) -> { if(cat.lives > 0) lives--; },
  };

  // Now let's play with out pets

// This is how we pass parameters to the constructor
var myDog = {*dog("Skip")*};

var myCat =
  {*cat("Fluffy")*
    // There was already a horrible accident
    legs = 3,
    lives = 8,
  };
	
myDog.speak();					// prints "Woof!"
myDog.eat('table scraps');		// prints "Skip ate table scraps on 4 legs"

myCat.speak();					// prints "Meow!"
myCat.eat('a mouse');			// prints "Fluffy ate a mouse on 3 legs"

// Functions always return the context unless a return value is specified,
// so we can chain our calls to oops() (even return; will return the context)
myCat.oops().oops().oops().oops() // Someone has it out for fluffy
{% endhighlight %}

Note how using the `=` operator in object declarations increases consistency across the language. Unlike in CoffeeScript, JavaScript property attributes (introduced in ES5) should be considered.

{% highlight javascript %}
var demo =
  {**
    hidden items = [], // not enumerable
    get count = demo. -> demo.items.length, // a getter
    readonly field = 42, // not writeable
    'a property name' = "something",
  };
{% endhighlight %}

Support for property attributes will have to be carefully planned. Additionally, it needs to be considered how private properties would be supported if they were [added to JavaScript](http://wiki.ecmascript.org/doku.php?id=strawman:private_names).

There are some other possible syntaxes for object literals. I welcome suggestions for this.  Keep in mind that it has to be distinct enough that the compiler and programmer can distinguish it. The syntax can't be ambiguous with existing operators or when used with the lambda form for `->` described above (i.e. there must be something more than just `{` to start the object). It should also imply the creation of an object with a prototype (which is not the same as inheritance).  Finally, it is worth considering how difficult it is to type including on international keyboards (many language avoid $ for that reason).  I've come up with a few more considering those criteria.

{% highlight javascript %}
// The ~ could be taken to mean 'like a', so that
var myDog = ~dog{name='skip'}; // is an object like a dog
var something = ~{prop=5}; // is a general object like all objects
var empty = ~{};

// Alternativly, the ~ could be moved inside the braces
var myDog = {~dog, name='skip'}
var something = {~, prop=5};
var empty = {~};

// Other operators could be used inside the brace instead
var myDog = {>dog, name='skip'}
var something = {>, prop=5};
var empty = {>};
// or
{% raw %}
var myDog = {%dog, name='skip'}
var something = {%, prop=5};
var empty = {%};
{% endraw %}
{% endhighlight %}
</section>

<section markdown="1">
##Interoperate, don't Imitate
The last principle that I propose guides how this new language should interoperate with JavaScript and whether it needs to be powerful enough to express every valid JavaScript program.  I think interoperability with all JavaScript features is critical.  We simply can't predict how libraries will make use of JavaScript features and must make sure that they can't break the user experience of our language.  For example,  I think it is very bad that CoffeeScript assumes property access is side effect free and idempotent (returns the same value repeatedly). Those are simply not true if the property is actually a getter.  While no code written in CoffeeScript will have getters, libraries will increasingly use them as a larger percentage of installed browsers support them. Decisions like that could easily be the downfall of a language.  What if the next great library, the next "jQuery" relies on them heavily?  That could be the end of CoffeeScript, or at least a very painful transition for CoffeeScript users as the problem was fixed.

While interoperability is critical, that doesn't mean it must be necessary to fully use every language feature.  I have already proposed abandoning the ability to directly use the `new` operator or to easily declare constructor functions.  It may be the case that not every property attribute or operator is important to have.

###Proposed Syntax
While there should be no `new` operator.  It would be possible to invoke constructor functions declared in other libraries by using them in place of object prototypes.

{% highlight javascript %}
var birthday = {*Date("7/10/1980")*};
{% endhighlight %}

Another way the language can "Interoperate, not Imitate", is to provide functionality that is similar to but not equivalent to JavaScript.  For example, the `typeof` operator should be improved to at least return something more reasonable for the `null` value.  Additionally, the `instanceof` operator should be replaced with something that checks directly against the prototype chain rather than falsely implying that there is such a thing as an object type tied to a constructor function.
</section>

<section markdown="1">
##What Now?
Having laid out these principles and proposed some concrete syntax based on them, the question becomes where do we go from here?  I am seriously considering whether it is worth the effort of creating another JavaScript alternative.  I have always been interested in programming languages and have the experience necessary to implement a compiler.  However, I also know what a large commitment a project like that would be.  Were I to start such a project, I would probably try to have an open dialogue process where people could provide input into language features and syntax and reasons for design decisions could be documented.

Gauging interest in another JavaScript alternative has been a major motivation in writing this series of articles.  To that end, please take a moment to answer the question below.  Furthermore, if you would be interested in contributing to such a language in any capacity whether it be coding, managing or design input please [email me](mailto:Jeff@WalkerCodeRanger.com).

<STYLE>#qp_main86234 .qp_btna:hover input {background:rgb(150,150,150)!important}</STYLE><div id="qp_main86234" class="clearfix" style="border-radius:6px;border:1px solid rgb(150,150,150);margin:0px;padding:10px;padding-bottom:2px;background-color:rgb(255,255,255);background-position:top left"><div style="border-radius:6px;font-family:Arial;font-size:12px;font-weight:bold;background-color:rgb(128,128,128);color:rgb(255,255,255);margin-bottom:10px"><div style="padding:10px">Do you think a language like the one being proposed here should be made?</div></div><form id="qp_form86234" action="http://www.poll-maker.com/results86234x05d18789-3" method="post" target="_blank" style="display:inline;margin:0px;padding:0px"><div style="border-radius:6px;background-color:transparent"><div style="display:block;font-family:Arial;font-size:12px;color:rgb(0,0,0);padding-top:5px;padding-bottom:5px;clear:both;cursor:pointer;cursor:hand"><span onClick="if((!event.target?event.srcElement:event.target).tagName!='INPUT'){var c=this.childNodes[0];c.checked=(c.type=='radio'?true:!c.checked);}" style="display:block;padding-left:30px"><input style="float:left;width:25px;margin-left:-25px;margin-top:-1px;padding:0px;height:18px" name="qp_v86234" type="radio" value="1">No</span></div><div style="display:block;font-family:Arial;font-size:12px;color:rgb(0,0,0);padding-top:5px;padding-bottom:5px;clear:both;cursor:pointer;cursor:hand"><span onClick="if((!event.target?event.srcElement:event.target).tagName!='INPUT'){var c=this.childNodes[0];c.checked=(c.type=='radio'?true:!c.checked);}" style="display:block;padding-left:30px"><input style="float:left;width:25px;margin-left:-25px;margin-top:-1px;padding:0px;height:18px" name="qp_v86234" type="radio" value="2">Yes, if the creator is excited about it, why not</span></div><div style="display:block;font-family:Arial;font-size:12px;color:rgb(0,0,0);padding-top:5px;padding-bottom:5px;clear:both;cursor:pointer;cursor:hand"><span onClick="if((!event.target?event.srcElement:event.target).tagName!='INPUT'){var c=this.childNodes[0];c.checked=(c.type=='radio'?true:!c.checked);}" style="display:block;padding-left:30px"><input style="float:left;width:25px;margin-left:-25px;margin-top:-1px;padding:0px;height:18px" name="qp_v86234" type="radio" value="3">Yes, another language choice would be good</span></div><div style="display:block;font-family:Arial;font-size:12px;color:rgb(0,0,0);padding-top:5px;padding-bottom:5px;clear:both;cursor:pointer;cursor:hand"><span onClick="if((!event.target?event.srcElement:event.target).tagName!='INPUT'){var c=this.childNodes[0];c.checked=(c.type=='radio'?true:!c.checked);}" style="display:block;padding-left:30px"><input style="float:left;width:25px;margin-left:-25px;margin-top:-1px;padding:0px;height:18px" name="qp_v86234" type="radio" value="4">Yes, and I would try it out</span></div><div style="display:block;font-family:Arial;font-size:12px;color:rgb(0,0,0);padding-top:5px;padding-bottom:5px;clear:both;cursor:pointer;cursor:hand"><span onClick="if((!event.target?event.srcElement:event.target).tagName!='INPUT'){var c=this.childNodes[0];c.checked=(c.type=='radio'?true:!c.checked);}" style="display:block;padding-left:30px"><input style="float:left;width:25px;margin-left:-25px;margin-top:-1px;padding:0px;height:18px" name="qp_v86234" type="radio" value="5">Yes, and I would definitely use it</span></div></div><div style="padding-top:10px;clear:both"><a class="qp_btna" href="#"><input name="qp_b86234" style="width:80px;height:30px;margin-right:5px;border-radius:10px;border:1px solid rgb(150,150,150);font-family:Arial;font-size:12px;font-weight:bold;color:rgb(0,0,0);cursor:pointer;cursor:hand;background:rgb(200,200,200)" type="submit" value="Vote"></a><a class="qp_btna" href="#"><input name="qp_b86234" style="width:80px;height:30px;margin-right:5px;border-radius:10px;border:1px solid rgb(150,150,150);font-family:Arial;font-size:12px;font-weight:bold;color:rgb(0,0,0);cursor:pointer;cursor:hand;background:rgb(200,200,200)" type="submit" value="Results"></a></div><a id="qp_a86234" style="float:right;font-family:Arial;font-size:10px;color:rgb(0,0,0);text-decoration:none;margin-top:-12px;margin-right:-5px" href="http://www.poll-maker.com">Poll Maker</a></form></div><script src="http://scripts.poll-maker.com/3012/scpolls.js" language="javascript"></script>
<p></p>
</section>

{% include series.html %}

*[IIFE]: Immediately-Invoked Function Expression