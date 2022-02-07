import { useState } from "react";
import styled from "styled-components";
import InteractiveTextInput from "./interactive-text-input";

const FormContainer = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
`;

const FormContainerComponent: React.FC = () => {
  const [formInputState, setFormInputState] = useState({
    email: "",
    message: "",
  });

  const [formState, setFormState] = useState({
    error: false,
    errorMessage: "",
    loading: false,
    success: false,
    isInialized: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputState({
      ...formInputState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formInputState);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InteractiveTextInput
        name="email"
        label="email"
        type="email"
        value={formInputState.email}
        onChange={handleChange}
        required={true}
        maxLength={50}
      />
      <InteractiveTextInput
        name="message"
        label="message/feedback"
        type="text"
        value={formInputState.message}
        onChange={handleChange}
        required={true}
        maxLength={250}
      />
    </FormContainer>
  );
};

export default FormContainerComponent;
