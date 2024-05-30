/*
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const nameInput = document.getElementById("name");
  const nicknameInput = document.getElementById("nickname");
  const biographyInput = document.getElementById("biography");
  const passwordInput = document.getElementById("password");
  const submitBtn = document.getElementById("submitBtn");
  const responseDiv = document.getElementById("response");

  const nameError = document.getElementById("nameError");
  const nicknameError = document.getElementById("nicknameError");
  const biographyError = document.getElementById("biographyError");
  const passwordError = document.getElementById("passwordError");

  const validators = {
    name: (value) => value.trim() !== "",
    nickname: (value) => /^[a-zA-Z0-9]{3,10}$/.test(value),
    biography: (value) => value.trim() === "" || value.trim().length >= 100,
    password: (value) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value),
  };

  const errors = {
    name: "Es obligatorio.",
    nickname: "Entre 3 y 10 caracteres alfanuméricos.",
    biography: "Mínimo 100 caracteres.",
    password:
      "Debe tener al menos 8 caracteres, una letra mayúscula y un número.",
  };

  function validateField(input, validator, errorElement) {
    const isValid = validator(input.value);
    errorElement.textContent = isValid ? "" : errors[input.name];
    return isValid;
  }

  function saveToLocalStorage() {
    localStorage.setItem("name", nameInput.value);
    localStorage.setItem("nickname", nicknameInput.value);
    localStorage.setItem("biography", biographyInput.value);
  }

  function loadFromLocalStorage() {
    if (localStorage.getItem("name")) {
      nameInput.value = localStorage.getItem("name");
    }
    if (localStorage.getItem("nickname")) {
      nicknameInput.value = localStorage.getItem("nickname");
    }
    if (localStorage.getItem("biography")) {
      biographyInput.value = localStorage.getItem("biography");
    }
  }

  function checkFormValidity() {
    const isFormValid = [...form.elements].every((input) => {
      if (input.type !== "submit" && input.type !== "password") {
        const validator = validators[input.name];
        const errorElement = document.getElementById(`${input.name}Error`);
        return validateField(input, validator, errorElement);
      }
      return true;
    });
    submitBtn.disabled = !isFormValid;
  }

  nameInput.addEventListener("input", () => {
    validateField(nameInput, validators.name, nameError);
    saveToLocalStorage();
    checkFormValidity();
  });

  nicknameInput.addEventListener("input", () => {
    validateField(nicknameInput, validators.nickname, nicknameError);
    saveToLocalStorage();
    checkFormValidity();
  });

  bioInput.addEventListener("input", () => {
    validateField(biographyInput, validators.biography, biographyError);
    saveToLocalStorage();
    checkFormValidity();
  });

  passwordInput.addEventListener("input", () => {
    validateField(passwordInput, validators.password, passwordError);
    checkFormValidity();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = {
      name: nameInput.value,
      nickname: nicknameInput.value,
      biography: biographyInput.value,
      password: passwordInput.value,
    };

    fetch("https://mocktarget.apigee.net/echo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        responseDiv.textContent = JSON.stringify(data, null, 2);
      })
      .catch((error) => {
        responseDiv.textContent = `Error: ${error.message}`;
      });
  });

  loadFromLocalStorage();
  checkFormValidity();
});
*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("demoForm");
  const nombre = document.getElementById("name");
  const apodo = document.getElementById("nickname");
  const biografia = document.getElementById("biography");
  const password = document.getElementById("password");
  const submitBtn = document.getElementById("submitBtn");

  const nombreError = document.getElementById("nameError");
  const apodoError = document.getElementById("nicknameError");
  const biografiaError = document.getElementById("biographyError");
  const passwordError = document.getElementById("passwordError");

  function validateField(field, errorDiv, isValid) {
    if (isValid) {
      errorDiv.textContent = "";
      saveToLocalStorage(field);
    } else {
      submitBtn.disabled = true;
    }
  }

  function saveToLocalStorage(field) {
    localStorage.setItem(field.id, field.value);
    checkFormValidity();
  }

  function loadFromLocalStorage() {
    if (localStorage.getItem("nombre")) {
      nombre.value = localStorage.getItem("nombre");
    }
    if (localStorage.getItem("apodo")) {
      apodo.value = localStorage.getItem("apodo");
    }
    if (localStorage.getItem("biografia")) {
      biografia.value = localStorage.getItem("biografia");
    }
    checkFormValidity();
  }

  function checkFormValidity() {
    const isFormValid =
      nombre.value.trim() &&
      apodo.value.trim().length >= 3 &&
      apodo.value.trim().length <= 10 &&
      /^[a-zA-Z0-9]+$/.test(apodo.value) &&
      (biografia.value.trim().length === 0 ||
        biografia.value.trim().length >= 100) &&
      password.value.trim().length >= 8 &&
      /[A-Z]/.test(password.value) &&
      /[0-9]/.test(password.value);

    submitBtn.disabled = !isFormValid;
  }

  nombre.addEventListener("input", () => {
    validateField(nombre, nombreError, nombre.value.trim());
  });

  apodo.addEventListener("input", () => {
    const isValid =
      apodo.value.trim().length >= 3 &&
      apodo.value.trim().length <= 10 &&
      /^[a-zA-Z0-9]+$/.test(apodo.value);
    apodoError.textContent = isValid
      ? ""
      : "Entre 3 y 10 caracteres alfanuméricos.";
    validateField(apodo, apodoError, isValid);
  });

  biografia.addEventListener("input", () => {
    const isValid =
      biografia.value.trim().length === 0 ||
      biografia.value.trim().length >= 100;
    biografiaError.textContent = isValid ? "" : "AMinimo 100 caracteres.";
    validateField(biografia, biografiaError, isValid);
  });

  password.addEventListener("input", () => {
    const isValid =
      password.value.trim().length >= 8 &&
      /[A-Z]/.test(password.value) &&
      /[0-9]/.test(password.value);
    passwordError.textContent = isValid
      ? ""
      : "Al menos 8 caracteres, una letra mayúscula y un número.";
    checkFormValidity();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      nombre: nombre.value,
      apodo: apodo.value,
      biografia: biografia.value,
    };

    try {
      const response = await fetch("https://mocktarget.apigee.net/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      const responseDiv = document.getElementById("serverResponse");
      responseDiv.innerHTML = `<div class="success">Respuesta del servidor: ${JSON.stringify(
        result
      )}</div>`;
    } catch (error) {
      console.error("Error:", error);
    }
    registrationForm;
  });

  loadFromLocalStorage();
});
