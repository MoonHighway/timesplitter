import { pickFirst, pickLast, pick, pickNext, pickPrevious } from "./pick";
import { deepData, shallowData } from "./pick.test.data";

describe("pick() function", () => {
  it("picks a section by url String", () => {
    const { title } = pick(shallowData, "second-section");
    expect(title).toEqual("Second Section");
  });
  it("picks a section by Title", () => {
    const { title } = pick(shallowData, "Second Section");
    expect(title).toEqual("Second Section");
  });
  it("picks a topic", () => {
    const { title } = pick(deepData, "second-section", "middle-topic");
    expect(title).toEqual("Middle Topic");
  });
  it("picks a subtopic", () => {
    const { title } = pick(
      deepData,
      "third-section",
      "getting-warm",
      "warmer-topic",
      "under-topic",
      "fi"
    );
    expect(title).toEqual("Fi");
  });
  describe("errors", () => {
    describe("incorrect data errors", () => {
      it("data argument required", () => {
        expect(() => {
          pick();
        }).toThrow("data argument was not supplied");
      });

      it("data must contain a title", () => {
        expect(() => {
          pick({ foo: "bar" });
        }).toThrowError("data must have at least a title field");
      });

      it("data cannot be an array", () => {
        expect(() => {
          pick([]);
        }).toThrowError("requires an object for data you sent an array");
      });

      it("data cannot be a type other than object", () => {
        expect(() => {
          pick(3);
        }).toThrowError("requires an object for data you sent a number");
      });
    });
  });
  describe("incorrect path errors", () => {
    it("path not supplied", () => {
      expect(() => {
        pick(deepData);
      }).toThrow("path to topic not supplied");
    });
    it("topic not found", () => {
      expect(() => {
        pick(
          deepData,
          "third-section",
          "getting-warm",
          "warmer-topic",
          "under-topic",
          "fruit-loop"
        );
      }).toThrow('fruit-loop was not found in "Under Topic" agenda');
    });
  });
});

describe("pickFirst() function", () => {
  it("picks the first shallow leaf", () => {
    const [{ title }, route] = pickFirst(shallowData);
    expect(title).toEqual("Course Level");
    expect(route).toEqual("course-level");
  });
  it("picks the first deep leaf", () => {
    const [{ title }, route] = pickFirst(deepData);
    expect(title).toEqual("Course Level");
    expect(route).toEqual("course-level");
  });
  describe("errors", () => {
    it("data argument required", () => {
      expect(() => {
        pickFirst();
      }).toThrow("data argument was not supplied");
    });

    it("data must contain a title", () => {
      expect(() => {
        pickFirst({ foo: "bar" });
      }).toThrowError("data must have at least a title field");
    });

    it("data cannot be an array", () => {
      expect(() => {
        pickFirst([]);
      }).toThrowError("requires an object for data you sent an array");
    });

    it("data cannot be a type other than object", () => {
      expect(() => {
        pickFirst(3);
      }).toThrowError("requires an object for data you sent a number");
    });
  });
});

describe("pickLast() function", () => {
  it("picks last shallow leaf", () => {
    const [{ title }, route] = pickLast(shallowData);
    expect(title).toEqual("Third Section");
    expect(route).toEqual("course-level/third-section");
  });
  it("picks the last deep leaf", () => {
    const [{ title }, route] = pickLast(deepData);
    expect(title).toEqual("Fo");
    expect(route).toEqual(
      "course-level/third-section/getting-warm/warmer-topic/under-topic/fo"
    );
  });
  describe("errors", () => {
    it("data argument required", () => {
      expect(() => {
        pickLast();
      }).toThrow("data argument was not supplied");
    });

    it("data must contain a title", () => {
      expect(() => {
        pickLast({ foo: "bar" });
      }).toThrowError("data must have at least a title field");
    });

    it("data cannot be an array", () => {
      expect(() => {
        pickLast([]);
      }).toThrowError("requires an object for data you sent an array");
    });

    it("data cannot be a type other than object", () => {
      expect(() => {
        pickLast(3);
      }).toThrowError("requires an object for data you sent a number");
    });
  });
});

