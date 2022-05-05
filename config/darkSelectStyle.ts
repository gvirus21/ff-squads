import { StylesConfig, GroupBase } from 'react-select'

const config: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    color: '#fff',
  }),
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: '#8C79E2',
    color: '#11151F',
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: '#F5FFF4',
    fontSize: 16,
    fontWeight: 600,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: '#F5FFF4',
    ':hover': {
      cursor: 'pointer',
    },
  }),
  menu: (styles) => ({
    ...styles,
    background: '#11151F',
    border: '1px solid #BAC3B9',
  }),
  valueContainer: (styles) => ({
    ...styles,
    color: '#F5FFF4',
  }),
  input: (styles) => ({
    ...styles,
    color: '#F5FFF4',
  }),
}

export default config
