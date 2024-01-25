import { Radio } from '@itacademy/ui'
import { Ref, forwardRef } from 'react'

type TRadioOptions = {
  id: string
  name: string
}

type TRadio = {
  options: TRadioOptions[]
  inputName: string
  direction: 'row' | 'column'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  hiddenLabel?: boolean
  defaultChecked?: string
}

const RadioITAWiki = forwardRef(
  (
    {
      options,
      inputName,
      direction,
      onChange,
      hiddenLabel,
      defaultChecked,
      ...rest
    }: TRadio,
    ref: Ref<HTMLInputElement>
  ) => (
    <Radio
      options={options}
      inputName={inputName}
      direction={direction}
      hiddenLabel={hiddenLabel}
      onChange={onChange}
      defaultChecked={defaultChecked}
      ref={ref}
      {...rest}
    />
  )
)

export default RadioITAWiki
