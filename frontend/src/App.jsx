import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./components/ui/Button";

export default function App() {
  const [data, setData] = useState([]);

  return (
    <section className="flex flex-col gap-6 items-center justify-center">
      <h1 className="w-full text-center text-title-1 font-bold underline">
        Component Integrated
      </h1>
      <Button
        onClick={() => window.open(
          "https://github.com/NathanRael/React_components",
          "_blank"
        )}
        variant="primary"
      >
        Learn how to use it
      </Button>
      <h1>

      </h1>
    </section>
  );
}
