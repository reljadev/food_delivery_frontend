import os
from PIL import Image

basewidth = 300

for img_full_name in os.listdir('.'):
	img_name = img_full_name.split('.')[0]
	img_ext = img_full_name.split('.')[1]
	
	if(img_ext not in ["jpg", "jpeg", "png"]):
		continue
		
	img = Image.open(img_full_name)
	
	if not img.mode == 'RGB':
  		img = img.convert('RGB')
  		
	wpercent = (basewidth/float(img.size[0]))
	hsize = int((float(img.size[1])*float(wpercent)))
	img = img.resize((basewidth,hsize), Image.ANTIALIAS)
	img.save(img_name + '.jpg')
