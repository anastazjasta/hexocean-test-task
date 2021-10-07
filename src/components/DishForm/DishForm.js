import React, { useState } from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
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

  const clearForm = () => {
    setenteredName("");
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
    <>
      <Modal title="Dish submitted!" message="a request has been sent" />
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
              required
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
              required
            />
          </div>
          <div className={styles.form__control}>
            <label>Dish type</label>
            <select onChange={dishTypeChangeHandler} required>
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
            </>
          )}
        </div>
        <div className={styles.form__actions}>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </>
  );
};

export default DishForm;
