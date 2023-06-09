"use strict";(self.webpackChunkhts_frontend=self.webpackChunkhts_frontend||[]).push([[753],{6753:function(e,a,n){n.r(a),n.d(a,{default:function(){return S}});n(2791);var r=n(6871),s=n(3239),t=n(1889),i=n(7621),o=n(3767),l=n(890),d=n(7391),u=n(6151),c=n(1933),m=n(5705),h=n(132),p=n(3504),x=n(1405),g=n(9684),v=n(4569),f=n.n(v)().create({baseURL:"".concat("/api","/login"),headers:{"Content-Type":"application/json"}});var j=n(6949),w=n(1774),Z=n(184);function b(){var e=(0,x.I0)(),a=(0,x.v9)((function(e){return e.account.student})),n=(0,c.useMutation)((function(e){return a=e,f.post("/student",a);var a}),{onSuccess:function(a){var n=a.data;e((0,g.x)(n)),localStorage.setItem("hts-token",n.token)},onError:function(a){var n,r;return e((0,w.ry)({message:(null===(n=a.response)||void 0===n||null===(r=n.data)||void 0===r?void 0:r.error)||a.message}))}}),t=n.isLoading,v=n.mutate,b=h.Ry({email:h.Z_().required("Email is required").email("Enter a valid email"),password:h.Z_().required("Password is required").min(8,"Password should be at least 8 characters long")}),y=(0,m.TA)({initialValues:{email:"",password:""},validationSchema:b,onSubmit:function(e){return v(e)}});return a?(0,Z.jsx)(r.Fg,{replace:!0,to:"/student"}):(0,Z.jsx)(i.Z,{elevation:3,className:"w-full pb-6 my-6",children:(0,Z.jsxs)(o.Z,{spacing:2,children:[(0,Z.jsx)(l.Z,{variant:"h5",align:"center",children:"Welcome Back"}),(0,Z.jsx)("img",{className:"self-center w-32",alt:"hts logo",src:j}),(0,Z.jsx)(l.Z,{variant:"h5",align:"center",children:"Login as a Student"}),(0,Z.jsxs)(o.Z,{spacing:2,className:"px-6",component:"form",onSubmit:y.handleSubmit,children:[(0,Z.jsx)(d.Z,{variant:"outlined",fullWidth:!0,label:"Email",name:"email",value:y.values.email,onChange:y.handleChange,error:Boolean(y.touched.email)&&y.errors.email,helperText:y.touched.email&&y.errors.email}),(0,Z.jsx)(d.Z,{variant:"outlined",fullWidth:!0,type:"password",label:"Password",name:"password",value:y.values.password,onChange:y.handleChange,error:Boolean(y.touched.password)&&y.errors.password,helperText:y.touched.password&&y.errors.password}),(0,Z.jsx)(u.Z,{type:"submit",disabled:t,variant:"outlined",children:t?(0,Z.jsx)(s.Z,{}):"Login as Student"}),(0,Z.jsx)(p.rU,{to:"/signup/student",children:(0,Z.jsx)(l.Z,{variant:"h6",align:"center",color:"primary",children:"Don't have account? Register"})})]})]})})}function y(){var e=(0,x.v9)((function(e){return e})).account,a=(0,x.I0)(),n=(0,c.useMutation)((function(e){return a=e,f.post("/admin",a);var a}),{onSuccess:function(e){var n=e.data;a((0,g.x)(n)),localStorage.setItem("hts-token",n.token)},onError:function(e){var n,r;return a((0,w.ry)({message:(null===(n=e.response)||void 0===n||null===(r=n.data)||void 0===r?void 0:r.error)||e.message}))}}),t=n.isLoading,p=n.mutate,v=h.Ry({email:h.Z_().required("Email is required").email("Enter a valid email"),password:h.Z_().required("Password is required").min(8,"Password should be at least 8 characters long")}),b=(0,m.TA)({initialValues:{email:"",password:""},validationSchema:v,onSubmit:function(e){return p(e)}});return e.admin?(0,Z.jsx)(r.Fg,{replace:!0,to:"/admin"}):(0,Z.jsx)(i.Z,{elevation:3,className:"w-full py-6 my-6",children:(0,Z.jsxs)(o.Z,{spacing:2,children:[(0,Z.jsx)("img",{className:"self-center w-32",alt:"hts logo",src:j}),(0,Z.jsx)(l.Z,{variant:"h5",align:"center",children:"Login as an Admin"}),(0,Z.jsxs)(o.Z,{spacing:2,className:"px-6",component:"form",onSubmit:b.handleSubmit,children:[(0,Z.jsx)(d.Z,{variant:"outlined",fullWidth:!0,label:"Email",name:"email",value:b.values.email,onChange:b.handleChange,error:b.touched.email&&b.errors.email,helperText:b.touched.email&&b.errors.email}),(0,Z.jsx)(d.Z,{variant:"outlined",fullWidth:!0,type:"password",label:"Password",name:"password",value:b.values.password,onChange:b.handleChange,error:b.touched.password&&b.errors.password,helperText:b.touched.password&&b.errors.password}),(0,Z.jsx)(u.Z,{type:"submit",disabled:t,variant:"outlined",children:t?(0,Z.jsx)(s.Z,{}):"Login as Admin"})]})]})})}function S(){var e=(0,x.I0)(),a=(0,x.v9)((function(e){return e})).account,n=(0,c.useQuery)("verify-login",(function(){return e=localStorage.getItem("hts-token"),f.get("/verify",{headers:{authorization:"Bearer ".concat(e)}});var e}),{onSuccess:function(a){var n=a.data;return e((0,g.x)(n))}}).isLoading;return a.student?(0,Z.jsx)(r.Fg,{replace:!0,to:"/student/dashboard"}):a.admin?(0,Z.jsx)(r.Fg,{replace:!0,to:"/admin/dashboard"}):a.teacher?(0,Z.jsx)(r.Fg,{replace:!0,to:"/teacher/dashboard"}):n?(0,Z.jsx)("div",{className:"w-full flex p-6",children:(0,Z.jsx)(s.Z,{className:"m-auto"})}):(0,Z.jsx)(t.ZP,{container:!0,flexDirection:"column",justifyContent:"center",alignItems:"center",className:"min-h-full p-6",children:(0,Z.jsx)(t.ZP,{container:!0,item:!0,maxWidth:"sm",children:(0,Z.jsxs)(r.Z5,{children:[(0,Z.jsx)(r.AW,{index:!0,element:(0,Z.jsx)(r.Fg,{replace:!0,to:"/login/student"})}),(0,Z.jsx)(r.AW,{path:"/student",element:(0,Z.jsx)(b,{})}),(0,Z.jsx)(r.AW,{path:"/admin",element:(0,Z.jsx)(y,{})}),(0,Z.jsx)(r.AW,{path:"/*",element:(0,Z.jsx)(r.Fg,{replace:!0,to:"/not-found"})})]})})})}}}]);
//# sourceMappingURL=753.e55d8305.chunk.js.map