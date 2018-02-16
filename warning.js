var warningjs = new Object();
warningjs.prev_onload = null;

warningjs.css = '\
.warningjs_container { background: #f5aca6; border-width: 0px 4px 4px 4px; border-style: solid; border-color: #dd2222; color: #222222; position: absolute; top: 0; left: 8px; right: 8px; max-width: 1000px; margin: auto; padding: 16px; font: 300 16px/1.5 Lato, "Helvetica Neue", Helvetica, arial, sans-serif; z-index: 4000; }\
.warningjs_container * { margin: 0; padding: 0; font-weight: 200; }\
.warningjs_hidden { display: none; }\
.warningjs_container:hover .warningjs_hidden { display: block; }\
.warningjs_wrapper { position: relative; }\
.warningjs_wrapper hr { border: 0; height: 1px; background: #dd2222; margin: 16px 32px; background-image: linear-gradient(to right, #f5aca6, #dd2222, #f5aca6); }\
.warningjs_wrapper a { color: #003388; text-decoration: none; }\
.warningjs_wrapper h1 { font-size: 1.9em; }\
.warningjs_wrapper h2 { font-size: 1.5em; }\
.warningjs_wrapper small { font-size: 0.8em; }\
.warningjs_center { text-align: center; }\
.warningjs_topspace { margin-top: 8px; }\
.warningjs_close { float: right; transform: rotate(45deg); }\
.warningjs_close a { text-decoration: none; color: #222222; font-weight: bold; padding: 2px; font-size: 1.4em; }\
.warningjs_li { margin-left: 8px; }\
.warningjs_li:before { content: "» "; }\
';

warningjs.content = [
   ['small', "(while widely deployed it raises a exquisite assortment of security and privacy issues. Most of the sites don't even work anymore without JavaScript :/ )", 'warningjs_center'],
   'hr',
   ['h2', "We are psyched to tell you, NOT on this site, here you don't need no stinking JavaScript!!!!1! *", ''],
   ['p', "You can access all functions and content without any JavaScript, you can use noscript, and be sure, this is a site that respects its visitors. **", ''],
   'hr',
   ['h2', "Choose your next action"],
   ['div', 'Go get <a href="https://noscript.net/">noscript</a>.', 'warningjs_li'],
   ['div', 'I know how to <a href="http://www.alanwood.net/demos/enabling-javascript.html">disable js</a> and reload this page.', 'warningjs_li'],
   ['div', 'I\'m a geek I love js!!!! <a href="https://www.ctrlc.hu/~stef/blog/posts/gtfoomb.html">Why do you hate "freedom"?</a>', 'warningjs_li'],
   ['div', "Great initiative, let me deploy <a href='warning.js'>warning.js</a> on my own sites!", 'warningjs_li'],
   ['div', 'Hmmm, I thought I had noscript, why the hell doesn\'t it <a href="https://noscript.net/faq">work</a>?', 'warningjs_li'],
   ['div', '<a href="#" onclick="warningjs_destroy();">Close</a> and continue using JavaScript.', 'warningjs_li'],
   ['p', "with regards,", 'warningjs_topspace'],
   ['p', "your webmasters", ''],
   'hr',
   ['small', "* Except for this fine popup window of course.", ''],
   ['small', "** In any case you can also not care and continue using JavaScript, but be always assured, if you'd change your mind about this, we'd be delighted to treat you with utmost respect.", '']
];

warningjs.createElement = function(type, text, class_name) {
   var element = document.createElement(type);
   if(text) element.innerHTML = text;
   if(class_name) element.className = class_name;
   for(i = 3; i < arguments.length; i++) {
      element.setAttribute(arguments[i][0], arguments[i][1]);
   }
   return element;
}

warningjs.destroy = function() {
   var warningjs_dom = document.getElementsByClassName('warningjs_container')[0];
   warningjs_dom.parentNode.removeChild(warningjs_dom);
   var now = new Date();
   var time = now.getTime();
   var expireTime = time + 24 * 60 * 60 * 1000;
   now.setTime(expireTime);
   document.cookie = 'warningjs=false;expires='+now.toGMTString()+';path=/';
   return false;
}

warningjs.init = function() {
   if(warningjs.prev_onload) {
      warningjs.prev_onload();
   }
   if(document.cookie.search("warningjs=false") != -1 ) {
      return;
   }
   var style = document.createElement('style');

   if (style.styleSheet) style.styleSheet.cssText=warningjs.css;
   else style.appendChild(document.createTextNode(warningjs.css));
   document.getElementsByTagName('head')[0].appendChild(style);

   var warningjs_div = warningjs.createElement('div', '', 'warningjs_container');
   var warningjs_wrapper = warningjs.createElement('div', '', 'warningjs_wrapper');
   warningjs_div.appendChild(warningjs_wrapper);
   warningjs_wrapper.appendChild(warningjs.createElement('div', '<a href="#" onclick="warningjs.destroy()" alt="close">+</a>', 'warningjs_close'));
   warningjs_wrapper.appendChild(warningjs.createElement('h1', 'WARNING! Your are using javascript! WARNING!', 'warningjs_center'));

   for(i in warningjs.content) {
      var c = warningjs.content[i];
      if(typeof c == "string") {
         var e = document.createElement(c);
         e.className = 'warningjs_hidden'
         warningjs_wrapper.appendChild(e);
      } else {
         warningjs_wrapper.appendChild(warningjs.createElement(c[0], c[1], 'warningjs_hidden ' + c[2]));
      }
   }
   document.body.appendChild(warningjs_div);
}

if(window.onload) {
   warningjs.prev_onload = window.onload;
}
window.onload = warningjs.init;
