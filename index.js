function createEmployeeRecord(arr){
    let empRec = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return empRec
}

function createEmployeeRecords(arr){
    return arr.map(createEmployeeRecord)
}

function createTimeInEvent(emp, timeStamp){
    const timeStampArr = timeStamp.split(" ")

    emp.timeInEvents.push({
        type: "TimeIn",
        date: timeStampArr[0],
        hour: parseInt(timeStampArr[1])
    })
    return emp
}

function createTimeOutEvent(emp, timeStamp){
    const timeStampArr = timeStamp.split(" ")

    emp.timeOutEvents.push({
        type: "TimeOut",
        date: timeStampArr[0],
        hour: parseInt(timeStampArr[1])
    })
    return emp
}

function hoursWorkedOnDate(record, timeStamp){
    let hoursWorked = 0;
    let clockIn = record.timeInEvents.find((date) =>{
        return date.date === timeStamp})
    let clockOut = record.timeOutEvents.find((date) =>{
        return date.date === timeStamp})
        hoursWorked = (clockOut.hour - clockIn.hour)/100
        return hoursWorked
}

function wagesEarnedOnDate(record, timeStamp){
    return hoursWorkedOnDate(record, timeStamp) * record.payPerHour
}

function allWagesFor(record){
    let wage = 0

    record.timeInEvents.forEach((timeIn)=>{
        wage += wagesEarnedOnDate(record, timeIn.date)
    })
    return wage
}

function calculatePayroll(arr){
    let wage = 0
    arr.forEach((employee)=>{
        wage += allWagesFor(employee)
    })
    return wage
}

function findEmployeeByFirstName(arr, firstName){
    return arr.find((employee)=>{
        return employee.firstName
    })
}