"use client";
import { useState, useRef } from "react";
import { gameMove } from "../utils/game";

const Game = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const numValue = Number(value);

    if (
      (numValue >= 1 && numValue <= 9 && !inputValues.includes(numValue)) ||
      value === ""
    ) {
      const newValues = [...inputValues];
      newValues[index] = value === "" ? "" : numValue;
      setInputValues(newValues);

      if (value !== "" && index < inputValues.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isInputComplete = inputValues.every((value) => value !== "");

    if (!isInputComplete) {
      return console.log("Enter all numbers before submitting");
    }

    setLoading(true);
    const newGameMove = await gameMove({ guess: inputValues, id });

    setLoading(false);

    if (newGameMove.error) {
      setAlert({ type: "danger", message: newGameMove.error });
    } else {
      setAlert({
        type: "success",
        message: "Game move submitted successfully!",
      });
    }

    setInputValues(["", "", "", ""]);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card shadow-sm p-4">
              <h2 className="text-center">Getting Killed And Injured</h2>
              <h5 className="text-center text-muted">
                Can you get the computer's 4 secret digits?
              </h5>

              <div id="alert" className="alert d-none" role="alert"></div>

              <div className="allInputs mt-3">
                {inputValues.map((value, index) => (
                  <div key={index} className="mb-3">
                    <label htmlFor={`input${index}`} className="form-label">
                      {`Guess ${index + 1} goes here:`}
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id={`input${index}`}
                      placeholder={`Guess ${index + 1}`}
                      min="1"
                      max="9"
                      value={inputValues[index]}
                      onChange={(e) => handleChange(index, e.target.value)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      required
                    />
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-danger w-100 mb-2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>

                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-primary flex-grow-1">
                    Re-play
                  </button>
                  <a href="index.html" className="btn btn-success flex-grow-1">
                    Home
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mx-auto mt-4 mt-md-0">
            <div className="card shadow-sm p-4">
              <button
                type="button"
                className="btn btn-danger mb-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                How To Play
              </button>

              <hr />
              <div id="moves"></div>
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Getting Killed And Injured
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="winModal"
        className="modal fade"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">You Won!</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h2 className="text-center">You Got All Numbers Correctly!</h2>
            </div>
          </div>
        </div>
      </div>

      <div
        id="loseModal"
        className="modal fade"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">No More Moves</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h2 className="text-center">
                You couldn't get the computer's number.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
