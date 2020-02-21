const checkNumberInputs = (selector) => {
    const nunInputs = document.querySelectorAll(selector);

    nunInputs.forEach(item => {
        item.addEventListener('input', ()=> {
            item.value = item.value.replace(/\D/, "");  //D = всe НЕ цифры
        });
    });
};

export default checkNumberInputs;