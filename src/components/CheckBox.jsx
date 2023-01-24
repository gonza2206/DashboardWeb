import React, { useState } from 'react';

function Checkbox() {
  const [checked, setChecked] = useState(false);

  function handleChange(event) {
    setChecked(event.target.checked);
    if(event.target.checked) {
        console.log("hola mundo");
    }
  }

  return (
    <input type="checkbox" checked={checked} onChange={handleChange} />
  );
}

export default Checkbox;