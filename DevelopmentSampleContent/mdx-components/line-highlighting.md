## TODO: Problem Line Highlights

Problem: in order to highlight code, we need to send the selectLines to the CodeBlock component. The following code would highlight lines number `3`,`10`, and `14`.

```jsx
<CodeBlock selectLines={[3, 10, 14]}>{children}</CodeBlock>
```

<Warning>
How to we work the ability to select line numbers into the mdx itself?
</Warning>
