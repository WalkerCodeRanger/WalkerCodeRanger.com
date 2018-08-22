---
layout: post
tags: [".NET", "C#", "Programming Languages"]
author: "Jeff Walker"
title: "Unleashing C# Generic Constraints with Extension Methods"
guid: 6d6a1e2b-ec64-4b1b-b9e7-d287dbe651ca
final: true
---

A number of of times in my career, I have found my work frustrated by the sometimes arbitrary limitations placed on generics in C#.  The addition of generic covariance and contravariance was a big step forward in that regard. Still, there remain many frustrating limitations.  The fact that you can't use `Enum` or `Delegate` as a generic constraint can be worked around using packages like [ExtraConstrains.Fody](https://github.com/Fody/ExtraConstraints) or [UnconstrainedMelody](https://github.com/jskeet/unconstrained-melody).  However, extension methods also provide a little known way of working around some limitations.  It is so little known that I couldn't find a blog post that discussed the technique while working on this one (though I think I recall reading one once).  Indeed, these over 2 year old [stockoverflow.com](stackoverflow.com) questions "[Is it possible to constrain a C# generic method type parameter as 'assignable from' the containing class' type parameter?](http://stackoverflow.com/q/11255558/268898)" and "[Constrain type parameter to a base type](http://stackoverflow.com/q/18596387/268898)" had no answers showing this approach until I [answered](http://stackoverflow.com/a/31049732/268898) [them](http://stackoverflow.com/a/31050333/268898) while writing this.

<section markdown="1">
## An Example
Imagine we create a generic pair class that we will use any time we want to deal with a pair of values that may or may not be of the same type.

{% highlight csharp %}
public class Pair<TFirst, TSecond>
{
	public TFirst First;
	public TSecond Second;

	public Pair(TFirst first, TSecond second)
	{
		First = first;
		Second = second;
	}
}
{% endhighlight %}

Then we might find that we sometimes want to know if the two values are in order.  So we imagine we could write a method to tell us if that is the case.

{% highlight csharp %}
public bool InOrder()
	where TFirst : IComparable<TSecond> // Doesn't compile
{
	return First.CompareTo(Second) <= 0;
}
{% endhighlight %}

We'll quickly realize that this code doesn't compile at all, because we aren't allowed to add generic constraints to a non-generic method.

Another time, we think it would be useful to be able to apply a function to both values. So we attempt to write the apply method. We will need to constrain the type of the function to accept both the first and second value.

{% highlight csharp %}
public Pair<TResult, TResult> Apply<TValue, TResult>(Func<TValue, TResult> func)
	where TFirst : TValue // Doesn't compile
	where TSecond : TValue // Doesn't compile
{
	return new Pair<TResult, TResult>(func(First), func(Second));
}
{% endhighlight %}

But again, we are thwarted by the compiler.  In both cases, the underlying issue is that you can't further constrain the type parameter of a class from a method.

Lastly, we might imagine it would be nice to have a method that swapped the first and second value. Of course, that only makes sense when they have the same type.  It is very difficult to envision how one might write this method as there is no generic constraint for type equality in C#.
</section>

<section markdown="1">
## Extension Methods to the Rescue

In all the above situations, an extension method can easily be used to work around the limitations of generic constraints.  That looks like:

{% highlight csharp %}
public static class PairExtensions
{
	public static bool InOrder<TFirst, TSecond>(this Pair<TFirst, TSecond> pair)
		where TFirst : IComparable<TSecond>
	{
		return pair.First.CompareTo(pair.Second) <= 0;
	}

	public static Pair<TResult, TResult> Apply<TFirst, TSecond, TValue, TResult>
			(this Pair<TFirst, TSecond> pair, Func<TValue, TResult> func)
		where TFirst : TValue
		where TSecond : TValue
	{
		return new Pair<TResult, TResult>(func(pair.First), func(pair.Second));
	}

	public static void Swap<T>(this Pair<T, T> pair)
	{
		var temp = pair.First;
		pair.First = pair.Second;
		pair.Second = temp;
	}
}
{% endhighlight %}

Notice in the swap method how we are able to specify the first and second types as equal by simply using the same type parameter for both.
</section>

<section markdown="1">
## Not Perfect
This approach sometimes leads to situations where the type parameters can't be inferred and it is necessary to specify duplicate type parameters since there is no way to specify one type and have another inferred.  It also doesn't address other limitations of generic constraints, like the fact that you can't specify a constructor constraint with parameters.  Still, I hope this will be a useful trick you can add to your toolbox.
</section>
