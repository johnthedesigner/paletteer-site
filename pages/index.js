import chroma from "chroma-js";
import _ from "lodash";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import ColorPicker from "@/components/ColorPicker";
import Logo from "@/components/logo";
import PlusIcon from "@/components/PlusIcon";
import ModeIcon from "@/components/ModeIcon";
import SwatchCountIcon from "@/components/SwatchCountIcon";
import generateColors from "@/utils/generateColors";
import Swatches from "@/components/Swatches";
import SwatchContrast from "@/components/SwatchContrast";
import ColorEditorIcon from "@/components/ColorEditorIcon";
import CodeIcon from "@/components/CodeIcon";
import handler from "./api/hello";

export default function Home({ colors, names }) {
  const defaultSeed = { hex: "#56CCF2", name: null };

  const router = useRouter();

  const viewportRef = useRef();

  const [palettes, setPalettes] = useState([]);
  const [seeds, setSeeds] = useState([defaultSeed]);
  const [selectedSeed, setSelectedSeed] = useState(0);
  const [selectedSwatch, setSelectedSwatch] = useState(null);
  const [hoveredSwatch, setHoveredSwatch] = useState(null);
  const [seedLabelEditor, setSeedLabelEditor] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showColorEditor, setShowColorEditor] = useState(false);
  const [swatchQuantity, setSwatchQuantity] = useState(12);
  const [viewportHeight, setViewportHeight] = useState(null);

  // When the seed colors are updated, update full palettes
  useEffect(() => {
    if (seeds.length > 0) {
      let colorString = _.join(
        _.map(seeds, (seed) => {
          return encodeURIComponent(_.trimStart(seed.hex, "#"));
        }),
        "|"
      );
      let nameString = _.join(
        _.map(seeds, (seed) => {
          return encodeURIComponent(seed.name);
        }),
        "|"
      );
      router.push(`/?colors=${colorString}&names=${nameString}`);
    }
    setPalettes(
      _.map(seeds, (seed) => {
        if (chroma.valid(seed.hex)) {
          return generateColors(seed.hex, swatchQuantity);
        } else {
          return generateColors("white", swatchQuantity);
        }
      })
    );
  }, [seeds, swatchQuantity]);

  useEffect(() => {
    // Only update from query string if there are colors present
    if (colors.length > 0) {
      let newSeeds = _.map(colors, (color, index) => {
        // Get the matching name and check if it should be null
        let seedName = decodeURIComponent(names[index]);
        seedName = seedName === "null" ? null : seedName;
        // Get the hex color and reappend the hash
        let seedHex = `#${decodeURIComponent(color)}`;

        return { hex: seedHex, name: seedName };
      });
      setSeeds(newSeeds);
    }
  }, []);

  // when the page resizes, make sure the main element is sized to match
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(document.documentElement.clientHeight);
    };

    handleResize();

    window.onresize = handleResize;
  }, []);

  const addColor = async () => {
    await setSeeds([...seeds, defaultSeed]);
    selectSeed(seeds.length);
    setShowColorEditor(true);
  };

  const selectSeed = (index) => {
    setSelectedSeed(index);
    setSelectedSwatch(null);
  };

  const selectSwatch = (index) => {
    setSelectedSwatch(index);
  };

  const hoverSwatch = (index) => {
    setHoveredSwatch(index);
  };

  const editingSeedLabel = (index) => {
    setSeedLabelEditor(index);
  };

  const updateSeedColor = (color) => {
    let newSeeds = [...seeds];
    newSeeds[selectedSeed].hex = color.hex;
    setSeeds(newSeeds);
  };

  const updateSeedName = (e) => {
    let newSeeds = [...seeds];
    newSeeds[selectedSeed].name = e.target.value;
    setSeeds(newSeeds);
  };

  const deleteSelectedSeed = () => {
    let newSeeds = [...seeds];
    newSeeds.splice(selectedSeed, 1);
    setSeeds(newSeeds);

    let nextSelectedSeed = selectedSeed;

    // If we are deleting the only seed
    if (seeds.length === 1) {
      nextSelectedSeed = null;
    }

    // If we are deleting the last seed in the list
    if (seeds.length > 1 && selectedSeed + 1 === seeds.length) {
      nextSelectedSeed = selectedSeed - 1;
    }

    selectSeed(nextSelectedSeed);
  };

  const getSelectedSeedName = () => {
    if (seeds[selectedSeed]) {
      if (seeds[selectedSeed].name != null) {
        return seeds[selectedSeed].name;
      } else {
        return palettes[selectedSeed] ? palettes[selectedSeed].name : "";
      }
    }
  };

  const Seed = ({ index, seed }) => {
    return (
      <div className={`seed ${selectedSeed === index ? "seed--selected" : ""}`}>
        <button
          className={`seed__drop ${
            selectedSeed === index ? "seed__drop--selected" : ""
          }`}
          style={{
            background: seed.hex,
          }}
          onClick={(e) => selectSeed(index)}
        />
        {selectedSeed === index && (
          <>
            <div
              className="seed__label"
              onDoubleClick={() => editingSeedLabel(index)}
              style={{
                color: palettes[selectedSeed]
                  ? palettes[selectedSeed].swatches[6].hex
                  : "black",
              }}>
              {getSelectedSeedName()}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Paletteer – Flexible color palettes for digital projects</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        ref={viewportRef}
        style={{ height: `${viewportHeight}px`, overflow: "hidden" }}>
        <div className="header">
          <div
            className="logo"
            style={{
              color: palettes[selectedSeed]
                ? palettes[selectedSeed].swatches[2].hex
                : "#F77777",
            }}>
            <Logo />
          </div>
        </div>
        <div className="controls">
          <div className="seed-colors">
            <div className="seed-colors__list">
              {seeds.length > 0 ? (
                <>
                  {_.map(seeds, (seed, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Seed index={index} seed={seed} />
                      </React.Fragment>
                    );
                  })}
                </>
              ) : (
                <p className="seed-colors__blank-state">None yet!</p>
              )}
              <button className="add-button" onClick={addColor}>
                <PlusIcon />
              </button>
            </div>
          </div>
          <div className="palette-actions">
            <button
              className="button"
              onClick={() => setDarkMode(!darkMode)}
              style={{ marginRight: "1rem" }}>
              <span className="button__icon">
                <ModeIcon darkMode={darkMode} />
              </span>
              {darkMode ? "Dark Mode" : "Light Mode"}
            </button>
            <div className="radio-buttons" style={{ marginRight: "1rem" }}>
              <button
                className={`radio-button ${
                  swatchQuantity === 8 ? "radio-button--selected" : ""
                }`}
                onClick={() => setSwatchQuantity(8)}>
                <SwatchCountIcon count="s" />
              </button>
              <button
                className={`radio-button ${
                  swatchQuantity === 12 ? "radio-button--selected" : ""
                }`}
                onClick={() => setSwatchQuantity(12)}>
                <SwatchCountIcon count="m" />
              </button>
              <button
                className={`radio-button ${
                  swatchQuantity === 16 ? "radio-button--selected" : ""
                }`}
                onClick={() => setSwatchQuantity(16)}>
                <SwatchCountIcon count="l" />
              </button>
            </div>
            <button
              className="button"
              onClick={() => setShowColorEditor(!showColorEditor)}>
              <span className="button__icon">
                <CodeIcon />
              </span>
              Export
            </button>
          </div>
        </div>
        <div
          className={`swatches__area ${
            darkMode ? "swatches__area--dark-mode" : ""
          }`}
          onClick={() => setSelectedSwatch(null)}>
          <div className="swatches__body">
            <div className="swatches">
              <div className="swatches__header">
                <span className="swatches__header-label">Selected Hue</span>
                <h2 className="swatches__swatch-name">
                  {getSelectedSeedName()}
                </h2>
                <button
                  className={`button ${darkMode ? "button--dark-mode" : ""}`}
                  onClick={() => setShowColorEditor(!showColorEditor)}>
                  <span className="button__icon">
                    <ColorEditorIcon />
                  </span>
                  {!showColorEditor ? "Edit Color" : "Close Color Editor"}
                </button>
              </div>
              <div className="swatches__list">
                {palettes.length === 0 && (
                  <>
                    <h1>Swatches blank state</h1>
                  </>
                )}
                {palettes.length > 0 && (
                  <>
                    {_.map(
                      (palettes[selectedSeed] ? palettes[selectedSeed] : [])
                        .swatches,
                      (swatch, index) => {
                        // Check if this is the selected swatch
                        let selected = index === selectedSwatch;
                        // Check if we should display contrast figures
                        let displayContrast =
                          index === selectedSwatch || index === hoveredSwatch;
                        let swatchStyles = {
                          background: swatch.hex,
                          boxShadow: selected
                            ? "inset 0.25rem 0.25rem 0.5rem rgb(0,0,0,.25)"
                            : "none",
                          transition: `all ease-in-out 0.1s, background ease-in 0.1s ${
                            index * 0.02
                          }s`,
                        };
                        let adaptiveTextStyles = { color: swatch.displayColor };
                        let contrastStyles = {
                          opacity: displayContrast ? 1 : 0,
                        };
                        return (
                          <div
                            key={index}
                            className={`swatch ${
                              selected ? "swatch--selected" : ""
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              selectSwatch(index);
                            }}
                            onMouseEnter={() => hoverSwatch(index)}
                            onMouseLeave={() => hoverSwatch(null)}>
                            <div
                              className={`swatch__body ${
                                selected ? "swatch__body--selected" : ""
                              }`}
                              style={swatchStyles}>
                              <div
                                className="swatch__label"
                                style={adaptiveTextStyles}>
                                <p className="swatch__index">
                                  {_.padStart(index + 1, 2, "0")}
                                </p>
                                <p className="swatch__hex">{swatch.hex}</p>
                              </div>
                              <div
                                className="contrast-dot__wrapper"
                                style={contrastStyles}>
                                <SwatchContrast
                                  whiteContrast={swatch.contrastWhite}
                                  blackContrast={swatch.contrastBlack}
                                  color={swatch.hex}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </>
                )}
              </div>
            </div>
            <div
              className={`side-controls__wrapper ${
                showColorEditor ? "" : "side-controls__wrapper--hidden"
              }`}>
              <div
                className={`side-controls ${
                  darkMode ? "side-controls--dark-mode" : ""
                }`}>
                <p className="side-controls__label">Name</p>
                <input
                  className="side-controls__input"
                  value={getSelectedSeedName()}
                  onChange={updateSeedName}
                />
                <p className="side-controls__label">Color</p>
                {selectedSeed != null && (
                  <>
                    <ColorPicker
                      color={
                        seeds[selectedSeed]
                          ? seeds[selectedSeed].hex
                          : "#FFFFFF"
                      }
                      hex={
                        seeds[selectedSeed]
                          ? seeds[selectedSeed].hex
                          : "#FFFFFF"
                      }
                      hsl={chroma(
                        seeds[selectedSeed]
                          ? seeds[selectedSeed].hex
                          : "#FFFFFF"
                      ).hsl()}
                      hsv={chroma(
                        seeds[selectedSeed]
                          ? seeds[selectedSeed].hex
                          : "#FFFFFF"
                      ).hsv()}
                      onChange={updateSeedColor}
                    />
                    <p
                      className="side-controls__label"
                      style={{ marginTop: "1rem" }}>
                      Swatches
                    </p>
                    <Swatches
                      color={
                        seeds[selectedSeed]
                          ? seeds[selectedSeed].hex
                          : "#FFFFFF"
                      }
                      updateSeedColor={updateSeedColor}
                    />
                    <div className="side-controls__buttons">
                      <button
                        className="button button--delete side-controls__delete-button"
                        onClick={deleteSelectedSeed}
                        disabled={seeds.length === 1}>
                        Delete
                      </button>
                      <button
                        className="button side-controls__done-button"
                        onClick={() => setShowColorEditor(!showColorEditor)}>
                        Done
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Fetch products for server side rendering
export const getServerSideProps = async (ctx) => {
  // Build query tags list
  // Get query string
  let { query } = ctx;
  // Build an array of colors
  let colors = query.colors ? query.colors.split("|") : [];
  let names = query.names ? query.names.split("|") : [];

  return {
    props: { colors, names },
  };
};
