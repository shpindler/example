import { SimpleFormProps } from '@/components/SimpleForm'
import { BaseModel } from '@/models/base'
import { FormSubmitConfig } from '@/utils/form'
import { FormikConfig } from 'formik'

export type FormProps<ModelType extends typeof BaseModel> = Pick<
  FormikConfig<InstanceType<ModelType>>,
  'initialValues'
> &
  Pick<FormSubmitConfig<ModelType>, 'onSuccess' | 'onFinally'> &
  Omit<SimpleFormProps, 'setStatus'>

export type RawFieldError = string[]

export type RawFormErrors<Keys extends string | number = string> = Record<
  Keys,
  RawFieldError
>

export type FieldError = string

export type FormErrors<Model extends BaseModel> = Partial<
  Record<keyof Model, FieldError>
>

export type FormAction = 'create' | 'update' | 'delete'
