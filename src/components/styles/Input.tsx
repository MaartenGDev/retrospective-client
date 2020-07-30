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

export const InputLabel = styled.p.attrs((props: {isFirstLabel: boolean}) => ({
    isFirstLabel: props.isFirstLabel || false,
}))`
  font-weight: bold;
  margin-top: ${props => props.isFirstLabel ? '0' : '10px'};
  margin-bottom: 0;
`

export const InputDescription = styled.p`
  margin-top: 5px;
`