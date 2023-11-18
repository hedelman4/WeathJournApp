let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?lat=';
const zipBaseURL = 'http://api.openweathermap.org/geo/1.0/zip?zip=';
let apiKey = '';
let lat = '';
let lon = '';
let zipCode = '';
let temp = '';

const getData = async ( url = '')=>{
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        }
    });
  
    try {
        const newData = await response.json();
        console.log(newData);
        apiKey = newData['myKey'];
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
};

getData('/all');

const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) 
    });
  
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
};

postData('/add', {temperature:'50', date:'1/1/2023', content:'good'});

const openWeatherComb = async ()=> {
    zipCode = document.getElementById('zip').value;
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?zip='+zipCode+',US&appid='+apiKey);
    try {
        const responseData = await response.json();
        console.log(responseData);
        temp = JSON.stringify(responseData['main']['temp']);
    }
    catch(error) {
        console.log("error", error);   
    }
}