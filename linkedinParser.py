import urllib
import json
from decimal import Decimal
from bs4 import BeautifulSoup
from mechanize import Browser

userFinder = Browser()
br = Browser()
# Browser options
# Ignore robots.txt. Do not do this without thought and consideration.
br.set_handle_robots(False)
userFinder.set_handle_robots(False)
# Don't add Referer (sic) header
br.set_handle_referer(False)
userFinder.set_handle_referer(False)
# Don't handle Refresh redirections
br.set_handle_refresh(False)
userFinder.set_handle_refresh(False)

name = 'chuankai+yue' #this should be passed from jquery
search = 'https://www.facebook.com/search/top/?q='
searchLink = search + name;
# print searchLink;
userFinder.addheaders = [('User-agent', 'Firefox')]
userFinder.open(searchLink)

soup_search = BeautifulSoup(userFinder.response().read())
print soup_search.prettify()[0:1000000]
br.addheaders = [('User-agent', 'Firefox')]
br.open('https://ca.linkedin.com/in/ckyue')

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
