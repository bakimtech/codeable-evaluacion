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
    biografiaError.textContent = isValid ? "" : "Minimo 100 caracteres.";
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
        body: JSON.stringify(formData, null, 2),
      });

      const result = await response.json();
      const responseDiv = document.querySelector(".form__wrapper");
      const pre = document.createElement("pre");
      const code = document.createElement("code");

      code.textContent = JSON.stringify(result, null, 2);
      responseDiv.appendChild(pre);
      pre.appendChild(code);
      responseDiv.after(pre);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  loadFromLocalStorage();
});
