import { useEffect, useState } from "react";
import { normalizeImageList } from "../Config/themeSettings";

const useThemeAsset = (value, fallback) => {
  const [source, setSource] = useState(fallback);

  useEffect(() => {
    const list = normalizeImageList(value);

    if (!list.length) {
      setSource(fallback);
      return undefined;
    }

    const entry = list[0];

    if (typeof entry === "string") {
      setSource(entry);
      return undefined;
    }

    if (entry instanceof File) {
      const url = URL.createObjectURL(entry);
      setSource(url);
      return () => URL.revokeObjectURL(url);
    }

    setSource(fallback);
    return undefined;
  }, [value, fallback]);

  return source || fallback;
};

export default useThemeAsset;

