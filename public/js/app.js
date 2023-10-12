
console.log('Client side javascript file is loaded!');


const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');
const messageThree = document.getElementById('message-3');
const imgTag = document.getElementById('weatherImage');

const fetchLocationDetails = (place) => {
    // fetch(`http://localhost:3000/weather?address=${place}`).then((response) => {
    fetch(`/weather?address=${place}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.innerText = data.error;
            }
            else {
                console.log(data);
                messageOne.innerText = data.foreCastData.locateMessage;
                imgTag.src = data.foreCastData.weather_icons;
                messageThree.innerText = `The location entered is ${data.foreCastData.location.name} ${data.foreCastData.location.region} ${data.foreCastData.location.country}`
            }
            
        })
    })
} 


const formInput = document.getElementById('getLocation');
formInput.addEventListener('submit', (e) => {
    e.preventDefault();
    messageThree.innerText = '';
    messageOne.innerText = 'Loading...';
    const inputValue = document.getElementById('inputValue').value;
    if(inputValue === '' || !inputValue) {
        // alert('Please enter some value')
        messageOne.innerText = 'Please enter valid location.'
    } else {
        fetchLocationDetails(inputValue);
    }
})