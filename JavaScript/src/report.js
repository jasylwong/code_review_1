function report(string) {
  let output = [];
  let grades = string.split(",");
  
  let greens = grades.filter(grade => grade.toLowerCase().trim() === "green").length;
  if (greens > 0) { output.push(`Green: ${greens}`) };
  
  let ambers = grades.filter(grade => grade.toLowerCase().trim() === "amber").length;
  if (ambers > 0) { output.push(`Amber: ${ambers}`) };
  
  let reds = grades.filter(grade => grade.toLowerCase().trim() === "red").length;
  if (reds > 0) { output.push(`Red: ${reds}`) };

  return output.join("\n");
}

module.exports = report;