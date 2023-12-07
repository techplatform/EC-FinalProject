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






function DarkModeToggle() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

document.getElementById('logOut').addEventListener('click', () => {window.location.href = 'login.html';});
document.getElementById('darkModeToggle').addEventListener('click', DarkModeToggle);