import Select from "react-select";
import { format } from "date-fns";

export function TimeDropDown({
  value,
  delay = 0,
  onChange = (f) => f,
  ...props
}) {
  const options = [];
  for (let i = 0; i < 250; i++) {
    let d = new Date();
    d.setMinutes(d.getMinutes() + delay + i);
    if (i === 0 || d.getMinutes() % 5 === 0)
      options.push({
        value: d,
        offsetMinutes: new Date(d - new Date()) / (60 * 1000),
        label: format(d, "h:mm aaa"),
      });
  }
  return (
    <Select
      options={options}
      value={value ? value : options[0]}
      onChange={onChange}
      {...props}
    />
  );
}
