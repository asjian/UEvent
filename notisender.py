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
    return [{'userId':5, 'pushToken':'ExponentPushToken[y4tqnCExADJYMmR_vcH5RI]'}, 
            {'userId':5, 'pushToken':'ExponentPushToken[28DZa9PZFiMgh9H5ulMXtv]'},
            {'userId':5, 'pushToken':'ExponentPushToken[YHji26KT6-9Cjp8YxvfFbu]'},
            {'userId':5, 'pushToken':'ExponentPushToken[nQdtRBOEbFh9zLPYJwn5Gf]'}]

def handleErrors(pushResponse, pushTokens):
    if 'data' in pushResponse:
        for i in range(len(pushResponse['data'])):
            response = pushResponse['data'][i]
            if response['status'] == 'error':
                if response['details']['error'] == 'DeviceNotRegistered':
                    print('deleting bad token')
                    requests.delete(usersURL + '/deletePushToken', headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}, data = json.dumps({'pushToken': pushTokens[i]['pushToken']}))

def sendNotis(pushTokens, eventjson):
    pushArr = []
    for tokendict in pushTokens:
        pushArr.append(
            {
                'to': tokendict['pushToken'],
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
        print('Push notifications sent successfully')
    else:
        print('something went wrong when sending push notifications')
    
    handleErrors(postResponse.json(), pushTokens)

def main():
    print('Enter the event id or the share link:', end = ' ')
    eventId = input()

    if 'https://' in eventId and ('uevent.app' in eventId or 'eventhubum.com' in eventId) and 'eventId=' in eventId:
        eventId = str(int(eventId[eventId.rindex('eventId=') + 8:]) + 10351)
    
    eventjson = getEvent(eventId)
    
    if not eventjson is None:
        print()
        for key in eventjson:
            print(key + ': ' + str(eventjson[key]))
        print()
        print('Confirm this is the right event (Y/N):', end = ' ')
        confirm = input()

        if confirm == 'Y' or confirm == 'y':
            print()
            tokenArray = getPushTokens()
            sendNotis(tokenArray, eventjson)
    else:
        print('Event Request Failed')

if __name__ == '__main__':
    main()
