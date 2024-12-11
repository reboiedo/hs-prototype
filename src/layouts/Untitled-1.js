// Mui
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";

// Framer
import { countries } from "https://framer.com/m/Countries-ZLD3.js@UYjhXmhAp7I1p5jxflxn";
import { addPropertyControls, ControlType } from "framer";

// React
import { utm } from "url-utm-params";
import { FileUploader } from "react-drag-drop-files";
import { useForm } from "react-hook-form";
import { useState, useMemo, useEffect, useRef } from "react";

// Custom Component
import Input from "https://framer.com/m/InputField-UCGG.js@GtlrOZs9bRAGrtZLCBPY";
import FileUpload from "https://framer.com/m/FileUpload-D2Sj.js@FqraJKndjaavcZrCh0dr";
import SelectOption from "https://framer.com/m/SelectField-JCE8.js@8fHTLxw6CR3pPRS5LiwV";
import SelectMultipleOption from "https://framer.com/m/SelectMultipleField-2x68.js@pjz8vglQVNRC7vSBtszK";
import Button from "https://framer.com/m/Button-uOUQ.js@pFmUFRlt157rxgKmDiX0";
import PhoneInput from "https://framer.com/m/PhoneField-3z5F.js@dfUKVasdKnqcsVwJmH4N";
import CustomCheckbox from "https://framer.com/m/Checkbox-ZfkO.js@FDgZRJAxPgh3O7SJwbD6";
import {
  CampusButton,
  Form,
  Group,
  H2,
  H5,
  Link,
  PolicyGroup,
  SubmitButton,
  UploadFile,
  GroupCampus,
  VerticleLine,
  UploadFileText,
  Section,
  Stack,
  PSmall,
} from "https://framer.com/m/FormStyle-ojKI.js@CSb0AtlvbqRKWQwbQ0bl";

const CONSTANT = {
  ERROR: {
    REQUIRED: "* This is required field",
    INVALID_EMAIL: "Invalid email address",
  },
};

