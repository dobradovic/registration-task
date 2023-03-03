import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

import classes from "./index.module.scss";
import * as yup from "yup";
import { RegisterValidation } from "../../Validations/RegisterValidation";

export function Registration() {
  const [data, setData] = useState();
  const [gender, setGender] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/registrationLabels")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();

    let userData = { gender, firstName, lastName, email, password };

    // Todo, apply all regex rules from API
    let formData = {
      firstName,
      email,
    };

    const isValid = await RegisterValidation.isValid(formData);

    if (isValid) {
      fetch("http://localhost:8000/createUser", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => {
          alert("success");
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
      alert("Form is not valid...");
    }
  }

  return (
    <div className={classes.wrap}>
      <form>
        {data && (
          <>
            <h1 className={classes.wrap__title}>{data.RegistrationTitle}</h1>
            <p className={classes.wrap__description}>
              {data.RegistrationIntroductionText}
            </p>

            <span className={classes.wrap__gender}>
              {data.Salutation.FieldLabel}
            </span>
            <div className={classes.wrap__genderRadio}>
              {data.SalutationSource.map((item) => {
                return (
                  <div
                    key={item.Name}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <input
                      type="radio"
                      className="customRadio"
                      name="gender"
                      value={item.ID}
                      id={item.ID}
                    />
                    <label htmlFor={item.Name}>{item.Name}</label>
                  </div>
                );
              })}
            </div>

            <div className={classes.wrap__inputField}>
              <TextField
                fullWidth
                id="outlined-basic"
                className={classes.wrap__inputField}
                label={data.FirstName.FieldLabel}
                variant="outlined"
                maxLength={data.FirstName.MaxLength}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className={classes.wrap__inputField}>
              <TextField
                fullWidth
                id="outlined-basic"
                className={classes.wrap__inputField}
                label={data.LastName.FieldLabel}
                variant="outlined"
                maxLength={data.LastName.MaxLength}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={classes.wrap__inputField}>
              <TextField
                fullWidth
                type="email"
                id="outlined-basic"
                label={data.Email.FieldLabel}
                required={data.Email.IsRequired ? data.Email.IsRequired : ""}
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.wrap__inputField}>
              <TextField
                fullWidth
                type="password"
                id="outlined-basic"
                label={data.Password.FieldLabel}
                required={data.Email.IsRequired ? data.Email.IsRequired : ""}
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={classes.wrap__passwordInfo}>
              <span>Fur ein strakes password...</span>
              <ul>
                <li>text...</li>
                <li>text...</li>
                <li>text...</li>
                <li>text...</li>
              </ul>
            </div>

            <div className={classes.wrap__radioButtonWrapper}>
              <div className={classes.wrap__radioButton}>
                <input
                  type="checkbox"
                  id="first"
                  value={data.Newsletter.FieldLabel}
                />
                <label className={classes.wrap__checkboxLabel} htmlFor="first">
                  {data.Newsletter.FieldLabel}
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="second"
                  value={data.PrivacyPolicy.FieldLabel}
                />
                <label className={classes.wrap__checkboxLabel} htmlFor="second">
                  {data.PrivacyPolicy.FieldLabel}
                </label>
              </div>
              <div>
                <input type="checkbox" id="three" value="3" />
                <label className={classes.wrap__checkboxLabel} htmlFor="three">
                  three
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={classes.wrap__submitbutton}
              onClick={(e) => handleFormSubmit(e)}
            >
              {data.RegistrationSaveButtonLabel}
            </button>

            <a
              href={data.RegistrationLoginLink.url}
              className={classes.wrap__link}
            >
              {data.RegistrationLoginLinkLabel}
            </a>
          </>
        )}
      </form>
    </div>
  );
}

{
  /* <input
type="radio"
class="customRadio"
id="huey"
name="drone"
value="huey"
checked
/>
<label for="huey">Huey</label>
<input
type="radio"
class="customRadio"
id="huey1"
name="drone"
value="huey"
checked
/>
<label for="huey">Huey</label> */
}
