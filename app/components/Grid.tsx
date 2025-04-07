import React from 'react';

type GridProps = {
  children: React.ReactNode;
};

const Grid = ({ children }: GridProps) => {
  return (
    <div className="grid md:grid-cols2 lg:grid-cols-4 gap-6">{children}</div>
  );
};

export default Grid;