describe("pickNext() function", () => {
  describe("picking next sibling", () => {
    let topic, route;
    beforeAll(() => {
      [topic, route] = pickNext(deepData, "second-section", "some-other-topic");
    });
    it("picks the next topic title", () => {
      expect(topic.title).toEqual("This That Topic");
    });
    it("picks the next route", () => {
      expect(route).toEqual("second-section/this-that-topic");
    });
  });

  describe("picking the first topic in the next section", () => {
    let topic, route;
    beforeAll(() => {
      [topic, route] = pickNext(deepData, "second-section", "end-topic");
    });
    it("picks the correct topic title", () => {
      expect(topic.title).toEqual("Third Section");
    });
    it("picks the correct route", () => {
      expect(route).toEqual("third-section");
    });
  });

  describe("picking the next child section", () => {
    let topic, route;
    beforeAll(() => {
      [topic, route] = pickNext(deepData, "third-section");
    });
    it("picks the correct topic title", () => {
      expect(topic.title).toEqual("Going Down");
    });
    it("picks the correct route", () => {
      expect(route).toEqual("third-section/going-down");
    });
  });

  describe("picking the next deep child section", () => {
    let topic, route;
    beforeAll(() => {
      [topic, route] = pickNext(
        deepData,
        "third-section",
        "going-down",
        "down-down"
      );
    });
    it("picks the correct topic title", () => {
      expect(topic.title).toEqual("Deep Down");
    });
    it("picks the correct route", () => {
      expect(route).toEqual("third-section/going-down/down-down/deep-down");
    });
  });

  describe("picking the next topic way up the tree", () => {
    let topic, route;

    beforeAll(() => {
      [topic, route] = pickNext(
        deepData,
        "third-section",
        "going-down",
        "down-down",
        "deep-down",
        "the-bottom"
      );
    });

    it("picks the correct topic title", () => {
      expect(topic.title).toEqual("Getting Warm");
    });
    it("picks the correct route", () => {
      expect(route).toEqual("third-section/getting-warm");
    });
  });

  describe("when there is no more next", () => {
    let topic, route;

    beforeAll(() => {
      [topic, route] = pickNext(
        deepData,
        "third-section",
        "getting-warm",
        "warmer-topic",
        "under-topic",
        "fo"
      );
    });

    it("returns null for topic", () => {
      expect(topic).toEqual(null);
    });
    it("returns null for route", () => {
      expect(route).toEqual(null);
    });
  });
});

describe.skip("pickPrev() function", () => {
  describe("picking previous sibling", () => {
    let topic, route;
    beforeAll(() => {
      [topic, route] = pickPrevious(
        deepData,
        "second-section",
        "some-other-topic"
      );
    });
    it("picks the previous topic title", () => {
      expect(topic.title).toEqual("Middle Topic");
    });
    it("picks the previous route", () => {
      expect(route).toEqual("second-section/middle-topic");
    });
  });

  describe("picking the last topic in the previous section", () => {
    let topic, route;
    beforeAll(() => {
      [topic, route] = pickPrevious(
        deepData,
        "second-section",
        "second-section-first-topic"
      );
    });
    it("picks the correct topic title", () => {
      expect(topic.title).toEqual("Sub Topic III");
    });
    it("picks the correct route", () => {
      expect(route).toEqual(
        "first-section/first-topic/sub-topic/sub-topic-ii/sub-topic-iii"
      );
    });
  });

  describe("picking the previous topic way up the tree", () => {
    let topic, route;

    beforeAll(() => {
      [topic, route] = pickPrevious(
        deepData,
        "third-section",
        "going-down",
        "down-down",
        "deep-down",
        "the-bottom"
      );
    });

    it("picks the correct topic title", () => {
      expect(topic.title).toEqual("end-topic");
    });
    it("picks the correct route", () => {
      expect(route).toEqual("second-section/end-topic");
    });
  });

  describe("when there is no more previous", () => {
    let topic, route;

    beforeAll(() => {
      [topic, route] = pickPrevious(
        deepData,
        "first-section",
        "first-topic",
        "sub-topic",
        "sub-topic-ii",
        "sub-topic-iii"
      );
    });

    it("returns null for topic", () => {
      expect(topic).toEqual(null);
    });
    it("returns null for route", () => {
      expect(route).toEqual(null);
    });
  });
});
