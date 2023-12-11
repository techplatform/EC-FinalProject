function registerUser() {
    const name = document.getElementById('name').value;
    const occupation = document.getElementById('occupation').value;
    const purpose = document.getElementById('purpose').value;
  
    // Send data to fetch API 
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, occupation, purpose }),
    })
    .then(response => response.json())
    .then(data => {
      alert('Registration successful!');

      //saved user information
      const userData = {name, occupation, purpose};
      localStorage.setItem('registeredUser', JSON.stringify(userData));

      //take me to login page
      window.location.href = 'login.html';
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  // get user information here
  const storedUserData = localStorage.getItem('registeredUser');
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    const selectUser = document.getElementById('selectUser');

    // Create an option for the registered user
    const option = document.createElement('option');
    option.value = userData.name;
    option.textContent = userData.name;
    selectUser.appendChild(option);
  }
});

function login() {
  const selectedUser = document.getElementById('selectUser').value;
  //alert(`Login successful! Welcome, ${selectedUser}!`);
  // open another page here
  window.location.href = '/calender.html';
}

//event creation
document.getElementById('createEvent').addEventListener('click', () => {
      const title = window.prompt('Enter event title:');
      const date = window.prompt('Enter event date:');
      const location = window.prompt('Enter event location:');

      const message = `Event Details:\nTitle: ${title}\nDate: ${date}\nLocation: ${location}`;

      const eventItem = document.createElement('li');
      eventItem.className = 'eventItem';

      const titleDiv = document.createElement('div');
      titleDiv.className = 'eventDetail';
      titleDiv.textContent = `Title: ${title}`;
      eventItem.appendChild(titleDiv);

      const dateDiv = document.createElement('div');
      dateDiv.className = 'eventDetail';
      dateDiv.textContent = `Date: ${date}`;
      eventItem.appendChild(dateDiv);

      const locationDiv = document.createElement('div');
      locationDiv.className = 'eventDetail';
      locationDiv.textContent = `Location: ${location}`;
      eventItem.appendChild(locationDiv);

      console.log(message);

      //alert(message);

      //document.getElementById('messageContainer').textContent = message;
      const eventList = document.getElementById('eventList');
      eventList.appendChild(eventItem);
});

//calender portion
document.addEventListener('DOMContentLoaded', function () {
  displayCalendar();
  highlightCurrentDay();
  displayComments();

  //makiing all the days as event listeners
  const cells = document.querySelectorAll('td');
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      addEvent(cell.innerText);
    });
  });
});

function displayCalendar() {
  const calendarBody = document.getElementById('calendar-body');
  const daysInMonth = 31;

  let dayCounter = 1;

  for (let i = 0; i < 6; i++) {
      const row = document.createElement('tr');

      for (let j = 0; j < 7; j++) {
          const cell = document.createElement('td');
          if (i === 0 && j < getFirstDayOfMonth()) {
              cell.innerText = ''; //simple ui
          } else if (dayCounter <= daysInMonth) {
              cell.innerText = dayCounter;
              dayCounter++;
          }
          row.appendChild(cell);
      }
      calendarBody.appendChild(row);
  }
}

function getFirstDayOfMonth() {
  const currentDate = new Date();
  currentDate.setDate(1); 
  return currentDate.getDay(); 
}

//highlights what day it is
function highlightCurrentDay() {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const cells = document.querySelectorAll('td');

  cells.forEach(cell => {
      if (cell.innerText === currentDay.toString()) {
          cell.classList.add('current-day');
      }
  });
}

//making the event appear on the list 
function addEvent(day) {
  const title = window.prompt('Enter event title:');
  const date = window.prompt('Enter event date:');
  const location = window.prompt('Enter event location:');

  const event = { title, date, location };

  // checking to see if there are already events
  let eventsForDay = JSON.parse(localStorage.getItem(`events-${day}`)) || [];
  eventsForDay.push(event);

  // store the infromation
  localStorage.setItem(`events-${day}`, JSON.stringify(eventsForDay));

  //add to the page
  displayEvents();
}

function displayEvents() {
  // Clear existing events
  const eventList = document.getElementById('eventList');
  eventList.innerHTML = '';

  // Display events for each day
  for (let day = 1; day <= 31; day++) {
    const eventsForDay = JSON.parse(localStorage.getItem(`events-${day}`)) || [];

    eventsForDay.forEach(event => {
      const eventItem = document.createElement('li');
      eventItem.className = 'eventItem';

      const dateDiv = document.createElement('div');
      dateDiv.className = 'eventDate';
      dateDiv.textContent = `Event on ${event.date}`;
      eventItem.appendChild(dateDiv);

      const titleDiv = document.createElement('div');
      titleDiv.className = 'eventDetail';
      titleDiv.textContent = `Title: ${event.title}`;
      eventItem.appendChild(titleDiv);

      const locationDiv = document.createElement('div');
      locationDiv.className = 'eventDetail';
      locationDiv.textContent = `Location: ${event.location}`;
      eventItem.appendChild(locationDiv);

      eventList.appendChild(eventItem);
    });
  }
}

function addComment() {
  const commentInput = document.getElementById('commentInput');
  const comment = commentInput.value.trim();

  if (comment !== '') {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));

    commentInput.value = '';

    displayComments();
    displayLatestComment(comment);
  }
}

function displayComments() {
  const commentList = document.getElementById('commentList');
  commentList.innerHTML = '';

  const comments = JSON.parse(localStorage.getItem('comments')) || [];

  comments.forEach((comment, index) => {
    const commentItem = document.createElement('div');
    commentItem.className = 'commentItem';
    
    const commentText = document.createElement('div');
    commentText.textContent = comment;
    commentItem.appendChild(commentText);

    const btnContainer = document.createElement('div');
    btnContainer.className = 'btnContainer';
    

    // Create Edit button
    const editBtn = document.createElement('button');
    // editBtn.textContent = 'Edit';
    editBtn.className = 'editBtn';
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.onclick = () => editComment(index);
    btnContainer.appendChild(editBtn);

    // Create Delete button
    const deleteBtn = document.createElement('button');
    // deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.onclick = () => deleteComment(index);
    btnContainer.appendChild(deleteBtn);

    commentItem.appendChild(btnContainer);
    commentList.appendChild(commentItem);
  });
}

//edit comment
function editComment(index){
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const updatedComment = prompt('Edit comment:', comments[index]);

  if (updatedComment !== null) {
    comments[index] = updatedComment;
    localStorage.setItem('comments', JSON.stringify(comments));

    displayComments();
  }
}

//delete comment
function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.splice(index, 1);
  localStorage.setItem('comments', JSON.stringify(comments));
  displayComments();
}




function DarkModeToggle() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

document.getElementById('logOut').addEventListener('click', () => {window.location.href = 'login.html';});
document.getElementById('darkModeToggle').addEventListener('click', DarkModeToggle);