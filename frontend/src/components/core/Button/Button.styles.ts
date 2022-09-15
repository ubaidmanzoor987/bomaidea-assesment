import styled from '@emotion/styled';

export const ButtonStyled = styled.button<{ backgroundColor?: string; hoverColor?: string }>`
  min-width: 100px;
  height: 50px;
  background-color: lightgrey;
  color: black;
  border-radius: 10px;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: -0.4896000027656555px;
  border: 1px;
  padding-left: 25px;
  padding-right: 25px;
  margin: 25px 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;
