"use client"

import { ProgressSpinner } from "primereact/progressspinner";

export default function Loading() {
  return (
    <div style={{display:"flex",alignItems:'center',justifyContent:"center",height:'90vh',width:"100vw"}}>
    <ProgressSpinner style={{width: '200px', height: '200px'}}  animationDuration=".5s" />
</div>
  );
}
