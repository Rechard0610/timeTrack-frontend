import{ah as r}from"./index-WozvSfaz.js";import{ad as s,q as i,l as o}from"./ErpApp-AJk95zmD.js";import{ax as D}from"./IdurarOs-2Q7XqIs7.js";const d=["USD","CAD","EUR","AED","AFN","ALL","AMD","ARS","AUD","AZN","BAM","BDT","BGN","BHD","BIF","BND","BOB","BRL","BWP","BYR","BZD","CDF","CHF","CLP","CNY","COP","CRC","CVE","CZK","DJF","DKK","DOP","DZD","EEK","EGP","ERN","ETB","GBP","GEL","GHS","GNF","GTQ","HKD","HNL","HRK","HUF","IDR","ILS","INR","IQD","IRR","ISK","JMD","JOD","JPY","KES","KHR","KMF","KRW","KWD","KZT","LBP","LKR","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MOP","MUR","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SDG","SEK","SGD","SOS","SYP","THB","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","UYU","UZS","VEF","VND","XAF","XOF","YER","ZAR","ZMK"],y=d.map(e=>({value:e,label:e})),t={currency_name:{type:"string",required:!0},color:{type:"color",options:[...s],required:!0,disableForTable:!0},currency_code:{type:"select",showSearch:!0,required:!0,options:y},currency_symbol:{type:"stringWithColor",required:!0,color:"gold"},currency_position:{type:"selectWithTranslation",required:!0,renderAsTag:!0,defaultValue:"before",options:[{value:"before",label:"before",color:"magenta"},{value:"after",label:"after",color:"purple"}]},decimal_sep:{label:"decimal_separator",type:"string",required:!0,defaultValue:"."},thousand_sep:{label:"thousand_separator",type:"string",required:!0,defaultValue:" "},cent_precision:{type:"number",required:!0,defaultValue:2},zero_format:{type:"boolean",required:!0,defaultValue:!1},enabled:{type:"boolean"}};function A(){const e=D(),a="currency",c={displayLabels:["currency_name","currency_code","currency_symbol"],searchFields:"currency_name,currency_code,currency_symbol"},n=["currency_name"],u={PANEL_TITLE:e("currency"),DATATABLE_TITLE:e("currency_list"),ADD_NEW_ENTITY:e("add_new_currency"),ENTITY_NAME:e("currency")},l={...{entity:a,...u},fields:t,searchConfig:c,deleteModalLabels:n};return r.jsx(i,{createForm:r.jsx(o,{fields:t}),updateForm:r.jsx(o,{fields:t}),config:l})}export{A as default};
