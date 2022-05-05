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
    borderRadius: '8px',
    boxShadow : '0px 3.17565px 3.17565px rgba(0, 0, 0, 0.25)'
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: '#11151F',
    fontSize: '16px',
    fontWeight: 600,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: '#11151F',
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
  option: (styles) => ({
    ...styles,
    color: '#F5FFF4',
    background: '#11151F',
    ':hover': {
      background: '#8C79E2',
      color:'#11151F',
      cursor:'pointer'
    }
  }),
}

export default config
