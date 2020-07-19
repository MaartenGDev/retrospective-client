import styled from "styled-components";

export const TextArea = styled.textarea`
  border-radius: 5px;
  padding: 10px;
  width: calc(100% - 20px);
  min-width: calc(100% - 20px);
  max-width: calc(100% - 20px);
  min-height: 50px;
  font-family: inherit;
`

export const Select = styled.select`
  border-radius: 5px;
  padding: 10px;
  font-family: inherit;
`

export const Input = styled.input`
  border-radius: 5px;
  padding: 10px;
  font-family: inherit;
`

export const TextInput = styled(Input)`
  width: calc(100% - 20px);
  min-width: calc(100% - 20px);
  max-width: calc(100% - 20px);
`