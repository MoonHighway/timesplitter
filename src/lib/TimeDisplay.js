import { Timer } from ".";

export function TimeDisplay({
  time,
  locked = false,
  size = 18,
  short = false,
  ...props
}) {
  if (time >= 60) {
    let h = Math.floor(time / 60);
    let m = time % 60;
    console.log(short);
    const message = short
      ? `${h}hr${h > 1 ? "s" : ""} ${m > 0 ? `${m}min` : ""}`
      : `${h}hour${h > 1 ? "s" : ""} ${m > 0 ? `${m}minutes` : ""}`;

    return (
      <>
        <Timer size={size} {...props} />
        {message}
      </>
    );
  }

  if (time) {
    return (
      <>
        <Timer size={size} {...props} /> &nbsp;
        <span {...props}>
          {time} min{time === 1 ? "" : "s"}
        </span>
      </>
    );
  }

  return null;
}
