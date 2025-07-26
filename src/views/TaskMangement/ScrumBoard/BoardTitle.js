import React, { useState } from "react";

const BoardTitle = (props) => {
  const { title } = props;

  return (
    <div className="board-title px-4 py-3 flex justify-between items-center bg-white">
      <>
        <h6>{title}</h6>
      </>
    </div>
  );
};

export default BoardTitle;
