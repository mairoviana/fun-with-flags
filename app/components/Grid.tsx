import React from 'react';

type GridProps = {
  children: React.ReactNode;
};

const Grid = ({ children }: GridProps) => {
  return (
    <div className="grid md:grid-cols2 lg:grid-cols-4 gap-12 lg:gap-8">
      {children}
    </div>
  );
};

export default Grid;
