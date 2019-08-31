from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random
import os
from datetime import datetime
import numpy as np
import matplotlib.pyplot as plt
import hashlib



number_chr = [str(i) for i in range(10)]
lower_chr = [chr(i) for i in range(97, 123)]
upper_chr = [chr(i) for i in range(65, 91)]
TEXT_LENGTH = 4
IMAGE_WIDTH = 100
IMAGE_HEIGHT = 30
image_type = "RGB"
background_color = (255, 255, 255)
text_font = ImageFont.truetype(r"C:\Windows\Fonts\Arial.ttf", size=16)
LINE_NUMBER = 5
POINT_CYCLE_NUMBER = 30
img_path = r'C:\Users\xiaojian\Desktop\captcha'


def generate_random_text():
    text_list = []
    set_char = number_chr + lower_chr + upper_chr
    for i in range(TEXT_LENGTH):
        text_one = random.choice(set_char)
        text_list.append(text_one)
    return text_list

def generate_random_color():
    color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
    return color

def generate_random_captcha():
    new_image = Image.new(image_type, (IMAGE_WIDTH, IMAGE_HEIGHT), background_color)
    draw = ImageDraw.Draw(new_image)
    text_list = generate_random_text()
    for i in range(TEXT_LENGTH):
        draw.text((25 * i + 5, 4), text_list[i], font=text_font, fill=generate_random_color())
    line_number = random.randint(0, LINE_NUMBER)
    for i in range(line_number):
        x1 = random.randint(0, IMAGE_WIDTH)
        x2 = random.randint(0, IMAGE_WIDTH)
        y1 = random.randint(0, IMAGE_HEIGHT)
        y2 = random.randint(0, IMAGE_HEIGHT)
        draw.line((x1, y1, x2, y2), fill = generate_random_color())
    for i in range(POINT_CYCLE_NUMBER):
        draw.point([random.randint(0, IMAGE_WIDTH), random.randint(0, IMAGE_HEIGHT)], fill=generate_random_color())
        x3 = random.randint(0, IMAGE_WIDTH)
        y3 = random.randint(0, IMAGE_HEIGHT)
        draw.arc((x3, y3, x3 + 4, y3 + 4), 0, 90, fill=generate_random_color())
    md5 = hashlib.md5()
    md5.update(str(text_list).encode("utf8"))
    captcha_name = md5.hexdigest() + str(random.randint(0, 1000)) + str(random.random()) + ".png"
    captcha = os.path.join(img_path, captcha_name)
    img = new_image.resize((160, 60), Image.ANTIALIAS)
    # img.save(captcha, 'png')
    # captcha_image = Image.open(captcha)
    # captcha_image = np.array(img)
    return text_list, img


if __name__ == "__main__":
    text_list, captcha = generate_random_captcha()
    text = "".join(text_list)
    # image = Image.open(captcha)
    # image = np.array(image)
    f = plt.figure()
    ax = f.add_subplot(111)
    ax.text(0.1, 0.9, text, ha='center', va='center', transform=ax.transAxes)
    plt.imshow(captcha)
    plt.show()