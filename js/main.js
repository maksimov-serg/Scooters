/* Создаем префикс +7, даже если вводят 8 или 9 */
const prefixNumber = (str) => {
  /* если вводят семерку, добавляем ей скобку */
  if (str === "7") {
    return "7 (";
  }
  /* если вводят восьмерку, ставим вместо нее +7 ( */
  if (str === "8") {
    return "+7 (";
  }
  /* если пишут девятку, заменяем на +7 (9  */
  if (str === "9") {
    return "7 (9";
  }
  /* в других случаях просто 7 (  */
  return "7 (";
}; /* профикс в любом раскладе будет +7 () */

/* Ловим события ввода в любом поле */
document.addEventListener("input", (e) => {
  /* Проверяем, что это поле имеет класс phone-mask */
  if (e.target.classList.contains("phone-mask")) {
    /* поле с телефоном помещаем в переменную input */
    const input = e.target;
    /* вставляем плюс в начале номера */
    const value = input.value.replace(/\D+/g, "");
    /* длинна номера 11 символов */
    const numberLength = 11;

    /* Создаем переменную, куда будем записывать номер */
    let result;
    /* Если пользователь ввел 8... */
    if (input.value.includes("+8") || input.value[0] === "8") {
      /* Стираем восьмерку */
      result = "";
    } else {
      /* Оставляем плюсик в поле */
      result = "+";
    }

    /* Запускаем цикл, где переберем каждую цифру от 0 до 11 */
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          /* в самом начале ставим префикс +7 ( */
          result += prefixNumber(value[i]);
          continue;
        case 4:
          /* добавляем после "+7 (" круглую скобку ")" */
          result += ") ";
          break;
        case 7:
          /* дефис после 7 символа */
          result += "-";
          break;
        case 9:
          /* еще дефис  */
          result += "-";
          break;
        default:
          break;
      }
      /* на каждом шаге цикла добавляем новую цифру к номеру */
      result += value[i];
    }
    /* итог: номер в формате +7 (999) 123-45-67 */
    input.value = result;
  }
});

const refs = {
  openModalBtns: document.querySelectorAll('[data-action="open-modal"]'),
  closeModalBtns: document.querySelectorAll('[data-action="close-modal"]'),
  backdrop: document.querySelector(".js-backdrop"),
};

refs.openModalBtns.forEach((btn) => btn.addEventListener("click", onOpenModal));
refs.closeModalBtns.forEach((btn) =>
  btn.addEventListener("click", onCloseModal)
);
refs.backdrop.addEventListener("click", onBackdropClick);

function onOpenModal() {
  window.addEventListener("keydown", onEscKeyPress);
  document.body.classList.add("show-modal");
}

function onCloseModal() {
  window.removeEventListener("keydown", onEscKeyPress);
  document.body.classList.remove("show-modal");
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    document.body.classList.remove("show-modal");
  }
}

function onEscKeyPress(even) {
  console.log(even);
  if (even.code === "Escape") {
    onCloseModal();
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const validation = new JustValidate(form, {
      errorFieldCssClass: "is-invalid",
      successFieldCssClass: "is-valid", // Если нужно добавить успешный стиль
    });

    // Если в форме есть поле userphone — добавляем валидацию телефона
    if (form.querySelector("[name='userphone']")) {
      validation.addField("[name='userphone']", [
        {
          rule: "required",
          errorMessage: "Укажите телефон",
        },
        {
          rule: "customRegexp",
          value: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
          errorMessage: "Введите корректный номер телефона",
        },
      ]);
    }

    // Если в форме есть поле email — добавляем валидацию email
    if (form.querySelector("[name='email']")) {
      validation.addField("[name='email']", [
        {
          rule: "required",
          errorMessage: "Введите ваш email",
        },
        {
          rule: "email",
          errorMessage: "Введите корректный email",
        },
      ]);
    }

    // Отключаем стандартную отправку формы
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Останавливаем стандартный submit
      validation.revalidate().then((isValid) => {
        if (isValid) {
          console.log("Форма успешно отправлена!");
          form.submit(); // Отправляем форму, если валидация пройдена
        } else {
          console.log("Ошибка валидации!");
        }
      });
    });

    // Слушаем ошибки на полях

    // Очищаем ошибки при успешной валидации
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.querySelector(".contact-form-checkbox");
  const submitButton = document.querySelector(
    ".application .application-button"
  );
  function toggleSubmitButton() {
    submitButton.disabled = !checkbox.checked;
  }
  toggleSubmitButton();
  checkbox.addEventListener("change", toggleSubmitButton);
});
document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.querySelector(".contact-form-checkbox-modal");
  const submitButton = document.querySelector(".modal-btn-app");
  function toggleSubmitButton() {
    submitButton.disabled = !checkbox.checked;
  }
  toggleSubmitButton();
  checkbox.addEventListener("change", toggleSubmitButton);
});
