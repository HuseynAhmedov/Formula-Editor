import React, { useEffect, useState } from "react";

import { AutoComplete } from "primereact/autocomplete";
import Tag from "./tag";
import { useMyStore } from "../store";
import { ProgressSpinner } from 'primereact/progressspinner';


export default function Editor({filterSource, isLoading}) {
  const filteredTag = useMyStore((store)=>store.filteredTag)
  const setFilteredTag = useMyStore((store)=>store.setFilteredTag)
  const selectedTag = useMyStore((store)=>store.selectedTag)
  const setSelectedTag = useMyStore((store)=>store.setSelectedTag)

  const operators = ["+", "-", "*", "(", ")", "/","^"];

  let customChip = (item) => <Tag name={item.name} input={item.value} index={item.tagIndex} isEditing={item.isEditing}></Tag>;

  function HandleInputTokenText(element) {
    if (operators.includes(element.target.value) && selectedTag != undefined) {
        HandleAutoCompleteChange([
          ...selectedTag,
          { name: "oprant", value: element.target.value },
        ])
        element.target.value = "";
    }
  }

  function HandleAutoCompleteChange(element)
  {
    console.log(element);
    setSelectedTag(element)
  }

  const search = (event) => {
    setTimeout(() => {
      let _filteredTag;

      if (!event.query.trim().length) {
        _filteredTag = filterSource;
      } else {
        _filteredTag = filterSource.filter((Tag) => {
          return Tag.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setFilteredTag(_filteredTag);
    }, 250);
  };

  return (
    <div className="p-fluid">
      {isLoading ? (
        <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
      ) : (
        <AutoComplete
          field="name"
          multiple
          onClick={(event) => event.preventDefault()}
          value={selectedTag}
          suggestions={filteredTag}
          completeMethod={search}
          onChange={(e) => HandleAutoCompleteChange(e.value)}
          selectedItemTemplate={customChip}
          pt={{
            inputToken: () => ({ onChange: HandleInputTokenText, className: "tw-text-black" }),
            token: ({ context }) => ({
              className: "tw-bg-slate-300 tw-text-black",
            }),
            item : ({ context }) => ({
              className: "tw-text-black "
            })
          }}
        />
      )}
    </div>
  );
}
