![npm](https://img.shields.io/npm/v/@callmekory/sengled-api?style=for-the-badge)
![npm](https://img.shields.io/npm/dm/@callmekory/sengled-api?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues-raw/callmekory/sengled-api?style=for-the-badge)

# Sengled Api

> Sengled API wrapper for NodeJS.

## Install

```bash
npm install --save @callmekory/sengled-api
```

## Usage

### Controlling Devices

```js
const { Sengled } = require('@callmekory/sengled-api')

const main = async () => {
  const sengled = new Sengled()

  // Login to sengled via username and password
  await sengled.login(username, password)

  // Get devices
  const devices = await sengled.getDevices()

  /**
  Device {
    deviceUuid: 'xxxxx',
    gatewayUuid: 'xxxx',
    deviceName: 'desk lamp',
    brightness: 0,
    colortemperature: 0,
    onoff: 0,
    signalQuality: 1,
    signalValue: 0,
    activeHours: 8274,
    isOnline: 0,
    power: '0',
    onCount: 62,
    powerConsumptionTime: '0',
    productCode: 'E11-G13',
    attributeIds: '0,1,3,4',
    rgbColorR: 144,
    rgbColorG: 255,
    rgbColorB: 255
    }

*/

  // Find device by name
  const myDevice = devices.find((device) => device.deviceName === 'desk lamp')

  // Turn device on
  await myDevice.on()

  // Set brightness to 50%
  await myDevice.setBrightness(50)
}

main()
```

### Controlling Rooms

```js
const { Sengled } = require('@callmekory/sengled-api')

const main = async () => {
  const sengled = new Sengled()

  // Login to sengled via username and password
  await sengled.login(username, password)

  // Get rooms
  const rooms = await sengled.getRooms()

  /**
  [
    Room {
      roomId: xxx,
      roomName: 'Living Room',
      roomImgType: 0,
      roomImgUrl: '002',
      roomStatus: 0,
      brightness: 255,
      colortemperature: 40,
      rgbColorR: 144,
      rgbColorG: 255,
      rgbColorB: 255,
      scheduleList: [ [Object], [Object], [Object] ],
      deviceList: [ [Device], [Device] ]
    }
  ]
*/

  // Find room by name
  const myRoom = rooms.find((room) => room.deviceName === 'Living Room')

  // Turn room devices on
  await myRoom.on()

  // Set room brightness to 50%
  await myRoom.setBrightness(50)
}

main()
```

## Docs
https://callmekory.github.io/sengled-api/index.html






