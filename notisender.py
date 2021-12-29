import requests
import json
baseURL = 'https://eventhubum.com/EventHub/rest'
usersURL = baseURL + '/users'
eventsURL = baseURL + '/events'

def getEvent(eventId):
    print('Getting Event with id ' + eventId)
    response = requests.get(eventsURL + '/get/' + eventId)
    
    if response.status_code == 200:
        return response.json()
    else:
        return None

def getPushTokens():
    #Currently lack way of obtaining all user pushTokens, so going to return a hardcoded array for now
    return ['ExponentPushToken[y4tqnCExADJYMmR_vcH5RI]', 'ExponentPushToken[28DZa9PZFiMgh9H5ulMXtv]', 'ExponentPushToken[YHji26KT6-9Cjp8YxvfFbu]', 
            'ExponentPushToken[nQdtRBOEbFh9zLPYJwn5Gf]']

def sendNotis(pushTokens, eventjson):
    pushArr = []
    for token in pushTokens:
        pushArr.append(
            {
                'to': token,
                'sound': 'default',
                'title': 'Trending Event',
                'body': eventjson['name'] + ' is trending! Tap to learn more about this event.',
                'data': {
                    'eventId': eventjson['id'],
                    'type': 'Invitation',
                }
            }
        )
    reqheaders = {
            'host': 'exp.host',
            'accept': 'application/json',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/json'
    }
    postResponse = requests.post('https://exp.host/--/api/v2/push/send', headers = reqheaders, data = json.dumps(pushArr))

    if postResponse.status_code == 200:
        print('push notifications sent successfully')
    else:
        print('something went wrong when sending push notifications')
    
def main():
    print('Enter the id of the event you are promoting:', end = ' ')
    eventId = input()
    eventjson = getEvent(eventId)
    
    if not eventjson is None:
        print(eventjson)
        tokenArray = getPushTokens()
        sendNotis(tokenArray, eventjson)
    else:
        print('Event Request Failed')

if __name__ == '__main__':
    main()