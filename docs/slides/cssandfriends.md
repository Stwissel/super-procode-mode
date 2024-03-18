# HISTORY<br />(Layout system)

---

## CSS

- Proposed in 1994 by Håkon Wium Lie (working with Tim Berners-Lee at CERN)
- Co-authored by Bert Bos
- Recommended by W3C in 1996
- Netscape had alternative, JavaScript Style Sheets, spec never finished
- CSS 2 became a recommendation in 1998 (the CSS you learned)
- Modules specified in CSS 3 and 4
- Did you know CSS has variable support?

---

## SASS

- Became popular with rise of precompilers
- .sass files get compiled to .css
- Based on Ruby
- Provided variables, mathematical operators, mixins, functions, loops, nesting and more
- SASS vs SCSS
    - SASS: indents and line breaks (à la YAML), smaller files
    - SCSS: brackets and semi-colons, more like CSS
- Adopted by Bootstrap from Bootstrap 4

---

## LESS

- Inspired by SASS
- Designed to be more similar to CSS
- Originally used by Bootstrap
- Logical functions - include mixins based on logic
- Also needs precompiling
- Uses JavaScript

---

## Tailwind

- Open source CSS framework
- Utility classes
    - Classes do not target specific components
    - More granular
    - Fewer changes required to stylesheet
    - More verbose HTML, more classes to achieve outcome
- Aso uses precompiling
    - JIT processing, parses HTML and works out combinations