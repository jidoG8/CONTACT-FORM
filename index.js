// Get the form element
const form = document.querySelector(".contact-form");

// retrieve errorClass, errorMsg & inputfield & give them values
function showError(errorClass, message, input) {
	const errorSpan = document.querySelector(errorClass);
	errorSpan.textContent = message;
	errorSpan.style.display = "block";
	errorSpan.style.color = "#E27474";
	input.style.border = "2px solid #E27474";
}

//clear error message
function clearError(errorClass, input) {
	const errorSpan = document.querySelector(errorClass);
	errorSpan.textContent = "";
	errorSpan.style.display = "none";
	input.style.border = "";
}

// validate: (first name, last name, message)
function validateTextField(input, errorClass) {
	if (input.value.trim() === "") {
		showError(errorClass, "This field is required", input);
		return false;
	}
	clearError(errorClass, input);
	return true;
}

// Function to validate email
function validateEmail(input) {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (input.value.trim() === "") {
		showError(".invalid-email", "This field is required", input);
		return false;
	}
	if (!emailPattern.test(input.value)) {
		showError(".invalid-email", "Please enter a valid email", input);
		return false;
	}
	clearError(".invalid-email", input);
	return true;
}

// Function to validate radio buttons
function validateRadio() {
	const radios = document.querySelectorAll('input[name="query-type"]');
	let isChecked = false;

	for (let i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			isChecked = true;
			break;
		}
	}

	if (!isChecked) {
		const errorSpan = document.querySelector(".fname-input-error");
		errorSpan.textContent = "Please select a query type";
		errorSpan.style.display = "block";
		errorSpan.style.color = "#E27474";
		return false;
	}
	return true;
}

// Function to validate checkbox
function validateCheckbox(checkbox) {
	if (!checkbox.checked) {
		const errorSpan = document.querySelector(".required-consent");
		errorSpan.textContent = "You must consent to be contacted";
		errorSpan.style.display = "block";
		errorSpan.style.color = "#E27474";
		return false;
	}
	return true;
}

// Add click event to radio buttons for background color
const radioButtons = document.querySelectorAll('input[name="query-type"]');

radioButtons.forEach(function (radio) {
	radio.addEventListener("click", function () {
		// Remove background from all radio options
		const allOptions = document.querySelectorAll(".radio-option");
		allOptions.forEach(function (option) {
			option.style.backgroundColor = "";
		});

		// Add light green background to selected option
		const selectedOption = this.closest(".radio-option");
		selectedOption.style.backgroundColor = "hsl(148, 38%, 91%)";

		// Clear radio error message
		const errorSpan = document.querySelector(".fname-input-error");
		errorSpan.textContent = "";
		errorSpan.style.display = "none";
	});
});

// Clear errors on input
document.getElementById("fname").addEventListener("input", function () {
	clearError(".invalid-fname", this);
});

document.getElementById("lname").addEventListener("input", function () {
	clearError(".invalid-lname", this);
});

document.getElementById("email").addEventListener("input", function () {
	clearError(".invalid-email", this);
});

document.getElementById("message").addEventListener("input", function () {
	clearError(".required-comments", this);
});

document.getElementById("consent").addEventListener("change", function () {
	const errorSpan = document.querySelector(".required-consent");
	errorSpan.textContent = "";
	errorSpan.style.display = "none";
});

// When form is submitted
form.addEventListener("submit", function (event) {
	event.preventDefault();

	const firstName = document.getElementById("fname");
	const lastName = document.getElementById("lname");
	const email = document.getElementById("email");
	const message = document.getElementById("message");
	const consent = document.getElementById("consent");

	const isFirstNameValid = validateTextField(firstName, ".invalid-fname");
	const isLastNameValid = validateTextField(lastName, ".invalid-lname");
	const isEmailValid = validateEmail(email);
	const isRadioValid = validateRadio();
	const isMessageValid = validateTextField(message, ".required-comments");
	const isConsentValid = validateCheckbox(consent);

	// Check if all fields are valid
	if (
		isFirstNameValid &&
		isLastNameValid &&
		isEmailValid &&
		isRadioValid &&
		isMessageValid &&
		isConsentValid
	) {
		

		// Show feedback message
		const feedback = document.querySelector(".feedback");
		if (feedback) {
			feedback.style.display = "block";

			// Hide feedback after 5 seconds
			setTimeout(function () {
				feedback.style.display = "none";
			}, 5000);
		}

		form.reset(); // Clear the form

		// Clear radio button background colors
		const allOptions = document.querySelectorAll(".radio-option");
		allOptions.forEach(function (option) {
			option.style.backgroundColor = "";
		});
	}
});
