import { listenerCount } from "process";
import { useCallback, useLayoutEffect, useState } from "react";
import "./index.css";

export const CarSpecification = ({
  title,
  items,
  air,
  hood,
}: {
  title: string;
  items: any;
  air: boolean;
  hood: string;
}) => {
  const [view, setView] = useState(false);

  const buttonStyle = () => {
    setView(!view);
    const carBtn = document.getElementById(`car${title}`);
    if (!view) {
      carBtn?.classList.add("active");
    } else if (view) {
      carBtn?.classList.remove("active");
    }
  };

  const viewSpecificantions = () => {
    let html = [];
    for (let i in items) {
      html.push(
        <h4>
          {i}-{items[i]}
        </h4>
      );
    }
    return html;
  };

  return (
    <div>
      <button
        id={`car${title}`}
        className="car"
        onClick={() => buttonStyle()}
        key={title}
      >
        {title}
      </button>
      {view && (
        <div className="car-specification">
          {viewSpecificantions()}
          <h4>
            Air suspension-
            {air ? "yes" : "no"}
          </h4>
          <h4>Signature on hood-{hood}</h4>
        </div>
      )}
    </div>
  );
};
