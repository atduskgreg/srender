<h1>Srender to Simple Javascript Templating...</h1>


![GI Joe Srendering](http://farm1.static.flickr.com/61/199570946_385bf69e9f.jpg)
photo by <a href="http://flickr.com/photos/kiddharma/199570946/">kiddharma</a>

This is a jQuery plugin for javascript templating adapted from <a href="http://ejohn.org/blog/javascript-micro-templating/">John Resig's classic templating blog post</a>. The code works mostly like Resig describes in that post with a few tiny changes. The usage is as follows:

    var data = {foo : "bar"}
    var template = "my data: <%= data.foo %>"
    console.log($.srender(template, data));

If you pass it a jQuerified element as the optional third argument, it will populate that element with the results thusly:

    var data = {foo : "bar"}
    var template = "my data: <%= data.foo %>"
    $.srender(template, data, $("h1"));

You can also iterate through objects, do other command structures, and basically just run real javascript:

    var data = [1,2,3,4]
    var template = (<r><![CDATA[
    <% for ( var i = 0; i < data.length; i++ ) { %>
      <% if(data[i] != 2 ){ %>
        <li><%= data[i] %></li>
        <% } %>
    <% } %>
    ]]></r>).toString();
    console.log($.srender(template, data));


E4X is a nice choice to give a heredoc-style syntax to the templates. For more on E4X, check out <a href="http://tinyurl.com/ca4l7m">this excellent resource</a>.

Or, if you're a sissy who runs a browser that can't handle E4X, the '\' escaped new line syntax isn't too bad either:

    var template = '<% for ( var i = 0; i < data.length; i++ ) { %>\
                      <% if(data[i] != 2 ){ %>\
                        <li><%= data[i] %></li>\
                        <% } %>\
                    <% } %>'