export function ApplicationForm(props) {
  let index = 0;
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    control,
  } = useForm();
  const [telNumber, setTelNumber] = useState("");
  const [telErorr, setTelErorr] = useState(false);
  const [sendingForm, setSendingForm] = useState(false);
  const [interests, setInterests] = useState([]);
  const [interestsError, setInterestsError] = useState(null);

  // Update data from CMS Later
  const FORMSPARK_ACTION_URL = props.formSpark;
  const HARBOUR_SPACE_API = "https://harbour.space/api/v1/blog_file";
  const WOMAN_IN_TECH_URL = props.onSubmit;
  let defaultPhoneCountry = "";

  if (props.city === "Bangkok" && !props.campus) {
    defaultPhoneCountry = "TH";
  } else {
    defaultPhoneCountry = "ES";
  }

  const handleTelChange = (newValue) => {
    setTelErorr(false);
    setTelNumber(newValue);
  };

  const topicIndex = () => {
    index += 1;
    return index + ".";
  };

  const checkOtherValidations = () => {
    if (!interests || interests.length <= 0) {
      setInterestsError({
        message: CONSTANT.ERROR.REQUIRED,
      });
    } else {
      setInterestsError(null);
    }

    if ((props.telRequired || telNumber) && !matchIsValidTel(telNumber)) {
      setTelErorr(true);
    } else {
      setTelErorr(false);
    }

    trigger(["firstName", "lastName", "email", "programme"]);
  };

  const postForm = async (data) => {
    console.log("start sending form...");
    fetch(FORMSPARK_ACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log("SUCCESS!");
        window.location.href = WOMAN_IN_TECH_URL;
      })
      .catch((e) => {
        console.log(e);
        setSendingForm(false);
      });
  };

  const onSubmit = (data) => {
    if (!sendingForm) {
      checkOtherValidations();
      const formData = {
        ...data,
        Account: props.account,
        Campaign: props.campaign,
        PageURL: window.location.href.split("?")[0],
        telNumber,
        study_interest: interests,
        ...utm(window.location.href),
      };

      if (!telErorr && !interestsError) {
        postForm(formData);
        setSendingForm(true);
      }
    }
  };

  return (
    <Form {...props} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap="40px">
        <H2>{props.cta}</H2>
        <Section>
          <Stack direction="column" gap="16px">
            <H5>{topicIndex()} Personal information</H5>
            <Group>
              <Input
                id="firstname"
                label="First Name"
                type="text"
                variant="outlined"
                fullWidth
                error={errors.firstName}
                {...register("firstName", {
                  required: CONSTANT.ERROR.REQUIRED,
                })}
              />
              <Input
                id="lastname"
                label="Last Name"
                type="text"
                variant="outlined"
                fullWidth
                error={errors.lastName}
                {...register("lastName", {
                  required: CONSTANT.ERROR.REQUIRED,
                })}
              />
            </Group>
            <PhoneInput
              defaultCountry={defaultPhoneCountry}
              currentValue={telNumber}
              onPhoneNoChange={handleTelChange}
              isError={telErorr}
            />
            <Input
              id="email"
              label="Email"
              type="text"
              variant="outlined"
              fullWidth
              error={errors.email}
              {...register("email", {
                required: CONSTANT.ERROR.REQUIRED,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: CONSTANT.ERROR.INVALID_EMAIL,
                },
              })}
            />
          </Stack>
        </Section>
        <Section>
          <Stack direction="column" gap="16px">
            <H5>{topicIndex()} I will be joining as a ...</H5>
            <Group>
              <SelectOption
                id="joining_as"
                label="Select one"
                fullWidth
                options={[
                  "Parent",
                  "Prospective student",
                  "Counsellor",
                  "School representative",
                  "Other",
                ]}
                error={errors.joining_as}
                {...register("joining_as", {
                  required: CONSTANT.ERROR.REQUIRED,
                })}
              />
            </Group>
            <H5>{topicIndex()} I will be attending ...</H5>
            <Group>
              <SelectOption
                id="attending"
                label="Select one"
                fullWidth
                options={["Physically on campus", "Online"]}
                error={errors.attending}
                {...register("attending", {
                  required: CONSTANT.ERROR.REQUIRED,
                })}
              />
            </Group>
            <H5>{topicIndex()} Which study area interest you?</H5>
            <Group>
              <SelectMultipleOption
                id="study_interest"
                label="Select multiple"
                control={control}
                fullWidth
                options={["Business", "Tech", "Design"]}
                error={interestsError}
                values={interests}
                setValues={setInterests}
              />
            </Group>
          </Stack>
        </Section>
        <Section>
          <Stack direction="column" gap="16px">
            <H5>
              {topicIndex()} What would you like to gain from the Open.Day?
            </H5>
            <Input
              id="expectations"
              label="Your answer here"
              type="text"
              variant="outlined"
              fullWidth
              error={errors.expectations}
              multiline
              rows={6}
              height="165px"
              {...register("expectations")}
            />
          </Stack>
        </Section>
        <Section>
          <Stack direction="row" gap="0px" alignItems="center">
            <CustomCheckbox
              key="subscribe"
              error={errors.subscribe}
              {...register("subscribe")}
            />
            <PSmall htmlFor="subscribe">
              I would like to recieve more info in the future
            </PSmall>
          </Stack>
          {errors.subscribe && (
            <FormHelperText error>{errors.subscribe.message}</FormHelperText>
          )}
          <Stack direction="row" gap="0px" alignItems="center">
            <CustomCheckbox
              key="policy"
              error={errors.policy}
              {...register("policy", {
                required: CONSTANT.ERROR.REQUIRED,
              })}
            />
            <PSmall htmlFor="policy">
              I consent to the{" "}
              <Link href="https://harbour.space/privacy-policy" target="_blank">
                privacy policy
              </Link>{" "}
              and{" "}
              <Link href="https://harbour.space/privacy-policy" target="_blank">
                terms and conditions
              </Link>
            </PSmall>
          </Stack>
          {errors.policy && (
            <FormHelperText error>{errors.policy.message}</FormHelperText>
          )}
        </Section>
        <Button
          type="submit"
          title={sendingForm ? "Sending" : "Submit"}
          onClick={() => checkOtherValidations()}
          disabled={sendingForm}
        ></Button>
      </Stack>
    </Form>
  );
}

ApplicationForm.defaultProps = {
  cta: "Start your Application",
};

addPropertyControls(ApplicationForm, {
  cta: {
    type: ControlType.String,
    title: "CTA",
  },
  city: {
    type: ControlType.String,
    title: "City",
  },
  campaign: {
    type: ControlType.String,
    title: "Campaign",
  },
  onSubmit: {
    type: ControlType.String,
    title: "On Submit",
  },
  formSpark: {
    type: ControlType.String,
    title: "FormSpark",
  },
  telRequired: {
    type: ControlType.Boolean,
    title: "Tel Required",
    defaultValue: true,
  },
});
