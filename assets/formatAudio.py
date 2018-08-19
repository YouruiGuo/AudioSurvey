import os
import pydub

path = './testmusic/'
audiolist = os.listdir(path)

# milliseconds
firstMinute = 60 * 1000

for audio in audiolist:
	try:
		print path + audio
		song = pydub.AudioSegment.from_mp3(path + audio)
		song = song[:firstMinute]
		os.remove(path + audio)
		song.export(path + audio, format = "mp3")
	except:
		pass
	
