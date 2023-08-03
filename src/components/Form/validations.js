export const validate = (inputName, inputValue, totalValidation, durationData) => {

    const errors = {}

    if (totalValidation && durationData) {
        const { name, difficulty, duration, season, countries } = totalValidation;
        const { hours, minutes } = durationData;

        if (!name.length) {
            errors.name = "This field cannot be empty.";
        } else {
            if (name.length <= 2) errors.name = "Name of activity must be greater than 2 letters.";
            if (name.length > 30) errors.name = "Name of activity is too long.";
            if (!/^[A-Za-z\s]+$/.test(name)) errors.name = "This field is only for letters.";
        }

        if (!difficulty.length) errors.difficulty = "This field cannot be empty.";

        if (!hours.length) errors.hours = "This fields cannot be empty.";
        if (!minutes.length) errors.minutes = "This field cannot be empty.";
        if (duration === "00:00") errors.duration = "Duration cannot be 00:00";

        if (!season.length) errors.season = "This field cannot be empty.";

        if (!countries.length) errors.countries = "You must select at leat one country.";
        return errors
    }

    if (inputName === "name") {
        if (inputValue.trim() === "") {
            errors[inputName] = "This field cannot be empty.";
        } else {
            if (inputValue.length <= 2)
                errors[inputName] = "Name of activity must be greater than 2 letters.";
            if (inputValue.length > 30)
                errors[inputName] = "Name of activity is too long.";
            if (!/^[A-Za-z\s]+$/.test(inputValue))
                errors[inputName] = "This field is only for letters.";
        }
    }

    if (inputName === "difficulty") {
        if (!inputValue.length) {
            errors[inputName] = "This field cannot be empty.";
            return errors
        }
        if (inputValue >= 6 || inputValue <= 0) errors[inputName] = "Error setting the difficulty.";
    }

    if (inputName === "hours") {
        if (inputValue.trim() === "") {
            errors[inputName] = "Hours cannot be empty.";
            errors.duration = "";
        } else {
            if (inputName === "hours" && inputValue === "00") {
                errors[inputName] = "Duration has to be at leat 01 hour";
                errors.duration = "";
            }
            if (inputName === "hours" && inputValue < 0 || inputValue >= 25) {
                errors[inputName] = "Error setting the duration.";
                errors.duration = "";
            }
        }
    }

    if (inputName === "minutes") {
        if (inputValue.trim() === "") {
            errors[inputName] = "Minutes cannot be empty.";
        } else {
            if (inputValue < 0 || inputValue >= 60) {
                errors[inputName] = "Error setting the duration.";
                errors.duration = "";
            }
        }
    }

    if (inputName === "season") {
        if (!inputValue.length) {
            errors[inputName] = "This field cannot be empty.";
            return errors
        }
        console.log(inputValue);
    }

    return errors
};