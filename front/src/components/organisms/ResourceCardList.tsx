import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { urls } from '../../constants'
import styled from 'styled-components'
import { FlexBox, dimensions } from '../../styles'
import { Spinner, Text, Title } from '../atoms'
import { CardResource } from '../molecules'

// {
//   "resources": [
//     {
//       "id": "string",
//       "title": "My Resource in Javascript",
//       "slug": "my-resource-in-javascript",
//       "description": "Lorem ipsum javascript",
//       "url": "https://tutorials.cat/learn/javascript",
//       "resourceType": "BLOG",
//       "createdAt": "string",
//       "updatedAt": "string",
//       "user": {
//         "name": "string",
//         "email": "user@example.cat"
//       },
//       "topics": [
//         {
//           "topic": {
//             "id": "string",
//             "name": "React",
//             "slug": "react",
//             "categoryId": "string",
//             "createdAt": "string",
//             "updatedAt": "string"
//           }
//         }
//       ],
//       "voteCount": {
//         "upvote": 14,
//         "downvote": 2,
//         "total": 12
//       }
//     }
//   ]
// }

type TResource = {
  id: string
  title: string
  createdBy: string
  createdOn: string
  description: string
  img: string
  url: string
  likes: number
}

// type TResource = {
//   id: string
//   name: string
// }

type TResources = {
  resources: TResource[]
}

const StyledSpinner = styled(Spinner)`
  width: 100px;
  height: 100px;
  align-self: center;
  justify-content: center;
`

const StyledFlexBox = styled(FlexBox)`
  padding-left: ${dimensions.spacing.lg};
  margin-top: ${dimensions.spacing.lg};
  justify-content: flex-start;
  gap: ${dimensions.spacing.base};
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledText = styled(Text)`
  margin: 2rem;
`

const getResourcesByCategory = (categorySlug: string | undefined) =>
  fetch(urls.getResourcesByCategory + categorySlug, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching topics: ${res.statusText}`)
      }
      console.log(res)
      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching topics: ${err.message}`)
    })

type TTopic = {
  id: string
  name: string
}

type TTopics = {
  topics: TTopic[]
}

const ResourceCardList = () => {
  const { slug } = useParams()

  const categorySlug: string | undefined = slug

  const { isLoading, data, error } = useQuery({
    queryKey: ['getResourcesByCategory', categorySlug],
    queryFn: () => getResourcesByCategory(categorySlug),
  })

  if (error) return <p>Ha habido un error...</p>

  console.log('DATA', data)

  return (
    <>
      <StyledFlexBox direction="column">
        {isLoading && <StyledSpinner role="status" />}

        {data?.resources.map((resource: TResource) => (
          <p key={resource.id}>{resource.title}</p>
        ))}

        {/* {data?.topics.length > 0 ? (
          data.topics.map((topic: TTopic) => <p key={topic.id}>{topic.name}</p>)
        ) : (
          <FlexBox>
            <StyledText>
              ¡Vaya! :/
              <br />
              Todavía no hay recursos de este tipo.
              <br />
              ¡Añade uno!
            </StyledText>
          </FlexBox>
        )} */}
        {/* {data?.topics.map((item) => (
                <p key={item.id}>{item.name}</p>
              ))}
              {resources.map((sd) => (
                <CardResource
                  key={sd.id}
                  img={sd?.img}
                  id={sd.createdOn}
                  title={sd.title}
                  url={sd.url}
                  description={sd.description}
                  likes={sd.likes}
                  createdBy={sd.createdBy}
                  createdOn={sd.createdOn}
                />
              ))} */}
      </StyledFlexBox>
    </>
  )
}

export { ResourceCardList }
