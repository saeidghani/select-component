import { useEffect, RefObject } from "react";

export default function useClickOutside(ref: RefObject<any>, handler: () => void) {
  useEffect(() => {
    const listener = (e: TouchEvent | MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
