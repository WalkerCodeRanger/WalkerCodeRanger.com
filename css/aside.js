$(function() {
	$('.with-aside').each(function(i, e) {
		var withAside = $(e);
		var aside = withAside.find('aside');
		aside.detach();
		aside.prependTo(withAside);
		aside.addClass('floating');
		withAside.addClass('floating');
	});
});