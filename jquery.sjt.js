// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
jQuery.sjt = {
  cache : {},
  // target is an optional element; if provided, the result will be inserted into it
  // otherwise the result will simply be returned to the caller
  render : function(template, data, target){
   
    if(this.cache[template]){
      fn = this.cache[template] 
    }
    else{
     // Generate a reusable function that will serve as a template
     // generator (and which will be cached).
      fn = this.cache[template] = new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
        
        // Convert the template into pure JavaScript
        template
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
          + "');}return p.join('');");
    }
    
    // populate the optional element
    // or return the result
    if(target){
      target.html(fn(data));
      return false
    } else{
      return fn(data);
    }
  }
}
/*
    
    (function(){
      var cache = {};
      
      this.tmpl = function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
          cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :
          
          // Generate a reusable function that will serve as a template
          // generator (and which will be cached).
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
            
            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +
            
            // Convert the template into pure JavaScript
            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");
        
        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
      };
    })();*/