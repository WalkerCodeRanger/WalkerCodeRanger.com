---
layout: post
tags: [JavaScript]
author: "Jeff Walker"
title: "Are JavaScript Linters the Answer?"
series: javascript-minefield
guid: 06a34377-2325-466f-8a3f-fbb6bd6c6703
final: true
---

In the first post of this series, I explained how [JavaScript is like a Minefield](http://www.walkercoderanger.com/blog/2014/02/javascript-minefield/).  Since then, I have [argued that TypeScript](http://www.walkercoderanger.com/blog/2014/02/typescript-isnt-the-answer/), [Dart](http://www.walkercoderanger.com/blog/2014/03/dart-isnt-the-answer/) and [CoffeeScript](http://www.walkercoderanger.com/blog/2014/03/coffeescript-isnt-the-answer/) are not the answer to the minefield.  I'm almost ready to move on to considering what the answer is, but first I feel the need to address a couple points raised by commenters on that first post.  They focused on the use of so called JavaScript linters, the two most popular of which are [JSHint](http://www.jshint.com/) and [JSLint](http://www.jslint.com/).  These tools check your JavaScript code for adherence to certain best practices and provide warnings/errors when they don't.  For such tools to be helpful, they really need to be integrated into your build pipeline so you are receiving constant feedback.  If a developer has to manually run the tool, it likely won't happen, or will happen so late there will be a large number of issues to fix.

These tools are absolutely helpful and can mitigate many of the common JavaScript land mines.   As a simple example, when using JSLint, the following code produces several errors:

{% highlight javascript %}
var x, y;
function main() {
  return x == y;
}
{% endhighlight %}

JSLint reports both that the code is "Missing 'use strict' statement" and that it "Expected '===' and instead saw '=='".  JSHint by default doesn't warn about those two particular things, it is generally less strict, but it has the [eqeqeq](http://www.jshint.com/docs/options/#eqeqeq) and [strict](http://www.jshint.com/docs/options/#strict) options to enable checking for them.

<section markdown="1">
## Signs Don't Remove the Mines
Despite how helpful these tools can be, I don't think they can ever really be considered an answer.  Simply put, a sign doesn't fix a problem.  The problem still exists.  If someone helpfully found every land mine in a minefield and put a sign next to them, the mines would still be there!  The signs would certainly be beneficial, but an actual answer would be to defuse or remove the mines.  Using a linter is better than nothing, but there is still increased cognitive load to avoid the pitfalls of JavaScript.  The tool is just there to remind you when you slip up and teach you when you don't know.  Personally, I don't need any more things to think about when I am trying to solve difficult programming problems.  I want to focus as much as possible on the real business problem, not the difficulties of expressing it in code.

I recognize that this argument will sound abstract and like quibbling over semantics to some.  They will say, if it lets me get the job done, it is a fix.  I just can't see it that way. To me, this is the most important part of why linters are not enough.  Is it too much to ask for a programming language that doesn't have such horrendous problems that I need a tool to help me avoid them?  The very existence of such tools makes the case that JavaScript is a minefield.
</section>

<section markdown="1">
## Can't Check Everything
Even with a lint tool, there are many things about JavaScript that won't be checked. Additionally, even for issues that these tools address, JavaScript embedded in script tags in pages or in event attributes is generally not run through them.  As an example of what is not addressed, tools do nothing to mitigate the confusing nature of the semantics of `this`.  

{% highlight javascript %}
(function () {
    "use strict";

    function Car(model) {
        this.model = model;
    }

    Car.prototype.drive = function () {
        return alert("You are driving a " + this.model);
    };

    Car.prototype.delayed = function () {
        return function () {
            return this.model;
        };
    };

    var myRide, letsDrive, getModel;
    myRide = new Car("BMW");
    letsDrive = myRide.drive;

    letsDrive(); // alerts "You are driving a undefined"

    getModel = myRide.delayed();
    alert("Delayed model: " + getModel()); // alerts "Delayed model: undefined"
}());
{% endhighlight %}

This code passes the strict JSLint tests with a clean bill of health, but contains what are probably developer mistakes.  I'm sure someone with more JSHint/JSLint experience could come up with many more examples.  This is not to knock these tools, it just isn't possible to check for these things.  A real answer would address these issues, either by changing the semantics or syntax of JavaScript.
</section>

<section markdown="1">
## Code Reviews
One commenter believed that "practices which enforce code review of every check in can help catch almost all of the silly coding mistakes we make that JSlint or JSHint might miss."  Like the use of linters, I believe that code reviews are good practise, but again they don't fix the problem.  They are just a strategy for mitigating it.  Pilots have co-pilots there to double check them for the same reason we do code reviews, but that doesn't fix a poor cockpit design.  Instead, controls that make it easy for pilots to make dumb mistakes are redesigned by plane manufactures to fix the underlying issue. That way the pilot and co-pilot can spend their time focused on getting everything else right, making the flight safer.
</section>

<section markdown="1">
## Don't Code Without One
If you are writing JavaScript code, I strongly recommend you use a linter.  On my current project I have dropped CoffeScript in favour of JavaScript with JSHint.  However, I don't think that has fixed the JavaScript minefield.  Furthermore, it has added issues with false warnings and littering our code with JSHint directives that detract from the focus of the code.

In this series, I have considered the most popular responses to the JavaScript minefield.  I haven't found one that truly addresses my problems with the JavaScript language.  Of course, there are many more languages out there and I could be missing a great one.  Though, I haven't heard of any that meet what I see as the high level criteria of an answer and address the specific issues of JavaScript.  In my next post, I will begin to explore what an answer might look like.
</section>

{% include series.html %}