import { TSsoListItinerariesResponse } from '../../schemas/sso/ssoListItineraries'
import { ServiceUnavailable } from '../errors'
import { pathSso } from './pathSso'

export async function listItineraries() {
  const fetchSSO = await fetch(pathSso.v1.itineraries, {
    method: 'GET',
  })

  const fetchData = (await fetchSSO.json()) as TSsoListItinerariesResponse

  if (fetchSSO.status === 200) {
    return fetchData
  }
  throw new ServiceUnavailable()
}
