export function shortenAddress(address: string | null | undefined, chars = 4): string {
  if (!address) {
    return ''
  }

  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}

export function shortenExpertise(
  expertise: string[] | null | undefined,
  extraExpertise: string[] | null | undefined,
  chars = 90
): string {
  if (!expertise || !extraExpertise) {
    return ''
  }
  const allExpertise = expertise.concat(extraExpertise).toString()

  const appendDots = allExpertise.length > chars ? '...' : ''
  return `${allExpertise.substring(0, chars + 1)} ${appendDots}`
}

export function formattedDate(date: string) {
  if (!date) {
    return ''
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const _date = new Date(date)
  const month = _date.getMonth()
  const day = _date.getDate()
  const year = _date.getFullYear()
  return `${months[month]} ${day}, ${year}`
}
