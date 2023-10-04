import React, { useState } from "react";
import "./App.css";
import shapes from "./Data/shapes.ts";

const App = () => {
  const [correct, setCorrect] = useState<string[]>([]);
  const [startTime] = useState<number>(new Date().getTime());
  const [wastedClicks, setWastedClicks] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>();
  const [finished, setFinished] = useState<boolean>(false);
  const [resultsShown, setResultsShown] = useState<boolean>(false);
  const [firstLaunch, setFirstLaunch] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(920);

  const imageStyle = {
    width: `${zoom}px`,
  };

  React.useEffect(() => {
    const temp = document.getElementById("testscroll");
    if (temp && firstLaunch) {
      temp.scrollLeft = 300;
      setFirstLaunch(false);
    }
    if (correct.length === 3) {
      setTotalTime((new Date().getTime() - startTime) / 1000);
      setFinished(true);
    }
  }, [
    document.getElementById("testscroll"),
    correct,
    startTime,
    firstLaunch,
    setFirstLaunch,
  ]);

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

  const getPolygonColor = (sold: boolean | null) => {
    if (sold === false) {
      return "#00ff2a8b";
    }
    if (sold === null) {
      return "#ff7b008a";
    }
    return "#ff00008b";
  };

  const zoomIn = () => {
    if (zoom !== 1220) {
      setZoom(zoom + 100);
    }
  };
  const zoomOut = () => {
    if (zoom !== 620) {
      setZoom(zoom - 100);
    }
  };

  return (
    <article>
      <section className="titleSection">
        <h1 className="titleSection_Title">Woningzoeker prototype 1</h1>
        <p className="titleSection_Version">
          V{process.env.REACT_APP_VERSION} {process.env.REACT_APP_VERSION_TYPE}
        </p>
      </section>
      <section>
        <p>
          <strong>
            Deze text is enkel voor de vulling van de pagina en hoeft niet
            gelezen te worden.
          </strong>
          ,elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
        </p>
      </section>
      <section className="woningZoekerSection">
        <h2>Woningzoeker: </h2>
        <section className="zoomButtonsSection">
          <button className="zoomButtonsSectionButton" onClick={zoomOut}>
            -
          </button>
          <button className="zoomButtonsSectionButton" onClick={zoomIn}>
            +
          </button>
        </section>
        <div className="wrapper" id="testscroll">
          <div className="backgroundIMG" style={imageStyle}>
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
                    fill={getPolygonColor(poly.sold)}
                  />
                );
              })}
            </svg>
          </div>
        </div>
        <section className="legendSection">
          <div className="legend">
            <div className="legendCircle legendSold"></div> - Verkocht
          </div>
          <div className="legend">
            <div className="legendCircle legendOptie"></div> - In optie
          </div>
          <div className="legend">
            <div className="legendCircle legendTeKoop"></div> - Te Koop
          </div>
        </section>
      </section>
      {finished ? (
        !resultsShown ? (
          <section className="ResultatenSection">
            <h1 className="ResultatenSection_Title">Resultaten</h1>
            <button
              className="ResultatenSection_Button"
              onClick={() => setResultsShown(true)}
            >
              Laat resultaten zien
            </button>
          </section>
        ) : (
          <section className="ResultatenSection">
            <h1 className="ResultatenSection_Title">Resultaten</h1>
            <h5 className="ResultatenSection_Resultaten">Tijd: {totalTime}</h5>
            <h5 className="ResultatenSection_Resultaten">
              Wasted clicks: {wastedClicks - 3}
            </h5>
          </section>
        )
      ) : (
        <section>
          <p>
            <strong>
              Deze text is enkel voor de vulling van de pagina en hoeft niet
              gelezen te worden.
            </strong>
            , elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </section>
      )}
    </article>
  );
};

export default App;
