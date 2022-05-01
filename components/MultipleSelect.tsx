import { Box, Chip, MenuItem, OutlinedInput } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';

interface MultipleSelectProps {
    data: string[],
    background_color : string
}

export default function MultipleSelect({ data, background_color}: MultipleSelectProps) {
  const [values, setValues] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof values>) => {
    const {
      target: { value },
    } = event;
    setValues(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Select
      multiple
      value={values}
      onChange={handleChange}
      input={<OutlinedInput fullWidth />}
      renderValue={(selected: string[]) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => (
              <Chip key={value} label={value} sx={{background: background_color }} />
          ))}
        </Box>
      )}
    >
      {data.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
}
