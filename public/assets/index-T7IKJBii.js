import{ah as t}from"./index-WozvSfaz.js";import{q as c,l}from"./ErpApp-AJk95zmD.js";import{ax as d}from"./IdurarOs-2Q7XqIs7.js";const a={clientname:{label:"client name",type:"selectWithFeedback",required:!0},projectname:{label:"project name",type:"string",required:!0},budget:{type:"budget"},description:{type:"textarea",required:!0},people:{label:"assigne people",type:"selectWithFeedback",required:!0},subtask:{label:"add sub tasks",disableForTable:!0,type:"array",options:[{value:"startup",label:"StartUp",color:"yello"},{value:"modeling",label:"3D Modelling",color:"blue"},{value:"presentation",label:"Presentation",color:"pink"},{value:"fabrication",label:"Fabrication Drawings",color:"orange"}]},status:{type:"select",required:!0,defaultValue:"In Quatation",options:[{value:"In Quatation",label:"In Quatation"},{value:"In Progress",label:"In Progress"},{value:"Finished",label:"Finished"},{value:"Stalled",label:"Stalled"}]},statusnote:{label:"status note",type:"textarea"},projectid:{type:String,disableForForm:!0},clientname:{type:"async",label:"client name",entity:"client",required:!0,redirectLabel:"Add New Client",withRedirect:!0,urlToRedirect:"/clients",displayLabels:["name","lastname"],searchFields:"name,lastname",dataIndex:["client","name"],disableForTable:!0,feedback:"client"},people:{type:"search",label:"assign people",entity:"people",required:!0,redirectLabel:"Add New People",withRedirect:!0,urlToRedirect:"/members",displayLabels:["firstname","lastname"],searchFields:"firstname,lastname",dataIndex:["people","firstname"],disableForTable:!0,feedback:"people"}};function y(){const e=d(),r="project",s={displayLabels:["name"],searchFields:["projectname","description"]},n=["name"],i={PANEL_TITLE:e("Projects"),DATATABLE_TITLE:e("projects_list"),ADD_NEW_ENTITY:e("add_new_projects"),ENTITY_NAME:e("Projects")},o={...{entity:r,...i},fields:a,searchConfig:s,deleteModalLabels:n};return t.jsx(c,{createForm:t.jsx(l,{fields:a}),updateForm:t.jsx(l,{fields:a}),config:o})}export{y as default};
