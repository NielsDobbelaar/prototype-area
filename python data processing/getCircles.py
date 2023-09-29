import re

my_file = open("public/temp.txt", "r")
text = my_file.read()
my_file.close()

regexCoords = '(coords=".*?")'
regexPoints = '(".*?")'

circles = re.findall(regexPoints, " ".join(re.findall(regexCoords, text)))

print(circles)

coords = []

for circle in circles:
    newCoord = circle.split(",")[0:2]
    newCoord[0] = newCoord[0][1:10]
    coords.append(newCoord)

print(len(coords))
print(coords)

