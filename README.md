CODE REVIEW 1

Input | Output

'' : ''
'green' : "Green: 1"
'green, green' : "Green: 2"
'green, green, green' : "Green: 3"

'Amber' : "Amber: 1"
'Amber, Amber' : "Amber: 2"
'Amber, Amber, Amber' : "Amber: 3"

'Red' : "Red: 1"
'Red, Red' : "Red: 2"
'Red, Red, Red' : "Red: 3"

'Green, Red" : "Green: 1\nRed:1"
'Green, Green, Red" : "Green: 2\nRed:1"
'Green, Green, Amber, Red" : "Green: 2\nAmber: 1\nRed:1"
'Green, Green, Amber, Red, Red" : "Green: 2\nAmber: 1\nRed:2"

# "Green: #{greens}\nAmber: #{ambers}\nRed: #{reds}\nUncounted: #{uncounteds}"

Feedback: https://docs.google.com/feeds/download/documents/export/Export?id=16yJYXCMKOGNSKnNehbSMfVoZ0DHs5mZY-Vsz9tquoYs&exportFormat=pdf

Screen recording: https://www.youtube.com/watch?v=vGxOZcuRls4
