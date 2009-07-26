=== Search engine keywords highlighter  ===
Contributors: emptyhua 
Donate link: http://bluehua.org
Tags: highlighter,google,baidu,keywords 
Requires at least: 2.0.0
Tested up to: 2.8.2
Stable tag: 0.1 

highlight the keywords if visitor is from search engine

== Description ==

this highlighter has the following features:

*   works in frontend by using javascript ,so it has almost no pressure on the server side
*   support cache plugin
*   support UTF-8,GBK and GB2312 encoding search engine (eg:google.com,baidu.com)


== Installation ==

1. Extract plugin to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress

== Frequently Asked Questions ==

= How to add search engine support =

u can edit the highlight.js,find the function "getKeywords",then add it

eg:sites.push(['otherengine.com','query_param']);

== Screenshots ==

1.  `/tags/0.1/screenshot-1.png` 

== Changelog ==

= 0.1 =
* the first version 

