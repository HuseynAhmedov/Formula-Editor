import React from "react";
import * as math from "mathjs";

import Accordion from "react-bootstrap/Accordion";
import { Button } from "primereact/button";
import Editor from "./editor";

import { useMyStore } from "../store";
import { useQuery } from "@tanstack/react-query";

export default function Formula({ name }) {
  const formulaResult = useMyStore((store) => store.formulaResult);
  const setFormulaResult = useMyStore((store) => store.setFormulaResult);
  const formulaParts = useMyStore((store) => {
    const parts = store.selectedTag.map((tag) => tag.value);
    return parts.join("");
  });
  function HandleCalculateClick() {
    try {
      const result = math.evaluate(formulaParts);
      setFormulaResult(result);
    } catch (error) {
      setFormulaResult(undefined);
    }
  }
  const { data, error, isLoading } = useQuery({
    queryKey: ["autoComplete"],
    queryFn: async () =>
      await fetch(
        "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
      ).then((result) => result.json()),
  });

  const renderFormulaResult =
    formulaResult !== undefined ? (
      <div className="tw-px-4 tw-py-5 tw-text-2xl tw-bg-slate-300">
        {formulaResult}
      </div>
    ) : (
      <div className="tw-px-4 tw-py-5 tw-text-2xl tw-bg-slate-300 tw-flex">
        <i className="pi pi-info-circle tw-text-red-500 tw-mr-2" style={{ fontSize: '2rem' }}></i><span>#ERROR</span>
      </div>
    );

  return (
    <Accordion className="tw-py-4" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="tw-text-black">{name}</Accordion.Header>
        {renderFormulaResult}
        <Accordion.Body>
          <div>
            <Editor filterSource={data} isLoading={isLoading}></Editor>
            <Button
              label="Calculate"
              severity="secondary"
              className="tw-rounded-md"
              raised
              onClick={HandleCalculateClick}
            ></Button>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
