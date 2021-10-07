import React, { useState } from "react";
import { TimeDurationInput } from "react-time-duration-input";
import styles from "./DishForm.module.scss";

const DishForm = () => {
  const [enteredName, setenteredName] = useState("");
  const [enteredPreparationTime, setEnteredPreparationTime] = useState("");
  const [selectedType, setselectedType] = useState("");
  const [enteredNoOfSlices, setEnteredNoOfSlices] = useState("");
  const [enteredDiameter, setEnteredDiameter] = useState("");
  const [selectedSpiciness, setSelectedSpiciness] = useState("");
  const [enteredSlicesofBread, setEnteredSlicesOfBread] = useState("");

  const dishNameChangeHandler = (event) => {
    setenteredName(event.target.value);
  };
  const preparationTimeChangeHandler = (event) => {
    setEnteredPreparationTime(event.target.value);
  };

  const dishTypeChangeHandler = (event) => {
    setselectedType(event.target.value);
  };

  const numberOfSlicesChangeHandler = (event) => {
    setEnteredNoOfSlices(event.target.value);
  };
  const diameterChangeHandler = (event) => {
    setEnteredDiameter(event.target.value);
  };

  const spicinessChangeHandler = (event) => {
    setSelectedSpiciness(event.target.value);
  };

  const slicesOfBreadChangeHandler = (event) => {
    setEnteredSlicesOfBread(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let dishData = "";

    if (selectedType === "pizza") {
      dishData = {
        name: enteredName,
        preparation_time: enteredPreparationTime,
        type: selectedType,
        no_of_slices: enteredNoOfSlices,
        diameter: enteredDiameter,
      };
    } else if (selectedType === "soup") {
      dishData = {
        name: enteredName,
        preparation_time: enteredPreparationTime,
        type: selectedType,
        spiciness_scale: selectedSpiciness,
      };
    } else if (selectedType === "sandwich") {
      dishData = {
        name: enteredName,
        preparation_time: enteredPreparationTime,
        type: selectedType,
        slices_of_bread: enteredSlicesofBread,
      };
    }

    // const dishData = {
    //   name: enteredName,
    //   preparation_time: enteredPreparationTime,
    //   type: selectedType,
    // };
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h1 className={styles.form__heading}>Dish form</h1>
      <div className={styles.form__controls}>
        <div className={styles.form__control}>
          <label>Dish name</label>
          <input
            type="text"
            value={enteredName}
            onChange={dishNameChangeHandler}
          />
        </div>
        <div className={styles.form__control}>
          <label>Preparation time</label>
          <TimeDurationInput
            value={enteredPreparationTime}
            onChange={preparationTimeChangeHandler}
          />
          {/* <input
          type="time"
          value={enteredPreparationTime}
          onChange={preparationTimeChangeHandler}
        /> */}
        </div>
        <div className={styles.form__control}>
          <label>Dish type</label>
          <select onChange={dishTypeChangeHandler}>
            <option hidden disabled selected value>
              {" "}
              - select a type -{" "}
            </option>
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="sandwich">Sandwich</option>
          </select>
        </div>
        {selectedType === "pizza" && (
          <>
            <div className={styles.form__control}>
              <label>Number of slices</label>
              <input
                type="number"
                min="1"
                value={enteredNoOfSlices}
                onChange={numberOfSlicesChangeHandler}
              />
            </div>
            <div className={styles.form__control}>
              <label>Diameter</label>
              <input
                type="float"
                value={enteredDiameter}
                onChange={diameterChangeHandler}
              />
            </div>
          </>
        )}
        {selectedType === "soup" && (
          <>
            <div className={styles.form__control}>
              <label>Spiciness scale</label>
              <input
                type="range"
                min="1"
                max="10"
                value={selectedSpiciness}
                onChange={spicinessChangeHandler}
              />
            </div>
          </>
        )}

        {selectedType === "sandwich" && (
          <>
            <div className={styles.form__control}>
              <label>Slices of bread</label>
              <input
                type="number"
                min="1"
                value={enteredSlicesofBread}
                onChange={slicesOfBreadChangeHandler}
              />
            </div>
          </>
        )}
      </div>
      <div className={styles.form__actions}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default DishForm;
