/*!
 * Coded by CallMeKory - https://github.com/callmekory
 * 'It’s not a bug – it’s an undocumented feature.'
 */

// Https://discourse.pi-hole.net/t/pi-hole-api/1863

import got from 'got'
import { Device } from './Device'
import { Room } from './Room'
import { SengledDevices } from './typings'

export class Sengled {
  jsessionid: string
  baseUrl: string
  headers: {}

  constructor() {
    this.jsessionid = ''
    this.baseUrl = 'https://us-elements.cloud.sengled.com:443/zigbee'
    this.headers = {}
  }

  /**
   * Login and authenticate Sengled session
   * @param username Sengled username
   * @param password Sengled password
   */
  async login(username: string, password: string) {
    const resp = (await got(`${this.baseUrl}/customer/remoteLogin.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uuid: 'xxx',
        isRemote: 'true',
        user: username,
        pwd: password,
        os_type: 'ios'
      })
    }).json()) as any

    if (resp.ret === 0) {
      this.jsessionid = resp.jsessionid
      this.headers = {
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${resp.jsessionid}`
      }
      return resp.jsessionid
    }
    throw new Error(resp.msg)
  }

  async getRooms() {
    const response = await got(`${this.baseUrl}/room/getUserRoomsDetail.json`, {
      method: 'POST',
      headers: this.headers
    }).json()

    const data = response as SengledDevices

    const rooms = data.roomList.map((room) => new Room(room, this.jsessionid))

    return rooms
  }

  async getDevices() {
    const rooms = await this.getRooms()

    const deviceList: Device[] = []

    rooms.forEach((room) => room.deviceList.forEach((device) => deviceList.push(device)))

    return deviceList
  }
}
