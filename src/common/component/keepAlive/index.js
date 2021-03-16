import { useLayoutEffect, useRef, useState } from "react";

export const Conditional = (props) => {
  const [targetElement] = useState(() => document.createElement("div"));
  const containerRef = useRef();
  useLayoutEffect(() => {
    if (props.active) {
      containerRef.current.appenChild(targetElement);
    } else {
      try {
        containerRef.current.removeChild(targetElement);
      } catch (e) {}
    }
  }, [props.active]);

  return (
    <>
      <div ref={containerRef} />
      {ReactDOM.createPortal(props.children, targetElement)}
    </>
  );
};
