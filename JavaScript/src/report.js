function report(string) {
  let output = ""
  let grades = string.split(", ")
  
  let greens = grades.filter(grade => grade === "Green").length
  if (greens > 0) { output += `Green: ${greens}` }
  
  let ambers = grades.filter(grade => grade === "Amber").length
  if (ambers > 0) { output += `Amber: ${ambers}` }
  
  let reds = grades.filter(grade => grade === "Red").length
  if (reds > 0) { output += `Red: ${reds}` }

  return output
}

module.exports = report;