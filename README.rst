============================
jQuery Fluid Textarea Plugin
============================

About
=====

This simple jquery plugin gives arbitrary textareas a fluid height. Every
textarea this plugin is applied to will change its height according to the
amount of text in it.

The width of the area is not changed under any circumstances. The height of the
textbox defined at invocation of this plugin is used as minimum height for
expansion. Therefore the textbox will never be smaller than its original size.


Usage
=====

Simply apply the plugin function to an arbitrary amount of selected textareas::

    $("textarea").fluidtextarea();


License
=======

This plugin is licensed under the `MIT License`__::

    Copyright (c) 2011 Jakob Westhoff

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.


__ http://www.opensource.org/licenses/mit-license.php
