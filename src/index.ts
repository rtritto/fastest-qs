// https://github.com/elysiajs/elysia/blob/main/src/fast-querystring.ts
import fastDecode from 'fast-decode-uri-component'

const plusRegex = /\+/g

// Parse query without array
export function parseQueryFromURL(input: string) {
  const result = <Record<string, string>>{}

  if (typeof input !== 'string') return result

  let key = ''
  let value = ''
  let startingIndex = -1
  let equalityIndex = -1
  let flags = 0

  const { length } = input

  for (let i = 0; i < length; i++) {
    switch (input.codePointAt(i)) {
      case 38: { // '&'
        const hasBothKeyValuePair = equalityIndex > startingIndex
        if (!hasBothKeyValuePair) equalityIndex = i

        key = input.slice(startingIndex + 1, equalityIndex)

        if (hasBothKeyValuePair || key.length > 0) {
          if (flags & 0b0000_0001) key = key.replaceAll(plusRegex, ' ')
          if (flags & 0b0000_0010) key = fastDecode(key) || key

          if (!result[key]) {
            if (hasBothKeyValuePair) {
              value = input.slice(equalityIndex + 1, i)

              if (flags & 0b0000_0100)
                value = value.replaceAll(plusRegex, ' ')
              if (flags & 0b0000_1000)
                value = fastDecode(value) || value
            }

            result[key] = value
          }
        }

        key = ''
        value = ''
        startingIndex = i
        equalityIndex = i
        flags = 0
        break
      }

      case 61: { // '='
        if (equalityIndex <= startingIndex) equalityIndex = i
        else flags |= 0b0000_1000
        break
      }

      case 43: { // '+'
        flags |= equalityIndex > startingIndex ? 0b0000_0100 : 0b0000_0001
        break
      }

      case 37: { // '%'
        flags |= equalityIndex > startingIndex ? 0b0000_1000 : 0b0000_0010
        break
      }
    }
  }

  if (startingIndex < length) {
    const hasBothKeyValuePair = equalityIndex > startingIndex
    key = input.slice(startingIndex + 1, hasBothKeyValuePair ? equalityIndex : length)

    if (hasBothKeyValuePair || key.length > 0) {
      if (flags & 0b0000_0001) key = key.replaceAll(plusRegex, ' ')
      if (flags & 0b0000_0010) key = fastDecode(key) || key

      if (!result[key]) {
        if (hasBothKeyValuePair) {
          value = input.slice(equalityIndex + 1, length)

          if (flags & 0b0000_0100) value = value.replaceAll(plusRegex, ' ')
          if (flags & 0b0000_1000) value = fastDecode(value) || value
        }

        result[key] = value
      }
    }
  }

  return result
}
