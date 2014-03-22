---
layout: post
tags: ["Ember.js", ".NET", Cassette]
author: "Jeff Walker"
title: "Ember.js on Cassette: Embedding Templates"
guid: aab2932d-a540-461c-a953-f7ccbb4fe738
modified: 2014-03-22 10:23 -05:00
---

<div class="with-aside aside-right aside-down-2" markdown="1">
I'm starting a new web application project, and I've decided to use [Ember.js](http://emberjs.com).  That will enable me to provide users a slick single-page app experience.  Since I am a .NET web developer by training, I plan to use C# and ASP.NET Web API as my server technologies. I could use tools like [Lineman.js](http://linemanjs.com) or [Grunt](http://gruntjs.com) to manage and package my client-side code.  Instead, I'd like to use the Visual Studio toolchain, because it provides a lot of great tools for web application development.  Since I already know Visual Studio, there will be almost no learning curve for me.  I'm not trying to argue this is the right choice.  I'm just trying to share a little about what it takes to make it work with Ember.js.  Early on, I realized that I would want to bundle and minify all my scripts and templates.  I've chosen the [Cassette](http://getcassette.net) library for this which provides "asset bundling for .NET web apps".  Here is how I made it work with Ember.js, but first, why did I choose Cassette?

<aside markdown="1" class="right">
###Single-page App (SPA)
Can I just say how much I hate the term single-page application (SPA)?  Technically, it may be true that in an SPA only a single web page, with its scripts, css and images, is actually ever loaded. However, from a users perspective, a good SPA will appear to contain multiple pages, because the content of the page will change radically, and the url will completely change.  To a user, radically different content that is tied to a different url is a *page*.  In fact, I would say by anyone's definition, that is a web page.  If I can bookmark the url and return to see the same content, how is that not a page?  There has been [talk about the distinction between pages and views](http://www.johnpapa.net/pageinspa), but I just can't buy that.  The term SPA is incredibly misleading.  Words matter; they lead us into certain mental models of what is going on.  The wrong words can give the wrong impression.  We really need a better term.  The term [*rich internet application*](http://en.wikipedia.org/wiki/Rich_Internet_application) (RIA) is close, but it's really more inclusive than single-page application.  I don't know what term to use and welcome any input on a better one.
</aside>
</div>

<section markdown="1">
##Why not ASP.NET Web Optimization
Ever since Microsoft released the [ASP.NET Web Optimization](http://aspnetoptimization.codeplex.com) framework, now available as a [NuGet package](https://www.nuget.org/packages/microsoft.aspnet.web.optimization), it has been the default choice on the .NET platform for bundling and minification of scripts and css. Indeed, I initially started with it. However, I quickly ran into a number of issues with it, all of which were made more challenging by the lack of documentation.

It provides support only for minification of *.js and *.css files by default and no support for languages like [Less](http://lesscss.org), [Sass](http://sass-lang.com), [TypeScript](http://www.typescriptlang.org) or [CoffeeScript](http://coffeescript.org).  I'll be using Less, and possibly CoffeeScript.  It seems the encouraged workflow for such languages in Visual Studio is to use the [Web Essentials](http://vswebessentials.com) extension to compile them.  However, with that, the compiled js or css files are included in the project and need to be committed to source control.  I have found that to be problematic when doing merges in a DVCS.  Also, it just seems like the wrong thing to do.  Like committing the compiled assemblies of my .NET code.  Even using third party or custom built extensions, it generally isn't possible to mix languages in a single bundle.  For example, I might want to combine some JavaScript libraries into a bundle containing CoffeeScripts I have written.

More serious than that, ASP.NET Web Optimization provides no support for compiling or embedding templates.  In the official [EmberJS template](http://www.asp.net/single-page-application/overview/templates/emberjs-template) from Microsoft they use a beta version [third party extension](http://www.nuget.org/packages/csharp-ember-handlebars-compiler) to provide template compilation for Ember.js and provide a 117 line class for embedding templates outside the the web optimization framework.  The third party library appears to be abandoned, with 8 months since the last commit and still in beta as of March, 2014.  Even with all that, the EmberJS template's solution doesn't switch between embedding and compiling based on whether the web optimization library is in debug mode, leading to possible problems.
</section>

<section markdown="1">
##Introducing Cassette
The Cassette library preceded Microsoft's ASP.NET Web Optimization library and is arguably the primary alternative to it.  If your familiar with how Web Optimization approaches bundling it may take a while to become accustomed to the Cassette approach.  They use the term "bundle" somewhat differently, which is confusing when you are first learning.  I recommend you read the "[Getting Started](http://getcassette.net/documentation/v1/getting-started)" and "[Assets and Bundles](http://getcassette.net/documentation/v1/getting-started/assets-and-bundles)" sections of the [Cassette v1 docs](http://getcassette.net/documentation/v1/) before switching and reading the the [v2 docs](http://getcassette.net/documentation/v2/).  Those sections of the v1 docs explain basic concepts not explained in the v2 docs.  Until I read them, Cassette wasn't making any sense to me.

The main difference between the approaches is around what a bundle is. In the Web Optimization library, a bundle is a group of files that will be minified and combined into a single file. Referencing that bundle is including a reference to the combined file.  Whereas, in Cassette a bundle is more like a group of files that work as a single dependency.  Meaning that you would never want one file out of the bundle separate from another.  Referencing bundles is then stating what the page's dependencies are.  The bundles are then minified and combined into three separate files for css, scripts and templates.  For templates, Cassette supports the idea of embedding the templates rather than loading them from a separate file.

At the top of your cshtml page you reference any individual assets or bundles the page depends on:

{% highlight csharp %}
@{
    Bundles.Reference("Scripts/jquery.js");
    Bundles.Reference("scripts/app"); // the main application bundle
    Bundles.Reference("Scripts/page.js");
    Bundles.Reference("Styles/page.css");
}
{% endhighlight %}

Then in the page body, you indicate where the html to include scripts, templates and style sheets should be rendered. This will then group the dependencies by type and, depending  on whether Cassette is in debug or production mode, output either debug friendly assets or minified, compressed, cached, versioned assets.

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
    <title>Web App</title>
    @Bundles.RenderStylesheets()
</head>
<body>
    ...
    @Bundles.RenderScripts()
    @Bundles.RenderTemplates()
</body>
</html>
{% endhighlight %}

Cassette is a powerful library with many more features and options.  Be sure to check out the [documentation](http://getcassette.net/documentation/v2/) for the details.  Additionally, the author of Cassette has created NuGet packages for drop in support for Less, Sass, CoffeeScript, TypeScript and more. One of those [NuGet packages](http://www.nuget.org/packages/Cassette.Hogan/) is for pre-compiling [Mustache](http://mustache.github.io/) Templates using [Hogan.js](http://twitter.github.io/hogan.js/).  Unfortunately, this doesn't work for [Ember.js](http://emberjs.com), because it needs its own template compiler due to the `get` and `set` methods on Ember models.  Never the less, we'll see that all is not lost. 
</section>

<section markdown="1">
##Configuring and Referencing an HtmlTemplateBundle
Setting up a bundle in Cassette for all your templates is very easy. Don't install the Cassette.Hogan NuGet package since it doesn't work with Ember.js.  I choose to put all my templates in the `app/templates` folder following the example in the [EmberJS template](http://www.asp.net/single-page-application/overview/templates/emberjs-template) from Microsoft.  The template uses the extension `hbs` for Handlebars templates, however I choose to use the also common extension `handlebars`, because it was more explicit.  Since all the templates are in one directory, creating a bundle was an easy addition to my Cassette bundle configuration.

{% highlight csharp %}
public class CassetteBundleConfiguration : IConfiguration<BundleCollection>
{
    public void Configure(BundleCollection bundles)
    {
        // Other configuration ...

        bundles.Add<HtmlTemplateBundle>("app/templates", new FileSearch()
        {
            Pattern = "*.handlebars",
            SearchOption = SearchOption.AllDirectories,
        });
    }
}
{% endhighlight %}

To reference the templates from my application page only required adding `Bundles.Reference("app/templates");` to my bundle references.  The templates were then automatically embedded in the page inside script blocks in place of the `@Bundles.RenderTemplates()` call right before the close body tag.
</section>

<section markdown="1">
##Giving Templates a "data-template-name"
There were some problems with the embedded templates at this point.  The script blocks were being generated with an `id` attribute based on the path of the template file and the type attribute was set to "text/html" instead of "text/x-handlebars".  While there is some confusion over this, I believe that the `data-template-name` attribute is the preferred way of identifying your ember templates, rather than the `id` attribute.  The reason is that nested route templates have names separated with '/', but it is [not valid to have the '/' character in an html id](http://stackoverflow.com/questions/70579/what-are-valid-values-for-the-id-attribute-in-html).  Fortunatly, Cassette is based around a very flexible [pipeline model](http://getcassette.net/documentation/v2/bundle-pipelines), making it easy to customize.  After reading some of the documentation, poking around the source and reading some some code from the Cassette.Hogan package, I came up with a simple solution.

Cassette allows the bundle pipeline for any bundle type to be easily modified by implementing the `IBundlePipelineModifier<T> where T : Bundle` interface.  All bundle pipeline modifiers are picked up automatically.  Fixing the issues was almost as simple as setting the content type of the html template pipeline and swapping out the implementation of how templates were wrapped in a script block.

{% highlight csharp %}
public class SetupHandlebarsPipeline : IBundlePipelineModifier<HtmlTemplateBundle>
{
    public IBundlePipeline<HtmlTemplateBundle> Modify(
            IBundlePipeline<HtmlTemplateBundle> pipeline)
    {
        // Set the content type
        var index = pipeline.IndexOf<ParseHtmlTemplateReferences>();
        pipeline.Insert(index, new AssignContentType("text/x-handlebars"));

        // Replace how the scripts are wrapped
        index = pipeline.IndexOf<WrapHtmlTemplatesInScriptElements>();
        pipeline.RemoveAt(index);
        pipeline.Insert(index,
            new WrapTemplatesInEmberScriptElements(new HtmlTemplateIdBuilder()));

        return pipeline;
    }
}
{% endhighlight %}

The new `WrapTemplatesInEmberScriptElements` class is basically the same as the old `WrapHtmlTemplatesInScriptElements` with the `id=` replaced by `data-template-name=`.

{% highlight csharp %}
public class WrapTemplatesInEmberScriptElements : IBundleProcessor<HtmlTemplateBundle>
{
    private readonly IHtmlTemplateIdStrategy idStrategy;

    public WrapTemplatesInEmberScriptElements(IHtmlTemplateIdStrategy idStrategy)
    {
        this.idStrategy = idStrategy;
    }

    public void Process(HtmlTemplateBundle bundle)
    {
        foreach(var asset in bundle.Assets)
        {
            asset.AddAssetTransformer(new WrapTemplateInEmberScriptElement(bundle, idStrategy));
        }
    }
}

public class WrapTemplateInEmberScriptElement : IAssetTransformer
{
    private readonly HtmlTemplateBundle bundle;
    private readonly IHtmlTemplateIdStrategy idStrategy;

    public WrapTemplateInEmberScriptElement(
            HtmlTemplateBundle bundle,
            IHtmlTemplateIdStrategy idStrategy)
    {
        this.bundle = bundle;
        this.idStrategy = idStrategy;
    }

    public Func<Stream> Transform(Func<Stream> openSourceStream, IAsset asset)
    {
        return () =>
        {
            var template = openSourceStream().ReadToEnd();
            var scriptElement = String.Format(
                "<script type=\"{0}\" data-template-name=\"{1}\">\n{2}\n</script>",
                bundle.ContentType,
                idStrategy.HtmlTemplateId(bundle, asset),
                template
            );
            return scriptElement.AsStream();
        };
    }
}
{% endhighlight %}
</section>

<section markdown="1">
##An Exception

If you try the above code with version 2.4.1 or prior of Cassette, you'll get an exception when it's not in debug mode. I didn't notice this issue until a week after writing the code above when I deployed to the test environment.  The switch between production and debug mode can be confusing in Cassette, because it isn't your first thought when something works on the developers machine but not the deployment environment.  It took me at least an hour to track down the problem.  In production mode the exception you get is `KeyNotFoundException` from deep inside Cassette around bundle cache code.  Turns out that setting the content type to `"text/x-handlebars"` causes Cassette to not know what extension to give the cache file.  That seems to be poor design choice to me, but essentially the fix is that `"text/x-handlebars"` needs to be added to a list of known content types.  I have submitted a [pull request](https://github.com/andrewdavey/cassette/pull/445) to do this, that will hopefully be accepted soon, so this won't be a problem in future versions.  Until then, you can work around this by adding the following hack to the beginning of your `CassetteBundleConfiguration.Configure()` method.

{% highlight csharp %}
// Hack so we can use type="text/x-handlebars" in release mode
var bundleType = typeof(Bundle);
var field = bundleType.GetField("FileExtensionsByContentType",
                                 BindingFlags.Static | BindingFlags.NonPublic);
var fileExtensionsByContentType = (IDictionary<string, string>)field.GetValue(null);
// Sometimes the config is run again and it is already there
if(!fileExtensionsByContentType.ContainsKey("text/x-handlebars"))
	fileExtensionsByContentType.Add("text/x-handlebars", "htm");
{% endhighlight %}

With that, my Ember.js templates where embedded correctly into the page and developers could begin work with a clean separation of the templates into individual files.  Obviously, before production release I would like to be able to enable compiled templates when Cassette is not in debug mode, but that challenge can wait for another day.
</section>

*[SPA]: Single-Page Application