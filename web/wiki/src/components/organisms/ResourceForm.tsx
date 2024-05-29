import {
  Button,
  FlexBox,
  Icon,
  InputGroup,
  Radio,
  SelectGroup,
  Spinner,
  TextareaGroup,
  ValidationMessage,
  colors,
  dimensions,
} from '@itacademy/ui'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ChangeEvent, FC, HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import { useCreateResource, useUpdateResource } from '../../hooks'

type TButton = HTMLAttributes<HTMLParagraphElement> & {
  backgroundColor?: string
  padding?: string
}

const FormStyled = styled.form``

const ButtonStyled = styled(Button)<TButton>`
  margin: ${dimensions.spacing.none};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 2px solid ${({ backgroundColor }) => backgroundColor};
  padding: ${({ padding }) => padding};
  &:hover,
  &:disabled {
    background-color: ${({ backgroundColor }) => backgroundColor};
    border: 2px solid ${({ backgroundColor }) => backgroundColor};
  }
`

const ButtonContainerStyled = styled(FlexBox)`
  margin: ${dimensions.spacing.xs} 0;

  ${ButtonStyled} {
    font-weight: 500;
    margin: 0rem;
  }
`

const FlexErrorStyled = styled(FlexBox)`
  height: ${dimensions.spacing.xxxs};
  margin-left: 0.2rem;
`

const ResourceFormSchema = z.object({
  title: z
    .string({ required_error: 'Este campo es obligatorio' })
    .min(1, { message: 'Este campo es obligatorio' }),
  description: z
    .string({ required_error: 'Este campo es obligatorio' })
    .min(1, { message: 'Este campo es obligatorio' }),
  url: z
    .string({ required_error: 'Este campo es obligatorio' })
    .url({ message: 'La URL proporcionada no es válida' }),
  topics: z.string().refine((val) => val !== '', {
    message: 'Debe seleccionar al menos un tema',
  }),
  topicId: z
    .string()
    .optional()
    .refine((val) => val !== '', 'Debe seleccionar un tema válido'),
  resourceType: z.string(),
})

export type TInitialValues = Omit<
  z.infer<typeof ResourceFormSchema>,
  'topics'
> & {
  topics: string | string[]
  topicId?: string
  id?: string
}

const StyledRadio = styled(Radio)`
  margin-top: ${dimensions.spacing.xl};
`

const StyledTextareaGroup = styled(TextareaGroup)<{ error?: boolean }>`
  resize: none;
  margin-top: ${dimensions.spacing.none}!important;
  margin-bottom: ${({ error }) =>
    error ? dimensions.spacing.none : dimensions.spacing.base}!important;
`

type TSelectOption = {
  value: string
  label: string
  id?: string
}

export type TResourceForm = {
  selectOptions: TSelectOption[]
  initialValues?: Partial<TInitialValues>
  resourceId?: string
}

export const ResourceForm: FC<TResourceForm> = ({
  selectOptions,
  initialValues,
  resourceId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TInitialValues>({
    resolver: zodResolver(ResourceFormSchema),
    defaultValues: initialValues ?? undefined,
  })
  const { state } = useLocation()

  const { t } = useTranslation()

  const buttonText = initialValues ? t('Editar') : t('Crear')
  const {
    isLoading: isCreateLoading,
    isSuccess: isCreateSuccess,
    createResource,
  } = useCreateResource()
  const {
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    updateResource,
  } = useUpdateResource()

  const create = handleSubmit(async (data) => {
    const { title, description, url, topics, resourceType } = data
    await createResource.mutateAsync({
      title,
      description,
      url,
      topics: [topics],
      resourceType,
      categoryId: `${state.id}`,
    })
  })
  const update = handleSubmit(async (data) => {
    const { title, description, url, topicId, resourceType } = data

    const updatedData = {
      id: resourceId,
      title,
      description,
      url,
      topicId: topicId ?? initialValues?.topicId,
      resourceType,
    }
    await updateResource.mutateAsync(updatedData)
  })

  const handleTopicChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTopicId = event.target.value
    const selectedTopic = selectOptions.find(
      (option) => option.label === selectedTopicId
    )
    if (selectedTopic) {
      setValue('topics', selectedTopic.label)
      setValue('topicId', selectedTopic.value)
    }
  }
  const initialTopicLabel = selectOptions.find(
    (option) => option.value === initialValues?.topicId
  )?.label

  return (
    <FormStyled
      onSubmit={initialValues ? update : create}
      data-testid="resource-form"
    >
      <InputGroup
        hiddenLabel
        id="title"
        label={t('Título')}
        placeholder={t('Título')}
        {...register('title')}
        data-testid="resourceTitle"
        error={errors.title && true}
        validationMessage={errors.title?.message}
        validationType="error"
      />
      <StyledTextareaGroup
        hiddenLabel
        id="description"
        rows={3}
        data-testid="resourceDescription"
        label={t('Descripción')}
        placeholder={t('Descripción')}
        {...register('description')}
        error={errors.description && true}
        validationMessage={errors.description?.message}
        validationType="error"
      />
      <InputGroup
        hiddenLabel
        id="url"
        label="URL"
        data-testid="resourceUrl"
        placeholder="URL"
        {...register('url')}
        error={errors.url && true}
        validationMessage={errors.url?.message}
        validationType="error"
      />
      <SelectGroup
        id="topics"
        label={t('Tema')}
        placeholder={t('Tema')}
        options={selectOptions}
        data-testid="resourceTopic"
        {...register('topics')}
        defaultValue={initialTopicLabel ?? ''}
        $error={!!errors.topics}
        validationMessage={errors.topics?.message}
        onChange={handleTopicChange}
        hiddenLabel
      />
      <StyledRadio
        {...register('resourceType')}
        options={[
          { id: 'VIDEO', name: 'Video' },
          { id: 'TUTORIAL', name: t('Curso') },
          { id: 'BLOG', name: 'Blog' },
        ]}
        direction="row"
        inputName="resourceType"
        data-testid="resourceType"
        defaultChecked='VIDEO'
      />
      <FlexErrorStyled align="start">
        {errors?.title ||
        errors?.description ||
        errors?.url ||
        errors?.topics ? (
          <ValidationMessage />
        ) : null}
      </FlexErrorStyled>
      <ButtonContainerStyled align="stretch" gap={dimensions.spacing.xs}>
        {isCreateSuccess || isUpdateSuccess ? (
          <ButtonStyled
            backgroundColor={colors.success}
            padding={dimensions.spacing.xs}
            disabled
          >
            <Icon data-testid="done-icon" name="done" />
          </ButtonStyled>
        ) : (
          <Button
            type="submit"
            data-testid="submit-button"
            disabled={isCreateLoading || isUpdateLoading}
          >
            {isCreateLoading || isUpdateLoading ? (
              <Spinner size="xsmall" />
            ) : (
              buttonText
            )}
          </Button>
        )}
      </ButtonContainerStyled>
    </FormStyled>
  )
}
