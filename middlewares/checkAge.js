module.exports = checkAge = (birthday) => {
  const optimizedBirthday = birthday.replace(/-/g, '/')

  const myBirthday = new Date(optimizedBirthday)

  const currentDate = new Date().toJSON().slice(0, 10) + ' 01:00:00'

  const myAge = ~~((Date.now(currentDate) - myBirthday) / 31557600000)

  return myAge < 18 ? false : true
}
