import got from 'got'
import urljoin from 'url-join'

import { Device } from './Device'
import { RoomList, ScheduleList } from './typings'

export class Room {
  private headers: { 'Content-Type': string; Cookie: string }

  private baseUrl: string

  private jsessionid: string

  roomId: number

  roomName: string

  roomImgType: number

  roomImgUrl: string

  roomStatus: number

  brightness: number

  colortemperature: number

  rgbColorR: number

  rgbColorG: number

  rgbColorB: number

  scheduleList: ScheduleList[]

  deviceList: Device[]

  constructor(
    {
      roomId,
      roomName,
      roomImgType,
      roomImgUrl,
      roomStatus,
      brightness,
      colortemperature,
      rgbColorR,
      rgbColorG,
      rgbColorB,
      deviceList,
      scheduleList
    }: RoomList,
    jsessionid: string
  ) {
    this.baseUrl = 'https://us-elements.cloud.sengled.com:443/zigbee'
    this.headers = {
      'Content-Type': 'application/json',
      Cookie: `JSESSIONID=${jsessionid}`
    }
    this.jsessionid = jsessionid

    this.roomId = roomId
    this.roomName = roomName
    this.roomImgType = roomImgType
    this.roomImgUrl = roomImgUrl
    this.roomStatus = roomStatus
    this.brightness = brightness
    this.colortemperature = colortemperature
    this.rgbColorR = rgbColorR
    this.rgbColorG = rgbColorG
    this.rgbColorB = rgbColorB
    this.scheduleList = scheduleList

    this.deviceList = deviceList.map((device) => {
      device.roomName = this.roomName

      return new Device(device, this.jsessionid)
    })
  }

  /**
   * Turns device on
   */
  public async on() {
    for (const device of this.deviceList) {
      await got(urljoin(this.baseUrl, '/device/deviceSetBrightness.json'), {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          deviceUuid: device.deviceUuid,
          brightness: 255
        })
      })
    }
    return 'OK'
  }

  /**
   * Turns device off
   */
  public async off() {
    for (const device of this.deviceList) {
      await got(urljoin(this.baseUrl, '/device/deviceSetBrightness.json'), {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          deviceUuid: device.deviceUuid,
          brightness: 0
        })
      })
    }
    return 'OK'
  }

  /**
   * Sets device brightneess between 1-100
   * @param brightness new device brightness
   */
  public async setBrightness(brightness: number) {
    const convertedBrightness = (brightness / 100) * 255
    for (const device of this.deviceList) {
      await got(urljoin(this.baseUrl, '/device/deviceSetBrightness.json'), {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          deviceUuid: device.deviceUuid,
          brightness: convertedBrightness
        })
      })
    }
    return 'OK'
  }

  /**
   * Sets device color temperature between 1-100
   * @param colorTemp new device color temperature
   */
  public async setColorTemperature(colorTemp: number) {
    const convertedColorTemp = (colorTemp / 100) * 255
    for (const device of this.deviceList) {
      await got(urljoin(this.baseUrl, '/device/deviceSetColorTemperature.json'), {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          deviceUuid: device.deviceUuid,
          colorTemperature: convertedColorTemp
        })
      })
    }
    return 'OK'
  }
}
