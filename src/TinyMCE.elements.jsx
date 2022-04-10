import { createGlobalStyle } from "styled-components";

export const TinyStyle = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.4;
    margin: 1rem;
  }
  table {
    border-collapse: collapse;
  }
  /* Apply a default padding if legacy cellpadding attribute is missing */
  table:not([cellpadding]) th,
  table:not([cellpadding]) td {
    padding: 0.4rem;
  }
  /* Set default table styles if a table has a positive border attribute
    and no inline css */
  table[border]:not([border="0"]):not([style*="border-width"]) th,
  table[border]:not([border="0"]):not([style*="border-width"]) td {
    border-width: 1px;
  }
  /* Set default table styles if a table has a positive border attribute
    and no inline css */
  table[border]:not([border="0"]):not([style*="border-style"]) th,
  table[border]:not([border="0"]):not([style*="border-style"]) td {
    border-style: solid;
  }
  /* Set default table styles if a table has a positive border attribute
    and no inline css */
  table[border]:not([border="0"]):not([style*="border-color"]) th,
  table[border]:not([border="0"]):not([style*="border-color"]) td {
    border-color: #ccc;
  }
  figure {
    display: table;
    margin: 1rem auto;
  }
  figure figcaption {
    color: #999;
    display: block;
    margin-top: 0.25rem;
    text-align: center;
  }
  hr {
    border-color: #ccc;
    border-style: solid;
    border-width: 1px 0 0 0;
  }
  code {
    background-color: #e8e8e8;
    border-radius: 3px;
    padding: 0.1rem 0.2rem;
  }
  .mce-content-body:not([dir=rtl]) blockquote {
    border-left: 2px solid #ccc;
    margin-left: 1.5rem;
    padding-left: 1rem;
  }
  .mce-content-body[dir=rtl] blockquote {
    border-right: 2px solid #ccc;
    margin-right: 1.5rem;
    padding-right: 1rem;
  }
`