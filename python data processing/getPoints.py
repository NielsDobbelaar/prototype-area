import re

my_file = open("public/temp.txt", "r")
text = my_file.read()
my_file.close()

regexCoords = '(coords=".*?")'
regexPoints = '(".*?")'

textSplit = re.findall(regexPoints, " ".join(re.findall(regexCoords, text)))

print(len(textSplit))

output = "[ " + ",\n".join(textSplit) + "]"

with open('public/temp.txt', 'w') as f:
        f.write(output)

print("done")
