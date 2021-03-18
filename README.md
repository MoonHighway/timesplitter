# Moon Highway Timesplitter

The `timesplitter` helps presenters run excellent course agendas. This tool is a web application that displays a presenters entire course plan, one topic at a time, with timing tools to help the presenter stay on track.

```
npm install @moonhighway/timesplitter
```

## Create a `timesplitter.json` file

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

## Developing Courses

The `timesplitter` treats your course materials like software. You're materials exist as a package in their own repository, which gives you the benefit of using tools like git and github to track changes and keep your course up to date. Keeping your course notes in markdown files that are orchestrated from a json file that works with a matching file folder structure isn't what we want to be doing as presenters. We have some tools to assist with the task of creating `timesplitter` courses:

- [@moonhighway/timesplitter-dev](https://www.npmjs.com/package/@moonhighway/timesplitter-dev) is a companion package to help presenters create captivating presentations that can be run by the `timesplitter` without having to manage a complicated manifest or folders structure on their own.
- [@moonhighway/create-timesplitter-course](https://www.npmjs.com/package/@moonhighway/timesplitter-dev) is a cli that can be used to create the boilerplate for a `timesplitter` course including both the `timesplitter` and `timesplitter-dev` along with all of the necessary configuration to easily run either of these applications.

## Under Construction

This project is currently under construction. Please send your questions to [info@moonhighway.com](info@moonhighway.com).
