import { Tooltip } from "primereact/tooltip";
import { IoMdTrash } from "react-icons/io";

export function ToolTipTrash(){

    return(
      <>
      <Tooltip target=".custom-target-icon" />
      <i className="custom-target-icon pi pi-envelope p-text-secondary p-overlay-badge"
      data-pr-tooltip="Remover Item"
      data-pr-position="right"
      data-pr-at="right+5 top"
      data-pr-my="left center-2"
      style={{  cursor: 'pointer' }}>
       <span style={{ color: 'rgb(201, 72, 72)' }}>
            <IoMdTrash size={16} />
          </span>
  </i>
      </>
    )
  }