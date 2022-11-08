const Nexmo = require('nexmo')
const nexmo = new Nexmo ({
    apiKey:'28a6600c',
    apiSecret:'CkFns5evsAkrUKWW',
});

const classScheduleSms=(subject,date,time,student)=>{
    const from ="WebDevelopers";
    const to=`${student}`
    const text=`${subject}'s class scheduled on ${date} at ${time}`
    nexmo.message.sendSms(from,to,text);
}

module.exports={
    classScheduleSms
}