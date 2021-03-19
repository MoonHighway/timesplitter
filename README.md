# Timesplitter

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
      "title": "Chapter One",
      "agenda": [{ "title": "first topic" }, { "title": "second topic" }]
    },
    {
      "title": "last topic"
    }
  ]
}
```

## Timesplitter Markdown and Folders

The `timesplitter.json` file is a manifest for the presentation that includes agendas, nested agendas, and topics. Each agenda and nested agenda requires a corresponding folder with a lower case name that is hyphenated. Each topic needs to associate a markdown file with a matching name. For example, the above _Example Course_ would require the following files, including the `timesplitter.json` file.

- 📁 example-course
  - 📁 chapter-one
    - 📄 first-topic.md
    - 📄 second-topic.md
  - 📄 last-topic.md
  - {} timesplitter.json
  - 📄 README.md

The _README.MD_ document is required, and shows up in the course as the _course overview_.

## Running the `timesplitter`

The `@moonhighway/timesplitter` is a cli that can be run globally:

```
npm install -g @moonhighway/timesplitter
timesplitter
```

Once installed you can run the `timesplitter` command from the folder that contains the `timesplitter.json` file.

Additionally you can install the `timesplitter` local to your repository and run it using an _npm script_:

```json
"scripts": {
    "start": "timesplitter"
},
```

## Developing Courses

The `timesplitter` treats your course materials like software. You're materials exist as a package in their own repository, which gives you the benefit of using tools like git and github to track changes and keep your course up to date. Keeping your course notes in markdown files that are orchestrated from a json file that works with a matching file folder structure isn't what we want to be doing as presenters. We have some tools to assist with the task of creating `timesplitter` courses:

- [@moonhighway/timesplitter-dev](https://www.npmjs.com/package/@moonhighway/timesplitter-dev) is a companion package to help presenters create captivating presentations that can be run by the `timesplitter` without having to manage a complicated manifest or folders structure on their own.
- [@moonhighway/create-timesplitter-course](https://www.npmjs.com/package/@moonhighway/create-timesplitter-course) is a cli that can be used to create the boilerplate for a `timesplitter` course including both the `timesplitter` and `timesplitter-dev` along with all of the necessary configuration to easily run either of these applications.

## Under Construction

This project is currently under construction. Please send your questions to [info@moonhighway.com](info@moonhighway.com).
