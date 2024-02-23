export const decodeBase64 = (base64String: string) => {
  const decodedUriComponent = decodeURIComponent(
    atob(base64String)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  return decodedUriComponent
}
