#!/usr/bin/env python

import RPi.GPIO as GPIO
import SimpleMFRC522
import signal
import requests
import time

continue_reading = True

reader = SimpleMFRC522.SimpleMFRC522()

while continue_reading: 
    id, text = reader.read()
    url = "http://10.3.141.1:8081/user/" + str(id)
    print(url)
    r = requests.post(url)
    print(r.content)
    time.sleep(5)
    
