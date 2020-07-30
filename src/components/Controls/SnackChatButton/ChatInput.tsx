import React, { useState } from 'react';
import { TextField, Button, FormControl } from '@material-ui/core';

export default function ChatInput({ onSend }: { onSend: (message: string) => void }) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value) {
      onSend(value);
      setValue('');
    }
  };

  return (
    <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
      <FormControl>
        <label>Say something:</label>
        <TextField value={value} autoFocus={true} onChange={handleChange} />
      </FormControl>
      <Button type="submit">Send</Button>
    </form>
  );
}
