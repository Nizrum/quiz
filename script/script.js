'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const modalWrap = document.querySelector('.modal');
    const modalDialog = document.querySelector('.modal-dialog');
    const modalFooter = document.querySelector('.modal-footer');
    const modalHeader = document.querySelector('.modal-header');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const burgerBtn = document.getElementById('burger');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const sendButton = document.querySelector('#send');
    const modalTitle = document.querySelector('.modal-title');

    const firebaseConfig = {
        apiKey: "AIzaSyD9KikXfI5ANIsrsBbRkdbJgnFu97Pa9MY",
        authDomain: "burger-quiz-73cfa.firebaseapp.com",
        databaseURL: "https://burger-quiz-73cfa.firebaseio.com",
        projectId: "burger-quiz-73cfa",
        storageBucket: "burger-quiz-73cfa.appspot.com",
        messagingSenderId: "723264964450",
        appId: "1:723264964450:web:12f36825be11f86c5b8e3b",
        measurementId: "G-27TQMVLP1G"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const getData = () => {
        formAnswers.innerHTML = `
        <div class="loadingio-spinner-spin-bsuu27lks6"><div class="ldio-jrj800vofo">
        <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
        </div></div>
        <style type="text/css">
            @keyframes ldio-jrj800vofo {
            0% {
                opacity: 1;
                backface-visibility: hidden;
                transform: translateZ(0) scale(1.5,1.5);
            } 100% {
                opacity: 0;
                backface-visibility: hidden;
                transform: translateZ(0) scale(1,1);
            }
            }
            .ldio-jrj800vofo div > div {
            position: absolute;
            width: 17.64px;
            height: 17.64px;
            border-radius: 50%;
            background: #ff727d;
            animation: ldio-jrj800vofo 1s linear infinite;
            }.ldio-jrj800vofo div:nth-child(1) > div {
            left: 108.5px;
            top: 64.5px;
            animation-delay: -0.875s;
            }
            .ldio-jrj800vofo > div:nth-child(1) {
            transform: rotate(0deg);
            transform-origin: 117.32px 73.32px;
            }.ldio-jrj800vofo div:nth-child(2) > div {
            left: 95.5px;
            top: 95.5px;
            animation-delay: -0.75s;
            }
            .ldio-jrj800vofo > div:nth-child(2) {
            transform: rotate(45deg);
            transform-origin: 104.32px 104.32px;
            }.ldio-jrj800vofo div:nth-child(3) > div {
            left: 64.5px;
            top: 108.5px;
            animation-delay: -0.625s;
            }
            .ldio-jrj800vofo > div:nth-child(3) {
            transform: rotate(90deg);
            transform-origin: 73.32px 117.32px;
            }.ldio-jrj800vofo div:nth-child(4) > div {
            left: 33.5px;
            top: 95.5px;
            animation-delay: -0.5s;
            }
            .ldio-jrj800vofo > div:nth-child(4) {
            transform: rotate(135deg);
            transform-origin: 42.31999999999999px 104.32px;
            }.ldio-jrj800vofo div:nth-child(5) > div {
            left: 20.5px;
            top: 64.5px;
            animation-delay: -0.375s;
            }
            .ldio-jrj800vofo > div:nth-child(5) {
            transform: rotate(180deg);
            transform-origin: 29.319999999999993px 73.32px;
            }.ldio-jrj800vofo div:nth-child(6) > div {
            left: 33.5px;
            top: 33.5px;
            animation-delay: -0.25s;
            }
            .ldio-jrj800vofo > div:nth-child(6) {
            transform: rotate(225deg);
            transform-origin: 42.31999999999999px 42.31999999999999px;
            }.ldio-jrj800vofo div:nth-child(7) > div {
            left: 64.5px;
            top: 20.5px;
            animation-delay: -0.125s;
            }
            .ldio-jrj800vofo > div:nth-child(7) {
            transform: rotate(270deg);
            transform-origin: 73.32px 29.319999999999993px;
            }.ldio-jrj800vofo div:nth-child(8) > div {
            left: 95.5px;
            top: 33.5px;
            animation-delay: 0s;
            }
            .ldio-jrj800vofo > div:nth-child(8) {
            transform: rotate(315deg);
            transform-origin: 104.32px 42.31999999999999px;
            }
            .loadingio-spinner-spin-bsuu27lks6 {
            width: 147px;
            height: 147px;
            display: inline-block;
            overflow: hidden;
            background: #f8f0ff;
            }
            .ldio-jrj800vofo {
            width: 100%;
            height: 100%;
            position: relative;
            transform: translateZ(0) scale(1);
            backface-visibility: hidden;
            transform-origin: 0 0; /* see note above */
            }
            .ldio-jrj800vofo div { box-sizing: content-box; }
            /* generated by https://loading.io/ */
        </style>
        `;

        setTimeout(() => {
              firebase.database().ref().child('questions').once('value')
                .then(snap => playTest(snap.val()));
        }, 1000);
    }

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
        requestAnimationFrame(animateModal);
        burgerBtn.classList.add('active');
        modalBlock.classList.add('d-block');
        getData();
    });

    btnOpenModal.addEventListener('click', () => {
        requestAnimationFrame(animateModal);
        modalBlock.classList.add('d-block');
        getData();
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

    const playTest = (questions) => {
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
                    modalFooter.classList.remove('d-none');
                    modalHeader.classList.remove('d-none');
                    break;
                case (numberQuestion >= 0 && numberQuestion <= questions.length - 1):
                    questionTitle.textContent = `${questions[indexQuestion].question}`;
                    renderAnswers(indexQuestion);
                    nextButton.classList.remove('d-none');
                    prevButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
                    modalFooter.classList.remove('d-none');
                    modalHeader.classList.remove('d-none');
                    break;
                case (numberQuestion === questions.length):
                    questionTitle.textContent = '';
                    modalTitle.textContent = '';
                    nextButton.classList.add('d-none');
                    prevButton.classList.add('d-none');
                    sendButton.classList.remove('d-none');
                    modalFooter.classList.remove('d-none');
                    modalHeader.classList.remove('d-none');
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
                    modalFooter.classList.add('d-none');
                    modalHeader.classList.add('d-none');

                    for (let key in obj) {
                        let newObj = {};
                        newObj[key] = obj[key];
                        finalAnswers.push(newObj);
                    }
                    
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
            firebase
                .database()
                .ref()
                .child('contacts')
                .push(finalAnswers);
            console.log(finalAnswers);
        }
    }
});