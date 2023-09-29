import React, { useState } from "react";
import "./App.css";
import shapes from "./Data/shapes.ts";

const App = () => {
  React.useEffect(() => {
    const temp = document.getElementById("testscroll");
    if (temp) {
      temp.scrollLeft = 500;
    }
  }, [document.getElementById("testscroll")]);

  const [correct, setCorrect] = useState<string[]>([]);
  const [startTime] = useState<number>(new Date().getTime());
  const [wastedClicks, setWastedClicks] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>();
  const [finished, setFinished] = useState<boolean>(false);

  React.useEffect(() => {
    console.log(correct);
    if (correct.length === 3) {
      setTotalTime((new Date().getTime() - startTime) / 1000);
      setFinished(true);
    }
  }, [correct, startTime]);

  const appartmentClicked = (poly: {
    sold: boolean | null;
    coords: string;
  }) => {
    if (poly.sold === false) {
      if (!correct.includes(poly.coords)) {
        setCorrect([...correct, poly.coords]);
        alert("Correct");
        return;
      } else {
        alert("Dit appartement is al gevonden!");
        return;
      }
    }
    alert("Deze is niet te koop");
  };

  return (
    <article>
      <div className="wrapper" id="testscroll">
        <div className="backgroundIMG">
          <svg
            onClick={() => {
              if (!finished) setWastedClicks(wastedClicks + 1);
            }}
            viewBox="0 0 1920 1200"
            id="floormap"
          >
            {shapes.polygons.map((poly) => {
              return (
                <polygon
                  key={poly.coords}
                  onClick={() => appartmentClicked(poly)}
                  points={poly.coords}
                  className="trace"
                  fill={
                    poly.sold === false
                      ? "#00ff2a8b"
                      : poly.sold === null
                      ? "#ff7b008a"
                      : "#ff00008b"
                  }
                />
              );
            })}
            {/* {shapes.circles.map((circle) => {
              return (
                <circle
                  cx={circle.coords[0]}
                  cy={circle.coords[1]}
                  r={10}
                  key={circle.coords.join()}
                  onClick={() => appartmentClicked(circle)}
                  fill={
                    circle.sold === false
                      ? "#00ff2a8b"
                      : circle.sold === null
                      ? "#ff7b008a"
                      : "#ff00008b"
                  }
                />
              );
            })} */}
          </svg>
        </div>
      </div>
      {finished ? (
        <section>
          <h1>Resultaten</h1>
          <h5>Tijd: {totalTime}</h5>
          <h5>Wasted clicks: {wastedClicks - 3}</h5>
        </section>
      ) : null}
    </article>
  );
};

export default App;
