import { TSsoGetItinerariesResponse } from '../../schemas/sso/ssoGetItineraries'
import { ServiceUnavailable } from '../errors'
import { pathSso } from './pathSso'

export async function getItineraries() {
  const fetchSSO = await fetch(pathSso.getItineraries, {
    method: 'GET',
  })

  const { status } = fetchSSO
  const fetchData = (await fetchSSO.json()) as TSsoGetItinerariesResponse

  switch (status) {
    case 200:
      return fetchData

    default:
      throw new ServiceUnavailable()
  }
}
