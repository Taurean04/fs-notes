(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{41:function(t,n,e){},42:function(t,n,e){"use strict";e.r(n);var c=e(17),r=e.n(c),o=e(8),i=e(3),a=e(2),u=e(6),s=e.n(u),j="/api/notes",l=function(){var t=s.a.get(j),n={id:1e4,content:"This note is not saved to server",date:"2019-05-30T17:30:31.098Z",important:!0};return t.then((function(t){return t.data.concat(n)}))},f=function(t){return s.a.post(j,t).then((function(t){return t.data}))},b=function(t,n){return s.a.put("".concat(j,"/").concat(t),n).then((function(t){return t.data}))},d=e(0),m=function(t){var n=t.note,e=t.toggleImportance,c=n.important?"make not important":"make important";return Object(d.jsxs)("li",{className:"note",children:[n.content,Object(d.jsx)("button",{onClick:e,children:c})]})},p=function(t){var n=t.message;return null===n?null:Object(d.jsx)("div",{className:"error",children:n})},O=function(){return Object(d.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(d.jsx)("br",{}),Object(d.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2021"})]})},h=function(t){var n=Object(a.useState)([]),e=Object(i.a)(n,2),c=e[0],r=e[1],u=Object(a.useState)(""),s=Object(i.a)(u,2),j=s[0],h=s[1],v=Object(a.useState)(!0),x=Object(i.a)(v,2),g=x[0],S=x[1],k=Object(a.useState)(null),y=Object(i.a)(k,2),w=y[0],N=y[1];Object(a.useEffect)((function(){l().then((function(t){r(t)}))}),[]);var C=g?c:c.filter((function(t){return t.important}));return Object(d.jsxs)("div",{children:[Object(d.jsx)("h1",{children:"Notes"}),Object(d.jsx)(p,{message:w}),Object(d.jsx)("div",{children:Object(d.jsxs)("button",{onClick:function(){return S(!g)},children:["show ",g?"important":"all"]})}),Object(d.jsx)("ul",{children:C.map((function(t){return Object(d.jsx)(m,{note:t,toggleImportance:function(){return function(t){var n=c.find((function(n){return n.id===t})),e=Object(o.a)(Object(o.a)({},n),{},{important:!n.important});b(t,e).then((function(n){r(c.map((function(e){return e.id!==t?e:n})))})).catch((function(e){N("Note '".concat(n.content,"' was already removed from server")),setTimeout((function(){N(null)}),5e3),r(c.filter((function(n){return n.id!==t})))}))}(t.id)}},t.id)}))}),Object(d.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={content:j,date:(new Date).toISOString(),important:Math.random()<.5};f(n).then((function(t){r(c.concat(t)),h("")}))},children:[Object(d.jsx)("input",{value:j,onChange:function(t){h(t.target.value)}}),Object(d.jsx)("button",{type:"submit",children:"save"})]}),Object(d.jsx)(O,{})]})};e(41);r.a.render(Object(d.jsx)(h,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.a22c17d8.chunk.js.map