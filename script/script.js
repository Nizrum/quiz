'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    let burgerName1 = 'Стандарт';
    let burgerName2 = 'Черный';
    let burgerImg1 = './image/burger.png';
    let burgerImg2 = './image/burgerBlack.png';

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });

    const playTest = () => {
        const renderQuestions = () => {
            questionTitle.textContent = 'Какого цвета бургер вы хотите?';
            formAnswers.innerHTML = `
            <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${burgerImg1}" alt="burger">
                    <span>${burgerName1}</span>
                </label>
            </div>
            <div class="answers-item d-flex justify-content-center">
                <input type="radio" id="answerItem2" name="answer" class="d-none">
                <label for="answerItem2" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${burgerImg2}" alt="burger">
                    <span>${burgerName2}</span>
                </label>
            </div>
            `;
        }
        renderQuestions();
    }
});