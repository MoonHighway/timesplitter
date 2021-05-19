// This function takes a string like "Hello World JavaScript"
// and turns it into "hello-world-javascript"
export const urlFriendly = (str) => str.trim().toLowerCase().replace(/ /g, "-");

// This is a predicate used to find agenda items by the title field.
// It takes in the value for the title field "location" and returns
// a function that can be used to check title fields against that value
// It also converts everything to lowercases and replaces spaces before compairing the title
// so that routes will match titles and titles will match titles
export const searchByTitle =
  (location) =>
  ({ title }) =>
    urlFriendly(title) === urlFriendly(location);

// These are the argument check errors for sanity checking
// These just make sure the arguments are passed with expected values
function argChecks(obj) {
  if (!obj) {
    throw new Error("data argument was not supplied");
  }

  if (typeof obj !== "object") {
    throw new Error(`requires an object for data you sent a ${typeof obj}`);
  }

  if (Array.isArray(obj)) {
    throw new Error(`requires an object for data you sent an array`);
  }

  if (!obj.title) {
    throw new Error("data must have at least a title field");
  }
}

// This pick function can be used to pick deeply nested topics
// out of the manifest. You provide the manifest and the rest of the
// arguments sent to this function will be treated as a path
export function pick(obj, ...path) {
  // the object must be there and it must be correct
  argChecks(obj);

  // We need a path
  if (!path.length) {
    throw new Error("path to topic not supplied");
  }

  // grab the first value in the path (like .shift()) as location
  // and the rest are now a smaller array
  const [location, ...rest] = path;

  // Use the location to find the topic
  const topic = obj.agenda.find(searchByTitle(location));

  // If a topic was not found throw an error
  if (!topic) {
    throw new Error(`${location} was not found in "${obj.title}" agenda`);
  }

  // If there are still items in the shortened path
  // Then recall this function with a smaller object the topic
  // and the remaining path, which we can find in the smaller object
  if (rest.length > 0) {
    return pick(topic, ...rest);
  }

  // When there are no more arguments in the path
  // Because the rest is empty... return the topic
  return topic;
}

export function pickFirst(obj) {
  argChecks(obj);
  return [obj, urlFriendly(obj.title)];
}

// pickLast used to deeply pick the last topic
//  but, it no longer needs to... which greatly simplified this function
// export function pickLast(obj) {
//   argChecks(obj);
//   return [obj, urlFriendly(obj.title)];
// }

// Like Pick First but the opposite, instead of
// picking the first topic without children in an agenda
// It finds the last topic without children in the agenda
export const pickLast = (function () {
  let route = [];
  function _pickLast(obj) {
    argChecks(obj);
    if (obj.agenda) {
      route.push(urlFriendly(obj.title));
      // The big difference his here, instead of picking the first topic
      // from the agenda array, we pick the last one by reversing the array
      const [topic] = [...obj.agenda].reverse();
      return _pickLast(topic);
    }
    const result = [obj, [...route, urlFriendly(obj.title)].join("/")];
    route = [];
    return result;
  }
  return _pickLast;
})();

