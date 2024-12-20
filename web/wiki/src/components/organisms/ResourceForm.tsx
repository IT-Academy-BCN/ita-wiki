import {
  Button,
  FlexBox,
  Icon,
  InputGroup,
  RadioGroup,
  SelectGroup,
  Spinner,
  TOption,
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
import { FC, HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import {
  usePatchResources,
  usePostResources,
} from '../../openapi/openapiComponents'
import { TResourceType } from '../../types'
import { reloadPage } from '../../utils/navigation'
import { DescriptionGenerator } from '../molecules'

type TButton = HTMLAttributes<HTMLParagraphElement> & {
  $backgroundColor?: string
  padding?: string
}

const FormStyled = styled.form``

const ErrorStyled = styled(FlexBox)`
  margin-bottom: ${dimensions.spacing.base};
`

const ButtonStyled = styled(Button)<TButton>`
  margin: ${dimensions.spacing.none};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border: 2px solid ${({ $backgroundColor }) => $backgroundColor};
  padding: ${({ padding }) => padding};
  &:hover,
  &:disabled {
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    border: 2px solid ${({ $backgroundColor }) => $backgroundColor};
  }
`

const ButtonContainerStyled = styled(FlexBox)`
  margin: ${dimensions.spacing.xs} 0;

  ${ButtonStyled} {
    font-weight: 500;
    margin: 0rem;
  }
`

const ResourceFormSchema = z.object({
  title: z
    .string({ required_error: 'Este campo es obligatorio' })
    .min(1, { message: 'Este campo es obligatorio' }),
  description: z
    .string({ required_error: 'Este campo es obligatorio' })
    .min(3, { message: 'Este campo es obligatorio' }),
  url: z
    .string({ required_error: 'Este campo es obligatorio' })
    .url({ message: 'La URL proporcionada no es válida' }),
  topics: z.string().refine((val) => val !== '', {
    message: 'Debe seleccionar un tema',
  }),
  topicId: z
    .string()
    .optional()
    .refine((val) => val !== '', 'Debe seleccionar un tema válido'),
  resourceType: z
    .union([
      z.string().min(1, { message: 'Debe seleccionar una opción válida' }),
      z.null(),
    ])
    .refine((val) => val !== null, {
      message: 'Debe seleccionar una opción válida',
    }),
})

export type TInitialValues = Omit<
  z.infer<typeof ResourceFormSchema>,
  'topics'
> & {
  topics: string | string[]
  topicId?: string
  id?: string
  resourceType: TResourceType
}

const StyledRadio = styled(RadioGroup)`
  padding: ${dimensions.spacing.sm};
  margin: auto;
`

const StyledTextareaGroup = styled(TextareaGroup)<{ error?: boolean }>`
  resize: none;
  margin-top: ${dimensions.spacing.none}!important;
  margin-bottom: ${({ error }) =>
    error ? dimensions.spacing.none : dimensions.spacing.base}!important;
`

export type TResourceForm = {
  selectOptions: TOption[]
  initialValues?: Partial<TInitialValues>
  resourceId?: string
}

export const ResourceForm: FC<TResourceForm> = ({
  selectOptions,
  initialValues,
  resourceId,
}) => {
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
    mutate: createResource,
    error: createResourceError,
  } = usePostResources({
    onSuccess: () => {
      reset()
      reloadPage()
    },
  })

  const {
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    mutate: updateResource,
    error: updateResourceError,
  } = usePatchResources({
    onSuccess: () => {
      reset()
      reloadPage()
    },
  })

  const create = handleSubmit(async (data) => {
    const { title, description, url, topics, resourceType } = data

    createResource({
      body: {
        title,
        description,
        url,
        topics: (topics as string[]) || [topics],
        resourceType,
        categoryId: `${state.id}`,
      },
    })
  })

  const update = handleSubmit(async (data) => {
    const { title, description, url, topics, resourceType } = data
    if (resourceId !== undefined) {
      updateResource({
        body: {
          id: resourceId,
          title,
          description,
          url,
          topicId: topics[0] ?? initialValues?.topicId,
          resourceType,
        },
      })
    }
  })

  const initialTopicLabel = selectOptions.find(
    (option) => option.value === initialValues?.topicId
  )?.value

  return (
    <FormStyled
      onSubmit={initialValues ? update : create}
      data-testid="resource-form"
    >
      {createResourceError || updateResourceError ? (
        <ErrorStyled data-testid="error-message">
          <ValidationMessage
            color="error"
            text={t(
              `${createResourceError?.payload || updateResourceError?.payload}`
            )}
          />
        </ErrorStyled>
      ) : null}
      <InputGroup
        hiddenLabel
        id="title"
        label={t('Título')}
        placeholder={t('Título')}
        {...register('title')}
        data-testid="resourceTitle"
        error={errors.title && true}
        validationMessage={errors.title && t(`${errors.title?.message}`)}
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
        validationMessage={
          errors.description && t(`${errors.description?.message}`)
        }
        validationType="error"
      />
      <DescriptionGenerator
        title={watch('title')}
        url={watch('url')}
        topic={watch('topics')}
        setDescription={(desc) => setValue('description', desc)}
      />
      <InputGroup
        hiddenLabel
        id="url"
        label="URL"
        data-testid="resourceUrl"
        placeholder="URL"
        {...register('url')}
        error={errors.url && true}
        validationMessage={errors.url && t(`${errors.url?.message}`)}
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
        validationMessage={errors.topics && t(`${errors.topics?.message}`)}
        hiddenLabel
      />
      <StyledRadio
        id="resourceType"
        label="Resource Type"
        hiddenLabelGroup
        {...register('resourceType')}
        options={[
          { id: 'VIDEO', name: 'Video' },
          { id: 'TUTORIAL', name: t('Curso') },
          { id: 'BLOG', name: 'Blog' },
        ]}
        direction="row"
        data-testid="resourceType"
        inputName="resourceType"
        error={errors.resourceType && true}
        errorMessage={
          errors.resourceType && t(`${errors.resourceType?.message}`)
        }
      />
      <ButtonContainerStyled align="stretch" gap={dimensions.spacing.xs}>
        {isCreateSuccess || isUpdateSuccess ? (
          <ButtonStyled
            $backgroundColor={colors.success}
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
