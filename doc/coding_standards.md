# Satoyma Javascript Coding Standards

This is a set of coding conventions and rules for use in JavaScript programming.
It is inspired by the Sun document Code Conventions for the Java Programming Language.
It is heavily modified of course because (JavaScript is not Java)[javascript not java].

The long-term value of software to an organization is in direct proportion to the quality of the codebase.
Over its lifetime, a program will be handled by many pairs of hands and eyes. If a program is able to clearly
communicate its structure and characteristics, it is less likely that it will break when modified in the never-too-distant future.

Code conventions can help in reducing the brittleness of programs.

All of our JavaScript code is sent directly to the public. It should always be of publication quality.

Neatness counts.

### JavaScript Files

JavaScript programs should be stored in and delivered as .js files.

JavaScript code should not be embedded in HTML files unless the code is specific to a single session.
Code in HTML adds significantly to pageweight with no opportunity for mitigation by caching and
compression.

__script__ tags should be placed as late in the body as possible.
This reduces the effects of delays imposed by script loading on other page components.
There is no need to use the language or type attributes. It is the server, not the
script tag, that determines the MIME type.

### Indentation

The unit of indentation is four spaces. Use of tabs should be avoided because
(as of this writing in the 21st Century) there still is not a standard for the
placement of tabstops. The use of spaces can produce a larger filesize, but the
size is not significant over local networks, and the difference is eliminated by minification.

### Line Length

Avoid lines longer than 80 characters. When a statement will not fit on a single line,
it may be necessary to break it. Place the break after an operator, ideally after a comma.
A break after an operator decreases the likelihood that a copy-paste error will be masked
by semicolon insertion. The next line should be indented 8 spaces.

###  Whitespace

Blank lines improve readability by setting off sections of code that are logically related.

Blank spaces should be used in the following circumstances:

* A keyword followed by ( (left parenthesis) should be separated by a space.

    while (true) {

* A blank space should not be used between a function value and its ( (left parenthesis). This helps to distinguish between keywords and function invocations.
* All binary operators except . (period) and ( (left parenthesis) and [ (left bracket) should be separated from their operands by a space.
* No space should separate a unary operator and its operand except when the operator is a word such as typeof.
* Each __;__ (semicolon) in the control part of a for statement should be followed with a space.
* Whitespace should follow every __,__ (comma).

###  === and !== Operators.

Use the === and !== operators. The == and != operators do type coercion and should not be used.

[javascript not java]: http://javascript.crockford.com/javascript.html
