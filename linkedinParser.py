import urllib
import json
from decimal import Decimal
from bs4 import BeautifulSoup
from mechanize import Browser
br = Browser()

# Browser options
# Ignore robots.txt. Do not do this without thought and consideration.
br.set_handle_robots(False)

# Don't add Referer (sic) header
br.set_handle_referer(False)

# Don't handle Refresh redirections
br.set_handle_refresh(False)

#Setting the user agent as firefox
br.addheaders = [('User-agent', 'Firefox')]
br.open('https://ca.linkedin.com/in/ckyue')
# page = urllib.urlopen('https://ca.linkedin.com/in/ckyue').read()
soup = BeautifulSoup(br.response().read())
skill = soup.findAll("span", {"class" : "wrap"})
skills = []
counter = 10
while (counter > 0):
    skills.append(soup.findAll("span", {"class" : "wrap"})[10-counter].string)
    counter = counter - 1
# print soup.prettify()[0:1000000]

# with open(outputfilename, 'wb') as outfile:
#     json.dump(skills, outfile)
f = open("skills.txt", "w")
print >>f,json.dumps(skills, ensure_ascii=False)
f.close()
print skills[0:10]
print json.dumps(skills, ensure_ascii=False)
