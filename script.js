const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
const alarmBtn = document.querySelector(".btn");
const content = document.querySelector(".content");
const ringTone = new Audio("alarmRing.mp3");
let alarmTimeOn,isAlarmSet = false;  

// setting the value of hours , minutes for alarm
for(let i=12 ;i>0;i--){
    i=i<10?"0"+i:i;
    let option =`<option value="${i}">${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option)
}
for(let i=59 ;i>=0;i--){
    i=i<10?"0"+i:i;
    let option =`<option value="${i}">${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option)
}
for(let i=2 ;i>0;i--){
    let ampm = i ==1 ? "AM":"PM"
    let option =`<option value="${ampm}">${ampm}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option)
}

// setInterval is called after every one second
setInterval(() => {
    // getting the current time
    let date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    ampm = "AM";
    if(h>12){
        h = h-12;
        ampm = "PM";
    }
    h = h == 0 ? h=12 : h;
    h=h<10?"0"+h:h;
    m=m<10?"0"+m:m;
    s=s<10?"0"+s:s;
    // setting the current time
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`
    // checking whether alarm time equals the current time
    if(alarmTimeOn == `${h}:${m} ${ampm}`){
        // console.log("Ring")
        ringTone.play();
        ringTone.loop =true;
    }
}, 1000);

// function declaration
const setAlarm = ()=>{
    // checking whether alarm is set or not
    if(isAlarmSet){
        alarmTimeOn = "";
        ringTone.pause();
        content.classList.remove('disable')
        alarmBtn.innerHTML = "Set Alarm";
        return isAlarmSet = false;
    }
    // setting the alarm time
    let alarmTime = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`
    // checking whether alarm is set properly or not
    if(alarmTime.includes("Hour") || alarmTime.includes("Minute") || alarmTime.includes("AM/PM")){
        return alert("Enter Correct Time")
    }
    isAlarmSet = true;  
    content.classList.add('disable')
    alarmBtn.innerHTML = "Clear Alarm"
    alarmTimeOn = alarmTime; // assigned the alarm time value in the alarm
}
//click event addedin the button
alarmBtn.addEventListener("click",setAlarm);