export { decodePayload }

/**
 * 解析并获取token的payload
 * @param token 需要解析的token
 */
function decodePayload(token: string | null) {
    if (!token) return null
    const tokenParts = token.split('.')
    if (tokenParts.length < 2) return null

    const payloadBase64 = tokenParts[1]
    try {
        const payloadJson = atob(payloadBase64 as string)
        return JSON.parse(payloadJson)
    } catch {
        return null
    }
}
