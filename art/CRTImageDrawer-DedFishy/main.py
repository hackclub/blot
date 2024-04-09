# I added this script so that others could create image data

from PIL import Image

# This is the value from 0-255 for deciding whether a pixel is white or black. Higher means a whiter image, lower means a blacker image.
# This should be close to 127 for normally-lit photos.
THRESHOLD = 150

im = Image.open("image.png")

w = im.width
h= im.height

bw = Image.new("1", (w, h))

for x in range(0, w):
    for y in range(0, h):

        p = im.getpixel((x, y))

        v = (p[0] + p[1] + p[2])/3 > THRESHOLD

        bw.putpixel((x, y), 1 if v else 0)

bw.show("Result")

out = ""
for y in range(0, h):
    for x in range(0, w):
        out += str(bw.getpixel((x, y)))
    out += "-"

out = out[:-1]

with open("result.txt", "w+") as f:
    f.write(out)