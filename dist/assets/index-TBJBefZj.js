var Yu=Object.defineProperty;var Zu=(i,e,t)=>e in i?Yu(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var me=(i,e,t)=>Zu(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const yn=Object.create(null);yn.open="0";yn.close="1";yn.ping="2";yn.pong="3";yn.message="4";yn.upgrade="5";yn.noop="6";const Ts=Object.create(null);Object.keys(yn).forEach(i=>{Ts[yn[i]]=i});const Wo={type:"error",data:"parser error"},Lc=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",Dc=typeof ArrayBuffer=="function",Ic=i=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(i):i&&i.buffer instanceof ArrayBuffer,Wa=({type:i,data:e},t,n)=>Lc&&e instanceof Blob?t?n(e):vl(e,n):Dc&&(e instanceof ArrayBuffer||Ic(e))?t?n(e):vl(new Blob([e]),n):n(yn[i]+(e||"")),vl=(i,e)=>{const t=new FileReader;return t.onload=function(){const n=t.result.split(",")[1];e("b"+(n||""))},t.readAsDataURL(i)};function _l(i){return i instanceof Uint8Array?i:i instanceof ArrayBuffer?new Uint8Array(i):new Uint8Array(i.buffer,i.byteOffset,i.byteLength)}let $s;function ju(i,e){if(Lc&&i.data instanceof Blob)return i.data.arrayBuffer().then(_l).then(e);if(Dc&&(i.data instanceof ArrayBuffer||Ic(i.data)))return e(_l(i.data));Wa(i,!1,t=>{$s||($s=new TextEncoder),e($s.encode(t))})}const xl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",br=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let i=0;i<xl.length;i++)br[xl.charCodeAt(i)]=i;const Ku=i=>{let e=i.length*.75,t=i.length,n,r=0,s,a,l,u;i[i.length-1]==="="&&(e--,i[i.length-2]==="="&&e--);const h=new ArrayBuffer(e),p=new Uint8Array(h);for(n=0;n<t;n+=4)s=br[i.charCodeAt(n)],a=br[i.charCodeAt(n+1)],l=br[i.charCodeAt(n+2)],u=br[i.charCodeAt(n+3)],p[r++]=s<<2|a>>4,p[r++]=(a&15)<<4|l>>2,p[r++]=(l&3)<<6|u&63;return h},Ju=typeof ArrayBuffer=="function",Xa=(i,e)=>{if(typeof i!="string")return{type:"message",data:Uc(i,e)};const t=i.charAt(0);return t==="b"?{type:"message",data:Qu(i.substring(1),e)}:Ts[t]?i.length>1?{type:Ts[t],data:i.substring(1)}:{type:Ts[t]}:Wo},Qu=(i,e)=>{if(Ju){const t=Ku(i);return Uc(t,e)}else return{base64:!0,data:i}},Uc=(i,e)=>{switch(e){case"blob":return i instanceof Blob?i:new Blob([i]);case"arraybuffer":default:return i instanceof ArrayBuffer?i:i.buffer}},Nc="",$u=(i,e)=>{const t=i.length,n=new Array(t);let r=0;i.forEach((s,a)=>{Wa(s,!1,l=>{n[a]=l,++r===t&&e(n.join(Nc))})})},eh=(i,e)=>{const t=i.split(Nc),n=[];for(let r=0;r<t.length;r++){const s=Xa(t[r],e);if(n.push(s),s.type==="error")break}return n};function th(){return new TransformStream({transform(i,e){ju(i,t=>{const n=t.length;let r;if(n<126)r=new Uint8Array(1),new DataView(r.buffer).setUint8(0,n);else if(n<65536){r=new Uint8Array(3);const s=new DataView(r.buffer);s.setUint8(0,126),s.setUint16(1,n)}else{r=new Uint8Array(9);const s=new DataView(r.buffer);s.setUint8(0,127),s.setBigUint64(1,BigInt(n))}i.data&&typeof i.data!="string"&&(r[0]|=128),e.enqueue(r),e.enqueue(t)})}})}let eo;function qr(i){return i.reduce((e,t)=>e+t.length,0)}function Yr(i,e){if(i[0].length===e)return i.shift();const t=new Uint8Array(e);let n=0;for(let r=0;r<e;r++)t[r]=i[0][n++],n===i[0].length&&(i.shift(),n=0);return i.length&&n<i[0].length&&(i[0]=i[0].slice(n)),t}function nh(i,e){eo||(eo=new TextDecoder);const t=[];let n=0,r=-1,s=!1;return new TransformStream({transform(a,l){for(t.push(a);;){if(n===0){if(qr(t)<1)break;const u=Yr(t,1);s=(u[0]&128)===128,r=u[0]&127,r<126?n=3:r===126?n=1:n=2}else if(n===1){if(qr(t)<2)break;const u=Yr(t,2);r=new DataView(u.buffer,u.byteOffset,u.length).getUint16(0),n=3}else if(n===2){if(qr(t)<8)break;const u=Yr(t,8),h=new DataView(u.buffer,u.byteOffset,u.length),p=h.getUint32(0);if(p>Math.pow(2,21)-1){l.enqueue(Wo);break}r=p*Math.pow(2,32)+h.getUint32(4),n=3}else{if(qr(t)<r)break;const u=Yr(t,r);l.enqueue(Xa(s?u:eo.decode(u),e)),n=0}if(r===0||r>i){l.enqueue(Wo);break}}}})}const Oc=4;function wt(i){if(i)return ih(i)}function ih(i){for(var e in wt.prototype)i[e]=wt.prototype[e];return i}wt.prototype.on=wt.prototype.addEventListener=function(i,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+i]=this._callbacks["$"+i]||[]).push(e),this};wt.prototype.once=function(i,e){function t(){this.off(i,t),e.apply(this,arguments)}return t.fn=e,this.on(i,t),this};wt.prototype.off=wt.prototype.removeListener=wt.prototype.removeAllListeners=wt.prototype.removeEventListener=function(i,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var t=this._callbacks["$"+i];if(!t)return this;if(arguments.length==1)return delete this._callbacks["$"+i],this;for(var n,r=0;r<t.length;r++)if(n=t[r],n===e||n.fn===e){t.splice(r,1);break}return t.length===0&&delete this._callbacks["$"+i],this};wt.prototype.emit=function(i){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),t=this._callbacks["$"+i],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(t){t=t.slice(0);for(var n=0,r=t.length;n<r;++n)t[n].apply(this,e)}return this};wt.prototype.emitReserved=wt.prototype.emit;wt.prototype.listeners=function(i){return this._callbacks=this._callbacks||{},this._callbacks["$"+i]||[]};wt.prototype.hasListeners=function(i){return!!this.listeners(i).length};const Ws=typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,t)=>t(e,0),Jt=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),rh="arraybuffer";function Fc(i,...e){return e.reduce((t,n)=>(i.hasOwnProperty(n)&&(t[n]=i[n]),t),{})}const sh=Jt.setTimeout,oh=Jt.clearTimeout;function Xs(i,e){e.useNativeTimers?(i.setTimeoutFn=sh.bind(Jt),i.clearTimeoutFn=oh.bind(Jt)):(i.setTimeoutFn=Jt.setTimeout.bind(Jt),i.clearTimeoutFn=Jt.clearTimeout.bind(Jt))}const ah=1.33;function lh(i){return typeof i=="string"?ch(i):Math.ceil((i.byteLength||i.size)*ah)}function ch(i){let e=0,t=0;for(let n=0,r=i.length;n<r;n++)e=i.charCodeAt(n),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(n++,t+=4);return t}function Bc(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function uh(i){let e="";for(let t in i)i.hasOwnProperty(t)&&(e.length&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(i[t]));return e}function hh(i){let e={},t=i.split("&");for(let n=0,r=t.length;n<r;n++){let s=t[n].split("=");e[decodeURIComponent(s[0])]=decodeURIComponent(s[1])}return e}class fh extends Error{constructor(e,t,n){super(e),this.description=t,this.context=n,this.type="TransportError"}}class qa extends wt{constructor(e){super(),this.writable=!1,Xs(this,e),this.opts=e,this.query=e.query,this.socket=e.socket,this.supportsBinary=!e.forceBase64}onError(e,t,n){return super.emitReserved("error",new fh(e,t,n)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const t=Xa(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,t={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(t)}_hostname(){const e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){const t=uh(e);return t.length?"?"+t:""}}class dh extends qa{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(e){this.readyState="pausing";const t=()=>{this.readyState="paused",e()};if(this._polling||!this.writable){let n=0;this._polling&&(n++,this.once("pollComplete",function(){--n||t()})),this.writable||(n++,this.once("drain",function(){--n||t()}))}else t()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const t=n=>{if(this.readyState==="opening"&&n.type==="open"&&this.onOpen(),n.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(n)};eh(e,this.socket.binaryType).forEach(t),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,$u(e,t=>{this.doWrite(t,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",t=this.query||{};return this.opts.timestampRequests!==!1&&(t[this.opts.timestampParam]=Bc()),!this.supportsBinary&&!t.sid&&(t.b64=1),this.createUri(e,t)}}let zc=!1;try{zc=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const ph=zc;function mh(){}class gh extends dh{constructor(e){if(super(e),typeof location<"u"){const t=location.protocol==="https:";let n=location.port;n||(n=t?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||n!==e.port}}doWrite(e,t){const n=this.request({method:"POST",data:e});n.on("success",t),n.on("error",(r,s)=>{this.onError("xhr post error",r,s)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(t,n)=>{this.onError("xhr poll error",t,n)}),this.pollXhr=e}}let qi=class ws extends wt{constructor(e,t,n){super(),this.createRequest=e,Xs(this,n),this._opts=n,this._method=n.method||"GET",this._uri=t,this._data=n.data!==void 0?n.data:null,this._create()}_create(){var e;const t=Fc(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");t.xdomain=!!this._opts.xd;const n=this._xhr=this.createRequest(t);try{n.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){n.setDisableHeaderCheck&&n.setDisableHeaderCheck(!0);for(let r in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(r)&&n.setRequestHeader(r,this._opts.extraHeaders[r])}}catch{}if(this._method==="POST")try{n.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{n.setRequestHeader("Accept","*/*")}catch{}(e=this._opts.cookieJar)===null||e===void 0||e.addCookies(n),"withCredentials"in n&&(n.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(n.timeout=this._opts.requestTimeout),n.onreadystatechange=()=>{var r;n.readyState===3&&((r=this._opts.cookieJar)===null||r===void 0||r.parseCookies(n.getResponseHeader("set-cookie"))),n.readyState===4&&(n.status===200||n.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof n.status=="number"?n.status:0)},0))},n.send(this._data)}catch(r){this.setTimeoutFn(()=>{this._onError(r)},0);return}typeof document<"u"&&(this._index=ws.requestsCount++,ws.requests[this._index]=this)}_onError(e){this.emitReserved("error",e,this._xhr),this._cleanup(!0)}_cleanup(e){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=mh,e)try{this._xhr.abort()}catch{}typeof document<"u"&&delete ws.requests[this._index],this._xhr=null}}_onLoad(){const e=this._xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}};qi.requestsCount=0;qi.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",yl);else if(typeof addEventListener=="function"){const i="onpagehide"in Jt?"pagehide":"unload";addEventListener(i,yl,!1)}}function yl(){for(let i in qi.requests)qi.requests.hasOwnProperty(i)&&qi.requests[i].abort()}const vh=function(){const i=kc({xdomain:!1});return i&&i.responseType!==null}();class _h extends gh{constructor(e){super(e);const t=e&&e.forceBase64;this.supportsBinary=vh&&!t}request(e={}){return Object.assign(e,{xd:this.xd},this.opts),new qi(kc,this.uri(),e)}}function kc(i){const e=i.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||ph))return new XMLHttpRequest}catch{}if(!e)try{return new Jt[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const Hc=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class xh extends qa{get name(){return"websocket"}doOpen(){const e=this.uri(),t=this.opts.protocols,n=Hc?{}:Fc(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(e,t,n)}catch(r){return this.emitReserved("error",r)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const n=e[t],r=t===e.length-1;Wa(n,this.supportsBinary,s=>{try{this.doWrite(n,s)}catch{}r&&Ws(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",t=this.query||{};return this.opts.timestampRequests&&(t[this.opts.timestampParam]=Bc()),this.supportsBinary||(t.b64=1),this.createUri(e,t)}}const to=Jt.WebSocket||Jt.MozWebSocket;class yh extends xh{createSocket(e,t,n){return Hc?new to(e,t,n):t?new to(e,t):new to(e)}doWrite(e,t){this.ws.send(t)}}class Mh extends qa{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(e){return this.emitReserved("error",e)}this._transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(e=>{const t=nh(Number.MAX_SAFE_INTEGER,this.socket.binaryType),n=e.readable.pipeThrough(t).getReader(),r=th();r.readable.pipeTo(e.writable),this._writer=r.writable.getWriter();const s=()=>{n.read().then(({done:l,value:u})=>{l||(this.onPacket(u),s())}).catch(l=>{})};s();const a={type:"open"};this.query.sid&&(a.data=`{"sid":"${this.query.sid}"}`),this._writer.write(a).then(()=>this.onOpen())})})}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const n=e[t],r=t===e.length-1;this._writer.write(n).then(()=>{r&&Ws(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this._transport)===null||e===void 0||e.close()}}const Sh={websocket:yh,webtransport:Mh,polling:_h},bh=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,Eh=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function Xo(i){if(i.length>8e3)throw"URI too long";const e=i,t=i.indexOf("["),n=i.indexOf("]");t!=-1&&n!=-1&&(i=i.substring(0,t)+i.substring(t,n).replace(/:/g,";")+i.substring(n,i.length));let r=bh.exec(i||""),s={},a=14;for(;a--;)s[Eh[a]]=r[a]||"";return t!=-1&&n!=-1&&(s.source=e,s.host=s.host.substring(1,s.host.length-1).replace(/;/g,":"),s.authority=s.authority.replace("[","").replace("]","").replace(/;/g,":"),s.ipv6uri=!0),s.pathNames=Th(s,s.path),s.queryKey=wh(s,s.query),s}function Th(i,e){const t=/\/{2,9}/g,n=e.replace(t,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&n.splice(0,1),e.slice(-1)=="/"&&n.splice(n.length-1,1),n}function wh(i,e){const t={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(n,r,s){r&&(t[r]=s)}),t}const qo=typeof addEventListener=="function"&&typeof removeEventListener=="function",As=[];qo&&addEventListener("offline",()=>{As.forEach(i=>i())},!1);class ti extends wt{constructor(e,t){if(super(),this.binaryType=rh,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,e&&typeof e=="object"&&(t=e,e=null),e){const n=Xo(e);t.hostname=n.host,t.secure=n.protocol==="https"||n.protocol==="wss",t.port=n.port,n.query&&(t.query=n.query)}else t.host&&(t.hostname=Xo(t.host).host);Xs(this,t),this.secure=t.secure!=null?t.secure:typeof location<"u"&&location.protocol==="https:",t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.hostname=t.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=t.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},t.transports.forEach(n=>{const r=n.prototype.name;this.transports.push(r),this._transportsByName[r]=n}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},t),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=hh(this.opts.query)),qo&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},As.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(e){const t=Object.assign({},this.opts.query);t.EIO=Oc,t.transport=e,this.id&&(t.sid=this.id);const n=Object.assign({},this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new this._transportsByName[e](n)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const e=this.opts.rememberUpgrade&&ti.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const t=this.createTransport(e);t.open(),this.setTransport(t)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",t=>this._onClose("transport close",t))}onOpen(){this.readyState="open",ti.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush()}_onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const t=new Error("server error");t.code=e.data,this._onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this._pingInterval=e.pingInterval,this._pingTimeout=e.pingTimeout,this._maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const e=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+e,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},e),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this._getWritablePackets();this.transport.send(e),this._prevBufferLen=e.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let t=1;for(let n=0;n<this.writeBuffer.length;n++){const r=this.writeBuffer[n].data;if(r&&(t+=lh(r)),n>0&&t>this._maxPayload)return this.writeBuffer.slice(0,n);t+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const e=Date.now()>this._pingTimeoutTime;return e&&(this._pingTimeoutTime=0,Ws(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),e}write(e,t,n){return this._sendPacket("message",e,t,n),this}send(e,t,n){return this._sendPacket("message",e,t,n),this}_sendPacket(e,t,n,r){if(typeof t=="function"&&(r=t,t=void 0),typeof n=="function"&&(r=n,n=null),this.readyState==="closing"||this.readyState==="closed")return;n=n||{},n.compress=n.compress!==!1;const s={type:e,data:t,options:n};this.emitReserved("packetCreate",s),this.writeBuffer.push(s),r&&this.once("flush",r),this.flush()}close(){const e=()=>{this._onClose("forced close"),this.transport.close()},t=()=>{this.off("upgrade",t),this.off("upgradeError",t),e()},n=()=>{this.once("upgrade",t),this.once("upgradeError",t)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?n():e()}):this.upgrading?n():e()),this}_onError(e){if(ti.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",e),this._onClose("transport error",e)}_onClose(e,t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),qo&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const n=As.indexOf(this._offlineEventListener);n!==-1&&As.splice(n,1)}this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this._prevBufferLen=0}}}ti.protocol=Oc;class Ah extends ti{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState==="open"&&this.opts.upgrade)for(let e=0;e<this._upgrades.length;e++)this._probe(this._upgrades[e])}_probe(e){let t=this.createTransport(e),n=!1;ti.priorWebsocketSuccess=!1;const r=()=>{n||(t.send([{type:"ping",data:"probe"}]),t.once("packet",o=>{if(!n)if(o.type==="pong"&&o.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;ti.priorWebsocketSuccess=t.name==="websocket",this.transport.pause(()=>{n||this.readyState!=="closed"&&(p(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{const c=new Error("probe error");c.transport=t.name,this.emitReserved("upgradeError",c)}}))};function s(){n||(n=!0,p(),t.close(),t=null)}const a=o=>{const c=new Error("probe error: "+o);c.transport=t.name,s(),this.emitReserved("upgradeError",c)};function l(){a("transport closed")}function u(){a("socket closed")}function h(o){t&&o.name!==t.name&&s()}const p=()=>{t.removeListener("open",r),t.removeListener("error",a),t.removeListener("close",l),this.off("close",u),this.off("upgrading",h)};t.once("open",r),t.once("error",a),t.once("close",l),this.once("close",u),this.once("upgrading",h),this._upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{n||t.open()},200):t.open()}onHandshake(e){this._upgrades=this._filterUpgrades(e.upgrades),super.onHandshake(e)}_filterUpgrades(e){const t=[];for(let n=0;n<e.length;n++)~this.transports.indexOf(e[n])&&t.push(e[n]);return t}}let Ch=class extends Ah{constructor(e,t={}){const n=typeof e=="object",r=n?{...e}:{...t};(!r.transports||r.transports&&typeof r.transports[0]=="string")&&(r.transports=(r.transports||["polling","websocket","webtransport"]).map(s=>Sh[s]).filter(s=>!!s)),super(n?r:e,r)}};function Rh(i,e="",t){let n=i;t=t||typeof location<"u"&&location,i==null&&(i=t.protocol+"//"+t.host),typeof i=="string"&&(i.charAt(0)==="/"&&(i.charAt(1)==="/"?i=t.protocol+i:i=t.host+i),/^(https?|wss?):\/\//.test(i)||(typeof t<"u"?i=t.protocol+"//"+i:i="https://"+i),n=Xo(i)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";const s=n.host.indexOf(":")!==-1?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+s+":"+n.port+e,n.href=n.protocol+"://"+s+(t&&t.port===n.port?"":":"+n.port),n}const Ph=typeof ArrayBuffer=="function",Lh=i=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(i):i.buffer instanceof ArrayBuffer,Gc=Object.prototype.toString,Dh=typeof Blob=="function"||typeof Blob<"u"&&Gc.call(Blob)==="[object BlobConstructor]",Ih=typeof File=="function"||typeof File<"u"&&Gc.call(File)==="[object FileConstructor]";function Ya(i){return Ph&&(i instanceof ArrayBuffer||Lh(i))||Dh&&i instanceof Blob||Ih&&i instanceof File}function Cs(i,e){if(!i||typeof i!="object")return!1;if(Array.isArray(i)){for(let t=0,n=i.length;t<n;t++)if(Cs(i[t]))return!0;return!1}if(Ya(i))return!0;if(i.toJSON&&typeof i.toJSON=="function"&&arguments.length===1)return Cs(i.toJSON(),!0);for(const t in i)if(Object.prototype.hasOwnProperty.call(i,t)&&Cs(i[t]))return!0;return!1}function Uh(i){const e=[],t=i.data,n=i;return n.data=Yo(t,e),n.attachments=e.length,{packet:n,buffers:e}}function Yo(i,e){if(!i)return i;if(Ya(i)){const t={_placeholder:!0,num:e.length};return e.push(i),t}else if(Array.isArray(i)){const t=new Array(i.length);for(let n=0;n<i.length;n++)t[n]=Yo(i[n],e);return t}else if(typeof i=="object"&&!(i instanceof Date)){const t={};for(const n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=Yo(i[n],e));return t}return i}function Nh(i,e){return i.data=Zo(i.data,e),delete i.attachments,i}function Zo(i,e){if(!i)return i;if(i&&i._placeholder===!0){if(typeof i.num=="number"&&i.num>=0&&i.num<e.length)return e[i.num];throw new Error("illegal attachments")}else if(Array.isArray(i))for(let t=0;t<i.length;t++)i[t]=Zo(i[t],e);else if(typeof i=="object")for(const t in i)Object.prototype.hasOwnProperty.call(i,t)&&(i[t]=Zo(i[t],e));return i}const Oh=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var it;(function(i){i[i.CONNECT=0]="CONNECT",i[i.DISCONNECT=1]="DISCONNECT",i[i.EVENT=2]="EVENT",i[i.ACK=3]="ACK",i[i.CONNECT_ERROR=4]="CONNECT_ERROR",i[i.BINARY_EVENT=5]="BINARY_EVENT",i[i.BINARY_ACK=6]="BINARY_ACK"})(it||(it={}));class Fh{constructor(e){this.replacer=e}encode(e){return(e.type===it.EVENT||e.type===it.ACK)&&Cs(e)?this.encodeAsBinary({type:e.type===it.EVENT?it.BINARY_EVENT:it.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let t=""+e.type;return(e.type===it.BINARY_EVENT||e.type===it.BINARY_ACK)&&(t+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(t+=e.nsp+","),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){const t=Uh(e),n=this.encodeAsString(t.packet),r=t.buffers;return r.unshift(n),r}}class Za extends wt{constructor(e){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof e=="function"?{reviver:e}:e)}add(e){let t;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e);const n=t.type===it.BINARY_EVENT;n||t.type===it.BINARY_ACK?(t.type=n?it.EVENT:it.ACK,this.reconstructor=new Bh(t),t.attachments===0&&super.emitReserved("decoded",t)):super.emitReserved("decoded",t)}else if(Ya(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let t=0;const n={type:Number(e.charAt(0))};if(it[n.type]===void 0)throw new Error("unknown packet type "+n.type);if(n.type===it.BINARY_EVENT||n.type===it.BINARY_ACK){const s=t+1;for(;e.charAt(++t)!=="-"&&t!=e.length;);const a=e.substring(s,t);if(a!=Number(a)||e.charAt(t)!=="-")throw new Error("Illegal attachments");const l=Number(a);if(!zh(l)||l<0)throw new Error("Illegal attachments");if(l>this.opts.maxAttachments)throw new Error("too many attachments");n.attachments=l}if(e.charAt(t+1)==="/"){const s=t+1;for(;++t&&!(e.charAt(t)===","||t===e.length););n.nsp=e.substring(s,t)}else n.nsp="/";const r=e.charAt(t+1);if(r!==""&&Number(r)==r){const s=t+1;for(;++t;){const a=e.charAt(t);if(a==null||Number(a)!=a){--t;break}if(t===e.length)break}n.id=Number(e.substring(s,t+1))}if(e.charAt(++t)){const s=this.tryParse(e.substr(t));if(Za.isPayloadValid(n.type,s))n.data=s;else throw new Error("invalid payload")}return n}tryParse(e){try{return JSON.parse(e,this.opts.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case it.CONNECT:return Ml(t);case it.DISCONNECT:return t===void 0;case it.CONNECT_ERROR:return typeof t=="string"||Ml(t);case it.EVENT:case it.BINARY_EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&Oh.indexOf(t[0])===-1);case it.ACK:case it.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Bh{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const t=Nh(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const zh=Number.isInteger||function(i){return typeof i=="number"&&isFinite(i)&&Math.floor(i)===i};function Ml(i){return Object.prototype.toString.call(i)==="[object Object]"}const kh=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Za,Encoder:Fh,get PacketType(){return it}},Symbol.toStringTag,{value:"Module"}));function hn(i,e,t){return i.on(e,t),function(){i.off(e,t)}}const Hh=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class Vc extends wt{constructor(e,t,n){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,n&&n.auth&&(this.auth=n.auth),this._opts=Object.assign({},n),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[hn(e,"open",this.onopen.bind(this)),hn(e,"packet",this.onpacket.bind(this)),hn(e,"error",this.onerror.bind(this)),hn(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...t){var n,r,s;if(Hh.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(t.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(t),this;const a={type:it.EVENT,data:t};if(a.options={},a.options.compress=this.flags.compress!==!1,typeof t[t.length-1]=="function"){const p=this.ids++,o=t.pop();this._registerAckCallback(p,o),a.id=p}const l=(r=(n=this.io.engine)===null||n===void 0?void 0:n.transport)===null||r===void 0?void 0:r.writable,u=this.connected&&!(!((s=this.io.engine)===null||s===void 0)&&s._hasPingExpired());return this.flags.volatile&&!l||(u?(this.notifyOutgoingListeners(a),this.packet(a)):this.sendBuffer.push(a)),this.flags={},this}_registerAckCallback(e,t){var n;const r=(n=this.flags.timeout)!==null&&n!==void 0?n:this._opts.ackTimeout;if(r===void 0){this.acks[e]=t;return}const s=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let l=0;l<this.sendBuffer.length;l++)this.sendBuffer[l].id===e&&this.sendBuffer.splice(l,1);t.call(this,new Error("operation has timed out"))},r),a=(...l)=>{this.io.clearTimeoutFn(s),t.apply(this,l)};a.withError=!0,this.acks[e]=a}emitWithAck(e,...t){return new Promise((n,r)=>{const s=(a,l)=>a?r(a):n(l);s.withError=!0,t.push(s),this.emit(e,...t)})}_addToQueue(e){let t;typeof e[e.length-1]=="function"&&(t=e.pop());const n={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((r,...s)=>(this._queue[0],r!==null?n.tryCount>this._opts.retries&&(this._queue.shift(),t&&t(r)):(this._queue.shift(),t&&t(null,...s)),n.pending=!1,this._drainQueue())),this._queue.push(n),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:it.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(e=>{if(!this.sendBuffer.some(n=>String(n.id)===e)){const n=this.acks[e];delete this.acks[e],n.withError&&n.call(this,new Error("socket has been disconnected"))}})}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case it.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case it.EVENT:case it.BINARY_EVENT:this.onevent(e);break;case it.ACK:case it.BINARY_ACK:this.onack(e);break;case it.DISCONNECT:this.ondisconnect();break;case it.CONNECT_ERROR:this.destroy();const n=new Error(e.data.message);n.data=e.data.data,this.emitReserved("connect_error",n);break}}onevent(e){const t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const t=this._anyListeners.slice();for(const n of t)n.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const t=this;let n=!1;return function(...r){n||(n=!0,t.packet({type:it.ACK,id:e,data:r}))}}onack(e){const t=this.acks[e.id];typeof t=="function"&&(delete this.acks[e.id],t.withError&&e.data.unshift(null),t.apply(this,e.data))}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:it.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const t=this._anyListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const t=this._anyOutgoingListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const t=this._anyOutgoingListeners.slice();for(const n of t)n.apply(this,e.data)}}}function nr(i){i=i||{},this.ms=i.min||100,this.max=i.max||1e4,this.factor=i.factor||2,this.jitter=i.jitter>0&&i.jitter<=1?i.jitter:0,this.attempts=0}nr.prototype.duration=function(){var i=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),t=Math.floor(e*this.jitter*i);i=Math.floor(e*10)&1?i+t:i-t}return Math.min(i,this.max)|0};nr.prototype.reset=function(){this.attempts=0};nr.prototype.setMin=function(i){this.ms=i};nr.prototype.setMax=function(i){this.max=i};nr.prototype.setJitter=function(i){this.jitter=i};class jo extends wt{constructor(e,t){var n;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.opts=t,Xs(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor((n=t.randomizationFactor)!==null&&n!==void 0?n:.5),this.backoff=new nr({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState="closed",this.uri=e;const r=t.parser||kh;this.encoder=new r.Encoder,this.decoder=new r.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,e||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)===null||t===void 0||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)===null||t===void 0||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)===null||t===void 0||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new Ch(this.uri,this.opts);const t=this.engine,n=this;this._readyState="opening",this.skipReconnect=!1;const r=hn(t,"open",function(){n.onopen(),e&&e()}),s=l=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",l),e?e(l):this.maybeReconnectOnOpen()},a=hn(t,"error",s);if(this._timeout!==!1){const l=this._timeout,u=this.setTimeoutFn(()=>{r(),s(new Error("timeout")),t.close()},l);this.opts.autoUnref&&u.unref(),this.subs.push(()=>{this.clearTimeoutFn(u)})}return this.subs.push(r),this.subs.push(a),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(hn(e,"ping",this.onping.bind(this)),hn(e,"data",this.ondata.bind(this)),hn(e,"error",this.onerror.bind(this)),hn(e,"close",this.onclose.bind(this)),hn(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(t){this.onclose("parse error",t)}}ondecoded(e){Ws(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let n=this.nsps[e];return n?this._autoConnect&&!n.active&&n.connect():(n=new Vc(this,e,t),this.nsps[e]=n),n}_destroy(e){const t=Object.keys(this.nsps);for(const n of t)if(this.nsps[n].active)return;this._close()}_packet(e){const t=this.encoder.encode(e);for(let n=0;n<t.length;n++)this.engine.write(t[n],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(e,t){var n;this.cleanup(),(n=this.engine)===null||n===void 0||n.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const t=this.backoff.duration();this._reconnecting=!0;const n=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(r=>{r?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",r)):e.onreconnect()}))},t);this.opts.autoUnref&&n.unref(),this.subs.push(()=>{this.clearTimeoutFn(n)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const pr={};function Rs(i,e){typeof i=="object"&&(e=i,i=void 0),e=e||{};const t=Rh(i,e.path||"/socket.io"),n=t.source,r=t.id,s=t.path,a=pr[r]&&s in pr[r].nsps,l=e.forceNew||e["force new connection"]||e.multiplex===!1||a;let u;return l?u=new jo(n,e):(pr[r]||(pr[r]=new jo(n,e)),u=pr[r]),t.query&&!e.query&&(e.query=t.queryKey),u.socket(t.path,e)}Object.assign(Rs,{Manager:jo,Socket:Vc,io:Rs,connect:Rs});class Gh{constructor(e){me(this,"socket");me(this,"_ping",0);me(this,"_connected",!1);this.socket=Rs(e??"",{transports:["websocket"],autoConnect:!0}),this.socket.on("connect",()=>{this._connected=!0,this.startPingLoop()}),this.socket.on("disconnect",()=>{this._connected=!1}),this.socket.on("pong2",t=>{this._ping=Date.now()-t})}startPingLoop(){setInterval(()=>{this._connected&&this.socket.emit("ping2",Date.now())},2e3)}get ping(){return this._ping}get connected(){return this._connected}get id(){return this.socket.id??""}emit(e,...t){this.socket.emit(e,...t)}on(e,t){return this.socket.on(e,t),()=>{this.socket.off(e,t)}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ja="169",Vh=0,Sl=1,Wh=2,Wc=1,Xc=2,Dn=3,si=0,Wt=1,xn=2,ft=0,zn=1,Ko=2,bl=3,El=4,qc=5,dn=100,Xh=101,qh=102,Yh=103,Zh=104,Jo=200,jh=201,Kh=202,Jh=203,Pr=204,Lr=205,Yc=206,Qh=207,Zc=208,$h=209,ef=210,tf=211,nf=212,rf=213,sf=214,Qo=0,$o=1,ea=2,ji=3,ta=4,na=5,ia=6,ra=7,jc=0,of=1,af=2,ni=0,Kc=1,Jc=2,Qc=3,Ka=4,lf=5,$c=6,eu=7,tu=300,Ki=301,Ji=302,sa=303,oa=304,qs=306,Dr=1e3,On=1001,aa=1002,ct=1003,cf=1004,Zr=1005,Ct=1006,no=1007,ei=1008,kn=1009,nu=1010,iu=1011,Qi=1012,Ja=1013,Mi=1014,Ut=1015,dt=1016,Qa=1017,$a=1018,Si=1020,ru=35902,su=1021,ou=1022,Yt=1023,au=1024,lu=1025,Yi=1026,bi=1027,Nr=1028,el=1029,cu=1030,tl=1031,nl=1033,Ps=33776,Ls=33777,Ds=33778,Is=33779,la=35840,ca=35841,ua=35842,ha=35843,fa=36196,da=37492,pa=37496,ma=37808,ga=37809,va=37810,_a=37811,xa=37812,ya=37813,Ma=37814,Sa=37815,ba=37816,Ea=37817,Ta=37818,wa=37819,Aa=37820,Ca=37821,Us=36492,Ra=36494,Pa=36495,uu=36283,La=36284,Da=36285,Ia=36286,uf=3200,hf=3201,il=0,ff=1,Un="",fn="srgb",en="srgb-linear",rl="display-p3",Ys="display-p3-linear",Fs="linear",ht="srgb",Bs="rec709",zs="p3",Ai=7680,Tl=519,df=512,pf=513,mf=514,hu=515,gf=516,vf=517,_f=518,xf=519,wl=35044,Al="300 es",Fn=2e3,ks=2001;class ir{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Cl=1234567;const Tr=Math.PI/180,Ir=180/Math.PI;function rr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]).toLowerCase()}function At(i,e,t){return Math.max(e,Math.min(t,i))}function sl(i,e){return(i%e+e)%e}function yf(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Mf(i,e,t){return i!==e?(t-i)/(e-i):0}function wr(i,e,t){return(1-t)*i+t*e}function Sf(i,e,t,n){return wr(i,e,1-Math.exp(-t*n))}function bf(i,e=1){return e-Math.abs(sl(i,e*2)-e)}function Ef(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Tf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function wf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Af(i,e){return i+Math.random()*(e-i)}function Cf(i){return i*(.5-Math.random())}function Rf(i){i!==void 0&&(Cl=i);let e=Cl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Pf(i){return i*Tr}function Lf(i){return i*Ir}function Df(i){return(i&i-1)===0&&i!==0}function If(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Uf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Nf(i,e,t,n,r){const s=Math.cos,a=Math.sin,l=s(t/2),u=a(t/2),h=s((e+n)/2),p=a((e+n)/2),o=s((e-n)/2),c=a((e-n)/2),f=s((n-e)/2),v=a((n-e)/2);switch(r){case"XYX":i.set(l*p,u*o,u*c,l*h);break;case"YZY":i.set(u*c,l*p,u*o,l*h);break;case"ZXZ":i.set(u*o,u*c,l*p,l*h);break;case"XZX":i.set(l*p,u*v,u*f,l*h);break;case"YXY":i.set(u*f,l*p,u*v,l*h);break;case"ZYZ":i.set(u*v,u*f,l*p,l*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Gi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function kt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ua={DEG2RAD:Tr,RAD2DEG:Ir,generateUUID:rr,clamp:At,euclideanModulo:sl,mapLinear:yf,inverseLerp:Mf,lerp:wr,damp:Sf,pingpong:bf,smoothstep:Ef,smootherstep:Tf,randInt:wf,randFloat:Af,randFloatSpread:Cf,seededRandom:Rf,degToRad:Pf,radToDeg:Lf,isPowerOfTwo:Df,ceilPowerOfTwo:If,floorPowerOfTwo:Uf,setQuaternionFromProperEuler:Nf,normalize:kt,denormalize:Gi};class ve{constructor(e=0,t=0){ve.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class je{constructor(e,t,n,r,s,a,l,u,h){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,l,u,h)}set(e,t,n,r,s,a,l,u,h){const p=this.elements;return p[0]=e,p[1]=r,p[2]=l,p[3]=t,p[4]=s,p[5]=u,p[6]=n,p[7]=a,p[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],l=n[3],u=n[6],h=n[1],p=n[4],o=n[7],c=n[2],f=n[5],v=n[8],x=r[0],g=r[3],m=r[6],w=r[1],E=r[4],C=r[7],B=r[2],L=r[5],P=r[8];return s[0]=a*x+l*w+u*B,s[3]=a*g+l*E+u*L,s[6]=a*m+l*C+u*P,s[1]=h*x+p*w+o*B,s[4]=h*g+p*E+o*L,s[7]=h*m+p*C+o*P,s[2]=c*x+f*w+v*B,s[5]=c*g+f*E+v*L,s[8]=c*m+f*C+v*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],l=e[5],u=e[6],h=e[7],p=e[8];return t*a*p-t*l*h-n*s*p+n*l*u+r*s*h-r*a*u}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],l=e[5],u=e[6],h=e[7],p=e[8],o=p*a-l*h,c=l*u-p*s,f=h*s-a*u,v=t*o+n*c+r*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=o*x,e[1]=(r*h-p*n)*x,e[2]=(l*n-r*a)*x,e[3]=c*x,e[4]=(p*t-r*u)*x,e[5]=(r*s-l*t)*x,e[6]=f*x,e[7]=(n*u-h*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,l){const u=Math.cos(s),h=Math.sin(s);return this.set(n*u,n*h,-n*(u*a+h*l)+a+e,-r*h,r*u,-r*(-h*a+u*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(io.makeScale(e,t)),this}rotate(e){return this.premultiply(io.makeRotation(-e)),this}translate(e,t){return this.premultiply(io.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const io=new je;function fu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Hs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Of(){const i=Hs("canvas");return i.style.display="block",i}const Rl={};function Ns(i){i in Rl||(Rl[i]=!0,console.warn(i))}function Ff(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Bf(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function zf(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Pl=new je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ll=new je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),mr={[en]:{transfer:Fs,primaries:Bs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[fn]:{transfer:ht,primaries:Bs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ys]:{transfer:Fs,primaries:zs,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Ll),fromReference:i=>i.applyMatrix3(Pl)},[rl]:{transfer:ht,primaries:zs,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Ll),fromReference:i=>i.applyMatrix3(Pl).convertLinearToSRGB()}},kf=new Set([en,Ys]),ot={enabled:!0,_workingColorSpace:en,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!kf.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=mr[e].toReference,r=mr[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return mr[i].primaries},getTransfer:function(i){return i===Un?Fs:mr[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(mr[e].luminanceCoefficients)}};function Zi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ro(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ci;class Hf{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ci===void 0&&(Ci=Hs("canvas")),Ci.width=e.width,Ci.height=e.height;const n=Ci.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ci}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Hs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Zi(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Zi(t[n]/255)*255):t[n]=Zi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Gf=0;class du{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=rr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,l=r.length;a<l;a++)r[a].isDataTexture?s.push(so(r[a].image)):s.push(so(r[a]))}else s=so(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function so(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Hf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vf=0;class Nt extends ir{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,n=On,r=On,s=Ct,a=ei,l=Yt,u=kn,h=Nt.DEFAULT_ANISOTROPY,p=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=rr(),this.name="",this.source=new du(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=h,this.format=l,this.internalFormat=null,this.type=u,this.offset=new ve(0,0),this.repeat=new ve(1,1),this.center=new ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=p,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==tu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Dr:e.x=e.x-Math.floor(e.x);break;case On:e.x=e.x<0?0:1;break;case aa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Dr:e.y=e.y-Math.floor(e.y);break;case On:e.y=e.y<0?0:1;break;case aa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=tu;Nt.DEFAULT_ANISOTROPY=1;class _t{constructor(e=0,t=0,n=0,r=1){_t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const u=e.elements,h=u[0],p=u[4],o=u[8],c=u[1],f=u[5],v=u[9],x=u[2],g=u[6],m=u[10];if(Math.abs(p-c)<.01&&Math.abs(o-x)<.01&&Math.abs(v-g)<.01){if(Math.abs(p+c)<.1&&Math.abs(o+x)<.1&&Math.abs(v+g)<.1&&Math.abs(h+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(h+1)/2,C=(f+1)/2,B=(m+1)/2,L=(p+c)/4,P=(o+x)/4,D=(v+g)/4;return E>C&&E>B?E<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(E),r=L/n,s=P/n):C>B?C<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(C),n=L/r,s=D/r):B<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(B),n=P/s,r=D/s),this.set(n,r,s,t),this}let w=Math.sqrt((g-v)*(g-v)+(o-x)*(o-x)+(c-p)*(c-p));return Math.abs(w)<.001&&(w=1),this.x=(g-v)/w,this.y=(o-x)/w,this.z=(c-p)/w,this.w=Math.acos((h+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Wf extends ir{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Nt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let l=0;l<a;l++)this.textures[l]=s.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new du(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yt extends Wf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class pu extends Nt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ct,this.minFilter=ct,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Xf extends Nt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ct,this.minFilter=ct,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Or{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,l){let u=n[r+0],h=n[r+1],p=n[r+2],o=n[r+3];const c=s[a+0],f=s[a+1],v=s[a+2],x=s[a+3];if(l===0){e[t+0]=u,e[t+1]=h,e[t+2]=p,e[t+3]=o;return}if(l===1){e[t+0]=c,e[t+1]=f,e[t+2]=v,e[t+3]=x;return}if(o!==x||u!==c||h!==f||p!==v){let g=1-l;const m=u*c+h*f+p*v+o*x,w=m>=0?1:-1,E=1-m*m;if(E>Number.EPSILON){const B=Math.sqrt(E),L=Math.atan2(B,m*w);g=Math.sin(g*L)/B,l=Math.sin(l*L)/B}const C=l*w;if(u=u*g+c*C,h=h*g+f*C,p=p*g+v*C,o=o*g+x*C,g===1-l){const B=1/Math.sqrt(u*u+h*h+p*p+o*o);u*=B,h*=B,p*=B,o*=B}}e[t]=u,e[t+1]=h,e[t+2]=p,e[t+3]=o}static multiplyQuaternionsFlat(e,t,n,r,s,a){const l=n[r],u=n[r+1],h=n[r+2],p=n[r+3],o=s[a],c=s[a+1],f=s[a+2],v=s[a+3];return e[t]=l*v+p*o+u*f-h*c,e[t+1]=u*v+p*c+h*o-l*f,e[t+2]=h*v+p*f+l*c-u*o,e[t+3]=p*v-l*o-u*c-h*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,l=Math.cos,u=Math.sin,h=l(n/2),p=l(r/2),o=l(s/2),c=u(n/2),f=u(r/2),v=u(s/2);switch(a){case"XYZ":this._x=c*p*o+h*f*v,this._y=h*f*o-c*p*v,this._z=h*p*v+c*f*o,this._w=h*p*o-c*f*v;break;case"YXZ":this._x=c*p*o+h*f*v,this._y=h*f*o-c*p*v,this._z=h*p*v-c*f*o,this._w=h*p*o+c*f*v;break;case"ZXY":this._x=c*p*o-h*f*v,this._y=h*f*o+c*p*v,this._z=h*p*v+c*f*o,this._w=h*p*o-c*f*v;break;case"ZYX":this._x=c*p*o-h*f*v,this._y=h*f*o+c*p*v,this._z=h*p*v-c*f*o,this._w=h*p*o+c*f*v;break;case"YZX":this._x=c*p*o+h*f*v,this._y=h*f*o+c*p*v,this._z=h*p*v-c*f*o,this._w=h*p*o-c*f*v;break;case"XZY":this._x=c*p*o-h*f*v,this._y=h*f*o-c*p*v,this._z=h*p*v+c*f*o,this._w=h*p*o+c*f*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],l=t[5],u=t[9],h=t[2],p=t[6],o=t[10],c=n+l+o;if(c>0){const f=.5/Math.sqrt(c+1);this._w=.25/f,this._x=(p-u)*f,this._y=(s-h)*f,this._z=(a-r)*f}else if(n>l&&n>o){const f=2*Math.sqrt(1+n-l-o);this._w=(p-u)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+h)/f}else if(l>o){const f=2*Math.sqrt(1+l-n-o);this._w=(s-h)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(u+p)/f}else{const f=2*Math.sqrt(1+o-n-l);this._w=(a-r)/f,this._x=(s+h)/f,this._y=(u+p)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(At(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,l=t._x,u=t._y,h=t._z,p=t._w;return this._x=n*p+a*l+r*h-s*u,this._y=r*p+a*u+s*l-n*h,this._z=s*p+a*h+n*u-r*l,this._w=a*p-n*l-r*u-s*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let l=a*e._w+n*e._x+r*e._y+s*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const u=1-l*l;if(u<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const h=Math.sqrt(u),p=Math.atan2(h,l),o=Math.sin((1-t)*p)/h,c=Math.sin(t*p)/h;return this._w=a*o+this._w*c,this._x=n*o+this._x*c,this._y=r*o+this._y*c,this._z=s*o+this._z*c,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(e=0,t=0,n=0){k.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Dl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Dl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,l=e.z,u=e.w,h=2*(a*r-l*n),p=2*(l*t-s*r),o=2*(s*n-a*t);return this.x=t+u*h+a*o-l*p,this.y=n+u*p+l*h-s*o,this.z=r+u*o+s*p-a*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,l=t.y,u=t.z;return this.x=r*u-s*l,this.y=s*a-n*u,this.z=n*l-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return oo.copy(this).projectOnVector(e),this.sub(oo)}reflect(e){return this.sub(oo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oo=new k,Dl=new Or;class ci{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(on.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(on.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=on.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,l=s.count;a<l;a++)e.isMesh===!0?e.getVertexPosition(a,on):on.fromBufferAttribute(s,a),on.applyMatrix4(e.matrixWorld),this.expandByPoint(on);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),jr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),jr.copy(n.boundingBox)),jr.applyMatrix4(e.matrixWorld),this.union(jr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,on),on.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gr),Kr.subVectors(this.max,gr),Ri.subVectors(e.a,gr),Pi.subVectors(e.b,gr),Li.subVectors(e.c,gr),Wn.subVectors(Pi,Ri),Xn.subVectors(Li,Pi),ui.subVectors(Ri,Li);let t=[0,-Wn.z,Wn.y,0,-Xn.z,Xn.y,0,-ui.z,ui.y,Wn.z,0,-Wn.x,Xn.z,0,-Xn.x,ui.z,0,-ui.x,-Wn.y,Wn.x,0,-Xn.y,Xn.x,0,-ui.y,ui.x,0];return!ao(t,Ri,Pi,Li,Kr)||(t=[1,0,0,0,1,0,0,0,1],!ao(t,Ri,Pi,Li,Kr))?!1:(Jr.crossVectors(Wn,Xn),t=[Jr.x,Jr.y,Jr.z],ao(t,Ri,Pi,Li,Kr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,on).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(on).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(wn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const wn=[new k,new k,new k,new k,new k,new k,new k,new k],on=new k,jr=new ci,Ri=new k,Pi=new k,Li=new k,Wn=new k,Xn=new k,ui=new k,gr=new k,Kr=new k,Jr=new k,hi=new k;function ao(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){hi.fromArray(i,s);const l=r.x*Math.abs(hi.x)+r.y*Math.abs(hi.y)+r.z*Math.abs(hi.z),u=e.dot(hi),h=t.dot(hi),p=n.dot(hi);if(Math.max(-Math.max(u,h,p),Math.min(u,h,p))>l)return!1}return!0}const qf=new ci,vr=new k,lo=new k;class Fr{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):qf.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vr.subVectors(e,this.center);const t=vr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(vr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(lo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vr.copy(e.center).add(lo)),this.expandByPoint(vr.copy(e.center).sub(lo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const An=new k,co=new k,Qr=new k,qn=new k,uo=new k,$r=new k,ho=new k;class mu{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,An)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=An.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(An.copy(this.origin).addScaledVector(this.direction,t),An.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){co.copy(e).add(t).multiplyScalar(.5),Qr.copy(t).sub(e).normalize(),qn.copy(this.origin).sub(co);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Qr),l=qn.dot(this.direction),u=-qn.dot(Qr),h=qn.lengthSq(),p=Math.abs(1-a*a);let o,c,f,v;if(p>0)if(o=a*u-l,c=a*l-u,v=s*p,o>=0)if(c>=-v)if(c<=v){const x=1/p;o*=x,c*=x,f=o*(o+a*c+2*l)+c*(a*o+c+2*u)+h}else c=s,o=Math.max(0,-(a*c+l)),f=-o*o+c*(c+2*u)+h;else c=-s,o=Math.max(0,-(a*c+l)),f=-o*o+c*(c+2*u)+h;else c<=-v?(o=Math.max(0,-(-a*s+l)),c=o>0?-s:Math.min(Math.max(-s,-u),s),f=-o*o+c*(c+2*u)+h):c<=v?(o=0,c=Math.min(Math.max(-s,-u),s),f=c*(c+2*u)+h):(o=Math.max(0,-(a*s+l)),c=o>0?s:Math.min(Math.max(-s,-u),s),f=-o*o+c*(c+2*u)+h);else c=a>0?-s:s,o=Math.max(0,-(a*c+l)),f=-o*o+c*(c+2*u)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,o),r&&r.copy(co).addScaledVector(Qr,c),f}intersectSphere(e,t){An.subVectors(e.center,this.origin);const n=An.dot(this.direction),r=An.dot(An)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),l=n-a,u=n+a;return u<0?null:l<0?this.at(u,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,l,u;const h=1/this.direction.x,p=1/this.direction.y,o=1/this.direction.z,c=this.origin;return h>=0?(n=(e.min.x-c.x)*h,r=(e.max.x-c.x)*h):(n=(e.max.x-c.x)*h,r=(e.min.x-c.x)*h),p>=0?(s=(e.min.y-c.y)*p,a=(e.max.y-c.y)*p):(s=(e.max.y-c.y)*p,a=(e.min.y-c.y)*p),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),o>=0?(l=(e.min.z-c.z)*o,u=(e.max.z-c.z)*o):(l=(e.max.z-c.z)*o,u=(e.min.z-c.z)*o),n>u||l>r)||((l>n||n!==n)&&(n=l),(u<r||r!==r)&&(r=u),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,An)!==null}intersectTriangle(e,t,n,r,s){uo.subVectors(t,e),$r.subVectors(n,e),ho.crossVectors(uo,$r);let a=this.direction.dot(ho),l;if(a>0){if(r)return null;l=1}else if(a<0)l=-1,a=-a;else return null;qn.subVectors(this.origin,e);const u=l*this.direction.dot($r.crossVectors(qn,$r));if(u<0)return null;const h=l*this.direction.dot(uo.cross(qn));if(h<0||u+h>a)return null;const p=-l*qn.dot(ho);return p<0?null:this.at(p/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,n,r,s,a,l,u,h,p,o,c,f,v,x,g){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,l,u,h,p,o,c,f,v,x,g)}set(e,t,n,r,s,a,l,u,h,p,o,c,f,v,x,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=l,m[13]=u,m[2]=h,m[6]=p,m[10]=o,m[14]=c,m[3]=f,m[7]=v,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Di.setFromMatrixColumn(e,0).length(),s=1/Di.setFromMatrixColumn(e,1).length(),a=1/Di.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),l=Math.sin(n),u=Math.cos(r),h=Math.sin(r),p=Math.cos(s),o=Math.sin(s);if(e.order==="XYZ"){const c=a*p,f=a*o,v=l*p,x=l*o;t[0]=u*p,t[4]=-u*o,t[8]=h,t[1]=f+v*h,t[5]=c-x*h,t[9]=-l*u,t[2]=x-c*h,t[6]=v+f*h,t[10]=a*u}else if(e.order==="YXZ"){const c=u*p,f=u*o,v=h*p,x=h*o;t[0]=c+x*l,t[4]=v*l-f,t[8]=a*h,t[1]=a*o,t[5]=a*p,t[9]=-l,t[2]=f*l-v,t[6]=x+c*l,t[10]=a*u}else if(e.order==="ZXY"){const c=u*p,f=u*o,v=h*p,x=h*o;t[0]=c-x*l,t[4]=-a*o,t[8]=v+f*l,t[1]=f+v*l,t[5]=a*p,t[9]=x-c*l,t[2]=-a*h,t[6]=l,t[10]=a*u}else if(e.order==="ZYX"){const c=a*p,f=a*o,v=l*p,x=l*o;t[0]=u*p,t[4]=v*h-f,t[8]=c*h+x,t[1]=u*o,t[5]=x*h+c,t[9]=f*h-v,t[2]=-h,t[6]=l*u,t[10]=a*u}else if(e.order==="YZX"){const c=a*u,f=a*h,v=l*u,x=l*h;t[0]=u*p,t[4]=x-c*o,t[8]=v*o+f,t[1]=o,t[5]=a*p,t[9]=-l*p,t[2]=-h*p,t[6]=f*o+v,t[10]=c-x*o}else if(e.order==="XZY"){const c=a*u,f=a*h,v=l*u,x=l*h;t[0]=u*p,t[4]=-o,t[8]=h*p,t[1]=c*o+x,t[5]=a*p,t[9]=f*o-v,t[2]=v*o-f,t[6]=l*p,t[10]=x*o+c}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yf,e,Zf)}lookAt(e,t,n){const r=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Yn.crossVectors(n,Xt),Yn.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Yn.crossVectors(n,Xt)),Yn.normalize(),es.crossVectors(Xt,Yn),r[0]=Yn.x,r[4]=es.x,r[8]=Xt.x,r[1]=Yn.y,r[5]=es.y,r[9]=Xt.y,r[2]=Yn.z,r[6]=es.z,r[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],l=n[4],u=n[8],h=n[12],p=n[1],o=n[5],c=n[9],f=n[13],v=n[2],x=n[6],g=n[10],m=n[14],w=n[3],E=n[7],C=n[11],B=n[15],L=r[0],P=r[4],D=r[8],H=r[12],y=r[1],S=r[5],z=r[9],G=r[13],V=r[2],Q=r[6],W=r[10],te=r[14],J=r[3],le=r[7],he=r[11],Se=r[15];return s[0]=a*L+l*y+u*V+h*J,s[4]=a*P+l*S+u*Q+h*le,s[8]=a*D+l*z+u*W+h*he,s[12]=a*H+l*G+u*te+h*Se,s[1]=p*L+o*y+c*V+f*J,s[5]=p*P+o*S+c*Q+f*le,s[9]=p*D+o*z+c*W+f*he,s[13]=p*H+o*G+c*te+f*Se,s[2]=v*L+x*y+g*V+m*J,s[6]=v*P+x*S+g*Q+m*le,s[10]=v*D+x*z+g*W+m*he,s[14]=v*H+x*G+g*te+m*Se,s[3]=w*L+E*y+C*V+B*J,s[7]=w*P+E*S+C*Q+B*le,s[11]=w*D+E*z+C*W+B*he,s[15]=w*H+E*G+C*te+B*Se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],l=e[5],u=e[9],h=e[13],p=e[2],o=e[6],c=e[10],f=e[14],v=e[3],x=e[7],g=e[11],m=e[15];return v*(+s*u*o-r*h*o-s*l*c+n*h*c+r*l*f-n*u*f)+x*(+t*u*f-t*h*c+s*a*c-r*a*f+r*h*p-s*u*p)+g*(+t*h*o-t*l*f-s*a*o+n*a*f+s*l*p-n*h*p)+m*(-r*l*p-t*u*o+t*l*c+r*a*o-n*a*c+n*u*p)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],l=e[5],u=e[6],h=e[7],p=e[8],o=e[9],c=e[10],f=e[11],v=e[12],x=e[13],g=e[14],m=e[15],w=o*g*h-x*c*h+x*u*f-l*g*f-o*u*m+l*c*m,E=v*c*h-p*g*h-v*u*f+a*g*f+p*u*m-a*c*m,C=p*x*h-v*o*h+v*l*f-a*x*f-p*l*m+a*o*m,B=v*o*u-p*x*u-v*l*c+a*x*c+p*l*g-a*o*g,L=t*w+n*E+r*C+s*B;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/L;return e[0]=w*P,e[1]=(x*c*s-o*g*s-x*r*f+n*g*f+o*r*m-n*c*m)*P,e[2]=(l*g*s-x*u*s+x*r*h-n*g*h-l*r*m+n*u*m)*P,e[3]=(o*u*s-l*c*s-o*r*h+n*c*h+l*r*f-n*u*f)*P,e[4]=E*P,e[5]=(p*g*s-v*c*s+v*r*f-t*g*f-p*r*m+t*c*m)*P,e[6]=(v*u*s-a*g*s-v*r*h+t*g*h+a*r*m-t*u*m)*P,e[7]=(a*c*s-p*u*s+p*r*h-t*c*h-a*r*f+t*u*f)*P,e[8]=C*P,e[9]=(v*o*s-p*x*s-v*n*f+t*x*f+p*n*m-t*o*m)*P,e[10]=(a*x*s-v*l*s+v*n*h-t*x*h-a*n*m+t*l*m)*P,e[11]=(p*l*s-a*o*s-p*n*h+t*o*h+a*n*f-t*l*f)*P,e[12]=B*P,e[13]=(p*x*r-v*o*r+v*n*c-t*x*c-p*n*g+t*o*g)*P,e[14]=(v*l*r-a*x*r-v*n*u+t*x*u+a*n*g-t*l*g)*P,e[15]=(a*o*r-p*l*r+p*n*u-t*o*u-a*n*c+t*l*c)*P,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,l=e.y,u=e.z,h=s*a,p=s*l;return this.set(h*a+n,h*l-r*u,h*u+r*l,0,h*l+r*u,p*l+n,p*u-r*a,0,h*u-r*l,p*u+r*a,s*u*u+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,l=t._z,u=t._w,h=s+s,p=a+a,o=l+l,c=s*h,f=s*p,v=s*o,x=a*p,g=a*o,m=l*o,w=u*h,E=u*p,C=u*o,B=n.x,L=n.y,P=n.z;return r[0]=(1-(x+m))*B,r[1]=(f+C)*B,r[2]=(v-E)*B,r[3]=0,r[4]=(f-C)*L,r[5]=(1-(c+m))*L,r[6]=(g+w)*L,r[7]=0,r[8]=(v+E)*P,r[9]=(g-w)*P,r[10]=(1-(c+x))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Di.set(r[0],r[1],r[2]).length();const a=Di.set(r[4],r[5],r[6]).length(),l=Di.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],an.copy(this);const h=1/s,p=1/a,o=1/l;return an.elements[0]*=h,an.elements[1]*=h,an.elements[2]*=h,an.elements[4]*=p,an.elements[5]*=p,an.elements[6]*=p,an.elements[8]*=o,an.elements[9]*=o,an.elements[10]*=o,t.setFromRotationMatrix(an),n.x=s,n.y=a,n.z=l,this}makePerspective(e,t,n,r,s,a,l=Fn){const u=this.elements,h=2*s/(t-e),p=2*s/(n-r),o=(t+e)/(t-e),c=(n+r)/(n-r);let f,v;if(l===Fn)f=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(l===ks)f=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return u[0]=h,u[4]=0,u[8]=o,u[12]=0,u[1]=0,u[5]=p,u[9]=c,u[13]=0,u[2]=0,u[6]=0,u[10]=f,u[14]=v,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,n,r,s,a,l=Fn){const u=this.elements,h=1/(t-e),p=1/(n-r),o=1/(a-s),c=(t+e)*h,f=(n+r)*p;let v,x;if(l===Fn)v=(a+s)*o,x=-2*o;else if(l===ks)v=s*o,x=-1*o;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return u[0]=2*h,u[4]=0,u[8]=0,u[12]=-c,u[1]=0,u[5]=2*p,u[9]=0,u[13]=-f,u[2]=0,u[6]=0,u[10]=x,u[14]=-v,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Di=new k,an=new at,Yf=new k(0,0,0),Zf=new k(1,1,1),Yn=new k,es=new k,Xt=new k,Il=new at,Ul=new Or;class tn{constructor(e=0,t=0,n=0,r=tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],l=r[8],u=r[1],h=r[5],p=r[9],o=r[2],c=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(At(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-p,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(c,h),this._z=0);break;case"YXZ":this._x=Math.asin(-At(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(l,f),this._z=Math.atan2(u,h)):(this._y=Math.atan2(-o,s),this._z=0);break;case"ZXY":this._x=Math.asin(At(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-o,f),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(u,s));break;case"ZYX":this._y=Math.asin(-At(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(c,f),this._z=Math.atan2(u,s)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(At(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-p,h),this._y=Math.atan2(-o,s)):(this._x=0,this._y=Math.atan2(l,f));break;case"XZY":this._z=Math.asin(-At(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(c,h),this._y=Math.atan2(l,s)):(this._x=Math.atan2(-p,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Il.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Il,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ul.setFromEuler(this),this.setFromQuaternion(Ul,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tn.DEFAULT_ORDER="XYZ";class ol{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jf=0;const Nl=new k,Ii=new Or,Cn=new at,ts=new k,_r=new k,Kf=new k,Jf=new Or,Ol=new k(1,0,0),Fl=new k(0,1,0),Bl=new k(0,0,1),zl={type:"added"},Qf={type:"removed"},Ui={type:"childadded",child:null},fo={type:"childremoved",child:null};class Mt extends ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=rr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new k,t=new tn,n=new Or,r=new k(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new at},normalMatrix:{value:new je}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ol,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.multiply(Ii),this}rotateOnWorldAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.premultiply(Ii),this}rotateX(e){return this.rotateOnAxis(Ol,e)}rotateY(e){return this.rotateOnAxis(Fl,e)}rotateZ(e){return this.rotateOnAxis(Bl,e)}translateOnAxis(e,t){return Nl.copy(e).applyQuaternion(this.quaternion),this.position.add(Nl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ol,e)}translateY(e){return this.translateOnAxis(Fl,e)}translateZ(e){return this.translateOnAxis(Bl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Cn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ts.copy(e):ts.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),_r.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Cn.lookAt(_r,ts,this.up):Cn.lookAt(ts,_r,this.up),this.quaternion.setFromRotationMatrix(Cn),r&&(Cn.extractRotation(r.matrixWorld),Ii.setFromRotationMatrix(Cn),this.quaternion.premultiply(Ii.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zl),Ui.child=e,this.dispatchEvent(Ui),Ui.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qf),fo.child=e,this.dispatchEvent(fo),fo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Cn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Cn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Cn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zl),Ui.child=e,this.dispatchEvent(Ui),Ui.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,e,Kf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,Jf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(l,u){return l[u.uuid]===void 0&&(l[u.uuid]=u.toJSON(e)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const u=l.shapes;if(Array.isArray(u))for(let h=0,p=u.length;h<p;h++){const o=u[h];s(e.shapes,o)}else s(e.shapes,u)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let u=0,h=this.material.length;u<h;u++)l.push(s(e.materials,this.material[u]));r.material=l}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const u=this.animations[l];r.animations.push(s(e.animations,u))}}if(t){const l=a(e.geometries),u=a(e.materials),h=a(e.textures),p=a(e.images),o=a(e.shapes),c=a(e.skeletons),f=a(e.animations),v=a(e.nodes);l.length>0&&(n.geometries=l),u.length>0&&(n.materials=u),h.length>0&&(n.textures=h),p.length>0&&(n.images=p),o.length>0&&(n.shapes=o),c.length>0&&(n.skeletons=c),f.length>0&&(n.animations=f),v.length>0&&(n.nodes=v)}return n.object=r,n;function a(l){const u=[];for(const h in l){const p=l[h];delete p.metadata,u.push(p)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Mt.DEFAULT_UP=new k(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ln=new k,Rn=new k,po=new k,Pn=new k,Ni=new k,Oi=new k,kl=new k,mo=new k,go=new k,vo=new k,_o=new _t,xo=new _t,yo=new _t;class pn{constructor(e=new k,t=new k,n=new k){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),ln.subVectors(e,t),r.cross(ln);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){ln.subVectors(r,t),Rn.subVectors(n,t),po.subVectors(e,t);const a=ln.dot(ln),l=ln.dot(Rn),u=ln.dot(po),h=Rn.dot(Rn),p=Rn.dot(po),o=a*h-l*l;if(o===0)return s.set(0,0,0),null;const c=1/o,f=(h*u-l*p)*c,v=(a*p-l*u)*c;return s.set(1-f-v,v,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(e,t,n,r,s,a,l,u){return this.getBarycoord(e,t,n,r,Pn)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(s,Pn.x),u.addScaledVector(a,Pn.y),u.addScaledVector(l,Pn.z),u)}static getInterpolatedAttribute(e,t,n,r,s,a){return _o.setScalar(0),xo.setScalar(0),yo.setScalar(0),_o.fromBufferAttribute(e,t),xo.fromBufferAttribute(e,n),yo.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(_o,s.x),a.addScaledVector(xo,s.y),a.addScaledVector(yo,s.z),a}static isFrontFacing(e,t,n,r){return ln.subVectors(n,t),Rn.subVectors(e,t),ln.cross(Rn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ln.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),ln.cross(Rn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return pn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,l;Ni.subVectors(r,n),Oi.subVectors(s,n),mo.subVectors(e,n);const u=Ni.dot(mo),h=Oi.dot(mo);if(u<=0&&h<=0)return t.copy(n);go.subVectors(e,r);const p=Ni.dot(go),o=Oi.dot(go);if(p>=0&&o<=p)return t.copy(r);const c=u*o-p*h;if(c<=0&&u>=0&&p<=0)return a=u/(u-p),t.copy(n).addScaledVector(Ni,a);vo.subVectors(e,s);const f=Ni.dot(vo),v=Oi.dot(vo);if(v>=0&&f<=v)return t.copy(s);const x=f*h-u*v;if(x<=0&&h>=0&&v<=0)return l=h/(h-v),t.copy(n).addScaledVector(Oi,l);const g=p*v-f*o;if(g<=0&&o-p>=0&&f-v>=0)return kl.subVectors(s,r),l=(o-p)/(o-p+(f-v)),t.copy(r).addScaledVector(kl,l);const m=1/(g+x+c);return a=x*m,l=c*m,t.copy(n).addScaledVector(Ni,a).addScaledVector(Oi,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const gu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},ns={h:0,s:0,l:0};function Mo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ge{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=fn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=ot.workingColorSpace){if(e=sl(e,1),t=At(t,0,1),n=At(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Mo(a,s,e+1/3),this.g=Mo(a,s,e),this.b=Mo(a,s,e-1/3)}return ot.toWorkingColorSpace(this,r),this}setStyle(e,t=fn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],l=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=fn){const n=gu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zi(e.r),this.g=Zi(e.g),this.b=Zi(e.b),this}copyLinearToSRGB(e){return this.r=ro(e.r),this.g=ro(e.g),this.b=ro(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=fn){return ot.fromWorkingColorSpace(zt.copy(this),e),Math.round(At(zt.r*255,0,255))*65536+Math.round(At(zt.g*255,0,255))*256+Math.round(At(zt.b*255,0,255))}getHexString(e=fn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.fromWorkingColorSpace(zt.copy(this),t);const n=zt.r,r=zt.g,s=zt.b,a=Math.max(n,r,s),l=Math.min(n,r,s);let u,h;const p=(l+a)/2;if(l===a)u=0,h=0;else{const o=a-l;switch(h=p<=.5?o/(a+l):o/(2-a-l),a){case n:u=(r-s)/o+(r<s?6:0);break;case r:u=(s-n)/o+2;break;case s:u=(n-r)/o+4;break}u/=6}return e.h=u,e.s=h,e.l=p,e}getRGB(e,t=ot.workingColorSpace){return ot.fromWorkingColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=fn){ot.fromWorkingColorSpace(zt.copy(this),e);const t=zt.r,n=zt.g,r=zt.b;return e!==fn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Zn),this.setHSL(Zn.h+e,Zn.s+t,Zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zn),e.getHSL(ns);const n=wr(Zn.h,ns.h,t),r=wr(Zn.s,ns.s,t),s=wr(Zn.l,ns.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new Ge;Ge.NAMES=gu;let $f=0;class sr extends ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=rr(),this.name="",this.type="Material",this.blending=zn,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pr,this.blendDst=Lr,this.blendEquation=dn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ai,this.stencilZFail=Ai,this.stencilZPass=Ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==zn&&(n.blending=this.blending),this.side!==si&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Pr&&(n.blendSrc=this.blendSrc),this.blendDst!==Lr&&(n.blendDst=this.blendDst),this.blendEquation!==dn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ji&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ai&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ai&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ai&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const l in s){const u=s[l];delete u.metadata,a.push(u)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ei extends sr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=jc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Nn=ed();function ed(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let u=0;u<256;++u){const h=u-127;h<-27?(n[u]=0,n[u|256]=32768,r[u]=24,r[u|256]=24):h<-14?(n[u]=1024>>-h-14,n[u|256]=1024>>-h-14|32768,r[u]=-h-1,r[u|256]=-h-1):h<=15?(n[u]=h+15<<10,n[u|256]=h+15<<10|32768,r[u]=13,r[u|256]=13):h<128?(n[u]=31744,n[u|256]=64512,r[u]=24,r[u|256]=24):(n[u]=31744,n[u|256]=64512,r[u]=13,r[u|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),l=new Uint32Array(64);for(let u=1;u<1024;++u){let h=u<<13,p=0;for(;!(h&8388608);)h<<=1,p-=8388608;h&=-8388609,p+=947912704,s[u]=h|p}for(let u=1024;u<2048;++u)s[u]=939524096+(u-1024<<13);for(let u=1;u<31;++u)a[u]=u<<23;a[31]=1199570944,a[32]=2147483648;for(let u=33;u<63;++u)a[u]=2147483648+(u-32<<23);a[63]=3347054592;for(let u=1;u<64;++u)u!==32&&(l[u]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:l}}function td(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=At(i,-65504,65504),Nn.floatView[0]=i;const e=Nn.uint32View[0],t=e>>23&511;return Nn.baseTable[t]+((e&8388607)>>Nn.shiftTable[t])}function nd(i){const e=i>>10;return Nn.uint32View[0]=Nn.mantissaTable[Nn.offsetTable[e]+(i&1023)]+Nn.exponentTable[e],Nn.floatView[0]}const Vi={toHalfFloat:td,fromHalfFloat:nd},Et=new k,is=new ve;class Zt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=wl,this.updateRanges=[],this.gpuType=Ut,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)is.fromBufferAttribute(this,t),is.applyMatrix3(e),this.setXY(t,is.x,is.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Gi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=kt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Gi(t,this.array)),t}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Gi(t,this.array)),t}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Gi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Gi(t,this.array)),t}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array),s=kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==wl&&(e.usage=this.usage),e}}class vu extends Zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class _u extends Zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Dt extends Zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let id=0;const jt=new at,So=new Mt,Fi=new k,qt=new ci,xr=new ci,Lt=new k;class nn extends ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=rr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(fu(e)?_u:vu)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new je().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,n){return jt.makeTranslation(e,t,n),this.applyMatrix4(jt),this}scale(e,t,n){return jt.makeScale(e,t,n),this.applyMatrix4(jt),this}lookAt(e){return So.lookAt(e),So.updateMatrix(),this.applyMatrix4(So.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fi).negate(),this.translate(Fi.x,Fi.y,Fi.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Dt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ci);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];qt.setFromBufferAttribute(s),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const l=t[s];xr.setFromBufferAttribute(l),this.morphTargetsRelative?(Lt.addVectors(qt.min,xr.min),qt.expandByPoint(Lt),Lt.addVectors(qt.max,xr.max),qt.expandByPoint(Lt)):(qt.expandByPoint(xr.min),qt.expandByPoint(xr.max))}qt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Lt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Lt));if(t)for(let s=0,a=t.length;s<a;s++){const l=t[s],u=this.morphTargetsRelative;for(let h=0,p=l.count;h<p;h++)Lt.fromBufferAttribute(l,h),u&&(Fi.fromBufferAttribute(e,h),Lt.add(Fi)),r=Math.max(r,n.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),l=[],u=[];for(let D=0;D<n.count;D++)l[D]=new k,u[D]=new k;const h=new k,p=new k,o=new k,c=new ve,f=new ve,v=new ve,x=new k,g=new k;function m(D,H,y){h.fromBufferAttribute(n,D),p.fromBufferAttribute(n,H),o.fromBufferAttribute(n,y),c.fromBufferAttribute(s,D),f.fromBufferAttribute(s,H),v.fromBufferAttribute(s,y),p.sub(h),o.sub(h),f.sub(c),v.sub(c);const S=1/(f.x*v.y-v.x*f.y);isFinite(S)&&(x.copy(p).multiplyScalar(v.y).addScaledVector(o,-f.y).multiplyScalar(S),g.copy(o).multiplyScalar(f.x).addScaledVector(p,-v.x).multiplyScalar(S),l[D].add(x),l[H].add(x),l[y].add(x),u[D].add(g),u[H].add(g),u[y].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let D=0,H=w.length;D<H;++D){const y=w[D],S=y.start,z=y.count;for(let G=S,V=S+z;G<V;G+=3)m(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const E=new k,C=new k,B=new k,L=new k;function P(D){B.fromBufferAttribute(r,D),L.copy(B);const H=l[D];E.copy(H),E.sub(B.multiplyScalar(B.dot(H))).normalize(),C.crossVectors(L,H);const S=C.dot(u[D])<0?-1:1;a.setXYZW(D,E.x,E.y,E.z,S)}for(let D=0,H=w.length;D<H;++D){const y=w[D],S=y.start,z=y.count;for(let G=S,V=S+z;G<V;G+=3)P(e.getX(G+0)),P(e.getX(G+1)),P(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let c=0,f=n.count;c<f;c++)n.setXYZ(c,0,0,0);const r=new k,s=new k,a=new k,l=new k,u=new k,h=new k,p=new k,o=new k;if(e)for(let c=0,f=e.count;c<f;c+=3){const v=e.getX(c+0),x=e.getX(c+1),g=e.getX(c+2);r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),p.subVectors(a,s),o.subVectors(r,s),p.cross(o),l.fromBufferAttribute(n,v),u.fromBufferAttribute(n,x),h.fromBufferAttribute(n,g),l.add(p),u.add(p),h.add(p),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(x,u.x,u.y,u.z),n.setXYZ(g,h.x,h.y,h.z)}else for(let c=0,f=t.count;c<f;c+=3)r.fromBufferAttribute(t,c+0),s.fromBufferAttribute(t,c+1),a.fromBufferAttribute(t,c+2),p.subVectors(a,s),o.subVectors(r,s),p.cross(o),n.setXYZ(c+0,p.x,p.y,p.z),n.setXYZ(c+1,p.x,p.y,p.z),n.setXYZ(c+2,p.x,p.y,p.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(l,u){const h=l.array,p=l.itemSize,o=l.normalized,c=new h.constructor(u.length*p);let f=0,v=0;for(let x=0,g=u.length;x<g;x++){l.isInterleavedBufferAttribute?f=u[x]*l.data.stride+l.offset:f=u[x]*p;for(let m=0;m<p;m++)c[v++]=h[f++]}return new Zt(c,p,o)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new nn,n=this.index.array,r=this.attributes;for(const l in r){const u=r[l],h=e(u,n);t.setAttribute(l,h)}const s=this.morphAttributes;for(const l in s){const u=[],h=s[l];for(let p=0,o=h.length;p<o;p++){const c=h[p],f=e(c,n);u.push(f)}t.morphAttributes[l]=u}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const u=this.parameters;for(const h in u)u[h]!==void 0&&(e[h]=u[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const u in n){const h=n[u];e.data.attributes[u]=h.toJSON(e.data)}const r={};let s=!1;for(const u in this.morphAttributes){const h=this.morphAttributes[u],p=[];for(let o=0,c=h.length;o<c;o++){const f=h[o];p.push(f.toJSON(e.data))}p.length>0&&(r[u]=p,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const h in r){const p=r[h];this.setAttribute(h,p.clone(t))}const s=e.morphAttributes;for(const h in s){const p=[],o=s[h];for(let c=0,f=o.length;c<f;c++)p.push(o[c].clone(t));this.morphAttributes[h]=p}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let h=0,p=a.length;h<p;h++){const o=a[h];this.addGroup(o.start,o.count,o.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hl=new at,fi=new mu,rs=new Fr,Gl=new k,ss=new k,os=new k,as=new k,bo=new k,ls=new k,Vl=new k,cs=new k;class Tt extends Mt{constructor(e=new nn,t=new Ei){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const l=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const l=this.morphTargetInfluences;if(s&&l){ls.set(0,0,0);for(let u=0,h=s.length;u<h;u++){const p=l[u],o=s[u];p!==0&&(bo.fromBufferAttribute(o,e),a?ls.addScaledVector(bo,p):ls.addScaledVector(bo.sub(t),p))}t.add(ls)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),rs.copy(n.boundingSphere),rs.applyMatrix4(s),fi.copy(e.ray).recast(e.near),!(rs.containsPoint(fi.origin)===!1&&(fi.intersectSphere(rs,Gl)===null||fi.origin.distanceToSquared(Gl)>(e.far-e.near)**2))&&(Hl.copy(s).invert(),fi.copy(e.ray).applyMatrix4(Hl),!(n.boundingBox!==null&&fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,fi)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,l=s.index,u=s.attributes.position,h=s.attributes.uv,p=s.attributes.uv1,o=s.attributes.normal,c=s.groups,f=s.drawRange;if(l!==null)if(Array.isArray(a))for(let v=0,x=c.length;v<x;v++){const g=c[v],m=a[g.materialIndex],w=Math.max(g.start,f.start),E=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let C=w,B=E;C<B;C+=3){const L=l.getX(C),P=l.getX(C+1),D=l.getX(C+2);r=us(this,m,e,n,h,p,o,L,P,D),r&&(r.faceIndex=Math.floor(C/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const v=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=v,m=x;g<m;g+=3){const w=l.getX(g),E=l.getX(g+1),C=l.getX(g+2);r=us(this,a,e,n,h,p,o,w,E,C),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(u!==void 0)if(Array.isArray(a))for(let v=0,x=c.length;v<x;v++){const g=c[v],m=a[g.materialIndex],w=Math.max(g.start,f.start),E=Math.min(u.count,Math.min(g.start+g.count,f.start+f.count));for(let C=w,B=E;C<B;C+=3){const L=C,P=C+1,D=C+2;r=us(this,m,e,n,h,p,o,L,P,D),r&&(r.faceIndex=Math.floor(C/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const v=Math.max(0,f.start),x=Math.min(u.count,f.start+f.count);for(let g=v,m=x;g<m;g+=3){const w=g,E=g+1,C=g+2;r=us(this,a,e,n,h,p,o,w,E,C),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function rd(i,e,t,n,r,s,a,l){let u;if(e.side===Wt?u=n.intersectTriangle(a,s,r,!0,l):u=n.intersectTriangle(r,s,a,e.side===si,l),u===null)return null;cs.copy(l),cs.applyMatrix4(i.matrixWorld);const h=t.ray.origin.distanceTo(cs);return h<t.near||h>t.far?null:{distance:h,point:cs.clone(),object:i}}function us(i,e,t,n,r,s,a,l,u,h){i.getVertexPosition(l,ss),i.getVertexPosition(u,os),i.getVertexPosition(h,as);const p=rd(i,e,t,n,ss,os,as,Vl);if(p){const o=new k;pn.getBarycoord(Vl,ss,os,as,o),r&&(p.uv=pn.getInterpolatedAttribute(r,l,u,h,o,new ve)),s&&(p.uv1=pn.getInterpolatedAttribute(s,l,u,h,o,new ve)),a&&(p.normal=pn.getInterpolatedAttribute(a,l,u,h,o,new k),p.normal.dot(n.direction)>0&&p.normal.multiplyScalar(-1));const c={a:l,b:u,c:h,normal:new k,materialIndex:0};pn.getNormal(ss,os,as,c.normal),p.face=c,p.barycoord=o}return p}class or extends nn{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const l=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const u=[],h=[],p=[],o=[];let c=0,f=0;v("z","y","x",-1,-1,n,t,e,a,s,0),v("z","y","x",1,-1,n,t,-e,a,s,1),v("x","z","y",1,1,e,n,t,r,a,2),v("x","z","y",1,-1,e,n,-t,r,a,3),v("x","y","z",1,-1,e,t,n,r,s,4),v("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(u),this.setAttribute("position",new Dt(h,3)),this.setAttribute("normal",new Dt(p,3)),this.setAttribute("uv",new Dt(o,2));function v(x,g,m,w,E,C,B,L,P,D,H){const y=C/P,S=B/D,z=C/2,G=B/2,V=L/2,Q=P+1,W=D+1;let te=0,J=0;const le=new k;for(let he=0;he<W;he++){const Se=he*S-G;for(let Ce=0;Ce<Q;Ce++){const Ne=Ce*y-z;le[x]=Ne*w,le[g]=Se*E,le[m]=V,h.push(le.x,le.y,le.z),le[x]=0,le[g]=0,le[m]=L>0?1:-1,p.push(le.x,le.y,le.z),o.push(Ce/P),o.push(1-he/D),te+=1}}for(let he=0;he<D;he++)for(let Se=0;Se<P;Se++){const Ce=c+Se+Q*he,Ne=c+Se+Q*(he+1),$=c+(Se+1)+Q*(he+1),oe=c+(Se+1)+Q*he;u.push(Ce,Ne,oe),u.push(Ne,$,oe),J+=6}l.addGroup(f,J,H),f+=J,c+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new or(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function $i(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Ht(i){const e={};for(let t=0;t<i.length;t++){const n=$i(i[t]);for(const r in n)e[r]=n[r]}return e}function sd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function xu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}const It={clone:$i,merge:Ht};var od=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ad=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ut extends sr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=od,this.fragmentShader=ad,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=sd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class yu extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=Fn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const jn=new k,Wl=new ve,Xl=new ve;class Qt extends yu{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ir*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Tr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ir*2*Math.atan(Math.tan(Tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(jn.x,jn.y).multiplyScalar(-e/jn.z),jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(jn.x,jn.y).multiplyScalar(-e/jn.z)}getViewSize(e,t){return this.getViewBounds(e,Wl,Xl),t.subVectors(Xl,Wl)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Tr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const u=a.fullWidth,h=a.fullHeight;s+=a.offsetX*r/u,t-=a.offsetY*n/h,r*=a.width/u,n*=a.height/h}const l=this.filmOffset;l!==0&&(s+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Bi=-90,zi=1;class ld extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Qt(Bi,zi,e,t);r.layers=this.layers,this.add(r);const s=new Qt(Bi,zi,e,t);s.layers=this.layers,this.add(s);const a=new Qt(Bi,zi,e,t);a.layers=this.layers,this.add(a);const l=new Qt(Bi,zi,e,t);l.layers=this.layers,this.add(l);const u=new Qt(Bi,zi,e,t);u.layers=this.layers,this.add(u);const h=new Qt(Bi,zi,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,l,u]=t;for(const h of t)this.remove(h);if(e===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(e===ks)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,l,u,h,p]=this.children,o=e.getRenderTarget(),c=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,l),e.setRenderTarget(n,3,r),e.render(t,u),e.setRenderTarget(n,4,r),e.render(t,h),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),e.render(t,p),e.setRenderTarget(o,c,f),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class Mu extends Nt{constructor(e,t,n,r,s,a,l,u,h,p){e=e!==void 0?e:[],t=t!==void 0?t:Ki,super(e,t,n,r,s,a,l,u,h,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cd extends yt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Mu(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ct}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new or(5,5,5),s=new ut({name:"CubemapFromEquirect",uniforms:$i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:ft});s.uniforms.tEquirect.value=t;const a=new Tt(r,s),l=t.minFilter;return t.minFilter===ei&&(t.minFilter=Ct),new ld(1,10,this).update(e,a),t.minFilter=l,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}const Eo=new k,ud=new k,hd=new je;class gi{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Eo.subVectors(n,t).cross(ud.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Eo),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||hd.getNormalMatrix(e),r=this.coplanarPoint(Eo).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const di=new Fr,hs=new k;class al{constructor(e=new gi,t=new gi,n=new gi,r=new gi,s=new gi,a=new gi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(r),l[4].copy(s),l[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fn){const n=this.planes,r=e.elements,s=r[0],a=r[1],l=r[2],u=r[3],h=r[4],p=r[5],o=r[6],c=r[7],f=r[8],v=r[9],x=r[10],g=r[11],m=r[12],w=r[13],E=r[14],C=r[15];if(n[0].setComponents(u-s,c-h,g-f,C-m).normalize(),n[1].setComponents(u+s,c+h,g+f,C+m).normalize(),n[2].setComponents(u+a,c+p,g+v,C+w).normalize(),n[3].setComponents(u-a,c-p,g-v,C-w).normalize(),n[4].setComponents(u-l,c-o,g-x,C-E).normalize(),t===Fn)n[5].setComponents(u+l,c+o,g+x,C+E).normalize();else if(t===ks)n[5].setComponents(l,o,x,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(di)}intersectsSprite(e){return di.center.set(0,0,0),di.radius=.7071067811865476,di.applyMatrix4(e.matrixWorld),this.intersectsSphere(di)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(hs.x=r.normal.x>0?e.max.x:e.min.x,hs.y=r.normal.y>0?e.max.y:e.min.y,hs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(hs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Su(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function fd(i){const e=new WeakMap;function t(l,u){const h=l.array,p=l.usage,o=h.byteLength,c=i.createBuffer();i.bindBuffer(u,c),i.bufferData(u,h,p),l.onUploadCallback();let f;if(h instanceof Float32Array)f=i.FLOAT;else if(h instanceof Uint16Array)l.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)f=i.SHORT;else if(h instanceof Uint32Array)f=i.UNSIGNED_INT;else if(h instanceof Int32Array)f=i.INT;else if(h instanceof Int8Array)f=i.BYTE;else if(h instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:c,type:f,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:o}}function n(l,u,h){const p=u.array,o=u.updateRanges;if(i.bindBuffer(h,l),o.length===0)i.bufferSubData(h,0,p);else{o.sort((f,v)=>f.start-v.start);let c=0;for(let f=1;f<o.length;f++){const v=o[c],x=o[f];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++c,o[c]=x)}o.length=c+1;for(let f=0,v=o.length;f<v;f++){const x=o[f];i.bufferSubData(h,x.start*p.BYTES_PER_ELEMENT,p,x.start,x.count)}u.clearUpdateRanges()}u.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function s(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=e.get(l);u&&(i.deleteBuffer(u.buffer),e.delete(l))}function a(l,u){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const p=e.get(l);(!p||p.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const h=e.get(l);if(h===void 0)e.set(l,t(l,u));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,l,u),h.version=l.version}}return{get:r,remove:s,update:a}}class ar extends nn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,l=Math.floor(n),u=Math.floor(r),h=l+1,p=u+1,o=e/l,c=t/u,f=[],v=[],x=[],g=[];for(let m=0;m<p;m++){const w=m*c-a;for(let E=0;E<h;E++){const C=E*o-s;v.push(C,-w,0),x.push(0,0,1),g.push(E/l),g.push(1-m/u)}}for(let m=0;m<u;m++)for(let w=0;w<l;w++){const E=w+h*m,C=w+h*(m+1),B=w+1+h*(m+1),L=w+1+h*m;f.push(E,C,L),f.push(C,B,L)}this.setIndex(f),this.setAttribute("position",new Dt(v,3)),this.setAttribute("normal",new Dt(x,3)),this.setAttribute("uv",new Dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ar(e.width,e.height,e.widthSegments,e.heightSegments)}}var dd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,md=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_d=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,yd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Md=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Sd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ed=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Td=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ad=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Cd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Rd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ld=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Dd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Id=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ud=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Od=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Bd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,zd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,qd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Yd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Zd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Kd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$d=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ep=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,tp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,np=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ip=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,sp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,op=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ap=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,up=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,hp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,fp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,dp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,pp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_p=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Sp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ep=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ap=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Rp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Lp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ip=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Up=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Np=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Op=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Gp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,jp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Kp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Jp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Qp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$p=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,em=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,nm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,im=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,om=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,am=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,hm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const fm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_m=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,xm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ym=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Mm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Em=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Am=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Lm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Im=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Um=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Om=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Fm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,km=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:dd,alphahash_pars_fragment:pd,alphamap_fragment:md,alphamap_pars_fragment:gd,alphatest_fragment:vd,alphatest_pars_fragment:_d,aomap_fragment:xd,aomap_pars_fragment:yd,batching_pars_vertex:Md,batching_vertex:Sd,begin_vertex:bd,beginnormal_vertex:Ed,bsdfs:Td,iridescence_fragment:wd,bumpmap_pars_fragment:Ad,clipping_planes_fragment:Cd,clipping_planes_pars_fragment:Rd,clipping_planes_pars_vertex:Pd,clipping_planes_vertex:Ld,color_fragment:Dd,color_pars_fragment:Id,color_pars_vertex:Ud,color_vertex:Nd,common:Od,cube_uv_reflection_fragment:Fd,defaultnormal_vertex:Bd,displacementmap_pars_vertex:zd,displacementmap_vertex:kd,emissivemap_fragment:Hd,emissivemap_pars_fragment:Gd,colorspace_fragment:Vd,colorspace_pars_fragment:Wd,envmap_fragment:Xd,envmap_common_pars_fragment:qd,envmap_pars_fragment:Yd,envmap_pars_vertex:Zd,envmap_physical_pars_fragment:sp,envmap_vertex:jd,fog_vertex:Kd,fog_pars_vertex:Jd,fog_fragment:Qd,fog_pars_fragment:$d,gradientmap_pars_fragment:ep,lightmap_pars_fragment:tp,lights_lambert_fragment:np,lights_lambert_pars_fragment:ip,lights_pars_begin:rp,lights_toon_fragment:op,lights_toon_pars_fragment:ap,lights_phong_fragment:lp,lights_phong_pars_fragment:cp,lights_physical_fragment:up,lights_physical_pars_fragment:hp,lights_fragment_begin:fp,lights_fragment_maps:dp,lights_fragment_end:pp,logdepthbuf_fragment:mp,logdepthbuf_pars_fragment:gp,logdepthbuf_pars_vertex:vp,logdepthbuf_vertex:_p,map_fragment:xp,map_pars_fragment:yp,map_particle_fragment:Mp,map_particle_pars_fragment:Sp,metalnessmap_fragment:bp,metalnessmap_pars_fragment:Ep,morphinstance_vertex:Tp,morphcolor_vertex:wp,morphnormal_vertex:Ap,morphtarget_pars_vertex:Cp,morphtarget_vertex:Rp,normal_fragment_begin:Pp,normal_fragment_maps:Lp,normal_pars_fragment:Dp,normal_pars_vertex:Ip,normal_vertex:Up,normalmap_pars_fragment:Np,clearcoat_normal_fragment_begin:Op,clearcoat_normal_fragment_maps:Fp,clearcoat_pars_fragment:Bp,iridescence_pars_fragment:zp,opaque_fragment:kp,packing:Hp,premultiplied_alpha_fragment:Gp,project_vertex:Vp,dithering_fragment:Wp,dithering_pars_fragment:Xp,roughnessmap_fragment:qp,roughnessmap_pars_fragment:Yp,shadowmap_pars_fragment:Zp,shadowmap_pars_vertex:jp,shadowmap_vertex:Kp,shadowmask_pars_fragment:Jp,skinbase_vertex:Qp,skinning_pars_vertex:$p,skinning_vertex:em,skinnormal_vertex:tm,specularmap_fragment:nm,specularmap_pars_fragment:im,tonemapping_fragment:rm,tonemapping_pars_fragment:sm,transmission_fragment:om,transmission_pars_fragment:am,uv_pars_fragment:lm,uv_pars_vertex:cm,uv_vertex:um,worldpos_vertex:hm,background_vert:fm,background_frag:dm,backgroundCube_vert:pm,backgroundCube_frag:mm,cube_vert:gm,cube_frag:vm,depth_vert:_m,depth_frag:xm,distanceRGBA_vert:ym,distanceRGBA_frag:Mm,equirect_vert:Sm,equirect_frag:bm,linedashed_vert:Em,linedashed_frag:Tm,meshbasic_vert:wm,meshbasic_frag:Am,meshlambert_vert:Cm,meshlambert_frag:Rm,meshmatcap_vert:Pm,meshmatcap_frag:Lm,meshnormal_vert:Dm,meshnormal_frag:Im,meshphong_vert:Um,meshphong_frag:Nm,meshphysical_vert:Om,meshphysical_frag:Fm,meshtoon_vert:Bm,meshtoon_frag:zm,points_vert:km,points_frag:Hm,shadow_vert:Gm,shadow_frag:Vm,sprite_vert:Wm,sprite_frag:Xm},Me={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},_n={basic:{uniforms:Ht([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Ht([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Ht([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Ht([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Ht([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Ht([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Ht([Me.points,Me.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Ht([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Ht([Me.common,Me.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Ht([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Ht([Me.sprite,Me.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Ht([Me.common,Me.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Ht([Me.lights,Me.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};_n.physical={uniforms:Ht([_n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const fs={r:0,b:0,g:0},pi=new tn,qm=new at;function Ym(i,e,t,n,r,s,a){const l=new Ge(0);let u=s===!0?0:1,h,p,o=null,c=0,f=null;function v(w){let E=w.isScene===!0?w.background:null;return E&&E.isTexture&&(E=(w.backgroundBlurriness>0?t:e).get(E)),E}function x(w){let E=!1;const C=v(w);C===null?m(l,u):C&&C.isColor&&(m(C,1),E=!0);const B=i.xr.getEnvironmentBlendMode();B==="additive"?n.buffers.color.setClear(0,0,0,1,a):B==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(w,E){const C=v(E);C&&(C.isCubeTexture||C.mapping===qs)?(p===void 0&&(p=new Tt(new or(1,1,1),new ut({name:"BackgroundCubeMaterial",uniforms:$i(_n.backgroundCube.uniforms),vertexShader:_n.backgroundCube.vertexShader,fragmentShader:_n.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(B,L,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(p)),pi.copy(E.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),p.material.uniforms.envMap.value=C,p.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,p.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(qm.makeRotationFromEuler(pi)),p.material.toneMapped=ot.getTransfer(C.colorSpace)!==ht,(o!==C||c!==C.version||f!==i.toneMapping)&&(p.material.needsUpdate=!0,o=C,c=C.version,f=i.toneMapping),p.layers.enableAll(),w.unshift(p,p.geometry,p.material,0,0,null)):C&&C.isTexture&&(h===void 0&&(h=new Tt(new ar(2,2),new ut({name:"BackgroundMaterial",uniforms:$i(_n.background.uniforms),vertexShader:_n.background.vertexShader,fragmentShader:_n.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(h)),h.material.uniforms.t2D.value=C,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.toneMapped=ot.getTransfer(C.colorSpace)!==ht,C.matrixAutoUpdate===!0&&C.updateMatrix(),h.material.uniforms.uvTransform.value.copy(C.matrix),(o!==C||c!==C.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,o=C,c=C.version,f=i.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null))}function m(w,E){w.getRGB(fs,xu(i)),n.buffers.color.setClear(fs.r,fs.g,fs.b,E,a)}return{getClearColor:function(){return l},setClearColor:function(w,E=1){l.set(w),u=E,m(l,u)},getClearAlpha:function(){return u},setClearAlpha:function(w){u=w,m(l,u)},render:x,addToRenderList:g}}function Zm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=c(null);let s=r,a=!1;function l(y,S,z,G,V){let Q=!1;const W=o(G,z,S);s!==W&&(s=W,h(s.object)),Q=f(y,G,z,V),Q&&v(y,G,z,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(Q||a)&&(a=!1,C(y,S,z,G),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function u(){return i.createVertexArray()}function h(y){return i.bindVertexArray(y)}function p(y){return i.deleteVertexArray(y)}function o(y,S,z){const G=z.wireframe===!0;let V=n[y.id];V===void 0&&(V={},n[y.id]=V);let Q=V[S.id];Q===void 0&&(Q={},V[S.id]=Q);let W=Q[G];return W===void 0&&(W=c(u()),Q[G]=W),W}function c(y){const S=[],z=[],G=[];for(let V=0;V<t;V++)S[V]=0,z[V]=0,G[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:z,attributeDivisors:G,object:y,attributes:{},index:null}}function f(y,S,z,G){const V=s.attributes,Q=S.attributes;let W=0;const te=z.getAttributes();for(const J in te)if(te[J].location>=0){const he=V[J];let Se=Q[J];if(Se===void 0&&(J==="instanceMatrix"&&y.instanceMatrix&&(Se=y.instanceMatrix),J==="instanceColor"&&y.instanceColor&&(Se=y.instanceColor)),he===void 0||he.attribute!==Se||Se&&he.data!==Se.data)return!0;W++}return s.attributesNum!==W||s.index!==G}function v(y,S,z,G){const V={},Q=S.attributes;let W=0;const te=z.getAttributes();for(const J in te)if(te[J].location>=0){let he=Q[J];he===void 0&&(J==="instanceMatrix"&&y.instanceMatrix&&(he=y.instanceMatrix),J==="instanceColor"&&y.instanceColor&&(he=y.instanceColor));const Se={};Se.attribute=he,he&&he.data&&(Se.data=he.data),V[J]=Se,W++}s.attributes=V,s.attributesNum=W,s.index=G}function x(){const y=s.newAttributes;for(let S=0,z=y.length;S<z;S++)y[S]=0}function g(y){m(y,0)}function m(y,S){const z=s.newAttributes,G=s.enabledAttributes,V=s.attributeDivisors;z[y]=1,G[y]===0&&(i.enableVertexAttribArray(y),G[y]=1),V[y]!==S&&(i.vertexAttribDivisor(y,S),V[y]=S)}function w(){const y=s.newAttributes,S=s.enabledAttributes;for(let z=0,G=S.length;z<G;z++)S[z]!==y[z]&&(i.disableVertexAttribArray(z),S[z]=0)}function E(y,S,z,G,V,Q,W){W===!0?i.vertexAttribIPointer(y,S,z,V,Q):i.vertexAttribPointer(y,S,z,G,V,Q)}function C(y,S,z,G){x();const V=G.attributes,Q=z.getAttributes(),W=S.defaultAttributeValues;for(const te in Q){const J=Q[te];if(J.location>=0){let le=V[te];if(le===void 0&&(te==="instanceMatrix"&&y.instanceMatrix&&(le=y.instanceMatrix),te==="instanceColor"&&y.instanceColor&&(le=y.instanceColor)),le!==void 0){const he=le.normalized,Se=le.itemSize,Ce=e.get(le);if(Ce===void 0)continue;const Ne=Ce.buffer,$=Ce.type,oe=Ce.bytesPerElement,ue=$===i.INT||$===i.UNSIGNED_INT||le.gpuType===Ja;if(le.isInterleavedBufferAttribute){const ge=le.data,Pe=ge.stride,De=le.offset;if(ge.isInstancedInterleavedBuffer){for(let ke=0;ke<J.locationSize;ke++)m(J.location+ke,ge.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let ke=0;ke<J.locationSize;ke++)g(J.location+ke);i.bindBuffer(i.ARRAY_BUFFER,Ne);for(let ke=0;ke<J.locationSize;ke++)E(J.location+ke,Se/J.locationSize,$,he,Pe*oe,(De+Se/J.locationSize*ke)*oe,ue)}else{if(le.isInstancedBufferAttribute){for(let ge=0;ge<J.locationSize;ge++)m(J.location+ge,le.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ge=0;ge<J.locationSize;ge++)g(J.location+ge);i.bindBuffer(i.ARRAY_BUFFER,Ne);for(let ge=0;ge<J.locationSize;ge++)E(J.location+ge,Se/J.locationSize,$,he,Se*oe,Se/J.locationSize*ge*oe,ue)}}else if(W!==void 0){const he=W[te];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(J.location,he);break;case 3:i.vertexAttrib3fv(J.location,he);break;case 4:i.vertexAttrib4fv(J.location,he);break;default:i.vertexAttrib1fv(J.location,he)}}}}w()}function B(){D();for(const y in n){const S=n[y];for(const z in S){const G=S[z];for(const V in G)p(G[V].object),delete G[V];delete S[z]}delete n[y]}}function L(y){if(n[y.id]===void 0)return;const S=n[y.id];for(const z in S){const G=S[z];for(const V in G)p(G[V].object),delete G[V];delete S[z]}delete n[y.id]}function P(y){for(const S in n){const z=n[S];if(z[y.id]===void 0)continue;const G=z[y.id];for(const V in G)p(G[V].object),delete G[V];delete z[y.id]}}function D(){H(),a=!0,s!==r&&(s=r,h(s.object))}function H(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:l,reset:D,resetDefaultState:H,dispose:B,releaseStatesOfGeometry:L,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:g,disableUnusedAttributes:w}}function jm(i,e,t){let n;function r(h){n=h}function s(h,p){i.drawArrays(n,h,p),t.update(p,n,1)}function a(h,p,o){o!==0&&(i.drawArraysInstanced(n,h,p,o),t.update(p,n,o))}function l(h,p,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,p,0,o);let f=0;for(let v=0;v<o;v++)f+=p[v];t.update(f,n,1)}function u(h,p,o,c){if(o===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<h.length;v++)a(h[v],p[v],c[v]);else{f.multiDrawArraysInstancedWEBGL(n,h,0,p,0,c,0,o);let v=0;for(let x=0;x<o;x++)v+=p[x];for(let x=0;x<c.length;x++)t.update(v,n,c[x])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=l,this.renderMultiDrawInstances=u}function Km(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==Yt&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(P){const D=P===dt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==kn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Ut&&!D)}function u(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=t.precision!==void 0?t.precision:"highp";const p=u(h);p!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",p,"instead."),h=p);const o=t.logarithmicDepthBuffer===!0,c=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(c===!0){const P=e.get("EXT_clip_control");P.clipControlEXT(P.LOWER_LEFT_EXT,P.ZERO_TO_ONE_EXT)}const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),C=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),B=v>0,L=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:u,textureFormatReadable:a,textureTypeReadable:l,precision:h,logarithmicDepthBuffer:o,reverseDepthBuffer:c,maxTextures:f,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:w,maxVaryings:E,maxFragmentUniforms:C,vertexTextures:B,maxSamples:L}}function Jm(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new gi,l=new je,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(o,c){const f=o.length!==0||c||n!==0||r;return r=c,n=o.length,f},this.beginShadows=function(){s=!0,p(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(o,c){t=p(o,c,0)},this.setState=function(o,c,f){const v=o.clippingPlanes,x=o.clipIntersection,g=o.clipShadows,m=i.get(o);if(!r||v===null||v.length===0||s&&!g)s?p(null):h();else{const w=s?0:n,E=w*4;let C=m.clippingState||null;u.value=C,C=p(v,c,E,f);for(let B=0;B!==E;++B)C[B]=t[B];m.clippingState=C,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=w}};function h(){u.value!==t&&(u.value=t,u.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function p(o,c,f,v){const x=o!==null?o.length:0;let g=null;if(x!==0){if(g=u.value,v!==!0||g===null){const m=f+x*4,w=c.matrixWorldInverse;l.getNormalMatrix(w),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,C=f;E!==x;++E,C+=4)a.copy(o[E]).applyMatrix4(w,l),a.normal.toArray(g,C),g[C+3]=a.constant}u.value=g,u.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function Qm(i){let e=new WeakMap;function t(a,l){return l===sa?a.mapping=Ki:l===oa&&(a.mapping=Ji),a}function n(a){if(a&&a.isTexture){const l=a.mapping;if(l===sa||l===oa)if(e.has(a)){const u=e.get(a).texture;return t(u,a.mapping)}else{const u=a.image;if(u&&u.height>0){const h=new cd(u.height);return h.fromEquirectangularTexture(i,a),e.set(a,h),a.addEventListener("dispose",r),t(h.texture,a.mapping)}else return null}}return a}function r(a){const l=a.target;l.removeEventListener("dispose",r);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class ll extends yu{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,l=r+t,u=r-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,a=s+h*this.view.width,l-=p*this.view.offsetY,u=l-p*this.view.height}this.projectionMatrix.makeOrthographic(s,a,l,u,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Wi=4,ql=[.125,.215,.35,.446,.526,.582],_i=20,To=new ll,Yl=new Ge;let wo=null,Ao=0,Co=0,Ro=!1;const vi=(1+Math.sqrt(5))/2,ki=1/vi,Zl=[new k(-vi,ki,0),new k(vi,ki,0),new k(-ki,0,vi),new k(ki,0,vi),new k(0,vi,-ki),new k(0,vi,ki),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)];class Na{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){wo=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),Co=this._renderer.getActiveMipmapLevel(),Ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(wo,Ao,Co),this._renderer.xr.enabled=Ro,e.scissorTest=!1,ds(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ki||e.mapping===Ji?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wo=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),Co=this._renderer.getActiveMipmapLevel(),Ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:dt,format:Yt,colorSpace:en,depthBuffer:!1},r=jl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jl(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=$m(s)),this._blurMaterial=eg(s,e,t)}return r}_compileMaterial(e){const t=new Tt(this._lodPlanes[0],e);this._renderer.compile(t,To)}_sceneToCubeUV(e,t,n,r){const l=new Qt(90,1,t,n),u=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,o=p.autoClear,c=p.toneMapping;p.getClearColor(Yl),p.toneMapping=ni,p.autoClear=!1;const f=new Ei({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1}),v=new Tt(new or,f);let x=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,x=!0):(f.color.copy(Yl),x=!0);for(let m=0;m<6;m++){const w=m%3;w===0?(l.up.set(0,u[m],0),l.lookAt(h[m],0,0)):w===1?(l.up.set(0,0,u[m]),l.lookAt(0,h[m],0)):(l.up.set(0,u[m],0),l.lookAt(0,0,h[m]));const E=this._cubeSize;ds(r,w*E,m>2?E:0,E,E),p.setRenderTarget(r),x&&p.render(v,l),p.render(e,l)}v.geometry.dispose(),v.material.dispose(),p.toneMapping=c,p.autoClear=o,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Ki||e.mapping===Ji;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Tt(this._lodPlanes[0],s),l=s.uniforms;l.envMap.value=e;const u=this._cubeSize;ds(t,0,0,3*u,2*u),n.setRenderTarget(t),n.render(a,To)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),l=Zl[(r-s-1)%Zl.length];this._blur(e,s-1,s,a,l)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,l){const u=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const p=3,o=new Tt(this._lodPlanes[r],h),c=h.uniforms,f=this._sizeLods[n]-1,v=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*_i-1),x=s/v,g=isFinite(s)?1+Math.floor(p*x):_i;g>_i&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${_i}`);const m=[];let w=0;for(let P=0;P<_i;++P){const D=P/x,H=Math.exp(-D*D/2);m.push(H),P===0?w+=H:P<g&&(w+=2*H)}for(let P=0;P<m.length;P++)m[P]=m[P]/w;c.envMap.value=e.texture,c.samples.value=g,c.weights.value=m,c.latitudinal.value=a==="latitudinal",l&&(c.poleAxis.value=l);const{_lodMax:E}=this;c.dTheta.value=v,c.mipInt.value=E-n;const C=this._sizeLods[r],B=3*C*(r>E-Wi?r-E+Wi:0),L=4*(this._cubeSize-C);ds(t,B,L,3*C,2*C),u.setRenderTarget(t),u.render(o,To)}}function $m(i){const e=[],t=[],n=[];let r=i;const s=i-Wi+1+ql.length;for(let a=0;a<s;a++){const l=Math.pow(2,r);t.push(l);let u=1/l;a>i-Wi?u=ql[a-i+Wi-1]:a===0&&(u=0),n.push(u);const h=1/(l-2),p=-h,o=1+h,c=[p,p,o,p,o,o,p,p,o,o,p,o],f=6,v=6,x=3,g=2,m=1,w=new Float32Array(x*v*f),E=new Float32Array(g*v*f),C=new Float32Array(m*v*f);for(let L=0;L<f;L++){const P=L%3*2/3-1,D=L>2?0:-1,H=[P,D,0,P+2/3,D,0,P+2/3,D+1,0,P,D,0,P+2/3,D+1,0,P,D+1,0];w.set(H,x*v*L),E.set(c,g*v*L);const y=[L,L,L,L,L,L];C.set(y,m*v*L)}const B=new nn;B.setAttribute("position",new Zt(w,x)),B.setAttribute("uv",new Zt(E,g)),B.setAttribute("faceIndex",new Zt(C,m)),e.push(B),r>Wi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function jl(i,e,t){const n=new yt(i,e,t);return n.texture.mapping=qs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ds(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function eg(i,e,t){const n=new Float32Array(_i),r=new k(0,1,0);return new ut({name:"SphericalGaussianBlur",defines:{n:_i,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ft,depthTest:!1,depthWrite:!1})}function Kl(){return new ut({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ft,depthTest:!1,depthWrite:!1})}function Jl(){return new ut({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ft,depthTest:!1,depthWrite:!1})}function cl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function tg(i){let e=new WeakMap,t=null;function n(l){if(l&&l.isTexture){const u=l.mapping,h=u===sa||u===oa,p=u===Ki||u===Ji;if(h||p){let o=e.get(l);const c=o!==void 0?o.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==c)return t===null&&(t=new Na(i)),o=h?t.fromEquirectangular(l,o):t.fromCubemap(l,o),o.texture.pmremVersion=l.pmremVersion,e.set(l,o),o.texture;if(o!==void 0)return o.texture;{const f=l.image;return h&&f&&f.height>0||p&&f&&r(f)?(t===null&&(t=new Na(i)),o=h?t.fromEquirectangular(l):t.fromCubemap(l),o.texture.pmremVersion=l.pmremVersion,e.set(l,o),l.addEventListener("dispose",s),o.texture):null}}}return l}function r(l){let u=0;const h=6;for(let p=0;p<h;p++)l[p]!==void 0&&u++;return u===h}function s(l){const u=l.target;u.removeEventListener("dispose",s);const h=e.get(u);h!==void 0&&(e.delete(u),h.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function ng(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Ns("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function ig(i,e,t,n){const r={},s=new WeakMap;function a(o){const c=o.target;c.index!==null&&e.remove(c.index);for(const v in c.attributes)e.remove(c.attributes[v]);for(const v in c.morphAttributes){const x=c.morphAttributes[v];for(let g=0,m=x.length;g<m;g++)e.remove(x[g])}c.removeEventListener("dispose",a),delete r[c.id];const f=s.get(c);f&&(e.remove(f),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function l(o,c){return r[c.id]===!0||(c.addEventListener("dispose",a),r[c.id]=!0,t.memory.geometries++),c}function u(o){const c=o.attributes;for(const v in c)e.update(c[v],i.ARRAY_BUFFER);const f=o.morphAttributes;for(const v in f){const x=f[v];for(let g=0,m=x.length;g<m;g++)e.update(x[g],i.ARRAY_BUFFER)}}function h(o){const c=[],f=o.index,v=o.attributes.position;let x=0;if(f!==null){const w=f.array;x=f.version;for(let E=0,C=w.length;E<C;E+=3){const B=w[E+0],L=w[E+1],P=w[E+2];c.push(B,L,L,P,P,B)}}else if(v!==void 0){const w=v.array;x=v.version;for(let E=0,C=w.length/3-1;E<C;E+=3){const B=E+0,L=E+1,P=E+2;c.push(B,L,L,P,P,B)}}else return;const g=new(fu(c)?_u:vu)(c,1);g.version=x;const m=s.get(o);m&&e.remove(m),s.set(o,g)}function p(o){const c=s.get(o);if(c){const f=o.index;f!==null&&c.version<f.version&&h(o)}else h(o);return s.get(o)}return{get:l,update:u,getWireframeAttribute:p}}function rg(i,e,t){let n;function r(c){n=c}let s,a;function l(c){s=c.type,a=c.bytesPerElement}function u(c,f){i.drawElements(n,f,s,c*a),t.update(f,n,1)}function h(c,f,v){v!==0&&(i.drawElementsInstanced(n,f,s,c*a,v),t.update(f,n,v))}function p(c,f,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,c,0,v);let g=0;for(let m=0;m<v;m++)g+=f[m];t.update(g,n,1)}function o(c,f,v,x){if(v===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<c.length;m++)h(c[m]/a,f[m],x[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,c,0,x,0,v);let m=0;for(let w=0;w<v;w++)m+=f[w];for(let w=0;w<x.length;w++)t.update(m,n,x[w])}}this.setMode=r,this.setIndex=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=p,this.renderMultiDrawInstances=o}function sg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,l){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=l*(s/3);break;case i.LINES:t.lines+=l*(s/2);break;case i.LINE_STRIP:t.lines+=l*(s-1);break;case i.LINE_LOOP:t.lines+=l*s;break;case i.POINTS:t.points+=l*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function og(i,e,t){const n=new WeakMap,r=new _t;function s(a,l,u){const h=a.morphTargetInfluences,p=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,o=p!==void 0?p.length:0;let c=n.get(l);if(c===void 0||c.count!==o){let y=function(){D.dispose(),n.delete(l),l.removeEventListener("dispose",y)};var f=y;c!==void 0&&c.texture.dispose();const v=l.morphAttributes.position!==void 0,x=l.morphAttributes.normal!==void 0,g=l.morphAttributes.color!==void 0,m=l.morphAttributes.position||[],w=l.morphAttributes.normal||[],E=l.morphAttributes.color||[];let C=0;v===!0&&(C=1),x===!0&&(C=2),g===!0&&(C=3);let B=l.attributes.position.count*C,L=1;B>e.maxTextureSize&&(L=Math.ceil(B/e.maxTextureSize),B=e.maxTextureSize);const P=new Float32Array(B*L*4*o),D=new pu(P,B,L,o);D.type=Ut,D.needsUpdate=!0;const H=C*4;for(let S=0;S<o;S++){const z=m[S],G=w[S],V=E[S],Q=B*L*4*S;for(let W=0;W<z.count;W++){const te=W*H;v===!0&&(r.fromBufferAttribute(z,W),P[Q+te+0]=r.x,P[Q+te+1]=r.y,P[Q+te+2]=r.z,P[Q+te+3]=0),x===!0&&(r.fromBufferAttribute(G,W),P[Q+te+4]=r.x,P[Q+te+5]=r.y,P[Q+te+6]=r.z,P[Q+te+7]=0),g===!0&&(r.fromBufferAttribute(V,W),P[Q+te+8]=r.x,P[Q+te+9]=r.y,P[Q+te+10]=r.z,P[Q+te+11]=V.itemSize===4?r.w:1)}}c={count:o,texture:D,size:new ve(B,L)},n.set(l,c),l.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)u.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let v=0;for(let g=0;g<h.length;g++)v+=h[g];const x=l.morphTargetsRelative?1:1-v;u.getUniforms().setValue(i,"morphTargetBaseInfluence",x),u.getUniforms().setValue(i,"morphTargetInfluences",h)}u.getUniforms().setValue(i,"morphTargetsTexture",c.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",c.size)}return{update:s}}function ag(i,e,t,n){let r=new WeakMap;function s(u){const h=n.render.frame,p=u.geometry,o=e.get(u,p);if(r.get(o)!==h&&(e.update(o),r.set(o,h)),u.isInstancedMesh&&(u.hasEventListener("dispose",l)===!1&&u.addEventListener("dispose",l),r.get(u)!==h&&(t.update(u.instanceMatrix,i.ARRAY_BUFFER),u.instanceColor!==null&&t.update(u.instanceColor,i.ARRAY_BUFFER),r.set(u,h))),u.isSkinnedMesh){const c=u.skeleton;r.get(c)!==h&&(c.update(),r.set(c,h))}return o}function a(){r=new WeakMap}function l(u){const h=u.target;h.removeEventListener("dispose",l),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:s,dispose:a}}class Zs extends Nt{constructor(e,t,n,r,s,a,l,u,h,p=Yi){if(p!==Yi&&p!==bi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&p===Yi&&(n=Mi),n===void 0&&p===bi&&(n=Si),super(null,r,s,a,l,u,p,n,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=l!==void 0?l:ct,this.minFilter=u!==void 0?u:ct,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const bu=new Nt,Ql=new Zs(1,1),Eu=new pu,Tu=new Xf,wu=new Mu,$l=[],ec=[],tc=new Float32Array(16),nc=new Float32Array(9),ic=new Float32Array(4);function lr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=$l[r];if(s===void 0&&(s=new Float32Array(r),$l[r]=s),e!==0){n.toArray(s,0);for(let a=1,l=0;a!==e;++a)l+=t,i[a].toArray(s,l)}return s}function Rt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Pt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function js(i,e){let t=ec[e];t===void 0&&(t=new Int32Array(e),ec[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function lg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function cg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2fv(this.addr,e),Pt(t,e)}}function ug(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;i.uniform3fv(this.addr,e),Pt(t,e)}}function hg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4fv(this.addr,e),Pt(t,e)}}function fg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;ic.set(n),i.uniformMatrix2fv(this.addr,!1,ic),Pt(t,n)}}function dg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;nc.set(n),i.uniformMatrix3fv(this.addr,!1,nc),Pt(t,n)}}function pg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;tc.set(n),i.uniformMatrix4fv(this.addr,!1,tc),Pt(t,n)}}function mg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function gg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2iv(this.addr,e),Pt(t,e)}}function vg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3iv(this.addr,e),Pt(t,e)}}function _g(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4iv(this.addr,e),Pt(t,e)}}function xg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function yg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2uiv(this.addr,e),Pt(t,e)}}function Mg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3uiv(this.addr,e),Pt(t,e)}}function Sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4uiv(this.addr,e),Pt(t,e)}}function bg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Ql.compareFunction=hu,s=Ql):s=bu,t.setTexture2D(e||s,r)}function Eg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Tu,r)}function Tg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||wu,r)}function wg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Eu,r)}function Ag(i){switch(i){case 5126:return lg;case 35664:return cg;case 35665:return ug;case 35666:return hg;case 35674:return fg;case 35675:return dg;case 35676:return pg;case 5124:case 35670:return mg;case 35667:case 35671:return gg;case 35668:case 35672:return vg;case 35669:case 35673:return _g;case 5125:return xg;case 36294:return yg;case 36295:return Mg;case 36296:return Sg;case 35678:case 36198:case 36298:case 36306:case 35682:return bg;case 35679:case 36299:case 36307:return Eg;case 35680:case 36300:case 36308:case 36293:return Tg;case 36289:case 36303:case 36311:case 36292:return wg}}function Cg(i,e){i.uniform1fv(this.addr,e)}function Rg(i,e){const t=lr(e,this.size,2);i.uniform2fv(this.addr,t)}function Pg(i,e){const t=lr(e,this.size,3);i.uniform3fv(this.addr,t)}function Lg(i,e){const t=lr(e,this.size,4);i.uniform4fv(this.addr,t)}function Dg(i,e){const t=lr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ig(i,e){const t=lr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Ug(i,e){const t=lr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ng(i,e){i.uniform1iv(this.addr,e)}function Og(i,e){i.uniform2iv(this.addr,e)}function Fg(i,e){i.uniform3iv(this.addr,e)}function Bg(i,e){i.uniform4iv(this.addr,e)}function zg(i,e){i.uniform1uiv(this.addr,e)}function kg(i,e){i.uniform2uiv(this.addr,e)}function Hg(i,e){i.uniform3uiv(this.addr,e)}function Gg(i,e){i.uniform4uiv(this.addr,e)}function Vg(i,e,t){const n=this.cache,r=e.length,s=js(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||bu,s[a])}function Wg(i,e,t){const n=this.cache,r=e.length,s=js(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Tu,s[a])}function Xg(i,e,t){const n=this.cache,r=e.length,s=js(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||wu,s[a])}function qg(i,e,t){const n=this.cache,r=e.length,s=js(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Eu,s[a])}function Yg(i){switch(i){case 5126:return Cg;case 35664:return Rg;case 35665:return Pg;case 35666:return Lg;case 35674:return Dg;case 35675:return Ig;case 35676:return Ug;case 5124:case 35670:return Ng;case 35667:case 35671:return Og;case 35668:case 35672:return Fg;case 35669:case 35673:return Bg;case 5125:return zg;case 36294:return kg;case 36295:return Hg;case 36296:return Gg;case 35678:case 36198:case 36298:case 36306:case 35682:return Vg;case 35679:case 36299:case 36307:return Wg;case 35680:case 36300:case 36308:case 36293:return Xg;case 36289:case 36303:case 36311:case 36292:return qg}}class Zg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ag(t.type)}}class jg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Yg(t.type)}}class Kg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const l=r[s];l.setValue(e,t[l.id],n)}}}const Po=/(\w+)(\])?(\[|\.)?/g;function rc(i,e){i.seq.push(e),i.map[e.id]=e}function Jg(i,e,t){const n=i.name,r=n.length;for(Po.lastIndex=0;;){const s=Po.exec(n),a=Po.lastIndex;let l=s[1];const u=s[2]==="]",h=s[3];if(u&&(l=l|0),h===void 0||h==="["&&a+2===r){rc(t,h===void 0?new Zg(l,i,e):new jg(l,i,e));break}else{let o=t.map[l];o===void 0&&(o=new Kg(l),rc(t,o)),t=o}}}class Os{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Jg(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const l=t[s],u=n[l.id];u.needsUpdate!==!1&&l.setValue(e,u.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function sc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Qg=37297;let $g=0;function ev(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const l=a+1;n.push(`${l===e?">":" "} ${l}: ${t[a]}`)}return n.join(`
`)}function tv(i){const e=ot.getPrimaries(ot.workingColorSpace),t=ot.getPrimaries(i);let n;switch(e===t?n="":e===zs&&t===Bs?n="LinearDisplayP3ToLinearSRGB":e===Bs&&t===zs&&(n="LinearSRGBToLinearDisplayP3"),i){case en:case Ys:return[n,"LinearTransferOETF"];case fn:case rl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function oc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+ev(i.getShaderSource(e),a)}else return r}function nv(i,e){const t=tv(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function iv(i,e){let t;switch(e){case Kc:t="Linear";break;case Jc:t="Reinhard";break;case Qc:t="Cineon";break;case Ka:t="ACESFilmic";break;case $c:t="AgX";break;case eu:t="Neutral";break;case lf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ps=new k;function rv(){ot.getLuminanceCoefficients(ps);const i=ps.x.toFixed(4),e=ps.y.toFixed(4),t=ps.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Er).join(`
`)}function ov(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function av(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let l=1;s.type===i.FLOAT_MAT2&&(l=2),s.type===i.FLOAT_MAT3&&(l=3),s.type===i.FLOAT_MAT4&&(l=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:l}}return t}function Er(i){return i!==""}function ac(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function lc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const lv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oa(i){return i.replace(lv,uv)}const cv=new Map;function uv(i,e){let t=Ze[e];if(t===void 0){const n=cv.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Oa(t)}const hv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cc(i){return i.replace(hv,fv)}function fv(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function uc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function dv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Wc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Xc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Dn&&(e="SHADOWMAP_TYPE_VSM"),e}function pv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ki:case Ji:e="ENVMAP_TYPE_CUBE";break;case qs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function mv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ji:e="ENVMAP_MODE_REFRACTION";break}return e}function gv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case jc:e="ENVMAP_BLENDING_MULTIPLY";break;case of:e="ENVMAP_BLENDING_MIX";break;case af:e="ENVMAP_BLENDING_ADD";break}return e}function vv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function _v(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,l=t.fragmentShader;const u=dv(t),h=pv(t),p=mv(t),o=gv(t),c=vv(t),f=sv(t),v=ov(s),x=r.createProgram();let g,m,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Er).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Er).join(`
`),m.length>0&&(m+=`
`)):(g=[uc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Er).join(`
`),m=[uc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",t.envMap?"#define "+o:"",c?"#define CUBEUV_TEXEL_WIDTH "+c.texelWidth:"",c?"#define CUBEUV_TEXEL_HEIGHT "+c.texelHeight:"",c?"#define CUBEUV_MAX_MIP "+c.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ni?"#define TONE_MAPPING":"",t.toneMapping!==ni?Ze.tonemapping_pars_fragment:"",t.toneMapping!==ni?iv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,nv("linearToOutputTexel",t.outputColorSpace),rv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Er).join(`
`)),a=Oa(a),a=ac(a,t),a=lc(a,t),l=Oa(l),l=ac(l,t),l=lc(l,t),a=cc(a),l=cc(l),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Al?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Al?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const E=w+g+a,C=w+m+l,B=sc(r,r.VERTEX_SHADER,E),L=sc(r,r.FRAGMENT_SHADER,C);r.attachShader(x,B),r.attachShader(x,L),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function P(S){if(i.debug.checkShaderErrors){const z=r.getProgramInfoLog(x).trim(),G=r.getShaderInfoLog(B).trim(),V=r.getShaderInfoLog(L).trim();let Q=!0,W=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,B,L);else{const te=oc(r,B,"vertex"),J=oc(r,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+z+`
`+te+`
`+J)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(G===""||V==="")&&(W=!1);W&&(S.diagnostics={runnable:Q,programLog:z,vertexShader:{log:G,prefix:g},fragmentShader:{log:V,prefix:m}})}r.deleteShader(B),r.deleteShader(L),D=new Os(r,x),H=av(r,x)}let D;this.getUniforms=function(){return D===void 0&&P(this),D};let H;this.getAttributes=function(){return H===void 0&&P(this),H};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(x,Qg)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$g++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=B,this.fragmentShader=L,this}let xv=0;class yv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Mv(e),t.set(e,n)),n}}class Mv{constructor(e){this.id=xv++,this.code=e,this.usedTimes=0}}function Sv(i,e,t,n,r,s,a){const l=new ol,u=new yv,h=new Set,p=[],o=r.logarithmicDepthBuffer,c=r.reverseDepthBuffer,f=r.vertexTextures;let v=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return h.add(y),y===0?"uv":`uv${y}`}function m(y,S,z,G,V){const Q=G.fog,W=V.geometry,te=y.isMeshStandardMaterial?G.environment:null,J=(y.isMeshStandardMaterial?t:e).get(y.envMap||te),le=J&&J.mapping===qs?J.image.height:null,he=x[y.type];y.precision!==null&&(v=r.getMaxPrecision(y.precision),v!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",v,"instead."));const Se=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Ce=Se!==void 0?Se.length:0;let Ne=0;W.morphAttributes.position!==void 0&&(Ne=1),W.morphAttributes.normal!==void 0&&(Ne=2),W.morphAttributes.color!==void 0&&(Ne=3);let $,oe,ue,ge;if(he){const Ft=_n[he];$=Ft.vertexShader,oe=Ft.fragmentShader}else $=y.vertexShader,oe=y.fragmentShader,u.update(y),ue=u.getVertexShaderID(y),ge=u.getFragmentShaderID(y);const Pe=i.getRenderTarget(),De=V.isInstancedMesh===!0,ke=V.isBatchedMesh===!0,$e=!!y.map,We=!!y.matcap,N=!!J,St=!!y.aoMap,qe=!!y.lightMap,Qe=!!y.bumpMap,Fe=!!y.normalMap,st=!!y.displacementMap,Be=!!y.emissiveMap,R=!!y.metalnessMap,b=!!y.roughnessMap,Y=y.anisotropy>0,ne=y.clearcoat>0,ae=y.dispersion>0,ee=y.iridescence>0,Re=y.sheen>0,_e=y.transmission>0,be=Y&&!!y.anisotropyMap,Ve=ne&&!!y.clearcoatMap,fe=ne&&!!y.clearcoatNormalMap,Ee=ne&&!!y.clearcoatRoughnessMap,ze=ee&&!!y.iridescenceMap,Ie=ee&&!!y.iridescenceThicknessMap,xe=Re&&!!y.sheenColorMap,Ke=Re&&!!y.sheenRoughnessMap,Oe=!!y.specularMap,He=!!y.specularColorMap,O=!!y.specularIntensityMap,ye=_e&&!!y.transmissionMap,F=_e&&!!y.thicknessMap,ie=!!y.gradientMap,Te=!!y.alphaMap,we=y.alphaTest>0,tt=!!y.alphaHash,gt=!!y.extensions;let Ot=ni;y.toneMapped&&(Pe===null||Pe.isXRRenderTarget===!0)&&(Ot=i.toneMapping);const rt={shaderID:he,shaderType:y.type,shaderName:y.name,vertexShader:$,fragmentShader:oe,defines:y.defines,customVertexShaderID:ue,customFragmentShaderID:ge,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:v,batching:ke,batchingColor:ke&&V._colorsTexture!==null,instancing:De,instancingColor:De&&V.instanceColor!==null,instancingMorph:De&&V.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Pe===null?i.outputColorSpace:Pe.isXRRenderTarget===!0?Pe.texture.colorSpace:en,alphaToCoverage:!!y.alphaToCoverage,map:$e,matcap:We,envMap:N,envMapMode:N&&J.mapping,envMapCubeUVHeight:le,aoMap:St,lightMap:qe,bumpMap:Qe,normalMap:Fe,displacementMap:f&&st,emissiveMap:Be,normalMapObjectSpace:Fe&&y.normalMapType===ff,normalMapTangentSpace:Fe&&y.normalMapType===il,metalnessMap:R,roughnessMap:b,anisotropy:Y,anisotropyMap:be,clearcoat:ne,clearcoatMap:Ve,clearcoatNormalMap:fe,clearcoatRoughnessMap:Ee,dispersion:ae,iridescence:ee,iridescenceMap:ze,iridescenceThicknessMap:Ie,sheen:Re,sheenColorMap:xe,sheenRoughnessMap:Ke,specularMap:Oe,specularColorMap:He,specularIntensityMap:O,transmission:_e,transmissionMap:ye,thicknessMap:F,gradientMap:ie,opaque:y.transparent===!1&&y.blending===zn&&y.alphaToCoverage===!1,alphaMap:Te,alphaTest:we,alphaHash:tt,combine:y.combine,mapUv:$e&&g(y.map.channel),aoMapUv:St&&g(y.aoMap.channel),lightMapUv:qe&&g(y.lightMap.channel),bumpMapUv:Qe&&g(y.bumpMap.channel),normalMapUv:Fe&&g(y.normalMap.channel),displacementMapUv:st&&g(y.displacementMap.channel),emissiveMapUv:Be&&g(y.emissiveMap.channel),metalnessMapUv:R&&g(y.metalnessMap.channel),roughnessMapUv:b&&g(y.roughnessMap.channel),anisotropyMapUv:be&&g(y.anisotropyMap.channel),clearcoatMapUv:Ve&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:fe&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ze&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:Ke&&g(y.sheenRoughnessMap.channel),specularMapUv:Oe&&g(y.specularMap.channel),specularColorMapUv:He&&g(y.specularColorMap.channel),specularIntensityMapUv:O&&g(y.specularIntensityMap.channel),transmissionMapUv:ye&&g(y.transmissionMap.channel),thicknessMapUv:F&&g(y.thicknessMap.channel),alphaMapUv:Te&&g(y.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Fe||Y),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!W.attributes.uv&&($e||Te),fog:!!Q,useFog:y.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:o,reverseDepthBuffer:c,skinning:V.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Ce,morphTextureStride:Ne,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ot,decodeVideoTexture:$e&&y.map.isVideoTexture===!0&&ot.getTransfer(y.map.colorSpace)===ht,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===xn,flipSided:y.side===Wt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:gt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&y.extensions.multiDraw===!0||ke)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return rt.vertexUv1s=h.has(1),rt.vertexUv2s=h.has(2),rt.vertexUv3s=h.has(3),h.clear(),rt}function w(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const z in y.defines)S.push(z),S.push(y.defines[z]);return y.isRawShaderMaterial===!1&&(E(S,y),C(S,y),S.push(i.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function E(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function C(y,S){l.disableAll(),S.supportsVertexTextures&&l.enable(0),S.instancing&&l.enable(1),S.instancingColor&&l.enable(2),S.instancingMorph&&l.enable(3),S.matcap&&l.enable(4),S.envMap&&l.enable(5),S.normalMapObjectSpace&&l.enable(6),S.normalMapTangentSpace&&l.enable(7),S.clearcoat&&l.enable(8),S.iridescence&&l.enable(9),S.alphaTest&&l.enable(10),S.vertexColors&&l.enable(11),S.vertexAlphas&&l.enable(12),S.vertexUv1s&&l.enable(13),S.vertexUv2s&&l.enable(14),S.vertexUv3s&&l.enable(15),S.vertexTangents&&l.enable(16),S.anisotropy&&l.enable(17),S.alphaHash&&l.enable(18),S.batching&&l.enable(19),S.dispersion&&l.enable(20),S.batchingColor&&l.enable(21),y.push(l.mask),l.disableAll(),S.fog&&l.enable(0),S.useFog&&l.enable(1),S.flatShading&&l.enable(2),S.logarithmicDepthBuffer&&l.enable(3),S.reverseDepthBuffer&&l.enable(4),S.skinning&&l.enable(5),S.morphTargets&&l.enable(6),S.morphNormals&&l.enable(7),S.morphColors&&l.enable(8),S.premultipliedAlpha&&l.enable(9),S.shadowMapEnabled&&l.enable(10),S.doubleSided&&l.enable(11),S.flipSided&&l.enable(12),S.useDepthPacking&&l.enable(13),S.dithering&&l.enable(14),S.transmission&&l.enable(15),S.sheen&&l.enable(16),S.opaque&&l.enable(17),S.pointsUvs&&l.enable(18),S.decodeVideoTexture&&l.enable(19),S.alphaToCoverage&&l.enable(20),y.push(l.mask)}function B(y){const S=x[y.type];let z;if(S){const G=_n[S];z=It.clone(G.uniforms)}else z=y.uniforms;return z}function L(y,S){let z;for(let G=0,V=p.length;G<V;G++){const Q=p[G];if(Q.cacheKey===S){z=Q,++z.usedTimes;break}}return z===void 0&&(z=new _v(i,S,y,s),p.push(z)),z}function P(y){if(--y.usedTimes===0){const S=p.indexOf(y);p[S]=p[p.length-1],p.pop(),y.destroy()}}function D(y){u.remove(y)}function H(){u.dispose()}return{getParameters:m,getProgramCacheKey:w,getUniforms:B,acquireProgram:L,releaseProgram:P,releaseShaderCache:D,programs:p,dispose:H}}function bv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let l=i.get(a);return l===void 0&&(l={},i.set(a,l)),l}function n(a){i.delete(a)}function r(a,l,u){i.get(a)[l]=u}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Ev(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function hc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function fc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(o,c,f,v,x,g){let m=i[e];return m===void 0?(m={id:o.id,object:o,geometry:c,material:f,groupOrder:v,renderOrder:o.renderOrder,z:x,group:g},i[e]=m):(m.id=o.id,m.object=o,m.geometry=c,m.material=f,m.groupOrder=v,m.renderOrder=o.renderOrder,m.z=x,m.group=g),e++,m}function l(o,c,f,v,x,g){const m=a(o,c,f,v,x,g);f.transmission>0?n.push(m):f.transparent===!0?r.push(m):t.push(m)}function u(o,c,f,v,x,g){const m=a(o,c,f,v,x,g);f.transmission>0?n.unshift(m):f.transparent===!0?r.unshift(m):t.unshift(m)}function h(o,c){t.length>1&&t.sort(o||Ev),n.length>1&&n.sort(c||hc),r.length>1&&r.sort(c||hc)}function p(){for(let o=e,c=i.length;o<c;o++){const f=i[o];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:u,finish:p,sort:h}}function Tv(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new fc,i.set(n,[a])):r>=s.length?(a=new fc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function wv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new Ge};break;case"SpotLight":t={position:new k,direction:new k,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":t={color:new Ge,position:new k,halfWidth:new k,halfHeight:new k};break}return i[e.id]=t,t}}}function Av(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Cv=0;function Rv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Pv(i){const e=new wv,t=Av(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new k);const r=new k,s=new at,a=new at;function l(h){let p=0,o=0,c=0;for(let H=0;H<9;H++)n.probe[H].set(0,0,0);let f=0,v=0,x=0,g=0,m=0,w=0,E=0,C=0,B=0,L=0,P=0;h.sort(Rv);for(let H=0,y=h.length;H<y;H++){const S=h[H],z=S.color,G=S.intensity,V=S.distance,Q=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)p+=z.r*G,o+=z.g*G,c+=z.b*G;else if(S.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(S.sh.coefficients[W],G);P++}else if(S.isDirectionalLight){const W=e.get(S);if(W.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const te=S.shadow,J=t.get(S);J.shadowIntensity=te.intensity,J.shadowBias=te.bias,J.shadowNormalBias=te.normalBias,J.shadowRadius=te.radius,J.shadowMapSize=te.mapSize,n.directionalShadow[f]=J,n.directionalShadowMap[f]=Q,n.directionalShadowMatrix[f]=S.shadow.matrix,w++}n.directional[f]=W,f++}else if(S.isSpotLight){const W=e.get(S);W.position.setFromMatrixPosition(S.matrixWorld),W.color.copy(z).multiplyScalar(G),W.distance=V,W.coneCos=Math.cos(S.angle),W.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),W.decay=S.decay,n.spot[x]=W;const te=S.shadow;if(S.map&&(n.spotLightMap[B]=S.map,B++,te.updateMatrices(S),S.castShadow&&L++),n.spotLightMatrix[x]=te.matrix,S.castShadow){const J=t.get(S);J.shadowIntensity=te.intensity,J.shadowBias=te.bias,J.shadowNormalBias=te.normalBias,J.shadowRadius=te.radius,J.shadowMapSize=te.mapSize,n.spotShadow[x]=J,n.spotShadowMap[x]=Q,C++}x++}else if(S.isRectAreaLight){const W=e.get(S);W.color.copy(z).multiplyScalar(G),W.halfWidth.set(S.width*.5,0,0),W.halfHeight.set(0,S.height*.5,0),n.rectArea[g]=W,g++}else if(S.isPointLight){const W=e.get(S);if(W.color.copy(S.color).multiplyScalar(S.intensity),W.distance=S.distance,W.decay=S.decay,S.castShadow){const te=S.shadow,J=t.get(S);J.shadowIntensity=te.intensity,J.shadowBias=te.bias,J.shadowNormalBias=te.normalBias,J.shadowRadius=te.radius,J.shadowMapSize=te.mapSize,J.shadowCameraNear=te.camera.near,J.shadowCameraFar=te.camera.far,n.pointShadow[v]=J,n.pointShadowMap[v]=Q,n.pointShadowMatrix[v]=S.shadow.matrix,E++}n.point[v]=W,v++}else if(S.isHemisphereLight){const W=e.get(S);W.skyColor.copy(S.color).multiplyScalar(G),W.groundColor.copy(S.groundColor).multiplyScalar(G),n.hemi[m]=W,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Me.LTC_FLOAT_1,n.rectAreaLTC2=Me.LTC_FLOAT_2):(n.rectAreaLTC1=Me.LTC_HALF_1,n.rectAreaLTC2=Me.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=o,n.ambient[2]=c;const D=n.hash;(D.directionalLength!==f||D.pointLength!==v||D.spotLength!==x||D.rectAreaLength!==g||D.hemiLength!==m||D.numDirectionalShadows!==w||D.numPointShadows!==E||D.numSpotShadows!==C||D.numSpotMaps!==B||D.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=v,n.hemi.length=m,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=C,n.spotShadowMap.length=C,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=C+B-L,n.spotLightMap.length=B,n.numSpotLightShadowsWithMaps=L,n.numLightProbes=P,D.directionalLength=f,D.pointLength=v,D.spotLength=x,D.rectAreaLength=g,D.hemiLength=m,D.numDirectionalShadows=w,D.numPointShadows=E,D.numSpotShadows=C,D.numSpotMaps=B,D.numLightProbes=P,n.version=Cv++)}function u(h,p){let o=0,c=0,f=0,v=0,x=0;const g=p.matrixWorldInverse;for(let m=0,w=h.length;m<w;m++){const E=h[m];if(E.isDirectionalLight){const C=n.directional[o];C.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(g),o++}else if(E.isSpotLight){const C=n.spot[f];C.position.setFromMatrixPosition(E.matrixWorld),C.position.applyMatrix4(g),C.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(g),f++}else if(E.isRectAreaLight){const C=n.rectArea[v];C.position.setFromMatrixPosition(E.matrixWorld),C.position.applyMatrix4(g),a.identity(),s.copy(E.matrixWorld),s.premultiply(g),a.extractRotation(s),C.halfWidth.set(E.width*.5,0,0),C.halfHeight.set(0,E.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),v++}else if(E.isPointLight){const C=n.point[c];C.position.setFromMatrixPosition(E.matrixWorld),C.position.applyMatrix4(g),c++}else if(E.isHemisphereLight){const C=n.hemi[x];C.direction.setFromMatrixPosition(E.matrixWorld),C.direction.transformDirection(g),x++}}}return{setup:l,setupView:u,state:n}}function dc(i){const e=new Pv(i),t=[],n=[];function r(p){h.camera=p,t.length=0,n.length=0}function s(p){t.push(p)}function a(p){n.push(p)}function l(){e.setup(t)}function u(p){e.setupView(t,p)}const h={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:h,setupLights:l,setupLightsView:u,pushLight:s,pushShadow:a}}function Lv(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let l;return a===void 0?(l=new dc(i),e.set(r,[l])):s>=a.length?(l=new dc(i),a.push(l)):l=a[s],l}function n(){e=new WeakMap}return{get:t,dispose:n}}class Dv extends sr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=uf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Iv extends sr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Uv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Nv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ov(i,e,t){let n=new al;const r=new ve,s=new ve,a=new _t,l=new Dv({depthPacking:hf}),u=new Iv,h={},p=t.maxTextureSize,o={[si]:Wt,[Wt]:si,[xn]:xn},c=new ut({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ve},radius:{value:4}},vertexShader:Uv,fragmentShader:Nv}),f=c.clone();f.defines.HORIZONTAL_PASS=1;const v=new nn;v.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Tt(v,c),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wc;let m=this.type;this.render=function(L,P,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||L.length===0)return;const H=i.getRenderTarget(),y=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),z=i.state;z.setBlending(ft),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const G=m!==Dn&&this.type===Dn,V=m===Dn&&this.type!==Dn;for(let Q=0,W=L.length;Q<W;Q++){const te=L[Q],J=te.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;r.copy(J.mapSize);const le=J.getFrameExtents();if(r.multiply(le),s.copy(J.mapSize),(r.x>p||r.y>p)&&(r.x>p&&(s.x=Math.floor(p/le.x),r.x=s.x*le.x,J.mapSize.x=s.x),r.y>p&&(s.y=Math.floor(p/le.y),r.y=s.y*le.y,J.mapSize.y=s.y)),J.map===null||G===!0||V===!0){const Se=this.type!==Dn?{minFilter:ct,magFilter:ct}:{};J.map!==null&&J.map.dispose(),J.map=new yt(r.x,r.y,Se),J.map.texture.name=te.name+".shadowMap",J.camera.updateProjectionMatrix()}i.setRenderTarget(J.map),i.clear();const he=J.getViewportCount();for(let Se=0;Se<he;Se++){const Ce=J.getViewport(Se);a.set(s.x*Ce.x,s.y*Ce.y,s.x*Ce.z,s.y*Ce.w),z.viewport(a),J.updateMatrices(te,Se),n=J.getFrustum(),C(P,D,J.camera,te,this.type)}J.isPointLightShadow!==!0&&this.type===Dn&&w(J,D),J.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(H,y,S)};function w(L,P){const D=e.update(x);c.defines.VSM_SAMPLES!==L.blurSamples&&(c.defines.VSM_SAMPLES=L.blurSamples,f.defines.VSM_SAMPLES=L.blurSamples,c.needsUpdate=!0,f.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new yt(r.x,r.y)),c.uniforms.shadow_pass.value=L.map.texture,c.uniforms.resolution.value=L.mapSize,c.uniforms.radius.value=L.radius,i.setRenderTarget(L.mapPass),i.clear(),i.renderBufferDirect(P,null,D,c,x,null),f.uniforms.shadow_pass.value=L.mapPass.texture,f.uniforms.resolution.value=L.mapSize,f.uniforms.radius.value=L.radius,i.setRenderTarget(L.map),i.clear(),i.renderBufferDirect(P,null,D,f,x,null)}function E(L,P,D,H){let y=null;const S=D.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(S!==void 0)y=S;else if(y=D.isPointLight===!0?u:l,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const z=y.uuid,G=P.uuid;let V=h[z];V===void 0&&(V={},h[z]=V);let Q=V[G];Q===void 0&&(Q=y.clone(),V[G]=Q,P.addEventListener("dispose",B)),y=Q}if(y.visible=P.visible,y.wireframe=P.wireframe,H===Dn?y.side=P.shadowSide!==null?P.shadowSide:P.side:y.side=P.shadowSide!==null?P.shadowSide:o[P.side],y.alphaMap=P.alphaMap,y.alphaTest=P.alphaTest,y.map=P.map,y.clipShadows=P.clipShadows,y.clippingPlanes=P.clippingPlanes,y.clipIntersection=P.clipIntersection,y.displacementMap=P.displacementMap,y.displacementScale=P.displacementScale,y.displacementBias=P.displacementBias,y.wireframeLinewidth=P.wireframeLinewidth,y.linewidth=P.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const z=i.properties.get(y);z.light=D}return y}function C(L,P,D,H,y){if(L.visible===!1)return;if(L.layers.test(P.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&y===Dn)&&(!L.frustumCulled||n.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,L.matrixWorld);const G=e.update(L),V=L.material;if(Array.isArray(V)){const Q=G.groups;for(let W=0,te=Q.length;W<te;W++){const J=Q[W],le=V[J.materialIndex];if(le&&le.visible){const he=E(L,le,H,y);L.onBeforeShadow(i,L,P,D,G,he,J),i.renderBufferDirect(D,null,G,he,L,J),L.onAfterShadow(i,L,P,D,G,he,J)}}}else if(V.visible){const Q=E(L,V,H,y);L.onBeforeShadow(i,L,P,D,G,Q,null),i.renderBufferDirect(D,null,G,Q,L,null),L.onAfterShadow(i,L,P,D,G,Q,null)}}const z=L.children;for(let G=0,V=z.length;G<V;G++)C(z[G],P,D,H,y)}function B(L){L.target.removeEventListener("dispose",B);for(const D in h){const H=h[D],y=L.target.uuid;y in H&&(H[y].dispose(),delete H[y])}}}const Fv={[Qo]:$o,[ea]:ia,[ta]:ra,[ji]:na,[$o]:Qo,[ia]:ea,[ra]:ta,[na]:ji};function Bv(i){function e(){let O=!1;const ye=new _t;let F=null;const ie=new _t(0,0,0,0);return{setMask:function(Te){F!==Te&&!O&&(i.colorMask(Te,Te,Te,Te),F=Te)},setLocked:function(Te){O=Te},setClear:function(Te,we,tt,gt,Ot){Ot===!0&&(Te*=gt,we*=gt,tt*=gt),ye.set(Te,we,tt,gt),ie.equals(ye)===!1&&(i.clearColor(Te,we,tt,gt),ie.copy(ye))},reset:function(){O=!1,F=null,ie.set(-1,0,0,0)}}}function t(){let O=!1,ye=!1,F=null,ie=null,Te=null;return{setReversed:function(we){ye=we},setTest:function(we){we?ue(i.DEPTH_TEST):ge(i.DEPTH_TEST)},setMask:function(we){F!==we&&!O&&(i.depthMask(we),F=we)},setFunc:function(we){if(ye&&(we=Fv[we]),ie!==we){switch(we){case Qo:i.depthFunc(i.NEVER);break;case $o:i.depthFunc(i.ALWAYS);break;case ea:i.depthFunc(i.LESS);break;case ji:i.depthFunc(i.LEQUAL);break;case ta:i.depthFunc(i.EQUAL);break;case na:i.depthFunc(i.GEQUAL);break;case ia:i.depthFunc(i.GREATER);break;case ra:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ie=we}},setLocked:function(we){O=we},setClear:function(we){Te!==we&&(i.clearDepth(we),Te=we)},reset:function(){O=!1,F=null,ie=null,Te=null}}}function n(){let O=!1,ye=null,F=null,ie=null,Te=null,we=null,tt=null,gt=null,Ot=null;return{setTest:function(rt){O||(rt?ue(i.STENCIL_TEST):ge(i.STENCIL_TEST))},setMask:function(rt){ye!==rt&&!O&&(i.stencilMask(rt),ye=rt)},setFunc:function(rt,Ft,rn){(F!==rt||ie!==Ft||Te!==rn)&&(i.stencilFunc(rt,Ft,rn),F=rt,ie=Ft,Te=rn)},setOp:function(rt,Ft,rn){(we!==rt||tt!==Ft||gt!==rn)&&(i.stencilOp(rt,Ft,rn),we=rt,tt=Ft,gt=rn)},setLocked:function(rt){O=rt},setClear:function(rt){Ot!==rt&&(i.clearStencil(rt),Ot=rt)},reset:function(){O=!1,ye=null,F=null,ie=null,Te=null,we=null,tt=null,gt=null,Ot=null}}}const r=new e,s=new t,a=new n,l=new WeakMap,u=new WeakMap;let h={},p={},o=new WeakMap,c=[],f=null,v=!1,x=null,g=null,m=null,w=null,E=null,C=null,B=null,L=new Ge(0,0,0),P=0,D=!1,H=null,y=null,S=null,z=null,G=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,W=0;const te=i.getParameter(i.VERSION);te.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(te)[1]),Q=W>=1):te.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),Q=W>=2);let J=null,le={};const he=i.getParameter(i.SCISSOR_BOX),Se=i.getParameter(i.VIEWPORT),Ce=new _t().fromArray(he),Ne=new _t().fromArray(Se);function $(O,ye,F,ie){const Te=new Uint8Array(4),we=i.createTexture();i.bindTexture(O,we),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let tt=0;tt<F;tt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(ye,0,i.RGBA,1,1,ie,0,i.RGBA,i.UNSIGNED_BYTE,Te):i.texImage2D(ye+tt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Te);return we}const oe={};oe[i.TEXTURE_2D]=$(i.TEXTURE_2D,i.TEXTURE_2D,1),oe[i.TEXTURE_CUBE_MAP]=$(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[i.TEXTURE_2D_ARRAY]=$(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),oe[i.TEXTURE_3D]=$(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),ue(i.DEPTH_TEST),s.setFunc(ji),qe(!1),Qe(Sl),ue(i.CULL_FACE),N(ft);function ue(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function ge(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function Pe(O,ye){return p[O]!==ye?(i.bindFramebuffer(O,ye),p[O]=ye,O===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=ye),O===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=ye),!0):!1}function De(O,ye){let F=c,ie=!1;if(O){F=o.get(ye),F===void 0&&(F=[],o.set(ye,F));const Te=O.textures;if(F.length!==Te.length||F[0]!==i.COLOR_ATTACHMENT0){for(let we=0,tt=Te.length;we<tt;we++)F[we]=i.COLOR_ATTACHMENT0+we;F.length=Te.length,ie=!0}}else F[0]!==i.BACK&&(F[0]=i.BACK,ie=!0);ie&&i.drawBuffers(F)}function ke(O){return f!==O?(i.useProgram(O),f=O,!0):!1}const $e={[dn]:i.FUNC_ADD,[Xh]:i.FUNC_SUBTRACT,[qh]:i.FUNC_REVERSE_SUBTRACT};$e[Yh]=i.MIN,$e[Zh]=i.MAX;const We={[Jo]:i.ZERO,[jh]:i.ONE,[Kh]:i.SRC_COLOR,[Pr]:i.SRC_ALPHA,[ef]:i.SRC_ALPHA_SATURATE,[Zc]:i.DST_COLOR,[Yc]:i.DST_ALPHA,[Jh]:i.ONE_MINUS_SRC_COLOR,[Lr]:i.ONE_MINUS_SRC_ALPHA,[$h]:i.ONE_MINUS_DST_COLOR,[Qh]:i.ONE_MINUS_DST_ALPHA,[tf]:i.CONSTANT_COLOR,[nf]:i.ONE_MINUS_CONSTANT_COLOR,[rf]:i.CONSTANT_ALPHA,[sf]:i.ONE_MINUS_CONSTANT_ALPHA};function N(O,ye,F,ie,Te,we,tt,gt,Ot,rt){if(O===ft){v===!0&&(ge(i.BLEND),v=!1);return}if(v===!1&&(ue(i.BLEND),v=!0),O!==qc){if(O!==x||rt!==D){if((g!==dn||E!==dn)&&(i.blendEquation(i.FUNC_ADD),g=dn,E=dn),rt)switch(O){case zn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ko:i.blendFunc(i.ONE,i.ONE);break;case bl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case El:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case zn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ko:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case bl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case El:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}m=null,w=null,C=null,B=null,L.set(0,0,0),P=0,x=O,D=rt}return}Te=Te||ye,we=we||F,tt=tt||ie,(ye!==g||Te!==E)&&(i.blendEquationSeparate($e[ye],$e[Te]),g=ye,E=Te),(F!==m||ie!==w||we!==C||tt!==B)&&(i.blendFuncSeparate(We[F],We[ie],We[we],We[tt]),m=F,w=ie,C=we,B=tt),(gt.equals(L)===!1||Ot!==P)&&(i.blendColor(gt.r,gt.g,gt.b,Ot),L.copy(gt),P=Ot),x=O,D=!1}function St(O,ye){O.side===xn?ge(i.CULL_FACE):ue(i.CULL_FACE);let F=O.side===Wt;ye&&(F=!F),qe(F),O.blending===zn&&O.transparent===!1?N(ft):N(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),s.setFunc(O.depthFunc),s.setTest(O.depthTest),s.setMask(O.depthWrite),r.setMask(O.colorWrite);const ie=O.stencilWrite;a.setTest(ie),ie&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),st(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ue(i.SAMPLE_ALPHA_TO_COVERAGE):ge(i.SAMPLE_ALPHA_TO_COVERAGE)}function qe(O){H!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),H=O)}function Qe(O){O!==Vh?(ue(i.CULL_FACE),O!==y&&(O===Sl?i.cullFace(i.BACK):O===Wh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ge(i.CULL_FACE),y=O}function Fe(O){O!==S&&(Q&&i.lineWidth(O),S=O)}function st(O,ye,F){O?(ue(i.POLYGON_OFFSET_FILL),(z!==ye||G!==F)&&(i.polygonOffset(ye,F),z=ye,G=F)):ge(i.POLYGON_OFFSET_FILL)}function Be(O){O?ue(i.SCISSOR_TEST):ge(i.SCISSOR_TEST)}function R(O){O===void 0&&(O=i.TEXTURE0+V-1),J!==O&&(i.activeTexture(O),J=O)}function b(O,ye,F){F===void 0&&(J===null?F=i.TEXTURE0+V-1:F=J);let ie=le[F];ie===void 0&&(ie={type:void 0,texture:void 0},le[F]=ie),(ie.type!==O||ie.texture!==ye)&&(J!==F&&(i.activeTexture(F),J=F),i.bindTexture(O,ye||oe[O]),ie.type=O,ie.texture=ye)}function Y(){const O=le[J];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function ne(){try{i.compressedTexImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ae(){try{i.compressedTexImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ee(){try{i.texSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Re(){try{i.texSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function _e(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function be(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ve(){try{i.texStorage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function fe(){try{i.texStorage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ee(){try{i.texImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ze(){try{i.texImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ie(O){Ce.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Ce.copy(O))}function xe(O){Ne.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Ne.copy(O))}function Ke(O,ye){let F=u.get(ye);F===void 0&&(F=new WeakMap,u.set(ye,F));let ie=F.get(O);ie===void 0&&(ie=i.getUniformBlockIndex(ye,O.name),F.set(O,ie))}function Oe(O,ye){const ie=u.get(ye).get(O);l.get(ye)!==ie&&(i.uniformBlockBinding(ye,ie,O.__bindingPointIndex),l.set(ye,ie))}function He(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},J=null,le={},p={},o=new WeakMap,c=[],f=null,v=!1,x=null,g=null,m=null,w=null,E=null,C=null,B=null,L=new Ge(0,0,0),P=0,D=!1,H=null,y=null,S=null,z=null,G=null,Ce.set(0,0,i.canvas.width,i.canvas.height),Ne.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:ue,disable:ge,bindFramebuffer:Pe,drawBuffers:De,useProgram:ke,setBlending:N,setMaterial:St,setFlipSided:qe,setCullFace:Qe,setLineWidth:Fe,setPolygonOffset:st,setScissorTest:Be,activeTexture:R,bindTexture:b,unbindTexture:Y,compressedTexImage2D:ne,compressedTexImage3D:ae,texImage2D:Ee,texImage3D:ze,updateUBOMapping:Ke,uniformBlockBinding:Oe,texStorage2D:Ve,texStorage3D:fe,texSubImage2D:ee,texSubImage3D:Re,compressedTexSubImage2D:_e,compressedTexSubImage3D:be,scissor:Ie,viewport:xe,reset:He}}function pc(i,e,t,n){const r=zv(n);switch(t){case su:return i*e;case au:return i*e;case lu:return i*e*2;case Nr:return i*e/r.components*r.byteLength;case el:return i*e/r.components*r.byteLength;case cu:return i*e*2/r.components*r.byteLength;case tl:return i*e*2/r.components*r.byteLength;case ou:return i*e*3/r.components*r.byteLength;case Yt:return i*e*4/r.components*r.byteLength;case nl:return i*e*4/r.components*r.byteLength;case Ps:case Ls:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ds:case Is:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ca:case ha:return Math.max(i,16)*Math.max(e,8)/4;case la:case ua:return Math.max(i,8)*Math.max(e,8)/2;case fa:case da:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case pa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ma:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ga:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case va:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case _a:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case xa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ya:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ma:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Sa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ba:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ea:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ta:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case wa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Aa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ca:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Us:case Ra:case Pa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case uu:case La:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Da:case Ia:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zv(i){switch(i){case kn:case nu:return{byteLength:1,components:1};case Qi:case iu:case dt:return{byteLength:2,components:1};case Qa:case $a:return{byteLength:2,components:4};case Mi:case Ja:case Ut:return{byteLength:4,components:1};case ru:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function kv(i,e,t,n,r,s,a){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new ve,p=new WeakMap;let o;const c=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,b){return f?new OffscreenCanvas(R,b):Hs("canvas")}function x(R,b,Y){let ne=1;const ae=Be(R);if((ae.width>Y||ae.height>Y)&&(ne=Y/Math.max(ae.width,ae.height)),ne<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ee=Math.floor(ne*ae.width),Re=Math.floor(ne*ae.height);o===void 0&&(o=v(ee,Re));const _e=b?v(ee,Re):o;return _e.width=ee,_e.height=Re,_e.getContext("2d").drawImage(R,0,0,ee,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+ee+"x"+Re+")."),_e}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),R;return R}function g(R){return R.generateMipmaps&&R.minFilter!==ct&&R.minFilter!==Ct}function m(R){i.generateMipmap(R)}function w(R,b,Y,ne,ae=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ee=b;if(b===i.RED&&(Y===i.FLOAT&&(ee=i.R32F),Y===i.HALF_FLOAT&&(ee=i.R16F),Y===i.UNSIGNED_BYTE&&(ee=i.R8)),b===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ee=i.R8UI),Y===i.UNSIGNED_SHORT&&(ee=i.R16UI),Y===i.UNSIGNED_INT&&(ee=i.R32UI),Y===i.BYTE&&(ee=i.R8I),Y===i.SHORT&&(ee=i.R16I),Y===i.INT&&(ee=i.R32I)),b===i.RG&&(Y===i.FLOAT&&(ee=i.RG32F),Y===i.HALF_FLOAT&&(ee=i.RG16F),Y===i.UNSIGNED_BYTE&&(ee=i.RG8)),b===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ee=i.RG8UI),Y===i.UNSIGNED_SHORT&&(ee=i.RG16UI),Y===i.UNSIGNED_INT&&(ee=i.RG32UI),Y===i.BYTE&&(ee=i.RG8I),Y===i.SHORT&&(ee=i.RG16I),Y===i.INT&&(ee=i.RG32I)),b===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ee=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(ee=i.RGB16UI),Y===i.UNSIGNED_INT&&(ee=i.RGB32UI),Y===i.BYTE&&(ee=i.RGB8I),Y===i.SHORT&&(ee=i.RGB16I),Y===i.INT&&(ee=i.RGB32I)),b===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ee=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(ee=i.RGBA16UI),Y===i.UNSIGNED_INT&&(ee=i.RGBA32UI),Y===i.BYTE&&(ee=i.RGBA8I),Y===i.SHORT&&(ee=i.RGBA16I),Y===i.INT&&(ee=i.RGBA32I)),b===i.RGB&&Y===i.UNSIGNED_INT_5_9_9_9_REV&&(ee=i.RGB9_E5),b===i.RGBA){const Re=ae?Fs:ot.getTransfer(ne);Y===i.FLOAT&&(ee=i.RGBA32F),Y===i.HALF_FLOAT&&(ee=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(ee=Re===ht?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function E(R,b){let Y;return R?b===null||b===Mi||b===Si?Y=i.DEPTH24_STENCIL8:b===Ut?Y=i.DEPTH32F_STENCIL8:b===Qi&&(Y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Mi||b===Si?Y=i.DEPTH_COMPONENT24:b===Ut?Y=i.DEPTH_COMPONENT32F:b===Qi&&(Y=i.DEPTH_COMPONENT16),Y}function C(R,b){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==ct&&R.minFilter!==Ct?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function B(R){const b=R.target;b.removeEventListener("dispose",B),P(b),b.isVideoTexture&&p.delete(b)}function L(R){const b=R.target;b.removeEventListener("dispose",L),H(b)}function P(R){const b=n.get(R);if(b.__webglInit===void 0)return;const Y=R.source,ne=c.get(Y);if(ne){const ae=ne[b.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&D(R),Object.keys(ne).length===0&&c.delete(Y)}n.remove(R)}function D(R){const b=n.get(R);i.deleteTexture(b.__webglTexture);const Y=R.source,ne=c.get(Y);delete ne[b.__cacheKey],a.memory.textures--}function H(R){const b=n.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(b.__webglFramebuffer[ne]))for(let ae=0;ae<b.__webglFramebuffer[ne].length;ae++)i.deleteFramebuffer(b.__webglFramebuffer[ne][ae]);else i.deleteFramebuffer(b.__webglFramebuffer[ne]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[ne])}else{if(Array.isArray(b.__webglFramebuffer))for(let ne=0;ne<b.__webglFramebuffer.length;ne++)i.deleteFramebuffer(b.__webglFramebuffer[ne]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ne=0;ne<b.__webglColorRenderbuffer.length;ne++)b.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[ne]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const Y=R.textures;for(let ne=0,ae=Y.length;ne<ae;ne++){const ee=n.get(Y[ne]);ee.__webglTexture&&(i.deleteTexture(ee.__webglTexture),a.memory.textures--),n.remove(Y[ne])}n.remove(R)}let y=0;function S(){y=0}function z(){const R=y;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),y+=1,R}function G(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function V(R,b){const Y=n.get(R);if(R.isVideoTexture&&Fe(R),R.isRenderTargetTexture===!1&&R.version>0&&Y.__version!==R.version){const ne=R.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(Y,R,b);return}}t.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+b)}function Q(R,b){const Y=n.get(R);if(R.version>0&&Y.__version!==R.version){Ne(Y,R,b);return}t.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+b)}function W(R,b){const Y=n.get(R);if(R.version>0&&Y.__version!==R.version){Ne(Y,R,b);return}t.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+b)}function te(R,b){const Y=n.get(R);if(R.version>0&&Y.__version!==R.version){$(Y,R,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+b)}const J={[Dr]:i.REPEAT,[On]:i.CLAMP_TO_EDGE,[aa]:i.MIRRORED_REPEAT},le={[ct]:i.NEAREST,[cf]:i.NEAREST_MIPMAP_NEAREST,[Zr]:i.NEAREST_MIPMAP_LINEAR,[Ct]:i.LINEAR,[no]:i.LINEAR_MIPMAP_NEAREST,[ei]:i.LINEAR_MIPMAP_LINEAR},he={[df]:i.NEVER,[xf]:i.ALWAYS,[pf]:i.LESS,[hu]:i.LEQUAL,[mf]:i.EQUAL,[_f]:i.GEQUAL,[gf]:i.GREATER,[vf]:i.NOTEQUAL};function Se(R,b){if(b.type===Ut&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Ct||b.magFilter===no||b.magFilter===Zr||b.magFilter===ei||b.minFilter===Ct||b.minFilter===no||b.minFilter===Zr||b.minFilter===ei)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,J[b.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,J[b.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,J[b.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,le[b.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,le[b.minFilter]),b.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,he[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===ct||b.minFilter!==Zr&&b.minFilter!==ei||b.type===Ut&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const Y=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Ce(R,b){let Y=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",B));const ne=b.source;let ae=c.get(ne);ae===void 0&&(ae={},c.set(ne,ae));const ee=G(b);if(ee!==R.__cacheKey){ae[ee]===void 0&&(ae[ee]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),ae[ee].usedTimes++;const Re=ae[R.__cacheKey];Re!==void 0&&(ae[R.__cacheKey].usedTimes--,Re.usedTimes===0&&D(b)),R.__cacheKey=ee,R.__webglTexture=ae[ee].texture}return Y}function Ne(R,b,Y){let ne=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ne=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ne=i.TEXTURE_3D);const ae=Ce(R,b),ee=b.source;t.bindTexture(ne,R.__webglTexture,i.TEXTURE0+Y);const Re=n.get(ee);if(ee.version!==Re.__version||ae===!0){t.activeTexture(i.TEXTURE0+Y);const _e=ot.getPrimaries(ot.workingColorSpace),be=b.colorSpace===Un?null:ot.getPrimaries(b.colorSpace),Ve=b.colorSpace===Un||_e===be?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve);let fe=x(b.image,!1,r.maxTextureSize);fe=st(b,fe);const Ee=s.convert(b.format,b.colorSpace),ze=s.convert(b.type);let Ie=w(b.internalFormat,Ee,ze,b.colorSpace,b.isVideoTexture);Se(ne,b);let xe;const Ke=b.mipmaps,Oe=b.isVideoTexture!==!0,He=Re.__version===void 0||ae===!0,O=ee.dataReady,ye=C(b,fe);if(b.isDepthTexture)Ie=E(b.format===bi,b.type),He&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,Ie,fe.width,fe.height):t.texImage2D(i.TEXTURE_2D,0,Ie,fe.width,fe.height,0,Ee,ze,null));else if(b.isDataTexture)if(Ke.length>0){Oe&&He&&t.texStorage2D(i.TEXTURE_2D,ye,Ie,Ke[0].width,Ke[0].height);for(let F=0,ie=Ke.length;F<ie;F++)xe=Ke[F],Oe?O&&t.texSubImage2D(i.TEXTURE_2D,F,0,0,xe.width,xe.height,Ee,ze,xe.data):t.texImage2D(i.TEXTURE_2D,F,Ie,xe.width,xe.height,0,Ee,ze,xe.data);b.generateMipmaps=!1}else Oe?(He&&t.texStorage2D(i.TEXTURE_2D,ye,Ie,fe.width,fe.height),O&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe.width,fe.height,Ee,ze,fe.data)):t.texImage2D(i.TEXTURE_2D,0,Ie,fe.width,fe.height,0,Ee,ze,fe.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Oe&&He&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Ie,Ke[0].width,Ke[0].height,fe.depth);for(let F=0,ie=Ke.length;F<ie;F++)if(xe=Ke[F],b.format!==Yt)if(Ee!==null)if(Oe){if(O)if(b.layerUpdates.size>0){const Te=pc(xe.width,xe.height,b.format,b.type);for(const we of b.layerUpdates){const tt=xe.data.subarray(we*Te/xe.data.BYTES_PER_ELEMENT,(we+1)*Te/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,F,0,0,we,xe.width,xe.height,1,Ee,tt,0,0)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,F,0,0,0,xe.width,xe.height,fe.depth,Ee,xe.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,F,Ie,xe.width,xe.height,fe.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?O&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,F,0,0,0,xe.width,xe.height,fe.depth,Ee,ze,xe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,F,Ie,xe.width,xe.height,fe.depth,0,Ee,ze,xe.data)}else{Oe&&He&&t.texStorage2D(i.TEXTURE_2D,ye,Ie,Ke[0].width,Ke[0].height);for(let F=0,ie=Ke.length;F<ie;F++)xe=Ke[F],b.format!==Yt?Ee!==null?Oe?O&&t.compressedTexSubImage2D(i.TEXTURE_2D,F,0,0,xe.width,xe.height,Ee,xe.data):t.compressedTexImage2D(i.TEXTURE_2D,F,Ie,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?O&&t.texSubImage2D(i.TEXTURE_2D,F,0,0,xe.width,xe.height,Ee,ze,xe.data):t.texImage2D(i.TEXTURE_2D,F,Ie,xe.width,xe.height,0,Ee,ze,xe.data)}else if(b.isDataArrayTexture)if(Oe){if(He&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Ie,fe.width,fe.height,fe.depth),O)if(b.layerUpdates.size>0){const F=pc(fe.width,fe.height,b.format,b.type);for(const ie of b.layerUpdates){const Te=fe.data.subarray(ie*F/fe.data.BYTES_PER_ELEMENT,(ie+1)*F/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ie,fe.width,fe.height,1,Ee,ze,Te)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Ee,ze,fe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ie,fe.width,fe.height,fe.depth,0,Ee,ze,fe.data);else if(b.isData3DTexture)Oe?(He&&t.texStorage3D(i.TEXTURE_3D,ye,Ie,fe.width,fe.height,fe.depth),O&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Ee,ze,fe.data)):t.texImage3D(i.TEXTURE_3D,0,Ie,fe.width,fe.height,fe.depth,0,Ee,ze,fe.data);else if(b.isFramebufferTexture){if(He)if(Oe)t.texStorage2D(i.TEXTURE_2D,ye,Ie,fe.width,fe.height);else{let F=fe.width,ie=fe.height;for(let Te=0;Te<ye;Te++)t.texImage2D(i.TEXTURE_2D,Te,Ie,F,ie,0,Ee,ze,null),F>>=1,ie>>=1}}else if(Ke.length>0){if(Oe&&He){const F=Be(Ke[0]);t.texStorage2D(i.TEXTURE_2D,ye,Ie,F.width,F.height)}for(let F=0,ie=Ke.length;F<ie;F++)xe=Ke[F],Oe?O&&t.texSubImage2D(i.TEXTURE_2D,F,0,0,Ee,ze,xe):t.texImage2D(i.TEXTURE_2D,F,Ie,Ee,ze,xe);b.generateMipmaps=!1}else if(Oe){if(He){const F=Be(fe);t.texStorage2D(i.TEXTURE_2D,ye,Ie,F.width,F.height)}O&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ee,ze,fe)}else t.texImage2D(i.TEXTURE_2D,0,Ie,Ee,ze,fe);g(b)&&m(ne),Re.__version=ee.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function $(R,b,Y){if(b.image.length!==6)return;const ne=Ce(R,b),ae=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+Y);const ee=n.get(ae);if(ae.version!==ee.__version||ne===!0){t.activeTexture(i.TEXTURE0+Y);const Re=ot.getPrimaries(ot.workingColorSpace),_e=b.colorSpace===Un?null:ot.getPrimaries(b.colorSpace),be=b.colorSpace===Un||Re===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Ve=b.isCompressedTexture||b.image[0].isCompressedTexture,fe=b.image[0]&&b.image[0].isDataTexture,Ee=[];for(let ie=0;ie<6;ie++)!Ve&&!fe?Ee[ie]=x(b.image[ie],!0,r.maxCubemapSize):Ee[ie]=fe?b.image[ie].image:b.image[ie],Ee[ie]=st(b,Ee[ie]);const ze=Ee[0],Ie=s.convert(b.format,b.colorSpace),xe=s.convert(b.type),Ke=w(b.internalFormat,Ie,xe,b.colorSpace),Oe=b.isVideoTexture!==!0,He=ee.__version===void 0||ne===!0,O=ae.dataReady;let ye=C(b,ze);Se(i.TEXTURE_CUBE_MAP,b);let F;if(Ve){Oe&&He&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Ke,ze.width,ze.height);for(let ie=0;ie<6;ie++){F=Ee[ie].mipmaps;for(let Te=0;Te<F.length;Te++){const we=F[Te];b.format!==Yt?Ie!==null?Oe?O&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te,0,0,we.width,we.height,Ie,we.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te,Ke,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?O&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te,0,0,we.width,we.height,Ie,xe,we.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te,Ke,we.width,we.height,0,Ie,xe,we.data)}}}else{if(F=b.mipmaps,Oe&&He){F.length>0&&ye++;const ie=Be(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Ke,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(fe){Oe?O&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ee[ie].width,Ee[ie].height,Ie,xe,Ee[ie].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Ke,Ee[ie].width,Ee[ie].height,0,Ie,xe,Ee[ie].data);for(let Te=0;Te<F.length;Te++){const tt=F[Te].image[ie].image;Oe?O&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te+1,0,0,tt.width,tt.height,Ie,xe,tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te+1,Ke,tt.width,tt.height,0,Ie,xe,tt.data)}}else{Oe?O&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ie,xe,Ee[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Ke,Ie,xe,Ee[ie]);for(let Te=0;Te<F.length;Te++){const we=F[Te];Oe?O&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te+1,0,0,Ie,xe,we.image[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te+1,Ke,Ie,xe,we.image[ie])}}}g(b)&&m(i.TEXTURE_CUBE_MAP),ee.__version=ae.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function oe(R,b,Y,ne,ae,ee){const Re=s.convert(Y.format,Y.colorSpace),_e=s.convert(Y.type),be=w(Y.internalFormat,Re,_e,Y.colorSpace);if(!n.get(b).__hasExternalTextures){const fe=Math.max(1,b.width>>ee),Ee=Math.max(1,b.height>>ee);ae===i.TEXTURE_3D||ae===i.TEXTURE_2D_ARRAY?t.texImage3D(ae,ee,be,fe,Ee,b.depth,0,Re,_e,null):t.texImage2D(ae,ee,be,fe,Ee,0,Re,_e,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),Qe(b)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,ae,n.get(Y).__webglTexture,0,qe(b)):(ae===i.TEXTURE_2D||ae>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ne,ae,n.get(Y).__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ue(R,b,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,R),b.depthBuffer){const ne=b.depthTexture,ae=ne&&ne.isDepthTexture?ne.type:null,ee=E(b.stencilBuffer,ae),Re=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=qe(b);Qe(b)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e,ee,b.width,b.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,ee,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ee,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Re,i.RENDERBUFFER,R)}else{const ne=b.textures;for(let ae=0;ae<ne.length;ae++){const ee=ne[ae],Re=s.convert(ee.format,ee.colorSpace),_e=s.convert(ee.type),be=w(ee.internalFormat,Re,_e,ee.colorSpace),Ve=qe(b);Y&&Qe(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ve,be,b.width,b.height):Qe(b)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ve,be,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,be,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ge(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),V(b.depthTexture,0);const ne=n.get(b.depthTexture).__webglTexture,ae=qe(b);if(b.depthTexture.format===Yi)Qe(b)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0,ae):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0);else if(b.depthTexture.format===bi)Qe(b)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0,ae):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Pe(R){const b=n.get(R),Y=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const ne=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ne){const ae=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ne.removeEventListener("dispose",ae)};ne.addEventListener("dispose",ae),b.__depthDisposeCallback=ae}b.__boundDepthTexture=ne}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");ge(b.__webglFramebuffer,R)}else if(Y){b.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[ne]),b.__webglDepthbuffer[ne]===void 0)b.__webglDepthbuffer[ne]=i.createRenderbuffer(),ue(b.__webglDepthbuffer[ne],R,!1);else{const ae=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=b.__webglDepthbuffer[ne];i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,ee)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),ue(b.__webglDepthbuffer,R,!1);else{const ne=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,ae)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(R,b,Y){const ne=n.get(R);b!==void 0&&oe(ne.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&Pe(R)}function ke(R){const b=R.texture,Y=n.get(R),ne=n.get(b);R.addEventListener("dispose",L);const ae=R.textures,ee=R.isWebGLCubeRenderTarget===!0,Re=ae.length>1;if(Re||(ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture()),ne.__version=b.version,a.memory.textures++),ee){Y.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(b.mipmaps&&b.mipmaps.length>0){Y.__webglFramebuffer[_e]=[];for(let be=0;be<b.mipmaps.length;be++)Y.__webglFramebuffer[_e][be]=i.createFramebuffer()}else Y.__webglFramebuffer[_e]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){Y.__webglFramebuffer=[];for(let _e=0;_e<b.mipmaps.length;_e++)Y.__webglFramebuffer[_e]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(Re)for(let _e=0,be=ae.length;_e<be;_e++){const Ve=n.get(ae[_e]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&Qe(R)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let _e=0;_e<ae.length;_e++){const be=ae[_e];Y.__webglColorRenderbuffer[_e]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[_e]);const Ve=s.convert(be.format,be.colorSpace),fe=s.convert(be.type),Ee=w(be.internalFormat,Ve,fe,be.colorSpace,R.isXRRenderTarget===!0),ze=qe(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,ze,Ee,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,Y.__webglColorRenderbuffer[_e])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),ue(Y.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ee){t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),Se(i.TEXTURE_CUBE_MAP,b);for(let _e=0;_e<6;_e++)if(b.mipmaps&&b.mipmaps.length>0)for(let be=0;be<b.mipmaps.length;be++)oe(Y.__webglFramebuffer[_e][be],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,be);else oe(Y.__webglFramebuffer[_e],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);g(b)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let _e=0,be=ae.length;_e<be;_e++){const Ve=ae[_e],fe=n.get(Ve);t.bindTexture(i.TEXTURE_2D,fe.__webglTexture),Se(i.TEXTURE_2D,Ve),oe(Y.__webglFramebuffer,R,Ve,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,0),g(Ve)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let _e=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(_e=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,ne.__webglTexture),Se(_e,b),b.mipmaps&&b.mipmaps.length>0)for(let be=0;be<b.mipmaps.length;be++)oe(Y.__webglFramebuffer[be],R,b,i.COLOR_ATTACHMENT0,_e,be);else oe(Y.__webglFramebuffer,R,b,i.COLOR_ATTACHMENT0,_e,0);g(b)&&m(_e),t.unbindTexture()}R.depthBuffer&&Pe(R)}function $e(R){const b=R.textures;for(let Y=0,ne=b.length;Y<ne;Y++){const ae=b[Y];if(g(ae)){const ee=R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Re=n.get(ae).__webglTexture;t.bindTexture(ee,Re),m(ee),t.unbindTexture()}}}const We=[],N=[];function St(R){if(R.samples>0){if(Qe(R)===!1){const b=R.textures,Y=R.width,ne=R.height;let ae=i.COLOR_BUFFER_BIT;const ee=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=n.get(R),_e=b.length>1;if(_e)for(let be=0;be<b.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let be=0;be<b.length;be++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ae|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ae|=i.STENCIL_BUFFER_BIT)),_e){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Re.__webglColorRenderbuffer[be]);const Ve=n.get(b[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ve,0)}i.blitFramebuffer(0,0,Y,ne,0,0,Y,ne,ae,i.NEAREST),u===!0&&(We.length=0,N.length=0,We.push(i.COLOR_ATTACHMENT0+be),R.depthBuffer&&R.resolveDepthBuffer===!1&&(We.push(ee),N.push(ee),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,N)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,We))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),_e)for(let be=0;be<b.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,Re.__webglColorRenderbuffer[be]);const Ve=n.get(b[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,Ve,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&u){const b=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function qe(R){return Math.min(r.maxSamples,R.samples)}function Qe(R){const b=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Fe(R){const b=a.render.frame;p.get(R)!==b&&(p.set(R,b),R.update())}function st(R,b){const Y=R.colorSpace,ne=R.format,ae=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||Y!==en&&Y!==Un&&(ot.getTransfer(Y)===ht?(ne!==Yt||ae!==kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),b}function Be(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(h.width=R.naturalWidth||R.width,h.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(h.width=R.displayWidth,h.height=R.displayHeight):(h.width=R.width,h.height=R.height),h}this.allocateTextureUnit=z,this.resetTextureUnits=S,this.setTexture2D=V,this.setTexture2DArray=Q,this.setTexture3D=W,this.setTextureCube=te,this.rebindTextures=De,this.setupRenderTarget=ke,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=St,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=Qe}function Hv(i,e){function t(n,r=Un){let s;const a=ot.getTransfer(r);if(n===kn)return i.UNSIGNED_BYTE;if(n===Qa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===$a)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ru)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===nu)return i.BYTE;if(n===iu)return i.SHORT;if(n===Qi)return i.UNSIGNED_SHORT;if(n===Ja)return i.INT;if(n===Mi)return i.UNSIGNED_INT;if(n===Ut)return i.FLOAT;if(n===dt)return i.HALF_FLOAT;if(n===su)return i.ALPHA;if(n===ou)return i.RGB;if(n===Yt)return i.RGBA;if(n===au)return i.LUMINANCE;if(n===lu)return i.LUMINANCE_ALPHA;if(n===Yi)return i.DEPTH_COMPONENT;if(n===bi)return i.DEPTH_STENCIL;if(n===Nr)return i.RED;if(n===el)return i.RED_INTEGER;if(n===cu)return i.RG;if(n===tl)return i.RG_INTEGER;if(n===nl)return i.RGBA_INTEGER;if(n===Ps||n===Ls||n===Ds||n===Is)if(a===ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ps)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ls)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ds)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ps)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ls)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ds)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Is)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===la||n===ca||n===ua||n===ha)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===la)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ca)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ua)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ha)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===fa||n===da||n===pa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===fa||n===da)return a===ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===pa)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ma||n===ga||n===va||n===_a||n===xa||n===ya||n===Ma||n===Sa||n===ba||n===Ea||n===Ta||n===wa||n===Aa||n===Ca)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ma)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ga)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===va)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_a)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===xa)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ya)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ma)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Sa)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ba)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ea)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ta)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===wa)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Aa)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ca)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Us||n===Ra||n===Pa)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Us)return a===ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ra)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Pa)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===uu||n===La||n===Da||n===Ia)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Us)return s.COMPRESSED_RED_RGTC1_EXT;if(n===La)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Da)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ia)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Si?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class Gv extends Qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Bn extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vv={type:"move"};class Lo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const l=this._targetRay,u=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){a=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,n),m=this._getHandJoint(h,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const p=h.joints["index-finger-tip"],o=h.joints["thumb-tip"],c=p.position.distanceTo(o.position),f=.02,v=.005;h.inputState.pinching&&c>f+v?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&c<=f-v&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(u.matrix.fromArray(s.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,s.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(s.linearVelocity)):u.hasLinearVelocity=!1,s.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(s.angularVelocity)):u.hasAngularVelocity=!1));l!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(Vv)))}return l!==null&&(l.visible=r!==null),u!==null&&(u.visible=s!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Bn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Wv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class qv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new Nt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ut({vertexShader:Wv,fragmentShader:Xv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Tt(new ar(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Yv extends ir{constructor(e,t){super();const n=this;let r=null,s=1,a=null,l="local-floor",u=1,h=null,p=null,o=null,c=null,f=null,v=null;const x=new qv,g=t.getContextAttributes();let m=null,w=null;const E=[],C=[],B=new ve;let L=null;const P=new Qt;P.layers.enable(1),P.viewport=new _t;const D=new Qt;D.layers.enable(2),D.viewport=new _t;const H=[P,D],y=new Gv;y.layers.enable(1),y.layers.enable(2);let S=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let oe=E[$];return oe===void 0&&(oe=new Lo,E[$]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function($){let oe=E[$];return oe===void 0&&(oe=new Lo,E[$]=oe),oe.getGripSpace()},this.getHand=function($){let oe=E[$];return oe===void 0&&(oe=new Lo,E[$]=oe),oe.getHandSpace()};function G($){const oe=C.indexOf($.inputSource);if(oe===-1)return;const ue=E[oe];ue!==void 0&&(ue.update($.inputSource,$.frame,h||a),ue.dispatchEvent({type:$.type,data:$.inputSource}))}function V(){r.removeEventListener("select",G),r.removeEventListener("selectstart",G),r.removeEventListener("selectend",G),r.removeEventListener("squeeze",G),r.removeEventListener("squeezestart",G),r.removeEventListener("squeezeend",G),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",Q);for(let $=0;$<E.length;$++){const oe=C[$];oe!==null&&(C[$]=null,E[$].disconnect(oe))}S=null,z=null,x.reset(),e.setRenderTarget(m),f=null,c=null,o=null,r=null,w=null,Ne.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(B.width,B.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){l=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function($){h=$},this.getBaseLayer=function(){return c!==null?c:f},this.getBinding=function(){return o},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",G),r.addEventListener("selectstart",G),r.addEventListener("selectend",G),r.addEventListener("squeeze",G),r.addEventListener("squeezestart",G),r.addEventListener("squeezeend",G),r.addEventListener("end",V),r.addEventListener("inputsourceschange",Q),g.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(B),r.renderState.layers===void 0){const oe={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,oe),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),w=new yt(f.framebufferWidth,f.framebufferHeight,{format:Yt,type:kn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let oe=null,ue=null,ge=null;g.depth&&(ge=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=g.stencil?bi:Yi,ue=g.stencil?Si:Mi);const Pe={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:s};o=new XRWebGLBinding(r,t),c=o.createProjectionLayer(Pe),r.updateRenderState({layers:[c]}),e.setPixelRatio(1),e.setSize(c.textureWidth,c.textureHeight,!1),w=new yt(c.textureWidth,c.textureHeight,{format:Yt,type:kn,depthTexture:new Zs(c.textureWidth,c.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:c.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(u),h=null,a=await r.requestReferenceSpace(l),Ne.setContext(r),Ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Q($){for(let oe=0;oe<$.removed.length;oe++){const ue=$.removed[oe],ge=C.indexOf(ue);ge>=0&&(C[ge]=null,E[ge].disconnect(ue))}for(let oe=0;oe<$.added.length;oe++){const ue=$.added[oe];let ge=C.indexOf(ue);if(ge===-1){for(let De=0;De<E.length;De++)if(De>=C.length){C.push(ue),ge=De;break}else if(C[De]===null){C[De]=ue,ge=De;break}if(ge===-1)break}const Pe=E[ge];Pe&&Pe.connect(ue)}}const W=new k,te=new k;function J($,oe,ue){W.setFromMatrixPosition(oe.matrixWorld),te.setFromMatrixPosition(ue.matrixWorld);const ge=W.distanceTo(te),Pe=oe.projectionMatrix.elements,De=ue.projectionMatrix.elements,ke=Pe[14]/(Pe[10]-1),$e=Pe[14]/(Pe[10]+1),We=(Pe[9]+1)/Pe[5],N=(Pe[9]-1)/Pe[5],St=(Pe[8]-1)/Pe[0],qe=(De[8]+1)/De[0],Qe=ke*St,Fe=ke*qe,st=ge/(-St+qe),Be=st*-St;if(oe.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Be),$.translateZ(st),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Pe[10]===-1)$.projectionMatrix.copy(oe.projectionMatrix),$.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const R=ke+st,b=$e+st,Y=Qe-Be,ne=Fe+(ge-Be),ae=We*$e/b*R,ee=N*$e/b*R;$.projectionMatrix.makePerspective(Y,ne,ae,ee,R,b),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function le($,oe){oe===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(oe.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let oe=$.near,ue=$.far;x.texture!==null&&(x.depthNear>0&&(oe=x.depthNear),x.depthFar>0&&(ue=x.depthFar)),y.near=D.near=P.near=oe,y.far=D.far=P.far=ue,(S!==y.near||z!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),S=y.near,z=y.far);const ge=$.parent,Pe=y.cameras;le(y,ge);for(let De=0;De<Pe.length;De++)le(Pe[De],ge);Pe.length===2?J(y,P,D):y.projectionMatrix.copy(P.projectionMatrix),he($,y,ge)};function he($,oe,ue){ue===null?$.matrix.copy(oe.matrixWorld):($.matrix.copy(ue.matrixWorld),$.matrix.invert(),$.matrix.multiply(oe.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(oe.projectionMatrix),$.projectionMatrixInverse.copy(oe.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ir*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(c===null&&f===null))return u},this.setFoveation=function($){u=$,c!==null&&(c.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let Se=null;function Ce($,oe){if(p=oe.getViewerPose(h||a),v=oe,p!==null){const ue=p.views;f!==null&&(e.setRenderTargetFramebuffer(w,f.framebuffer),e.setRenderTarget(w));let ge=!1;ue.length!==y.cameras.length&&(y.cameras.length=0,ge=!0);for(let De=0;De<ue.length;De++){const ke=ue[De];let $e=null;if(f!==null)$e=f.getViewport(ke);else{const N=o.getViewSubImage(c,ke);$e=N.viewport,De===0&&(e.setRenderTargetTextures(w,N.colorTexture,c.ignoreDepthValues?void 0:N.depthStencilTexture),e.setRenderTarget(w))}let We=H[De];We===void 0&&(We=new Qt,We.layers.enable(De),We.viewport=new _t,H[De]=We),We.matrix.fromArray(ke.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(ke.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set($e.x,$e.y,$e.width,$e.height),De===0&&(y.matrix.copy(We.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ge===!0&&y.cameras.push(We)}const Pe=r.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")){const De=o.getDepthInformation(ue[0]);De&&De.isValid&&De.texture&&x.init(e,De,r.renderState)}}for(let ue=0;ue<E.length;ue++){const ge=C[ue],Pe=E[ue];ge!==null&&Pe!==void 0&&Pe.update(ge,oe,h||a)}Se&&Se($,oe),oe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:oe}),v=null}const Ne=new Su;Ne.setAnimationLoop(Ce),this.setAnimationLoop=function($){Se=$},this.dispose=function(){}}}const mi=new tn,Zv=new at;function jv(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,xu(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,w,E,C){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(g,m):m.isMeshToonMaterial?(s(g,m),o(g,m)):m.isMeshPhongMaterial?(s(g,m),p(g,m)):m.isMeshStandardMaterial?(s(g,m),c(g,m),m.isMeshPhysicalMaterial&&f(g,m,C)):m.isMeshMatcapMaterial?(s(g,m),v(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),x(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&l(g,m)):m.isPointsMaterial?u(g,m,w,E):m.isSpriteMaterial?h(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Wt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Wt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const w=e.get(m),E=w.envMap,C=w.envMapRotation;E&&(g.envMap.value=E,mi.copy(C),mi.x*=-1,mi.y*=-1,mi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),g.envMapRotation.value.setFromMatrix4(Zv.makeRotationFromEuler(mi)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function l(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function u(g,m,w,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*w,g.scale.value=E*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function p(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function o(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function c(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,w){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Wt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){const w=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Kv(i,e,t,n){let r={},s={},a=[];const l=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function u(w,E){const C=E.program;n.uniformBlockBinding(w,C)}function h(w,E){let C=r[w.id];C===void 0&&(v(w),C=p(w),r[w.id]=C,w.addEventListener("dispose",g));const B=E.program;n.updateUBOMapping(w,B);const L=e.render.frame;s[w.id]!==L&&(c(w),s[w.id]=L)}function p(w){const E=o();w.__bindingPointIndex=E;const C=i.createBuffer(),B=w.__size,L=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,C),i.bufferData(i.UNIFORM_BUFFER,B,L),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,C),C}function o(){for(let w=0;w<l;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function c(w){const E=r[w.id],C=w.uniforms,B=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let L=0,P=C.length;L<P;L++){const D=Array.isArray(C[L])?C[L]:[C[L]];for(let H=0,y=D.length;H<y;H++){const S=D[H];if(f(S,L,H,B)===!0){const z=S.__offset,G=Array.isArray(S.value)?S.value:[S.value];let V=0;for(let Q=0;Q<G.length;Q++){const W=G[Q],te=x(W);typeof W=="number"||typeof W=="boolean"?(S.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,z+V,S.__data)):W.isMatrix3?(S.__data[0]=W.elements[0],S.__data[1]=W.elements[1],S.__data[2]=W.elements[2],S.__data[3]=0,S.__data[4]=W.elements[3],S.__data[5]=W.elements[4],S.__data[6]=W.elements[5],S.__data[7]=0,S.__data[8]=W.elements[6],S.__data[9]=W.elements[7],S.__data[10]=W.elements[8],S.__data[11]=0):(W.toArray(S.__data,V),V+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,S.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(w,E,C,B){const L=w.value,P=E+"_"+C;if(B[P]===void 0)return typeof L=="number"||typeof L=="boolean"?B[P]=L:B[P]=L.clone(),!0;{const D=B[P];if(typeof L=="number"||typeof L=="boolean"){if(D!==L)return B[P]=L,!0}else if(D.equals(L)===!1)return D.copy(L),!0}return!1}function v(w){const E=w.uniforms;let C=0;const B=16;for(let P=0,D=E.length;P<D;P++){const H=Array.isArray(E[P])?E[P]:[E[P]];for(let y=0,S=H.length;y<S;y++){const z=H[y],G=Array.isArray(z.value)?z.value:[z.value];for(let V=0,Q=G.length;V<Q;V++){const W=G[V],te=x(W),J=C%B,le=J%te.boundary,he=J+le;C+=le,he!==0&&B-he<te.storage&&(C+=B-he),z.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=C,C+=te.storage}}}const L=C%B;return L>0&&(C+=B-L),w.__size=C,w.__cache={},this}function x(w){const E={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(E.boundary=4,E.storage=4):w.isVector2?(E.boundary=8,E.storage=8):w.isVector3||w.isColor?(E.boundary=16,E.storage=12):w.isVector4?(E.boundary=16,E.storage=16):w.isMatrix3?(E.boundary=48,E.storage=48):w.isMatrix4?(E.boundary=64,E.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),E}function g(w){const E=w.target;E.removeEventListener("dispose",g);const C=a.indexOf(E.__bindingPointIndex);a.splice(C,1),i.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function m(){for(const w in r)i.deleteBuffer(r[w]);a=[],r={},s={}}return{bind:u,update:h,dispose:m}}class Jv{constructor(e={}){const{canvas:t=Of(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:l=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:h=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:o=!1}=e;this.isWebGLRenderer=!0;let c;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");c=n.getContextAttributes().alpha}else c=a;const f=new Uint32Array(4),v=new Int32Array(4);let x=null,g=null;const m=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=fn,this.toneMapping=ni,this.toneMappingExposure=1;const E=this;let C=!1,B=0,L=0,P=null,D=-1,H=null;const y=new _t,S=new _t;let z=null;const G=new Ge(0);let V=0,Q=t.width,W=t.height,te=1,J=null,le=null;const he=new _t(0,0,Q,W),Se=new _t(0,0,Q,W);let Ce=!1;const Ne=new al;let $=!1,oe=!1;const ue=new at,ge=new at,Pe=new k,De=new _t,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let $e=!1;function We(){return P===null?te:1}let N=n;function St(A,d){return t.getContext(A,d)}try{const A={alpha:!0,depth:r,stencil:s,antialias:l,premultipliedAlpha:u,preserveDrawingBuffer:h,powerPreference:p,failIfMajorPerformanceCaveat:o};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ja}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",Te,!1),t.addEventListener("webglcontextcreationerror",we,!1),N===null){const d="webgl2";if(N=St(d,A),N===null)throw St(d)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let qe,Qe,Fe,st,Be,R,b,Y,ne,ae,ee,Re,_e,be,Ve,fe,Ee,ze,Ie,xe,Ke,Oe,He,O;function ye(){qe=new ng(N),qe.init(),Oe=new Hv(N,qe),Qe=new Km(N,qe,e,Oe),Fe=new Bv(N),Qe.reverseDepthBuffer&&Fe.buffers.depth.setReversed(!0),st=new sg(N),Be=new bv,R=new kv(N,qe,Fe,Be,Qe,Oe,st),b=new Qm(E),Y=new tg(E),ne=new fd(N),He=new Zm(N,ne),ae=new ig(N,ne,st,He),ee=new ag(N,ae,ne,st),Ie=new og(N,Qe,R),fe=new Jm(Be),Re=new Sv(E,b,Y,qe,Qe,He,fe),_e=new jv(E,Be),be=new Tv,Ve=new Lv(qe),ze=new Ym(E,b,Y,Fe,ee,c,u),Ee=new Ov(E,ee,Qe),O=new Kv(N,st,Qe,Fe),xe=new jm(N,qe,st),Ke=new rg(N,qe,st),st.programs=Re.programs,E.capabilities=Qe,E.extensions=qe,E.properties=Be,E.renderLists=be,E.shadowMap=Ee,E.state=Fe,E.info=st}ye();const F=new Yv(E,N);this.xr=F,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const A=qe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=qe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(A){A!==void 0&&(te=A,this.setSize(Q,W,!1))},this.getSize=function(A){return A.set(Q,W)},this.setSize=function(A,d,_=!0){if(F.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=A,W=d,t.width=Math.floor(A*te),t.height=Math.floor(d*te),_===!0&&(t.style.width=A+"px",t.style.height=d+"px"),this.setViewport(0,0,A,d)},this.getDrawingBufferSize=function(A){return A.set(Q*te,W*te).floor()},this.setDrawingBufferSize=function(A,d,_){Q=A,W=d,te=_,t.width=Math.floor(A*_),t.height=Math.floor(d*_),this.setViewport(0,0,A,d)},this.getCurrentViewport=function(A){return A.copy(y)},this.getViewport=function(A){return A.copy(he)},this.setViewport=function(A,d,_,M){A.isVector4?he.set(A.x,A.y,A.z,A.w):he.set(A,d,_,M),Fe.viewport(y.copy(he).multiplyScalar(te).round())},this.getScissor=function(A){return A.copy(Se)},this.setScissor=function(A,d,_,M){A.isVector4?Se.set(A.x,A.y,A.z,A.w):Se.set(A,d,_,M),Fe.scissor(S.copy(Se).multiplyScalar(te).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(A){Fe.setScissorTest(Ce=A)},this.setOpaqueSort=function(A){J=A},this.setTransparentSort=function(A){le=A},this.getClearColor=function(A){return A.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(A=!0,d=!0,_=!0){let M=0;if(A){let T=!1;if(P!==null){const U=P.texture.format;T=U===nl||U===tl||U===el}if(T){const U=P.texture.type,I=U===kn||U===Mi||U===Qi||U===Si||U===Qa||U===$a,X=ze.getClearColor(),K=ze.getClearAlpha(),Z=X.r,j=X.g,q=X.b;I?(f[0]=Z,f[1]=j,f[2]=q,f[3]=K,N.clearBufferuiv(N.COLOR,0,f)):(v[0]=Z,v[1]=j,v[2]=q,v[3]=K,N.clearBufferiv(N.COLOR,0,v))}else M|=N.COLOR_BUFFER_BIT}d&&(M|=N.DEPTH_BUFFER_BIT,N.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),_&&(M|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(M)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",Te,!1),t.removeEventListener("webglcontextcreationerror",we,!1),be.dispose(),Ve.dispose(),Be.dispose(),b.dispose(),Y.dispose(),ee.dispose(),He.dispose(),O.dispose(),Re.dispose(),F.dispose(),F.removeEventListener("sessionstart",zr),F.removeEventListener("sessionend",kr),En.stop()};function ie(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Te(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const A=st.autoReset,d=Ee.enabled,_=Ee.autoUpdate,M=Ee.needsUpdate,T=Ee.type;ye(),st.autoReset=A,Ee.enabled=d,Ee.autoUpdate=_,Ee.needsUpdate=M,Ee.type=T}function we(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function tt(A){const d=A.target;d.removeEventListener("dispose",tt),gt(d)}function gt(A){Ot(A),Be.remove(A)}function Ot(A){const d=Be.get(A).programs;d!==void 0&&(d.forEach(function(_){Re.releaseProgram(_)}),A.isShaderMaterial&&Re.releaseShaderCache(A))}this.renderBufferDirect=function(A,d,_,M,T,U){d===null&&(d=ke);const I=T.isMesh&&T.matrixWorld.determinant()<0,X=Wr(A,d,_,M,T);Fe.setMaterial(M,I);let K=_.index,Z=1;if(M.wireframe===!0){if(K=ae.getWireframeAttribute(_),K===void 0)return;Z=2}const j=_.drawRange,q=_.attributes.position;let se=j.start*Z,de=(j.start+j.count)*Z;U!==null&&(se=Math.max(se,U.start*Z),de=Math.min(de,(U.start+U.count)*Z)),K!==null?(se=Math.max(se,0),de=Math.min(de,K.count)):q!=null&&(se=Math.max(se,0),de=Math.min(de,q.count));const pe=de-se;if(pe<0||pe===1/0)return;He.setup(T,M,X,_,K);let Ae,ce=xe;if(K!==null&&(Ae=ne.get(K),ce=Ke,ce.setIndex(Ae)),T.isMesh)M.wireframe===!0?(Fe.setLineWidth(M.wireframeLinewidth*We()),ce.setMode(N.LINES)):ce.setMode(N.TRIANGLES);else if(T.isLine){let re=M.linewidth;re===void 0&&(re=1),Fe.setLineWidth(re*We()),T.isLineSegments?ce.setMode(N.LINES):T.isLineLoop?ce.setMode(N.LINE_LOOP):ce.setMode(N.LINE_STRIP)}else T.isPoints?ce.setMode(N.POINTS):T.isSprite&&ce.setMode(N.TRIANGLES);if(T.isBatchedMesh)if(T._multiDrawInstances!==null)ce.renderMultiDrawInstances(T._multiDrawStarts,T._multiDrawCounts,T._multiDrawCount,T._multiDrawInstances);else if(qe.get("WEBGL_multi_draw"))ce.renderMultiDraw(T._multiDrawStarts,T._multiDrawCounts,T._multiDrawCount);else{const re=T._multiDrawStarts,Le=T._multiDrawCounts,Ue=T._multiDrawCount,nt=K?ne.get(K).bytesPerElement:1,bt=Be.get(M).currentProgram.getUniforms();for(let Je=0;Je<Ue;Je++)bt.setValue(N,"_gl_DrawID",Je),ce.render(re[Je]/nt,Le[Je])}else if(T.isInstancedMesh)ce.renderInstances(se,pe,T.count);else if(_.isInstancedBufferGeometry){const re=_._maxInstanceCount!==void 0?_._maxInstanceCount:1/0,Le=Math.min(_.instanceCount,re);ce.renderInstances(se,pe,Le)}else ce.render(se,pe)};function rt(A,d,_){A.transparent===!0&&A.side===xn&&A.forceSinglePass===!1?(A.side=Wt,A.needsUpdate=!0,wi(A,d,_),A.side=si,A.needsUpdate=!0,wi(A,d,_),A.side=xn):wi(A,d,_)}this.compile=function(A,d,_=null){_===null&&(_=A),g=Ve.get(_),g.init(d),w.push(g),_.traverseVisible(function(T){T.isLight&&T.layers.test(d.layers)&&(g.pushLight(T),T.castShadow&&g.pushShadow(T))}),A!==_&&A.traverseVisible(function(T){T.isLight&&T.layers.test(d.layers)&&(g.pushLight(T),T.castShadow&&g.pushShadow(T))}),g.setupLights();const M=new Set;return A.traverse(function(T){if(!(T.isMesh||T.isPoints||T.isLine||T.isSprite))return;const U=T.material;if(U)if(Array.isArray(U))for(let I=0;I<U.length;I++){const X=U[I];rt(X,_,T),M.add(X)}else rt(U,_,T),M.add(U)}),w.pop(),g=null,M},this.compileAsync=function(A,d,_=null){const M=this.compile(A,d,_);return new Promise(T=>{function U(){if(M.forEach(function(I){Be.get(I).currentProgram.isReady()&&M.delete(I)}),M.size===0){T(A);return}setTimeout(U,10)}qe.get("KHR_parallel_shader_compile")!==null?U():setTimeout(U,10)})};let Ft=null;function rn(A){Ft&&Ft(A)}function zr(){En.stop()}function kr(){En.start()}const En=new Su;En.setAnimationLoop(rn),typeof self<"u"&&En.setContext(self),this.setAnimationLoop=function(A){Ft=A,F.setAnimationLoop(A),A===null?En.stop():En.start()},F.addEventListener("sessionstart",zr),F.addEventListener("sessionend",kr),this.render=function(A,d){if(d!==void 0&&d.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),d.parent===null&&d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld(),F.enabled===!0&&F.isPresenting===!0&&(F.cameraAutoUpdate===!0&&F.updateCamera(d),d=F.getCamera()),A.isScene===!0&&A.onBeforeRender(E,A,d,P),g=Ve.get(A,w.length),g.init(d),w.push(g),ge.multiplyMatrices(d.projectionMatrix,d.matrixWorldInverse),Ne.setFromProjectionMatrix(ge),oe=this.localClippingEnabled,$=fe.init(this.clippingPlanes,oe),x=be.get(A,m.length),x.init(),m.push(x),F.enabled===!0&&F.isPresenting===!0){const U=E.xr.getDepthSensingMesh();U!==null&&hr(U,d,-1/0,E.sortObjects)}hr(A,d,0,E.sortObjects),x.finish(),E.sortObjects===!0&&x.sort(J,le),$e=F.enabled===!1||F.isPresenting===!1||F.hasDepthSensing()===!1,$e&&ze.addToRenderList(x,A),this.info.render.frame++,$===!0&&fe.beginShadows();const _=g.state.shadowsArray;Ee.render(_,A,d),$===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();const M=x.opaque,T=x.transmissive;if(g.setupLights(),d.isArrayCamera){const U=d.cameras;if(T.length>0)for(let I=0,X=U.length;I<X;I++){const K=U[I];fr(M,T,A,K)}$e&&ze.render(A);for(let I=0,X=U.length;I<X;I++){const K=U[I];Hr(x,A,K,K.viewport)}}else T.length>0&&fr(M,T,A,d),$e&&ze.render(A),Hr(x,A,d);P!==null&&(R.updateMultisampleRenderTarget(P),R.updateRenderTargetMipmap(P)),A.isScene===!0&&A.onAfterRender(E,A,d),He.resetDefaultState(),D=-1,H=null,w.pop(),w.length>0?(g=w[w.length-1],$===!0&&fe.setGlobalState(E.clippingPlanes,g.state.camera)):g=null,m.pop(),m.length>0?x=m[m.length-1]:x=null};function hr(A,d,_,M){if(A.visible===!1)return;if(A.layers.test(d.layers)){if(A.isGroup)_=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(d);else if(A.isLight)g.pushLight(A),A.castShadow&&g.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Ne.intersectsSprite(A)){M&&De.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ge);const I=ee.update(A),X=A.material;X.visible&&x.push(A,I,X,_,De.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Ne.intersectsObject(A))){const I=ee.update(A),X=A.material;if(M&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),De.copy(A.boundingSphere.center)):(I.boundingSphere===null&&I.computeBoundingSphere(),De.copy(I.boundingSphere.center)),De.applyMatrix4(A.matrixWorld).applyMatrix4(ge)),Array.isArray(X)){const K=I.groups;for(let Z=0,j=K.length;Z<j;Z++){const q=K[Z],se=X[q.materialIndex];se&&se.visible&&x.push(A,I,se,_,De.z,q)}}else X.visible&&x.push(A,I,X,_,De.z,null)}}const U=A.children;for(let I=0,X=U.length;I<X;I++)hr(U[I],d,_,M)}function Hr(A,d,_,M){const T=A.opaque,U=A.transmissive,I=A.transparent;g.setupLightsView(_),$===!0&&fe.setGlobalState(E.clippingPlanes,_),M&&Fe.viewport(y.copy(M)),T.length>0&&Ti(T,d,_),U.length>0&&Ti(U,d,_),I.length>0&&Ti(I,d,_),Fe.buffers.depth.setTest(!0),Fe.buffers.depth.setMask(!0),Fe.buffers.color.setMask(!0),Fe.setPolygonOffset(!1)}function fr(A,d,_,M){if((_.isScene===!0?_.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[M.id]===void 0&&(g.state.transmissionRenderTarget[M.id]=new yt(1,1,{generateMipmaps:!0,type:qe.has("EXT_color_buffer_half_float")||qe.has("EXT_color_buffer_float")?dt:kn,minFilter:ei,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ot.workingColorSpace}));const U=g.state.transmissionRenderTarget[M.id],I=M.viewport||y;U.setSize(I.z,I.w);const X=E.getRenderTarget();E.setRenderTarget(U),E.getClearColor(G),V=E.getClearAlpha(),V<1&&E.setClearColor(16777215,.5),E.clear(),$e&&ze.render(_);const K=E.toneMapping;E.toneMapping=ni;const Z=M.viewport;if(M.viewport!==void 0&&(M.viewport=void 0),g.setupLightsView(M),$===!0&&fe.setGlobalState(E.clippingPlanes,M),Ti(A,_,M),R.updateMultisampleRenderTarget(U),R.updateRenderTargetMipmap(U),qe.has("WEBGL_multisampled_render_to_texture")===!1){let j=!1;for(let q=0,se=d.length;q<se;q++){const de=d[q],pe=de.object,Ae=de.geometry,ce=de.material,re=de.group;if(ce.side===xn&&pe.layers.test(M.layers)){const Le=ce.side;ce.side=Wt,ce.needsUpdate=!0,Gr(pe,_,M,Ae,ce,re),ce.side=Le,ce.needsUpdate=!0,j=!0}}j===!0&&(R.updateMultisampleRenderTarget(U),R.updateRenderTargetMipmap(U))}E.setRenderTarget(X),E.setClearColor(G,V),Z!==void 0&&(M.viewport=Z),E.toneMapping=K}function Ti(A,d,_){const M=d.isScene===!0?d.overrideMaterial:null;for(let T=0,U=A.length;T<U;T++){const I=A[T],X=I.object,K=I.geometry,Z=M===null?I.material:M,j=I.group;X.layers.test(_.layers)&&Gr(X,d,_,K,Z,j)}}function Gr(A,d,_,M,T,U){A.onBeforeRender(E,d,_,M,T,U),A.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),T.onBeforeRender(E,d,_,M,A,U),T.transparent===!0&&T.side===xn&&T.forceSinglePass===!1?(T.side=Wt,T.needsUpdate=!0,E.renderBufferDirect(_,d,M,T,A,U),T.side=si,T.needsUpdate=!0,E.renderBufferDirect(_,d,M,T,A,U),T.side=xn):E.renderBufferDirect(_,d,M,T,A,U),A.onAfterRender(E,d,_,M,T,U)}function wi(A,d,_){d.isScene!==!0&&(d=ke);const M=Be.get(A),T=g.state.lights,U=g.state.shadowsArray,I=T.state.version,X=Re.getParameters(A,T.state,U,d,_),K=Re.getProgramCacheKey(X);let Z=M.programs;M.environment=A.isMeshStandardMaterial?d.environment:null,M.fog=d.fog,M.envMap=(A.isMeshStandardMaterial?Y:b).get(A.envMap||M.environment),M.envMapRotation=M.environment!==null&&A.envMap===null?d.environmentRotation:A.envMapRotation,Z===void 0&&(A.addEventListener("dispose",tt),Z=new Map,M.programs=Z);let j=Z.get(K);if(j!==void 0){if(M.currentProgram===j&&M.lightsStateVersion===I)return dr(A,X),j}else X.uniforms=Re.getUniforms(A),A.onBeforeCompile(X,E),j=Re.acquireProgram(X,K),Z.set(K,j),M.uniforms=X.uniforms;const q=M.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(q.clippingPlanes=fe.uniform),dr(A,X),M.needsLights=Tn(A),M.lightsStateVersion=I,M.needsLights&&(q.ambientLightColor.value=T.state.ambient,q.lightProbe.value=T.state.probe,q.directionalLights.value=T.state.directional,q.directionalLightShadows.value=T.state.directionalShadow,q.spotLights.value=T.state.spot,q.spotLightShadows.value=T.state.spotShadow,q.rectAreaLights.value=T.state.rectArea,q.ltc_1.value=T.state.rectAreaLTC1,q.ltc_2.value=T.state.rectAreaLTC2,q.pointLights.value=T.state.point,q.pointLightShadows.value=T.state.pointShadow,q.hemisphereLights.value=T.state.hemi,q.directionalShadowMap.value=T.state.directionalShadowMap,q.directionalShadowMatrix.value=T.state.directionalShadowMatrix,q.spotShadowMap.value=T.state.spotShadowMap,q.spotLightMatrix.value=T.state.spotLightMatrix,q.spotLightMap.value=T.state.spotLightMap,q.pointShadowMap.value=T.state.pointShadowMap,q.pointShadowMatrix.value=T.state.pointShadowMatrix),M.currentProgram=j,M.uniformsList=null,j}function Vr(A){if(A.uniformsList===null){const d=A.currentProgram.getUniforms();A.uniformsList=Os.seqWithValue(d.seq,A.uniforms)}return A.uniformsList}function dr(A,d){const _=Be.get(A);_.outputColorSpace=d.outputColorSpace,_.batching=d.batching,_.batchingColor=d.batchingColor,_.instancing=d.instancing,_.instancingColor=d.instancingColor,_.instancingMorph=d.instancingMorph,_.skinning=d.skinning,_.morphTargets=d.morphTargets,_.morphNormals=d.morphNormals,_.morphColors=d.morphColors,_.morphTargetsCount=d.morphTargetsCount,_.numClippingPlanes=d.numClippingPlanes,_.numIntersection=d.numClipIntersection,_.vertexAlphas=d.vertexAlphas,_.vertexTangents=d.vertexTangents,_.toneMapping=d.toneMapping}function Wr(A,d,_,M,T){d.isScene!==!0&&(d=ke),R.resetTextureUnits();const U=d.fog,I=M.isMeshStandardMaterial?d.environment:null,X=P===null?E.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:en,K=(M.isMeshStandardMaterial?Y:b).get(M.envMap||I),Z=M.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,j=!!_.attributes.tangent&&(!!M.normalMap||M.anisotropy>0),q=!!_.morphAttributes.position,se=!!_.morphAttributes.normal,de=!!_.morphAttributes.color;let pe=ni;M.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(pe=E.toneMapping);const Ae=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,ce=Ae!==void 0?Ae.length:0,re=Be.get(M),Le=g.state.lights;if($===!0&&(oe===!0||A!==H)){const Xe=A===H&&M.id===D;fe.setState(M,A,Xe)}let Ue=!1;M.version===re.__version?(re.needsLights&&re.lightsStateVersion!==Le.state.version||re.outputColorSpace!==X||T.isBatchedMesh&&re.batching===!1||!T.isBatchedMesh&&re.batching===!0||T.isBatchedMesh&&re.batchingColor===!0&&T.colorTexture===null||T.isBatchedMesh&&re.batchingColor===!1&&T.colorTexture!==null||T.isInstancedMesh&&re.instancing===!1||!T.isInstancedMesh&&re.instancing===!0||T.isSkinnedMesh&&re.skinning===!1||!T.isSkinnedMesh&&re.skinning===!0||T.isInstancedMesh&&re.instancingColor===!0&&T.instanceColor===null||T.isInstancedMesh&&re.instancingColor===!1&&T.instanceColor!==null||T.isInstancedMesh&&re.instancingMorph===!0&&T.morphTexture===null||T.isInstancedMesh&&re.instancingMorph===!1&&T.morphTexture!==null||re.envMap!==K||M.fog===!0&&re.fog!==U||re.numClippingPlanes!==void 0&&(re.numClippingPlanes!==fe.numPlanes||re.numIntersection!==fe.numIntersection)||re.vertexAlphas!==Z||re.vertexTangents!==j||re.morphTargets!==q||re.morphNormals!==se||re.morphColors!==de||re.toneMapping!==pe||re.morphTargetsCount!==ce)&&(Ue=!0):(Ue=!0,re.__version=M.version);let nt=re.currentProgram;Ue===!0&&(nt=wi(M,d,T));let bt=!1,Je=!1,et=!1;const Ye=nt.getUniforms(),xt=re.uniforms;if(Fe.useProgram(nt.program)&&(bt=!0,Je=!0,et=!0),M.id!==D&&(D=M.id,Je=!0),bt||H!==A){Qe.reverseDepthBuffer?(ue.copy(A.projectionMatrix),Bf(ue),zf(ue),Ye.setValue(N,"projectionMatrix",ue)):Ye.setValue(N,"projectionMatrix",A.projectionMatrix),Ye.setValue(N,"viewMatrix",A.matrixWorldInverse);const Xe=Ye.map.cameraPosition;Xe!==void 0&&Xe.setValue(N,Pe.setFromMatrixPosition(A.matrixWorld)),Qe.logarithmicDepthBuffer&&Ye.setValue(N,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(M.isMeshPhongMaterial||M.isMeshToonMaterial||M.isMeshLambertMaterial||M.isMeshBasicMaterial||M.isMeshStandardMaterial||M.isShaderMaterial)&&Ye.setValue(N,"isOrthographic",A.isOrthographicCamera===!0),H!==A&&(H=A,Je=!0,et=!0)}if(T.isSkinnedMesh){Ye.setOptional(N,T,"bindMatrix"),Ye.setOptional(N,T,"bindMatrixInverse");const Xe=T.skeleton;Xe&&(Xe.boneTexture===null&&Xe.computeBoneTexture(),Ye.setValue(N,"boneTexture",Xe.boneTexture,R))}T.isBatchedMesh&&(Ye.setOptional(N,T,"batchingTexture"),Ye.setValue(N,"batchingTexture",T._matricesTexture,R),Ye.setOptional(N,T,"batchingIdTexture"),Ye.setValue(N,"batchingIdTexture",T._indirectTexture,R),Ye.setOptional(N,T,"batchingColorTexture"),T._colorsTexture!==null&&Ye.setValue(N,"batchingColorTexture",T._colorsTexture,R));const vt=_.morphAttributes;if((vt.position!==void 0||vt.normal!==void 0||vt.color!==void 0)&&Ie.update(T,_,nt),(Je||re.receiveShadow!==T.receiveShadow)&&(re.receiveShadow=T.receiveShadow,Ye.setValue(N,"receiveShadow",T.receiveShadow)),M.isMeshGouraudMaterial&&M.envMap!==null&&(xt.envMap.value=K,xt.flipEnvMap.value=K.isCubeTexture&&K.isRenderTargetTexture===!1?-1:1),M.isMeshStandardMaterial&&M.envMap===null&&d.environment!==null&&(xt.envMapIntensity.value=d.environmentIntensity),Je&&(Ye.setValue(N,"toneMappingExposure",E.toneMappingExposure),re.needsLights&&Qs(xt,et),U&&M.fog===!0&&_e.refreshFogUniforms(xt,U),_e.refreshMaterialUniforms(xt,M,te,W,g.state.transmissionRenderTarget[A.id]),Os.upload(N,Vr(re),xt,R)),M.isShaderMaterial&&M.uniformsNeedUpdate===!0&&(Os.upload(N,Vr(re),xt,R),M.uniformsNeedUpdate=!1),M.isSpriteMaterial&&Ye.setValue(N,"center",T.center),Ye.setValue(N,"modelViewMatrix",T.modelViewMatrix),Ye.setValue(N,"normalMatrix",T.normalMatrix),Ye.setValue(N,"modelMatrix",T.matrixWorld),M.isShaderMaterial||M.isRawShaderMaterial){const Xe=M.uniformsGroups;for(let lt=0,sn=Xe.length;lt<sn;lt++){const Vn=Xe[lt];O.update(Vn,nt),O.bind(Vn,nt)}}return nt}function Qs(A,d){A.ambientLightColor.needsUpdate=d,A.lightProbe.needsUpdate=d,A.directionalLights.needsUpdate=d,A.directionalLightShadows.needsUpdate=d,A.pointLights.needsUpdate=d,A.pointLightShadows.needsUpdate=d,A.spotLights.needsUpdate=d,A.spotLightShadows.needsUpdate=d,A.rectAreaLights.needsUpdate=d,A.hemisphereLights.needsUpdate=d}function Tn(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(A,d,_){Be.get(A.texture).__webglTexture=d,Be.get(A.depthTexture).__webglTexture=_;const M=Be.get(A);M.__hasExternalTextures=!0,M.__autoAllocateDepthBuffer=_===void 0,M.__autoAllocateDepthBuffer||qe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),M.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,d){const _=Be.get(A);_.__webglFramebuffer=d,_.__useDefaultFramebuffer=d===void 0},this.setRenderTarget=function(A,d=0,_=0){P=A,B=d,L=_;let M=!0,T=null,U=!1,I=!1;if(A){const K=Be.get(A);if(K.__useDefaultFramebuffer!==void 0)Fe.bindFramebuffer(N.FRAMEBUFFER,null),M=!1;else if(K.__webglFramebuffer===void 0)R.setupRenderTarget(A);else if(K.__hasExternalTextures)R.rebindTextures(A,Be.get(A.texture).__webglTexture,Be.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const q=A.depthTexture;if(K.__boundDepthTexture!==q){if(q!==null&&Be.has(q)&&(A.width!==q.image.width||A.height!==q.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(A)}}const Z=A.texture;(Z.isData3DTexture||Z.isDataArrayTexture||Z.isCompressedArrayTexture)&&(I=!0);const j=Be.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(j[d])?T=j[d][_]:T=j[d],U=!0):A.samples>0&&R.useMultisampledRTT(A)===!1?T=Be.get(A).__webglMultisampledFramebuffer:Array.isArray(j)?T=j[_]:T=j,y.copy(A.viewport),S.copy(A.scissor),z=A.scissorTest}else y.copy(he).multiplyScalar(te).floor(),S.copy(Se).multiplyScalar(te).floor(),z=Ce;if(Fe.bindFramebuffer(N.FRAMEBUFFER,T)&&M&&Fe.drawBuffers(A,T),Fe.viewport(y),Fe.scissor(S),Fe.setScissorTest(z),U){const K=Be.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+d,K.__webglTexture,_)}else if(I){const K=Be.get(A.texture),Z=d||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,K.__webglTexture,_||0,Z)}D=-1},this.readRenderTargetPixels=function(A,d,_,M,T,U,I){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let X=Be.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&I!==void 0&&(X=X[I]),X){Fe.bindFramebuffer(N.FRAMEBUFFER,X);try{const K=A.texture,Z=K.format,j=K.type;if(!Qe.textureFormatReadable(Z)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Qe.textureTypeReadable(j)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}d>=0&&d<=A.width-M&&_>=0&&_<=A.height-T&&N.readPixels(d,_,M,T,Oe.convert(Z),Oe.convert(j),U)}finally{const K=P!==null?Be.get(P).__webglFramebuffer:null;Fe.bindFramebuffer(N.FRAMEBUFFER,K)}}},this.readRenderTargetPixelsAsync=async function(A,d,_,M,T,U,I){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let X=Be.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&I!==void 0&&(X=X[I]),X){const K=A.texture,Z=K.format,j=K.type;if(!Qe.textureFormatReadable(Z))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Qe.textureTypeReadable(j))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(d>=0&&d<=A.width-M&&_>=0&&_<=A.height-T){Fe.bindFramebuffer(N.FRAMEBUFFER,X);const q=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,q),N.bufferData(N.PIXEL_PACK_BUFFER,U.byteLength,N.STREAM_READ),N.readPixels(d,_,M,T,Oe.convert(Z),Oe.convert(j),0);const se=P!==null?Be.get(P).__webglFramebuffer:null;Fe.bindFramebuffer(N.FRAMEBUFFER,se);const de=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Ff(N,de,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,q),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,U),N.deleteBuffer(q),N.deleteSync(de),U}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,d=null,_=0){A.isTexture!==!0&&(Ns("WebGLRenderer: copyFramebufferToTexture function signature has changed."),d=arguments[0]||null,A=arguments[1]);const M=Math.pow(2,-_),T=Math.floor(A.image.width*M),U=Math.floor(A.image.height*M),I=d!==null?d.x:0,X=d!==null?d.y:0;R.setTexture2D(A,0),N.copyTexSubImage2D(N.TEXTURE_2D,_,0,0,I,X,T,U),Fe.unbindTexture()},this.copyTextureToTexture=function(A,d,_=null,M=null,T=0){A.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture function signature has changed."),M=arguments[0]||null,A=arguments[1],d=arguments[2],T=arguments[3]||0,_=null);let U,I,X,K,Z,j;_!==null?(U=_.max.x-_.min.x,I=_.max.y-_.min.y,X=_.min.x,K=_.min.y):(U=A.image.width,I=A.image.height,X=0,K=0),M!==null?(Z=M.x,j=M.y):(Z=0,j=0);const q=Oe.convert(d.format),se=Oe.convert(d.type);R.setTexture2D(d,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,d.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,d.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,d.unpackAlignment);const de=N.getParameter(N.UNPACK_ROW_LENGTH),pe=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Ae=N.getParameter(N.UNPACK_SKIP_PIXELS),ce=N.getParameter(N.UNPACK_SKIP_ROWS),re=N.getParameter(N.UNPACK_SKIP_IMAGES),Le=A.isCompressedTexture?A.mipmaps[T]:A.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,Le.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Le.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,X),N.pixelStorei(N.UNPACK_SKIP_ROWS,K),A.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,T,Z,j,U,I,q,se,Le.data):A.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,T,Z,j,Le.width,Le.height,q,Le.data):N.texSubImage2D(N.TEXTURE_2D,T,Z,j,U,I,q,se,Le),N.pixelStorei(N.UNPACK_ROW_LENGTH,de),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,pe),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ae),N.pixelStorei(N.UNPACK_SKIP_ROWS,ce),N.pixelStorei(N.UNPACK_SKIP_IMAGES,re),T===0&&d.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),Fe.unbindTexture()},this.copyTextureToTexture3D=function(A,d,_=null,M=null,T=0){A.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture3D function signature has changed."),_=arguments[0]||null,M=arguments[1]||null,A=arguments[2],d=arguments[3],T=arguments[4]||0);let U,I,X,K,Z,j,q,se,de;const pe=A.isCompressedTexture?A.mipmaps[T]:A.image;_!==null?(U=_.max.x-_.min.x,I=_.max.y-_.min.y,X=_.max.z-_.min.z,K=_.min.x,Z=_.min.y,j=_.min.z):(U=pe.width,I=pe.height,X=pe.depth,K=0,Z=0,j=0),M!==null?(q=M.x,se=M.y,de=M.z):(q=0,se=0,de=0);const Ae=Oe.convert(d.format),ce=Oe.convert(d.type);let re;if(d.isData3DTexture)R.setTexture3D(d,0),re=N.TEXTURE_3D;else if(d.isDataArrayTexture||d.isCompressedArrayTexture)R.setTexture2DArray(d,0),re=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,d.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,d.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,d.unpackAlignment);const Le=N.getParameter(N.UNPACK_ROW_LENGTH),Ue=N.getParameter(N.UNPACK_IMAGE_HEIGHT),nt=N.getParameter(N.UNPACK_SKIP_PIXELS),bt=N.getParameter(N.UNPACK_SKIP_ROWS),Je=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,pe.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,pe.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,K),N.pixelStorei(N.UNPACK_SKIP_ROWS,Z),N.pixelStorei(N.UNPACK_SKIP_IMAGES,j),A.isDataTexture||A.isData3DTexture?N.texSubImage3D(re,T,q,se,de,U,I,X,Ae,ce,pe.data):d.isCompressedArrayTexture?N.compressedTexSubImage3D(re,T,q,se,de,U,I,X,Ae,pe.data):N.texSubImage3D(re,T,q,se,de,U,I,X,Ae,ce,pe),N.pixelStorei(N.UNPACK_ROW_LENGTH,Le),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ue),N.pixelStorei(N.UNPACK_SKIP_PIXELS,nt),N.pixelStorei(N.UNPACK_SKIP_ROWS,bt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Je),T===0&&d.generateMipmaps&&N.generateMipmap(re),Fe.unbindTexture()},this.initRenderTarget=function(A){Be.get(A).__webglFramebuffer===void 0&&R.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?R.setTextureCube(A,0):A.isData3DTexture?R.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?R.setTexture2DArray(A,0):R.setTexture2D(A,0),Fe.unbindTexture()},this.resetState=function(){B=0,L=0,P=null,Fe.reset(),He.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===rl?"display-p3":"srgb",t.unpackColorSpace=ot.workingColorSpace===Ys?"display-p3":"srgb"}}class Ks{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ge(e),this.density=t}clone(){return new Ks(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Au extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const ms=new k,mc=new k;class Qv extends Mt{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,r=t.length;n<r;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const r=this.levels;let s;for(s=0;s<r.length&&!(t<r[s].distance);s++);return r.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const r=t.splice(n,1);return this.remove(r[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,r;for(n=1,r=t.length;n<r;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){ms.setFromMatrixPosition(this.matrixWorld);const r=e.ray.origin.distanceTo(ms);this.getObjectForDistance(r).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){ms.setFromMatrixPosition(e.matrixWorld),mc.setFromMatrixPosition(this.matrixWorld);const n=ms.distanceTo(mc)/e.zoom;t[0].object.visible=!0;let r,s;for(r=1,s=t.length;r<s;r++){let a=t[r].distance;if(t[r].object.visible&&(a-=a*t[r].hysteresis),n>=a)t[r-1].object.visible=!1,t[r].object.visible=!0;else break}for(this._currentLevel=r-1;r<s;r++)t[r].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let r=0,s=n.length;r<s;r++){const a=n[r];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}}class ul extends Nt{constructor(e=null,t=1,n=1,r,s,a,l,u,h=ct,p=ct,o,c){super(null,a,l,u,h,p,r,s,o,c),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fa extends Zt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Hi=new at,gc=new at,gs=[],vc=new ci,$v=new at,yr=new Tt,Mr=new Fr;class Js extends Tt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Fa(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,$v)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ci),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hi),vc.copy(e.boundingBox).applyMatrix4(Hi),this.boundingBox.union(vc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hi),Mr.copy(e.boundingSphere).applyMatrix4(Hi),this.boundingSphere.union(Mr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let l=0;l<n.length;l++)n[l]=r[a+l]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(yr.geometry=this.geometry,yr.material=this.material,yr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mr.copy(this.boundingSphere),Mr.applyMatrix4(n),e.ray.intersectsSphere(Mr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Hi),gc.multiplyMatrices(n,Hi),yr.matrixWorld=gc,yr.raycast(e,gs);for(let a=0,l=gs.length;a<l;a++){const u=gs[a];u.instanceId=s,u.object=this,t.push(u)}gs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Fa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ul(new Float32Array(r*this.count),r,this.count,Nr,Ut));const s=this.morphTexture.source.data.data;let a=0;for(let h=0;h<n.length;h++)a+=n[h];const l=this.geometry.morphTargetsRelative?1:1-a,u=r*e;s[u]=l,s.set(n,u+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Sn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let r=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let l=0,u=s-1,h;for(;l<=u;)if(r=Math.floor(l+(u-l)/2),h=n[r]-a,h<0)l=r+1;else if(h>0)u=r-1;else{u=r;break}if(r=u,n[r]===a)return r/(s-1);const p=n[r],c=n[r+1]-p,f=(a-p)/c;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),l=this.getPoint(s),u=t||(a.isVector2?new ve:new k);return u.copy(l).sub(a).normalize(),u}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new k,r=[],s=[],a=[],l=new k,u=new at;for(let f=0;f<=e;f++){const v=f/e;r[f]=this.getTangentAt(v,new k)}s[0]=new k,a[0]=new k;let h=Number.MAX_VALUE;const p=Math.abs(r[0].x),o=Math.abs(r[0].y),c=Math.abs(r[0].z);p<=h&&(h=p,n.set(1,0,0)),o<=h&&(h=o,n.set(0,1,0)),c<=h&&n.set(0,0,1),l.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],l),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),l.crossVectors(r[f-1],r[f]),l.length()>Number.EPSILON){l.normalize();const v=Math.acos(At(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(u.makeRotationAxis(l,v))}a[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(At(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(l.crossVectors(s[0],s[e]))>0&&(f=-f);for(let v=1;v<=e;v++)s[v].applyMatrix4(u.makeRotationAxis(r[v],f*v)),a[v].crossVectors(r[v],s[v])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class hl extends Sn{constructor(e=0,t=0,n=1,r=1,s=0,a=Math.PI*2,l=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=l,this.aRotation=u}getPoint(e,t=new ve){const n=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const l=this.aStartAngle+e*s;let u=this.aX+this.xRadius*Math.cos(l),h=this.aY+this.yRadius*Math.sin(l);if(this.aRotation!==0){const p=Math.cos(this.aRotation),o=Math.sin(this.aRotation),c=u-this.aX,f=h-this.aY;u=c*p-f*o+this.aX,h=c*o+f*p+this.aY}return n.set(u,h)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class e0 extends hl{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function fl(){let i=0,e=0,t=0,n=0;function r(s,a,l,u){i=s,e=l,t=-3*s+3*a-2*l-u,n=2*s-2*a+l+u}return{initCatmullRom:function(s,a,l,u,h){r(a,l,h*(l-s),h*(u-a))},initNonuniformCatmullRom:function(s,a,l,u,h,p,o){let c=(a-s)/h-(l-s)/(h+p)+(l-a)/p,f=(l-a)/p-(u-a)/(p+o)+(u-l)/o;c*=p,f*=p,r(a,l,c,f)},calc:function(s){const a=s*s,l=a*s;return i+e*s+t*a+n*l}}}const vs=new k,Do=new fl,Io=new fl,Uo=new fl;class t0 extends Sn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new k){const n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let l=Math.floor(a),u=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:u===0&&l===s-1&&(l=s-2,u=1);let h,p;this.closed||l>0?h=r[(l-1)%s]:(vs.subVectors(r[0],r[1]).add(r[0]),h=vs);const o=r[l%s],c=r[(l+1)%s];if(this.closed||l+2<s?p=r[(l+2)%s]:(vs.subVectors(r[s-1],r[s-2]).add(r[s-1]),p=vs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let v=Math.pow(h.distanceToSquared(o),f),x=Math.pow(o.distanceToSquared(c),f),g=Math.pow(c.distanceToSquared(p),f);x<1e-4&&(x=1),v<1e-4&&(v=x),g<1e-4&&(g=x),Do.initNonuniformCatmullRom(h.x,o.x,c.x,p.x,v,x,g),Io.initNonuniformCatmullRom(h.y,o.y,c.y,p.y,v,x,g),Uo.initNonuniformCatmullRom(h.z,o.z,c.z,p.z,v,x,g)}else this.curveType==="catmullrom"&&(Do.initCatmullRom(h.x,o.x,c.x,p.x,this.tension),Io.initCatmullRom(h.y,o.y,c.y,p.y,this.tension),Uo.initCatmullRom(h.z,o.z,c.z,p.z,this.tension));return n.set(Do.calc(u),Io.calc(u),Uo.calc(u)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new k().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function _c(i,e,t,n,r){const s=(n-e)*.5,a=(r-t)*.5,l=i*i,u=i*l;return(2*t-2*n+s+a)*u+(-3*t+3*n-2*s-a)*l+s*i+t}function n0(i,e){const t=1-i;return t*t*e}function i0(i,e){return 2*(1-i)*i*e}function r0(i,e){return i*i*e}function Ar(i,e,t,n){return n0(i,e)+i0(i,t)+r0(i,n)}function s0(i,e){const t=1-i;return t*t*t*e}function o0(i,e){const t=1-i;return 3*t*t*i*e}function a0(i,e){return 3*(1-i)*i*i*e}function l0(i,e){return i*i*i*e}function Cr(i,e,t,n,r){return s0(i,e)+o0(i,t)+a0(i,n)+l0(i,r)}class Cu extends Sn{constructor(e=new ve,t=new ve,n=new ve,r=new ve){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ve){const n=t,r=this.v0,s=this.v1,a=this.v2,l=this.v3;return n.set(Cr(e,r.x,s.x,a.x,l.x),Cr(e,r.y,s.y,a.y,l.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class c0 extends Sn{constructor(e=new k,t=new k,n=new k,r=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new k){const n=t,r=this.v0,s=this.v1,a=this.v2,l=this.v3;return n.set(Cr(e,r.x,s.x,a.x,l.x),Cr(e,r.y,s.y,a.y,l.y),Cr(e,r.z,s.z,a.z,l.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ru extends Sn{constructor(e=new ve,t=new ve){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ve){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ve){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class u0 extends Sn{constructor(e=new k,t=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new k){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new k){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Pu extends Sn{constructor(e=new ve,t=new ve,n=new ve){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ve){const n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ar(e,r.x,s.x,a.x),Ar(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class h0 extends Sn{constructor(e=new k,t=new k,n=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new k){const n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ar(e,r.x,s.x,a.x),Ar(e,r.y,s.y,a.y),Ar(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Lu extends Sn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ve){const n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),l=s-a,u=r[a===0?a:a-1],h=r[a],p=r[a>r.length-2?r.length-1:a+1],o=r[a>r.length-3?r.length-1:a+2];return n.set(_c(l,u.x,h.x,p.x,o.x),_c(l,u.y,h.y,p.y,o.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new ve().fromArray(r))}return this}}var xc=Object.freeze({__proto__:null,ArcCurve:e0,CatmullRomCurve3:t0,CubicBezierCurve:Cu,CubicBezierCurve3:c0,EllipseCurve:hl,LineCurve:Ru,LineCurve3:u0,QuadraticBezierCurve:Pu,QuadraticBezierCurve3:h0,SplineCurve:Lu});class f0 extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new xc[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const a=r[s]-n,l=this.curves[s],u=l.getLength(),h=u===0?0:1-a/u;return l.getPointAt(h,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],l=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,u=a.getPoints(l);for(let h=0;h<u.length;h++){const p=u[h];n&&n.equals(p)||(t.push(p),n=p)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new xc[r.type]().fromJSON(r))}return this}}class d0 extends f0{constructor(e){super(),this.type="Path",this.currentPoint=new ve,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Ru(this.currentPoint.clone(),new ve(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new Pu(this.currentPoint.clone(),new ve(e,t),new ve(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){const l=new Cu(this.currentPoint.clone(),new ve(e,t),new ve(n,r),new ve(s,a));return this.curves.push(l),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Lu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(e+l,t+u,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,l,u){const h=this.currentPoint.x,p=this.currentPoint.y;return this.absellipse(e+h,t+p,n,r,s,a,l,u),this}absellipse(e,t,n,r,s,a,l,u){const h=new hl(e,t,n,r,s,a,l,u);if(this.curves.length>0){const o=h.getPoint(0);o.equals(this.currentPoint)||this.lineTo(o.x,o.y)}this.curves.push(h);const p=h.getPoint(1);return this.currentPoint.copy(p),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class dl extends nn{constructor(e=[new ve(0,-.5),new ve(.5,0),new ve(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=At(r,0,Math.PI*2);const s=[],a=[],l=[],u=[],h=[],p=1/t,o=new k,c=new ve,f=new k,v=new k,x=new k;let g=0,m=0;for(let w=0;w<=e.length-1;w++)switch(w){case 0:g=e[w+1].x-e[w].x,m=e[w+1].y-e[w].y,f.x=m*1,f.y=-g,f.z=m*0,x.copy(f),f.normalize(),u.push(f.x,f.y,f.z);break;case e.length-1:u.push(x.x,x.y,x.z);break;default:g=e[w+1].x-e[w].x,m=e[w+1].y-e[w].y,f.x=m*1,f.y=-g,f.z=m*0,v.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),u.push(f.x,f.y,f.z),x.copy(v)}for(let w=0;w<=t;w++){const E=n+w*p*r,C=Math.sin(E),B=Math.cos(E);for(let L=0;L<=e.length-1;L++){o.x=e[L].x*C,o.y=e[L].y,o.z=e[L].x*B,a.push(o.x,o.y,o.z),c.x=w/t,c.y=L/(e.length-1),l.push(c.x,c.y);const P=u[3*L+0]*C,D=u[3*L+1],H=u[3*L+0]*B;h.push(P,D,H)}}for(let w=0;w<t;w++)for(let E=0;E<e.length-1;E++){const C=E+w*e.length,B=C,L=C+e.length,P=C+e.length+1,D=C+1;s.push(B,L,D),s.push(P,D,L)}this.setIndex(s),this.setAttribute("position",new Dt(a,3)),this.setAttribute("uv",new Dt(l,2)),this.setAttribute("normal",new Dt(h,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dl(e.points,e.segments,e.phiStart,e.phiLength)}}class pl extends dl{constructor(e=1,t=1,n=4,r=8){const s=new d0;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:r}}static fromJSON(e){return new pl(e.radius,e.length,e.capSegments,e.radialSegments)}}class cr extends nn{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,l=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:l,thetaLength:u};const h=this;r=Math.floor(r),s=Math.floor(s);const p=[],o=[],c=[],f=[];let v=0;const x=[],g=n/2;let m=0;w(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(p),this.setAttribute("position",new Dt(o,3)),this.setAttribute("normal",new Dt(c,3)),this.setAttribute("uv",new Dt(f,2));function w(){const C=new k,B=new k;let L=0;const P=(t-e)/n;for(let D=0;D<=s;D++){const H=[],y=D/s,S=y*(t-e)+e;for(let z=0;z<=r;z++){const G=z/r,V=G*u+l,Q=Math.sin(V),W=Math.cos(V);B.x=S*Q,B.y=-y*n+g,B.z=S*W,o.push(B.x,B.y,B.z),C.set(Q,P,W).normalize(),c.push(C.x,C.y,C.z),f.push(G,1-y),H.push(v++)}x.push(H)}for(let D=0;D<r;D++)for(let H=0;H<s;H++){const y=x[H][D],S=x[H+1][D],z=x[H+1][D+1],G=x[H][D+1];e>0&&(p.push(y,S,G),L+=3),t>0&&(p.push(S,z,G),L+=3)}h.addGroup(m,L,0),m+=L}function E(C){const B=v,L=new ve,P=new k;let D=0;const H=C===!0?e:t,y=C===!0?1:-1;for(let z=1;z<=r;z++)o.push(0,g*y,0),c.push(0,y,0),f.push(.5,.5),v++;const S=v;for(let z=0;z<=r;z++){const V=z/r*u+l,Q=Math.cos(V),W=Math.sin(V);P.x=H*W,P.y=g*y,P.z=H*Q,o.push(P.x,P.y,P.z),c.push(0,y,0),L.x=Q*.5+.5,L.y=W*.5*y+.5,f.push(L.x,L.y),v++}for(let z=0;z<r;z++){const G=B+z,V=S+z;C===!0?p.push(V,V+1,G):p.push(V+1,V,G),D+=3}h.addGroup(m,D,C===!0?1:2),m+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class xi extends cr{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,l=Math.PI*2){super(0,e,t,n,r,s,a,l),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:l}}static fromJSON(e){return new xi(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class yi extends nn{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:l},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const u=Math.min(a+l,Math.PI);let h=0;const p=[],o=new k,c=new k,f=[],v=[],x=[],g=[];for(let m=0;m<=n;m++){const w=[],E=m/n;let C=0;m===0&&a===0?C=.5/t:m===n&&u===Math.PI&&(C=-.5/t);for(let B=0;B<=t;B++){const L=B/t;o.x=-e*Math.cos(r+L*s)*Math.sin(a+E*l),o.y=e*Math.cos(a+E*l),o.z=e*Math.sin(r+L*s)*Math.sin(a+E*l),v.push(o.x,o.y,o.z),c.copy(o).normalize(),x.push(c.x,c.y,c.z),g.push(L+C,1-E),w.push(h++)}p.push(w)}for(let m=0;m<n;m++)for(let w=0;w<t;w++){const E=p[m][w+1],C=p[m][w],B=p[m+1][w],L=p[m+1][w+1];(m!==0||a>0)&&f.push(E,C,L),(m!==n-1||u<Math.PI)&&f.push(C,B,L)}this.setIndex(f),this.setAttribute("position",new Dt(v,3)),this.setAttribute("normal",new Dt(x,3)),this.setAttribute("uv",new Dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class p0 extends ut{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ii extends sr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=il,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Du extends sr{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=il,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}const yc={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class m0{constructor(e,t,n){const r=this;let s=!1,a=0,l=0,u;const h=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(p){l++,s===!1&&r.onStart!==void 0&&r.onStart(p,a,l),s=!0},this.itemEnd=function(p){a++,r.onProgress!==void 0&&r.onProgress(p,a,l),a===l&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(p){r.onError!==void 0&&r.onError(p)},this.resolveURL=function(p){return u?u(p):p},this.setURLModifier=function(p){return u=p,this},this.addHandler=function(p,o){return h.push(p,o),this},this.removeHandler=function(p){const o=h.indexOf(p);return o!==-1&&h.splice(o,2),this},this.getHandler=function(p){for(let o=0,c=h.length;o<c;o+=2){const f=h[o],v=h[o+1];if(f.global&&(f.lastIndex=0),f.test(p))return v}return null}}}const g0=new m0;class ml{constructor(e){this.manager=e!==void 0?e:g0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ml.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ln={};class v0 extends Error{constructor(e,t){super(e),this.response=t}}class _0 extends ml{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=yc.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Ln[e]!==void 0){Ln[e].push({onLoad:t,onProgress:n,onError:r});return}Ln[e]=[],Ln[e].push({onLoad:t,onProgress:n,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),l=this.mimeType,u=this.responseType;fetch(a).then(h=>{if(h.status===200||h.status===0){if(h.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||h.body===void 0||h.body.getReader===void 0)return h;const p=Ln[e],o=h.body.getReader(),c=h.headers.get("X-File-Size")||h.headers.get("Content-Length"),f=c?parseInt(c):0,v=f!==0;let x=0;const g=new ReadableStream({start(m){w();function w(){o.read().then(({done:E,value:C})=>{if(E)m.close();else{x+=C.byteLength;const B=new ProgressEvent("progress",{lengthComputable:v,loaded:x,total:f});for(let L=0,P=p.length;L<P;L++){const D=p[L];D.onProgress&&D.onProgress(B)}m.enqueue(C),w()}},E=>{m.error(E)})}}});return new Response(g)}else throw new v0(`fetch for "${h.url}" responded with ${h.status}: ${h.statusText}`,h)}).then(h=>{switch(u){case"arraybuffer":return h.arrayBuffer();case"blob":return h.blob();case"document":return h.text().then(p=>new DOMParser().parseFromString(p,l));case"json":return h.json();default:if(l===void 0)return h.text();{const o=/charset="?([^;"\s]*)"?/i.exec(l),c=o&&o[1]?o[1].toLowerCase():void 0,f=new TextDecoder(c);return h.arrayBuffer().then(v=>f.decode(v))}}}).then(h=>{yc.add(e,h);const p=Ln[e];delete Ln[e];for(let o=0,c=p.length;o<c;o++){const f=p[o];f.onLoad&&f.onLoad(h)}}).catch(h=>{const p=Ln[e];if(p===void 0)throw this.manager.itemError(e),h;delete Ln[e];for(let o=0,c=p.length;o<c;o++){const f=p[o];f.onError&&f.onError(h)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Iu extends ml{constructor(e){super(e)}load(e,t,n,r){const s=this,a=new ul,l=new _0(this.manager);return l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setPath(this.path),l.setWithCredentials(s.withCredentials),l.load(e,function(u){let h;try{h=s.parse(u)}catch(p){if(r!==void 0)r(p);else{console.error(p);return}}h.image!==void 0?a.image=h.image:h.data!==void 0&&(a.image.width=h.width,a.image.height=h.height,a.image.data=h.data),a.wrapS=h.wrapS!==void 0?h.wrapS:On,a.wrapT=h.wrapT!==void 0?h.wrapT:On,a.magFilter=h.magFilter!==void 0?h.magFilter:Ct,a.minFilter=h.minFilter!==void 0?h.minFilter:Ct,a.anisotropy=h.anisotropy!==void 0?h.anisotropy:1,h.colorSpace!==void 0&&(a.colorSpace=h.colorSpace),h.flipY!==void 0&&(a.flipY=h.flipY),h.format!==void 0&&(a.format=h.format),h.type!==void 0&&(a.type=h.type),h.mipmaps!==void 0&&(a.mipmaps=h.mipmaps,a.minFilter=ei),h.mipmapCount===1&&(a.minFilter=Ct),h.generateMipmaps!==void 0&&(a.generateMipmaps=h.generateMipmaps),a.needsUpdate=!0,t&&t(a,h)},n,r),a}}class Uu extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class x0 extends Uu{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ge(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const No=new at,Mc=new k,Sc=new k;class y0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ve(512,512),this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new al,this._frameExtents=new ve(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Mc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mc),Sc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sc),t.updateMatrixWorld(),No.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(No),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(No)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class M0 extends y0{constructor(){super(new ll(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class S0 extends Uu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new M0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class b0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=bc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=bc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function bc(){return performance.now()}const Ec=new at;class Nu{constructor(e,t,n=0,r=1/0){this.ray=new mu(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new ol,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ec.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ec),this}intersectObject(e,t=!0,n=[]){return Ba(e,this,n,t),n.sort(Tc),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Ba(e[r],this,n,t);return n.sort(Tc),n}}function Tc(i,e){return i.distance-e.distance}function Ba(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,l=s.length;a<l;a++)Ba(s[a],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ja}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ja);const ri={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Gn{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const E0=new ll(-1,1,1,-1,0,1);class T0 extends nn{constructor(){super(),this.setAttribute("position",new Dt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Dt([0,2,0,0,2,0],2))}}const w0=new T0;class ur{constructor(e){this._mesh=new Tt(w0,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,E0)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class A0 extends Gn{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof ut?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=It.clone(e.uniforms),this.material=new ut({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ur(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class wc extends Gn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,l;this.inverse?(a=0,l=1):(a=1,l=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(l),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class C0 extends Gn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class R0{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ve);this._width=n.width,this._height=n.height,t=new yt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:dt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new A0(ri),this.copyPass.material.blending=ft,this.clock=new b0}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let r=0,s=this.passes.length;r<s;r++){const a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const l=this.renderer.getContext(),u=this.renderer.state.buffers.stencil;u.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),u.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}wc!==void 0&&(a instanceof wc?n=!0:a instanceof C0&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ve);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class P0 extends Gn{constructor(e,t,n=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ge}render(e,t,n){const r=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}}const L0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ge(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class er extends Gn{constructor(e,t,n,r){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=r,this.resolution=e!==void 0?new ve(e.x,e.y):new ve(256,256),this.clearColor=new Ge(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new yt(s,a,{type:dt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let o=0;o<this.nMips;o++){const c=new yt(s,a,{type:dt});c.texture.name="UnrealBloomPass.h"+o,c.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(c);const f=new yt(s,a,{type:dt});f.texture.name="UnrealBloomPass.v"+o,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),a=Math.round(a/2)}const l=L0;this.highPassUniforms=It.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ut({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}),this.separableBlurMaterials=[];const u=[3,5,7,9,11];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let o=0;o<this.nMips;o++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(u[o])),this.separableBlurMaterials[o].uniforms.invSize.value=new ve(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const p=ri;this.copyUniforms=It.clone(p.uniforms),this.blendMaterial=new ut({uniforms:this.copyUniforms,vertexShader:p.vertexShader,fragmentShader:p.fragmentShader,blending:Ko,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ge,this.oldClearAlpha=1,this.basic=new Ei,this.fsQuad=new ur(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,r),this.renderTargetsVertical[s].setSize(n,r),this.separableBlurMaterials[s].uniforms.invSize.value=new ve(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(e,t,n,r,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let l=this.renderTargetBright;for(let u=0;u<this.nMips;u++)this.fsQuad.material=this.separableBlurMaterials[u],this.separableBlurMaterials[u].uniforms.colorTexture.value=l.texture,this.separableBlurMaterials[u].uniforms.direction.value=er.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[u]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[u].uniforms.colorTexture.value=this.renderTargetsHorizontal[u].texture,this.separableBlurMaterials[u].uniforms.direction.value=er.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[u]),e.clear(),this.fsQuad.render(e),l=this.renderTargetsVertical[u];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new ut({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ve(.5,.5)},direction:{value:new ve(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new ut({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}er.BlurDirectionX=new ve(1,0);er.BlurDirectionY=new ve(0,1);class D0{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,t,n){return e[0]*t+e[1]*n}dot3(e,t,n,r){return e[0]*t+e[1]*n+e[2]*r}dot4(e,t,n,r,s){return e[0]*t+e[1]*n+e[2]*r+e[3]*s}noise(e,t){let n,r,s;const a=.5*(Math.sqrt(3)-1),l=(e+t)*a,u=Math.floor(e+l),h=Math.floor(t+l),p=(3-Math.sqrt(3))/6,o=(u+h)*p,c=u-o,f=h-o,v=e-c,x=t-f;let g,m;v>x?(g=1,m=0):(g=0,m=1);const w=v-g+p,E=x-m+p,C=v-1+2*p,B=x-1+2*p,L=u&255,P=h&255,D=this.perm[L+this.perm[P]]%12,H=this.perm[L+g+this.perm[P+m]]%12,y=this.perm[L+1+this.perm[P+1]]%12;let S=.5-v*v-x*x;S<0?n=0:(S*=S,n=S*S*this.dot(this.grad3[D],v,x));let z=.5-w*w-E*E;z<0?r=0:(z*=z,r=z*z*this.dot(this.grad3[H],w,E));let G=.5-C*C-B*B;return G<0?s=0:(G*=G,s=G*G*this.dot(this.grad3[y],C,B)),70*(n+r+s)}noise3d(e,t,n){let r,s,a,l;const h=(e+t+n)*.3333333333333333,p=Math.floor(e+h),o=Math.floor(t+h),c=Math.floor(n+h),f=1/6,v=(p+o+c)*f,x=p-v,g=o-v,m=c-v,w=e-x,E=t-g,C=n-m;let B,L,P,D,H,y;w>=E?E>=C?(B=1,L=0,P=0,D=1,H=1,y=0):w>=C?(B=1,L=0,P=0,D=1,H=0,y=1):(B=0,L=0,P=1,D=1,H=0,y=1):E<C?(B=0,L=0,P=1,D=0,H=1,y=1):w<C?(B=0,L=1,P=0,D=0,H=1,y=1):(B=0,L=1,P=0,D=1,H=1,y=0);const S=w-B+f,z=E-L+f,G=C-P+f,V=w-D+2*f,Q=E-H+2*f,W=C-y+2*f,te=w-1+3*f,J=E-1+3*f,le=C-1+3*f,he=p&255,Se=o&255,Ce=c&255,Ne=this.perm[he+this.perm[Se+this.perm[Ce]]]%12,$=this.perm[he+B+this.perm[Se+L+this.perm[Ce+P]]]%12,oe=this.perm[he+D+this.perm[Se+H+this.perm[Ce+y]]]%12,ue=this.perm[he+1+this.perm[Se+1+this.perm[Ce+1]]]%12;let ge=.6-w*w-E*E-C*C;ge<0?r=0:(ge*=ge,r=ge*ge*this.dot3(this.grad3[Ne],w,E,C));let Pe=.6-S*S-z*z-G*G;Pe<0?s=0:(Pe*=Pe,s=Pe*Pe*this.dot3(this.grad3[$],S,z,G));let De=.6-V*V-Q*Q-W*W;De<0?a=0:(De*=De,a=De*De*this.dot3(this.grad3[oe],V,Q,W));let ke=.6-te*te-J*J-le*le;return ke<0?l=0:(ke*=ke,l=ke*ke*this.dot3(this.grad3[ue],te,J,le)),32*(r+s+a+l)}noise4d(e,t,n,r){const s=this.grad4,a=this.simplex,l=this.perm,u=(Math.sqrt(5)-1)/4,h=(5-Math.sqrt(5))/20;let p,o,c,f,v;const x=(e+t+n+r)*u,g=Math.floor(e+x),m=Math.floor(t+x),w=Math.floor(n+x),E=Math.floor(r+x),C=(g+m+w+E)*h,B=g-C,L=m-C,P=w-C,D=E-C,H=e-B,y=t-L,S=n-P,z=r-D,G=H>y?32:0,V=H>S?16:0,Q=y>S?8:0,W=H>z?4:0,te=y>z?2:0,J=S>z?1:0,le=G+V+Q+W+te+J,he=a[le][0]>=3?1:0,Se=a[le][1]>=3?1:0,Ce=a[le][2]>=3?1:0,Ne=a[le][3]>=3?1:0,$=a[le][0]>=2?1:0,oe=a[le][1]>=2?1:0,ue=a[le][2]>=2?1:0,ge=a[le][3]>=2?1:0,Pe=a[le][0]>=1?1:0,De=a[le][1]>=1?1:0,ke=a[le][2]>=1?1:0,$e=a[le][3]>=1?1:0,We=H-he+h,N=y-Se+h,St=S-Ce+h,qe=z-Ne+h,Qe=H-$+2*h,Fe=y-oe+2*h,st=S-ue+2*h,Be=z-ge+2*h,R=H-Pe+3*h,b=y-De+3*h,Y=S-ke+3*h,ne=z-$e+3*h,ae=H-1+4*h,ee=y-1+4*h,Re=S-1+4*h,_e=z-1+4*h,be=g&255,Ve=m&255,fe=w&255,Ee=E&255,ze=l[be+l[Ve+l[fe+l[Ee]]]]%32,Ie=l[be+he+l[Ve+Se+l[fe+Ce+l[Ee+Ne]]]]%32,xe=l[be+$+l[Ve+oe+l[fe+ue+l[Ee+ge]]]]%32,Ke=l[be+Pe+l[Ve+De+l[fe+ke+l[Ee+$e]]]]%32,Oe=l[be+1+l[Ve+1+l[fe+1+l[Ee+1]]]]%32;let He=.6-H*H-y*y-S*S-z*z;He<0?p=0:(He*=He,p=He*He*this.dot4(s[ze],H,y,S,z));let O=.6-We*We-N*N-St*St-qe*qe;O<0?o=0:(O*=O,o=O*O*this.dot4(s[Ie],We,N,St,qe));let ye=.6-Qe*Qe-Fe*Fe-st*st-Be*Be;ye<0?c=0:(ye*=ye,c=ye*ye*this.dot4(s[xe],Qe,Fe,st,Be));let F=.6-R*R-b*b-Y*Y-ne*ne;F<0?f=0:(F*=F,f=F*F*this.dot4(s[Ke],R,b,Y,ne));let ie=.6-ae*ae-ee*ee-Re*Re-_e*_e;return ie<0?v=0:(ie*=ie,v=ie*ie*this.dot4(s[Oe],ae,ee,Re,_e)),27*(p+o+c+f+v)}}const _s={defines:{PERSPECTIVE_CAMERA:1,KERNEL_SIZE:32},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},kernel:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new ve},cameraProjectionMatrix:{value:new at},cameraInverseProjectionMatrix:{value:new at},kernelRadius:{value:8},minDistance:{value:.005},maxDistance:{value:.05}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;

		uniform vec3 kernel[ KERNEL_SIZE ];

		uniform vec2 resolution;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float kernelRadius;
		uniform float minDistance; // avoid artifacts caused by neighbour fragments with minimal depth difference
		uniform float maxDistance; // avoid the influence of fragments which are too far away

		varying vec2 vUv;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {

			return texture2D( tDepth, screenPosition ).x;

		}

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		float getViewZ( const in float depth ) {

			#if PERSPECTIVE_CAMERA == 1

				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );

			#else

				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );

			#endif

		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {

			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];

			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );

			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;

		}

		vec3 getViewNormal( const in vec2 screenPosition ) {

			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );

		}

		void main() {

			float depth = getDepth( vUv );

			if ( depth == 1.0 ) {

				gl_FragColor = vec4( 1.0 ); // don't influence background
				
			} else {

				float viewZ = getViewZ( depth );

				vec3 viewPosition = getViewPosition( vUv, depth, viewZ );
				vec3 viewNormal = getViewNormal( vUv );

				vec2 noiseScale = vec2( resolution.x / 4.0, resolution.y / 4.0 );
				vec3 random = vec3( texture2D( tNoise, vUv * noiseScale ).r );

				// compute matrix used to reorient a kernel vector

				vec3 tangent = normalize( random - viewNormal * dot( random, viewNormal ) );
				vec3 bitangent = cross( viewNormal, tangent );
				mat3 kernelMatrix = mat3( tangent, bitangent, viewNormal );

				float occlusion = 0.0;

				for ( int i = 0; i < KERNEL_SIZE; i ++ ) {

					vec3 sampleVector = kernelMatrix * kernel[ i ]; // reorient sample vector in view space
					vec3 samplePoint = viewPosition + ( sampleVector * kernelRadius ); // calculate sample point

					vec4 samplePointNDC = cameraProjectionMatrix * vec4( samplePoint, 1.0 ); // project point and calculate NDC
					samplePointNDC /= samplePointNDC.w;

					vec2 samplePointUv = samplePointNDC.xy * 0.5 + 0.5; // compute uv coordinates

					float realDepth = getLinearDepth( samplePointUv ); // get linear depth from depth texture
					float sampleDepth = viewZToOrthographicDepth( samplePoint.z, cameraNear, cameraFar ); // compute linear depth of the sample view Z value
					float delta = sampleDepth - realDepth;

					if ( delta > minDistance && delta < maxDistance ) { // if fragment is before sample point, increase occlusion

						occlusion += 1.0;

					}

				}

				occlusion = clamp( occlusion / float( KERNEL_SIZE ), 0.0, 1.0 );

				gl_FragColor = vec4( vec3( 1.0 - occlusion ), 1.0 );

			}

		}`},xs={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},ys={uniforms:{tDiffuse:{value:null},resolution:{value:new ve}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		void main() {

			vec2 texelSize = ( 1.0 / resolution );
			float result = 0.0;

			for ( int i = - 2; i <= 2; i ++ ) {

				for ( int j = - 2; j <= 2; j ++ ) {

					vec2 offset = ( vec2( float( i ), float( j ) ) ) * texelSize;
					result += texture2D( tDiffuse, vUv + offset ).r;

				}

			}

			gl_FragColor = vec4( vec3( result / ( 5.0 * 5.0 ) ), 1.0 );

		}`};class $n extends Gn{constructor(e,t,n,r,s=32){super(),this.width=n!==void 0?n:512,this.height=r!==void 0?r:512,this.clear=!0,this.needsSwap=!1,this.camera=t,this.scene=e,this.kernelRadius=8,this.kernel=[],this.noiseTexture=null,this.output=0,this.minDistance=.005,this.maxDistance=.1,this._visibilityCache=new Map,this.generateSampleKernel(s),this.generateRandomKernelRotations();const a=new Zs;a.format=bi,a.type=Si,this.normalRenderTarget=new yt(this.width,this.height,{minFilter:ct,magFilter:ct,type:dt,depthTexture:a}),this.ssaoRenderTarget=new yt(this.width,this.height,{type:dt}),this.blurRenderTarget=this.ssaoRenderTarget.clone(),this.ssaoMaterial=new ut({defines:Object.assign({},_s.defines),uniforms:It.clone(_s.uniforms),vertexShader:_s.vertexShader,fragmentShader:_s.fragmentShader,blending:ft}),this.ssaoMaterial.defines.KERNEL_SIZE=s,this.ssaoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssaoMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.ssaoMaterial.uniforms.tNoise.value=this.noiseTexture,this.ssaoMaterial.uniforms.kernel.value=this.kernel,this.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ssaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new Du,this.normalMaterial.blending=ft,this.blurMaterial=new ut({defines:Object.assign({},ys.defines),uniforms:It.clone(ys.uniforms),vertexShader:ys.vertexShader,fragmentShader:ys.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new ut({defines:Object.assign({},xs.defines),uniforms:It.clone(xs.uniforms),vertexShader:xs.vertexShader,fragmentShader:xs.fragmentShader,blending:ft}),this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new ut({uniforms:It.clone(ri.uniforms),vertexShader:ri.vertexShader,fragmentShader:ri.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Zc,blendDst:Jo,blendEquation:dn,blendSrcAlpha:Yc,blendDstAlpha:Jo,blendEquationAlpha:dn}),this.fsQuad=new ur(null),this.originalClearColor=new Ge}dispose(){this.normalRenderTarget.dispose(),this.ssaoRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.normalMaterial.dispose(),this.blurMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(e,t,n){switch(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility(),this.ssaoMaterial.uniforms.kernelRadius.value=this.kernelRadius,this.ssaoMaterial.uniforms.minDistance.value=this.minDistance,this.ssaoMaterial.uniforms.maxDistance.value=this.maxDistance,this.renderPass(e,this.ssaoMaterial,this.ssaoRenderTarget),this.renderPass(e,this.blurMaterial,this.blurRenderTarget),this.output){case $n.OUTPUT.SSAO:this.copyMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.copyMaterial.blending=ft,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case $n.OUTPUT.Blur:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=ft,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case $n.OUTPUT.Depth:this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:n);break;case $n.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=ft,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case $n.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=qc,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;default:console.warn("THREE.SSAOPass: Unknown output type.")}}renderPass(e,t,n,r,s){e.getClearColor(this.originalClearColor);const a=e.getClearAlpha(),l=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=l,e.setClearColor(this.originalClearColor),e.setClearAlpha(a)}renderOverride(e,t,n,r,s){e.getClearColor(this.originalClearColor);const a=e.getClearAlpha(),l=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,s=t.clearAlpha||s,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=l,e.setClearColor(this.originalClearColor),e.setClearAlpha(a)}setSize(e,t){this.width=e,this.height=t,this.ssaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.ssaoMaterial.uniforms.resolution.value.set(e,t),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t)}generateSampleKernel(e){const t=this.kernel;for(let n=0;n<e;n++){const r=new k;r.x=Math.random()*2-1,r.y=Math.random()*2-1,r.z=Math.random(),r.normalize();let s=n/e;s=Ua.lerp(.1,1,s*s),r.multiplyScalar(s),t.push(r)}}generateRandomKernelRotations(){const n=new D0,r=4*4,s=new Float32Array(r);for(let a=0;a<r;a++){const l=Math.random()*2-1,u=Math.random()*2-1,h=0;s[a]=n.noise3d(l,u,h)}this.noiseTexture=new ul(s,4,4,Nr,Ut),this.noiseTexture.wrapS=Dr,this.noiseTexture.wrapT=Dr,this.noiseTexture.needsUpdate=!0}overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(n){t.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(n){const r=t.get(n);n.visible=r}),t.clear()}}$n.OUTPUT={Default:0,SSAO:1,Blur:2,Depth:3,Normal:4};const gn={defines:{MAX_STEP:0,PERSPECTIVE_CAMERA:!0,DISTANCE_ATTENUATION:!0,FRESNEL:!0,INFINITE_THICK:!1,SELECTIVE:!1},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tMetalness:{value:null},tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new ve},cameraProjectionMatrix:{value:new at},cameraInverseProjectionMatrix:{value:new at},opacity:{value:.5},maxDistance:{value:180},cameraRange:{value:0},thickness:{value:.018}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`
		// precision highp float;
		precision highp sampler2D;
		varying vec2 vUv;
		uniform sampler2D tDepth;
		uniform sampler2D tNormal;
		uniform sampler2D tMetalness;
		uniform sampler2D tDiffuse;
		uniform float cameraRange;
		uniform vec2 resolution;
		uniform float opacity;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform float maxDistance;
		uniform float thickness;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;
		#include <packing>
		float pointToLineDistance(vec3 x0, vec3 x1, vec3 x2) {
			//x0: point, x1: linePointA, x2: linePointB
			//https://mathworld.wolfram.com/Point-LineDistance3-Dimensional.html
			return length(cross(x0-x1,x0-x2))/length(x2-x1);
		}
		float pointPlaneDistance(vec3 point,vec3 planePoint,vec3 planeNormal){
			// https://mathworld.wolfram.com/Point-PlaneDistance.html
			//// https://en.wikipedia.org/wiki/Plane_(geometry)
			//// http://paulbourke.net/geometry/pointlineplane/
			float a=planeNormal.x,b=planeNormal.y,c=planeNormal.z;
			float x0=point.x,y0=point.y,z0=point.z;
			float x=planePoint.x,y=planePoint.y,z=planePoint.z;
			float d=-(a*x+b*y+c*z);
			float distance=(a*x0+b*y0+c*z0+d)/sqrt(a*a+b*b+c*c);
			return distance;
		}
		float getDepth( const in vec2 uv ) {
			return texture2D( tDepth, uv ).x;
		}
		float getViewZ( const in float depth ) {
			#ifdef PERSPECTIVE_CAMERA
				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );
			#else
				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );
			#endif
		}
		vec3 getViewPosition( const in vec2 uv, const in float depth/*clip space*/, const in float clipW ) {
			vec4 clipPosition = vec4( ( vec3( uv, depth ) - 0.5 ) * 2.0, 1.0 );//ndc
			clipPosition *= clipW; //clip
			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;//view
		}
		vec3 getViewNormal( const in vec2 uv ) {
			return unpackRGBToNormal( texture2D( tNormal, uv ).xyz );
		}
		vec2 viewPositionToXY(vec3 viewPosition){
			vec2 xy;
			vec4 clip=cameraProjectionMatrix*vec4(viewPosition,1);
			xy=clip.xy;//clip
			float clipW=clip.w;
			xy/=clipW;//NDC
			xy=(xy+1.)/2.;//uv
			xy*=resolution;//screen
			return xy;
		}
		void main(){
			#ifdef SELECTIVE
				float metalness=texture2D(tMetalness,vUv).r;
				if(metalness==0.) return;
			#endif

			float depth = getDepth( vUv );
			float viewZ = getViewZ( depth );
			if(-viewZ>=cameraFar) return;

			float clipW = cameraProjectionMatrix[2][3] * viewZ+cameraProjectionMatrix[3][3];
			vec3 viewPosition=getViewPosition( vUv, depth, clipW );

			vec2 d0=gl_FragCoord.xy;
			vec2 d1;

			vec3 viewNormal=getViewNormal( vUv );

			#ifdef PERSPECTIVE_CAMERA
				vec3 viewIncidentDir=normalize(viewPosition);
				vec3 viewReflectDir=reflect(viewIncidentDir,viewNormal);
			#else
				vec3 viewIncidentDir=vec3(0,0,-1);
				vec3 viewReflectDir=reflect(viewIncidentDir,viewNormal);
			#endif

			float maxReflectRayLen=maxDistance/dot(-viewIncidentDir,viewNormal);
			// dot(a,b)==length(a)*length(b)*cos(theta) // https://www.mathsisfun.com/algebra/vectors-dot-product.html
			// if(a.isNormalized&&b.isNormalized) dot(a,b)==cos(theta)
			// maxDistance/maxReflectRayLen=cos(theta)
			// maxDistance/maxReflectRayLen==dot(a,b)
			// maxReflectRayLen==maxDistance/dot(a,b)

			vec3 d1viewPosition=viewPosition+viewReflectDir*maxReflectRayLen;
			#ifdef PERSPECTIVE_CAMERA
				if(d1viewPosition.z>-cameraNear){
					//https://tutorial.math.lamar.edu/Classes/CalcIII/EqnsOfLines.aspx
					float t=(-cameraNear-viewPosition.z)/viewReflectDir.z;
					d1viewPosition=viewPosition+viewReflectDir*t;
				}
			#endif
			d1=viewPositionToXY(d1viewPosition);

			float totalLen=length(d1-d0);
			float xLen=d1.x-d0.x;
			float yLen=d1.y-d0.y;
			float totalStep=max(abs(xLen),abs(yLen));
			float xSpan=xLen/totalStep;
			float ySpan=yLen/totalStep;
			for(float i=0.;i<float(MAX_STEP);i++){
				if(i>=totalStep) break;
				vec2 xy=vec2(d0.x+i*xSpan,d0.y+i*ySpan);
				if(xy.x<0.||xy.x>resolution.x||xy.y<0.||xy.y>resolution.y) break;
				float s=length(xy-d0)/totalLen;
				vec2 uv=xy/resolution;

				float d = getDepth(uv);
				float vZ = getViewZ( d );
				if(-vZ>=cameraFar) continue;
				float cW = cameraProjectionMatrix[2][3] * vZ+cameraProjectionMatrix[3][3];
				vec3 vP=getViewPosition( uv, d, cW );

				#ifdef PERSPECTIVE_CAMERA
					// https://comp.nus.edu.sg/~lowkl/publications/lowk_persp_interp_techrep.pdf
					float recipVPZ=1./viewPosition.z;
					float viewReflectRayZ=1./(recipVPZ+s*(1./d1viewPosition.z-recipVPZ));
				#else
					float viewReflectRayZ=viewPosition.z+s*(d1viewPosition.z-viewPosition.z);
				#endif

				// if(viewReflectRayZ>vZ) continue; // will cause "npm run make-screenshot webgl_postprocessing_ssr" high probability hang.
				// https://github.com/mrdoob/three.js/pull/21539#issuecomment-821061164
				if(viewReflectRayZ<=vZ){

					bool hit;
					#ifdef INFINITE_THICK
						hit=true;
					#else
						float away=pointToLineDistance(vP,viewPosition,d1viewPosition);

						float minThickness;
						vec2 xyNeighbor=xy;
						xyNeighbor.x+=1.;
						vec2 uvNeighbor=xyNeighbor/resolution;
						vec3 vPNeighbor=getViewPosition(uvNeighbor,d,cW);
						minThickness=vPNeighbor.x-vP.x;
						minThickness*=3.;
						float tk=max(minThickness,thickness);

						hit=away<=tk;
					#endif

					if(hit){
						vec3 vN=getViewNormal( uv );
						if(dot(viewReflectDir,vN)>=0.) continue;
						float distance=pointPlaneDistance(vP,viewPosition,viewNormal);
						if(distance>maxDistance) break;
						float op=opacity;
						#ifdef DISTANCE_ATTENUATION
							float ratio=1.-(distance/maxDistance);
							float attenuation=ratio*ratio;
							op=opacity*attenuation;
						#endif
						#ifdef FRESNEL
							float fresnelCoe=(dot(viewIncidentDir,viewReflectDir)+1.)/2.;
							op*=fresnelCoe;
						#endif
						vec4 reflectColor=texture2D(tDiffuse,uv);
						gl_FragColor.xyz=reflectColor.xyz;
						gl_FragColor.a=op;
						break;
					}
				}
			}
		}
	`},Ms={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`

		uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 uv ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, uv ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, uv ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			float d = 1.0 - depth;
			// d=(d-.999)*1000.;
			gl_FragColor = vec4( vec3( d ), 1.0 );

		}

	`},Kn={uniforms:{tDiffuse:{value:null},resolution:{value:new ve},opacity:{value:.5}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;
		void main() {
			//reverse engineering from PhotoShop blur filter, then change coefficient

			vec2 texelSize = ( 1.0 / resolution );

			vec4 c=texture2D(tDiffuse,vUv);

			vec2 offset;

			offset=(vec2(-1,0))*texelSize;
			vec4 cl=texture2D(tDiffuse,vUv+offset);

			offset=(vec2(1,0))*texelSize;
			vec4 cr=texture2D(tDiffuse,vUv+offset);

			offset=(vec2(0,-1))*texelSize;
			vec4 cb=texture2D(tDiffuse,vUv+offset);

			offset=(vec2(0,1))*texelSize;
			vec4 ct=texture2D(tDiffuse,vUv+offset);

			// float coeCenter=.5;
			// float coeSide=.125;
			float coeCenter=.2;
			float coeSide=.2;
			float a=c.a*coeCenter+cl.a*coeSide+cr.a*coeSide+cb.a*coeSide+ct.a*coeSide;
			vec3 rgb=(c.rgb*c.a*coeCenter+cl.rgb*cl.a*coeSide+cr.rgb*cr.a*coeSide+cb.rgb*cb.a*coeSide+ct.rgb*ct.a*coeSide)/a;
			gl_FragColor=vec4(rgb,a);

		}
	`};class In extends Gn{constructor({renderer:e,scene:t,camera:n,width:r,height:s,selects:a,bouncing:l=!1,groundReflector:u}){super(),this.width=r!==void 0?r:512,this.height=s!==void 0?s:512,this.clear=!0,this.renderer=e,this.scene=t,this.camera=n,this.groundReflector=u,this.opacity=gn.uniforms.opacity.value,this.output=0,this.maxDistance=gn.uniforms.maxDistance.value,this.thickness=gn.uniforms.thickness.value,this.tempColor=new Ge,this._selects=a,this.selective=Array.isArray(this._selects),Object.defineProperty(this,"selects",{get(){return this._selects},set(p){this._selects!==p&&(this._selects=p,Array.isArray(p)?(this.selective=!0,this.ssrMaterial.defines.SELECTIVE=!0,this.ssrMaterial.needsUpdate=!0):(this.selective=!1,this.ssrMaterial.defines.SELECTIVE=!1,this.ssrMaterial.needsUpdate=!0))}}),this._bouncing=l,Object.defineProperty(this,"bouncing",{get(){return this._bouncing},set(p){this._bouncing!==p&&(this._bouncing=p,p?this.ssrMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture:this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture)}}),this.blur=!0,this._distanceAttenuation=gn.defines.DISTANCE_ATTENUATION,Object.defineProperty(this,"distanceAttenuation",{get(){return this._distanceAttenuation},set(p){this._distanceAttenuation!==p&&(this._distanceAttenuation=p,this.ssrMaterial.defines.DISTANCE_ATTENUATION=p,this.ssrMaterial.needsUpdate=!0)}}),this._fresnel=gn.defines.FRESNEL,Object.defineProperty(this,"fresnel",{get(){return this._fresnel},set(p){this._fresnel!==p&&(this._fresnel=p,this.ssrMaterial.defines.FRESNEL=p,this.ssrMaterial.needsUpdate=!0)}}),this._infiniteThick=gn.defines.INFINITE_THICK,Object.defineProperty(this,"infiniteThick",{get(){return this._infiniteThick},set(p){this._infiniteThick!==p&&(this._infiniteThick=p,this.ssrMaterial.defines.INFINITE_THICK=p,this.ssrMaterial.needsUpdate=!0)}});const h=new Zs;h.type=Qi,h.minFilter=ct,h.magFilter=ct,this.beautyRenderTarget=new yt(this.width,this.height,{minFilter:ct,magFilter:ct,type:dt,depthTexture:h,depthBuffer:!0}),this.prevRenderTarget=new yt(this.width,this.height,{minFilter:ct,magFilter:ct}),this.normalRenderTarget=new yt(this.width,this.height,{minFilter:ct,magFilter:ct,type:dt}),this.metalnessRenderTarget=new yt(this.width,this.height,{minFilter:ct,magFilter:ct,type:dt}),this.ssrRenderTarget=new yt(this.width,this.height,{minFilter:ct,magFilter:ct}),this.blurRenderTarget=this.ssrRenderTarget.clone(),this.blurRenderTarget2=this.ssrRenderTarget.clone(),this.ssrMaterial=new ut({defines:Object.assign({},gn.defines,{MAX_STEP:Math.sqrt(this.width*this.width+this.height*this.height)}),uniforms:It.clone(gn.uniforms),vertexShader:gn.vertexShader,fragmentShader:gn.fragmentShader,blending:ft}),this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.ssrMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssrMaterial.defines.SELECTIVE=this.selective,this.ssrMaterial.needsUpdate=!0,this.ssrMaterial.uniforms.tMetalness.value=this.metalnessRenderTarget.texture,this.ssrMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.ssrMaterial.uniforms.cameraNear.value=this.camera.near,this.ssrMaterial.uniforms.cameraFar.value=this.camera.far,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.ssrMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new Du,this.normalMaterial.blending=ft,this.metalnessOnMaterial=new Ei({color:"white"}),this.metalnessOffMaterial=new Ei({color:"black"}),this.blurMaterial=new ut({defines:Object.assign({},Kn.defines),uniforms:It.clone(Kn.uniforms),vertexShader:Kn.vertexShader,fragmentShader:Kn.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.blurMaterial2=new ut({defines:Object.assign({},Kn.defines),uniforms:It.clone(Kn.uniforms),vertexShader:Kn.vertexShader,fragmentShader:Kn.fragmentShader}),this.blurMaterial2.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.blurMaterial2.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new ut({defines:Object.assign({},Ms.defines),uniforms:It.clone(Ms.uniforms),vertexShader:Ms.vertexShader,fragmentShader:Ms.fragmentShader,blending:ft}),this.depthRenderMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new ut({uniforms:It.clone(ri.uniforms),vertexShader:ri.vertexShader,fragmentShader:ri.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Pr,blendDst:Lr,blendEquation:dn,blendSrcAlpha:Pr,blendDstAlpha:Lr,blendEquationAlpha:dn}),this.fsQuad=new ur(null),this.originalClearColor=new Ge}dispose(){this.beautyRenderTarget.dispose(),this.prevRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.metalnessRenderTarget.dispose(),this.ssrRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.blurRenderTarget2.dispose(),this.normalMaterial.dispose(),this.metalnessOnMaterial.dispose(),this.metalnessOffMaterial.dispose(),this.blurMaterial.dispose(),this.blurMaterial2.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(e,t){switch(e.setRenderTarget(this.beautyRenderTarget),e.clear(),this.groundReflector&&(this.groundReflector.visible=!1,this.groundReflector.doRender(this.renderer,this.scene,this.camera),this.groundReflector.visible=!0),e.render(this.scene,this.camera),this.groundReflector&&(this.groundReflector.visible=!1),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,0,0),this.selective&&this.renderMetalness(e,this.metalnessOnMaterial,this.metalnessRenderTarget,0,0),this.ssrMaterial.uniforms.opacity.value=this.opacity,this.ssrMaterial.uniforms.maxDistance.value=this.maxDistance,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.renderPass(e,this.ssrMaterial,this.ssrRenderTarget),this.blur&&(this.renderPass(e,this.blurMaterial,this.blurRenderTarget),this.renderPass(e,this.blurMaterial2,this.blurRenderTarget2)),this.output){case In.OUTPUT.Default:this.bouncing?(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=ft,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=zn,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture,this.copyMaterial.blending=ft,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t)):(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=ft,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=zn,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t));break;case In.OUTPUT.SSR:this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=ft,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.bouncing&&(this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=ft,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=zn,this.renderPass(e,this.copyMaterial,this.prevRenderTarget));break;case In.OUTPUT.Beauty:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=ft,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case In.OUTPUT.Depth:this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case In.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=ft,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case In.OUTPUT.Metalness:this.copyMaterial.uniforms.tDiffuse.value=this.metalnessRenderTarget.texture,this.copyMaterial.blending=ft,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.SSRPass: Unknown output type.")}}renderPass(e,t,n,r,s){this.originalClearColor.copy(e.getClearColor(this.tempColor));const a=e.getClearAlpha(this.tempColor),l=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=l,e.setClearColor(this.originalClearColor),e.setClearAlpha(a)}renderOverride(e,t,n,r,s){this.originalClearColor.copy(e.getClearColor(this.tempColor));const a=e.getClearAlpha(this.tempColor),l=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,s=t.clearAlpha||s,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=l,e.setClearColor(this.originalClearColor),e.setClearAlpha(a)}renderMetalness(e,t,n,r,s){this.originalClearColor.copy(e.getClearColor(this.tempColor));const a=e.getClearAlpha(this.tempColor),l=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,s=t.clearAlpha||s,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this.scene.traverseVisible(u=>{u._SSRPassBackupMaterial=u.material,this._selects.includes(u)?u.material=this.metalnessOnMaterial:u.material=this.metalnessOffMaterial}),e.render(this.scene,this.camera),this.scene.traverseVisible(u=>{u.material=u._SSRPassBackupMaterial}),e.autoClear=l,e.setClearColor(this.originalClearColor),e.setClearAlpha(a)}setSize(e,t){this.width=e,this.height=t,this.ssrMaterial.defines.MAX_STEP=Math.sqrt(e*e+t*t),this.ssrMaterial.needsUpdate=!0,this.beautyRenderTarget.setSize(e,t),this.prevRenderTarget.setSize(e,t),this.ssrRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.metalnessRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.blurRenderTarget2.setSize(e,t),this.ssrMaterial.uniforms.resolution.value.set(e,t),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t),this.blurMaterial2.uniforms.resolution.value.set(e,t)}}In.OUTPUT={Default:0,SSR:1,Beauty:3,Depth:4,Normal:5,Metalness:7};const I0={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class U0 extends Gn{constructor(){super();const e=I0;this.uniforms=It.clone(e.uniforms),this.material=new p0({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new ur(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ot.getTransfer(this._outputColorSpace)===ht&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Kc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Jc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Qc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ka?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===$c?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===eu&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Ss={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new ve(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},bs={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new ve(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},Oo={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new ve(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};class N0 extends Gn{constructor(e,t){super(),this.edgesRT=new yt(e,t,{depthBuffer:!1,type:dt}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new yt(e,t,{depthBuffer:!1,type:dt}),this.weightsRT.texture.name="SMAAPass.weights";const n=this,r=new Image;r.src=this.getAreaTexture(),r.onload=function(){n.areaTexture.needsUpdate=!0},this.areaTexture=new Nt,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=r,this.areaTexture.minFilter=Ct,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;const s=new Image;s.src=this.getSearchTexture(),s.onload=function(){n.searchTexture.needsUpdate=!0},this.searchTexture=new Nt,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=s,this.searchTexture.magFilter=ct,this.searchTexture.minFilter=ct,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,this.uniformsEdges=It.clone(Ss.uniforms),this.uniformsEdges.resolution.value.set(1/e,1/t),this.materialEdges=new ut({defines:Object.assign({},Ss.defines),uniforms:this.uniformsEdges,vertexShader:Ss.vertexShader,fragmentShader:Ss.fragmentShader}),this.uniformsWeights=It.clone(bs.uniforms),this.uniformsWeights.resolution.value.set(1/e,1/t),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new ut({defines:Object.assign({},bs.defines),uniforms:this.uniformsWeights,vertexShader:bs.vertexShader,fragmentShader:bs.fragmentShader}),this.uniformsBlend=It.clone(Oo.uniforms),this.uniformsBlend.resolution.value.set(1/e,1/t),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new ut({uniforms:this.uniformsBlend,vertexShader:Oo.vertexShader,fragmentShader:Oo.fragmentShader}),this.fsQuad=new ur(null)}render(e,t,n){this.uniformsEdges.tDiffuse.value=n.texture,this.fsQuad.material=this.materialEdges,e.setRenderTarget(this.edgesRT),this.clear&&e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialWeights,e.setRenderTarget(this.weightsRT),this.clear&&e.clear(),this.fsQuad.render(e),this.uniformsBlend.tColor.value=n.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}setSize(e,t){this.edgesRT.setSize(e,t),this.weightsRT.setSize(e,t),this.materialEdges.uniforms.resolution.value.set(1/e,1/t),this.materialWeights.uniforms.resolution.value.set(1/e,1/t),this.materialBlend.uniforms.resolution.value.set(1/e,1/t)}getAreaTexture(){return"data:image/png;base64,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"}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}dispose(){this.edgesRT.dispose(),this.weightsRT.dispose(),this.areaTexture.dispose(),this.searchTexture.dispose(),this.materialEdges.dispose(),this.materialWeights.dispose(),this.materialBlend.dispose(),this.fsQuad.dispose()}}class O0{constructor(e,t,n,r,s){me(this,"composer");me(this,"renderPass");me(this,"bloomPass");me(this,"ssaoPass");me(this,"ssrPass");me(this,"smaaPass");me(this,"outputPass");const a=new yt(r,s,{type:dt,format:Yt,colorSpace:en,samples:e.capabilities.isWebGL2?4:0});this.composer=new R0(e,a),this.renderPass=new P0(t,n),this.composer.addPass(this.renderPass),this.ssrPass=new In({renderer:e,scene:t,camera:n,width:r,height:s,groundReflector:null,selects:null}),this.ssrPass.thickness=.018,this.ssrPass.maxDistance=100,this.ssrPass.opacity=1,this.composer.addPass(this.ssrPass),this.ssaoPass=new $n(t,n,r,s),this.ssaoPass.kernelRadius=1.5,this.ssaoPass.minDistance=.005,this.ssaoPass.maxDistance=.1,this.composer.addPass(this.ssaoPass);const l=new ve(r,s);this.bloomPass=new er(l,1.2,.4,.85),this.bloomPass.threshold=1,this.bloomPass.strength=1.2,this.bloomPass.radius=.5,this.composer.addPass(this.bloomPass),this.smaaPass=new N0(r,s),this.composer.addPass(this.smaaPass),this.outputPass=new U0,this.composer.addPass(this.outputPass)}resize(e,t){this.composer.setSize(e,t),this.ssaoPass.setSize(e,t)}render(){this.composer.render()}}class F0{constructor(e){me(this,"renderer");me(this,"scene");me(this,"camera");me(this,"postProcessing");me(this,"usePostProcessing",!0);me(this,"hemi");me(this,"sun");me(this,"resizeHandler");this.renderer=new Jv({canvas:e,antialias:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Xc,this.renderer.toneMapping=Ka,this.renderer.toneMappingExposure=1.05,this.renderer.outputColorSpace=fn,this.scene=new Au,this.scene.background=new Ge(856343),this.camera=new Qt(60,window.innerWidth/window.innerHeight,.1,200),this.camera.position.set(0,6,10),this.setupLights(),this.postProcessing=new O0(this.renderer,this.scene,this.camera,window.innerWidth,window.innerHeight),this.resizeHandler=()=>this.onResize(),window.addEventListener("resize",this.resizeHandler)}setupLights(){this.hemi=new x0(13625599,2763312,.7),this.scene.add(this.hemi),this.sun=new S0(16777215,4),this.sun.position.set(20,30,12),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=150;const e=40;this.sun.shadow.camera.left=-e,this.sun.shadow.camera.right=e,this.sun.shadow.camera.top=e,this.sun.shadow.camera.bottom=-e,this.sun.shadow.bias=-1e-4,this.sun.shadow.normalBias=.02,this.scene.add(this.sun),this.scene.add(this.sun.target)}setAtmosphere(e,t){this.scene.fog=new Ks(e,t),this.scene.background=new Ge(e)}setSunColor(e,t){this.sun.color.setHex(e),this.sun.intensity=t}focusShadow(e){this.sun.position.set(e.x+20,e.y+30,e.z+12),this.sun.target.position.copy(e)}onResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.postProcessing.resize(window.innerWidth,window.innerHeight)}render(){this.usePostProcessing?this.postProcessing.render():this.renderer.render(this.scene,this.camera)}dispose(){window.removeEventListener("resize",this.resizeHandler),this.renderer.dispose()}}const Ac={classic:"Classic",infection:"Infection","final-survivor":"Final Survivor",chaos:"Chaos Mode",custom:"Custom Lobby"},B0={classic:"Hunters vs Mimics. Hunters win by finding every Mimic before time expires.",infection:"Every discovered Mimic joins the Hunters. Survive the growing swarm.","final-survivor":"No teams swap. The last hidden Mimic standing takes the win.",chaos:"The environment shifts every minute — colors, lights and layout mutate.",custom:"Configure every rule yourself before launching the match."},za=[{id:"modern-office",name:"Modern Office",palette:[3883602,8962256,15527924,6193580],ambient:"office",hidingSpots:240},{id:"shopping-mall",name:"Shopping Mall",palette:[15779444,14586719,13395558,11910504],ambient:"mall",hidingSpots:320},{id:"art-museum",name:"Art Museum",palette:[15394527,13683133,9206635,3814961],ambient:"museum",hidingSpots:180},{id:"luxury-mansion",name:"Luxury Mansion",palette:[7166023,11573878,15260864,4207658],ambient:"mansion",hidingSpots:280},{id:"university-library",name:"University Library",palette:[5916210,9071947,13219990,3023898],ambient:"library",hidingSpots:300},{id:"warehouse",name:"Warehouse",palette:[5066839,8159626,11580603,2829617],ambient:"warehouse",hidingSpots:210},{id:"apartment-complex",name:"Apartment Complex",palette:[10134961,13620957,7042176,4014924],ambient:"apartment",hidingSpots:260},{id:"japanese-garden",name:"Japanese Garden",palette:[5208386,8825195,14272931,3029794],ambient:"garden",hidingSpots:190},{id:"factory",name:"Factory",palette:[5593182,9080726,13082954,3158582],ambient:"factory",hidingSpots:230},{id:"theme-park",name:"Theme Park",palette:[14703708,15905076,5222598,7065443],ambient:"park",hidingSpots:340}],Cc=[{id:"cap",name:"Ball Cap",slot:"hat",rarity:"common"},{id:"beanie",name:"Beanie",slot:"hat",rarity:"common"},{id:"tophat",name:"Top Hat",slot:"hat",rarity:"rare"},{id:"crown",name:"Pixel Crown",slot:"hat",rarity:"epic"},{id:"satchel",name:"Satchel",slot:"backpack",rarity:"common"},{id:"jetpack",name:"Faux Jetpack",slot:"backpack",rarity:"epic"},{id:"sneakers",name:"Sneakers",slot:"shoes",rarity:"common"},{id:"boots",name:"Trail Boots",slot:"shoes",rarity:"rare"},{id:"roller",name:"Paint Roller",slot:"brush",rarity:"common"},{id:"spray",name:"Spray Can",slot:"brush",rarity:"rare"},{id:"sparkle",name:"Sparkle Trail",slot:"trail",rarity:"epic"},{id:"wave",name:"Wave Emote",slot:"emote",rarity:"common"},{id:"dance",name:"Dance Emote",slot:"emote",rarity:"rare"}],z0=[14707829,15057019,10011513,5682882,6402031,13007069,13736550,11252415],Rc=["classic","infection","final-survivor","chaos"];class k0{constructor(){me(this,"root");me(this,"toastTimer",null);this.root=document.getElementById("ui-root")}clear(){this.root.innerHTML=""}el(e){const t=document.createElement("div");return t.innerHTML=e.trim(),t.firstElementChild}toast(e,t="info"){let n=document.getElementById("toast");n||(n=document.createElement("div"),n.id="toast",document.body.appendChild(n)),n.textContent=e,n.className=`toast toast-${t} show`,this.toastTimer&&window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>{n.className="toast"},3200)}showMenu(e,t){this.clear();const n=this.el(`
      <div class="screen menu-screen">
        <header class="brand">
          <div class="brand-mark">CH</div>
          <div>
            <h1 class="brand-title">Chroma Hunt</h1>
            <p class="brand-sub">Blend in. Hunt them down. Don't get caught.</p>
          </div>
        </header>

        <div class="menu-grid">
          <section class="card play-card">
            <h2 class="card-title">Play</h2>
            <div class="mode-list" id="mode-list"></div>
            <button class="btn btn-primary btn-lg" id="quick-btn">Quick Match</button>
            <div class="row">
              <button class="btn" id="create-btn">Create Room</button>
              <div class="join-group">
                <input class="input" id="join-code" placeholder="CODE" maxlength="5" />
                <button class="btn" id="join-btn">Join</button>
              </div>
            </div>
          </section>

          <section class="card profile-card">
            <h2 class="card-title">Profile</h2>
            <label class="field">
              <span>Display name</span>
              <input class="input" id="name-input" value="${Fo(e.name)}" maxlength="16" />
            </label>
            <div class="field">
              <span>Body color</span>
              <div class="swatches" id="color-swatches"></div>
            </div>
            <div class="field">
              <span>Cosmetics</span>
              <div class="cosmetic-grid" id="cosmetic-grid"></div>
            </div>
            <div class="stats-row">
              <div class="stat"><b>${e.stats.matches}</b><span>Matches</span></div>
              <div class="stat"><b>${e.stats.discoveries}</b><span>Finds</span></div>
              <div class="stat"><b>${e.stats.survivals}</b><span>Survived</span></div>
              <div class="stat"><b>${e.stats.bestCamo}</b><span>Best Camo</span></div>
            </div>
          </section>
        </div>
        <footer class="menu-foot">Built with Three.js + Socket.IO. WASD to move, hold C to camouflage, Space to freeze.</footer>
      </div>
    `);this.root.appendChild(n);let r="classic";const s=n.querySelector("#mode-list");Rc.forEach(h=>{const p=this.el(`
        <button class="mode-btn ${h===r?"active":""}" data-mode="${h}">
          <b>${Ac[h]}</b>
          <span>${B0[h]}</span>
        </button>
      `);p.addEventListener("click",()=>{r=h,s.querySelectorAll(".mode-btn").forEach(o=>o.classList.remove("active")),p.classList.add("active")}),s.appendChild(p)});const a=n.querySelector("#color-swatches");z0.forEach(h=>{const p=this.el(`<button class="swatch" style="background:#${Pc(h)}"></button>`);h===e.loadout.bodyColor&&p.classList.add("active"),p.addEventListener("click",()=>{e.loadout.bodyColor=h,a.querySelectorAll(".swatch").forEach(o=>o.classList.remove("active")),p.classList.add("active"),t.onProfileChange(e)}),a.appendChild(p)});const l=n.querySelector("#cosmetic-grid");Cc.forEach(h=>{const p=e.loadout[h.slot]===h.id,o=this.el(`<button class="cosmetic-chip rarity-${h.rarity} ${p?"active":""}">${h.name}</button>`);o.addEventListener("click",()=>{const c=e.loadout[h.slot];e.loadout[h.slot]=c===h.id?null:h.id,l.querySelectorAll(".cosmetic-chip").forEach(f=>{const v=f.textContent,x=Cc.find(g=>g.name===v);x&&x.slot===h.slot&&f.classList.remove("active")}),e.loadout[h.slot]===h.id&&o.classList.add("active"),t.onProfileChange(e)}),l.appendChild(o)});const u=n.querySelector("#name-input");u.addEventListener("change",()=>{e.name=u.value.trim()||e.name,t.onProfileChange(e)}),n.querySelector("#quick-btn").addEventListener("click",()=>t.onQuickMatch(r)),n.querySelector("#create-btn").addEventListener("click",()=>t.onCreateRoom(r,"modern-office")),n.querySelector("#join-btn").addEventListener("click",()=>{const h=n.querySelector("#join-code").value.trim().toUpperCase();h&&t.onJoinRoom(h)})}showLobby(e,t,n){this.clear();const r=e.hostId===t,s=this.el(`
      <div class="screen lobby-screen">
        <div class="card lobby-card">
          <div class="lobby-head">
            <div>
              <h2 class="card-title">Lobby</h2>
              <p class="lobby-code">Room code: <b>${e.code}</b></p>
            </div>
            <button class="btn" id="leave-btn">Leave</button>
          </div>

          <div class="lobby-body">
            <div class="lobby-settings">
              <label class="field"><span>Mode</span>
                <select class="input" id="mode-sel" ${r?"":"disabled"}></select>
              </label>
              <label class="field"><span>Map</span>
                <select class="input" id="map-sel" ${r?"":"disabled"}></select>
              </label>
              <label class="field"><span>Max players: <b id="mp-val">${e.config.maxPlayers}</b></span>
                <input type="range" min="2" max="24" value="${e.config.maxPlayers}" id="mp-range" ${r?"":"disabled"} />
              </label>
            </div>
            <div class="lobby-players">
              <h3>Players <span id="pcount"></span></h3>
              <ul class="player-list" id="player-list"></ul>
            </div>
          </div>

          <div class="lobby-actions">
            ${r?'<button class="btn" id="bots-btn">Fill with Bots</button>':""}
            ${r?'<button class="btn btn-primary btn-lg" id="start-btn">Start Match</button>':'<p class="waiting">Waiting for host to start…</p>'}
          </div>
        </div>
      </div>
    `);this.root.appendChild(s);const a=s.querySelector("#mode-sel");Rc.concat("custom").forEach(u=>{const h=document.createElement("option");h.value=u,h.textContent=Ac[u],u===e.config.mode&&(h.selected=!0),a.appendChild(h)});const l=s.querySelector("#map-sel");if(za.forEach(u=>{const h=document.createElement("option");h.value=u.id,h.textContent=u.name,u.id===e.config.map&&(h.selected=!0),l.appendChild(h)}),r){a.addEventListener("change",()=>n.onConfig({mode:a.value})),l.addEventListener("change",()=>n.onConfig({map:l.value}));const u=s.querySelector("#mp-range"),h=s.querySelector("#mp-val");u.addEventListener("input",()=>h.textContent=u.value),u.addEventListener("change",()=>n.onConfig({maxPlayers:Number(u.value)})),s.querySelector("#bots-btn").addEventListener("click",()=>n.onAddBots(e.config.maxPlayers-e.players.length)),s.querySelector("#start-btn").addEventListener("click",()=>n.onStart())}s.querySelector("#leave-btn").addEventListener("click",()=>n.onLeave()),this.renderLobbyPlayers(e)}updateLobby(e){document.getElementById("player-list")&&this.renderLobbyPlayers(e)}renderLobbyPlayers(e){const t=document.getElementById("player-list");if(!t)return;t.innerHTML="",e.players.forEach(r=>{const s=this.el(`
        <li class="player-row ${r.id===e.hostId?"is-host":""}">
          <span class="dot" style="background:#${Pc(r.cosmetics.bodyColor)}"></span>
          <span class="pname">${Fo(r.name)}</span>
          ${r.id===e.hostId?'<span class="badge">Host</span>':""}
          ${r.isBot?'<span class="badge badge-bot">Bot</span>':""}
        </li>
      `);t.appendChild(s)});const n=document.getElementById("pcount");n&&(n.textContent=`${e.players.length}/${e.config.maxPlayers}`)}showCountdown(e){let t=document.getElementById("countdown");t||(this.clear(),t=this.el(`<div class="screen countdown-screen"><div class="countdown-num" id="countdown">${e}</div><p>Get into position…</p></div>`),this.root.appendChild(t),t=document.getElementById("countdown")),t&&(t.textContent=e>0?String(e):"GO!",t.classList.remove("pop"),t.offsetWidth,t.classList.add("pop"))}showResults(e,t,n,r){this.clear();const s=e==="hunter"?"Hunters Win":e==="mimic"?"Mimics Survive":"Match Over",a=this.el(`
      <div class="screen results-screen">
        <div class="card results-card">
          <h2 class="results-title team-${e??"none"}">${s}</h2>
          <table class="leaderboard">
            <thead><tr><th>#</th><th>Player</th><th>Team</th><th>Score</th><th>Survived</th></tr></thead>
            <tbody>
              ${t.map((l,u)=>`
                <tr class="${l.playerId===n?"me":""}">
                  <td>${u+1}</td>
                  <td>${Fo(l.name)}</td>
                  <td class="team-${l.team}">${l.team}</td>
                  <td>${l.score}</td>
                  <td>${l.survivedSeconds}s</td>
                </tr>`).join("")}
            </tbody>
          </table>
          <button class="btn btn-primary btn-lg" id="continue-btn">Back to Menu</button>
        </div>
      </div>
    `);this.root.appendChild(a),a.querySelector("#continue-btn").addEventListener("click",r)}}function Pc(i){return(i&16777215).toString(16).padStart(6,"0")}function Fo(i){return i.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}class H0{constructor(e,t){me(this,"raf",0);me(this,"last",0);me(this,"elapsed",0);me(this,"running",!1);me(this,"frames",0);me(this,"fpsAccum",0);me(this,"fps",60);this.update=e,this.render=t}start(){if(this.running)return;this.running=!0,this.last=performance.now();const e=t=>{if(!this.running)return;this.raf=requestAnimationFrame(e);let n=(t-this.last)/1e3;this.last=t,n>.1&&(n=.1),this.elapsed+=n,this.update(n,this.elapsed),this.render(),this.frames++,this.fpsAccum+=n,this.fpsAccum>=.5&&(this.fps=Math.round(this.frames/this.fpsAccum),this.frames=0,this.fpsAccum=0)};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}}class G0{constructor(e){me(this,"keys",new Set);me(this,"actionHandlers",new Map);me(this,"mouseHandlers",new Set);me(this,"wheelHandlers",new Set);me(this,"pointerLocked",!1);me(this,"enabled",!0);me(this,"el");me(this,"keyToAction",{KeyF:"freeze",KeyQ:"scan",KeyE:"tag",Digit1:"pose-stand",Digit2:"pose-sit",Digit3:"pose-lie",Digit4:"pose-curl",Digit5:"pose-lean",KeyG:"emote",KeyR:"paint",Enter:"chat"});me(this,"onKeyDown",e=>{if(!this.enabled)return;const t=e.target?.tagName;if(t==="INPUT"||t==="TEXTAREA")return;this.keys.add(e.code);const n=this.keyToAction[e.code];n&&(e.preventDefault(),this.actionHandlers.get(n)?.forEach(r=>r()))});me(this,"onKeyUp",e=>{this.keys.delete(e.code)});me(this,"onMouseMove",e=>{!this.pointerLocked||!this.enabled||this.mouseHandlers.forEach(t=>t(e.movementX,e.movementY))});me(this,"onWheel",e=>{this.enabled&&this.wheelHandlers.forEach(t=>t(e.deltaY))});me(this,"requestLock",()=>{this.enabled&&!this.pointerLocked&&this.el.requestPointerLock?.()});me(this,"onLockChange",()=>{this.pointerLocked=document.pointerLockElement===this.el});this.el=e,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),e.addEventListener("mousemove",this.onMouseMove),e.addEventListener("wheel",this.onWheel,{passive:!0}),e.addEventListener("click",this.requestLock),document.addEventListener("pointerlockchange",this.onLockChange)}setEnabled(e){this.enabled=e,e||this.keys.clear()}get isLocked(){return this.pointerLocked}exitLock(){this.pointerLocked&&document.exitPointerLock?.()}onAction(e,t){const n=this.actionHandlers.get(e)??new Set;return n.add(t),this.actionHandlers.set(e,n),()=>n.delete(t)}onMouse(e){return this.mouseHandlers.add(e),()=>this.mouseHandlers.delete(e)}onWheelDelta(e){return this.wheelHandlers.add(e),()=>this.wheelHandlers.delete(e)}axes(){let e=0,t=0;(this.keys.has("KeyW")||this.keys.has("ArrowUp"))&&(t-=1),(this.keys.has("KeyS")||this.keys.has("ArrowDown"))&&(t+=1),(this.keys.has("KeyA")||this.keys.has("ArrowLeft"))&&(e-=1),(this.keys.has("KeyD")||this.keys.has("ArrowRight"))&&(e+=1);const n=this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"),r=this.keys.has("Space");return{moveX:e,moveZ:t,run:n,jump:r}}dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),this.el.removeEventListener("mousemove",this.onMouseMove),this.el.removeEventListener("wheel",this.onWheel),this.el.removeEventListener("click",this.requestLock),document.removeEventListener("pointerlockchange",this.onLockChange)}}const V0=(i,e,t)=>i+(e-i)*t,ka=(i,e,t,n)=>V0(i,e,1-Math.exp(-t*n));function Bo(i){return[(i>>16&255)/255,(i>>8&255)/255,(i&255)/255]}function W0(i){let e=i>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function X0(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}class q0{constructor(){me(this,"group",new Bn);me(this,"torsoMat");me(this,"headMat");me(this,"limbMat");me(this,"body");me(this,"head");me(this,"armL");me(this,"armR");me(this,"legL");me(this,"legR");me(this,"animTime",0);me(this,"state","idle");me(this,"pose","stand");me(this,"targetScaleY",1);this.torsoMat=zo(16119285),this.headMat=zo(16777215),this.limbMat=zo(15263976);const e=new yi(.45,24,20);this.body=new Tt(e,this.torsoMat),this.body.scale.set(1,1.15,.9),this.body.position.y=.6,this.body.castShadow=!0,this.group.add(this.body),this.head=this.buildHead(),this.head.position.y=1.2,this.group.add(this.head),this.armL=this.buildLimb(.12,.5),this.armL.position.set(-.42,.85,0),this.group.add(this.armL),this.armR=this.buildLimb(.12,.5),this.armR.position.set(.42,.85,0),this.group.add(this.armR),this.legL=this.buildLimb(.15,.45),this.legL.position.set(-.18,.4,0),this.group.add(this.legL),this.legR=this.buildLimb(.15,.45),this.legR.position.set(.18,.4,0),this.group.add(this.legR)}buildHead(){const e=new Bn,t=new Tt(new yi(.32,24,20),this.headMat);t.castShadow=!0,e.add(t);const n=new yi(.11,16,12),r=new ii({color:16777215,roughness:.4}),s=new yi(.055,12,10),a=new ii({color:1316895,roughness:.2});for(const l of[-1,1]){const u=new Tt(n,r);u.position.set(l*.13,.04,.26);const h=new Tt(s,a);h.position.set(l*.13,.04,.33),e.add(u,h)}return e}buildLimb(e,t){const n=new Bn,r=new pl(e,t,6,12),s=new Tt(r,this.limbMat);return s.position.y=-t/2,s.castShadow=!0,n.add(s),n}applyCamo(e){const[t,n,r]=Bo(e.torso);this.torsoMat.color.setRGB(t,n,r);const[s,a,l]=Bo(e.head);this.headMat.color.setRGB(s,a,l);const[u,h,p]=Bo(e.limbs);this.limbMat.color.setRGB(u,h,p)}setOpacity(e){for(const t of[this.torsoMat,this.headMat,this.limbMat])t.transparent=e<1,t.opacity=e}setAnim(e){this.state=e}setPose(e){switch(this.pose=e,e){case"stand":case"lean":this.targetScaleY=1;break;case"sit":this.targetScaleY=.7;break;case"lie":case"curl":this.targetScaleY=.45;break}}update(e,t){this.animTime+=e;const n=this.animTime;if(this.group.scale.y+=(this.targetScaleY-this.group.scale.y)*Math.min(1,e*8),this.state==="walk"||this.state==="run"){const r=this.state==="run"?11:7,s=this.state==="run"?.9:.55,a=Math.sin(n*r)*s;this.legL.rotation.x=a,this.legR.rotation.x=-a,this.armL.rotation.x=-a*.8,this.armR.rotation.x=a*.8,this.body.position.y=.6+Math.abs(Math.sin(n*r))*.05}else if(this.state==="paint")this.armR.rotation.x=Math.sin(n*12)*.6-.4,this.armL.rotation.x=-.2,this.legL.rotation.x=0,this.legR.rotation.x=0;else if(this.state==="celebrate")this.armL.rotation.x=-2.4+Math.sin(n*10)*.2,this.armR.rotation.x=-2.4-Math.sin(n*10)*.2,this.group.position.y=Math.abs(Math.sin(n*6))*.3;else{const r=Math.sin(n*2.2)*.03;this.body.scale.set(1,1.15+r,.9),this.legL.rotation.x*=.85,this.legR.rotation.x*=.85,this.armL.rotation.x*=.85,this.armR.rotation.x*=.85,this.group.position.y*=.85}}dispose(){this.group.traverse(e=>{e instanceof Tt&&e.geometry.dispose()}),this.torsoMat.dispose(),this.headMat.dispose(),this.limbMat.dispose()}}function zo(i){return new ii({color:i,roughness:.75,metalness:.05})}class Y0{constructor(e){me(this,"group",new Bn);me(this,"cameraColliders",[]);me(this,"disposables",[]);me(this,"foliageSystem");this.foliageSystem=e}build(e){this.buildFloor(e),this.buildProps(e);const t=e.half*2;return this.foliageSystem.generateGrassField(t,5e3),e.floorColor===4021306&&this.foliageSystem.generateForest(t,150),this.group}buildFloor(e){const t=e.half*2,n=new ar(t,t,64,64),r=n.attributes.position;for(let l=0;l<r.count;l++){const u=r.getX(l),h=r.getY(l),p=Math.sin(u*.5)*Math.cos(h*.5)*.2;r.setZ(l,p)}n.computeVertexNormals();const s=new ii({color:e.floorColor,roughness:.9,metalness:.05}),a=new Tt(n,s);a.rotation.x=-Math.PI/2,a.receiveShadow=!0,this.group.add(a),this.disposables.push(n,s)}geometryFor(e){switch(e){case"cylinder":return new cr(1,1,2,32);case"plant":return new xi(1,2,16);case"tree":const t=new xi(1.4,2,12);t.translate(0,1,0);const n=new xi(1.1,1.8,12);n.translate(0,2.2,0);const r=new xi(.8,1.5,12);r.translate(0,3.2,0);const s=new nn,a=new Float32Array([...t.attributes.position.array,...n.attributes.position.array,...r.attributes.position.array]),l=new Float32Array([...t.attributes.normal.array,...n.attributes.normal.array,...r.attributes.normal.array]),u=[];let h=0;for(const p of[t,n,r]){const o=p.getIndex().array;for(let c=0;c<o.length;c++)u.push(o[c]+h);h+=p.attributes.position.count}return s.setAttribute("position",new Zt(a,3)),s.setAttribute("normal",new Zt(l,3)),s.setIndex(u),s;default:return new or(2,2,2,4,4,4)}}buildProps(e){const t=new Map;for(const s of e.props){const a=t.get(s.kind)??[];a.push(s),t.set(s.kind,a)}const n=new Mt,r=new Ge;for(const[s,a]of t){const l=this.geometryFor(s),u=new ii({roughness:.7,metalness:.1}),h=new Js(l,u,a.length);h.castShadow=!0,h.receiveShadow=!0,h.instanceColor=new Fa(new Float32Array(a.length*3),3),a.forEach((p,o)=>{n.position.set(p.position.x,p.position.y,p.position.z),n.rotation.set(0,p.rotationY,0),n.scale.set(p.size.x,p.size.y,p.size.z),n.updateMatrix(),h.setMatrixAt(o,n.matrix),r.setHex(p.color),h.setColorAt(o,r),p.size.y>.6&&this.cameraColliders.push(new ci(new k(p.position.x-p.size.x,0,p.position.z-p.size.z),new k(p.position.x+p.size.x,p.position.y*2,p.position.z+p.size.z)))}),h.instanceMatrix.needsUpdate=!0,h.instanceColor&&(h.instanceColor.needsUpdate=!0),h.frustumCulled=!0,this.group.add(h),this.disposables.push(l,u)}}dispose(){this.group.clear();for(const e of this.disposables)e.dispose();this.disposables=[],this.cameraColliders.length=0}}class Z0{constructor(e){me(this,"yaw",0);me(this,"pitch",.35);me(this,"distance",6);me(this,"targetDistance",6);me(this,"minDist",2.5);me(this,"maxDist",11);me(this,"shake",0);me(this,"baseFov",60);me(this,"currentFov",60);me(this,"tmp",new k);me(this,"desired",new k);me(this,"ray",new Nu);this.camera=e}rotate(e,t){this.yaw-=e*.0025,this.pitch=Ua.clamp(this.pitch-t*.0025,-.2,1.2)}zoom(e){this.targetDistance=Ua.clamp(this.targetDistance+e*.01,this.minDist,this.maxDist)}addShake(e){this.shake=Math.min(1,this.shake+e)}get facingYaw(){return this.yaw}update(e,t,n,r){this.distance=ka(this.distance,this.targetDistance,10,e);const s=this.tmp.set(t.x,t.y+1.4,t.z),a=new k(Math.sin(this.yaw)*Math.cos(this.pitch),Math.sin(this.pitch),Math.cos(this.yaw)*Math.cos(this.pitch));let l=this.distance;this.ray.set(s,a);let u=l;for(const o of r)if(this.ray.ray.intersectBox(o,this.desired)){const f=s.distanceTo(this.desired);f<u&&(u=f-.3)}l=Math.max(this.minDist,Math.min(l,u));const h=s.clone().add(a.multiplyScalar(l));this.shake>.001&&(h.x+=(Math.random()-.5)*this.shake*.4,h.y+=(Math.random()-.5)*this.shake*.4,this.shake*=Math.exp(-6*e)),this.camera.position.lerp(h,1-Math.exp(-16*e)),this.camera.lookAt(s);const p=n?this.baseFov+8:this.baseFov;this.currentFov=ka(this.currentFov,p,6,e),Math.abs(this.camera.fov-this.currentFov)>.01&&(this.camera.fov=this.currentFov,this.camera.updateProjectionMatrix())}}class j0 extends Iu{constructor(e){super(e),this.type=dt}parse(e){const a=function(D,H){switch(D){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(H||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(H||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(H||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(H||""))}},p=`
`,o=function(D,H,y){H=H||1024;let z=D.pos,G=-1,V=0,Q="",W=String.fromCharCode.apply(null,new Uint16Array(D.subarray(z,z+128)));for(;0>(G=W.indexOf(p))&&V<H&&z<D.byteLength;)Q+=W,V+=W.length,z+=128,W+=String.fromCharCode.apply(null,new Uint16Array(D.subarray(z,z+128)));return-1<G?(D.pos+=V+G+1,Q+W.slice(0,G)):!1},c=function(D){const H=/^#\?(\S+)/,y=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,S=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,z=/^\s*FORMAT=(\S+)\s*$/,G=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,V={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let Q,W;for((D.pos>=D.byteLength||!(Q=o(D)))&&a(1,"no header found"),(W=Q.match(H))||a(3,"bad initial token"),V.valid|=1,V.programtype=W[1],V.string+=Q+`
`;Q=o(D),Q!==!1;){if(V.string+=Q+`
`,Q.charAt(0)==="#"){V.comments+=Q+`
`;continue}if((W=Q.match(y))&&(V.gamma=parseFloat(W[1])),(W=Q.match(S))&&(V.exposure=parseFloat(W[1])),(W=Q.match(z))&&(V.valid|=2,V.format=W[1]),(W=Q.match(G))&&(V.valid|=4,V.height=parseInt(W[1],10),V.width=parseInt(W[2],10)),V.valid&2&&V.valid&4)break}return V.valid&2||a(3,"missing format specifier"),V.valid&4||a(3,"missing image size specifier"),V},f=function(D,H,y){const S=H;if(S<8||S>32767||D[0]!==2||D[1]!==2||D[2]&128)return new Uint8Array(D);S!==(D[2]<<8|D[3])&&a(3,"wrong scanline width");const z=new Uint8Array(4*H*y);z.length||a(4,"unable to allocate buffer space");let G=0,V=0;const Q=4*S,W=new Uint8Array(4),te=new Uint8Array(Q);let J=y;for(;J>0&&V<D.byteLength;){V+4>D.byteLength&&a(1),W[0]=D[V++],W[1]=D[V++],W[2]=D[V++],W[3]=D[V++],(W[0]!=2||W[1]!=2||(W[2]<<8|W[3])!=S)&&a(3,"bad rgbe scanline format");let le=0,he;for(;le<Q&&V<D.byteLength;){he=D[V++];const Ce=he>128;if(Ce&&(he-=128),(he===0||le+he>Q)&&a(3,"bad scanline data"),Ce){const Ne=D[V++];for(let $=0;$<he;$++)te[le++]=Ne}else te.set(D.subarray(V,V+he),le),le+=he,V+=he}const Se=S;for(let Ce=0;Ce<Se;Ce++){let Ne=0;z[G]=te[Ce+Ne],Ne+=S,z[G+1]=te[Ce+Ne],Ne+=S,z[G+2]=te[Ce+Ne],Ne+=S,z[G+3]=te[Ce+Ne],G+=4}J--}return z},v=function(D,H,y,S){const z=D[H+3],G=Math.pow(2,z-128)/255;y[S+0]=D[H+0]*G,y[S+1]=D[H+1]*G,y[S+2]=D[H+2]*G,y[S+3]=1},x=function(D,H,y,S){const z=D[H+3],G=Math.pow(2,z-128)/255;y[S+0]=Vi.toHalfFloat(Math.min(D[H+0]*G,65504)),y[S+1]=Vi.toHalfFloat(Math.min(D[H+1]*G,65504)),y[S+2]=Vi.toHalfFloat(Math.min(D[H+2]*G,65504)),y[S+3]=Vi.toHalfFloat(1)},g=new Uint8Array(e);g.pos=0;const m=c(g),w=m.width,E=m.height,C=f(g.subarray(g.pos),w,E);let B,L,P;switch(this.type){case Ut:P=C.length/4;const D=new Float32Array(P*4);for(let y=0;y<P;y++)v(C,y*4,D,y*4);B=D,L=Ut;break;case dt:P=C.length/4;const H=new Uint16Array(P*4);for(let y=0;y<P;y++)x(C,y*4,H,y*4);B=H,L=dt;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:w,height:E,data:B,header:m.string,gamma:m.gamma,exposure:m.exposure,type:L}}setDataType(e){return this.type=e,this}load(e,t,n,r){function s(a,l){switch(a.type){case Ut:case dt:a.colorSpace=en,a.minFilter=Ct,a.magFilter=Ct,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,l)}return super.load(e,s,n,r)}}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var $t=Uint8Array,Xi=Uint16Array,K0=Int32Array,Ou=new $t([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Fu=new $t([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),J0=new $t([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Bu=function(i,e){for(var t=new Xi(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var r=new K0(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)r[s]=s-t[n]<<5|n;return{b:t,r}},zu=Bu(Ou,2),ku=zu.b,Q0=zu.r;ku[28]=258,Q0[258]=28;var $0=Bu(Fu,0),e_=$0.b,Ha=new Xi(32768);for(var pt=0;pt<32768;++pt){var Jn=(pt&43690)>>1|(pt&21845)<<1;Jn=(Jn&52428)>>2|(Jn&13107)<<2,Jn=(Jn&61680)>>4|(Jn&3855)<<4,Ha[pt]=((Jn&65280)>>8|(Jn&255)<<8)>>1}var Rr=function(i,e,t){for(var n=i.length,r=0,s=new Xi(e);r<n;++r)i[r]&&++s[i[r]-1];var a=new Xi(e);for(r=1;r<e;++r)a[r]=a[r-1]+s[r-1]<<1;var l;if(t){l=new Xi(1<<e);var u=15-e;for(r=0;r<n;++r)if(i[r])for(var h=r<<4|i[r],p=e-i[r],o=a[i[r]-1]++<<p,c=o|(1<<p)-1;o<=c;++o)l[Ha[o]>>u]=h}else for(l=new Xi(n),r=0;r<n;++r)i[r]&&(l[r]=Ha[a[i[r]-1]++]>>15-i[r]);return l},Br=new $t(288);for(var pt=0;pt<144;++pt)Br[pt]=8;for(var pt=144;pt<256;++pt)Br[pt]=9;for(var pt=256;pt<280;++pt)Br[pt]=7;for(var pt=280;pt<288;++pt)Br[pt]=8;var Hu=new $t(32);for(var pt=0;pt<32;++pt)Hu[pt]=5;var t_=Rr(Br,9,1),n_=Rr(Hu,5,1),ko=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},cn=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},Ho=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},i_=function(i){return(i+7)/8|0},r_=function(i,e,t){return(t==null||t>i.length)&&(t=i.length),new $t(i.subarray(e,t))},s_=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],un=function(i,e,t){var n=new Error(e||s_[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,un),!t)throw n;return n},o_=function(i,e,t,n){var r=i.length,s=0;if(!r||e.f&&!e.l)return t||new $t(0);var a=!t,l=a||e.i!=2,u=e.i;a&&(t=new $t(r*3));var h=function($e){var We=t.length;if($e>We){var N=new $t(Math.max(We*2,$e));N.set(t),t=N}},p=e.f||0,o=e.p||0,c=e.b||0,f=e.l,v=e.d,x=e.m,g=e.n,m=r*8;do{if(!f){p=cn(i,o,1);var w=cn(i,o+1,3);if(o+=3,w)if(w==1)f=t_,v=n_,x=9,g=5;else if(w==2){var L=cn(i,o,31)+257,P=cn(i,o+10,15)+4,D=L+cn(i,o+5,31)+1;o+=14;for(var H=new $t(D),y=new $t(19),S=0;S<P;++S)y[J0[S]]=cn(i,o+S*3,7);o+=P*3;for(var z=ko(y),G=(1<<z)-1,V=Rr(y,z,1),S=0;S<D;){var Q=V[cn(i,o,G)];o+=Q&15;var E=Q>>4;if(E<16)H[S++]=E;else{var W=0,te=0;for(E==16?(te=3+cn(i,o,3),o+=2,W=H[S-1]):E==17?(te=3+cn(i,o,7),o+=3):E==18&&(te=11+cn(i,o,127),o+=7);te--;)H[S++]=W}}var J=H.subarray(0,L),le=H.subarray(L);x=ko(J),g=ko(le),f=Rr(J,x,1),v=Rr(le,g,1)}else un(1);else{var E=i_(o)+4,C=i[E-4]|i[E-3]<<8,B=E+C;if(B>r){u&&un(0);break}l&&h(c+C),t.set(i.subarray(E,B),c),e.b=c+=C,e.p=o=B*8,e.f=p;continue}if(o>m){u&&un(0);break}}l&&h(c+131072);for(var he=(1<<x)-1,Se=(1<<g)-1,Ce=o;;Ce=o){var W=f[Ho(i,o)&he],Ne=W>>4;if(o+=W&15,o>m){u&&un(0);break}if(W||un(2),Ne<256)t[c++]=Ne;else if(Ne==256){Ce=o,f=null;break}else{var $=Ne-254;if(Ne>264){var S=Ne-257,oe=Ou[S];$=cn(i,o,(1<<oe)-1)+ku[S],o+=oe}var ue=v[Ho(i,o)&Se],ge=ue>>4;ue||un(3),o+=ue&15;var le=e_[ge];if(ge>3){var oe=Fu[ge];le+=Ho(i,o)&(1<<oe)-1,o+=oe}if(o>m){u&&un(0);break}l&&h(c+131072);var Pe=c+$;if(c<le){var De=s-le,ke=Math.min(le,Pe);for(De+c<0&&un(3);c<ke;++c)t[c]=n[De+c]}for(;c<Pe;++c)t[c]=t[c-le]}}e.l=f,e.p=Ce,e.b=c,e.f=p,f&&(p=1,e.m=x,e.d=v,e.n=g)}while(!p);return c!=t.length&&a?r_(t,0,c):t.subarray(0,c)},a_=new $t(0),l_=function(i,e){return((i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31)&&un(6,"invalid zlib data"),(i[1]>>5&1)==1&&un(6,"invalid zlib data: "+(i[1]&32?"need":"unexpected")+" dictionary"),(i[1]>>3&4)+2};function Es(i,e){return o_(i.subarray(l_(i),-4),{i:2},e,e)}var c_=typeof TextDecoder<"u"&&new TextDecoder,u_=0;try{c_.decode(a_,{stream:!0}),u_=1}catch{}class h_ extends Iu{constructor(e){super(e),this.type=dt}parse(e){const H=Math.pow(2.7182818,2.2);function y(d,_){let M=0;for(let U=0;U<65536;++U)(U==0||d[U>>3]&1<<(U&7))&&(_[M++]=U);const T=M-1;for(;M<65536;)_[M++]=0;return T}function S(d){for(let _=0;_<16384;_++)d[_]={},d[_].len=0,d[_].lit=0,d[_].p=null}const z={l:0,c:0,lc:0};function G(d,_,M,T,U){for(;M<d;)_=_<<8|Ke(T,U),M+=8;M-=d,z.l=_>>M&(1<<d)-1,z.c=_,z.lc=M}const V=new Array(59);function Q(d){for(let M=0;M<=58;++M)V[M]=0;for(let M=0;M<65537;++M)V[d[M]]+=1;let _=0;for(let M=58;M>0;--M){const T=_+V[M]>>1;V[M]=_,_=T}for(let M=0;M<65537;++M){const T=d[M];T>0&&(d[M]=T|V[T]++<<6)}}function W(d,_,M,T,U,I){const X=_;let K=0,Z=0;for(;T<=U;T++){if(X.value-_.value>M)return!1;G(6,K,Z,d,X);const j=z.l;if(K=z.c,Z=z.lc,I[T]=j,j==63){if(X.value-_.value>M)throw new Error("Something wrong with hufUnpackEncTable");G(8,K,Z,d,X);let q=z.l+6;if(K=z.c,Z=z.lc,T+q>U+1)throw new Error("Something wrong with hufUnpackEncTable");for(;q--;)I[T++]=0;T--}else if(j>=59){let q=j-59+2;if(T+q>U+1)throw new Error("Something wrong with hufUnpackEncTable");for(;q--;)I[T++]=0;T--}}Q(I)}function te(d){return d&63}function J(d){return d>>6}function le(d,_,M,T){for(;_<=M;_++){const U=J(d[_]),I=te(d[_]);if(U>>I)throw new Error("Invalid table entry");if(I>14){const X=T[U>>I-14];if(X.len)throw new Error("Invalid table entry");if(X.lit++,X.p){const K=X.p;X.p=new Array(X.lit);for(let Z=0;Z<X.lit-1;++Z)X.p[Z]=K[Z]}else X.p=new Array(1);X.p[X.lit-1]=_}else if(I){let X=0;for(let K=1<<14-I;K>0;K--){const Z=T[(U<<14-I)+X];if(Z.len||Z.p)throw new Error("Invalid table entry");Z.len=I,Z.lit=_,X++}}}return!0}const he={c:0,lc:0};function Se(d,_,M,T){d=d<<8|Ke(M,T),_+=8,he.c=d,he.lc=_}const Ce={c:0,lc:0};function Ne(d,_,M,T,U,I,X,K,Z){if(d==_){T<8&&(Se(M,T,U,I),M=he.c,T=he.lc),T-=8;let j=M>>T;if(j=new Uint8Array([j])[0],K.value+j>Z)return!1;const q=X[K.value-1];for(;j-- >0;)X[K.value++]=q}else if(K.value<Z)X[K.value++]=d;else return!1;Ce.c=M,Ce.lc=T}function $(d){return d&65535}function oe(d){const _=$(d);return _>32767?_-65536:_}const ue={a:0,b:0};function ge(d,_){const M=oe(d),U=oe(_),I=M+(U&1)+(U>>1),X=I,K=I-U;ue.a=X,ue.b=K}function Pe(d,_){const M=$(d),T=$(_),U=M-(T>>1)&65535,I=T+U-32768&65535;ue.a=I,ue.b=U}function De(d,_,M,T,U,I,X){const K=X<16384,Z=M>U?U:M;let j=1,q,se;for(;j<=Z;)j<<=1;for(j>>=1,q=j,j>>=1;j>=1;){se=0;const de=se+I*(U-q),pe=I*j,Ae=I*q,ce=T*j,re=T*q;let Le,Ue,nt,bt;for(;se<=de;se+=Ae){let Je=se;const et=se+T*(M-q);for(;Je<=et;Je+=re){const Ye=Je+ce,xt=Je+pe,vt=xt+ce;K?(ge(d[Je+_],d[xt+_]),Le=ue.a,nt=ue.b,ge(d[Ye+_],d[vt+_]),Ue=ue.a,bt=ue.b,ge(Le,Ue),d[Je+_]=ue.a,d[Ye+_]=ue.b,ge(nt,bt),d[xt+_]=ue.a,d[vt+_]=ue.b):(Pe(d[Je+_],d[xt+_]),Le=ue.a,nt=ue.b,Pe(d[Ye+_],d[vt+_]),Ue=ue.a,bt=ue.b,Pe(Le,Ue),d[Je+_]=ue.a,d[Ye+_]=ue.b,Pe(nt,bt),d[xt+_]=ue.a,d[vt+_]=ue.b)}if(M&j){const Ye=Je+pe;K?ge(d[Je+_],d[Ye+_]):Pe(d[Je+_],d[Ye+_]),Le=ue.a,d[Ye+_]=ue.b,d[Je+_]=Le}}if(U&j){let Je=se;const et=se+T*(M-q);for(;Je<=et;Je+=re){const Ye=Je+ce;K?ge(d[Je+_],d[Ye+_]):Pe(d[Je+_],d[Ye+_]),Le=ue.a,d[Ye+_]=ue.b,d[Je+_]=Le}}q=j,j>>=1}return se}function ke(d,_,M,T,U,I,X,K,Z){let j=0,q=0;const se=X,de=Math.trunc(T.value+(U+7)/8);for(;T.value<de;)for(Se(j,q,M,T),j=he.c,q=he.lc;q>=14;){const Ae=j>>q-14&16383,ce=_[Ae];if(ce.len)q-=ce.len,Ne(ce.lit,I,j,q,M,T,K,Z,se),j=Ce.c,q=Ce.lc;else{if(!ce.p)throw new Error("hufDecode issues");let re;for(re=0;re<ce.lit;re++){const Le=te(d[ce.p[re]]);for(;q<Le&&T.value<de;)Se(j,q,M,T),j=he.c,q=he.lc;if(q>=Le&&J(d[ce.p[re]])==(j>>q-Le&(1<<Le)-1)){q-=Le,Ne(ce.p[re],I,j,q,M,T,K,Z,se),j=Ce.c,q=Ce.lc;break}}if(re==ce.lit)throw new Error("hufDecode issues")}}const pe=8-U&7;for(j>>=pe,q-=pe;q>0;){const Ae=_[j<<14-q&16383];if(Ae.len)q-=Ae.len,Ne(Ae.lit,I,j,q,M,T,K,Z,se),j=Ce.c,q=Ce.lc;else throw new Error("hufDecode issues")}return!0}function $e(d,_,M,T,U,I){const X={value:0},K=M.value,Z=xe(_,M),j=xe(_,M);M.value+=4;const q=xe(_,M);if(M.value+=4,Z<0||Z>=65537||j<0||j>=65537)throw new Error("Something wrong with HUF_ENCSIZE");const se=new Array(65537),de=new Array(16384);S(de);const pe=T-(M.value-K);if(W(d,M,pe,Z,j,se),q>8*(T-(M.value-K)))throw new Error("Something wrong with hufUncompress");le(se,Z,j,de),ke(se,de,d,M,q,j,I,U,X)}function We(d,_,M){for(let T=0;T<M;++T)_[T]=d[_[T]]}function N(d){for(let _=1;_<d.length;_++){const M=d[_-1]+d[_]-128;d[_]=M}}function St(d,_){let M=0,T=Math.floor((d.length+1)/2),U=0;const I=d.length-1;for(;!(U>I||(_[U++]=d[M++],U>I));)_[U++]=d[T++]}function qe(d){let _=d.byteLength;const M=new Array;let T=0;const U=new DataView(d);for(;_>0;){const I=U.getInt8(T++);if(I<0){const X=-I;_-=X+1;for(let K=0;K<X;K++)M.push(U.getUint8(T++))}else{const X=I;_-=2;const K=U.getUint8(T++);for(let Z=0;Z<X+1;Z++)M.push(K)}}return M}function Qe(d,_,M,T,U,I){let X=new DataView(I.buffer);const K=M[d.idx[0]].width,Z=M[d.idx[0]].height,j=3,q=Math.floor(K/8),se=Math.ceil(K/8),de=Math.ceil(Z/8),pe=K-(se-1)*8,Ae=Z-(de-1)*8,ce={value:0},re=new Array(j),Le=new Array(j),Ue=new Array(j),nt=new Array(j),bt=new Array(j);for(let et=0;et<j;++et)bt[et]=_[d.idx[et]],re[et]=et<1?0:re[et-1]+se*de,Le[et]=new Float32Array(64),Ue[et]=new Uint16Array(64),nt[et]=new Uint16Array(se*64);for(let et=0;et<de;++et){let Ye=8;et==de-1&&(Ye=Ae);let xt=8;for(let Xe=0;Xe<se;++Xe){Xe==se-1&&(xt=pe);for(let lt=0;lt<j;++lt)Ue[lt].fill(0),Ue[lt][0]=U[re[lt]++],Fe(ce,T,Ue[lt]),st(Ue[lt],Le[lt]),Be(Le[lt]);R(Le);for(let lt=0;lt<j;++lt)b(Le[lt],nt[lt],Xe*64)}let vt=0;for(let Xe=0;Xe<j;++Xe){const lt=M[d.idx[Xe]].type;for(let sn=8*et;sn<8*et+Ye;++sn){vt=bt[Xe][sn];for(let Vn=0;Vn<q;++Vn){const mn=Vn*64+(sn&7)*8;X.setUint16(vt+0*2*lt,nt[Xe][mn+0],!0),X.setUint16(vt+1*2*lt,nt[Xe][mn+1],!0),X.setUint16(vt+2*2*lt,nt[Xe][mn+2],!0),X.setUint16(vt+3*2*lt,nt[Xe][mn+3],!0),X.setUint16(vt+4*2*lt,nt[Xe][mn+4],!0),X.setUint16(vt+5*2*lt,nt[Xe][mn+5],!0),X.setUint16(vt+6*2*lt,nt[Xe][mn+6],!0),X.setUint16(vt+7*2*lt,nt[Xe][mn+7],!0),vt+=8*2*lt}}if(q!=se)for(let sn=8*et;sn<8*et+Ye;++sn){const Vn=bt[Xe][sn]+8*q*2*lt,mn=q*64+(sn&7)*8;for(let Xr=0;Xr<xt;++Xr)X.setUint16(Vn+Xr*2*lt,nt[Xe][mn+Xr],!0)}}}const Je=new Uint16Array(K);X=new DataView(I.buffer);for(let et=0;et<j;++et){M[d.idx[et]].decoded=!0;const Ye=M[d.idx[et]].type;if(M[et].type==2)for(let xt=0;xt<Z;++xt){const vt=bt[et][xt];for(let Xe=0;Xe<K;++Xe)Je[Xe]=X.getUint16(vt+Xe*2*Ye,!0);for(let Xe=0;Xe<K;++Xe)X.setFloat32(vt+Xe*2*Ye,F(Je[Xe]),!0)}}}function Fe(d,_,M){let T,U=1;for(;U<64;)T=_[d.value],T==65280?U=64:T>>8==255?U+=T&255:(M[U]=T,U++),d.value++}function st(d,_){_[0]=F(d[0]),_[1]=F(d[1]),_[2]=F(d[5]),_[3]=F(d[6]),_[4]=F(d[14]),_[5]=F(d[15]),_[6]=F(d[27]),_[7]=F(d[28]),_[8]=F(d[2]),_[9]=F(d[4]),_[10]=F(d[7]),_[11]=F(d[13]),_[12]=F(d[16]),_[13]=F(d[26]),_[14]=F(d[29]),_[15]=F(d[42]),_[16]=F(d[3]),_[17]=F(d[8]),_[18]=F(d[12]),_[19]=F(d[17]),_[20]=F(d[25]),_[21]=F(d[30]),_[22]=F(d[41]),_[23]=F(d[43]),_[24]=F(d[9]),_[25]=F(d[11]),_[26]=F(d[18]),_[27]=F(d[24]),_[28]=F(d[31]),_[29]=F(d[40]),_[30]=F(d[44]),_[31]=F(d[53]),_[32]=F(d[10]),_[33]=F(d[19]),_[34]=F(d[23]),_[35]=F(d[32]),_[36]=F(d[39]),_[37]=F(d[45]),_[38]=F(d[52]),_[39]=F(d[54]),_[40]=F(d[20]),_[41]=F(d[22]),_[42]=F(d[33]),_[43]=F(d[38]),_[44]=F(d[46]),_[45]=F(d[51]),_[46]=F(d[55]),_[47]=F(d[60]),_[48]=F(d[21]),_[49]=F(d[34]),_[50]=F(d[37]),_[51]=F(d[47]),_[52]=F(d[50]),_[53]=F(d[56]),_[54]=F(d[59]),_[55]=F(d[61]),_[56]=F(d[35]),_[57]=F(d[36]),_[58]=F(d[48]),_[59]=F(d[49]),_[60]=F(d[57]),_[61]=F(d[58]),_[62]=F(d[62]),_[63]=F(d[63])}function Be(d){const _=.5*Math.cos(.7853975),M=.5*Math.cos(3.14159/16),T=.5*Math.cos(3.14159/8),U=.5*Math.cos(3*3.14159/16),I=.5*Math.cos(5*3.14159/16),X=.5*Math.cos(3*3.14159/8),K=.5*Math.cos(7*3.14159/16),Z=new Array(4),j=new Array(4),q=new Array(4),se=new Array(4);for(let de=0;de<8;++de){const pe=de*8;Z[0]=T*d[pe+2],Z[1]=X*d[pe+2],Z[2]=T*d[pe+6],Z[3]=X*d[pe+6],j[0]=M*d[pe+1]+U*d[pe+3]+I*d[pe+5]+K*d[pe+7],j[1]=U*d[pe+1]-K*d[pe+3]-M*d[pe+5]-I*d[pe+7],j[2]=I*d[pe+1]-M*d[pe+3]+K*d[pe+5]+U*d[pe+7],j[3]=K*d[pe+1]-I*d[pe+3]+U*d[pe+5]-M*d[pe+7],q[0]=_*(d[pe+0]+d[pe+4]),q[3]=_*(d[pe+0]-d[pe+4]),q[1]=Z[0]+Z[3],q[2]=Z[1]-Z[2],se[0]=q[0]+q[1],se[1]=q[3]+q[2],se[2]=q[3]-q[2],se[3]=q[0]-q[1],d[pe+0]=se[0]+j[0],d[pe+1]=se[1]+j[1],d[pe+2]=se[2]+j[2],d[pe+3]=se[3]+j[3],d[pe+4]=se[3]-j[3],d[pe+5]=se[2]-j[2],d[pe+6]=se[1]-j[1],d[pe+7]=se[0]-j[0]}for(let de=0;de<8;++de)Z[0]=T*d[16+de],Z[1]=X*d[16+de],Z[2]=T*d[48+de],Z[3]=X*d[48+de],j[0]=M*d[8+de]+U*d[24+de]+I*d[40+de]+K*d[56+de],j[1]=U*d[8+de]-K*d[24+de]-M*d[40+de]-I*d[56+de],j[2]=I*d[8+de]-M*d[24+de]+K*d[40+de]+U*d[56+de],j[3]=K*d[8+de]-I*d[24+de]+U*d[40+de]-M*d[56+de],q[0]=_*(d[de]+d[32+de]),q[3]=_*(d[de]-d[32+de]),q[1]=Z[0]+Z[3],q[2]=Z[1]-Z[2],se[0]=q[0]+q[1],se[1]=q[3]+q[2],se[2]=q[3]-q[2],se[3]=q[0]-q[1],d[0+de]=se[0]+j[0],d[8+de]=se[1]+j[1],d[16+de]=se[2]+j[2],d[24+de]=se[3]+j[3],d[32+de]=se[3]-j[3],d[40+de]=se[2]-j[2],d[48+de]=se[1]-j[1],d[56+de]=se[0]-j[0]}function R(d){for(let _=0;_<64;++_){const M=d[0][_],T=d[1][_],U=d[2][_];d[0][_]=M+1.5747*U,d[1][_]=M-.1873*T-.4682*U,d[2][_]=M+1.8556*T}}function b(d,_,M){for(let T=0;T<64;++T)_[M+T]=Vi.toHalfFloat(Y(d[T]))}function Y(d){return d<=1?Math.sign(d)*Math.pow(Math.abs(d),2.2):Math.sign(d)*Math.pow(H,Math.abs(d)-1)}function ne(d){return new DataView(d.array.buffer,d.offset.value,d.size)}function ae(d){const _=d.viewer.buffer.slice(d.offset.value,d.offset.value+d.size),M=new Uint8Array(qe(_)),T=new Uint8Array(M.length);return N(M),St(M,T),new DataView(T.buffer)}function ee(d){const _=d.array.slice(d.offset.value,d.offset.value+d.size),M=Es(_),T=new Uint8Array(M.length);return N(M),St(M,T),new DataView(T.buffer)}function Re(d){const _=d.viewer,M={value:d.offset.value},T=new Uint16Array(d.columns*d.lines*(d.inputChannels.length*d.type)),U=new Uint8Array(8192);let I=0;const X=new Array(d.inputChannels.length);for(let Ae=0,ce=d.inputChannels.length;Ae<ce;Ae++)X[Ae]={},X[Ae].start=I,X[Ae].end=X[Ae].start,X[Ae].nx=d.columns,X[Ae].ny=d.lines,X[Ae].size=d.type,I+=X[Ae].nx*X[Ae].ny*X[Ae].size;const K=ie(_,M),Z=ie(_,M);if(Z>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(K<=Z)for(let Ae=0;Ae<Z-K+1;Ae++)U[Ae+K]=Oe(_,M);const j=new Uint16Array(65536),q=y(U,j),se=xe(_,M);$e(d.array,_,M,se,T,I);for(let Ae=0;Ae<d.inputChannels.length;++Ae){const ce=X[Ae];for(let re=0;re<X[Ae].size;++re)De(T,ce.start+re,ce.nx,ce.size,ce.ny,ce.nx*ce.size,q)}We(j,T,I);let de=0;const pe=new Uint8Array(T.buffer.byteLength);for(let Ae=0;Ae<d.lines;Ae++)for(let ce=0;ce<d.inputChannels.length;ce++){const re=X[ce],Le=re.nx*re.size,Ue=new Uint8Array(T.buffer,re.end*2,Le*2);pe.set(Ue,de),de+=Le*2,re.end+=Le}return new DataView(pe.buffer)}function _e(d){const _=d.array.slice(d.offset.value,d.offset.value+d.size),M=Es(_),T=d.inputChannels.length*d.lines*d.columns*d.totalBytes,U=new ArrayBuffer(T),I=new DataView(U);let X=0,K=0;const Z=new Array(4);for(let j=0;j<d.lines;j++)for(let q=0;q<d.inputChannels.length;q++){let se=0;switch(d.inputChannels[q].pixelType){case 1:Z[0]=X,Z[1]=Z[0]+d.columns,X=Z[1]+d.columns;for(let pe=0;pe<d.columns;++pe){const Ae=M[Z[0]++]<<8|M[Z[1]++];se+=Ae,I.setUint16(K,se,!0),K+=2}break;case 2:Z[0]=X,Z[1]=Z[0]+d.columns,Z[2]=Z[1]+d.columns,X=Z[2]+d.columns;for(let pe=0;pe<d.columns;++pe){const Ae=M[Z[0]++]<<24|M[Z[1]++]<<16|M[Z[2]++]<<8;se+=Ae,I.setUint32(K,se,!0),K+=4}break}}return I}function be(d){const _=d.viewer,M={value:d.offset.value},T=new Uint8Array(d.columns*d.lines*(d.inputChannels.length*d.type*2)),U={version:He(_,M),unknownUncompressedSize:He(_,M),unknownCompressedSize:He(_,M),acCompressedSize:He(_,M),dcCompressedSize:He(_,M),rleCompressedSize:He(_,M),rleUncompressedSize:He(_,M),rleRawSize:He(_,M),totalAcUncompressedCount:He(_,M),totalDcUncompressedCount:He(_,M),acCompression:He(_,M)};if(U.version<2)throw new Error("EXRLoader.parse: "+Tn.compression+" version "+U.version+" is unsupported");const I=new Array;let X=ie(_,M)-2;for(;X>0;){const ce=Ve(_.buffer,M),re=Oe(_,M),Le=re>>2&3,Ue=(re>>4)-1,nt=new Int8Array([Ue])[0],bt=Oe(_,M);I.push({name:ce,index:nt,type:bt,compression:Le}),X-=ce.length+3}const K=Tn.channels,Z=new Array(d.inputChannels.length);for(let ce=0;ce<d.inputChannels.length;++ce){const re=Z[ce]={},Le=K[ce];re.name=Le.name,re.compression=0,re.decoded=!1,re.type=Le.pixelType,re.pLinear=Le.pLinear,re.width=d.columns,re.height=d.lines}const j={idx:new Array(3)};for(let ce=0;ce<d.inputChannels.length;++ce){const re=Z[ce];for(let Le=0;Le<I.length;++Le){const Ue=I[Le];re.name==Ue.name&&(re.compression=Ue.compression,Ue.index>=0&&(j.idx[Ue.index]=ce),re.offset=ce)}}let q,se,de;if(U.acCompressedSize>0)switch(U.acCompression){case 0:q=new Uint16Array(U.totalAcUncompressedCount),$e(d.array,_,M,U.acCompressedSize,q,U.totalAcUncompressedCount);break;case 1:const ce=d.array.slice(M.value,M.value+U.totalAcUncompressedCount),re=Es(ce);q=new Uint16Array(re.buffer),M.value+=U.totalAcUncompressedCount;break}if(U.dcCompressedSize>0){const ce={array:d.array,offset:M,size:U.dcCompressedSize};se=new Uint16Array(ee(ce).buffer),M.value+=U.dcCompressedSize}if(U.rleRawSize>0){const ce=d.array.slice(M.value,M.value+U.rleCompressedSize),re=Es(ce);de=qe(re.buffer),M.value+=U.rleCompressedSize}let pe=0;const Ae=new Array(Z.length);for(let ce=0;ce<Ae.length;++ce)Ae[ce]=new Array;for(let ce=0;ce<d.lines;++ce)for(let re=0;re<Z.length;++re)Ae[re].push(pe),pe+=Z[re].width*d.type*2;Qe(j,Ae,Z,q,se,T);for(let ce=0;ce<Z.length;++ce){const re=Z[ce];if(!re.decoded)switch(re.compression){case 2:let Le=0,Ue=0;for(let nt=0;nt<d.lines;++nt){let bt=Ae[ce][Le];for(let Je=0;Je<re.width;++Je){for(let et=0;et<2*re.type;++et)T[bt++]=de[Ue+et*re.width*re.height];Ue++}Le++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(T.buffer)}function Ve(d,_){const M=new Uint8Array(d);let T=0;for(;M[_.value+T]!=0;)T+=1;const U=new TextDecoder().decode(M.slice(_.value,_.value+T));return _.value=_.value+T+1,U}function fe(d,_,M){const T=new TextDecoder().decode(new Uint8Array(d).slice(_.value,_.value+M));return _.value=_.value+M,T}function Ee(d,_){const M=Ie(d,_),T=xe(d,_);return[M,T]}function ze(d,_){const M=xe(d,_),T=xe(d,_);return[M,T]}function Ie(d,_){const M=d.getInt32(_.value,!0);return _.value=_.value+4,M}function xe(d,_){const M=d.getUint32(_.value,!0);return _.value=_.value+4,M}function Ke(d,_){const M=d[_.value];return _.value=_.value+1,M}function Oe(d,_){const M=d.getUint8(_.value);return _.value=_.value+1,M}const He=function(d,_){let M;return"getBigInt64"in DataView.prototype?M=Number(d.getBigInt64(_.value,!0)):M=d.getUint32(_.value+4,!0)+Number(d.getUint32(_.value,!0)<<32),_.value+=8,M};function O(d,_){const M=d.getFloat32(_.value,!0);return _.value+=4,M}function ye(d,_){return Vi.toHalfFloat(O(d,_))}function F(d){const _=(d&31744)>>10,M=d&1023;return(d>>15?-1:1)*(_?_===31?M?NaN:1/0:Math.pow(2,_-15)*(1+M/1024):6103515625e-14*(M/1024))}function ie(d,_){const M=d.getUint16(_.value,!0);return _.value+=2,M}function Te(d,_){return F(ie(d,_))}function we(d,_,M,T){const U=M.value,I=[];for(;M.value<U+T-1;){const X=Ve(_,M),K=Ie(d,M),Z=Oe(d,M);M.value+=3;const j=Ie(d,M),q=Ie(d,M);I.push({name:X,pixelType:K,pLinear:Z,xSampling:j,ySampling:q})}return M.value+=1,I}function tt(d,_){const M=O(d,_),T=O(d,_),U=O(d,_),I=O(d,_),X=O(d,_),K=O(d,_),Z=O(d,_),j=O(d,_);return{redX:M,redY:T,greenX:U,greenY:I,blueX:X,blueY:K,whiteX:Z,whiteY:j}}function gt(d,_){const M=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],T=Oe(d,_);return M[T]}function Ot(d,_){const M=Ie(d,_),T=Ie(d,_),U=Ie(d,_),I=Ie(d,_);return{xMin:M,yMin:T,xMax:U,yMax:I}}function rt(d,_){const M=["INCREASING_Y","DECREASING_Y","RANDOM_Y"],T=Oe(d,_);return M[T]}function Ft(d,_){const M=["ENVMAP_LATLONG","ENVMAP_CUBE"],T=Oe(d,_);return M[T]}function rn(d,_){const M=["ONE_LEVEL","MIPMAP_LEVELS","RIPMAP_LEVELS"],T=["ROUND_DOWN","ROUND_UP"],U=xe(d,_),I=xe(d,_),X=Oe(d,_);return{xSize:U,ySize:I,levelMode:M[X&15],roundingMode:T[X>>4]}}function zr(d,_){const M=O(d,_),T=O(d,_);return[M,T]}function kr(d,_){const M=O(d,_),T=O(d,_),U=O(d,_);return[M,T,U]}function En(d,_,M,T,U){if(T==="string"||T==="stringvector"||T==="iccProfile")return fe(_,M,U);if(T==="chlist")return we(d,_,M,U);if(T==="chromaticities")return tt(d,M);if(T==="compression")return gt(d,M);if(T==="box2i")return Ot(d,M);if(T==="envmap")return Ft(d,M);if(T==="tiledesc")return rn(d,M);if(T==="lineOrder")return rt(d,M);if(T==="float")return O(d,M);if(T==="v2f")return zr(d,M);if(T==="v3f")return kr(d,M);if(T==="int")return Ie(d,M);if(T==="rational")return Ee(d,M);if(T==="timecode")return ze(d,M);if(T==="preview")return M.value+=U,"skipped";M.value+=U}function hr(d,_){const M=Math.log2(d);return _=="ROUND_DOWN"?Math.floor(M):Math.ceil(M)}function Hr(d,_,M){let T=0;switch(d.levelMode){case"ONE_LEVEL":T=1;break;case"MIPMAP_LEVELS":T=hr(Math.max(_,M),d.roundingMode)+1;break;case"RIPMAP_LEVELS":throw new Error("THREE.EXRLoader: RIPMAP_LEVELS tiles currently unsupported.")}return T}function fr(d,_,M,T){const U=new Array(d);for(let I=0;I<d;I++){const X=1<<I;let K=_/X|0;T=="ROUND_UP"&&K*X<_&&(K+=1);const Z=Math.max(K,1);U[I]=(Z+M-1)/M|0}return U}function Ti(){const d=this,_=d.offset,M={value:0};for(let T=0;T<d.tileCount;T++){const U=Ie(d.viewer,_),I=Ie(d.viewer,_);_.value+=8,d.size=xe(d.viewer,_);const X=U*d.blockWidth,K=I*d.blockHeight;d.columns=X+d.blockWidth>d.width?d.width-X:d.blockWidth,d.lines=K+d.blockHeight>d.height?d.height-K:d.blockHeight;const Z=d.columns*d.totalBytes,q=d.size<d.lines*Z?d.uncompress(d):ne(d);_.value+=d.size;for(let se=0;se<d.lines;se++){const de=se*d.columns*d.totalBytes;for(let pe=0;pe<d.inputChannels.length;pe++){const Ae=Tn.channels[pe].name,ce=d.channelByteOffsets[Ae]*d.columns,re=d.decodeChannels[Ae];if(re===void 0)continue;M.value=de+ce;const Le=(d.height-(1+K+se))*d.outLineWidth;for(let Ue=0;Ue<d.columns;Ue++){const nt=Le+(Ue+X)*d.outputChannels+re;d.byteArray[nt]=d.getter(q,M)}}}}}function Gr(){const d=this,_=d.offset,M={value:0};for(let T=0;T<d.height/d.blockHeight;T++){const U=Ie(d.viewer,_)-Tn.dataWindow.yMin;d.size=xe(d.viewer,_),d.lines=U+d.blockHeight>d.height?d.height-U:d.blockHeight;const I=d.columns*d.totalBytes,K=d.size<d.lines*I?d.uncompress(d):ne(d);_.value+=d.size;for(let Z=0;Z<d.blockHeight;Z++){const j=T*d.blockHeight,q=Z+d.scanOrder(j);if(q>=d.height)continue;const se=Z*I,de=(d.height-1-q)*d.outLineWidth;for(let pe=0;pe<d.inputChannels.length;pe++){const Ae=Tn.channels[pe].name,ce=d.channelByteOffsets[Ae]*d.columns,re=d.decodeChannels[Ae];if(re!==void 0){M.value=se+ce;for(let Le=0;Le<d.columns;Le++){const Ue=de+Le*d.outputChannels+re;d.byteArray[Ue]=d.getter(K,M)}}}}}}function wi(d,_,M){const T={};if(d.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");T.version=d.getUint8(4);const U=d.getUint8(5);T.spec={singleTile:!!(U&2),longName:!!(U&4),deepFormat:!!(U&8),multiPart:!!(U&16)},M.value=8;let I=!0;for(;I;){const X=Ve(_,M);if(X==0)I=!1;else{const K=Ve(_,M),Z=xe(d,M),j=En(d,_,M,K,Z);j===void 0?console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${K}'.`):T[X]=j}}if(U&-7)throw console.error("THREE.EXRHeader:",T),new Error("THREE.EXRLoader: Provided file is currently unsupported.");return T}function Vr(d,_,M,T,U){const I={size:0,viewer:_,array:M,offset:T,width:d.dataWindow.xMax-d.dataWindow.xMin+1,height:d.dataWindow.yMax-d.dataWindow.yMin+1,inputChannels:d.channels,channelByteOffsets:{},scanOrder:null,totalBytes:null,columns:null,lines:null,type:null,uncompress:null,getter:null,format:null,colorSpace:en};switch(d.compression){case"NO_COMPRESSION":I.blockHeight=1,I.uncompress=ne;break;case"RLE_COMPRESSION":I.blockHeight=1,I.uncompress=ae;break;case"ZIPS_COMPRESSION":I.blockHeight=1,I.uncompress=ee;break;case"ZIP_COMPRESSION":I.blockHeight=16,I.uncompress=ee;break;case"PIZ_COMPRESSION":I.blockHeight=32,I.uncompress=Re;break;case"PXR24_COMPRESSION":I.blockHeight=16,I.uncompress=_e;break;case"DWAA_COMPRESSION":I.blockHeight=32,I.uncompress=be;break;case"DWAB_COMPRESSION":I.blockHeight=256,I.uncompress=be;break;default:throw new Error("EXRLoader.parse: "+d.compression+" is unsupported")}const X={};for(const q of d.channels)switch(q.name){case"Y":case"R":case"G":case"B":case"A":X[q.name]=!0,I.type=q.pixelType}let K=!1;if(X.R&&X.G&&X.B)K=!X.A,I.outputChannels=4,I.decodeChannels={R:0,G:1,B:2,A:3};else if(X.Y)I.outputChannels=1,I.decodeChannels={Y:0};else throw new Error("EXRLoader.parse: file contains unsupported data channels.");if(I.type==1)switch(U){case Ut:I.getter=Te;break;case dt:I.getter=ie;break}else if(I.type==2)switch(U){case Ut:I.getter=O;break;case dt:I.getter=ye}else throw new Error("EXRLoader.parse: unsupported pixelType "+I.type+" for "+d.compression+".");I.columns=I.width;const Z=I.width*I.height*I.outputChannels;switch(U){case Ut:I.byteArray=new Float32Array(Z),K&&I.byteArray.fill(1,0,Z);break;case dt:I.byteArray=new Uint16Array(Z),K&&I.byteArray.fill(15360,0,Z);break;default:console.error("THREE.EXRLoader: unsupported type: ",U);break}let j=0;for(const q of d.channels)I.decodeChannels[q.name]!==void 0&&(I.channelByteOffsets[q.name]=j),j+=q.pixelType*2;if(I.totalBytes=j,I.outLineWidth=I.width*I.outputChannels,d.lineOrder==="INCREASING_Y"?I.scanOrder=q=>q:I.scanOrder=q=>I.height-1-q,I.outputChannels==4?(I.format=Yt,I.colorSpace=en):(I.format=Nr,I.colorSpace=Un),d.spec.singleTile){I.blockHeight=d.tiles.ySize,I.blockWidth=d.tiles.xSize;const q=Hr(d.tiles,I.width,I.height),se=fr(q,I.width,d.tiles.xSize,d.tiles.roundingMode),de=fr(q,I.height,d.tiles.ySize,d.tiles.roundingMode);I.tileCount=se[0]*de[0];for(let pe=0;pe<q;pe++)for(let Ae=0;Ae<de[pe];Ae++)for(let ce=0;ce<se[pe];ce++)He(_,T);I.decode=Ti.bind(I)}else{I.blockWidth=I.width;const q=Math.ceil(I.height/I.blockHeight);for(let se=0;se<q;se++)He(_,T);I.decode=Gr.bind(I)}return I}const dr={value:0},Wr=new DataView(e),Qs=new Uint8Array(e),Tn=wi(Wr,e,dr),A=Vr(Tn,Wr,Qs,dr,this.type);return A.decode(),{header:Tn,width:A.width,height:A.height,data:A.byteArray,format:A.format,colorSpace:A.colorSpace,type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,r){function s(a,l){a.colorSpace=l.colorSpace,a.minFilter=Ct,a.magFilter=Ct,a.generateMipmaps=!1,a.flipY=!1,t&&t(a,l)}return super.load(e,s,n,r)}}class f_{constructor(e,t){me(this,"scene");me(this,"renderer");me(this,"pmremGenerator");me(this,"currentFog",null);this.scene=e,this.renderer=t,this.pmremGenerator=new Na(this.renderer),this.pmremGenerator.compileEquirectangularShader()}async loadHDRI(e,t=!1){const n=t?new h_:new j0;return n.setDataType(dt),new Promise((r,s)=>{n.load(e,a=>{const l=this.pmremGenerator.fromEquirectangular(a).texture;this.scene.environment=l,this.scene.background=l,a.dispose(),r()},void 0,a=>s(a))})}setCinematicFog(e,t){this.currentFog?(this.currentFog.color.setHex(e),this.currentFog.density=t):(this.currentFog=new Ks(e,t),this.scene.fog=this.currentFog),this.scene.background=new Ge(e)}generateProceduralEnvironment(){this.scene.environment=this.pmremGenerator.fromScene(new Au).texture}}class d_{constructor(e,t,n){me(this,"mesh");me(this,"count");me(this,"dummy",new Mt);me(this,"velocities",[]);this.count=t;const r=n==="rain"?new cr(.01,.01,.5,3):new ar(.05,.05),s=n==="rain"?new Ei({color:11184810,transparent:!0,opacity:.5}):new Ei({color:16764074,transparent:!0,opacity:.2});this.mesh=new Js(r,s,t);for(let a=0;a<t;a++)this.dummy.position.set((Math.random()-.5)*50,Math.random()*20,(Math.random()-.5)*50),this.dummy.updateMatrix(),this.mesh.setMatrixAt(a,this.dummy.matrix),n==="rain"?this.velocities.push(new k(0,-20-Math.random()*10,0)):this.velocities.push(new k((Math.random()-.5)*.5,(Math.random()-.5)*.5,(Math.random()-.5)*.5));this.mesh.instanceMatrix.needsUpdate=!0,e.add(this.mesh)}update(e){for(let t=0;t<this.count;t++)this.mesh.getMatrixAt(t,this.dummy.matrix),this.dummy.position.setFromMatrixPosition(this.dummy.matrix),this.dummy.position.addScaledVector(this.velocities[t],e),this.dummy.position.y<-5&&(this.dummy.position.y=20,this.dummy.position.x=(Math.random()-.5)*50,this.dummy.position.z=(Math.random()-.5)*50),this.dummy.updateMatrix(),this.mesh.setMatrixAt(t,this.dummy.matrix);this.mesh.instanceMatrix.needsUpdate=!0}dispose(e){e.remove(this.mesh),this.mesh.dispose(),this.mesh.geometry.dispose(),Array.isArray(this.mesh.material)?this.mesh.material.forEach(t=>t.dispose()):this.mesh.material.dispose()}}class Go{static createInstancedMesh(e,t,n,r=!0,s=!0){const a=new Js(e,t,n.length);a.castShadow=r,a.receiveShadow=s;const l=new Mt;for(let u=0;u<n.length;u++){l.position.copy(n[u].position);const h=n[u].rotation;h&&l.rotation.copy(h);const p=n[u].scale;p?l.scale.copy(p):l.scale.set(1,1,1),l.updateMatrix(),a.setMatrixAt(u,l.matrix)}return a.instanceMatrix.needsUpdate=!0,a}static createLOD(e){const t=new Qv;for(const n of e)t.addLevel(n.mesh,n.distance);return t}}class p_{constructor(e){me(this,"windMaterials",[]);this.scene=e}generateGrassField(e,t){const n=new xi(.1,1,3);n.translate(0,.5,0);const r=new ii({color:4881497,roughness:1,side:xn});this.addWindShader(r,3,.15);const s=[];for(let l=0;l<t;l++){const u=(Math.random()-.5)*e,h=(Math.random()-.5)*e,p=.5+Math.random()*.8,o=Math.random()*Math.PI*2;s.push({position:new k(u,0,h),rotation:new tn(0,o,0),scale:new k(1,p,1)})}const a=Go.createInstancedMesh(n,r,s,!1,!0);return this.scene.add(a),a}generateForest(e,t){const n=new Bn,r=new cr(.4,.6,3,8);r.translate(0,1.5,0);const s=new ii({color:4864818,roughness:.9}),a=new yi(2.5,12,12);a.translate(0,4,0);const l=new ii({color:2972199,roughness:.8});this.addWindShader(l,1.5,.05);const u=[],h=[];for(let c=0;c<t;c++){const f=(Math.random()-.5)*e,v=(Math.random()-.5)*e,x=.8+Math.random()*.6,g=Math.random()*Math.PI*2,m={position:new k(f,0,v),rotation:new tn(0,g,0),scale:new k(x,x,x)};u.push(m),h.push(m)}const p=Go.createInstancedMesh(r,s,u,!0,!0),o=Go.createInstancedMesh(a,l,h,!0,!0);return n.add(p),n.add(o),this.scene.add(n),n}addWindShader(e,t,n){e.userData.time={value:0},e.onBeforeCompile=r=>{r.uniforms.uTime=e.userData.time,r.uniforms.uWindSpeed={value:t},r.uniforms.uWindIntensity={value:n},r.vertexShader=`
        uniform float uTime;
        uniform float uWindSpeed;
        uniform float uWindIntensity;
        ${r.vertexShader}
      `.replace("#include <begin_vertex>",`
        #include <begin_vertex>
        // Sway based on world position and vertex height
        vec4 worldPos = modelMatrix * instanceMatrix * vec4(position, 1.0);
        float sway = sin(uTime * uWindSpeed + worldPos.x * 0.5 + worldPos.z * 0.5) * uWindIntensity;
        transformed.x += sway * position.y;
        transformed.z += sway * position.y * 0.5;
        `)},this.windMaterials.push(e)}update(e){for(const t of this.windMaterials)t.userData.time&&(t.userData.time.value+=e)}}var Sr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Kt={};/*!
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */(function(i){(function(){var e=function(){this.init()};e.prototype={init:function(){var o=this||t;return o._counter=1e3,o._html5AudioPool=[],o.html5PoolSize=10,o._codecs={},o._howls=[],o._muted=!1,o._volume=1,o._canPlayEvent="canplaythrough",o._navigator=typeof window<"u"&&window.navigator?window.navigator:null,o.masterGain=null,o.noAudio=!1,o.usingWebAudio=!0,o.autoSuspend=!0,o.ctx=null,o.autoUnlock=!0,o._setup(),o},volume:function(o){var c=this||t;if(o=parseFloat(o),c.ctx||p(),typeof o<"u"&&o>=0&&o<=1){if(c._volume=o,c._muted)return c;c.usingWebAudio&&c.masterGain.gain.setValueAtTime(o,t.ctx.currentTime);for(var f=0;f<c._howls.length;f++)if(!c._howls[f]._webAudio)for(var v=c._howls[f]._getSoundIds(),x=0;x<v.length;x++){var g=c._howls[f]._soundById(v[x]);g&&g._node&&(g._node.volume=g._volume*o)}return c}return c._volume},mute:function(o){var c=this||t;c.ctx||p(),c._muted=o,c.usingWebAudio&&c.masterGain.gain.setValueAtTime(o?0:c._volume,t.ctx.currentTime);for(var f=0;f<c._howls.length;f++)if(!c._howls[f]._webAudio)for(var v=c._howls[f]._getSoundIds(),x=0;x<v.length;x++){var g=c._howls[f]._soundById(v[x]);g&&g._node&&(g._node.muted=o?!0:g._muted)}return c},stop:function(){for(var o=this||t,c=0;c<o._howls.length;c++)o._howls[c].stop();return o},unload:function(){for(var o=this||t,c=o._howls.length-1;c>=0;c--)o._howls[c].unload();return o.usingWebAudio&&o.ctx&&typeof o.ctx.close<"u"&&(o.ctx.close(),o.ctx=null,p()),o},codecs:function(o){return(this||t)._codecs[o.replace(/^x-/,"")]},_setup:function(){var o=this||t;if(o.state=o.ctx&&o.ctx.state||"suspended",o._autoSuspend(),!o.usingWebAudio)if(typeof Audio<"u")try{var c=new Audio;typeof c.oncanplaythrough>"u"&&(o._canPlayEvent="canplay")}catch{o.noAudio=!0}else o.noAudio=!0;try{var c=new Audio;c.muted&&(o.noAudio=!0)}catch{}return o.noAudio||o._setupCodecs(),o},_setupCodecs:function(){var o=this||t,c=null;try{c=typeof Audio<"u"?new Audio:null}catch{return o}if(!c||typeof c.canPlayType!="function")return o;var f=c.canPlayType("audio/mpeg;").replace(/^no$/,""),v=o._navigator?o._navigator.userAgent:"",x=v.match(/OPR\/(\d+)/g),g=x&&parseInt(x[0].split("/")[1],10)<33,m=v.indexOf("Safari")!==-1&&v.indexOf("Chrome")===-1,w=v.match(/Version\/(.*?) /),E=m&&w&&parseInt(w[1],10)<15;return o._codecs={mp3:!!(!g&&(f||c.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!f,opus:!!c.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(c.canPlayType('audio/wav; codecs="1"')||c.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!c.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!c.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(c.canPlayType("audio/x-m4a;")||c.canPlayType("audio/m4a;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(c.canPlayType("audio/x-m4b;")||c.canPlayType("audio/m4b;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(c.canPlayType("audio/x-mp4;")||c.canPlayType("audio/mp4;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!E&&c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!E&&c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!c.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(c.canPlayType("audio/x-flac;")||c.canPlayType("audio/flac;")).replace(/^no$/,"")},o},_unlockAudio:function(){var o=this||t;if(!(o._audioUnlocked||!o.ctx)){o._audioUnlocked=!1,o.autoUnlock=!1,!o._mobileUnloaded&&o.ctx.sampleRate!==44100&&(o._mobileUnloaded=!0,o.unload()),o._scratchBuffer=o.ctx.createBuffer(1,1,22050);var c=function(f){for(;o._html5AudioPool.length<o.html5PoolSize;)try{var v=new Audio;v._unlocked=!0,o._releaseHtml5Audio(v)}catch{o.noAudio=!0;break}for(var x=0;x<o._howls.length;x++)if(!o._howls[x]._webAudio)for(var g=o._howls[x]._getSoundIds(),m=0;m<g.length;m++){var w=o._howls[x]._soundById(g[m]);w&&w._node&&!w._node._unlocked&&(w._node._unlocked=!0,w._node.load())}o._autoResume();var E=o.ctx.createBufferSource();E.buffer=o._scratchBuffer,E.connect(o.ctx.destination),typeof E.start>"u"?E.noteOn(0):E.start(0),typeof o.ctx.resume=="function"&&o.ctx.resume(),E.onended=function(){E.disconnect(0),o._audioUnlocked=!0,document.removeEventListener("touchstart",c,!0),document.removeEventListener("touchend",c,!0),document.removeEventListener("click",c,!0),document.removeEventListener("keydown",c,!0);for(var C=0;C<o._howls.length;C++)o._howls[C]._emit("unlock")}};return document.addEventListener("touchstart",c,!0),document.addEventListener("touchend",c,!0),document.addEventListener("click",c,!0),document.addEventListener("keydown",c,!0),o}},_obtainHtml5Audio:function(){var o=this||t;if(o._html5AudioPool.length)return o._html5AudioPool.pop();var c=new Audio().play();return c&&typeof Promise<"u"&&(c instanceof Promise||typeof c.then=="function")&&c.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(o){var c=this||t;return o._unlocked&&c._html5AudioPool.push(o),c},_autoSuspend:function(){var o=this;if(!(!o.autoSuspend||!o.ctx||typeof o.ctx.suspend>"u"||!t.usingWebAudio)){for(var c=0;c<o._howls.length;c++)if(o._howls[c]._webAudio){for(var f=0;f<o._howls[c]._sounds.length;f++)if(!o._howls[c]._sounds[f]._paused)return o}return o._suspendTimer&&clearTimeout(o._suspendTimer),o._suspendTimer=setTimeout(function(){if(o.autoSuspend){o._suspendTimer=null,o.state="suspending";var v=function(){o.state="suspended",o._resumeAfterSuspend&&(delete o._resumeAfterSuspend,o._autoResume())};o.ctx.suspend().then(v,v)}},3e4),o}},_autoResume:function(){var o=this;if(!(!o.ctx||typeof o.ctx.resume>"u"||!t.usingWebAudio))return o.state==="running"&&o.ctx.state!=="interrupted"&&o._suspendTimer?(clearTimeout(o._suspendTimer),o._suspendTimer=null):o.state==="suspended"||o.state==="running"&&o.ctx.state==="interrupted"?(o.ctx.resume().then(function(){o.state="running";for(var c=0;c<o._howls.length;c++)o._howls[c]._emit("resume")}),o._suspendTimer&&(clearTimeout(o._suspendTimer),o._suspendTimer=null)):o.state==="suspending"&&(o._resumeAfterSuspend=!0),o}};var t=new e,n=function(o){var c=this;if(!o.src||o.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}c.init(o)};n.prototype={init:function(o){var c=this;return t.ctx||p(),c._autoplay=o.autoplay||!1,c._format=typeof o.format!="string"?o.format:[o.format],c._html5=o.html5||!1,c._muted=o.mute||!1,c._loop=o.loop||!1,c._pool=o.pool||5,c._preload=typeof o.preload=="boolean"||o.preload==="metadata"?o.preload:!0,c._rate=o.rate||1,c._sprite=o.sprite||{},c._src=typeof o.src!="string"?o.src:[o.src],c._volume=o.volume!==void 0?o.volume:1,c._xhr={method:o.xhr&&o.xhr.method?o.xhr.method:"GET",headers:o.xhr&&o.xhr.headers?o.xhr.headers:null,withCredentials:o.xhr&&o.xhr.withCredentials?o.xhr.withCredentials:!1},c._duration=0,c._state="unloaded",c._sounds=[],c._endTimers={},c._queue=[],c._playLock=!1,c._onend=o.onend?[{fn:o.onend}]:[],c._onfade=o.onfade?[{fn:o.onfade}]:[],c._onload=o.onload?[{fn:o.onload}]:[],c._onloaderror=o.onloaderror?[{fn:o.onloaderror}]:[],c._onplayerror=o.onplayerror?[{fn:o.onplayerror}]:[],c._onpause=o.onpause?[{fn:o.onpause}]:[],c._onplay=o.onplay?[{fn:o.onplay}]:[],c._onstop=o.onstop?[{fn:o.onstop}]:[],c._onmute=o.onmute?[{fn:o.onmute}]:[],c._onvolume=o.onvolume?[{fn:o.onvolume}]:[],c._onrate=o.onrate?[{fn:o.onrate}]:[],c._onseek=o.onseek?[{fn:o.onseek}]:[],c._onunlock=o.onunlock?[{fn:o.onunlock}]:[],c._onresume=[],c._webAudio=t.usingWebAudio&&!c._html5,typeof t.ctx<"u"&&t.ctx&&t.autoUnlock&&t._unlockAudio(),t._howls.push(c),c._autoplay&&c._queue.push({event:"play",action:function(){c.play()}}),c._preload&&c._preload!=="none"&&c.load(),c},load:function(){var o=this,c=null;if(t.noAudio){o._emit("loaderror",null,"No audio support.");return}typeof o._src=="string"&&(o._src=[o._src]);for(var f=0;f<o._src.length;f++){var v,x;if(o._format&&o._format[f])v=o._format[f];else{if(x=o._src[f],typeof x!="string"){o._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}v=/^data:audio\/([^;,]+);/i.exec(x),v||(v=/\.([^.]+)$/.exec(x.split("?",1)[0])),v&&(v=v[1].toLowerCase())}if(v||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),v&&t.codecs(v)){c=o._src[f];break}}if(!c){o._emit("loaderror",null,"No codec support for selected audio sources.");return}return o._src=c,o._state="loading",window.location.protocol==="https:"&&c.slice(0,5)==="http:"&&(o._html5=!0,o._webAudio=!1),new r(o),o._webAudio&&a(o),o},play:function(o,c){var f=this,v=null;if(typeof o=="number")v=o,o=null;else{if(typeof o=="string"&&f._state==="loaded"&&!f._sprite[o])return null;if(typeof o>"u"&&(o="__default",!f._playLock)){for(var x=0,g=0;g<f._sounds.length;g++)f._sounds[g]._paused&&!f._sounds[g]._ended&&(x++,v=f._sounds[g]._id);x===1?o=null:v=null}}var m=v?f._soundById(v):f._inactiveSound();if(!m)return null;if(v&&!o&&(o=m._sprite||"__default"),f._state!=="loaded"){m._sprite=o,m._ended=!1;var w=m._id;return f._queue.push({event:"play",action:function(){f.play(w)}}),w}if(v&&!m._paused)return c||f._loadQueue("play"),m._id;f._webAudio&&t._autoResume();var E=Math.max(0,m._seek>0?m._seek:f._sprite[o][0]/1e3),C=Math.max(0,(f._sprite[o][0]+f._sprite[o][1])/1e3-E),B=C*1e3/Math.abs(m._rate),L=f._sprite[o][0]/1e3,P=(f._sprite[o][0]+f._sprite[o][1])/1e3;m._sprite=o,m._ended=!1;var D=function(){m._paused=!1,m._seek=E,m._start=L,m._stop=P,m._loop=!!(m._loop||f._sprite[o][2])};if(E>=P){f._ended(m);return}var H=m._node;if(f._webAudio){var y=function(){f._playLock=!1,D(),f._refreshBuffer(m);var V=m._muted||f._muted?0:m._volume;H.gain.setValueAtTime(V,t.ctx.currentTime),m._playStart=t.ctx.currentTime,typeof H.bufferSource.start>"u"?m._loop?H.bufferSource.noteGrainOn(0,E,86400):H.bufferSource.noteGrainOn(0,E,C):m._loop?H.bufferSource.start(0,E,86400):H.bufferSource.start(0,E,C),B!==1/0&&(f._endTimers[m._id]=setTimeout(f._ended.bind(f,m),B)),c||setTimeout(function(){f._emit("play",m._id),f._loadQueue()},0)};t.state==="running"&&t.ctx.state!=="interrupted"?y():(f._playLock=!0,f.once("resume",y),f._clearTimer(m._id))}else{var S=function(){H.currentTime=E,H.muted=m._muted||f._muted||t._muted||H.muted,H.volume=m._volume*t.volume(),H.playbackRate=m._rate;try{var V=H.play();if(V&&typeof Promise<"u"&&(V instanceof Promise||typeof V.then=="function")?(f._playLock=!0,D(),V.then(function(){f._playLock=!1,H._unlocked=!0,c?f._loadQueue():f._emit("play",m._id)}).catch(function(){f._playLock=!1,f._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),m._ended=!0,m._paused=!0})):c||(f._playLock=!1,D(),f._emit("play",m._id)),H.playbackRate=m._rate,H.paused){f._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}o!=="__default"||m._loop?f._endTimers[m._id]=setTimeout(f._ended.bind(f,m),B):(f._endTimers[m._id]=function(){f._ended(m),H.removeEventListener("ended",f._endTimers[m._id],!1)},H.addEventListener("ended",f._endTimers[m._id],!1))}catch(Q){f._emit("playerror",m._id,Q)}};H.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(H.src=f._src,H.load());var z=window&&window.ejecta||!H.readyState&&t._navigator.isCocoonJS;if(H.readyState>=3||z)S();else{f._playLock=!0,f._state="loading";var G=function(){f._state="loaded",S(),H.removeEventListener(t._canPlayEvent,G,!1)};H.addEventListener(t._canPlayEvent,G,!1),f._clearTimer(m._id)}}return m._id},pause:function(o){var c=this;if(c._state!=="loaded"||c._playLock)return c._queue.push({event:"pause",action:function(){c.pause(o)}}),c;for(var f=c._getSoundIds(o),v=0;v<f.length;v++){c._clearTimer(f[v]);var x=c._soundById(f[v]);if(x&&!x._paused&&(x._seek=c.seek(f[v]),x._rateSeek=0,x._paused=!0,c._stopFade(f[v]),x._node))if(c._webAudio){if(!x._node.bufferSource)continue;typeof x._node.bufferSource.stop>"u"?x._node.bufferSource.noteOff(0):x._node.bufferSource.stop(0),c._cleanBuffer(x._node)}else(!isNaN(x._node.duration)||x._node.duration===1/0)&&x._node.pause();arguments[1]||c._emit("pause",x?x._id:null)}return c},stop:function(o,c){var f=this;if(f._state!=="loaded"||f._playLock)return f._queue.push({event:"stop",action:function(){f.stop(o)}}),f;for(var v=f._getSoundIds(o),x=0;x<v.length;x++){f._clearTimer(v[x]);var g=f._soundById(v[x]);g&&(g._seek=g._start||0,g._rateSeek=0,g._paused=!0,g._ended=!0,f._stopFade(v[x]),g._node&&(f._webAudio?g._node.bufferSource&&(typeof g._node.bufferSource.stop>"u"?g._node.bufferSource.noteOff(0):g._node.bufferSource.stop(0),f._cleanBuffer(g._node)):(!isNaN(g._node.duration)||g._node.duration===1/0)&&(g._node.currentTime=g._start||0,g._node.pause(),g._node.duration===1/0&&f._clearSound(g._node))),c||f._emit("stop",g._id))}return f},mute:function(o,c){var f=this;if(f._state!=="loaded"||f._playLock)return f._queue.push({event:"mute",action:function(){f.mute(o,c)}}),f;if(typeof c>"u")if(typeof o=="boolean")f._muted=o;else return f._muted;for(var v=f._getSoundIds(c),x=0;x<v.length;x++){var g=f._soundById(v[x]);g&&(g._muted=o,g._interval&&f._stopFade(g._id),f._webAudio&&g._node?g._node.gain.setValueAtTime(o?0:g._volume,t.ctx.currentTime):g._node&&(g._node.muted=t._muted?!0:o),f._emit("mute",g._id))}return f},volume:function(){var o=this,c=arguments,f,v;if(c.length===0)return o._volume;if(c.length===1||c.length===2&&typeof c[1]>"u"){var x=o._getSoundIds(),g=x.indexOf(c[0]);g>=0?v=parseInt(c[0],10):f=parseFloat(c[0])}else c.length>=2&&(f=parseFloat(c[0]),v=parseInt(c[1],10));var m;if(typeof f<"u"&&f>=0&&f<=1){if(o._state!=="loaded"||o._playLock)return o._queue.push({event:"volume",action:function(){o.volume.apply(o,c)}}),o;typeof v>"u"&&(o._volume=f),v=o._getSoundIds(v);for(var w=0;w<v.length;w++)m=o._soundById(v[w]),m&&(m._volume=f,c[2]||o._stopFade(v[w]),o._webAudio&&m._node&&!m._muted?m._node.gain.setValueAtTime(f,t.ctx.currentTime):m._node&&!m._muted&&(m._node.volume=f*t.volume()),o._emit("volume",m._id))}else return m=v?o._soundById(v):o._sounds[0],m?m._volume:0;return o},fade:function(o,c,f,v){var x=this;if(x._state!=="loaded"||x._playLock)return x._queue.push({event:"fade",action:function(){x.fade(o,c,f,v)}}),x;o=Math.min(Math.max(0,parseFloat(o)),1),c=Math.min(Math.max(0,parseFloat(c)),1),f=parseFloat(f),x.volume(o,v);for(var g=x._getSoundIds(v),m=0;m<g.length;m++){var w=x._soundById(g[m]);if(w){if(v||x._stopFade(g[m]),x._webAudio&&!w._muted){var E=t.ctx.currentTime,C=E+f/1e3;w._volume=o,w._node.gain.setValueAtTime(o,E),w._node.gain.linearRampToValueAtTime(c,C)}x._startFadeInterval(w,o,c,f,g[m],typeof v>"u")}}return x},_startFadeInterval:function(o,c,f,v,x,g){var m=this,w=c,E=f-c,C=Math.abs(E/.01),B=Math.max(4,C>0?v/C:v),L=Date.now();o._fadeTo=f,o._interval=setInterval(function(){var P=(Date.now()-L)/v;L=Date.now(),w+=E*P,w=Math.round(w*100)/100,E<0?w=Math.max(f,w):w=Math.min(f,w),m._webAudio?o._volume=w:m.volume(w,o._id,!0),g&&(m._volume=w),(f<c&&w<=f||f>c&&w>=f)&&(clearInterval(o._interval),o._interval=null,o._fadeTo=null,m.volume(f,o._id),m._emit("fade",o._id))},B)},_stopFade:function(o){var c=this,f=c._soundById(o);return f&&f._interval&&(c._webAudio&&f._node.gain.cancelScheduledValues(t.ctx.currentTime),clearInterval(f._interval),f._interval=null,c.volume(f._fadeTo,o),f._fadeTo=null,c._emit("fade",o)),c},loop:function(){var o=this,c=arguments,f,v,x;if(c.length===0)return o._loop;if(c.length===1)if(typeof c[0]=="boolean")f=c[0],o._loop=f;else return x=o._soundById(parseInt(c[0],10)),x?x._loop:!1;else c.length===2&&(f=c[0],v=parseInt(c[1],10));for(var g=o._getSoundIds(v),m=0;m<g.length;m++)x=o._soundById(g[m]),x&&(x._loop=f,o._webAudio&&x._node&&x._node.bufferSource&&(x._node.bufferSource.loop=f,f&&(x._node.bufferSource.loopStart=x._start||0,x._node.bufferSource.loopEnd=x._stop,o.playing(g[m])&&(o.pause(g[m],!0),o.play(g[m],!0)))));return o},rate:function(){var o=this,c=arguments,f,v;if(c.length===0)v=o._sounds[0]._id;else if(c.length===1){var x=o._getSoundIds(),g=x.indexOf(c[0]);g>=0?v=parseInt(c[0],10):f=parseFloat(c[0])}else c.length===2&&(f=parseFloat(c[0]),v=parseInt(c[1],10));var m;if(typeof f=="number"){if(o._state!=="loaded"||o._playLock)return o._queue.push({event:"rate",action:function(){o.rate.apply(o,c)}}),o;typeof v>"u"&&(o._rate=f),v=o._getSoundIds(v);for(var w=0;w<v.length;w++)if(m=o._soundById(v[w]),m){o.playing(v[w])&&(m._rateSeek=o.seek(v[w]),m._playStart=o._webAudio?t.ctx.currentTime:m._playStart),m._rate=f,o._webAudio&&m._node&&m._node.bufferSource?m._node.bufferSource.playbackRate.setValueAtTime(f,t.ctx.currentTime):m._node&&(m._node.playbackRate=f);var E=o.seek(v[w]),C=(o._sprite[m._sprite][0]+o._sprite[m._sprite][1])/1e3-E,B=C*1e3/Math.abs(m._rate);(o._endTimers[v[w]]||!m._paused)&&(o._clearTimer(v[w]),o._endTimers[v[w]]=setTimeout(o._ended.bind(o,m),B)),o._emit("rate",m._id)}}else return m=o._soundById(v),m?m._rate:o._rate;return o},seek:function(){var o=this,c=arguments,f,v;if(c.length===0)o._sounds.length&&(v=o._sounds[0]._id);else if(c.length===1){var x=o._getSoundIds(),g=x.indexOf(c[0]);g>=0?v=parseInt(c[0],10):o._sounds.length&&(v=o._sounds[0]._id,f=parseFloat(c[0]))}else c.length===2&&(f=parseFloat(c[0]),v=parseInt(c[1],10));if(typeof v>"u")return 0;if(typeof f=="number"&&(o._state!=="loaded"||o._playLock))return o._queue.push({event:"seek",action:function(){o.seek.apply(o,c)}}),o;var m=o._soundById(v);if(m)if(typeof f=="number"&&f>=0){var w=o.playing(v);w&&o.pause(v,!0),m._seek=f,m._ended=!1,o._clearTimer(v),!o._webAudio&&m._node&&!isNaN(m._node.duration)&&(m._node.currentTime=f);var E=function(){w&&o.play(v,!0),o._emit("seek",v)};if(w&&!o._webAudio){var C=function(){o._playLock?setTimeout(C,0):E()};setTimeout(C,0)}else E()}else if(o._webAudio){var B=o.playing(v)?t.ctx.currentTime-m._playStart:0,L=m._rateSeek?m._rateSeek-m._seek:0;return m._seek+(L+B*Math.abs(m._rate))}else return m._node.currentTime;return o},playing:function(o){var c=this;if(typeof o=="number"){var f=c._soundById(o);return f?!f._paused:!1}for(var v=0;v<c._sounds.length;v++)if(!c._sounds[v]._paused)return!0;return!1},duration:function(o){var c=this,f=c._duration,v=c._soundById(o);return v&&(f=c._sprite[v._sprite][1]/1e3),f},state:function(){return this._state},unload:function(){for(var o=this,c=o._sounds,f=0;f<c.length;f++)c[f]._paused||o.stop(c[f]._id),o._webAudio||(o._clearSound(c[f]._node),c[f]._node.removeEventListener("error",c[f]._errorFn,!1),c[f]._node.removeEventListener(t._canPlayEvent,c[f]._loadFn,!1),c[f]._node.removeEventListener("ended",c[f]._endFn,!1),t._releaseHtml5Audio(c[f]._node)),delete c[f]._node,o._clearTimer(c[f]._id);var v=t._howls.indexOf(o);v>=0&&t._howls.splice(v,1);var x=!0;for(f=0;f<t._howls.length;f++)if(t._howls[f]._src===o._src||o._src.indexOf(t._howls[f]._src)>=0){x=!1;break}return s&&x&&delete s[o._src],t.noAudio=!1,o._state="unloaded",o._sounds=[],o=null,null},on:function(o,c,f,v){var x=this,g=x["_on"+o];return typeof c=="function"&&g.push(v?{id:f,fn:c,once:v}:{id:f,fn:c}),x},off:function(o,c,f){var v=this,x=v["_on"+o],g=0;if(typeof c=="number"&&(f=c,c=null),c||f)for(g=0;g<x.length;g++){var m=f===x[g].id;if(c===x[g].fn&&m||!c&&m){x.splice(g,1);break}}else if(o)v["_on"+o]=[];else{var w=Object.keys(v);for(g=0;g<w.length;g++)w[g].indexOf("_on")===0&&Array.isArray(v[w[g]])&&(v[w[g]]=[])}return v},once:function(o,c,f){var v=this;return v.on(o,c,f,1),v},_emit:function(o,c,f){for(var v=this,x=v["_on"+o],g=x.length-1;g>=0;g--)(!x[g].id||x[g].id===c||o==="load")&&(setTimeout(function(m){m.call(this,c,f)}.bind(v,x[g].fn),0),x[g].once&&v.off(o,x[g].fn,x[g].id));return v._loadQueue(o),v},_loadQueue:function(o){var c=this;if(c._queue.length>0){var f=c._queue[0];f.event===o&&(c._queue.shift(),c._loadQueue()),o||f.action()}return c},_ended:function(o){var c=this,f=o._sprite;if(!c._webAudio&&o._node&&!o._node.paused&&!o._node.ended&&o._node.currentTime<o._stop)return setTimeout(c._ended.bind(c,o),100),c;var v=!!(o._loop||c._sprite[f][2]);if(c._emit("end",o._id),!c._webAudio&&v&&c.stop(o._id,!0).play(o._id),c._webAudio&&v){c._emit("play",o._id),o._seek=o._start||0,o._rateSeek=0,o._playStart=t.ctx.currentTime;var x=(o._stop-o._start)*1e3/Math.abs(o._rate);c._endTimers[o._id]=setTimeout(c._ended.bind(c,o),x)}return c._webAudio&&!v&&(o._paused=!0,o._ended=!0,o._seek=o._start||0,o._rateSeek=0,c._clearTimer(o._id),c._cleanBuffer(o._node),t._autoSuspend()),!c._webAudio&&!v&&c.stop(o._id,!0),c},_clearTimer:function(o){var c=this;if(c._endTimers[o]){if(typeof c._endTimers[o]!="function")clearTimeout(c._endTimers[o]);else{var f=c._soundById(o);f&&f._node&&f._node.removeEventListener("ended",c._endTimers[o],!1)}delete c._endTimers[o]}return c},_soundById:function(o){for(var c=this,f=0;f<c._sounds.length;f++)if(o===c._sounds[f]._id)return c._sounds[f];return null},_inactiveSound:function(){var o=this;o._drain();for(var c=0;c<o._sounds.length;c++)if(o._sounds[c]._ended)return o._sounds[c].reset();return new r(o)},_drain:function(){var o=this,c=o._pool,f=0,v=0;if(!(o._sounds.length<c)){for(v=0;v<o._sounds.length;v++)o._sounds[v]._ended&&f++;for(v=o._sounds.length-1;v>=0;v--){if(f<=c)return;o._sounds[v]._ended&&(o._webAudio&&o._sounds[v]._node&&o._sounds[v]._node.disconnect(0),o._sounds.splice(v,1),f--)}}},_getSoundIds:function(o){var c=this;if(typeof o>"u"){for(var f=[],v=0;v<c._sounds.length;v++)f.push(c._sounds[v]._id);return f}else return[o]},_refreshBuffer:function(o){var c=this;return o._node.bufferSource=t.ctx.createBufferSource(),o._node.bufferSource.buffer=s[c._src],o._panner?o._node.bufferSource.connect(o._panner):o._node.bufferSource.connect(o._node),o._node.bufferSource.loop=o._loop,o._loop&&(o._node.bufferSource.loopStart=o._start||0,o._node.bufferSource.loopEnd=o._stop||0),o._node.bufferSource.playbackRate.setValueAtTime(o._rate,t.ctx.currentTime),c},_cleanBuffer:function(o){var c=this,f=t._navigator&&t._navigator.vendor.indexOf("Apple")>=0;if(!o.bufferSource)return c;if(t._scratchBuffer&&o.bufferSource&&(o.bufferSource.onended=null,o.bufferSource.disconnect(0),f))try{o.bufferSource.buffer=t._scratchBuffer}catch{}return o.bufferSource=null,c},_clearSound:function(o){var c=/MSIE |Trident\//.test(t._navigator&&t._navigator.userAgent);c||(o.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var r=function(o){this._parent=o,this.init()};r.prototype={init:function(){var o=this,c=o._parent;return o._muted=c._muted,o._loop=c._loop,o._volume=c._volume,o._rate=c._rate,o._seek=0,o._paused=!0,o._ended=!0,o._sprite="__default",o._id=++t._counter,c._sounds.push(o),o.create(),o},create:function(){var o=this,c=o._parent,f=t._muted||o._muted||o._parent._muted?0:o._volume;return c._webAudio?(o._node=typeof t.ctx.createGain>"u"?t.ctx.createGainNode():t.ctx.createGain(),o._node.gain.setValueAtTime(f,t.ctx.currentTime),o._node.paused=!0,o._node.connect(t.masterGain)):t.noAudio||(o._node=t._obtainHtml5Audio(),o._errorFn=o._errorListener.bind(o),o._node.addEventListener("error",o._errorFn,!1),o._loadFn=o._loadListener.bind(o),o._node.addEventListener(t._canPlayEvent,o._loadFn,!1),o._endFn=o._endListener.bind(o),o._node.addEventListener("ended",o._endFn,!1),o._node.src=c._src,o._node.preload=c._preload===!0?"auto":c._preload,o._node.volume=f*t.volume(),o._node.load()),o},reset:function(){var o=this,c=o._parent;return o._muted=c._muted,o._loop=c._loop,o._volume=c._volume,o._rate=c._rate,o._seek=0,o._rateSeek=0,o._paused=!0,o._ended=!0,o._sprite="__default",o._id=++t._counter,o},_errorListener:function(){var o=this;o._parent._emit("loaderror",o._id,o._node.error?o._node.error.code:0),o._node.removeEventListener("error",o._errorFn,!1)},_loadListener:function(){var o=this,c=o._parent;c._duration=Math.ceil(o._node.duration*10)/10,Object.keys(c._sprite).length===0&&(c._sprite={__default:[0,c._duration*1e3]}),c._state!=="loaded"&&(c._state="loaded",c._emit("load"),c._loadQueue()),o._node.removeEventListener(t._canPlayEvent,o._loadFn,!1)},_endListener:function(){var o=this,c=o._parent;c._duration===1/0&&(c._duration=Math.ceil(o._node.duration*10)/10,c._sprite.__default[1]===1/0&&(c._sprite.__default[1]=c._duration*1e3),c._ended(o)),o._node.removeEventListener("ended",o._endFn,!1)}};var s={},a=function(o){var c=o._src;if(s[c]){o._duration=s[c].duration,h(o);return}if(/^data:[^;]+;base64,/.test(c)){for(var f=atob(c.split(",")[1]),v=new Uint8Array(f.length),x=0;x<f.length;++x)v[x]=f.charCodeAt(x);u(v.buffer,o)}else{var g=new XMLHttpRequest;g.open(o._xhr.method,c,!0),g.withCredentials=o._xhr.withCredentials,g.responseType="arraybuffer",o._xhr.headers&&Object.keys(o._xhr.headers).forEach(function(m){g.setRequestHeader(m,o._xhr.headers[m])}),g.onload=function(){var m=(g.status+"")[0];if(m!=="0"&&m!=="2"&&m!=="3"){o._emit("loaderror",null,"Failed loading audio file with status: "+g.status+".");return}u(g.response,o)},g.onerror=function(){o._webAudio&&(o._html5=!0,o._webAudio=!1,o._sounds=[],delete s[c],o.load())},l(g)}},l=function(o){try{o.send()}catch{o.onerror()}},u=function(o,c){var f=function(){c._emit("loaderror",null,"Decoding audio data failed.")},v=function(x){x&&c._sounds.length>0?(s[c._src]=x,h(c,x)):f()};typeof Promise<"u"&&t.ctx.decodeAudioData.length===1?t.ctx.decodeAudioData(o).then(v).catch(f):t.ctx.decodeAudioData(o,v,f)},h=function(o,c){c&&!o._duration&&(o._duration=c.duration),Object.keys(o._sprite).length===0&&(o._sprite={__default:[0,o._duration*1e3]}),o._state!=="loaded"&&(o._state="loaded",o._emit("load"),o._loadQueue())},p=function(){if(t.usingWebAudio){try{typeof AudioContext<"u"?t.ctx=new AudioContext:typeof webkitAudioContext<"u"?t.ctx=new webkitAudioContext:t.usingWebAudio=!1}catch{t.usingWebAudio=!1}t.ctx||(t.usingWebAudio=!1);var o=/iP(hone|od|ad)/.test(t._navigator&&t._navigator.platform),c=t._navigator&&t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),f=c?parseInt(c[1],10):null;if(o&&f&&f<9){var v=/safari/.test(t._navigator&&t._navigator.userAgent.toLowerCase());t._navigator&&!v&&(t.usingWebAudio=!1)}t.usingWebAudio&&(t.masterGain=typeof t.ctx.createGain>"u"?t.ctx.createGainNode():t.ctx.createGain(),t.masterGain.gain.setValueAtTime(t._muted?0:t._volume,t.ctx.currentTime),t.masterGain.connect(t.ctx.destination)),t._setup()}};i.Howler=t,i.Howl=n,typeof Sr<"u"?(Sr.HowlerGlobal=e,Sr.Howler=t,Sr.Howl=n,Sr.Sound=r):typeof window<"u"&&(window.HowlerGlobal=e,window.Howler=t,window.Howl=n,window.Sound=r)})();/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */(function(){HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(t){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var r=n._howls.length-1;r>=0;r--)n._howls[r].stereo(t);return n},HowlerGlobal.prototype.pos=function(t,n,r){var s=this;if(!s.ctx||!s.ctx.listener)return s;if(n=typeof n!="number"?s._pos[1]:n,r=typeof r!="number"?s._pos[2]:r,typeof t=="number")s._pos=[t,n,r],typeof s.ctx.listener.positionX<"u"?(s.ctx.listener.positionX.setTargetAtTime(s._pos[0],Howler.ctx.currentTime,.1),s.ctx.listener.positionY.setTargetAtTime(s._pos[1],Howler.ctx.currentTime,.1),s.ctx.listener.positionZ.setTargetAtTime(s._pos[2],Howler.ctx.currentTime,.1)):s.ctx.listener.setPosition(s._pos[0],s._pos[1],s._pos[2]);else return s._pos;return s},HowlerGlobal.prototype.orientation=function(t,n,r,s,a,l){var u=this;if(!u.ctx||!u.ctx.listener)return u;var h=u._orientation;if(n=typeof n!="number"?h[1]:n,r=typeof r!="number"?h[2]:r,s=typeof s!="number"?h[3]:s,a=typeof a!="number"?h[4]:a,l=typeof l!="number"?h[5]:l,typeof t=="number")u._orientation=[t,n,r,s,a,l],typeof u.ctx.listener.forwardX<"u"?(u.ctx.listener.forwardX.setTargetAtTime(t,Howler.ctx.currentTime,.1),u.ctx.listener.forwardY.setTargetAtTime(n,Howler.ctx.currentTime,.1),u.ctx.listener.forwardZ.setTargetAtTime(r,Howler.ctx.currentTime,.1),u.ctx.listener.upX.setTargetAtTime(s,Howler.ctx.currentTime,.1),u.ctx.listener.upY.setTargetAtTime(a,Howler.ctx.currentTime,.1),u.ctx.listener.upZ.setTargetAtTime(l,Howler.ctx.currentTime,.1)):u.ctx.listener.setOrientation(t,n,r,s,a,l);else return h;return u},Howl.prototype.init=function(t){return function(n){var r=this;return r._orientation=n.orientation||[1,0,0],r._stereo=n.stereo||null,r._pos=n.pos||null,r._pannerAttr={coneInnerAngle:typeof n.coneInnerAngle<"u"?n.coneInnerAngle:360,coneOuterAngle:typeof n.coneOuterAngle<"u"?n.coneOuterAngle:360,coneOuterGain:typeof n.coneOuterGain<"u"?n.coneOuterGain:0,distanceModel:typeof n.distanceModel<"u"?n.distanceModel:"inverse",maxDistance:typeof n.maxDistance<"u"?n.maxDistance:1e4,panningModel:typeof n.panningModel<"u"?n.panningModel:"HRTF",refDistance:typeof n.refDistance<"u"?n.refDistance:1,rolloffFactor:typeof n.rolloffFactor<"u"?n.rolloffFactor:1},r._onstereo=n.onstereo?[{fn:n.onstereo}]:[],r._onpos=n.onpos?[{fn:n.onpos}]:[],r._onorientation=n.onorientation?[{fn:n.onorientation}]:[],t.call(this,n)}}(Howl.prototype.init),Howl.prototype.stereo=function(t,n){var r=this;if(!r._webAudio)return r;if(r._state!=="loaded")return r._queue.push({event:"stereo",action:function(){r.stereo(t,n)}}),r;var s=typeof Howler.ctx.createStereoPanner>"u"?"spatial":"stereo";if(typeof n>"u")if(typeof t=="number")r._stereo=t,r._pos=[t,0,0];else return r._stereo;for(var a=r._getSoundIds(n),l=0;l<a.length;l++){var u=r._soundById(a[l]);if(u)if(typeof t=="number")u._stereo=t,u._pos=[t,0,0],u._node&&(u._pannerAttr.panningModel="equalpower",(!u._panner||!u._panner.pan)&&e(u,s),s==="spatial"?typeof u._panner.positionX<"u"?(u._panner.positionX.setValueAtTime(t,Howler.ctx.currentTime),u._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),u._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):u._panner.setPosition(t,0,0):u._panner.pan.setValueAtTime(t,Howler.ctx.currentTime)),r._emit("stereo",u._id);else return u._stereo}return r},Howl.prototype.pos=function(t,n,r,s){var a=this;if(!a._webAudio)return a;if(a._state!=="loaded")return a._queue.push({event:"pos",action:function(){a.pos(t,n,r,s)}}),a;if(n=typeof n!="number"?0:n,r=typeof r!="number"?-.5:r,typeof s>"u")if(typeof t=="number")a._pos=[t,n,r];else return a._pos;for(var l=a._getSoundIds(s),u=0;u<l.length;u++){var h=a._soundById(l[u]);if(h)if(typeof t=="number")h._pos=[t,n,r],h._node&&((!h._panner||h._panner.pan)&&e(h,"spatial"),typeof h._panner.positionX<"u"?(h._panner.positionX.setValueAtTime(t,Howler.ctx.currentTime),h._panner.positionY.setValueAtTime(n,Howler.ctx.currentTime),h._panner.positionZ.setValueAtTime(r,Howler.ctx.currentTime)):h._panner.setPosition(t,n,r)),a._emit("pos",h._id);else return h._pos}return a},Howl.prototype.orientation=function(t,n,r,s){var a=this;if(!a._webAudio)return a;if(a._state!=="loaded")return a._queue.push({event:"orientation",action:function(){a.orientation(t,n,r,s)}}),a;if(n=typeof n!="number"?a._orientation[1]:n,r=typeof r!="number"?a._orientation[2]:r,typeof s>"u")if(typeof t=="number")a._orientation=[t,n,r];else return a._orientation;for(var l=a._getSoundIds(s),u=0;u<l.length;u++){var h=a._soundById(l[u]);if(h)if(typeof t=="number")h._orientation=[t,n,r],h._node&&(h._panner||(h._pos||(h._pos=a._pos||[0,0,-.5]),e(h,"spatial")),typeof h._panner.orientationX<"u"?(h._panner.orientationX.setValueAtTime(t,Howler.ctx.currentTime),h._panner.orientationY.setValueAtTime(n,Howler.ctx.currentTime),h._panner.orientationZ.setValueAtTime(r,Howler.ctx.currentTime)):h._panner.setOrientation(t,n,r)),a._emit("orientation",h._id);else return h._orientation}return a},Howl.prototype.pannerAttr=function(){var t=this,n=arguments,r,s,a;if(!t._webAudio)return t;if(n.length===0)return t._pannerAttr;if(n.length===1)if(typeof n[0]=="object")r=n[0],typeof s>"u"&&(r.pannerAttr||(r.pannerAttr={coneInnerAngle:r.coneInnerAngle,coneOuterAngle:r.coneOuterAngle,coneOuterGain:r.coneOuterGain,distanceModel:r.distanceModel,maxDistance:r.maxDistance,refDistance:r.refDistance,rolloffFactor:r.rolloffFactor,panningModel:r.panningModel}),t._pannerAttr={coneInnerAngle:typeof r.pannerAttr.coneInnerAngle<"u"?r.pannerAttr.coneInnerAngle:t._coneInnerAngle,coneOuterAngle:typeof r.pannerAttr.coneOuterAngle<"u"?r.pannerAttr.coneOuterAngle:t._coneOuterAngle,coneOuterGain:typeof r.pannerAttr.coneOuterGain<"u"?r.pannerAttr.coneOuterGain:t._coneOuterGain,distanceModel:typeof r.pannerAttr.distanceModel<"u"?r.pannerAttr.distanceModel:t._distanceModel,maxDistance:typeof r.pannerAttr.maxDistance<"u"?r.pannerAttr.maxDistance:t._maxDistance,refDistance:typeof r.pannerAttr.refDistance<"u"?r.pannerAttr.refDistance:t._refDistance,rolloffFactor:typeof r.pannerAttr.rolloffFactor<"u"?r.pannerAttr.rolloffFactor:t._rolloffFactor,panningModel:typeof r.pannerAttr.panningModel<"u"?r.pannerAttr.panningModel:t._panningModel});else return a=t._soundById(parseInt(n[0],10)),a?a._pannerAttr:t._pannerAttr;else n.length===2&&(r=n[0],s=parseInt(n[1],10));for(var l=t._getSoundIds(s),u=0;u<l.length;u++)if(a=t._soundById(l[u]),a){var h=a._pannerAttr;h={coneInnerAngle:typeof r.coneInnerAngle<"u"?r.coneInnerAngle:h.coneInnerAngle,coneOuterAngle:typeof r.coneOuterAngle<"u"?r.coneOuterAngle:h.coneOuterAngle,coneOuterGain:typeof r.coneOuterGain<"u"?r.coneOuterGain:h.coneOuterGain,distanceModel:typeof r.distanceModel<"u"?r.distanceModel:h.distanceModel,maxDistance:typeof r.maxDistance<"u"?r.maxDistance:h.maxDistance,refDistance:typeof r.refDistance<"u"?r.refDistance:h.refDistance,rolloffFactor:typeof r.rolloffFactor<"u"?r.rolloffFactor:h.rolloffFactor,panningModel:typeof r.panningModel<"u"?r.panningModel:h.panningModel};var p=a._panner;p||(a._pos||(a._pos=t._pos||[0,0,-.5]),e(a,"spatial"),p=a._panner),p.coneInnerAngle=h.coneInnerAngle,p.coneOuterAngle=h.coneOuterAngle,p.coneOuterGain=h.coneOuterGain,p.distanceModel=h.distanceModel,p.maxDistance=h.maxDistance,p.refDistance=h.refDistance,p.rolloffFactor=h.rolloffFactor,p.panningModel=h.panningModel}return t},Sound.prototype.init=function(t){return function(){var n=this,r=n._parent;n._orientation=r._orientation,n._stereo=r._stereo,n._pos=r._pos,n._pannerAttr=r._pannerAttr,t.call(this),n._stereo?r.stereo(n._stereo):n._pos&&r.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(t){return function(){var n=this,r=n._parent;return n._orientation=r._orientation,n._stereo=r._stereo,n._pos=r._pos,n._pannerAttr=r._pannerAttr,n._stereo?r.stereo(n._stereo):n._pos?r.pos(n._pos[0],n._pos[1],n._pos[2],n._id):n._panner&&(n._panner.disconnect(0),n._panner=void 0,r._refreshBuffer(n)),t.call(this)}}(Sound.prototype.reset);var e=function(t,n){n=n||"spatial",n==="spatial"?(t._panner=Howler.ctx.createPanner(),t._panner.coneInnerAngle=t._pannerAttr.coneInnerAngle,t._panner.coneOuterAngle=t._pannerAttr.coneOuterAngle,t._panner.coneOuterGain=t._pannerAttr.coneOuterGain,t._panner.distanceModel=t._pannerAttr.distanceModel,t._panner.maxDistance=t._pannerAttr.maxDistance,t._panner.refDistance=t._pannerAttr.refDistance,t._panner.rolloffFactor=t._pannerAttr.rolloffFactor,t._panner.panningModel=t._pannerAttr.panningModel,typeof t._panner.positionX<"u"?(t._panner.positionX.setValueAtTime(t._pos[0],Howler.ctx.currentTime),t._panner.positionY.setValueAtTime(t._pos[1],Howler.ctx.currentTime),t._panner.positionZ.setValueAtTime(t._pos[2],Howler.ctx.currentTime)):t._panner.setPosition(t._pos[0],t._pos[1],t._pos[2]),typeof t._panner.orientationX<"u"?(t._panner.orientationX.setValueAtTime(t._orientation[0],Howler.ctx.currentTime),t._panner.orientationY.setValueAtTime(t._orientation[1],Howler.ctx.currentTime),t._panner.orientationZ.setValueAtTime(t._orientation[2],Howler.ctx.currentTime)):t._panner.setOrientation(t._orientation[0],t._orientation[1],t._orientation[2])):(t._panner=Howler.ctx.createStereoPanner(),t._panner.pan.setValueAtTime(t._stereo,Howler.ctx.currentTime)),t._panner.connect(t._node),t._paused||t._parent.pause(t._id,!0).play(t._id,!0)}})()})(Kt);function vn(i,e,t="sine",n=.3){const s=Math.floor(e/1e3*22050),a=new Uint8Array(44+s*2),l=new DataView(a.buffer),u=(o,c)=>{for(let f=0;f<c.length;f++)l.setUint8(o+f,c.charCodeAt(f))};u(0,"RIFF"),l.setUint32(4,36+s*2,!0),u(8,"WAVE"),u(12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,1,!0),l.setUint32(24,22050,!0),l.setUint32(28,22050*2,!0),l.setUint16(32,2,!0),l.setUint16(34,16,!0),u(36,"data"),l.setUint32(40,s*2,!0);let h=0;for(let o=0;o<s;o++){const c=o/22050,f=Math.min(1,(s-o)/(22050*.05))*Math.min(1,o/(22050*.005));let v;const x=i*c;if(t==="square")v=Math.sign(Math.sin(x*Math.PI*2));else if(t==="saw")v=2*(x-Math.floor(x+.5));else if(t==="noise"){const w=Math.random()*2-1;h=(h+.02*w)/1.02,v=h*3.5}else v=Math.sin(x*Math.PI*2);const g=t==="noise"?(Math.sin(c*.5)*.5+.5)*.6+.4:1,m=v*f*n*g;l.setInt16(44+o*2,Math.max(-1,Math.min(1,m))*32767,!0)}let p="";for(let o=0;o<a.length;o++)p+=String.fromCharCode(a[o]);return"data:audio/wav;base64,"+btoa(p)}class m_{constructor(){me(this,"sounds");me(this,"ambient",null);me(this,"music",null);me(this,"muted",!1);this.sounds={click:new Kt.Howl({src:[vn(660,60,"sine",.25)]}),paint:new Kt.Howl({src:[vn(420,120,"saw",.18)]}),footstep:new Kt.Howl({src:[vn(150,70,"sine",.12)]}),countdown:new Kt.Howl({src:[vn(880,180,"square",.3)]}),victory:new Kt.Howl({src:[vn(523,500,"sine",.35)]}),discover:new Kt.Howl({src:[vn(300,260,"square",.3)]}),scan:new Kt.Howl({src:[vn(1200,220,"sine",.22)]})}}play(e,t=1){if(this.muted)return;const n=this.sounds[e];n.volume(t),n.play()}playAt(e,t,n=18){const r=Math.max(0,1-t/n);r>.02&&this.play(e,r)}startAmbient(e="forest"){this.ambient||this.muted||(e==="forest"?this.ambient=new Kt.Howl({src:[vn(0,4e3,"noise",.4)],loop:!0,volume:.2}):this.ambient=new Kt.Howl({src:[vn(60,4e3,"sine",.3)],loop:!0,volume:.15}),this.ambient.play())}startDynamicMusic(){this.music||this.muted||(this.music=new Kt.Howl({src:[vn(110,4e3,"saw",.05)],loop:!0,volume:.2}),this.music.play())}setMusicIntensity(e){this.music&&this.music.fade(this.music.volume(),e?.4:.2,1e3)}stopAmbient(){this.ambient?.stop(),this.ambient=null,this.music?.stop(),this.music=null}setMuted(e){this.muted=e,Kt.Howler.mute(e)}get isMuted(){return this.muted}}const Vt=30;function g_(i){return za.find(e=>e.id===i)??za[0]}function v_(i){const e=g_(i),t=W0(X0(i)),n=e.palette,r=[];let s=0;const a=()=>n[Math.floor(t()*n.length)],l=4,u=n[0],h=[[0,Vt,Vt,.5],[0,-Vt,Vt,.5],[Vt,0,.5,Vt],[-Vt,0,.5,Vt]];for(const[f,v,x,g]of h)r.push({id:s++,kind:"wall",position:{x:f,y:l/2,z:v},size:{x,y:l/2,z:g},rotationY:0,color:u,hideable:!1});const p=4;for(let f=-Vt+p;f<Vt-p;f+=p)for(let v=-Vt+p;v<Vt-p;v+=p){if(t()<.45)continue;const x=(t()-.5)*p*.6,g=(t()-.5)*p*.6,m=f+x,w=v+g,E=t();let C,B,L;if(E<.2)C="tree",B={x:1.5,y:3.5,z:1.5},L=1.75;else if(E<.35)C="table",B={x:1.1,y:.45,z:.7},L=.45;else if(E<.55)C="shelf",B={x:.5,y:1.2,z:1.4},L=1.2;else if(E<.72)C="cylinder",B={x:.5,y:.6+t()*.5,z:.5},L=B.y;else if(E<.86)C="plant",B={x:.45,y:.9,z:.45},L=.9;else{C="box";const P=.5+t()*.7;B={x:P,y:P,z:P},L=P}r.push({id:s++,kind:C,position:{x:m,y:L,z:w},size:B,rotationY:Math.floor(t()*4)*(Math.PI/2),color:a(),hideable:!0})}const o=[],c=Vt-4;for(let f=0;f<24;f++){const v=f/24*Math.PI*2;o.push({x:Math.cos(v)*c,y:__,z:Math.sin(v)*c})}return{meta:e,half:Vt,floorColor:n[2],wallColor:u,props:r,spawnPoints:o}}const __=.8,Gu=document.getElementById("game-canvas"),Gt=new F0(Gu),oi=new k0,mt=new Gh,Mn=new G0(Gu),Hn=new m_,Gs=new Z0(Gt.camera),Vu=new p_(Gt.scene),Ur=new Y0(Vu),Wu=new f_(Gt.scene,Gt.renderer);Wu.generateProceduralEnvironment();new LightingManager(Gt.scene);const x_=new d_(Gt.scene,500,"dust");let Qn={name:"Player"+Math.floor(Math.random()*1e3),loadout:{hat:null,backpack:null,shoes:null,brush:null,trail:null,emote:null,bodyColor:16777215},stats:{matches:0,discoveries:0,survivals:0,bestCamo:0}},bn=!1,tr="mimic",ai="",Ga=null;const li=new Map;let Va=null;const Vs=new Nu,Xu=new ve(0,0);let Vo=!1;function gl(){oi.showMenu(Qn,{onQuickMatch:i=>{mt.emit("matchmaking:quick",{name:Qn.name,mode:i,cosmetics:Qn.loadout})},onCreateRoom:(i,e)=>{mt.emit("room:create",{name:Qn.name,config:{mode:i,map:e,maxPlayers:12,matchSeconds:300,scanCooldownSeconds:30,isPrivate:!1},cosmetics:Qn.loadout})},onJoinRoom:i=>{mt.emit("room:join",{name:Qn.name,code:i,cosmetics:Qn.loadout})},onProfileChange:i=>{Qn=i}})}mt.on("room:joined",({selfId:i,room:e})=>{ai=i,oi.showLobby(e,i,{onStart:()=>mt.emit("room:start"),onAddBots:t=>mt.emit("room:addBots",t),onLeave:()=>{mt.emit("room:leave"),gl()},onConfig:t=>mt.emit("room:config",t)})});mt.on("room:state",i=>{oi.updateLobby(i)});mt.on("match:countdown",i=>{oi.showCountdown(i),i>0&&Hn.play("countdown")});mt.on("match:started",i=>{bn=!0,oi.clear();const e=i.players.find(n=>n.id===ai);tr=e?e.team:"mimic",hud.mount(tr,()=>{mt.emit("hunter:scan")}),Ga=v_(i.config.map);const t=Ur.build(Ga);Gt.scene.add(t),Wu.setCinematicFog(8962256,.015),Gt.setSunColor(16777198,4),Hn.startAmbient("forest"),Hn.startDynamicMusic(),i.players.forEach(n=>{const r=new q0;r.group.position.copy(n.position),r.group.rotation.y=n.rotationY,r.applyCamo(n.camo),Gt.scene.add(r.group),r.group.userData={id:n.id},li.set(n.id,r)})});mt.on("world:snapshot",i=>{Va=i,hud.setTimer(i.timeRemaining);let e=0;i.players.forEach(t=>{t.team==="mimic"&&!t.discovered&&e++,t.id===ai&&(hud.setCamo(t.camoScore),hud.setDiscoveredOverlay(t.discovered))}),hud.setMimicCount(e)});mt.on("match:ended",({winner:i,leaderboard:e})=>{bn=!1,hud.unmount(),Mn.exitLock(),Gt.scene.remove(Ur.group),Ur.dispose(),li.forEach(t=>{Gt.scene.remove(t.group),t.dispose()}),li.clear(),Hn.stopAmbient(),Hn.play("victory"),oi.showResults(i,e,ai,()=>{gl()})});mt.on("hunter:scan",({hunterId:i,revealed:e})=>{e.forEach(t=>{const n=li.get(t);n&&n.setOpacity(.5)}),setTimeout(()=>{e.forEach(t=>{const n=li.get(t);n&&n.setOpacity(1)})},2e3)});mt.on("player:discovered",({playerId:i,byId:e})=>{i===ai?(oi.toast("You were discovered!","error"),Hn.play("discover")):e===ai&&(oi.toast("You discovered a mimic!","info"),Hn.play("discover"))});Mn.onMouse((i,e)=>{bn&&Gs.rotate(i,e)});Mn.onWheelDelta(i=>{bn&&Gs.zoom(i)});Mn.onAction("freeze",()=>{!bn||tr!=="mimic"||(Vo=!Vo,mt.emit("player:freeze",Vo))});Mn.onAction("paint",()=>{if(!bn||tr!=="mimic")return;Vs.setFromCamera(Xu,Gt.camera);const i=Vs.intersectObject(Ur.group,!0);if(i.length>0){const e=i[0];let t=16777215;if(e.object instanceof Js&&e.instanceId!==void 0){const n=new Ge;e.object.getColorAt(e.instanceId,n),t=n.getHex()}else if(e.object instanceof Tt){const n=e.object.material;n.color&&(t=n.color.getHex())}mt.emit("player:camo",{torso:t,head:t,limbs:t}),Hn.play("paint")}});Mn.onAction("tag",()=>{if(!bn||tr!=="hunter")return;Vs.setFromCamera(Xu,Gt.camera);const i=[];li.forEach((t,n)=>{n!==ai&&i.push(t.group)});const e=Vs.intersectObjects(i,!0);if(e.length>0){let t=e[0].object;for(;t&&!t.userData.id;)t=t.parent;t&&t.userData.id&&mt.emit("hunter:tag",{targetId:t.userData.id})}});Mn.onAction("scan",()=>{!bn||tr!=="hunter"||(mt.emit("hunter:scan"),Hn.play("scan"))});const y_=["pose-stand","pose-sit","pose-lie","pose-curl","pose-lean"];y_.forEach(i=>{Mn.onAction(i,()=>{if(bn){const e=i.split("-")[1];mt.emit("player:pose",e)}})});let M_=0;const qu=new H0(i=>{if(bn&&Ga){const e=Mn.axes();Va&&Va.players.forEach(n=>{const r=li.get(n.id);r&&(r.group.position.lerp(new k(n.px,n.py,n.pz),.2),r.group.rotation.y=ka(r.group.rotation.y,n.ry,10,i),n.frozen?r.setAnim("idle"):r.setAnim(Math.hypot(n.px-r.group.position.x,n.pz-r.group.position.z)>.01?"walk":"idle"),r.setPose(n.pose),r.applyCamo({torso:n.torso,head:n.head,limbs:n.limbs}),r.update(i,1))}),mt.emit("player:input",{seq:++M_,dt:i,moveX:e.moveX,moveZ:e.moveZ,run:e.run,rotationY:Gs.facingYaw,jump:e.jump});const t=li.get(ai);t&&(Gs.update(i,t.group.position,e.run,Ur.cameraColliders),Gt.focusShadow(t.group.position),hud.setCrosshairTarget(Mn.isLocked)),hud.setMetrics(qu.fps,mt.ping)}x_.update(i),Vu.update(i)},()=>{Gt.render()});gl();qu.start();
//# sourceMappingURL=index-TBJBefZj.js.map
