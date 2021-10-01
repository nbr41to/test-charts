import styled from 'styled-components';
import { FormItem } from './FormItem';

export const FormGroup = ({
  className,
  leftData,
  rightData,
  changeHandlers,
}) => {
  return (
    <StyledFormGroup className={`${className}`}>
      <FormItem side="left" data={leftData} changeHandlers={changeHandlers} />
      <FormItem side="right" data={rightData} changeHandlers={changeHandlers} />
    </StyledFormGroup>
  );
};

const StyledFormGroup = styled.div``;
