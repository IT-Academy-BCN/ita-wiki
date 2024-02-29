import { HttpResponse, http } from 'msw'

export const listItinerariesHandler = http.get(
  'http://localhost:8000/api/v1/itineraries',
  async () => {
    const itineraries = [
      {
        id: 'clpb8tgmt000308l98pxn1rgj',
        name: 'Backend Node.js',
        slug: 'backend-nodejs',
      },
      {
        id: 'clpb8tc17000208l90u4h0wqn',
        name: 'Backend Java',
        slug: 'backend-java',
      },
      {
        id: 'clpb8t7kv000108l942sb5voy',
        name: 'Frontend React',
        slug: 'frontend-react',
      },
    ]
    return HttpResponse.json(itineraries, { status: 200 })
  }
)
