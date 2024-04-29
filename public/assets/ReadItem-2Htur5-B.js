import{aw as O,av as B,ai as F,a as o,ah as e}from"./index-WozvSfaz.js";import{u as A,P as M,T as $,s as d,t as W}from"./ErpApp-AJk95zmD.js";import{ax as q,B as u,aS as H,aT as K,aM as Q,aH as j,aK as g,aI as r}from"./IdurarOs-2Q7XqIs7.js";import{e as b}from"./actions-iFxDMtyd.js";import{c as U}from"./selectors-wTqr4dM2.js";import{u as Y,S as p}from"./useMail-f_ssPjWn.js";import{t as v}from"./statusTagColor-sG5xH6CK.js";import{R as z}from"./RetweetOutlined-eMthphyO.js";import{D as h}from"./index-b2zQtL7n.js";import{C as G}from"./CloseCircleOutlined--Y-SA1pW.js";import{F as J}from"./FilePdfOutlined-QGwmh4Wx.js";const V=({item:a,currentErp:x})=>{const{moneyFormatter:s}=A();return e.jsxs(j,{gutter:[12,0],children:[e.jsxs(r,{className:"gutter-row",span:11,children:[e.jsx("p",{style:{marginBottom:5},children:e.jsx("strong",{children:a.itemName})}),e.jsx("p",{children:a.description})]}),e.jsx(r,{className:"gutter-row",span:4,children:e.jsx("p",{style:{textAlign:"right"},children:s({amount:a.price,currency_code:x.currency})})}),e.jsx(r,{className:"gutter-row",span:4,children:e.jsx("p",{style:{textAlign:"right"},children:a.quantity})}),e.jsx(r,{className:"gutter-row",span:5,children:e.jsx("p",{style:{textAlign:"right",fontWeight:"700"},children:s({amount:a.total,currency_code:x.currency})})}),e.jsx(g,{dashed:!0,style:{marginTop:0,marginBottom:15}})]},a._id)};function oe({config:a,selectedItem:x}){var T,S;const s=q(),{entity:n,ENTITY_NAME:I}=a,y=O(),f=B(),{moneyFormatter:c}=A(),{send:E,isLoading:R}=Y({entity:n}),{result:l}=F(U),N={status:"",client:{name:"",email:"",phone:"",address:""},subTotal:0,taxTotal:0,taxRate:0,total:0,credit:0,number:0,year:0},[P,w]=o.useState([]),[t,C]=o.useState(x??N),[_,k]=o.useState({}),D=i=>{y(W.updateCurrency({data:{default_currency_code:i}}))};return o.useEffect(()=>{if(l){const{items:i,invoice:m,...L}=l;i?(w(i),C(l)):m.items&&(w(m.items),C({...m.items,...L,...m})),D(l.currency)}return()=>{w([]),C(N)}},[l]),o.useEffect(()=>{t!=null&&t.client&&k(t.client[t.client.type])},[t]),e.jsxs(e.Fragment,{children:[e.jsx(M,{onBack:()=>{f(`/${n.toLowerCase()}`)},title:`${I} # ${t.number}/${t.year||""}`,ghost:!1,tags:[e.jsx($,{color:(T=v(t.status))==null?void 0:T.color,children:t.status&&s(t.status)},"status"),t.paymentStatus&&e.jsx($,{color:(S=v(t.paymentStatus))==null?void 0:S.color,children:t.paymentStatus&&s(t.paymentStatus)},"paymentStatus")],extra:[e.jsx(u,{onClick:()=>{f(`/${n.toLowerCase()}`)},icon:e.jsx(G,{}),children:s("Close")},`${d.generate()}`),e.jsx(u,{onClick:()=>{window.open(`${H}${n}/${n}-${t._id}.pdf`,"_blank")},icon:e.jsx(J,{}),children:s("Download PDF")},`${d.generate()}`),e.jsx(u,{loading:R,onClick:()=>{E(t._id)},icon:e.jsx(K,{}),children:s("Send by Email")},`${d.generate()}`),e.jsx(u,{onClick:()=>{y(b.convert({entity:n,id:t._id}))},icon:e.jsx(z,{}),style:{display:n==="quote"?"inline-block":"none"},children:s("Convert to Invoice")},`${d.generate()}`),e.jsx(u,{onClick:()=>{y(b.currentAction({actionType:"update",data:t})),f(`/${n.toLowerCase()}/update/${t._id}`)},type:"primary",icon:e.jsx(Q,{}),children:s("Edit")},`${d.generate()}`)],style:{padding:"20px 0px"},children:e.jsxs(j,{children:[e.jsx(p,{title:"Status",value:t.status}),e.jsx(p,{title:s("SubTotal"),value:c({amount:t.subTotal,currency_code:t.currency}),style:{margin:"0 32px"}}),e.jsx(p,{title:s("Total"),value:c({amount:t.total,currency_code:t.currency}),style:{margin:"0 32px"}}),e.jsx(p,{title:s("Paid"),value:c({amount:t.credit,currency_code:t.currency}),style:{margin:"0 32px"}})]})}),e.jsx(g,{dashed:!0}),e.jsxs(h,{title:`Client : ${t.client.name}`,children:[e.jsx(h.Item,{label:s("Address"),children:_.address}),e.jsx(h.Item,{label:s("email"),children:_.email}),e.jsx(h.Item,{label:s("Phone"),children:_.phone})]}),e.jsx(g,{}),e.jsxs(j,{gutter:[12,0],children:[e.jsx(r,{className:"gutter-row",span:11,children:e.jsx("p",{children:e.jsx("strong",{children:s("Product")})})}),e.jsx(r,{className:"gutter-row",span:4,children:e.jsx("p",{style:{textAlign:"right"},children:e.jsx("strong",{children:s("Price")})})}),e.jsx(r,{className:"gutter-row",span:4,children:e.jsx("p",{style:{textAlign:"right"},children:e.jsx("strong",{children:s("Quantity")})})}),e.jsx(r,{className:"gutter-row",span:5,children:e.jsx("p",{style:{textAlign:"right"},children:e.jsx("strong",{children:s("Total")})})}),e.jsx(g,{})]}),P.map(i=>e.jsx(V,{item:i,currentErp:t},i._id)),e.jsx("div",{style:{width:"300px",float:"right",textAlign:"right",fontWeight:"700"},children:e.jsxs(j,{gutter:[12,-5],children:[e.jsx(r,{className:"gutter-row",span:12,children:e.jsxs("p",{children:[s("Sub Total")," :"]})}),e.jsx(r,{className:"gutter-row",span:12,children:e.jsx("p",{children:c({amount:t.subTotal,currency_code:t.currency})})}),e.jsx(r,{className:"gutter-row",span:12,children:e.jsxs("p",{children:[s("Tax Total")," (",t.taxRate," %) :"]})}),e.jsx(r,{className:"gutter-row",span:12,children:e.jsx("p",{children:c({amount:t.taxTotal,currency_code:t.currency})})}),e.jsx(r,{className:"gutter-row",span:12,children:e.jsxs("p",{children:[s("Total")," :"]})}),e.jsx(r,{className:"gutter-row",span:12,children:e.jsx("p",{children:c({amount:t.total,currency_code:t.currency})})})]})})]})}export{oe as R};
