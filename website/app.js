let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '';
let zipCode = '';
let content = '';
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
        apiKey = newData['myKey'];
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
};

getData('/all');

const postData = async ( url = '', data = {})=>{
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
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
};

const openWeatherComb = async (zipCode)=> {
    const response = await fetch(baseURL+zipCode+',US&appid='+apiKey);
    try {
        const responseData = await response.json();
        temp = JSON.stringify(responseData['main']['temp']);
        return temp
    }
    catch(error) {
        console.log("error", error);   
    }
}

document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    zipCode = document.getElementById('zip').value;
    content = document.getElementById('feelings').value;
    openWeatherComb(zipCode)
    .then(   
        postData('/add', {temperature:temp, date:newDate, content:content})
    )
    .then(
        updateUI()
    )
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        console.log(allData)
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('content').innerHTML = allData.content;
    }catch(error){
      console.log("error", error);
    }
  }