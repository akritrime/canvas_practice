require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({26:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,i){var r=[],e=!0,n=!1,o=void 0;try{for(var s,h=t[Symbol.iterator]();!(e=(s=h.next()).done)&&(r.push(s.value),!i||r.length!==i);e=!0);}catch(t){n=!0,o=t}finally{try{!e&&h.return&&h.return()}finally{if(n)throw o}}return r}(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=function(){function t(t,i){for(var r=0;r<i.length;r++){var e=i[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(i,r,e){return r&&t(i.prototype,r),e&&t(i,e),i}}();function r(t){if(Array.isArray(t)){for(var i=0,r=Array(t.length);i<t.length;i++)r[i]=t[i];return r}return Array.from(t)}function e(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function n(t,i){t.width=i?i.clientWidth:window.innerWidth,t.height=i?i.clientHeight:window.innerHeight}function o(t,i,r,e,n){n.beginPath(),n.moveTo(t,i),n.lineTo(r,e),n.stroke()}exports.resizeCanvas=n,exports.drawLine=o,exports.circle=h,exports.drawCircle=a,exports.fade=f,exports.lerp=y,exports.grad=c,exports.map=d,exports.perlinNoise=x,exports.perlinOctave=g;var s=exports.CartesianSystem=function(){function t(i,r,n){e(this,t),this.origin={x:i,y:r},this.CTX=n}return i(t,[{key:"drawGrid",value:function(t,i){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,e=arguments[3];e||(e=r),"number"==typeof t&&(t=[0,t]),"number"==typeof i&&(i=[0,i]);for(var n=this.origin,s=n.x,h=n.y,a=s;a>i[0];a-=e)o(a,t[0],a,t[1],this.CTX);for(var u=s;u<i[1];u+=e)o(u,t[0],u,t[1],this.CTX);for(var l=h;l>t[0];l-=r)o(i[0],l,i[1],l,this.CTX);for(var v=h;v<t[1];v+=r)o(i[0],v,i[1],v,this.CTX)}},{key:"drawPosXAxis",value:function(t,i){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,e=this.origin,n=e.x,s=e.y,h=n,a=n+t;o(h,s,a,s,this.CTX);for(var u=h+i;u<a;u+=i)o(u,s,u,s+r,this.CTX)}},{key:"drawNegXAxis",value:function(t,i){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,e=this.origin,n=e.x,s=e.y,h=n-t,a=n;o(h,s,a,s,this.CTX);for(var u=a-i;u>h;u-=i)o(u,s,u,s+r,this.CTX)}},{key:"drawPosYAxis",value:function(t,i){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,e=this.origin,n=e.x,s=e.y,h=s,a=s+t;o(n,h,n,a,this.CTX);for(var u=h+i;u<a;u+=i)o(n,u,n+r,u,this.CTX)}},{key:"drawNegYAxis",value:function(t,i){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,e=this.origin,n=e.x,s=e.y,h=s-t,a=s;o(n,h,n,a,this.CTX);for(var u=a-i;u>h;u-=i)o(n,u,n+r,u,this.CTX)}},{key:"drawAxes",value:function(t,i,r){var e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5;this.drawPosXAxis(i,r,e),this.drawNegXAxis(i,r,e),this.drawPosYAxis(t,r,e),this.drawNegYAxis(t,r,e)}},{key:"toPoints",value:function(t,i){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,e=arguments[3];return e||(e=r),[(t-this.origin.x)/r,(this.origin.y-i)/e]}},{key:"toCoordinates",value:function(t,i){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,e=arguments[3];return e||(e=r),[this.origin.x+r*t,this.origin.y-e*i]}}]),t}();function h(t,i,r,e,n){var o=Math.random()*r[1]+r[0],s=t[Math.floor(5*Math.random())];return{x:Math.random()*(i.width-2*o)+o,y:Math.random()*(i.height-2*o)+o,dx:e,dy:n,radius:o,color:s}}function a(t,i){return i.beginPath(),i.arc(t.x,t.y,t.radius,0,2*Math.PI,!1),i.fillStyle=t.color,i.fill(),t}for(var u=Array(512),l=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],v=0;v<256;v++)u[256+v]=u[v]=l[v];function f(t){return Math.pow(t,3)*(t*(6*t-15)+10)}function y(t,i,r){return i+t*(r-i)}function c(i,r,e,n){if(void 0===e)return 0==(1&i)?r:-r;if(void 0===n){var o=7&i,s=t(o<4?[r,e]:[e,r],2),h=s[0],a=s[1];return(1&o?-h:h)+(2&o?-2*a:2*a)}var u=15&i,l=u<8?r:e,v=u<4?e:12===u||14===u?r:n;return(0==(1&u)?l:-l)+(0==(2&u)?v:-v)}function d(t,i,r){return(t-i[0])*((r[1]-r[0])/(i[1]-i[0]))+r[0]}function x(t,i,r){var e=255&~~t,n=f(t-=~~t);if(void 0===i)return 2*y(n,c(u[e],t),c(u[e+1],t-1));var o=255&~~i,s=f(i-=~~i),h=u[e]+o,a=u[e+1]+o;if(void 0===r)return y(s,y(n,c(u[h],t,i),c(u[a],t-1,i)),y(n,c(u[h],t,i-1),c(u[a],t-1,i-1)));var l=255&~~r,v=f(r-=~~r),d=u[h]+l,x=u[h+1]+l,g=u[a]+l,p=u[a+1]+l;return y(v,y(s,y(n,c(u[d],t,i,r),c(u[g],t-1,i,r)),y(n,c(u[x],t,i-1,r),c(u[p],t-1,i-1,r))),y(s,y(n,c(u[d+1],t,i,r-1),c(u[g+1],t-1,i,r-1)),y(n,c(u[x+1],t,i-1,r-1),c(u[p+1],t-1,i-1,r-1))))}function g(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.5;"number"==typeof t&&(t=[t]);for(var n=0,o=0,s=1,h=1,a=0;a<i;a++)o+=x.apply(void 0,r(t.map(function(t){return t*h})))*s,n+=s,s*=e,h*=2;return o/n}var p=exports.Vector=function(){function t(i,r,n){e(this,t),this.x=i,this.y=r,this.z=n}return i(t,[{key:"add",value:function(t){"number"==typeof this.x&&t.x&&(this.x+=t.x),"number"==typeof this.y&&t.y&&(this.y+=t.y),"number"==typeof this.z&&t.z&&(this.z+=t.z)}},{key:"sub",value:function(t){"number"==typeof this.x&&t.x&&(this.x-=t.x),"number"==typeof this.y&&t.y&&(this.y-=t.y),"number"==typeof this.z&&t.z&&(this.z-=t.z)}},{key:"scalar_mul",value:function(t){"number"==typeof this.x&&(this.x*=t),"number"==typeof this.y&&(this.y*=t),"number"==typeof this.z&&(this.z*=t)}},{key:"scalar_div",value:function(t){"number"==typeof this.x&&(this.x/=t),"number"==typeof this.y&&(this.y/=t),"number"==typeof this.z&&(this.z/=t)}},{key:"mag",value:function(){return Math.sqrt(this.x*this.x+this.y*this.y)}},{key:"normalize",value:function(){var t=this.mag();0!==t&&this.scalar_div(t)}},{key:"limit",value:function(t,i){this.x&&this.x>i?this.x=i:this.x&&this.x<t&&(this.x=t),this.y&&this.y>i?this.y=i:this.y&&this.y<t&&(this.y=t),this.z&&this.z>i?this.z=i:this.z&&this.z<t&&(this.z=t)}}]),t}(),m=exports.Mover=function(){function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new p(0,0),n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new p(0,0),o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new p(0,0);e(this,t),this.loc=r,this.vel=n,this.acc=o,this.mass=i}return i(t,[{key:"applyForce",value:function(t){t.scalar_div(this.mass),this.acc.add(t)}},{key:"update",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-2,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;this.loc.add(this.vel),this.vel.add(this.acc),"number"==typeof t&&this.vel.limit(t,i)}},{key:"display",value:function(t,i){var r=this.loc;i(r.x,r.y)}},{key:"checkEdges",value:function(t){var i=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-10,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-10,n=void 0,o=void 0;n=r<0?function(t){i.loc.x=t}:function(r){i.loc.x=t.width-r,i.vel.x*=-1},o=e<0?function(t){i.loc.y=t}:function(r){i.loc.y=t.height-r,i.vel.y*=-1},this.loc.x+r>t.width?n(r):this.loc.x-r<0&&n(t.width-r),this.loc.y+e>t.height?o(e):this.loc.y-e<0&&o(t.height-e)}}]),t}();
},{}],17:[function(require,module,exports) {
"use strict";var e=require("../utils"),r=document.querySelector("canvas"),t=r.getContext("2d"),i={x:0,y:0},n=["#4c5b5c","#ff715b","#f9cb40","#bced09","#2f52e0"],c=0;function a(e){var t=e.dx,i=e.dy,n=e.x,c=e.y,a=e.radius,d=e.color;return c+a+i>r.height?i=i=.9*-i:i+=.9,(n+a+t>r.width||n-a+t<0)&&(t=-t),{x:n+=t,y:c+=i,dx:t,dy:i,radius:a,color:d}}function d(){requestAnimationFrame(d),t.clearRect(0,0,r.width,r.height),o=o.map(function(r){return(0,e.drawCircle)(a(r),t)})}r.addEventListener("mousemove",function(e){i.x=e.x,i.y=e.y}),window.addEventListener("resize",u),r.addEventListener("click",u);var o=[];function u(){(0,e.resizeCanvas)(r),o=[];for(var i=0;i<200;i++){var c=(0,e.circle)(n,r,[5,20],4*Math.random()-2,0);(0,e.drawCircle)(c,t),o.push(c)}}u(),d();
},{"../utils":26}]},{},[17])