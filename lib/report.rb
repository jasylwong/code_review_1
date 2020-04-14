def report(input)
  arr = input.split(',').map(&:strip)
  output = []
  
  output.push("Green: #{arr.count('Green')}") if arr.count('Green') > 0
  
  output.push("Amber: #{arr.count('Amber')}") if arr.count('Amber') > 0
  
  output.push("Red: #{arr.count('Red')}") if arr.count('Red') > 0
  
  other = arr.length - (arr.count('Green') + arr.count('Amber') + arr.count('Red'))
  output.push("Other: #{other}") if other > 0

  output.join("\n")
end

  
