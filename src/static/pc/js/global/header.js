define(['text!headerhtml', 'jquery','mscore'], function (headerhtml, $,mscore) {
	$('#headerPanel').html(headerhtml);
	mscore.initHeaderEvents();
})