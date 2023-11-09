import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import styled from 'styled-components'
import { ChangeEvent, FC, HTMLAttributes } from 'react'
import { InputGroup, SelectGroup } from '../molecules'
import { Button, ValidationMessage, Radio, Icon, Spinner } from '../atoms'
import { FlexBox, colors, dimensions } from '../../styles'
import { useCreateResource, useUpdateResource } from '../../hooks'

const ButtonContainerStyled = styled(FlexBox)`
  gap: ${dimensions.spacing.xs};
  margin: ${dimensions.spacing.xs} 0;
  ${Button} {
    font-weight: 500;
    margin: 0rem;
  }
`
type TButton = HTMLAttributes<HTMLParagraphElement> & {
  backgroundColor?: string
  padding?: string
}
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
export type TResourceForm = Omit<
  z.infer<typeof ResourceFormSchema>,
  'topics'
> & {
  topics: string | string[]
  topicId?: string
  id?: string
}
const ResourceFormStyled = styled.form`
  ${Radio} {
    margin-top: ${dimensions.spacing.xl};
  }
`
type TSelectOption = {
  value: string
  label: string
  id?: string
}
export type TSelectOptions = {
  selectOptions: TSelectOption[]
  initialValues?: Partial<TResourceForm>
  resourceId?: string
}
const ResourceForm: FC<TSelectOptions> = ({
  selectOptions,
  initialValues,
  resourceId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TResourceForm>({
    resolver: zodResolver(ResourceFormSchema),
    defaultValues: initialValues ?? undefined,
  })

  const buttonText = initialValues ? 'Editar' : 'Crear'
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
    })
  })
  const update = handleSubmit(async (data) => {
    const { title, description, url, topicId, resourceType } = data
    const updatedData = {
      id: resourceId,
      title,
      description,
      url,
      topicId: topicId ?? initialValues?.topicId ?? '',
      resourceType,
    }
    await updateResource.mutateAsync(updatedData)
  })
  const handleTopicChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTopicId = event.target.value
    const selectedTopic = selectOptions.find(
      (option) => option.value === selectedTopicId
    )
    if (selectedTopic) {
      setValue('topics', selectedTopic.label)
      setValue('topicId', selectedTopic.value)
    }
  }
  return (
    <ResourceFormStyled
      onSubmit={initialValues ? update : create}
      data-testid="resource-form"
    >
      <InputGroup
        hiddenLabel
        id="title"
        label="Título"
        placeholder="Título"
        {...register('title')}
        data-testid="resourceTitle"
        error={errors.title && true}
        validationMessage={errors.title?.message}
        validationType="error"
      />
      <InputGroup
        hiddenLabel
        id="description"
        label="Descripción"
        placeholder="Descripción"
        {...register('description')}
        error={errors.description && true}
        validationMessage={errors.description?.message}
        validationType="error"
      />
      <InputGroup
        hiddenLabel
        id="url"
        label="URL"
        placeholder="URL"
        {...register('url')}
        error={errors.url && true}
        validationMessage={errors.url?.message}
        validationType="error"
      />
      <SelectGroup
        id="topics"
        label="Tema"
        options={selectOptions}
        {...register('topics')}
        defaultValue={initialValues?.topicId}
        error={!!errors.topics}
        validationMessage={errors.topics?.message}
        onChange={handleTopicChange}
      />
      <Radio
        {...register('resourceType')}
        options={[
          { id: 'VIDEO', name: 'Video' },
          { id: 'TUTORIAL', name: 'Curso' },
          { id: 'BLOG', name: 'Blog' },
        ]}
        inputName="resourceType"
        defaultChecked="VIDEO"
      />
      <FlexErrorStyled align="start">
        {errors?.title ||
        errors?.description ||
        errors?.url ||
        errors?.topics ? (
          <ValidationMessage />
        ) : null}
      </FlexErrorStyled>
      <ButtonContainerStyled align="stretch">
        {isCreateSuccess || isUpdateSuccess ? (
          <ButtonStyled
            backgroundColor={colors.success}
            padding={dimensions.spacing.xs}
            disabled
          >
            <Icon data-testid="done-icon" name="done" />
          </ButtonStyled>
        ) : (
          <Button type="submit" disabled={isCreateLoading || isUpdateLoading}>
            {isCreateLoading || isUpdateLoading ? (
              <Spinner size="xsmall" />
            ) : (
              buttonText
            )}
          </Button>
        )}
      </ButtonContainerStyled>
    </ResourceFormStyled>
  )
}
export default ResourceForm
