import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import InteractiveButton from "./interactive-button";
import InteractiveTextInput from "./interactive-text-input";

const FormContainer = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.xl};
`;

const FormContainerComponent: React.FC = () => {
  const [formInputState, setFormInputState] = useState({
    email: "",
    message: "",
  });

  const [formState, setFormState] = useState({
    error: false,
    loading: false,
    success: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputState({
      ...formInputState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({
      ...formState,
      loading: true,
    });

    const { email, message } = formInputState;

    try {
      const { data } = await axios.post("/api/sendmessage", {
        email,
        message,
      });
      if (data.id) {
        setFormState({
          ...formState,
          loading: false,
          success: true,
        });

        setTimeout(() => {
          setFormState({
            ...formState,
            success: false,
          });

          setFormInputState({
            email: "",
            message: "",
          });
        }, 5000);
      }
    } catch (error) {
      setFormState({
        ...formState,
        error: true,
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InteractiveTextInput
        name="email"
        label="Email"
        type="email"
        value={formInputState.email}
        onChange={handleChange}
        required={true}
        maxLength={50}
      />
      <InteractiveTextInput
        name="message"
        label="Message/Feedback"
        type="text"
        value={formInputState.message}
        onChange={handleChange}
        required={true}
        maxLength={250}
      />
      <InteractiveButton
        buttonText="Send"
        type="submit"
        isLoading={formState.loading}
        isError={formState.error}
        isSuccess={formState.success}
        endIconUrl="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0Ljg2OCAxOC4wMDAySDZMMy4wMzQ1IDYuMjAyNjlDMy4wMTU1MSA2LjEzNDEzIDMuMDAzOTQgNi4wNjM3MyAzIDUuOTkyNjlDMi45NjcgNC45MTExOSA0LjE1OCA0LjE2MTE5IDUuMTkgNC42NTYxOUwzMyAxOC4wMDAyTDUuMTkgMzEuMzQ0MkM0LjE3IDMxLjgzNDcgMi45OTQgMzEuMTA1NyAzIDMwLjA0MzdDMy4wMDMwNCAyOS45NDg4IDMuMDE5NzEgMjkuODU0OCAzLjA0OTUgMjkuNzY0N0w1LjI1IDIyLjUwMDIiIHN0cm9rZT0iI0I0QjRCNCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
        endIconHoverUrl="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0Ljg2OCAxOC4wMDAySDZMMy4wMzQ1IDYuMjAyNjlDMy4wMTU1MSA2LjEzNDEzIDMuMDAzOTQgNi4wNjM3MyAzIDUuOTkyNjlDMi45NjcgNC45MTExOSA0LjE1OCA0LjE2MTE5IDUuMTkgNC42NTYxOUwzMyAxOC4wMDAyTDUuMTkgMzEuMzQ0MkM0LjE3IDMxLjgzNDcgMi45OTQgMzEuMTA1NyAzIDMwLjA0MzdDMy4wMDMwNCAyOS45NDg4IDMuMDE5NzEgMjkuODU0OCAzLjA0OTUgMjkuNzY0N0w1LjI1IDIyLjUwMDIiIHN0cm9rZT0idXJsKCNwYWludDBfbGluZWFyXzM0OF8yNSkiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMzQ4XzI1IiB4MT0iMTcuOTk5NyIgeTE9IjQuNTAwNDkiIHgyPSIxNy45OTk3IiB5Mj0iMzEuNTAwMyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkU4QzhDIi8+CjxzdG9wIG9mZnNldD0iMC41NDE2NjciIHN0b3AtY29sb3I9IiM2Q0MwNEEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNjFEQUZCIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg=="
      >
        Send
      </InteractiveButton>
    </FormContainer>
  );
};

export default FormContainerComponent;
