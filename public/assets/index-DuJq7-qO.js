import{ah as l}from"./index-WozvSfaz.js";import{ac as e,q as d,l as r}from"./ErpApp-AJk95zmD.js";import{ax as u}from"./IdurarOs-2Q7XqIs7.js";const o={type:{type:"selectWithFeedback",renderAsTag:!0,options:[{value:"people",label:"people",color:"magenta"},{value:"company",label:"company",color:"blue"}],required:!0,hasFeedback:!0},name:{type:"string",disableForForm:!0},status:{type:"selectWithTranslation",renderAsTag:!0,options:[{value:"draft",label:"draft"},{value:"new",label:"new",color:"blue"},{value:"in negociation",label:"in negociation",color:"purple"},{value:"won",label:"won",color:"green"},{value:"loose",label:"loose",color:"red"},{value:"canceled",label:"canceled",color:e.crimson},{value:"assigned",label:"assigned",color:e.mediumturquoise},{value:"on hold",label:"on hold",color:e.burlywood},{value:"waiting",label:"waiting",color:"orange"}]},source:{type:"selectWithTranslation",renderAsTag:!0,options:[{value:"linkedin",label:"linkedin",color:e.royalblue},{value:"socialmedia",label:"social_media",color:e.skyblue},{value:"website",label:"website",color:e.coral},{value:"advertising",label:"advertising",color:e.darkgreen},{value:"friend",label:"friend",color:e.firebrick},{value:"professionals network",label:"professionals network",color:e.mediumvioletred},{value:"customer referral",label:"customer referral",color:e.violet},{value:"sales",label:"sales",color:e.deeppink},{value:"other",label:"other",color:e.darkgray}]},country:{type:"country",color:null,disableForForm:!0},phone:{type:"phone",disableForForm:!0},email:{type:"email",disableForForm:!0},people:{type:"search",label:"people",entity:"people",displayLabels:["firstname","lastname"],searchFields:"firstname,lastname",dataIndex:["people","firstname"],disableForTable:!0,feedback:"people"},company:{type:"search",label:"company",entity:"company",displayLabels:["name"],searchFields:"name",dataIndex:["company","name"],disableForTable:!0,feedback:"company"},notes:{type:"textarea",disableForTable:!0}};function g(){const a=u(),t="lead",n={displayLabels:["name"],searchFields:"name"},s=["name"],i={PANEL_TITLE:a("lead"),DATATABLE_TITLE:a("lead_list"),ADD_NEW_ENTITY:a("add_new_lead"),ENTITY_NAME:a("lead")},c={...{entity:t,...i},fields:o,searchConfig:n,deleteModalLabels:s};return l.jsx(d,{createForm:l.jsx(r,{fields:o}),updateForm:l.jsx(r,{fields:o}),config:c})}export{g as default};
