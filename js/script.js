const submitBtn = document.getElementById('submitBtn');
const newTask = document.getElementById('new_task');
const clear_task_btn = document.getElementById('clear_task_btn');
const task_filter = document.getElementById('task_filter');

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const dataObject = JSON.parse(findStorage());
    if (dataObject !== null) {
        dataObject.forEach((task) => {
            document.getElementById('tasks').insertAdjacentHTML('afterbegin', `<li>${task} <a id="link" href="#">x</a></li>`);
            //remove li item
            removeListItem();
        })
    }
    else{
        document.getElementById('tasks').innerHTML('<h3> No list item found! </h3>')
    }
})
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const task = newTask.value;

    document.getElementById('tasks').insertAdjacentHTML('afterbegin', `<li>${task} <a id="link" href="#">x</a></li>`);

    addTasks(`${task}`);

    //remove li item
    removeListItem();

    newTask.value = "";
    console.log('Submit Button Clicked!');
});

clear_task_btn.addEventListener('click', () => {
    document.getElementById('tasks').innerHTML = "";
    clearStorage();
});

task_filter.addEventListener('keyup', (e) => {
    e.preventDefault();
    document.getElementById('tasks').innerHTML="";
    const data = filterListItem(e.target.value);
    if (data !== undefined) {
        data.forEach((task) => {
            document.getElementById('tasks').insertAdjacentHTML('afterbegin', `<li>${task} <a id="link" href="#">x</a></li>`);
            //remove li item
            removeListItem();
        })
    }
})


//localstorage functions--start

const addTasks = (obj) => {
    const dataObject = JSON.parse(findStorage());
    if (dataObject) {
        dataObject.push(obj);
        updateStorage(dataObject);
    }
    else {
        const newDataObject = [];
        newDataObject.push(obj);
        updateStorage(newDataObject);
    }
};

const findStorage = () => localStorage.getItem('taskStorage');
const updateStorage = (obj) => {
    localStorage.setItem('taskStorage', JSON.stringify(obj));
}
const removeStorage = (obj) => {
    const currentStorage = JSON.parse(findStorage());
    const finalStorage = currentStorage.filter(task => task !== obj);
    updateStorage(finalStorage);
}
const clearStorage = () => {
    localStorage.removeItem('taskStorage');
}
//localstorage functions--Ends


//DOM manipulation related functions
const removeListItem = () => {
    document.getElementById('link').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('A list item got deleted');
        e.target.parentElement.remove();
        let str = e.target.parentElement.innerText;
        str = str.substr(0, str.length - 1).trim();
        removeStorage(str);
    })
}

const filterListItem = (str) => {
    const tasks = JSON.parse(findStorage());
    if (tasks !== null) {
        const remainingtasks = tasks.filter(task => task.toLowerCase().includes(str));
        return remainingtasks;
    }
    else return;
}