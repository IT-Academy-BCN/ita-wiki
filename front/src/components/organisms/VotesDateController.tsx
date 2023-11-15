import { FC, useState } from 'react' 
import styled from 'styled-components' 
import { useTranslation } from 'react-i18next'
import { FlexBox, colors, device, dimensions  } from '../../styles'
import { Icon, Text } from '../atoms'

const VotesDateContainer = styled(FlexBox)`
  display: none;

  @media only ${device.Tablet} {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    direction: row;
    width: 100%;
    padding-right: ${dimensions.spacing.base};
  }
`;

const StyledVotesToggle = styled.div`
  cursor: pointer;
  display: inline;

  &:active {
    transform: scale(0.96);
  }
`;

const StyledDateToggle = styled.div`
  color: ${colors.black.black1};
  cursor: pointer;
  display: inline;

  &:active {
    transform: scale(0.96);
  }
`;

type TVotesDate = {
  sortOrder: string
  handleSortOrder: () => void 
  handleSortByVotes: () => void
  handleSortByDates: () => void
}

const VotesDateController: FC<TVotesDate> = ({
  sortOrder,
  handleSortOrder,
  handleSortByVotes,
  handleSortByDates
}) => {  
  const { t } = useTranslation()

  const [selectedOption, setSelectedOption] = useState<'Fecha' | 'Votos' | null>(null)

  return (
    <VotesDateContainer>
      <FlexBox direction="row" gap="15px">
        <FlexBox direction="row">
          <StyledVotesToggle 
            onClick={() => { 
              handleSortByVotes()
              handleSortOrder()
              setSelectedOption('Votos')
            }}
          >
            <Text fontWeight={selectedOption === 'Votos' ? 'bold' : 'normal'}>
              {t('Votos')}
            </Text>
          </StyledVotesToggle>
          {selectedOption === 'Votos' && (
            sortOrder === 'desc' ? (
              <Icon name="arrow_upward" />
            ) : (
              <Icon name="arrow_downward" />
            )
          )}
        </FlexBox>
        <StyledDateToggle
          onClick={() => { 
            handleSortByDates()
            handleSortOrder()
            setSelectedOption('Fecha')
          }}
        >
          <Text 
            fontWeight={selectedOption === 'Fecha' ? 'bold' : 'normal'}>
            {t('Fecha')}
          </Text>
        </StyledDateToggle>
        {selectedOption === 'Fecha' && (
          sortOrder === 'desc' ? (
            <Icon 
                name="arrow_upward" 
                style={{ marginLeft: '-15px' }}
            />
          ) : (
            <Icon 
                name="arrow_downward" 
                style={{ marginLeft: '-15px' }} 
            />
          )
        )}
      </FlexBox>
    </VotesDateContainer>
  ) 
}

export { VotesDateController }
