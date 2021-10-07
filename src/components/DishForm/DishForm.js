import React, { useState } from "react";
// import { TimeDurationInput } from "react-time-duration-input";
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

  async function submitHandler(event) {
    event.preventDefault();

    let dishData = "";

    if (selectedType === "pizza") {
      dishData = {
        name: enteredName,
        preparation_time: enteredPreparationTime,
        type: selectedType,
        no_of_slices: parseInt(enteredNoOfSlices),
        diameter: parseFloat(enteredDiameter),
      };
    } else if (selectedType === "soup") {
      dishData = {
        name: enteredName,
        preparation_time: enteredPreparationTime,
        type: selectedType,
        spiciness_scale: parseInt(selectedSpiciness),
      };
    } else if (selectedType === "sandwich") {
      dishData = {
        name: enteredName,
        preparation_time: enteredPreparationTime,
        type: selectedType,
        slices_of_bread: parseInt(enteredSlicesofBread),
      };
    }

    const response = await fetch(
      "https://frosty-wood-6558.getsandbox.com:443/dishes",
      {
        method: "POST",
        body: JSON.stringify(dishData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h1 className={styles.form__heading}>Dish form</h1>
      <div className={styles.form__controls}>
        <div className={styles.form__control}>
          <label>Dish name</label>
          <input
            type="text"
            placeholder="enter a dish name"
            value={enteredName}
            onChange={dishNameChangeHandler}
          />
        </div>
        <div className={styles.form__control}>
          <label>Preparation time</label>
          {/* <TimeDurationInput
            value={enteredPreparationTime}
            onChange={preparationTimeChangeHandler}
          /> */}{" "}
          <input
            type="text"
            pattern="[0-9][0-9]:[0-5][0-9]:[0-5][0-9]"
            placeholder="00:00:00"
            value={enteredPreparationTime}
            onChange={preparationTimeChangeHandler}
          />
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
                min="0"
                placeholder="0"
                value={enteredNoOfSlices}
                onChange={numberOfSlicesChangeHandler}
              />
            </div>
            <div className={styles.form__control}>
              <label>Diameter</label>
              <input
                type="float"
                placeholder="0"
                min="0"
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
                min="0"
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
