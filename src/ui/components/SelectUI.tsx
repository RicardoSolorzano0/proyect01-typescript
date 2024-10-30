import { Select, SelectProps } from "antd"

type Props<T> = SelectProps<T>

export const SelectUI = <T= never>(props: Props<T>) => {
  return (
    <Select
    size="large"
   {...props}
    />
  )
}
