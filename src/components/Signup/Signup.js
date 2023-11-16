import React, { useEffect, useRef, useState } from "react";
import {
  Paper,
  Typography,
  TextForm,
  AlbaButton,
  CheckboxForm,
} from "@platform/service-ui-libraries";
import "./Signup.scss";
export default function Signup() {
  const validateFields = useRef([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [termsChecked, setTermsChecked] = useState(false);
  const [toggleCheckboxBorder, setToggleCheckboxBorder] = useState(false);

  const handleNameValidation = (inputData) => {
    if (inputData.length < 5) {
      return "Name must be of atleast 5 characters";
    }
  };

  const handleEmailValidation = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return "Email is invalid!";
    }
  };

  const handleUsernameValidation = (username) => {
    let usernameIsValid = true;
    if (username.length <= 6 || username.length >= 30) usernameIsValid = false;
    const startsWithAlphanumeric = /^[a-zA-Z0-9]/.test(username);
    const containsOnlyValidCharacters = /^[a-zA-Z0-9._]+$/.test(username);
    usernameIsValid = startsWithAlphanumeric && containsOnlyValidCharacters;

    if (!/^[a-zA-Z0-9]/.test(username)) usernameIsValid = false;

    if (!usernameIsValid) return "Username is invalid!";
  };

  const validatePassword = (value) => {
    let passwordIsValid = true;
    if (value.length < 8 || value.length > 30) passwordIsValid = false;
    const digitRegex = /\d/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const whitespaceRegex = /\s/;

    if (
      !passwordIsValid ||
      !digitRegex.test(value) ||
      !uppercaseRegex.test(value) ||
      !lowercaseRegex.test(value) ||
      !specialCharRegex.test(value) ||
      whitespaceRegex.test(value)
    ) {
      return false;
    }
    return true;
  };
  const handlePasswordValidation = (confirmPasswordValue) => {
    if (
      !validatePassword(confirmPasswordValue) ||
      !(formData.password === confirmPasswordValue)
    )
      return "Password does not match";
  };

  const validateProfileForm = () => {
    const resultData = validateFields.current.map((ref,index) => {
      console.log('ref',index,'and ref is',ref)
      if (!ref) return true;
      else return ref?.checkValidation();
    });

    return resultData.every(Boolean);
  };

  const handleSave = () => {
    if (validateProfileForm()) {
      console.log("done");
      setToggleCheckboxBorder(false)
    } else {
      console.log('some problem occured!')
      setToggleCheckboxBorder(true);
    }
  };

  return (
    <div className="__signup">
      <div className="__signup__content">
        <div className="__signup__title">
          <Typography variant="h3" component="h2">
            Signup
          </Typography>
        </div>

        {/* Form */}
        <div className="__signup__form__wrapper">
          <div className="__signup__name__wrapper">
            <div className="__signup__body">
              <TextForm
                validationsDetail={{
                  validations: {
                    required: true,
                    whiteSpace: true,
                  },
                }}
                validationFunc={handleNameValidation}
                ref={(elem) => {
                  console.log(elem);
                  validateFields.current[0] = elem;
                }}
                id="outlined-helperText"
                label="First Name"
                fieldValue={formData.firstName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstName: e,
                  })
                }
                variant="filled"
                placeholder="eg. John"
              />
            </div>
            <div className="__signup__body">
              <TextForm
                validationsDetail={{
                  validations: {
                    required: true,
                    whiteSpace: true,
                  },
                }}
                validationFunc={handleNameValidation}
                ref={(elem) => {
                  validateFields.current[1] = elem;
                }}
                id="outlined-helperText"
                label="Last Name"
                fieldValue={formData.lastName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastName: e,
                  })
                }
                variant="filled"
                placeholder="eg. Doe"
              />
            </div>
          </div>

          <div className="__signup__body">
            <TextForm
              validationsDetail={{
                validations: {
                  required: true,
                  whiteSpace: true,
                },
              }}
              validationFunc={handleEmailValidation}
              ref={(elem) => {
                validateFields.current[2] = elem;
              }}
              id="outlined-helperText"
              label="Email"
              fieldValue={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e,
                })
              }
              variant="filled"
              placeholder="eg. Johndoe@gmail.com"
            />
          </div>

          <div className="__signup__body">
            <TextForm
              validationsDetail={{
                validations: {
                  required: true,
                  whiteSpace: true,
                },
              }}
              validationFunc={handleUsernameValidation}
              ref={(elem) => {
                validateFields.current[3] = elem;
              }}
              id="outlined-helperText"
              label="Username"
              fieldValue={formData.username}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e,
                })
              }
              variant="filled"
              placeholder="eg. JohnDoe88"
            />
          </div>

          <div className="__signup__password__wrapper">
            <div className="__signup__body">
              <TextForm
                validationsDetail={{
                  validations: {
                    required: true,
                    whiteSpace: true,
                  },
                }}
                validationFunc={validatePassword}
                ref={(elem) => {
                  validateFields.current[4] = elem;
                }}
                id="outlined-helperText"
                label="Password"
                fieldValue={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e,
                  })
                }
                variant="filled"
                placeholder="Password"
                type="password"
              />
            </div>

            <div className="__signup__body">
              <TextForm
                validationsDetail={{
                  validations: {
                    required: true,
                    whiteSpace: true,
                  },
                }}
                validationFunc={handlePasswordValidation}
                ref={(elem) => {
                  validateFields.current[5] = elem;
                }}
                id="outlined-helperText"
                label="Confirm Password"
                fieldValue={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e,
                  })
                }
                variant="filled"
                placeholder="Confirm Password"
                type="password"
              />
            </div>
          </div>
        </div>

        <div
          style={{ width: "100%", height: "1px", backgroundColor: "black" }}
        ></div>

        {/* form end */}
        {/* Terms and conditions */}
        <div className="__signup__checkbox">
          <CheckboxForm
            ref={(elem) => {
              validateFields.current[6] = elem;
            }}
            validationsDetail={{
              validations: {
                required: true,
              },
            }}
            //style={{ color: toggleCheckboxBorder ? "red" : "black" }}
            
            id="outlined-helperText"
            label="I agree to Albanero's Terms of Use and Privacy Policy. I agree to subscribe Albanero's newsletter for relevant upgrades and policy changes."
            fieldValue={termsChecked}
            onChange={(e) => {
              setTermsChecked(e);
              setToggleCheckboxBorder(!e);
            }}
          />{" "}
        </div>

        {/* {!termsChecked&&<p style={{color:'red'}}>Please check the terms and conditions</p>} */}
        {/* Albabutton must contain id */}
        <AlbaButton
          variant="success"
          onClick={handleSave}
          id="confirm-form-submission"
        >
          Next
        </AlbaButton>
      </div>
    </div>
  );
}
