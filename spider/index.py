# -*- coding: utf-8 -*-
import urllib.request as request

url = 'http://www.baidu.com'
response = request.urlopen(url)

print(response.read())

