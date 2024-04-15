import { TSsoListItinerariesResponse } from '../../schemas/sso/ssoListItineraries'
import { DefaultError } from '../errors'
import { pathSso } from './pathSso'

export async function listItineraries() {
  const fetchSSO = await fetch(pathSso.v1.itineraries, {
    method: 'GET',
  })

  const fetchData = await fetchSSO.json()

  const { status, ok } = fetchSSO
  if (!ok) {
    throw new DefaultError(status, fetchData.message)
  }
  return fetchData as TSsoListItinerariesResponse
}
