'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const modalWrap = document.querySelector('.modal');
    const modalDialog = document.querySelector('.modal-dialog');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const burgerBtn = document.getElementById('burger');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const sendButton = document.querySelector('#send');
    const modalTitle = document.querySelector('.modal-title');

    const questions = [
        {
            question: "Какого цвета бургер вы хотите?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Чёрный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса вы хотите котлету?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    let count = -100;

    modalDialog.style.top = count + '%';

    const animateModal = () => {
        modalDialog.style.top = count + '%';
        count += 3;

        if (count < 0) {
            requestAnimationFrame(animateModal);
        } else {
            count = -100;
        }
    }

    burgerBtn.style.display = 'none';
    
    let clientWidth = document.documentElement.clientWidth;

    if (clientWidth < 768) {
        burgerBtn.style.display = 'flex';
    } else {
        burgerBtn.style.display = 'none';
    }

    window.addEventListener('resize', function () {
        clientWidth = document.documentElement.clientWidth;

        if (clientWidth < 768) {
            burgerBtn.style.display = 'flex';
        } else {
            burgerBtn.style.display = 'none';
        }
    });

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.add('active');
        modalBlock.classList.add('d-block');
        playTest();
    });

    btnOpenModal.addEventListener('click', () => {
        requestAnimationFrame(animateModal);
        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
        burgerBtn.classList.remove('active');
    });

    document.addEventListener('click', function (event) {
        let target = event.target;
        if (
            !event.target.closest('.modal-dialog') &&
            !event.target.closest('#btnOpenModal') &&
            !event.target.closest('#burger')
        ) {
            modalBlock.classList.remove('d-block');
            burgerBtn.classList.remove('active');
        }
    });

    const playTest = () => {
        const finalAnswers = [];
        const obj = {};

        let numberQuestion = 0;

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
                
                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${answer.url}" alt="burger">
                        <span>${answer.title}</span>
                    </label>
                `;

                formAnswers.appendChild(answerItem);
            });
        }
        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = '';

            switch (true) {
                case (numberQuestion === 0):
                    questionTitle.textContent = `${questions[indexQuestion].question}`;
                    renderAnswers(indexQuestion);
                    nextButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
                    prevButton.classList.add('d-none');
                    break;
                case (numberQuestion >= 0 && numberQuestion <= questions.length - 1):
                    questionTitle.textContent = `${questions[indexQuestion].question}`;
                    renderAnswers(indexQuestion);
                    nextButton.classList.remove('d-none');
                    prevButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
                    break;
                case (numberQuestion === questions.length):
                    questionTitle.textContent = '';
                    modalTitle.textContent = '';
                    nextButton.classList.add('d-none');
                    prevButton.classList.add('d-none');
                    sendButton.classList.remove('d-none');
                    formAnswers.innerHTML = `
                    <div class="form-group">
                        <label for="numberPhone">Введите свой номер телефона</label>
                        <input type="phone" class="form-control" id="numberPhone">
                    </div>
                    `;

                    const numberPhone = document.getElementById('numberPhone');
                    numberPhone.addEventListener('input', (event) => {
                        event.target.value = event.target.value.replace(/[^0-9+-]/, '');
                    });
                    break;
                case (numberQuestion === questions.length + 1):
                    formAnswers.textContent = 'Спасибо за пройденный тест!';
                    sendButton.classList.add('d-none');

                    for (let key in obj) {
                        let newObj = {};
                        newObj[key] = obj[key];
                        finalAnswers.push(newObj);
                    }

                    console.log(finalAnswers);
                    
                    setTimeout(() => {
                        modalBlock.classList.remove('d-block');
                        burgerBtn.classList.remove('active');
                    }, 2000);
                    break;
            }
        }
        renderQuestions(numberQuestion);

        const checkAnswer = () => {
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
            
            inputs.forEach((input, index) => {
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                }

                if (numberQuestion === questions.length) {
                    obj['Номер телефона'] = input.value;
                }
            });

            // finalAnswers.push(obj);
        }

        nextButton.onclick =  () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        };
        
        prevButton.onclick =  () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        };

        sendButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        }
    }
});