// This finds the next topic in the manifest along
// with the route to that topic
export const pickNext = (function () {
  // This time we save the route as breadcrumbs as we traverse the data
  // But we also save snapshots of the tree so we can use it to climb back up
  // when it is time to look for the next branch
  let route = [],
    tree = [];

  // This climb function traverses back up the object
  // by modifying our breadcrumbs and the tree
  const climb = () => {
    // When there is no more tree to climb, meaning we have empty arrays
    // We'll return null. This is the case when we call next, but we are at the
    // end of the manifest, the last topic
    if (!tree.length && !route.length) {
      return [null, null, null];
    }

    // We climb by popping the last item from out tree and route
    const lastTree = tree.pop();
    const lastRoute = route.pop();

    // Now we can search the previous tree for the index of the next topic
    const n = lastTree.findIndex(searchByTitle(lastRoute));

    // Return the index of the next topic, the lastTree, and the lastRoute
    return [n, lastTree, lastRoute];
  };

  // This is the body of the pickNext Function that is called by our consumer
  function _pickNext(obj, ...path) {
    // This is pretty similar to the pick function
    const [location, ...rest] = path;

    // We fill find topics in the agenda list using the topic name found in the path
    const topic = obj.agenda.find(searchByTitle(location));

    // If there are still path values to search
    if (rest.length > 0) {
      // We'll save the current location as a route
      // And we'll add the current agenda to our tree
      route.push(location);
      tree.push(obj.agenda);

      // Now we'll recall this function with a smaller topic and less path arguments
      // We'll keep doing this until there is no longer a path
      // Which means we have found our topic, we found the leaf...
      return _pickNext(topic, ...rest);
    }

    // Now that we have found our topic, it is time to get the next topic
    // We start by finding the index of the current topic
    const index = obj.agenda.findIndex(searchByTitle(location));

    // If adding one to the index takes the current topic agenda out of scope
    // This means we are on the last topic for the current agenda
    // We need to climb back up the tree until we can find a topic with
    // the next agenda
    if (index + 1 >= obj.agenda.length) {
      // We will climb until there is no more tree (lastTree is null)
      // or until we have found a topic that has next agenda item

      if (topic.agenda) {
        const [firstChildSection] = topic.agenda;

        if (firstChildSection) {
          const result = [
            firstChildSection,
            [
              ...route,
              urlFriendly(topic.title),
              urlFriendly(firstChildSection.title),
            ].join("/"),
          ];
          route = [];
          tree = [];
          return result;
        }
      }

      let [n, lastTree, lastRoute] = climb();

      while (lastTree && n + 1 >= lastTree.length) {
        [n, lastTree, lastRoute] = climb();
      }

      // If we climbed up the entire tree and did not find a topic
      // That has a next agenda item, then this must be the last topic
      // in the entire manifest, so we will return null for the topic and the route
      // meaning there is not next topic
      if (!n && !lastTree && !lastRoute) {
        return [null, null];
      }

      // Now we can find the next section topic by adding one to n
      const lastSection = lastTree[n + 1];

      // And we can use the pickFirst function to dive deep into This
      // section to find the first topic that does not have any children, the leaf
      const [xTopic, xRoute] = pickFirst(lastSection);

      // We have the resulting next topic as xTopic
      // We just need to the last section route to the route returned by pick first
      const result = [xTopic, [...route, xRoute].join("/")];

      // Remove our saved data
      route = [];
      tree = [];

      // return the result
      return result;
    }

    let nextTopic = obj.agenda[index + 1];

    // If the current topic still has an agenda
    if (nextTopic.agenda) {
      // Dive into that agenda to re-treive the first topic
      let [t, r] = pickFirst(nextTopic);
      const result = [t, [...route, r].join("/")];
      route = [];
      tree = [];

      // Return this new sub topic along wiht the route
      return result;
    }

    route.push(urlFriendly(nextTopic.title));
    const result = [nextTopic, route.join("/")];
    route = [];
    tree = [];
    return result;
  }

  // Returning this inner function creates a closure around
  // the route and tree variables.
  return _pickNext;
})();

// Just like the pick next, except we look to the previous topic in the tree
export const pickPrevious = (function () {
  let route = [];
  let tree = [];
  const climb = () => {
    if (!tree.length && !route.length) {
      return [null, null, null];
    }
    const lastTree = tree.pop();
    const lastRoute = route.pop();
    const n = lastTree.findIndex(searchByTitle(lastRoute));
    return [n, lastTree, lastRoute];
  };
  function _pickPrevious(obj, ...path) {
    const [location, ...rest] = path;
    const topic = obj.agenda.find(searchByTitle(location));
    if (rest.length > 0) {
      route.push(location);
      tree.push(obj.agenda);
      return _pickPrevious(topic, ...rest);
    }

    const index = obj.agenda.findIndex(searchByTitle(location));

    // The big difference here is that we are decrementing the index
    // So when we are on the first topic we have to look up the tree
    if (index - 1 < 0) {
      // Climb the tree until we find a topic that is not the first topic
      // in the agenda

      if (!!route.length) {
        const [lastItem] = [...route].reverse();
        const [agenda] = [...tree].reverse();
        const parentTopic = pick({ title: "parent search", agenda }, lastItem);
        const result = [parentTopic, route.join("/")];
        route = [];
        tree = [];
        return result;
      }

      let [n, lastTree, lastRoute] = climb();
      while (lastTree && n === 0) {
        [n, lastTree, lastRoute] = climb();
      }

      if (!n && !lastTree && !lastRoute) {
        return [null, null];
      }

      // We find the section by decrementing n
      const lastSection = lastTree[n - 1];

      // This use pick last to dive deep into that section and pick the last leaf topic
      const [pTopic, pRoute] = pickLast(lastSection);
      route.push(pRoute);
      const results = [pTopic, route.join("/")];

      route = [];
      tree = [];
      return results;
    }

    let prevTopic = obj.agenda[index - 1];

    if (prevTopic.agenda) {
      let [t, r] = pickLast(prevTopic);
      const result = [t, [...route, r].join("/")];
      route = [];
      tree = [];
      return result;
    }

    route.push(urlFriendly(prevTopic.title));
    const result = [prevTopic, route.join("/")];
    route = [];
    tree = [];
    return result;
  }
  return _pickPrevious;
})();
