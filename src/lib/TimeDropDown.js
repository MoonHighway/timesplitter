import Select from "react-select";
import { format } from "date-fns";

export function TimeDropDown({
  value,
  length = 0,
  delay = 0,
  onChange = (f) => f,
  ...props
}) {
  const _value = value ? [{ value, label: value }] : null;
  const now = new Date();
  const begin = format(now, "h:mm aaa");
  const options = [{ value: begin, label: begin }];

  let then = length && now.getTime() + length * 60 * 1000;
  for (let i = 0; i < 250; i++) {
    let d = new Date();
    d.setMinutes(d.getMinutes() + i);
    if (then && d > then) {
      const value = format(then, "h:mm aaa");
      options.push({ value, label: value });
      then = null;
      if (d.getMinutes() % 5 === 0) continue;
    }
    if (d.getMinutes() % 5 === 0) {
      const value = format(d, "h:mm aaa");
      if (options.every((opt) => opt.value !== value))
        options.push({ value, label: value });
    }
  }

  return (
    <Select
      options={options}
      value={_value ? _value : options[0]}
      onChange={onChange}
      {...props}
    />
  );
}
