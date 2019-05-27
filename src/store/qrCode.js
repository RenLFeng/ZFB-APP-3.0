import QRCode from 'qrcode'

export async function build (text) {
  const result = await QRCode.toDataURL(text)
  return result
}