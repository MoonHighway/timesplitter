# Moon Highway Timesplitter

Use this tool to run a Moon Highway course. You can build a Moon Highway course manually by following the instructions below, or with a course editor called [@moonhighway/timesplitter-dev](https://www.npmjs.com/package/@moonhighway/timesplitter-dev).

```
npm install @moonhighway/timesplitter
```

## Create a `content.json` file

The course runner reads the `timesplitter.json` file from the root of the installed project. Here is an example of a minimal `timesplitter.json` file:

```json
{
  "title": "Example Course",
  "agenda": [
    {
      "title": "Chapter One"
    },
    {
      "title": "Chapter Two"
    }
  ]
}
```

## Add a npm script to run `timesplitter`

The `timesplitter` command is available in the `node_modules/.bin` folder. You can execute `timesplitter` inside of an npm script:

```json
"scripts": {
    "start": "timesplitter"
},
```

## Under Construction

This project is currently under construction. Please send your questions to [info@moonhighway.com](info@moonhighway.com).
