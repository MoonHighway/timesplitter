# Instructor TODO Checklist

Checklist components are used to add a list of items that an instructor must accomplish. They are indicators and reminders that are baked into courses. For example, there is typically a classroom setup checklist that the instructor must complete upon arrival. Additionally they can be used anywhere to verify or keep track of things.

<Checklist title="AVY list">

- Get the Gear
- Get the Training
- Get the Report

</Checklist>

## Checklist Memory

By default a checklist resets all completed items as soon as the screen is rendered. No actions are saved in memory. Adding the memory attribute will timestamp and save the completed items in web storage. Setting the value to **"session"** will save the values only for the current browser session, or class. Setting the value to **"always"** will always save their completed status every time the course is taught. **"none"** is the default value where the values are reset every time the screen is visited.
