function t(t,e,i,r){var o,s=arguments.length,n=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),o=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new s(i,t,r)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,f=m.trustedTypes,_=f?f.emptyScript:"",g=m.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&l(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const s=r?.call(this);o?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),o=e.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=r;const s=o.fromAttribute(e,t.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(t,e,i,r=!1,o){if(void 0!==t){const s=this.constructor;if(!1===r&&(o=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??v)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:o},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==o||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,g?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,E=w.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+P,z=`<${C}>`,M=document,H=()=>M.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,j=/>/g,D=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,K=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),Z=K(1),V=K(2),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),F=new WeakMap,G=M.createTreeWalker(M,129);function J(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,r=[];let o,s=2===e?"<svg>":3===e?"<math>":"",n=T;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===T?"!--"===c[1]?n=R:void 0!==c[1]?n=j:void 0!==c[2]?(B.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=D):void 0!==c[3]&&(n=D):n===D?">"===c[0]?(n=o??T,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?D:'"'===c[3]?I:L):n===I||n===L?n=D:n===R||n===j?n=T:(n=D,o=void 0);const h=n===D&&t[e+1].startsWith("/>")?" ":"";s+=n===T?i+z:l>=0?(r.push(a),i.slice(0,l)+k+i.slice(l)+P+h):i+P+(-2===l?e:h)}return[J(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Q{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,s=0;const n=t.length-1,a=this.parts,[c,l]=Y(t,e);if(this.el=Q.createElement(c,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=G.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(k)){const e=l[s++],i=r.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?rt:"?"===n[1]?ot:"@"===n[1]?st:it}),r.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:o}),r.removeAttribute(t));if(B.test(r.tagName)){const t=r.textContent.split(P),e=t.length-1;if(e>0){r.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],H()),G.nextNode(),a.push({type:2,index:++o});r.append(t[e],H())}}}else if(8===r.nodeType)if(r.data===C)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(P,t+1));)a.push({type:7,index:o}),t+=P.length-1}o++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,r){if(e===W)return e;let o=void 0!==r?i._$Co?.[r]:i._$Cl;const s=U(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(t),o._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,r)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??M).importNode(e,!0);G.currentNode=r;let o=G.nextNode(),s=0,n=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new et(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new nt(o,this,t)),this._$AV.push(e),a=i[++n]}s!==a?.index&&(o=G.nextNode(),s++)}return G.currentNode=M,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),U(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new tt(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Q(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const o of t)r===e.length?e.push(i=new et(this.O(H()),this.O(H()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,r){const o=this.strings;let s=!1;if(void 0===o)t=X(this,t,e,0),s=!U(t)||t!==this._$AH&&t!==W,s&&(this._$AH=t);else{const r=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=X(this,r[i+n],e,n),a===W&&(a=this._$AH[n]),s||=!U(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}s&&!r&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends it{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===W)return;const i=this._$AH,r=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==q&&(i===q||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(Q,et),(w.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;class lt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let o=r._$litPart$;if(void 0===o){const t=i?.renderBefore??null;r._$litPart$=o=new et(e.insertBefore(H(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const dt=ct.litElementPolyfillSupport;dt?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},ut=(t=pt,e,i)=>{const{kind:r,metadata:o}=i;let s=globalThis.litPropertyMetadata.get(o);if(void 0===s&&globalThis.litPropertyMetadata.set(o,s=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,o,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const o=this[r];e.call(this,i),this.requestUpdate(r,o,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};function mt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ft(t){return mt({...t,state:!0,attribute:!1})}const _t="climate-comfort-card",gt={min:10,max:32},yt={min:20,max:90},$t=[{id:"general",labelKey:"preset.general",icon:"mdi:home-thermometer",profile:{temperature:{preferred:{min:19,max:23},acceptable:{min:17,max:25}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"living_room",labelKey:"preset.living_room",icon:"mdi:sofa",profile:{temperature:{preferred:{min:20,max:23},acceptable:{min:18,max:25}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"bedroom",labelKey:"preset.bedroom",icon:"mdi:bed",profile:{temperature:{preferred:{min:16,max:19},acceptable:{min:15,max:21}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"kitchen",labelKey:"preset.kitchen",icon:"mdi:stove",profile:{temperature:{preferred:{min:18,max:22},acceptable:{min:17,max:24}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"bathroom",labelKey:"preset.bathroom",icon:"mdi:shower",profile:{temperature:{preferred:{min:22,max:24},acceptable:{min:20,max:26}},humidity:{preferred:{min:50,max:70},acceptable:{min:40,max:75}}}},{id:"nursery",labelKey:"preset.nursery",icon:"mdi:baby-carriage",profile:{temperature:{preferred:{min:20,max:22},acceptable:{min:19,max:23}},humidity:{preferred:{min:45,max:60},acceptable:{min:40,max:65}}}},{id:"office",labelKey:"preset.office",icon:"mdi:desk",profile:{temperature:{preferred:{min:20,max:23},acceptable:{min:19,max:25}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"basement",labelKey:"preset.basement",icon:"mdi:home-floor-negative-1",profile:{temperature:{preferred:{min:12,max:16},acceptable:{min:8,max:18}},humidity:{preferred:{min:50,max:65},acceptable:{min:40,max:70}}}},{id:"garage",labelKey:"preset.garage",icon:"mdi:garage",profile:{temperature:{preferred:{min:10,max:18},acceptable:{min:5,max:24}},humidity:{preferred:{min:40,max:65},acceptable:{min:30,max:75}}}},{id:"server_room",labelKey:"preset.server_room",icon:"mdi:server",profile:{temperature:{preferred:{min:18,max:24},acceptable:{min:15,max:27}},humidity:{preferred:{min:40,max:55},acceptable:{min:30,max:60}}}}],vt=new Map($t.map(t=>[t.id,t]));function bt(t){return function(t){return t?vt.get(t):void 0}(t)?.profile}const xt={good:0,warn:1,bad:2};function wt(t,e){return xt[t]>=xt[e]?t:e}function At(t,e){return t.comfort?t.comfort:bt(t.preset)??bt(e)??bt("living_room")??{}}function Et(t,e){const{preferred:i,acceptable:r}=e;if(t>=i.min&&t<=i.max)return 1;const[o,s]=t>i.max?[i.max,r.max]:[i.min,r.min],n=Math.abs(s-o)||1;return((t,e,i)=>Math.max(e,Math.min(i,t)))(1-.5*(Math.abs(t-o)/n),0,1)}function St(t,e,i){const{preferred:r,acceptable:o}=i;let s,n;return e>=r.min&&e<=r.max?(s="comfortable",n="good"):e<o.min?(s="too_low",n="bad"):e>o.max?(s="too_high",n="bad"):e<r.min?(s="bit_low",n="warn"):(s="bit_high",n="warn"),{dimension:t,value:e,status:s,severity:n,score:Et(e,i)}}function kt(t){if(void 0===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Pt(t){if(0===t.length)return;const e=t.reduce((t,e)=>({min:t.min+e.min,max:t.max+e.max}),{min:0,max:0});return{min:e.min/t.length,max:e.max/t.length}}function Ct(t){return void 0!==t}function zt(t){if("comfortable"===t.status)return"status.comfortable";const e="temperature"===t.dimension;switch(t.status){case"too_low":return e?"status.too_cold":"status.too_dry";case"too_high":return e?"status.too_hot":"status.too_humid";case"bit_low":return e?"status.bit_cold":"status.bit_dry";case"bit_high":return e?"status.bit_warm":"status.bit_humid"}}const Mt={width:400,height:320,margin:{top:14,right:16,bottom:40,left:46}};function Ht(t,e){const i=t.max-t.min;if(i<=0)return[t.min];const r=i/e,o=10**Math.floor(Math.log10(r)),s=r/o,n=(s<=1?1:s<=2?2:s<=2.5?2.5:s<=5?5:10)*o,a=[];for(let e=Math.ceil(t.min/n)*n;e<=t.max+1e-9;e+=n)a.push(Math.round(100*e)/100);return a}function Ut(t,e,i){const{plot:r}=e,o=i.faint?.5:1,s=(t,i)=>{const o=t.temp?e.x(t.temp.min):r.left,s=t.temp?e.x(t.temp.max):r.right,n=t.hum?e.y(t.hum.max):r.top,a=t.hum?e.y(t.hum.min):r.bottom;return V`<rect x=${o} y=${n} width=${s-o} height=${a-n}
      fill=${i} stroke="none" rx="2" />`};return V`<g opacity=${o}>
    ${s({temp:t.temperature?.acceptable,hum:t.humidity?.acceptable},"rgba(12, 163, 12, 0.13)")}
    ${s({temp:t.temperature?.preferred,hum:t.humidity?.preferred},"rgba(12, 163, 12, 0.30)")}
  </g>`}function Ot(t){const{layout:e,tempAxis:i,humAxis:r}=t,o=function(t,e,i){const r=t.margin.left,o=t.width-t.margin.right,s=t.margin.top,n=t.height-t.margin.bottom,a=(t,e,i)=>Math.max(e,Math.min(i,t));return{plot:{left:r,right:o,top:s,bottom:n},x:t=>r+(a(t,e.min,e.max)-e.min)/(e.max-e.min)*(o-r),y:t=>n-(a(t,i.min,i.max)-i.min)/(i.max-i.min)*(n-s)}}(e,i,r),{plot:s}=o,n=Ht(i,5),a=Ht(r,5);return V`
    <svg viewBox="0 0 ${e.width} ${e.height}" class="ccc-chart"
      role="img" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="ccc-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation=${7} />
        </filter>
        <clipPath id="ccc-plot-clip">
          <rect x=${s.left} y=${s.top}
            width=${s.right-s.left} height=${s.bottom-s.top} />
        </clipPath>
      </defs>

      <!-- grid -->
      <g class="ccc-grid">
        ${n.map(t=>V`<line x1=${o.x(t)} y1=${s.top}
          x2=${o.x(t)} y2=${s.bottom} />`)}
        ${a.map(t=>V`<line x1=${s.left} y1=${o.y(t)}
          x2=${s.right} y2=${o.y(t)} />`)}
      </g>

      <!-- comfort zone(s): a soft, blurred field rather than hard boxes -->
      <g clip-path="url(#ccc-plot-clip)">
        ${t.zone?V`<g filter="url(#ccc-blur)">${Ut(t.zone,o,{faint:t.zoneFaint})}</g>`:q}
        ${t.highlightZone?V`
              <g filter="url(#ccc-blur)">${Ut(t.highlightZone,o,{faint:!1})}</g>
              ${function(t,e){const{plot:i}=e,r=t.temperature?e.x(t.temperature.acceptable.min):i.left,o=t.temperature?e.x(t.temperature.acceptable.max):i.right,s=t.humidity?e.y(t.humidity.acceptable.max):i.top,n=t.humidity?e.y(t.humidity.acceptable.min):i.bottom;return V`<rect x=${r} y=${s} width=${o-r} height=${n-s}
    fill="none" stroke=${"rgba(12, 163, 12, 0.65)"} stroke-width="1.5" stroke-dasharray="4 3" rx="2" />`}(t.highlightZone,o)}
            `:q}
      </g>

      <!-- axes -->
      <line class="ccc-axis" x1=${s.left} y1=${s.bottom} x2=${s.right} y2=${s.bottom} />
      <line class="ccc-axis" x1=${s.left} y1=${s.top} x2=${s.left} y2=${s.bottom} />

      <!-- tick labels -->
      <g class="ccc-tick-label">
        ${n.map(t=>V`<text x=${o.x(t)} y=${s.bottom+14}
          text-anchor="middle">${t}</text>`)}
        ${a.map(t=>V`<text x=${s.left-6} y=${o.y(t)+3}
          text-anchor="end">${t}</text>`)}
      </g>

      <!-- axis titles -->
      <text class="ccc-axis-title" x=${(s.left+s.right)/2} y=${e.height-4}
        text-anchor="middle">${t.labels.x}</text>
      <text class="ccc-axis-title" transform="translate(11 ${(s.top+s.bottom)/2}) rotate(-90)"
        text-anchor="middle">${t.labels.y}</text>

      <!-- points -->
      ${t.points.map(e=>function(t,e,i){const{plot:r}=e,o=t.eval.temperature?.value,s=t.eval.humidity?.value;let n,a;if("x-axis"===t.pin&&void 0!==o)n=e.x(o),a=r.bottom-6;else if("y-axis"===t.pin&&void 0!==s)n=r.left+6,a=e.y(s);else{if(void 0===o||void 0===s)return V``;n=e.x(o),a=e.y(s)}const c=t.index===i.hoveredIndex,l=c?8:6;return V`<g class="ccc-point ${c?"is-hovered":""}"
    @mouseenter=${()=>i.onHover(t.index)}
    @mouseleave=${()=>i.onHover(null)}
    @click=${()=>i.onSelect(t.index)}
    @focus=${()=>i.onHover(t.index)}
    @blur=${()=>i.onHover(null)}
    tabindex="0" role="button">
    ${c?V`<circle cx=${n} cy=${a} r=${l+4} fill=${t.color} opacity="0.25" />`:q}
    <circle cx=${n} cy=${a} r=${l} fill=${t.color}
      stroke="var(--card-background-color, #fff)" stroke-width="1.5" />
  </g>`}(e,o,t))}
    </svg>
  `}const Nt=[{p:1,rgb:Rt("#0ca30c")},{p:.67,rgb:Rt("#fab219")},{p:.34,rgb:Rt("#ec835a")},{p:0,rgb:Rt("#d03b3b")}];function Tt(t){const e=Math.max(0,Math.min(1,t));for(let t=0;t<Nt.length-1;t++){const i=Nt[t],r=Nt[t+1];if(e<=i.p&&e>=r.p){const t=i.p-r.p||1,o=(e-r.p)/t;return jt(Bt(r.rgb,i.rgb,o))}}return jt(e>=Nt[0].p?Nt[0].rgb:Nt[Nt.length-1].rgb)}function Rt(t){const e=t.replace("#","");return[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)]}function jt([t,e,i]){const r=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");return`#${r(t)}${r(e)}${r(i)}`}const Dt=t=>{const e=t/255;return e<=.04045?e/12.92:((e+.055)/1.055)**2.4},Lt=t=>255*(t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055);function It([t,e,i]){const r=Dt(t),o=Dt(e),s=Dt(i),n=Math.cbrt(.4122214708*r+.5363325363*o+.0514459929*s),a=Math.cbrt(.2119034982*r+.6806995451*o+.1073969566*s),c=Math.cbrt(.0883024619*r+.2817188376*o+.6299787005*s);return[.2104542553*n+.793617785*a-.0040720468*c,1.9779984951*n-2.428592205*a+.4505937099*c,.0259040371*n+.7827717662*a-.808675766*c]}function Bt(t,e,i){const r=It(t),o=It(e);return function([t,e,i]){const r=(t+.3963377774*e+.2158037573*i)**3,o=(t-.1055613458*e-.0638541728*i)**3,s=(t-.0894841775*e-1.291485548*i)**3;return[Lt(4.0767416621*r-3.3077115913*o+.2309699292*s),Lt(-1.2684380046*r+2.6097574011*o-.3413193965*s),Lt(-.0041960863*r-.7034186147*o+1.707614701*s)]}([r[0]+(o[0]-r[0])*i,r[1]+(o[1]-r[1])*i,r[2]+(o[2]-r[2])*i])}const Kt={"card.name":"Climate Comfort Card","card.description":"Plot temperature/humidity for rooms on a shared comfort chart.","card.no_points":"No points configured yet. Add at least one location.","card.unavailable":"unavailable","axis.temperature":"Temperature (°C)","axis.humidity":"Humidity (%)","status.comfortable":"Comfortable","status.too_cold":"Too cold","status.too_hot":"Too hot","status.too_dry":"Too dry","status.too_humid":"Too humid","status.bit_cold":"A bit cold","status.bit_warm":"A bit warm","status.bit_dry":"A bit dry","status.bit_humid":"A bit humid","preset.general":"General","preset.living_room":"Living room","preset.bedroom":"Bedroom","preset.kitchen":"Kitchen","preset.bathroom":"Bathroom","preset.nursery":"Nursery","preset.office":"Office","preset.basement":"Basement","preset.garage":"Garage","preset.server_room":"Server room","editor.title":"Title","editor.default_preset":"Default preset","editor.zone_mode":"Comfort zones","editor.zone_mode.auto":"Auto","editor.zone_mode.average":"Averaged","editor.zone_mode.hidden":"Hidden","editor.show_legend":"Show legend","editor.zones":"Comfort zones","editor.zones.always":"Always","editor.zones.hover":"On hover","editor.zones.hidden":"Hidden","editor.points":"Points (rooms)","editor.add_point":"Add point","editor.point_name":"Name","editor.point_name_helper":"Overrides the entity name; leave blank to use it","editor.temperature_entity":"Temperature entity","editor.humidity_entity":"Humidity entity","editor.point_preset":"Preset","editor.use_default":"Use default","editor.remove":"Remove","editor.legend":"Legend"},Zt={en:Kt,pl:{"card.name":"Karta Komfortu Klimatu","card.description":"Nanieś temperaturę/wilgotność pokoi na wspólny wykres komfortu.","card.no_points":"Brak skonfigurowanych punktów. Dodaj co najmniej jedną lokalizację.","card.unavailable":"niedostępny","axis.temperature":"Temperatura (°C)","axis.humidity":"Wilgotność (%)","status.comfortable":"Komfortowo","status.too_cold":"Za zimno","status.too_hot":"Za ciepło","status.too_dry":"Za sucho","status.too_humid":"Za wilgotno","status.bit_cold":"Nieco zimno","status.bit_warm":"Nieco ciepło","status.bit_dry":"Nieco sucho","status.bit_humid":"Nieco wilgotno","preset.general":"Ogólny","preset.living_room":"Salon","preset.bedroom":"Sypialnia","preset.kitchen":"Kuchnia","preset.bathroom":"Łazienka","preset.nursery":"Pokój dziecięcy","preset.office":"Gabinet","preset.basement":"Piwnica","preset.garage":"Garaż","preset.server_room":"Serwerownia","editor.title":"Tytuł","editor.default_preset":"Domyślny preset","editor.zone_mode":"Strefy komfortu","editor.zone_mode.auto":"Automatyczne","editor.zone_mode.average":"Uśrednione","editor.zone_mode.hidden":"Ukryte","editor.show_legend":"Pokaż legendę","editor.zones":"Strefy komfortu","editor.zones.always":"Zawsze","editor.zones.hover":"Przy najechaniu","editor.zones.hidden":"Ukryte","editor.points":"Punkty (pokoje)","editor.add_point":"Dodaj punkt","editor.point_name":"Nazwa","editor.point_name_helper":"Nadpisuje nazwę encji; zostaw puste, aby jej użyć","editor.temperature_entity":"Encja temperatury","editor.humidity_entity":"Encja wilgotności","editor.point_preset":"Preset","editor.use_default":"Użyj domyślnego","editor.remove":"Usuń","editor.legend":"Legenda"}};function Vt(t,e){const i=(e??"en").split("-")[0].toLowerCase();return Zt[i]?.[t]??Kt[t]??t}var Wt,qt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Wt||(Wt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(qt||(qt={}));const Ft=[{id:"always",icon:"mdi:eye"},{id:"hover",icon:"mdi:gesture-tap"},{id:"hidden",icon:"mdi:eye-off"}];let Gt=class extends lt{setConfig(t){this._config={...t,points:t.points??[]}}get _lang(){return this.hass?.language??"en"}_t(t){return Vt(t,this._lang)}_emit(t){this._config=t,function(t,e,i,r){r=r||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});o.detail=i,t.dispatchEvent(o)}(this,"config-changed",{config:t})}_updateRoot(t){this._config&&this._emit({...this._config,...t})}_updatePoint(t,e){if(!this._config)return;const i=this._config.points.map((i,r)=>r===t?{...i,...e}:i);this._emit({...this._config,points:i})}_addPoint(){if(!this._config)return;const t=[...this._config.points,{}];this._emit({...this._config,points:t})}_removePoint(t){if(!this._config)return;const e=this._config.points.filter((e,i)=>i!==t);this._emit({...this._config,points:e})}_renderPresetChips(t,e,i){const r=[];e&&r.push(this._chip(this._t("editor.use_default"),"mdi:home-outline",!t,()=>i(void 0)));for(const e of $t)r.push(this._chip(this._t(e.labelKey),e.icon,t===e.id,()=>i(e.id)));return Z`<div class="ccc-chips">${r}</div>`}_chip(t,e,i,r){return Z`<button
      type="button"
      class="ccc-chip ${i?"is-active":""}"
      @click=${r}
    >
      <ha-icon icon=${e}></ha-icon><span>${t}</span>
    </button>`}_renderRangeHint(t){const e=[],i=t.temperature?.acceptable,r=t.humidity?.acceptable;return i&&e.push(`🌡 ${i.min}–${i.max} °C`),r&&e.push(`💧 ${r.min}–${r.max} %`),0===e.length?q:Z`<div class="ccc-range-hint">${e.join("   ·   ")}</div>`}render(){return this._config&&this.hass?Z`
      <div class="ccc-editor">
        <ha-textfield
          label=${this._t("editor.title")}
          .value=${this._config.title??""}
          @input=${t=>this._updateRoot({title:t.target.value||void 0})}
        ></ha-textfield>

        <div class="ccc-field">
          <div class="ccc-label">${this._t("editor.default_preset")}</div>
          ${this._renderPresetChips(this._config.preset,!1,t=>this._updateRoot({preset:t}))}
        </div>

        <div class="ccc-field">
          <div class="ccc-label">${this._t("editor.zones")}</div>
          <div class="ccc-chips">
            ${Ft.map(({id:t,icon:e})=>this._chip(this._t(`editor.zones.${t}`),e,(this._config.zone_display??"always")===t,()=>this._updateRoot({zone_display:t})))}
          </div>
        </div>

        <ha-formfield label=${this._t("editor.show_legend")}>
          <ha-switch
            .checked=${!1!==this._config.show_legend}
            @change=${t=>this._updateRoot({show_legend:t.target.checked})}
          ></ha-switch>
        </ha-formfield>

        <div class="ccc-section-title">${this._t("editor.points")}</div>
        ${this._config.points.map((t,e)=>this._renderPointEditor(t,e))}

        <mwc-button raised @click=${this._addPoint}>
          ${this._t("editor.add_point")}
        </mwc-button>
      </div>
    `:q}_defaultName(t){const e=t.temperature||t.humidity;return e&&this.hass?.states[e]?this.hass.states[e].attributes.friendly_name??e:e??""}_renderPointEditor(t,e){return Z`
      <div class="ccc-point-editor">
        <div class="ccc-point-header">
          <ha-textfield
            class="grow"
            label=${this._t("editor.point_name")}
            .value=${t.name??""}
            .placeholder=${this._defaultName(t)}
            helper=${this._t("editor.point_name_helper")}
            @input=${t=>this._updatePoint(e,{name:t.target.value||void 0})}
          ></ha-textfield>
          <ha-icon-button
            .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
            title=${this._t("editor.remove")}
            @click=${()=>this._removePoint(e)}
          ></ha-icon-button>
        </div>

        <ha-entity-picker
          label=${this._t("editor.temperature_entity")}
          .hass=${this.hass}
          .value=${t.temperature??""}
          .includeDomains=${["sensor","climate","number","input_number"]}
          allow-custom-entity
          @value-changed=${t=>this._updatePoint(e,{temperature:t.detail.value||void 0})}
        ></ha-entity-picker>

        <ha-entity-picker
          label=${this._t("editor.humidity_entity")}
          .hass=${this.hass}
          .value=${t.humidity??""}
          .includeDomains=${["sensor","number","input_number"]}
          allow-custom-entity
          @value-changed=${t=>this._updatePoint(e,{humidity:t.detail.value||void 0})}
        ></ha-entity-picker>

        <div class="ccc-field">
          <div class="ccc-label">${this._t("editor.point_preset")}</div>
          ${this._renderPresetChips(t.preset,!0,t=>this._updatePoint(e,{preset:t}))}
          ${this._renderRangeHint(At(t,this._config.preset))}
        </div>
      </div>
    `}};Gt.styles=n`
    .ccc-editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    ha-textfield,
    ha-select,
    ha-entity-picker {
      width: 100%;
    }
    .ccc-section-title {
      font-weight: 600;
      margin-top: 8px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding-top: 12px;
    }
    .ccc-point-editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
    }
    .ccc-point-header {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ccc-point-header .grow {
      flex: 1;
    }
    .ccc-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .ccc-label {
      font-size: 12px;
      color: var(--secondary-text-color, #888);
    }
    .ccc-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .ccc-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 5px 10px 5px 8px;
      border: 1px solid var(--divider-color, #d0d0d0);
      border-radius: 16px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #333);
      font-size: 13px;
      font-family: inherit;
      cursor: pointer;
      transition: background 0.1s ease, border-color 0.1s ease;
    }
    .ccc-chip:hover {
      background: var(--secondary-background-color, #f0f0f0);
    }
    .ccc-chip.is-active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .ccc-chip ha-icon {
      --mdc-icon-size: 18px;
      width: 18px;
      height: 18px;
    }
    .ccc-range-hint {
      font-size: 12px;
      color: var(--secondary-text-color, #888);
    }
  `,t([mt({attribute:!1})],Gt.prototype,"hass",void 0),t([ft()],Gt.prototype,"_config",void 0),Gt=t([ht("climate-comfort-card-editor")],Gt),console.info("%c CLIMATE-COMFORT-CARD %c v0.1.0-beta.5 ","color: white; background: #2e9e5b; font-weight: 700;","color: #2e9e5b; background: white; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:_t,name:Vt("card.name"),description:Vt("card.description"),preview:!0});let Jt=class extends lt{constructor(){super(...arguments),this._hovered=null}static async getConfigElement(){return document.createElement(`${_t}-editor`)}static getStubConfig(){return{type:`custom:${_t}`,title:"Comfort",preset:"living_room",points:[]}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={zone_mode:"auto",zone_display:"always",show_legend:!0,...t,points:t.points??[]}}getCardSize(){return 6}get _lang(){return this.hass?.language??"en"}_t(t){return Vt(t,this._lang)}_resolvePoints(){return this._config&&this.hass?this._config.points.map(t=>{const e=At(t,this._config.preset),i=t.temperature?kt(this.hass.states[t.temperature]?.state):void 0,r=t.humidity?kt(this.hass.states[t.humidity]?.state):void 0,o=function(t){const{name:e,profile:i}=t;let r,o,s="good",n=1;return void 0!==t.temperature&&i.temperature&&(r=St("temperature",t.temperature,i.temperature),s=wt(s,r.severity),n=Math.min(n,r.score)),void 0!==t.humidity&&i.humidity&&(o=St("humidity",t.humidity,i.humidity),s=wt(s,o.severity),n=Math.min(n,o.score)),{name:e,profile:i,temperature:r,humidity:o,severity:s,score:n,unavailable:!r&&!o}}({name:t.name||this._entityFallbackName(t),profile:e,temperature:i,humidity:r});return{config:t,profile:e,evaluation:o,color:t.color??(o.unavailable?"var(--disabled-text-color, #9e9e9e)":Tt(o.score))}}):[]}_entityFallbackName(t){const e=t.temperature||t.humidity;return e&&this.hass?.states[e]?this.hass.states[e].attributes.friendly_name??e:e??"—"}_overallLabel(t){if(t.unavailable)return this._t("card.unavailable");const e=[];return t.temperature&&"comfortable"!==t.temperature.status&&e.push(this._t(zt(t.temperature))),t.humidity&&"comfortable"!==t.humidity.status&&e.push(this._t(zt(t.humidity))),e.length?e.join(", "):this._t("status.comfortable")}shouldUpdate(t){if(t.has("_config")||t.has("_hovered"))return!0;if(!this._config)return!1;const e=t.get("hass");return!e||this._config.points.some(t=>[t.temperature,t.humidity].some(t=>t&&e.states[t]!==this.hass.states[t]))}render(){if(!this._config||!this.hass)return q;const t=this._resolvePoints(),{tempAxis:e,humAxis:i}=this._computeAxes(t),r=t.map((t,e)=>{const{evaluation:i}=t;if(i.unavailable)return null;const r=void 0!==i.temperature,o=void 0!==i.humidity,s=r&&o?"none":r?"x-axis":"y-axis";return{index:e,eval:i,color:t.color,pin:s}}).filter(t=>null!==t),o=null!==this._hovered?t[this._hovered]:void 0,s=this._zones(t,o);return Z`
      <ha-card .header=${this._config.title}>
        <div class="ccc-body">
          <div class="ccc-chart-wrap">
            ${Ot({layout:Mt,tempAxis:e,humAxis:i,points:r,zone:s.zone,zoneFaint:s.faint,highlightZone:s.highlightZone,hoveredIndex:this._hovered,labels:{x:this._t("axis.temperature"),y:this._t("axis.humidity")},onHover:t=>this._hovered=t,onSelect:t=>this._hovered=t})}
            ${o?this._renderTooltip(o):q}
          </div>
          ${0===t.length?Z`<div class="ccc-empty">${this._t("card.no_points")}</div>`:this._config.show_legend?this._renderLegend(t):q}
        </div>
      </ha-card>
    `}_computeAxes(t){const e=[],i=[];for(const r of t)r.evaluation.unavailable||(r.evaluation.temperature&&e.push(r.evaluation.temperature.value),r.evaluation.humidity&&i.push(r.evaluation.humidity.value));return{tempAxis:this._config.temperature_axis??this._autoRange(e,2,gt),humAxis:this._config.humidity_axis??this._autoRange(i,10,yt,0,100)}}_autoRange(t,e,i,r=-1/0,o=1/0){if(0===t.length)return i;let s=Math.floor(Math.min(...t)-e),n=Math.ceil(Math.max(...t)+e);return s===n&&(s-=e,n+=e),{min:Math.max(r,s),max:Math.min(o,n)}}_zones(t,e){const i=this._config?.zone_display??"always";if("hidden"===this._config?.zone_mode||"hidden"===i)return{faint:!1};let r;if(e&&!e.evaluation.unavailable){const t=e.profile;(t.temperature||t.humidity)&&(r=t)}if("hover"===i)return{faint:!1,highlightZone:r};const o=t.filter(t=>!t.evaluation.unavailable).map(t=>t.profile).filter(t=>t.temperature||t.humidity),s=o.length?function(t){if(0===t.length)return;const e=t.map(t=>t.temperature?.preferred).filter(Ct),i=t.map(t=>t.temperature?.acceptable).filter(Ct),r=t.map(t=>t.humidity?.preferred).filter(Ct),o=t.map(t=>t.humidity?.acceptable).filter(Ct),s=t=>JSON.stringify(t),n=t.every(e=>s(e)===s(t[0])),a={sources:t.length,uniform:n},c=Pt(e),l=Pt(i);c&&l&&(a.temperature={preferred:c,acceptable:l});const d=Pt(r),h=Pt(o);return d&&h&&(a.humidity={preferred:d,acceptable:h}),a}(o):void 0;return{zone:s,faint:!!s&&"average"!==this._config?.zone_mode&&!s.uniform,highlightZone:r}}_renderTooltip(t){const{evaluation:e}=t,i=t=>{const i=e[t];return i?Z`<div class="ccc-tt-row">
        <span class="ccc-swatch" style=${`background:${Tt(i.score)}`}></span>
        <span>${i.value}${(t=>"temperature"===t?"°C":"%")(t)}</span>
        <span class="ccc-tt-status">${this._t(zt(i))}</span>
      </div>`:q};return Z`<div class="ccc-tooltip">
      <div class="ccc-tt-name">${e.name}</div>
      ${i("temperature")}
      ${i("humidity")}
    </div>`}_renderLegend(t){return Z`<div class="ccc-legend">
      ${t.map((t,e)=>{const i=this._overallLabel(t.evaluation);return Z`<button
          type="button"
          class="ccc-badge ${this._hovered===e?"is-hovered":""} ${t.evaluation.unavailable?"is-unavailable":""}"
          title=${`${t.evaluation.name} — ${i}`}
          @mouseenter=${()=>this._hovered=e}
          @mouseleave=${()=>this._hovered=null}
          @focus=${()=>this._hovered=e}
          @blur=${()=>this._hovered=null}
          @click=${()=>this._hovered=this._hovered===e?null:e}
        >
          <span class="ccc-swatch" style=${`background:${t.color}`}></span>
          <span class="ccc-badge-name">${t.evaluation.name}</span>
        </button>`})}
    </div>`}};Jt.styles=n`
    ha-card {
      overflow: hidden;
    }
    .ccc-body {
      padding: 8px 12px 12px;
    }
    .ccc-chart-wrap {
      position: relative;
      width: 100%;
    }
    .ccc-chart {
      width: 100%;
      height: auto;
      display: block;
      font-family: var(--paper-font-body1_-_font-family, inherit);
    }
    .ccc-grid line {
      stroke: var(--divider-color, #e0e0e0);
      stroke-width: 0.5;
      opacity: 0.6;
    }
    .ccc-axis {
      stroke: var(--secondary-text-color, #888);
      stroke-width: 1;
    }
    .ccc-tick-label text {
      fill: var(--secondary-text-color, #888);
      font-size: 9px;
    }
    .ccc-axis-title {
      fill: var(--primary-text-color, #333);
      font-size: 10px;
      font-weight: 500;
    }
    .ccc-point {
      cursor: pointer;
      outline: none;
      transition: r 0.1s ease;
    }
    .ccc-point circle {
      transition: r 0.1s ease;
    }
    .ccc-tooltip {
      position: absolute;
      top: 8px;
      right: 8px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 8px 10px;
      box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.15));
      font-size: 12px;
      pointer-events: none;
      min-width: 120px;
    }
    .ccc-tt-name {
      font-weight: 600;
      margin-bottom: 4px;
    }
    .ccc-tt-row {
      display: flex;
      align-items: center;
      gap: 6px;
      line-height: 1.6;
    }
    .ccc-tt-status {
      margin-left: auto;
      color: var(--secondary-text-color, #888);
    }
    .ccc-legend {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .ccc-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      max-width: 100%;
      padding: 4px 10px 4px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 14px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #333);
      font-family: inherit;
      font-size: 12.5px;
      line-height: 1.2;
      cursor: pointer;
      transition: background 0.1s ease, border-color 0.1s ease;
    }
    .ccc-badge:hover,
    .ccc-badge.is-hovered {
      background: var(--secondary-background-color, #f0f0f0);
      border-color: var(--primary-color, #03a9f4);
    }
    .ccc-badge.is-unavailable {
      opacity: 0.6;
      font-style: italic;
    }
    .ccc-badge-name {
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ccc-swatch {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex: 0 0 auto;
    }
    .ccc-empty {
      padding: 16px;
      text-align: center;
      color: var(--secondary-text-color, #888);
    }
  `,t([mt({attribute:!1})],Jt.prototype,"hass",void 0),t([ft()],Jt.prototype,"_config",void 0),t([ft()],Jt.prototype,"_hovered",void 0),Jt=t([ht(_t)],Jt);export{Jt as ClimateComfortCard};
