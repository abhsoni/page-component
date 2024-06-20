"use client"
import React, { Fragment, useState } from "react";
import Button from "./Button";
import ListRow from "./ListRow";

const pages = [
  "Page 1",
  "Page 2",
  "Page 3",
  "Page 4",
  "Page 5",
  "Page 6",
];

function ListComponent() {
  const [allChecked, setAllChecked] = useState(false);
  const [checkedPages, setCheckedPages] = useState(
    pages.reduce((acc, page) => {
      acc[page] = false;
      return acc;
    }, {})
  );

  function allPageCheckBoxHandler() {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);
    const newCheckedPages = pages.reduce((acc, page) => {
      acc[page] = newAllChecked;
      return acc;
    }, {});
    setCheckedPages(newCheckedPages);
  }

  function pageCheckBoxHandler(page) {
    const newCheckedPages = { ...checkedPages, [page]: !checkedPages[page] };
    setCheckedPages(newCheckedPages);

    // Update the "All Pages" checkbox based on individual checkboxes
    const allChecked = pages.every((page) => newCheckedPages[page]);
    setAllChecked(allChecked);
  }
  function doneBtnHandler(){
    console.log("Selected Pages:");
    return console.log(checkedPages);
  }

  return (
    <div className="flex flex-col justify-between w-96 p-4 rounded-md border border-[#EEEEEE] shadow-xl">
        <div className="flex justify-between items-center mb-2 text-sm px-2 pb-4 border-b border-[#CDCDCD]">
            <span>All Pages</span>
            <input 
            type="checkbox" 
            className="checkBox" 
            onClick={allPageCheckBoxHandler} 
            checked={allChecked} 
            onChange={() => {}}
            />
        </div>
        <div className="flex flex-col overflow-hidden h-48 mb-5 border-b border-[#CDCDCD]">
            <div className="overflow-y-scroll pr-2 -mr-6">
                {pages.map((page) => (
                    <Fragment key={page}>
                    <ListRow 
                        title={page} 
                        checked={checkedPages[page]} 
                        onCheckboxChange={() => pageCheckBoxHandler(page)} 
                    />
                    </Fragment>
                ))}
            </div>
        </div>
        <Button text="Done" doneBtnHandler={doneBtnHandler}/>
    </div>
  );
}



export default ListComponent;
