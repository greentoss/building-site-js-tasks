import checkNumberInputs from './checkNumberInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');
          //phoneInputs = document.querySelectorAll('input[name="user_phone"]');

        checkNumberInputs('input[name="user_phone"]');

    const message = {
       loading: 'Loading...',
       success: 'Thank you, we will get in tutch with you soon',
       failure: 'oops, something went wrong, try again'
    };

    const postData = async (url, data) => {
       document.querySelector('.status').textContent = message.loading;
       let res = await fetch(url, {
           method: "POST",
           body: data
       });

       return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = ''
        })
    };

    const clearStateObj = (modalState) => {
        for (key in modalState) {
            // TODO: clear object of state
        }
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            if (item.getAttribute('data-calc') === "final") {   //в форме калькулятора добавляем к имени и телефону данные про окно
                for(let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then (res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove()
                    }, 5000);
                })
        });
    });

};

export default forms;