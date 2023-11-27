export interface FormInterfaceProps {
  label: string
  errorForm?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  name: string
  type: string
  placeholder: string
  pattern?: string
  required?: boolean
  value?: string
}
