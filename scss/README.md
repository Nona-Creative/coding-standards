# Nona CSS / Sass Styleguide

A mostly reasonable approach to CSS and Sass, forked and adapted from the airBnB standard found here: https://github.com/airbnb/css


## Table of Contents

<!-- MarkdownTOC depth=3 autolink=true bracket=round style=ordered -->

1. [Terminology](#terminology)
  1. [Rule declaration](#rule-declaration)
  2. [Selectors](#selectors)
  3. [Properties](#properties)
2. [CSS](#css)
  1. [Formatting](#formatting)
  2. [Comments](#comments)
  3. [ID Selectors](#id-selectors)
  4. [JavaScript Hooks](#javascript-hooks)
  5. [Border](#border)
  6. [Shorthand Selectors](#shorthand-selectors)
  7. [!important](#important)
3. [Sass / SCSS](#sass--scss)
  1. [Syntax](#syntax)
  2. [Ordering of Property Declarations](#ordering-of-property-declarations)
  3. [Variables](#variables)
  4. [Mixins](#mixins)
  5. [Extend Directive](#extend-directive)
  6. [Nested Selectors](#nested-selectors)
  7. [A Modular Approach to SCSS](#a-modular-approach-to-scss)
  8. [Use Parent classes to create Modules, then extend and modify](#use-parent-classes-to-create-modules-then-extend-and-modify)
  9. [Mobile First](#mobile-first)
4. [Typography](#typography)
  1. [Units](#units)
  2. [Font Replacement](#font-replacement)
5. [Your Shameful Styles](#your-shameful-styles)
6. [License](#license)

<!-- /MarkdownTOC -->


## Terminology


### Rule declaration
A “rule declaration” is the name given to a selector (or a group of selectors) with an accompanying group of properties. Here's an example:

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```


### Selectors

In a rule declaration, “selectors” are the bits that determine which elements in the DOM tree will be styled by the defined properties. Selectors can match HTML elements, as well as an element's class, ID, or any of its attributes. Here are some examples of selectors:

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```


### Properties

Finally, properties are what give the selected elements of a rule declaration their style. Properties are key-value pairs, and a rule declaration can contain one or more property declarations. Property declarations look like this:

```css
/* some selector */ {
  background: #f1f1f1;
  color: #333;
}
```


## CSS


### Formatting

* Use soft tabs (2 spaces) for indentation
* Prefer dashes in class names.
* Do not use ID selectors
* When using multiple selectors in a rule declaration, give each selector its own line.
* Put a space before the opening brace `{` in rule declarations
* In properties, put a space after, but not before, the `:` character.
* Put closing braces `}` of rule declarations on a new line
* Put blank lines between rule declarations

**Bad**

```css
.avatar{
    border-radius:50%;
    border:2px solid white; }
.no, .nope, .not_good {
    // ...
}
#lol-no {
  // ...
}
```

**Good**

```css
.avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.selector,
.per-line {
  // ...
}
```


### Comments

Sass supports standard multiline CSS comments with `/* */`, as well as single-line comments with `//`. It is important to note that the multiline comments are preserved in the CSS output (where possible), while the single-line comments are removed.

* Prefer line comments (`//` in Sass-land) to block comments.
* Prefer comments on their own line. Avoid end-of-line comments.
* Write detailed comments for code that isn't self-documenting:
  - Uses of z-index
  - Compatibility or browser-specific hacks


### ID Selectors

While it is possible to select elements by ID in CSS, it should generally be considered an anti-pattern. ID selectors introduce an unnecessarily high level of [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) to your rule declarations, and they are not reusable.

For more on this subject, read [CSS Wizardry's article](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/) on dealing with specificity.


### JavaScript Hooks

Avoid binding to the same class in both your CSS and JavaScript. Conflating the two often leads to, at a minimum, time wasted during refactoring when a developer must cross-reference each class they are changing, and at its worst, developers being afraid to make changes for fear of breaking functionality.

We recommend creating JavaScript-specific classes to bind to, prefixed with `.js-`:

```HTML
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```


### Border

Use `0` instead of `none` to specify that a style has no border.

**Bad**

```css
.foo {
  border: none;
}
```

**Good**

```css
.foo {
  border: 0;
}
```

### Shorthand Selectors

Use shorthand when specifying multiple values. Remember longhand can be shorter for single values.

**Bad**

```css
.foo {
  border-top: 5px;
  border-right: 3px;
  border-bottom: 5px;
  border-right: 3px;
}
```

**Good**

```css
.foo {
  border: 5px 3px;
}
```


### !important

Never use `!important` reactively to get yourself out of nasty specificity situations as it overrides just about everything. This messes with the "cascading" of styles that is at the core of CSS. Rework your CSS and combat these issues by refactoring your selectors. Keeping selectors short and avoiding IDs will help you out here massively.


## Sass / SCSS


### Syntax

* Use the `.scss` syntax, never the original `.sass` syntax
* Order your regular CSS and `@include` declarations logically (see below)


### Ordering of Property Declarations

1. Property declarations

    List all standard property declarations, anything that isn't an `@include` or a nested selector.

    ```SCSS
    .btn-green {
      background: green;
      font-weight: bold;
      // ...
    }
    ```

2. `@include` declarations

    Grouping `@include`s at the end makes it easier to read the entire selector.

    ```SCSS
    .btn-green {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }
    ```

3. Nested selectors

    Nested selectors, _if necessary_, go last, and nothing goes after them. Add whitespace between your rule declarations and nested selectors, as well as between adjacent nested selectors. Apply the same guidelines as above to your nested selectors.

    ```SCSS
    .btn {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);

      .icon {
        margin-right: 10px;
      }
    }
    ```


### Variables

Prefer dash-cased variable names (e.g. `$my-variable`) over camelCased or snake_cased variable names. It is acceptable to prefix variable names that are intended to be used only within the same file with an underscore (e.g. `$_my-variable`).


### Mixins

Mixins (`@include`) should be used to DRY up your code, add clarity, or abstract complexity--in much the same way as well-named functions. Mixins that accept no arguments can be useful for this, but note that if you are not compressing your payload (e.g. gzip), this may contribute to unnecessary code duplication in the resulting styles.


### Extend Directive

`@extend` should be avoided because it has unintuitive and potentially dangerous behaviour, especially when used with nested selectors. Even extending top-level placeholder selectors can cause problems if the order of selectors ends up changing later (e.g. if they are in other files and the order the files are loaded shifts). Gzipping should handle most of the savings you would have gained by using `@extend`, and you can DRY up your stylesheets nicely with mixins.


### Nested Selectors

**Do not nest selectors more than three levels deep!**

```SCSS
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```

When selectors become this long, you're likely writing CSS that is:

* Strongly coupled to the HTML (fragile) *—OR—*
* Overly specific (powerful) *—OR—*
* Not reusable


Again: **never nest ID selectors!**

If you must use an ID selector in the first place (and you should really try not to), they should never be nested. If you find yourself doing this, you need to revisit your markup, or figure out why such strong specificity is needed. If you are writing well formed HTML and CSS, you should **never** need to do this.


### A Modular Approach to SCSS

While there are many approaches such as OOCSS, BEM and SMACCS, many of these are overly prescriptive, and can add excessive clutter, as well as quickly increasing specificity.  We should always aim for

* Low Specificity
* Uncluttered HTML
* Reusability
* Mobile First Structures
* Outside-in Modularity


### Use Parent classes to create Modules, then extend and modify

These goals can be achieved quite easily by following a simple model, that complies with the rest of this style guide.

```SCSS
.module {
  ul {}
  li {}
  a {}
}
```

We of course have more specific elements amongst multiple tags:
```SCSS
.module {
  ul {}
  li {}
  a {
    &.special-one {}
  }
}
```

These should rely on sensible defaults, ideally set at a tag level.  By working from the most general styles, to the most specific, we're able to lighten our CSS and leverage 'the cascade'.  By modularising with parent classes, keep our html clean, our selectors light (low specificity) and these 'modules' re-usable.

**Example**

```HTML
<article class="post">

  <h1>Adorable 2BR in the sunny Mission</h1>

  <div>
    <p class="lead">Vestibulum id ligula porta felis euismod semper.</p>
    <p>Vestibulum id ligula porta felis euismod semper.</p>
    <p>Vestibulum id ligula porta felis euismod semper.</p>
  </div>

</article>
```

We might style it as follows:

```SCSS
.post {
  h1 {}
  div {}
  p {
    // ... Default Styles
    &.lead {}
  }
}
```


### Mobile First

Our SCSS should always follow a mobile first approach.  The only trick to this is planning and approach, if you're not starting with the mobile UI, you're doing it wrong.  Heres a very simple example:

```SCSS
.thing  {
  // ... Some properties

  @media screen and (min-width: 320px) {
    // ... Stuff for a bigger screen
  }
}
```


## Typography

Well structured typography is the foundation of a sound layout, and as such, great care should be taken in managing the typographic rules of any high quality design. Secondly, by relating all the other dimensions of the layout to your typography we can achieve both a natural pleasing visual harmony and extreme responsiveness.


### Units

It is key to use either `REM` or `EM` units throughout your SCSS, relating all dimensions to a typographic size.  `REM` units are preferable as they provide a standardised base (relative always to the body font size), but it may be useful at times to employ `EM` units in specific circumstances where an alternative scale for a component is needed.


### Font Replacement

`@font-face` should be used for font replacement where possible - ensuring that the font can be safely used in `.woff` format on the web in agreement with its licensing agreement.

Always specify a `.woff2` as well as a `.woff` font to take advantage of the greater compression the former offers. `.ttf` is required for IE8.


## Your Shameful Styles

There's often browser hacks, or fidly last minute tweaks that should be neater, and small things we want to test.  When doing things in a "less that ideal way" it should be done in an `_shame.scss`_ that gets included last.  This allows us to keep it out of our main styles, where, if we're honest, we'll probably never find it again.

To help future you, and everyone else not curse your name, use the `_shame.scss` file for:

* Browser or device specific weirdness
* quick tests or overrides
* temporary styles (ie: hiding this thing until we fix that bug)
* I'm sure you'll think of other things



## License

(The MIT License)

Copyright (c) 2016 Nona Creative

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**[⬆ back to top](#table-of-contents)**