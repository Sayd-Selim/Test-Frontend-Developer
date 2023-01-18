let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
let popup = document.querySelector('.popup'); // Само окно
let openPopupButtons = document.querySelectorAll('.open-popup'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна
let yourName = document.getElementById('Name')
let yourPhone = document.getElementById('phone')
let button = document.getElementById('btn')
let labels = document.querySelector('.labels')



openPopupButtons.forEach((button) => { // Перебираем все кнопки
    button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
        popupBg.classList.add('active'); // Добавляем класс 'active' для фона
        popup.classList.add('active'); // И для самого окна
        window.addEventListener('scroll', e => {
            window.scrollTo({
                top: 0
            })
        })
    })
});

$('.close-popup').click(function () {
    location.reload();
})

closePopupButton.addEventListener('click', () => { // Вешаем обработчик на крестик
    popupBg.classList.remove('active'); // Убираем активный класс с фона
    popup.classList.remove('active'); // И с окна

});





const createTodoElement = (text) => {
    const todoElement = document.createElement('li')
    const todoElementAnchor = document.createElement('a')
    todoElementAnchor.href = '#'
    todoElementAnchor.textContent = text
    todoElement.append(todoElementAnchor)

    return todoElement
}

const dataContainer = document.querySelector('#data-container')



// Ограничитель для инпутов 
let regex = /[0-9]/g; // регулярка только цифры

yourName.oninput = function () {
    this.value = this.value.replace(regex, '');
}


$(yourPhone).on('input', function () {
    $(this).val($(this).val().replace(/[A-Za-zА-Яа-яЁё]/, ''))
    this.value = this.value.substr(0, 11);
});
// Конец

const getAllTodos = () => {

    button.addEventListener('click', () => {  
        event.preventDefault(); // Убираем событие отправки формы
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    alert('Ошибка запроса');
                }
                return response.json();
            })
            .then((todos) => {
                todos.forEach((todo) => {
                    if(todo.userId >= 5){
                        const todoHTML = createTodoElement(todo.title)
                    dataContainer.append(todoHTML)
                    }
                    


                })
            })
            .catch((error) => {
                console.log(error);
            })


        $('.labels').hide()
        $('#data-container').show()
        $('.popup__bg .popup .close-popup').addClass('new')
    })


    
}
getAllTodos();





