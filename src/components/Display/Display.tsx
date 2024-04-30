import React, { useContext } from 'react';
import { text } from '../../helpers/text';
import AppContext from '../../context/AppContext';

const Display: React.FC = () => {
  const { config } = useContext(AppContext);

  return (
    <div
      className="text-display"
    >
      {text.map((paragraph, index) => (
        <p
          key={index}
          style={{fontSize: `${config.fontSize}px`}}
        >
          {paragraph}
        </p>
      ))}
    </div>
  )
}

export default Display;