"use strict";(self["webpackChunkkc_project"]=self["webpackChunkkc_project"]||[]).push([[503],{1141:function(e,t,a){a.r(t),a.d(t,{default:function(){return U}});var l=a(6252),n=a(9963),r=a(3577),u=a.p+"img/familyImage-WhiteBg.8c2d404b.png",i=a(4427);const s={class:"min-h-screen relative justify-center items-center flex flex-wrap-reverse"},o=(0,l._)("div",{class:"w-full md:w-3/5 flex justify-center items-center"},[(0,l._)("img",{src:u,alt:"agileFamily Logo"})],-1),p={class:"w-full md:w-2/5 flex justify-center md:justify-start md:pl-12 items-center mt-14 md:mt-0"},d={class:"md:w-96 w-80"},m=(0,l._)("div",{class:"flex justify-center items-center mb-4"},[(0,l._)("img",{alt:"Vue logo",src:i})],-1),c=(0,l._)("label",{class:"ml-1 font-semibold",for:"email"},"Email:",-1),f=(0,l._)("label",{class:"ml-1 font-semibold",for:"password"},"Contraseña:",-1),y={key:0,class:"text-red-700 font-semibold flex items-center"},b={class:"ml-2"},w=(0,l._)("div",{class:"py-4"},[(0,l._)("button",{type:"submit",class:"h-full w-full px-2 py-3 flex items-center justify-center rounded-md bg-primary hover:bg-primaryDark text-white focus:outline-none"}," Crear cuenta ")],-1);function g(e,t,a,u,i,g){const h=(0,l.up)("input-field"),v=(0,l.up)("error-icon");return(0,l.wg)(),(0,l.iD)("div",s,[o,(0,l._)("div",p,[(0,l._)("form",{onSubmit:t[5]||(t[5]=(0,n.iM)(((...e)=>u.handleSubmit&&u.handleSubmit(...e)),["prevent"]))},[(0,l._)("div",d,[m,(0,l.Wm)(h,{type:"text",inputName:"displayName",inputLabel:"Nombre de usuario",placeholder:"Introduce tu nombre de usuario",inputValue:u.displayName,"onUpdate:inputValue":t[0]||(t[0]=e=>u.displayName=e)},null,8,["inputValue"]),(0,l.Wm)(h,{type:"text",inputName:"name",placeholder:"Introduce tu nombre",inputLabel:"Nombre",inputValue:u.name,"onUpdate:inputValue":t[1]||(t[1]=e=>u.name=e)},null,8,["inputValue"]),(0,l.Wm)(h,{type:"text",placeholder:"Introduce tu apellido",inputName:"surname",inputLabel:"Apellidos",inputValue:u.surname,"onUpdate:inputValue":t[2]||(t[2]=e=>u.surname=e)},null,8,["inputValue"]),c,(0,l.wy)((0,l._)("input",{type:"email",name:"email",placeholder:"Introduce tu email","onUpdate:modelValue":t[3]||(t[3]=e=>u.email=e),required:"",class:"border w-full p-2 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"},null,512),[[n.nr,u.email]]),f,(0,l.wy)((0,l._)("input",{type:"password",name:"password",placeholder:"Introduce una contraseña","onUpdate:modelValue":t[4]||(t[4]=e=>u.password=e),required:"",class:"border w-full p-2 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"},null,512),[[n.nr,u.password]])]),u.error?((0,l.wg)(),(0,l.iD)("div",y,[(0,l.Wm)(v,{class:"text-red-700 font-semibold w-6"}),(0,l._)("span",b,(0,r.zw)(u.error),1)])):(0,l.kq)("",!0),w],32)])])}var h=a(2262),v=a(3907),x=a(2119);const _=["type","placeholder"];function V(e,t,a,u,i,s){return(0,l.wg)(),(0,l.iD)("div",null,[(0,l._)("label",{class:(0,r.C_)(a.labelClass)},(0,r.zw)(a.inputLabel),3),(0,l.wy)((0,l._)("input",{type:a.inputType,class:(0,r.C_)(a.inputClass),"onUpdate:modelValue":t[0]||(t[0]=e=>i.newValue=e),placeholder:a.placeholder,onInput:t[1]||(t[1]=e=>this.$emit("update:inputValue",e.target.value))},null,42,_),[[n.YZ,i.newValue]])])}var I={data(){return{newValue:this.inputValue}},props:{inputLabel:{type:String,default:"Label"},inputType:{type:String,default:"text"},placeholder:{type:String,default:"text"},inputValue:{type:String,default:""},inputName:{type:String,default:"text"},onInput:{type:String,default:"text"},labelClass:{type:String,default:"ml-1 font-semibold"},inputClass:{type:String,default:"border w-full p-2 pl-3 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4"}}},S=a(3744);const N=(0,S.Z)(I,[["render",V]]);var C=N,k=a(6984),j={components:{InputField:C,ErrorIcon:k["default"]},data(){return{}},setup(){const e=(0,l.Fl)((()=>{const e=new URL(window.location.href).searchParams.get("continueUrl");return e?e.split("accountId=")[1]:""})),t=(0,h.iH)(""),a=(0,h.iH)(""),n=(0,h.iH)(""),r=(0,h.iH)(""),u=(0,h.iH)(""),i=(0,h.iH)(null),s=(0,v.oR)(),o=(0,x.tv)(),p=async()=>{const l=e.value?"user":"admin",p=e.value||"";try{await s.dispatch("signup",{displayName:n.value,name:r.value,surname:u.value,email:t.value,password:a.value,userAccountId:p,role:l,img:"user0"}),o.push("/")}catch(d){i.value=d.message}};return{accountIdFromFirebase:e,handleSubmit:p,email:t,password:a,displayName:n,name:r,surname:u,error:i}}};const L=(0,S.Z)(j,[["render",g]]);var U=L}}]);
//# sourceMappingURL=503.ecc9b2fd.js.map