import { useMemo, useState } from "react";

export function useRandom() {
  const [value, setValue] = useState<number>(0);

  const doublevalue = useMemo(() => {
    return value * 2;
  }, [value]);

  const random = () => {
    setValue(Math.floor(Math.random() * 10));
  };

  return { value, doublevalue, random };
}
