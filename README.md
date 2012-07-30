Webmusic
========
Webmusic is a HTML5 web application that can play music files.  
The app relies on a SQL database which can be generated by [webmusicscanner](https://github.com/magne4000/webmusicscanner).

Dependencies
------------
php5-curl

Installation
------------
Simply clone the project in your favorite webserver document root.  
e.g. (Apache)

    cd /var/www && git clone https://github.com/magne4000/webmusic

Configuration
-------------
In order to configure the app, you need to have a file called webmusic.conf in the app directory.  
A sample file called webmusic.conf.default is available, so we base webmusic.conf on it

    cp app/webmusic.conf.default app/webmusic.conf

The **db** section allows you to set your BDD credentials.  
The **debug** section allows you to switch ON/OFF debugging.  
The **cache** section can be tweaked if your database as a huge amount of artists.  
The **soundmanager** section must logically not be changed, but if you're having troubles playing your music, you can try to change those [soundmanager](http://www.schillmania.com/projects/soundmanager2/doc/) settings 

### Cache
To init the cache files, the folder cache must be writable (or owned) by the web server.  
e.g. (Apache)

    chown www-data:www-data cache

And to generate the cache, simply access this URL on your server : http://YOURSERVER/webmusic/admin/admin.php?regenerate=1

Plugins
-------
Each plugin must be stored into a folder under the **plugins** directory.  
If this folder contains a **js** directory, all .js files beneath it will be automatically loaded just before init.js.  
If it contains a **css** folder, all .css files beneath it will be loaded after all other non-plugin css files.

### Client side plugin

All plugins are handled by jQuery events, for an example, see the **notifications** plugin. In order to see all events in detail, refer to [wiki](https://github.com/magne4000/webmusic/wiki).

### Server side plugin

If the plugin folder contains an __init.php__ file, it will be loaded on the server side.
_Not implemented yet._

License
-------
MIT License

Copyright © 2011 Joël Charles

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.