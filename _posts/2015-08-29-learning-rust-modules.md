---
layout: post
tags: [Rust]
author: "Jeff Walker"
title: "Learning Rust Modules"
guid: cb3eea41-a60b-4cba-bb46-9a6022c6c6f0
final: true
---

*This post is based on Rust 1.2.0 and I am just starting out with Rust, it is possible I misunderstood something.*

The other day, I sat down to write my first bit of [Rust](https://www.rust-lang.org/) code ever. I was working on a simple kata and many other people would just whip up something with all the code in one file.  However, working as a C# developer for many years, I am in the habit of organizing my code into namespaces and separate files.  I was totally stumped for a while on how to do this in Rust.  The [documentation of modules](https://doc.rust-lang.org/stable/book/crates-and-modules.html) wasn't immediately helpful.  I later figured out that certain key sentences did in fact explain how modules work in Rust. However, coming from a C#/Java way of doing namespaces/packages, they weren't explicit and direct enough to flip around my thinking.  Now that I've figured out how modules work, I thought I'd share what I figured out.

<section markdown="1">
## Review of Namespaces
C# namespaces and Java packages are really very similar.  In this post I'll focus on C# namespaces, because I'm a C# developer, and only mention Java when there is a difference.  By convention, we organize and name our code files by the namespaces and classes they contain.  But really there is no correlation between the file structure of the code and the namespaces and classes.  We are free to name each file totally differently than the classes it contains and put it in a directory that has nothing to do with the namespaces in it.  Indeed, we could combine our code in a single file if we so chose.  When compiling, we are really providing a list of files to compile together.  Typically our IDE hides that from us by either making a list of the code files in a project file, or simply assuming that every code file in a project directory should be compiled together.  Although we typically don't think about it this way, namespaces aren't really entities, but are just a way of creating really long unique names for classes.  So the class `MyNamespace.MyClass` could logically be thought of as being one long class name `MyNamespace__MyClass`  with some compiler help to make it easy to refer to by figuring out the first part of the name (note, class names aren't actually changed this way).  In fact, in the compiled code namespaces exist only as long names for classes and every reference is fully qualified with its namespace.  With that refresher, let's look at how Rust does modules.
</section>

<section markdown="1">
## Rust Modules
Rust modules do not work like C# namespaces or Java packages.  First, in addition to organizing classes like namespaces, they can also contain static variables and functions . In this way modules are similar C# static classes or to a Java class containing only static members.  Second, Rust modules aren't unrelated to code files the way namespaces are.  When we put all of our code in one file, they look very similar. For example, if we were implementing a math library, some of our code might be:

{% highlight rust %}
pub mod number
{
	pub struct Complex<T>
	{
		r: T,
		i: T
	}
	pub struct Vector<T>
	{
		x: T,
		y: T
	}
}

pub mod trig
{
	fn sin(x: f64) -> f64 { unimplemented!() }
	fn cos(x: f64) -> f64 { unimplemented!()}
}
{% endhighlight %}

However, if we would like to spilt our code into multiple files then they work differently.  Rather than declaring the module in each file, we declare the module without a body in the parent Rust file and the compiler "includes" the code of the corresponding file.  The pulling in of the other code file feels like C style `#include` although it isn't being handled by the preprocessor, so it isn't a simple textual include with all the gotchas that come with that.  The Rust compiler will look in two places for the file to include for a module.  It will look in the directory of the parent code file for `module_name.rs` or `module_name\mod.rs`.  Thankfully, having both files is a compile error.  The second form, using a directory, allows one to have further modules nested inside the given module.  I imagine most people will use the first style whenever possible.  When compiling Rust, you are really only providing one main file to compile and it finds the rest by including them as modules.  If we split our math example up using this technique, we could get:

{% highlight rust %}
// lib.rs
pub mod number;
pub mod trig;
{% endhighlight %}

{% highlight rust %}
// number/mod.rs
pub struct Complex<T>
{
	r: T,
	i: T
}
pub struct Vector<T>
{
	x: T,
	y: T
}
{% endhighlight %}

{% highlight rust %}
// trig.rs
fn sin(x: f64) -> f64 { unimplemented!() }
fn cos(x: f64) -> f64 { unimplemented!()}
{% endhighlight %}

Notice that `lib.rs` contains the declarations of the `number` and `trig` modules.  This is what actually creates the modules.  The other files contain no reference to the modules.  Their contents are in the module by virtue of the Rust compiler including them because of the module declarations in `lib.rs`.  I'm trying to withhold my judgement, but coming from a C# background this just feels weird.
</section>

<section markdown="1">
## One Type, One File
If you're a C# developer looking at this, you're probably thinking "but `Complex<T>` and `Vector<T>` are still in the same file, how do a separate them?"  It is actually not possible to spilt a module across files in Rust the way one can split a namespace in C#.  So to put them in separate files, they would need to be in separate modules.  However, there is an interesting workaround for this.  Notice that we specified our modules to be public using the `pub` keyword.  C# namespaces aren't public or private, only the classes in them are.  Rust also allows its equivalent of the `using` statement, the `use` statement to be public or private.  When `use` is private, it functions very much like a `using` statement.  When it is public, it allows one to incorporate stuff from one module into another module.  These features allow us to put types into their own files and hence own modules, but expose them to the outside world as if they were together in one module.  Doing that to our math example would look like:

{% highlight rust %}
// number/mod.rs
mod complex;
mod vector;

pub use number::complex::Complex;
pub use number::vector::Vector;
{% endhighlight %}

{% highlight rust %}
// number/complex.rs
pub struct Complex<T>
{
	r: T,
	i: T
}
{% endhighlight %}

{% highlight rust %}
// number/vector.rs
pub struct Vector<T>
{
	x: T,
	y: T
}
{% endhighlight %}

Notice that in `mod.rs` the two modules are not declared with `pub`.  They default to private, so they are not visible as sub-modules.  Then we use public use statements to include `Complex` and `Vector` from their sub-modules into the `number` module.  Now we can use them as if they were in the `number` module.
</section>

<section markdown="1">
## Crates
Up to this point, we have talked about modules within your own code.  However, it won't be long before you want to use modules written by other people.  These are packaged in what Rust calls "crates".  A crate is a library or executable and is the equivalent of the .NET assembly concept.  The closest equivalent in Java would be `.jar` files. They are also the unit of publishing packages like Nuget packages in .NET.  You can browse the published crates at [crates.io](https://crates.io/).  If you wanted to use the `primes` crate (to pick a random example).  Simply add to your `Cargo.toml` file the lines:

{% highlight toml %}
[dependencies]
primes = "0.2.0"
{% endhighlight %}

Then from the code you import the crate with:
{% highlight rust %}
extern crate primes;
{% endhighlight %}

This exposes the contents of the primes crate to your code in a module named `primes`.


Something important to know, that isn't stated in the [docs](https://doc.rust-lang.org/stable/book/crates-and-modules.html) right now, is that many crates have dashes in their names, but dashes are not allowed in module names.  When using one of these crate you use the name with dashes in the `Cargo.toml` file like `media-types = "0.1.0"`.  However, when referencing the crate from code, replace the dashes with underscores.  You can also use `as` to bring any crate in as a different module name.

{% highlight rust %}
extern crate media_types as mt;
{% endhighlight %}

Note that the dash in the crate name is replaced with an underscore to give a valid module name.  This also shows bringing the module name in as "mt".  Older versions of Rust handled this differently, so you may see some examples with the old syntax that uses double quotes.
</section>

<section markdown="1">
## Modules are more than Namespaces
Earlier, I mentioned that modules, unlike namespaces, can contain static variables and functions.  In this respect, they are like C# static classes or a Java class containing only static members.  All of these have a lot of similarities to an instance of the singleton pattern.  We have already seen an example of static functions in a module in the `sin` and `cos` functions. Now, let's looks at static variables.  They enable a module to have and keep state which can be private to the module.  Static variables are declared with the `static` keyword very much like `let`.

{% highlight rust %}
static NAME: &'static str = "Jeff";
{% endhighlight %}

Notice the special lifetime `'static` that all static variables have.  In addition to the special static lifetime, they have a number of restrictions that let bindings do not.  Their type must always be specified.  Accessing a mutable static is an unsafe operation because other threads could be modifying it at the same time.  Their value must be initialized to a constant expression.  Finally, they can't implement `Drop`.  These restrictions ensure thread safety and [avoids the complex issues that C# and Java have with static initializers](https://doc.rust-lang.org/complement-design-faq.html#there-is-no-life-before-or-after-main-(no-static-ctors/dtors)) and clean up of statics on program exit.
</section>

<section markdown="1">
## Paths
I've already shown several examples of the `use` keyword.  It is important to note that it brings into scope the final name in the path.  That is the name after the last pair of colons.  This differs from the C# `using` keyword which brings in all the contents of the namespace listed after using.  Given the ability to re-export names with public use statements it makes more sense for it to work that way.  Like with using statements, the module path of use is always relative to the root module.  However, when using paths other places in code they are relative to the current module.  There are a number of useful options available for the use statement.  I encourage you to read about them in the [docs for use](https://doc.rust-lang.org/stable/book/crates-and-modules.html#importing-modules-with-use).  In addition, you can use the `as` keyword with use in the same way as with extern crate.
</section>


**Edit 2015-08-30:** Corrected explanation of dashes in crate names to reflect current version.  Added "Paths" section based on feedback from the [Rust subreddit](https://www.reddit.com/r/rust).