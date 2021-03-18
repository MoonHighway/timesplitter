import { useContent } from "../hooks";

export default function App() {
  const content = useContent();
  return <pre>{JSON.stringify(content, null, 2)}</pre>;
}
