import { TextField } from "@mui/material";

export function Registration() {
  return (
    <>
      <h1>reg</h1>
      <input
        type="radio"
        class="customRadio"
        id="huey"
        name="drone"
        value="huey"
        checked
      />
      <label for="huey">Huey</label>
      <input
        type="radio"
        class="customRadio"
        id="huey1"
        name="drone"
        value="huey"
        checked
      />
      <label for="huey">Huey</label>

      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </>
  );
}
