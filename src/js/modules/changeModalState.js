import checkNumberInputs from './checkNumberInputs';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');

    checkNumberInputs('#height');
    checkNumberInputs('#width');

    function bindActionToElements (event, element, property) {
        element.forEach((item, i) => {
            item.addEventListener(event, () => {
                // if (element.length > 1) {           //несколько елементов только у картинок окон
                //     state[property] = i;
                // } else {
                //     state[property] = item.value;   //только один елемент при вводе вручную цифр
                // }
                switch(item.nodeName) {
                    case 'SPAN' :
                        state[property] = i;
                        break;

                    case 'SELECT' :
                        state[property] = item.value;
                        break;

                    case 'INPUT' :
                        if(item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[property] = "Холодный" : state[property] = "Теплый";
                            element.forEach((box, j) => {
                                box.checked = false;    //нажатие на один, отжатие у другого
                                if (i === j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[property] = item.value;
                        }
                        break;
                }
                console.log(state);
            })
        });
    }

    bindActionToElements('click', windowForm, 'form');
    bindActionToElements('input', windowWidth, 'width');
    bindActionToElements('input', windowHeight, 'height');
    bindActionToElements('change', windowType, 'type');
    bindActionToElements('change', windowProfile, 'profile');

};

export default changeModalState;