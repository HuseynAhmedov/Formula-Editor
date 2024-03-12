import { useState } from "react";
import { Button } from "react-bootstrap";
import { useMyStore } from "../store";

export default function Tag({ name, input, index }) {
  const SwitchTagIsEditing = useMyStore((store) => store.switchTagIsEditing);
  const changeInputValue = useMyStore((store)=>store.changeSelectedTagValue)
  const isEditing = useMyStore((store)=>{
    const tag = store.selectedTag[index];
    return tag.isEditing
  })
  function HandleTagInputBlur(element) {
    SwitchTagIsEditing(index);
    changeInputValue(element.target.value,index)
  }
  if (name == "oprant") {
    return (
      <span>
        <span>{input}</span>
      </span>
    );
  }
  let formulaField = (
    <span>
      [
      <button
        onClick={(e) => {
          SwitchTagIsEditing(index);
          console.log(isEditing);
          e.stopPropagation();
        }}
        className="tw-border-0 tw-bg-transparent"
      >
        {input}
      </button>
      ]
    </span>
  );

  if (isEditing) {
    formulaField = (
      <input
        key={index}
        autoFocus={isEditing}
        className="tw-ml-4 tw-w-16 tw-h-6"
        type="text"
        defaultValue={input}
        onClick={(e) => e.stopPropagation()}
        onBlur={(e) => HandleTagInputBlur(e)}
      />
    );
  } else {
    formulaField = (
      <span>
        [
        <button
          onClick={(e) => {
            SwitchTagIsEditing(index);
            e.stopPropagation();
          }}
          className="tw-border-0 tw-bg-transparent"
        >
          {input}
        </button>
        ]
      </span>
    );
  }
  return (
    <span>
      <span className="tw-px-2">{name}</span>
      {formulaField}
    </span>
  );
}
