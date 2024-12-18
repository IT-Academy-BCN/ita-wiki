import { FC } from 'react'
import { Button, dimensions, Text } from '@itacademy/ui'
import { useTranslation } from 'react-i18next'
import { useGenerateDescription } from '../../hooks'

type TDescriptionGenerator = {
  title?: string
  url?: string
  topic?: string | string[]
  setDescription: (description: string) => void
}

export const DescriptionGenerator: FC<TDescriptionGenerator> = ({
  title,
  url,
  topic,
  setDescription,
}) => {
  const { t } = useTranslation()
  const isDisabled = !title || !url || !topic
  const generateDescription = useGenerateDescription({
    onSuccess: setDescription,
  })

  const handleClick = () => {
    if (!isDisabled) {
      generateDescription.mutate({
        title,
        url,
        topic: topic as string,
        language: 'es',
      })
    }
  }
  return (
    <>
      <Text
        style={{
          marginBottom: dimensions.spacing.xs,
          marginTop: '-0.5rem',
          fontSize: '0.8rem',
          fontStyle: 'italic',
          opacity: 0.6,
        }}
        data-testid="description-generator-text"
      >
        {t('Para generar una descripción con IA, rellena título, URL y tema.')}
      </Text>
      <Button
        onClick={handleClick}
        type="button"
        disabled={isDisabled}
        outline={isDisabled}
        size="small"
        style={{
          width: 'auto',
          marginBottom: dimensions.spacing.md,
          fontSize: '0.8rem',
          fontWeight: 300,
        }}
        data-testid="description-generator-button"
      >
        {t('Generar descripción')}
      </Button>
    </>
  )
}
