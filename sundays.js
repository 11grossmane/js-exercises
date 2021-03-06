const monthsAr = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
]
const months = {
  jan: 30,
  feb: 28,
  mar: 30,
  apr: 30,
  may: 30,
  jun: 30,
  jul: 30,
  aug: 30,
  sep: 30,
  oct: 31,
  nov: 31,
  dec: 31,
}
const dayAr = ["mon", "tues", "wed", "th", "fr", "sa", "su"]
const countSundays = ({
  day = 0,
  yearsLeft = 100,
  daysLeftInYear = 365,
  curMonthIdx = 0,
  daysLeftInMonth = months[monthsAr[0]],
}) => {
  let res = 0
  if (yearsLeft === -1) return 0
  while (daysLeftInYear) {
    //we've found a Sunday on the first day of the month
    if (
      dayAr[day] === "su" &&
      daysLeftInMonth === months[monthsAr[curMonthIdx]]
    ) {
      res++
    }
    daysLeftInYear--
    day = day === dayAr.length - 1 ? 0 : day + 1
    daysLeftInMonth--
    //moving to next month
    if (daysLeftInMonth === 0) {
      //cur month idx either increases or starts over, when there are no more days left in month
      curMonthIdx = curMonthIdx === monthsAr.length - 1 ? 0 : curMonthIdx + 1
      //daysleft in month gets reset

      if (
        getNewYearNumberOfDays(yearsLeft) === 366 &&
        monthsAr[curMonthIdx] === "feb"
      ) {
        daysLeftInMonth = 29
      } else daysLeftInMonth = months[monthsAr[curMonthIdx]]
    }
  }
  // console.log('total day count', day)
  console.log(getNewYearNumberOfDays(yearsLeft - 1), yearsLeft - 1)
  return (
    res +
    countSundays({
      day,
      yearsLeft: yearsLeft - 1,
      daysLeftInYear: getNewYearNumberOfDays(yearsLeft - 1),
      curMonthIdx,
      daysLeftInMonth,
    })
  )
}

const getNewYearNumberOfDays = (yearsLeft) => {
  const yearsPassed = 100 - yearsLeft
  if (yearsPassed % 4 === 0 && yearsLeft !== 0) {
    return 366
  }
  return 365
}

let res = countSundays({})
console.log(res)
