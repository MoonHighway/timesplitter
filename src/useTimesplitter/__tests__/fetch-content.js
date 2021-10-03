describe("Fuck", () => it("YOU", () => {}));
// import { screen, fireEvent } from "@testing-library/react";
// import { useTimesplitter } from "..";
// import { renderTimesplitter } from "../test-helpers";

// //
// // [ ] Click the button
// // [ ] Test for "loading" flicker
// // [ ] Test change /content retrieved from fetchMock
// // [ ] Test for initial "loading" flicker
// // [ ] Test for "loaded" after flicker
// //

// function LoadingConsumer() {
//   const { title, loading, refresh } = useTimesplitter();
//   if (loading) return <p>loading</p>;
//   return (
//     <>
//       <p>{title}</p>
//       <button onClick={refresh} data-testid="refresh">
//         refresh course
//       </button>
//     </>
//   );
// }

// const fetchMock = (url) =>
//   Promise.resolve({
//     json: () => Promise.resolve({ title: "loading test sample" }),
//   });

// describe("useTimesplitter", () => {
//   it("correct title", async () => {
//     global.fetch = fetchMock;
//     renderTimesplitter(<LoadingConsumer />);
//     expect(screen.queryByText("Small Sample Course")).toBeInTheDocument();
//     const button = screen.getByRole("button", { name: "refresh course" });
//     fireEvent.click(button);
//     await screen.findByText("loading test sample");
//   });
// });
