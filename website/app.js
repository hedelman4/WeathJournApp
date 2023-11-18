let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?lat=';
const zipBaseURL = 'http://api.openweathermap.org/geo/1.0/zip?zip=';
const apiKey = '2e30f4e8c97f00ec2b7cf7bdb9235795&units=imperial';
let lat = '';
let lon = '';
let zipCode = '';
let temp = '';


function performAction() {
    openWeatherZip().then(openWeather())
}


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

const openWeatherZip = async ()=> {
    zipCode = document.getElementById('zip').value;
    const response = await fetch(zipBaseURL+zipCode+',US&appid='+apiKey);
    try {
        const responseData = await response.json();
        console.log(responseData);
        lat = JSON.stringify(responseData['lat']);
        lon = JSON.stringify(responseData['lon']);
    }
    catch(error) {
        console.log("error", error);   
    }
}

const openWeather = async ()=> {
    const response = await fetch(baseURL+lat+'&lon='+lon+'&appid='+apiKey);
    try {
        const responseData = await response.json();
        console.log(responseData);
        temp = JSON.stringify(responseData['main']['temp']);
    }
    catch(error) {
        console.log("error", error);   
    }
}

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