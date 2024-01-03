'use strict'

const inputs = document.querySelectorAll('.input')
const dayInput = document.querySelector('.day-input')
const monthInput = document.querySelector('.month-input')
const yearInput = document.querySelector('.year-input')
const yearEl = document.querySelector('.year-el')
const dayEl = document.querySelector('.day-el')
const monthEl = document.querySelector('.month-el')
const btnSubmit = document.querySelector('.btn-submit')

// Functions
const now = new Date()
const curYear = now.getFullYear()

const errorMsgEmpty = input => {
  input.classList.remove('border-grey-100')
  input.classList.add('border-red-300')
  input.nextElementSibling.classList.remove('hidden')
  input.previousElementSibling.classList.remove('text-slate-500')
  input.previousElementSibling.classList.add('text-red-300')
  return
}

const removeEmptyErrorMsg = input => {
  input.classList.add('border-grey-100')
  input.classList.remove('border-red-300')
  input.nextElementSibling.classList.add('hidden')
  input.previousElementSibling.classList.add('text-slate-500')
  input.previousElementSibling.classList.remove('text-red-300')
}

const validateDayField = dayInput => {
  if (!dayInput.value) {
    errorMsgEmpty(dayInput)
    dayInput.nextElementSibling.innerText = 'This field is required'
    return
  }

  if (+dayInput.value > 31 || +dayInput.value < 1) {
    errorMsgEmpty(dayInput)
    dayInput.nextElementSibling.innerText = 'Must be a valid day'
    return
  }

  return removeEmptyErrorMsg(dayInput)
}

const validateMonthField = monthInput => {
  if (!monthInput.value) {
    errorMsgEmpty(monthInput)
    monthInput.nextElementSibling.innerText = 'This field is required'
    return
  }

  if (+monthInput.value > 12 || +monthInput.value < 1) {
    errorMsgEmpty(monthInput)
    monthInput.nextElementSibling.innerText = 'Must be a valid month'
    return
  }

  return removeEmptyErrorMsg(monthInput)
}

const validateYearField = yearInput => {
  if (!yearInput.value) {
    errorMsgEmpty(monthInput)
    yearInput.nextElementSibling.innerText = 'This field is required'
    return
  }

  if (+yearInput.value > curYear || +yearInput.value < 1) {
    errorMsgEmpty(yearInput)
    yearInput.nextElementSibling.innerText = 'Must be a valid year'
    return
  }

  return removeEmptyErrorMsg(yearInput)
}

const checkFutureDate = function () {
  if (
    new Date(+yearInput.value, +monthInput.value - 1, +dayInput.value) > now
  ) {
    errorMsgEmpty(dayInput)
    dayInput.nextElementSibling.innerText = 'Must be a valid day'
    errorMsgEmpty(monthInput)
    monthInput.nextElementSibling.innerText = 'Must be a valid month'
    return
  }
  // if (
  //   +yearInput.value === now.getFullYear() &&
  //   +monthInput.value - 1 > now.getMonth()
  // ) {
  //   console.log('working')
  //   // removeEmptyErrorMsg(dayInput)
  //   // errorMsgEmpty(monthInput)
  //   // monthInput.nextElementSibling.innerText = 'Day must be a valid month'
  //   // return
  // }

  // if (
  //   +yearInput.value === now.getFullYear() &&
  //   +monthInput.value - 1 === now.getMonth() &&
  //   +dayInput.value > now.getDate()
  // ) {
  //   removeEmptyErrorMsg(monthInput)
  //   errorMsgEmpty(dayInput)
  //   dayInput.nextElementSibling.innerText = 'Day must be a valid day'
  //   return
  // }
  // if (
  //   new Date(+yearInput.value, +monthInput.value - 1, +dayInput.value) > now &&
  //   !+monthInput.value - 1 > now.getMonth() &&
  //   +dayInput.value > now.getDate()
  // ) {
  //   removeEmptyErrorMsg(monthInput)
  //   console.log('working')
  //   return
  // }
  // if (
  //   new Date(+yearInput.value, +monthInput.value - 1, +dayInput.value) > now &&
  //   +monthInput.value - 1 > now.getMonth() &&
  //   !+dayInput.value > now.getDate()
  // ) {
  //   removeEmptyErrorMsg(dayInput)
  //   console.log('working')
  //   return
  // }

  removeEmptyErrorMsg(dayInput)
  return removeEmptyErrorMsg(monthInput)
}
// console.log('hello')

// Functionality for the app
const calcTotalDaysPassed = (date1, date2) => {
  const days = Math.floor(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))
  return days
}

const calcYearsPassed = function (totalDaysPassed) {
  const yearsPassed = Math.floor(totalDaysPassed / 365)

  return yearsPassed
}

const calcRemainDaysAfteryears = (resultTotalYears, resultTotalDaysPassed) => {
  let leapYear = 0
  for (let i = +yearInput.value; i < curYear; i++) {
    if (i % 4 === 0) {
      leapYear++
    }
  }
  const yearsPassedInDays = resultTotalYears * 365

  const remainDaysAfterYears =
    resultTotalDaysPassed - yearsPassedInDays - leapYear

  return remainDaysAfterYears
}

const calcMonthsPassed = function (resultRemainDaysAfterYears) {
  const monthPassed = Math.floor(resultRemainDaysAfterYears / 30)
  return monthPassed
}

const calcRemainDays = function (
  resultMonthsPassed,
  resultRemainDaysAfterYears
) {
  const monthsPassedinDays = resultMonthsPassed * 30
  const remainDays = resultRemainDaysAfterYears - monthsPassedinDays

  return remainDays
}

inputs.forEach(input => {
  input.addEventListener('focusout', () => {
    if (input.value === '') errorMsgEmpty(input)
  })
})

const clearInputField = function () {
  dayInput.value = ''
  monthInput.value = ''
  yearInput.value = ''
}

const calcAge = function () {
  const resultTotalDaysPassed = calcTotalDaysPassed(
    new Date(+yearInput.value, +monthInput.value - 1, +dayInput.value),
    new Date()
  )

  const resultTotalYears = calcYearsPassed(resultTotalDaysPassed)

  yearEl.textContent = resultTotalYears

  const resultRemainDaysAfterYears = calcRemainDaysAfteryears(
    resultTotalYears,
    resultTotalDaysPassed
  )

  const resultMonthsPassed = calcMonthsPassed(resultRemainDaysAfterYears)
  monthEl.textContent = resultMonthsPassed

  const resultRemainDays = calcRemainDays(
    resultMonthsPassed,
    resultRemainDaysAfterYears
  )
  dayEl.textContent = resultRemainDays
}

// EVENT LISTENERS
dayInput.addEventListener('change', () => validateDayField(dayInput))
monthInput.addEventListener('change', () => validateMonthField(monthInput))
yearInput.addEventListener('change', () => validateYearField(yearInput))

btnSubmit.addEventListener('click', function () {
  checkFutureDate()

  inputs.forEach(input => {
    if (input.value === '') errorMsgEmpty(input)
  })

  if (
    dayInput.classList.contains('border-red-300') ||
    monthInput.classList.contains('border-red-300') ||
    yearInput.classList.contains('border-red-300')
  )
    return

  calcAge()
  clearInputField()
})
