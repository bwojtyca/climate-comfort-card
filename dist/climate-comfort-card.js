function t(t,e,i,o){var r,s=arguments.length,n=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(s<3?r(n):s>3?r(e,i,n):r(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),r=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new s(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,_=m.trustedTypes,f=_?_.emptyScript:"",g=m.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&l(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const s=o?.call(this);r?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),r=e.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=o;const s=r.fromAttribute(e,t.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(t,e,i,o=!1,r){if(void 0!==t){const s=this.constructor;if(!1===o&&(r=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:r},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==r||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,g?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,P=w.trustedTypes,k=P?P.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+S,M=`<${E}>`,z=document,T=()=>z.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,N="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,j=/>/g,L=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,F=/"/g,I=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),G=B(1),K=B(2),Z=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,q=z.createTreeWalker(z,129);function J(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,o=[];let r,s=2===e?"<svg>":3===e?"<math>":"",n=O;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===O?"!--"===c[1]?n=U:void 0!==c[1]?n=j:void 0!==c[2]?(I.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=L):void 0!==c[3]&&(n=L):n===L?">"===c[0]?(n=r??O,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?L:'"'===c[3]?F:D):n===F||n===D?n=L:n===U||n===j?n=O:(n=L,r=void 0);const h=n===L&&t[e+1].startsWith("/>")?" ":"";s+=n===O?i+M:l>=0?(o.push(a),i.slice(0,l)+C+i.slice(l)+S+h):i+S+(-2===l?e:h)}return[J(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Y{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,s=0;const n=t.length-1,a=this.parts,[c,l]=Q(t,e);if(this.el=Y.createElement(c,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=q.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(C)){const e=l[s++],i=o.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?ot:"?"===n[1]?rt:"@"===n[1]?st:it}),o.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:r}),o.removeAttribute(t));if(I.test(o.tagName)){const t=o.textContent.split(S),e=t.length-1;if(e>0){o.textContent=P?P.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],T()),q.nextNode(),a.push({type:2,index:++r});o.append(t[e],T())}}}else if(8===o.nodeType)if(o.data===E)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(S,t+1));)a.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,o){if(e===Z)return e;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const s=R(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(t),r._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??z).importNode(e,!0);q.currentNode=o;let r=q.nextNode(),s=0,n=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new et(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new nt(r,this,t)),this._$AV.push(e),a=i[++n]}s!==a?.index&&(r=q.nextNode(),s++)}return q.currentNode=z,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),R(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==Z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Y(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new et(this.O(T()),this.O(T()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,o){const r=this.strings;let s=!1;if(void 0===r)t=X(this,t,e,0),s=!R(t)||t!==this._$AH&&t!==Z,s&&(this._$AH=t);else{const o=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=X(this,o[i+n],e,n),a===Z&&(a=this._$AH[n]),s||=!R(a)||a!==this._$AH[n],a===W?t=W:t!==W&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}s&&!o&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends it{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??W)===Z)return;const i=this._$AH,o=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==W&&(i===W||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(Y,et),(w.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;class lt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let r=o._$litPart$;if(void 0===r){const t=i?.renderBefore??null;o._$litPart$=r=new et(e.insertBefore(T(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}}lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const dt=ct.litElementPolyfillSupport;dt?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},ut=(t=pt,e,i)=>{const{kind:o,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,r,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];e.call(this,i),this.requestUpdate(o,r,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function mt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function _t(t){return mt({...t,state:!0,attribute:!1})}const ft="climate-comfort-card",gt={min:10,max:32},yt={min:20,max:90},$t={min:.5,max:2},vt={min:3,max:10},bt={preferred:{min:3,max:14},acceptable:{min:-2,max:17}},xt="var(--ccc-mold-stroke, rgba(158, 130, 74, 0.55))",wt="var(--ccc-reference-color, #7c8b99)",At=[{id:"general",labelKey:"preset.general",icon:"mdi:home-thermometer",profile:{temperature:{preferred:{min:19,max:23},acceptable:{min:17,max:25}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"living_room",labelKey:"preset.living_room",icon:"mdi:sofa",profile:{temperature:{preferred:{min:20,max:23},acceptable:{min:18,max:25}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"bedroom",labelKey:"preset.bedroom",icon:"mdi:bed",profile:{temperature:{preferred:{min:16,max:19},acceptable:{min:15,max:21}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"kitchen",labelKey:"preset.kitchen",icon:"mdi:stove",profile:{temperature:{preferred:{min:18,max:22},acceptable:{min:17,max:24}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"bathroom",labelKey:"preset.bathroom",icon:"mdi:shower",profile:{temperature:{preferred:{min:22,max:24},acceptable:{min:20,max:26}},humidity:{preferred:{min:50,max:70},acceptable:{min:40,max:75}}}},{id:"nursery",labelKey:"preset.nursery",icon:"mdi:baby-carriage",profile:{temperature:{preferred:{min:20,max:22},acceptable:{min:19,max:23}},humidity:{preferred:{min:45,max:60},acceptable:{min:40,max:65}}}},{id:"office",labelKey:"preset.office",icon:"mdi:desk",profile:{temperature:{preferred:{min:20,max:23},acceptable:{min:19,max:25}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"basement",labelKey:"preset.basement",icon:"mdi:home-floor-negative-1",profile:{temperature:{preferred:{min:12,max:16},acceptable:{min:8,max:18}},humidity:{preferred:{min:50,max:65},acceptable:{min:40,max:70}}}},{id:"garage",labelKey:"preset.garage",icon:"mdi:garage",profile:{temperature:{preferred:{min:10,max:18},acceptable:{min:5,max:24}},humidity:{preferred:{min:40,max:65},acceptable:{min:30,max:75}}}},{id:"server_room",labelKey:"preset.server_room",icon:"mdi:server",profile:{temperature:{preferred:{min:18,max:24},acceptable:{min:15,max:27}},humidity:{preferred:{min:40,max:55},acceptable:{min:30,max:60}}}}],Pt=new Map(At.map(t=>[t.id,t]));function kt(t){return function(t){return t?Pt.get(t):void 0}(t)?.profile}const Ct={good:0,warn:1,bad:2};function St(t,e){return Ct[t]>=Ct[e]?t:e}function Et(t,e){if(!t)return;const i=e.custom_presets?.find(e=>e.name===t);return i?{temperature:i.temperature,humidity:i.humidity,dewPoint:i.dewPoint}:kt(t)}function Mt(t,e){return function(t){if(t.temperature&&t.humidity&&!t.dewPoint)return{...t,dewPoint:bt};return t}(t.comfort??Et(t.preset,e)??Et(e.preset,e)??kt("living_room")??{})}const zt=17.62,Tt=243.12;function Rt(t,e){const i=zt*e/(Tt+e),o=100*Math.exp(i-zt*t/(Tt+t));return Ot(o,0,100)}const Ht=t=>6.112*Math.exp(zt*t/(Tt+t));function Nt(t){return Ht(t-5)/Ht(t)*80}const Ot=(t,e,i)=>Math.max(e,Math.min(i,t));function Ut(t,e){const{preferred:i,acceptable:o}=e;if(t>=i.min&&t<=i.max)return 1;const[r,s]=t>i.max?[i.max,o.max]:[i.min,o.min],n=Math.abs(s-r)||1,a=Math.abs(t-r)/n;return Ot(1-.5*a,0,1)}function jt(t,e,i){const{preferred:o,acceptable:r}=i;let s,n;return e>=o.min&&e<=o.max?(s="comfortable",n="good"):e<r.min?(s="too_low",n="bad"):e>r.max?(s="too_high",n="bad"):e<o.min?(s="bit_low",n="warn"):(s="bit_high",n="warn"),{dimension:t,value:e,status:s,severity:n,score:Ut(e,i)}}function Lt(t){if(void 0===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Dt(t){const{name:e,profile:i}=t;let o,r,s,n="good",a=1;if(void 0!==t.temperature&&i.temperature&&(o=jt("temperature",t.temperature,i.temperature),n=St(n,o.severity),a=Math.min(a,o.score)),void 0!==t.humidity&&i.humidity&&(r=jt("humidity",t.humidity,i.humidity),n=St(n,r.severity),a=Math.min(a,r.score)),void 0!==t.temperature&&void 0!==t.humidity&&i.dewPoint){const e=function(t,e){const i=Ot(e,.1,100),o=Math.log(i/100)+zt*t/(Tt+t);return Tt*o/(zt-o)}(t.temperature,t.humidity);s=jt("dewpoint",Math.round(10*e)/10,i.dewPoint),n=St(n,s.severity),a=Math.min(a,s.score)}return{name:e,profile:i,temperature:o,humidity:r,dewPoint:s,severity:n,score:a,unavailable:!o&&!r}}function Ft(t){if(0===t.length)return;const e=t.reduce((t,e)=>({min:t.min+e.min,max:t.max+e.max}),{min:0,max:0});return{min:e.min/t.length,max:e.max/t.length}}function It(t){return void 0!==t}function Bt(t){if("comfortable"===t.status)return"status.comfortable";switch(t.dimension){case"temperature":switch(t.status){case"too_low":return"status.too_cold";case"too_high":return"status.too_hot";case"bit_low":return"status.bit_cold";case"bit_high":return"status.bit_warm"}break;case"dewpoint":switch(t.status){case"too_high":return"status.too_muggy";case"bit_high":return"status.bit_muggy";case"too_low":return"status.too_dry";case"bit_low":return"status.bit_dry"}break;case"humidity":switch(t.status){case"too_low":return"status.too_dry";case"too_high":return"status.too_humid";case"bit_low":return"status.bit_dry";case"bit_high":return"status.bit_humid"}}return"status.comfortable"}const Gt=(t,e,i)=>Math.max(e,Math.min(i,t)),Kt={width:400,height:320,margin:{top:14,right:16,bottom:40,left:46}};function Zt(t,e){const i=t.max-t.min;if(i<=0)return[t.min];const o=i/e,r=10**Math.floor(Math.log10(o)),s=o/r,n=(s<=1?1:s<=2?2:s<=2.5?2.5:s<=5?5:10)*r,a=[];for(let e=Math.ceil(t.min/n)*n;e<=t.max+1e-9;e+=n)a.push(Math.round(100*e)/100);return a}function Wt(t,e,i){const o=e.temperature?.[t],r=e.humidity?.[t],s=e.dewPoint?.[t],n=o?o.min:i.tRange.min,a=o?o.max:i.tRange.max,c=r?r.max:i.hRange.max,l=r?r.min:i.hRange.min,d=[],h=[];for(let t=0;t<=28;t++){const e=n+(a-n)*t/28;let o=c,r=l;s&&(o=Math.min(o,Rt(e,s.max)),r=Math.max(r,Rt(e,s.min))),o<r||(d.push(`${i.x(e)},${i.y(o)}`),h.push(`${i.x(e)},${i.y(r)}`))}return d.length<2?null:[...d,...h.reverse()].join(" ")}function Vt(t,e,i){const o=Wt("acceptable",t,e),r=Wt("preferred",t,e);return K`<g opacity=${i.faint?.5:1}>
    ${o?K`<polygon points=${o} fill=${"rgba(12, 163, 12, 0.13)"} stroke="none" />`:W}
    ${r?K`<polygon points=${r} fill=${"rgba(12, 163, 12, 0.30)"} stroke="none" />`:W}
  </g>`}function qt(t,e){const i=10,o=[];for(const r of t){const t=e.x(r.t),s=e.y(r.h);o.push([t-i,s-i],[t+i,s-i],[t+i,s+i],[t-i,s+i])}if(o.length<3)return K``;const r=function(t,e){const i=t.length;if(i<3)return"";let o="";for(let r=0;r<i;r++){const s=t[(r-1+i)%i],n=t[r],a=t[(r+1)%i],[c,l]=[n[0]-s[0],n[1]-s[1]],[d,h]=[a[0]-n[0],a[1]-n[1]],p=Math.hypot(c,l)||1,u=Math.hypot(d,h)||1,m=Math.min(e,p/2),_=Math.min(e,u/2),f=[n[0]-c/p*m,n[1]-l/p*m],g=[n[0]+d/u*_,n[1]+h/u*_];o+=`${0===r?"M":"L"}${f[0].toFixed(1)},${f[1].toFixed(1)}`,o+=`Q${n[0].toFixed(1)},${n[1].toFixed(1)} ${g[0].toFixed(1)},${g[1].toFixed(1)}`}return o+"Z"}(function(t){if(t.length<3)return t;const e=[...t].sort((t,e)=>t[0]-e[0]||t[1]-e[1]),i=(t,e,i)=>(e[0]-t[0])*(i[1]-t[1])-(e[1]-t[1])*(i[0]-t[0]),o=[];for(const t of e){for(;o.length>=2&&i(o[o.length-2],o[o.length-1],t)<=0;)o.pop();o.push(t)}const r=[];for(let t=e.length-1;t>=0;t--){const o=e[t];for(;r.length>=2&&i(r[r.length-2],r[r.length-1],o)<=0;)r.pop();r.push(o)}return o.slice(0,-1).concat(r.slice(0,-1))}(o),10);return K`<g clip-path="url(#ccc-plot-clip)">
    <path d=${r} fill=${"var(--ccc-group-fill, rgba(120, 140, 170, 0.12))"} stroke=${"var(--ccc-group-stroke, rgba(120, 140, 170, 0.6))"}
      stroke-width="1.5" stroke-linejoin="round" />
  </g>`}function Jt(t){const{layout:e,tempAxis:i,humAxis:o}=t,r=function(t,e,i){const o=t.margin.left,r=t.width-t.margin.right,s=t.margin.top,n=t.height-t.margin.bottom,a=(t,e,i)=>Math.max(e,Math.min(i,t));return{plot:{left:o,right:r,top:s,bottom:n},tRange:e,hRange:i,x:t=>o+(a(t,e.min,e.max)-e.min)/(e.max-e.min)*(r-o),y:t=>n-(a(t,i.min,i.max)-i.min)/(i.max-i.min)*(n-s)}}(e,i,o),{plot:s}=r,n=Zt(i,5),a=Zt(o,5);return K`
    <svg viewBox="0 0 ${e.width} ${e.height}" class="ccc-chart"
      role="img" preserveAspectRatio="xMidYMid meet"
      @click=${()=>t.onClear()}>
      <defs>
        <filter id="ccc-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation=${7} />
        </filter>
        <clipPath id="ccc-plot-clip">
          <rect x=${s.left} y=${s.top}
            width=${s.right-s.left} height=${s.bottom-s.top} />
        </clipPath>
        <pattern id="ccc-mold-hatch" width="7" height="7"
          patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke=${xt}
            stroke-width="1" opacity="0.5" />
        </pattern>
      </defs>

      <!-- grid -->
      <g class="ccc-grid">
        ${n.map(t=>K`<line x1=${r.x(t)} y1=${s.top}
          x2=${r.x(t)} y2=${s.bottom} />`)}
        ${a.map(t=>K`<line x1=${s.left} y1=${r.y(t)}
          x2=${s.right} y2=${r.y(t)} />`)}
      </g>

      <!-- comfort zone(s): a soft, blurred field rather than hard boxes -->
      <g clip-path="url(#ccc-plot-clip)">
        ${t.zone?K`<g filter="url(#ccc-blur)">${Vt(t.zone,r,{faint:t.zoneFaint})}</g>`:W}
        ${t.highlightZone?K`
              <g filter="url(#ccc-blur)">${Vt(t.highlightZone,r,{faint:!1})}</g>
              ${function(t,e){const i=Wt("acceptable",t,e);return i?K`<polygon points=${i}
    fill="none" stroke=${"rgba(12, 163, 12, 0.65)"} stroke-width="1.5" stroke-dasharray="4 3" />`:K``}(t.highlightZone,r)}
            `:W}
      </g>

      <!-- soft mold-risk hint -->
      ${t.moldRisk?function(t){const{plot:e,tRange:i,hRange:o}=t,r=[];let s=!1;for(let e=0;e<=24;e++){const n=i.min+(i.max-i.min)*e/24,a=Nt(n);a<o.max&&(s=!0),r.push([t.x(n),t.y(Gt(a,o.min,o.max))])}if(!s)return K``;const n=[...r,[t.x(i.max),e.top],[t.x(i.min),e.top]].map(([t,e])=>`${t},${e}`).join(" "),a=r.map(([t,e])=>`${t},${e}`).join(" ");return K`<g clip-path="url(#ccc-plot-clip)">
    <polygon points=${n} fill="url(#ccc-mold-hatch)" stroke="none" />
    <polyline points=${a} fill="none" stroke=${xt}
      stroke-width="1" stroke-dasharray="3 3" opacity="0.7" />
  </g>`}(r):W}

      <!-- soft blob for the hovered group -->
      ${t.groupHull&&t.groupHull.length>=1?qt(t.groupHull,r):W}

      <!-- history trails -->
      ${(t.trails??[]).filter(t=>t.points.length>1).map(e=>function(t,e,i,o){const r=t.length-1,s=t.map(t=>[i.x(t.t),i.y(t.h)]),n=t=>t.toFixed(1),a=[];let c=`M${n(s[0][0])},${n(s[0][1])}`;for(let e=0;e<r;e++){const i=s[e-1]??s[e],o=s[e],l=s[e+1],d=s[e+2]??s[e+1],h=o[0]+(l[0]-i[0])/6,p=o[1]+(l[1]-i[1])/6,u=l[0]-(d[0]-o[0])/6,m=l[1]-(d[1]-o[1])/6,_=`C${n(h)},${n(p)} ${n(u)},${n(m)} ${n(l[0])},${n(l[1])}`,f=(e+1)/r,g=.12+.6*f,y=1+2*f;a.push(K`<path d=${`M${n(o[0])},${n(o[1])} ${_}`} fill="none"
      stroke=${t[e+1].color} stroke-width=${y.toFixed(2)} stroke-opacity=${g.toFixed(2)}
      stroke-linecap="round" />`),c+=" "+_}let l=W;if(o){const i=c,o=Math.max(1.6,Math.min(5,.09*t.length)).toFixed(1);l=K`<circle class="ccc-playhead" r="1.5" fill=${e}
      style=${`offset-path:path('${i}');animation-duration:${o}s`} />`}return K`<g clip-path="url(#ccc-plot-clip)">${a}${l}</g>`}(e.points,e.color,r,t.animateTrails??!1))}

      <!-- axes -->
      <line class="ccc-axis" x1=${s.left} y1=${s.bottom} x2=${s.right} y2=${s.bottom} />
      <line class="ccc-axis" x1=${s.left} y1=${s.top} x2=${s.left} y2=${s.bottom} />

      <!-- tick labels -->
      <g class="ccc-tick-label">
        ${n.map(t=>K`<text x=${r.x(t)} y=${s.bottom+14}
          text-anchor="middle">${t}</text>`)}
        ${a.map(t=>K`<text x=${s.left-6} y=${r.y(t)+3}
          text-anchor="end">${t}</text>`)}
      </g>

      <!-- axis titles -->
      <text class="ccc-axis-title" x=${(s.left+s.right)/2} y=${e.height-4}
        text-anchor="middle">${t.labels.x}</text>
      <text class="ccc-axis-title" transform="translate(11 ${(s.top+s.bottom)/2}) rotate(-90)"
        text-anchor="middle">${t.labels.y}</text>

      <!-- points -->
      ${t.points.map(e=>function(t,e,i){const{plot:o}=e,r=t.eval.temperature?.value,s=t.eval.humidity?.value;let n,a;if("x-axis"===t.pin&&void 0!==r)n=e.x(r),a=o.bottom-6;else if("y-axis"===t.pin&&void 0!==s)n=o.left+6,a=e.y(s);else{if(void 0===r||void 0===s)return K``;n=e.x(r),a=e.y(s)}const c=t.index===i.hoveredIndex,l=c?9:6;return K`<g class="ccc-point ${c?"is-hovered":""}"
    @pointerenter=${e=>"mouse"===e.pointerType&&i.onHover(t.index)}
    @pointerleave=${t=>"mouse"===t.pointerType&&i.onHover(null)}
    @click=${e=>{e.stopPropagation(),i.onSelect(t.index)}}
    @focus=${()=>i.onHover(t.index)}
    @blur=${()=>i.onHover(null)}
    tabindex="0" role="button">
    ${c?K`<circle cx=${n} cy=${a} r=${l+4} fill=${t.color} opacity="0.25" />`:W}
    <circle cx=${n} cy=${a} r=${l} fill=${t.color}
      stroke="var(--card-background-color, #fff)" stroke-width="1.5" />
  </g>`}(e,r,t))}
    </svg>
  `}const Qt=[{p:1,rgb:Xt("#0ca30c")},{p:.67,rgb:Xt("#fab219")},{p:.34,rgb:Xt("#ec835a")},{p:0,rgb:Xt("#d03b3b")}];function Yt(t){const e=Math.max(0,Math.min(1,t));for(let t=0;t<Qt.length-1;t++){const i=Qt[t],o=Qt[t+1];if(e<=i.p&&e>=o.p){const t=i.p-o.p||1,r=(e-o.p)/t;return te(re(o.rgb,i.rgb,r))}}return te(e>=Qt[0].p?Qt[0].rgb:Qt[Qt.length-1].rgb)}function Xt(t){const e=t.replace("#","");return[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)]}function te([t,e,i]){const o=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");return`#${o(t)}${o(e)}${o(i)}`}const ee=t=>{const e=t/255;return e<=.04045?e/12.92:((e+.055)/1.055)**2.4},ie=t=>255*(t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055);function oe([t,e,i]){const o=ee(t),r=ee(e),s=ee(i),n=Math.cbrt(.4122214708*o+.5363325363*r+.0514459929*s),a=Math.cbrt(.2119034982*o+.6806995451*r+.1073969566*s),c=Math.cbrt(.0883024619*o+.2817188376*r+.6299787005*s);return[.2104542553*n+.793617785*a-.0040720468*c,1.9779984951*n-2.428592205*a+.4505937099*c,.0259040371*n+.7827717662*a-.808675766*c]}function re(t,e,i){const o=oe(t),r=oe(e);return function([t,e,i]){const o=(t+.3963377774*e+.2158037573*i)**3,r=(t-.1055613458*e-.0638541728*i)**3,s=(t-.0894841775*e-1.291485548*i)**3;return[ie(4.0767416621*o-3.3077115913*r+.2309699292*s),ie(-1.2684380046*o+2.6097574011*r-.3413193965*s),ie(-.0041960863*o-.7034186147*r+1.707614701*s)]}([o[0]+(r[0]-o[0])*i,o[1]+(r[1]-o[1])*i,o[2]+(r[2]-o[2])*i])}const se={"card.name":"Climate Comfort Card","card.description":"Plot temperature/humidity for rooms on a shared comfort chart.","card.no_points":"No points configured yet. Add at least one location.","card.unavailable":"unavailable","legend.ungrouped":"Ungrouped","axis.temperature":"Temperature (°C)","axis.humidity":"Humidity (%)","status.comfortable":"Comfortable","status.too_cold":"Too cold","status.too_hot":"Too hot","status.too_dry":"Too dry","status.too_humid":"Too humid","status.bit_cold":"A bit cold","status.bit_warm":"A bit warm","status.bit_dry":"A bit dry","status.bit_humid":"A bit humid","status.too_muggy":"Too muggy","status.bit_muggy":"A bit muggy","status.reference":"Reference","label.dew_point":"Dew point","preset.general":"General","preset.living_room":"Living room","preset.bedroom":"Bedroom","preset.kitchen":"Kitchen","preset.bathroom":"Bathroom","preset.nursery":"Nursery","preset.office":"Office","preset.basement":"Basement","preset.garage":"Garage","preset.server_room":"Server room","editor.title":"Title","editor.default_preset":"Default preset","editor.zone_mode":"Comfort zones","editor.zone_mode.auto":"Auto","editor.zone_mode.average":"Averaged","editor.zone_mode.hidden":"Hidden","editor.show_legend":"Show legend","editor.mold_risk":"Show mold-risk hint","editor.mold_help":"Hatches the humid area where mold could form on cold walls. Based on air temperature only (surface is likely cooler), so treat it as a rough hint.","editor.trail":"History trail","editor.trail.all":"All points","editor.trail.hover":"On hover","editor.trail.off":"Off","editor.trail_hours":"Trail length (hours)","editor.zones":"Comfort zones","editor.zones.always":"Always","editor.zones.hover":"On hover","editor.zones.hidden":"Hidden","editor.points":"Points (rooms)","editor.point":"Point","editor.add_point":"Add point","editor.custom_presets":"Custom presets","editor.add_custom_preset":"Add custom preset","editor.preset_name":"Preset name","editor.point_name":"Name","editor.point_name_helper":"Overrides the entity name; leave blank to use it","editor.point_group":"Group (optional)","editor.temperature_entity":"Temperature entity","editor.humidity_entity":"Humidity entity","editor.point_preset":"Preset","editor.preset_custom":"Custom","editor.custom_advanced":"Advanced (dew point)","editor.custom_temp":"Temp. (°C)","editor.custom_hum":"Humidity (%)","editor.custom_dew":"Dew point (°C)","editor.pref_min":"pref. min","editor.pref_max":"pref. max","editor.acc_min":"acc. min","editor.acc_max":"acc. max","editor.include_in_scale":"Count toward axis scale","editor.reference":"Reference point (no comfort rating)","editor.use_default":"Use default","editor.remove":"Remove","editor.move_up":"Move up","editor.move_down":"Move down","editor.legend":"Legend"},ne={en:se,pl:{"card.name":"Karta Komfortu Klimatu","card.description":"Nanieś temperaturę/wilgotność pokoi na wspólny wykres komfortu.","card.no_points":"Brak skonfigurowanych punktów. Dodaj co najmniej jedną lokalizację.","card.unavailable":"niedostępny","legend.ungrouped":"Bez grupy","axis.temperature":"Temperatura (°C)","axis.humidity":"Wilgotność (%)","status.comfortable":"Komfortowo","status.too_cold":"Za zimno","status.too_hot":"Za ciepło","status.too_dry":"Za sucho","status.too_humid":"Za wilgotno","status.bit_cold":"Nieco zimno","status.bit_warm":"Nieco ciepło","status.bit_dry":"Nieco sucho","status.bit_humid":"Nieco wilgotno","status.too_muggy":"Zbyt parno","status.bit_muggy":"Nieco parno","status.reference":"Punkt odniesienia","label.dew_point":"Punkt rosy","preset.general":"Ogólny","preset.living_room":"Salon","preset.bedroom":"Sypialnia","preset.kitchen":"Kuchnia","preset.bathroom":"Łazienka","preset.nursery":"Pokój dziecięcy","preset.office":"Gabinet","preset.basement":"Piwnica","preset.garage":"Garaż","preset.server_room":"Serwerownia","editor.title":"Tytuł","editor.default_preset":"Domyślny preset","editor.zone_mode":"Strefy komfortu","editor.zone_mode.auto":"Automatyczne","editor.zone_mode.average":"Uśrednione","editor.zone_mode.hidden":"Ukryte","editor.show_legend":"Pokaż legendę","editor.mold_risk":"Podpowiedź ryzyka pleśni","editor.mold_help":"Kreskuje wilgotny obszar, gdzie na chłodnych ścianach może tworzyć się pleśń. Liczone tylko z temperatury powietrza (powierzchnia bywa chłodniejsza), więc traktuj to orientacyjnie.","editor.trail":"Ślad w czasie","editor.trail.all":"Wszystkie punkty","editor.trail.hover":"Przy najechaniu","editor.trail.off":"Wyłączony","editor.trail_hours":"Długość śladu (godziny)","editor.zones":"Strefy komfortu","editor.zones.always":"Zawsze","editor.zones.hover":"Przy najechaniu","editor.zones.hidden":"Ukryte","editor.points":"Punkty (pokoje)","editor.point":"Punkt","editor.add_point":"Dodaj punkt","editor.custom_presets":"Własne presety","editor.add_custom_preset":"Dodaj własny preset","editor.preset_name":"Nazwa presetu","editor.point_name":"Nazwa","editor.point_name_helper":"Nadpisuje nazwę encji; zostaw puste, aby jej użyć","editor.point_group":"Grupa (opcjonalnie)","editor.temperature_entity":"Encja temperatury","editor.humidity_entity":"Encja wilgotności","editor.point_preset":"Preset","editor.preset_custom":"Własne","editor.custom_advanced":"Zaawansowane (punkt rosy)","editor.custom_temp":"Temp. (°C)","editor.custom_hum":"Wilgotność (%)","editor.custom_dew":"Punkt rosy (°C)","editor.pref_min":"pref. od","editor.pref_max":"pref. do","editor.acc_min":"akc. od","editor.acc_max":"akc. do","editor.include_in_scale":"Uwzględniaj w skali osi","editor.reference":"Punkt odniesienia (bez oceny komfortu)","editor.use_default":"Użyj domyślnego","editor.remove":"Usuń","editor.move_up":"Przesuń w górę","editor.move_down":"Przesuń w dół","editor.legend":"Legenda"}};function ae(t,e){const i=(e??"en").split("-")[0].toLowerCase();return ne[i]?.[t]??se[t]??t}var ce,le;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ce||(ce={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(le||(le={}));const de=[{id:"always",icon:"mdi:eye"},{id:"hover",icon:"mdi:gesture-tap"},{id:"hidden",icon:"mdi:eye-off"}],he=[{id:"all",icon:"mdi:vector-polyline"},{id:"hover",icon:"mdi:gesture-tap"},{id:"off",icon:"mdi:close"}],pe="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";let ue=class extends lt{constructor(){super(...arguments),this._expanded=null,this._expandedPreset=null}setConfig(t){this._config={...t,points:t.points??[]}}get _lang(){return this.hass?.language??"en"}_t(t){return ae(t,this._lang)}_emit(t){this._config=t,function(t,e,i,o){o=o||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});r.detail=i,t.dispatchEvent(r)}(this,"config-changed",{config:t})}_updateRoot(t){this._config&&this._emit({...this._config,...t})}_updatePoint(t,e){if(!this._config)return;const i=this._config.points.map((i,o)=>o===t?{...i,...e}:i);this._emit({...this._config,points:i})}_addPoint(){if(!this._config)return;const t=[...this._config.points,{}];this._expanded=t.length-1,this._emit({...this._config,points:t})}_removePoint(t){if(!this._config)return;const e=this._config.points.filter((e,i)=>i!==t);this._expanded===t?this._expanded=null:null!==this._expanded&&this._expanded>t&&(this._expanded-=1),this._emit({...this._config,points:e})}_movePoint(t,e){if(!this._config)return;const i=t+e;if(i<0||i>=this._config.points.length)return;const o=[...this._config.points];[o[t],o[i]]=[o[i],o[t]],this._expanded===t?this._expanded=i:this._expanded===i&&(this._expanded=t),this._emit({...this._config,points:o})}get _customPresets(){return this._config?.custom_presets??[]}_addCustomPreset(){if(!this._config)return;const t=new Set(this._customPresets.map(t=>t.name));let e=this._customPresets.length+1,i=`Preset ${e}`;for(;t.has(i);)i="Preset "+ ++e;const o=kt("general"),r={name:i,temperature:{preferred:{...o.temperature.preferred},acceptable:{...o.temperature.acceptable}},humidity:{preferred:{...o.humidity.preferred},acceptable:{...o.humidity.acceptable}}};this._expandedPreset=this._customPresets.length,this._updateRoot({custom_presets:[...this._customPresets,r]})}_removeCustomPreset(t){this._expandedPreset===t?this._expandedPreset=null:null!==this._expandedPreset&&this._expandedPreset>t&&(this._expandedPreset-=1),this._updateRoot({custom_presets:this._customPresets.filter((e,i)=>i!==t)})}_renameCustomPreset(t,e){if(!this._config)return;const i=this._customPresets[t]?.name,o=this._customPresets.map((i,o)=>o===t?{...i,name:e}:i),r=this._config.points.map(t=>t.preset===i?{...t,preset:e}:t),s=this._config.preset===i?e:this._config.preset;this._emit({...this._config,custom_presets:o,points:r,preset:s})}_updateCustomPresetProfile(t,e){const i=this._customPresets.map((i,o)=>o===t?{name:i.name,temperature:e.temperature,humidity:e.humidity,dewPoint:e.dewPoint}:i);this._updateRoot({custom_presets:i})}_presetOptions(){return[...At.map(t=>({id:t.id,label:this._t(t.labelKey),icon:t.icon})),...this._customPresets.filter(t=>t.name).map(t=>({id:t.name,label:t.name,icon:"mdi:tune-variant"}))]}_button(t,e){return G`<ha-button class="ccc-add" raised @click=${e}>${t}</ha-button>`}_renderRangeHint(t){const e=[],i=t.temperature?.acceptable,o=t.humidity?.acceptable;return i&&e.push(`🌡 ${i.min}–${i.max} °C`),o&&e.push(`💧 ${o.min}–${o.max} %`),0===e.length?W:G`<div class="ccc-range-hint">${e.join("   ·   ")}</div>`}_renderBandGrid(t,e){const i=!!t.dewPoint;return G`
      ${this._bandForm(t,"temperature","editor.custom_temp",e)}
      ${this._bandForm(t,"humidity","editor.custom_hum",e)}
      ${i?this._bandForm(t,"dewPoint","editor.custom_dew",e):W}
      ${this._toggle(this._t("editor.custom_advanced"),i,i=>{const o=JSON.parse(JSON.stringify(t));i?o.dewPoint={preferred:{...bt.preferred},acceptable:{...bt.acceptable}}:delete o.dewPoint,e(o)})}
    `}_bandForm(t,e,i,o){const r=t[e]??{preferred:{min:0,max:0},acceptable:{min:0,max:0}},s={pmin:r.preferred.min,pmax:r.preferred.max,amin:r.acceptable.min,amax:r.acceptable.max},n={number:{mode:"box"}},a=[{name:e,type:"grid",schema:[{name:"pmin",selector:n},{name:"pmax",selector:n},{name:"amin",selector:n},{name:"amax",selector:n}]}],c={pmin:this._t("editor.pref_min"),pmax:this._t("editor.pref_max"),amin:this._t("editor.acc_min"),amax:this._t("editor.acc_max")};return G`
      <div class="ccc-band-label">${this._t(i)}</div>
      <ha-form
        .hass=${this.hass}
        .data=${s}
        .schema=${a}
        .computeLabel=${t=>c[t.name]??""}
        @value-changed=${i=>{const r=i.detail.value,s=JSON.parse(JSON.stringify(t));s[e]={preferred:{min:Number(r.pmin),max:Number(r.pmax)},acceptable:{min:Number(r.amin),max:Number(r.amax)}},o(s)}}
      ></ha-form>
    `}_toggle(t,e,i,o){return this._formField({name:"v",selector:{boolean:{}},label:t,value:e,helper:o,onChange:t=>i(!!t)})}_formField(t){return G`<ha-form
      .hass=${this.hass}
      .data=${{[t.name]:t.value}}
      .schema=${[{name:t.name,selector:t.selector}]}
      .computeLabel=${()=>t.label}
      .computeHelper=${()=>t.helper??""}
      @value-changed=${e=>t.onChange(e.detail.value[t.name])}
    ></ha-form>`}_textField(t){return this._formField({name:"v",selector:{text:{}},label:t.label,value:t.value,helper:t.helper,onChange:e=>t.onInput(e??"")})}_select(t){return this._formField({name:"v",selector:{select:{mode:"dropdown",options:t.options}},label:t.label,value:t.value,helper:t.helper,onChange:e=>t.onChange(e??"")})}_defaultName(t){const e=t.temperature||t.humidity;return e&&this.hass?.states[e]?this.hass.states[e].attributes.friendly_name??e:e??""}render(){return this._config&&this.hass?G`
      <div class="ccc-editor">
        ${this._textField({label:this._t("editor.title"),value:this._config.title??"",onInput:t=>this._updateRoot({title:t||void 0})})}

        ${this._select({label:this._t("editor.default_preset"),value:this._config.preset??"",options:this._presetOptions().map(t=>({value:t.id,label:t.label})),onChange:t=>this._updateRoot({preset:t||void 0})})}

        ${this._renderCustomPresets()}

        ${this._select({label:this._t("editor.zones"),value:this._config.zone_display??"always",options:de.map(t=>({value:t.id,label:this._t(`editor.zones.${t.id}`)})),onChange:t=>this._updateRoot({zone_display:t})})}

        ${this._select({label:this._t("editor.trail"),value:this._config.trail_display??"hover",options:he.map(t=>({value:t.id,label:this._t(`editor.trail.${t.id}`)})),onChange:t=>this._updateRoot({trail_display:t})})}

        ${"off"!==(this._config.trail_display??"hover")?this._formField({name:"hours",selector:{number:{min:1,max:240,mode:"box"}},label:this._t("editor.trail_hours"),value:this._config.trail_hours??24,onChange:t=>{const e=Number(t);this._updateRoot({trail_hours:Number.isFinite(e)&&e>0?e:void 0})}}):W}

        ${this._toggle(this._t("editor.show_legend"),!1!==this._config.show_legend,t=>this._updateRoot({show_legend:t}))}
        ${this._toggle(this._t("editor.mold_risk"),!1!==this._config.mold_risk,t=>this._updateRoot({mold_risk:t}),this._t("editor.mold_help"))}

        <div class="ccc-section-title">${this._t("editor.points")}</div>
        ${this._config.points.map((t,e)=>this._renderPointEditor(t,e))}

        ${this._button(this._t("editor.add_point"),()=>this._addPoint())}
      </div>
    `:W}_renderCustomPresets(){return G`
      <div class="ccc-section-title">${this._t("editor.custom_presets")}</div>
      ${this._customPresets.map((t,e)=>this._renderPresetAccordion(t,e))}
      ${this._button(this._t("editor.add_custom_preset"),()=>this._addCustomPreset())}
    `}_renderPresetAccordion(t,e){const i=t.name||`Preset ${e+1}`;return G`
      <ha-expansion-panel
        .outlined=${!0}
        .leftChevron=${!0}
        .expanded=${this._expandedPreset===e}
        @expanded-changed=${t=>this._expandedPreset=t.detail.expanded?e:null}
      >
        <div slot="header" class="ccc-head">
          <span class="ccc-head-title">${i}</span>
          <div class="ccc-head-tools" @click=${t=>t.stopPropagation()}>
            <ha-icon-button
              .path=${pe}
              title=${this._t("editor.remove")}
              @click=${()=>this._removeCustomPreset(e)}
            ></ha-icon-button>
          </div>
        </div>
        <div class="ccc-body">
          ${this._textField({label:this._t("editor.preset_name"),value:t.name,onInput:t=>this._renameCustomPreset(e,t)})}
          ${this._renderBandGrid({temperature:t.temperature,humidity:t.humidity,dewPoint:t.dewPoint},t=>this._updateCustomPresetProfile(e,t))}
        </div>
      </ha-expansion-panel>
    `}_renderPointEditor(t,e){const i=t.name||this._defaultName(t)||`${this._t("editor.point")} ${e+1}`,o=this._config.points.length-1;return G`
      <ha-expansion-panel
        .outlined=${!0}
        .leftChevron=${!0}
        .expanded=${this._expanded===e}
        @expanded-changed=${t=>this._expanded=t.detail.expanded?e:null}
      >
        <div slot="header" class="ccc-head">
          <span class="ccc-head-title">${i}</span>
          <div class="ccc-head-tools" @click=${t=>t.stopPropagation()}>
            <ha-icon-button
              .path=${"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"}
              .disabled=${0===e}
              title=${this._t("editor.move_up")}
              @click=${()=>this._movePoint(e,-1)}
            ></ha-icon-button>
            <ha-icon-button
              .path=${"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}
              .disabled=${e===o}
              title=${this._t("editor.move_down")}
              @click=${()=>this._movePoint(e,1)}
            ></ha-icon-button>
            <ha-icon-button
              .path=${pe}
              title=${this._t("editor.remove")}
              @click=${()=>this._removePoint(e)}
            ></ha-icon-button>
          </div>
        </div>
        ${this._renderPointBody(t,e)}
      </ha-expansion-panel>
    `}_renderPointBody(t,e){return G`
      <div class="ccc-body">
        ${this._textField({label:this._t("editor.point_name"),value:t.name??"",helper:this._defaultName(t)?`${this._t("editor.point_name_helper")} (${this._defaultName(t)})`:this._t("editor.point_name_helper"),onInput:t=>this._updatePoint(e,{name:t||void 0})})}
        ${this._textField({label:this._t("editor.point_group"),value:t.group??"",onInput:t=>this._updatePoint(e,{group:t||void 0})})}

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

        ${t.reference?W:G`
              ${this._select({label:this._t("editor.point_preset"),value:t.comfort?"":t.preset??"",options:[{value:"",label:this._t("editor.use_default")},...this._presetOptions().map(t=>({value:t.id,label:t.label}))],onChange:t=>this._updatePoint(e,{preset:t||void 0,comfort:void 0})})}
              ${this._renderRangeHint(Mt(t,this._config))}
            `}

        ${this._toggle(this._t("editor.include_in_scale"),!1!==t.include_in_scale,t=>this._updatePoint(e,{include_in_scale:!!t&&void 0}))}
        ${this._toggle(this._t("editor.reference"),!!t.reference,t=>this._updatePoint(e,{reference:t||void 0}))}
      </div>
    `}};ue.styles=n`
    .ccc-editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    ha-entity-picker,
    ha-form {
      display: block;
      width: 100%;
    }
    ha-button.ccc-add {
      align-self: flex-start;
      margin-top: 4px;
    }
    .ccc-section-title {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
      margin: 8px 0 2px;
      padding-top: 14px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
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
    .ccc-head {
      display: flex;
      align-items: center;
      gap: 6px;
      width: 100%;
    }
    .ccc-head-title {
      flex: 1;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ccc-head-tools {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
    }
    .ccc-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-bottom: 4px;
    }
    .ccc-band-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color, #888);
      margin-top: 4px;
    }
    .ccc-range-hint {
      font-size: 12px;
      color: var(--secondary-text-color, #888);
    }
  `,t([mt({attribute:!1})],ue.prototype,"hass",void 0),t([_t()],ue.prototype,"_config",void 0),t([_t()],ue.prototype,"_expanded",void 0),t([_t()],ue.prototype,"_expandedPreset",void 0),ue=t([ht("climate-comfort-card-editor")],ue),console.info("%c CLIMATE-COMFORT-CARD %c v0.3.0-beta.13 ","color: white; background: #2e9e5b; font-weight: 700;","color: #2e9e5b; background: white; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:ft,name:ae("card.name"),description:ae("card.description"),preview:!0});const me="__ungrouped__";function _e(t){if(!Array.isArray(t))return[];const e=[];for(const i of t){const t=i.s??i.state,o=Number(t),r=i.lu??i.last_updated;Number.isFinite(o)&&void 0!==r&&e.push({ms:1e3*r,v:o})}return e}let fe=class extends lt{constructor(){super(...arguments),this._hovered=null,this._hidden=new Set,this._hoveredGroup=null,this._trails={},this._trailCache=new Map,this._trailInflight=new Set}static async getConfigElement(){return document.createElement(`${ft}-editor`)}static getStubConfig(){return{type:`custom:${ft}`,title:"Comfort",preset:"living_room",points:[]}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={zone_mode:"auto",zone_display:"always",show_legend:!0,mold_risk:!0,trail_display:"hover",trail_hours:24,...t,points:t.points??[]},this._trails={},this._trailCache.clear(),this._hidden=new Set,this._hoveredGroup=null}getCardSize(){return 6}get _lang(){return this.hass?.language??"en"}_t(t){return ae(t,this._lang)}_resolvePoints(){return this._config&&this.hass?this._config.points.map(t=>{const e=Mt(t,this._config),i=t.temperature?Lt(this.hass.states[t.temperature]?.state):void 0,o=t.humidity?Lt(this.hass.states[t.humidity]?.state):void 0,r=Dt({name:t.name||this._entityFallbackName(t),profile:e,temperature:i,humidity:o}),s=!!t.reference;return{config:t,profile:e,evaluation:r,color:t.color??(r.unavailable?"var(--disabled-text-color, #9e9e9e)":s?wt:Yt(r.score)),reference:s}}):[]}_entityFallbackName(t){const e=t.temperature||t.humidity;return e&&this.hass?.states[e]?this.hass.states[e].attributes.friendly_name??e:e??"-"}_overallLabel(t,e=!1){if(t.unavailable)return this._t("card.unavailable");if(e)return this._t("status.reference");const i=[];for(const e of[t.temperature,t.humidity,t.dewPoint])if(e&&"comfortable"!==e.status){const t=this._t(Bt(e));i.includes(t)||i.push(t)}return i.length?i.join(", "):this._t("status.comfortable")}get _trailHours(){return this._config?.trail_hours??24}get _prefersReducedMotion(){return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1}_neededTrailIndices(t){const e=this._config?.trail_display??"hover";if("off"===e)return[];const i=t=>{const e=this._config.points[t];return!(!e?.temperature||!e?.humidity||this._hidden.has(t))};return"all"===e?t.map((t,e)=>e).filter(i):null!==this._hovered&&i(this._hovered)?[this._hovered]:[]}_ensureTrails(t){const e=this._trailHours;for(const i of t){const t=`${i}|${e}`;if(this._trails[i]||this._trailInflight.has(t))continue;const o=this._trailCache.get(t);o&&Date.now()-o.at<12e4?this._trails={...this._trails,[i]:o.points}:this._loadTrail(i,e,t)}}async _loadTrail(t,e,i){const o=this._config?.points[t];if(!o?.temperature||!o.humidity||!this.hass)return;this._trailInflight.add(i);const r=new Date,s=new Date(r.getTime()-36e5*e);try{const e=await this.hass.callWS({type:"history/history_during_period",start_time:s.toISOString(),end_time:r.toISOString(),entity_ids:[o.temperature,o.humidity],minimal_response:!0,no_attributes:!0}),n=function(t,e,i,o,r,s){const n=(o-i)/40,a=[];let c,l,d=0,h=0;for(let o=0;o<=40;o++){const p=i+n*o;for(;d<t.length&&t[d].ms<=p;)c=t[d++].v;for(;h<e.length&&e[h].ms<=p;)l=e[h++].v;if(void 0===c||void 0===l)continue;const u=a[a.length-1];if(u&&u.t===c&&u.h===l)continue;const m=s?wt:Yt(Dt({name:"",profile:r,temperature:c,humidity:l}).score);a.push({t:c,h:l,color:m})}return a}(_e(e[o.temperature]),_e(e[o.humidity]),s.getTime(),r.getTime(),Mt(o,this._config),!!o.reference);this._trailCache.set(i,{points:n,at:Date.now()}),this._trails={...this._trails,[t]:n}}catch{}finally{this._trailInflight.delete(i)}}shouldUpdate(t){if(t.has("_config")||t.has("_hovered")||t.has("_trails")||t.has("_hidden")||t.has("_hoveredGroup"))return!0;if(!this._config)return!1;const e=t.get("hass");return!e||this._config.points.some(t=>[t.temperature,t.humidity].some(t=>t&&e.states[t]!==this.hass.states[t]))}render(){if(!this._config||!this.hass)return W;const t=this._resolvePoints(),{tempAxis:e,humAxis:i}=this._computeAxes(t),o=t.map((t,e)=>{const{evaluation:i}=t;if(i.unavailable||this._hidden.has(e))return null;const o=void 0!==i.temperature,r=void 0!==i.humidity,s=o&&r?"none":o?"x-axis":"y-axis";return{index:e,eval:i,color:t.color,pin:s}}).filter(t=>null!==t),r=null!==this._hovered?t[this._hovered]:void 0,s=this._zones(t,r),n=this._neededTrailIndices(t);this._ensureTrails(n);const a=n.filter(t=>this._trails[t]?.length>1).map(e=>({points:this._trails[e],color:t[e].color}));return G`
      <ha-card .header=${this._config.title}>
        <div class="ccc-body">
          <div class="ccc-chart-wrap">
            ${Jt({layout:Kt,tempAxis:e,humAxis:i,points:o,zone:s.zone,zoneFaint:s.faint,highlightZone:s.highlightZone,trails:a,animateTrails:!this._prefersReducedMotion,groupHull:this._groupHull(t),hoveredIndex:this._hovered,labels:{x:this._t("axis.temperature"),y:this._t("axis.humidity")},moldRisk:!1!==this._config.mold_risk,onHover:t=>this._hovered=t,onSelect:t=>this._hovered=t,onClear:()=>this._hovered=null})}
            ${r?this._renderTooltip(r):W}
          </div>
          ${0===t.length?G`<div class="ccc-empty">${this._t("card.no_points")}</div>`:this._config.show_legend?this._renderLegend(t):W}
        </div>
      </ha-card>
    `}_computeAxes(t){const e=[],i=[];return t.forEach((t,o)=>{t.evaluation.unavailable||!1===t.config.include_in_scale||this._hidden.has(o)||(t.evaluation.temperature&&e.push(t.evaluation.temperature.value),t.evaluation.humidity&&i.push(t.evaluation.humidity.value))}),{tempAxis:this._config.temperature_axis??this._autoRange(e,$t,gt),humAxis:this._config.humidity_axis??this._autoRange(i,vt,yt,0,100)}}_autoRange(t,e,i,o=-1/0,r=1/0){if(0===t.length)return i;const s=Math.min(...t),n=Math.max(...t),a=Math.min(e.max,Math.max(e.min,.5*(n-s)));return{min:Math.max(o,s-a),max:Math.min(r,n+a)}}_zones(t,e){const i=this._config?.zone_display??"always";if("hidden"===this._config?.zone_mode||"hidden"===i)return{faint:!1};let o;if(e&&!e.evaluation.unavailable){const t=e.profile;(t.temperature||t.humidity)&&(o=t)}if("hover"===i)return{faint:!1,highlightZone:o};const r=t.filter((t,e)=>!t.evaluation.unavailable&&!this._hidden.has(e)&&!t.reference).map(t=>t.profile).filter(t=>t.temperature||t.humidity),s=r.length?function(t){if(0===t.length)return;const e=t.map(t=>t.temperature?.preferred).filter(It),i=t.map(t=>t.temperature?.acceptable).filter(It),o=t.map(t=>t.humidity?.preferred).filter(It),r=t.map(t=>t.humidity?.acceptable).filter(It),s=t=>JSON.stringify(t),n=t.every(e=>s(e)===s(t[0])),a={sources:t.length,uniform:n},c=Ft(e),l=Ft(i);c&&l&&(a.temperature={preferred:c,acceptable:l});const d=Ft(o),h=Ft(r);d&&h&&(a.humidity={preferred:d,acceptable:h});const p=Ft(t.map(t=>t.dewPoint?.preferred).filter(It)),u=Ft(t.map(t=>t.dewPoint?.acceptable).filter(It));return p&&u&&(a.dewPoint={preferred:p,acceptable:u}),a}(r):void 0;return{zone:s,faint:!!s&&"average"!==this._config?.zone_mode&&!s.uniform,highlightZone:o}}_renderTooltip(t){const{evaluation:e,reference:i}=t,o=(e,o,r)=>e?G`<div class="ccc-tt-row">
        <span
          class="ccc-swatch"
          style=${`background:${i?t.color:Yt(e.score)}`}
        ></span>
        <span
          >${r?G`<span class="ccc-tt-dim">${r}</span> `:W}${e.value}${o}</span
        >
        ${i?W:G`<span class="ccc-tt-status">${this._t(Bt(e))}</span>`}
      </div>`:W;return G`<div class="ccc-tooltip">
      <div class="ccc-tt-name">
        ${e.name}${i?G`<span class="ccc-tt-ref">${this._t("status.reference")}</span>`:W}
      </div>
      ${o(e.temperature,"°C")}
      ${o(e.humidity,"%")}
      ${o(e.dewPoint,"°C",this._t("label.dew_point"))}
    </div>`}_groupHull(t){if(null===this._hoveredGroup)return;const e=[];return t.forEach((t,i)=>{if((t.config.group??me)!==this._hoveredGroup||this._hidden.has(i))return;const o=t.evaluation.temperature?.value,r=t.evaluation.humidity?.value;void 0!==o&&void 0!==r&&e.push({t:o,h:r})}),e.length?e:void 0}_toggleHidden(t){const e=new Set(this._hidden);e.has(t)?e.delete(t):e.add(t),this._hidden=e}_toggleGroup(t){const e=t.some(t=>!this._hidden.has(t)),i=new Set(this._hidden);for(const o of t)e?i.add(o):i.delete(o);this._hidden=i}_renderBadge(t,e){const i=this._hidden.has(e),o=this._overallLabel(t.evaluation,t.reference),r=null!==this._hoveredGroup&&(t.config.group??me)===this._hoveredGroup;return G`<button
      type="button"
      class="ccc-badge ${this._hovered===e?"is-hovered":""} ${r?"is-grouphover":""} ${i?"is-off":""} ${t.evaluation.unavailable?"is-unavailable":""}"
      title=${`${t.evaluation.name} - ${o}`}
      @pointerenter=${t=>"mouse"===t.pointerType&&(this._hovered=e)}
      @pointerleave=${t=>"mouse"===t.pointerType&&(this._hovered=null)}
      @focus=${()=>this._hovered=e}
      @blur=${()=>this._hovered=null}
      @click=${()=>this._toggleHidden(e)}
    >
      <span
        class="ccc-swatch"
        style=${`background:${i?"var(--disabled-text-color, #9e9e9e)":t.color}`}
      ></span>
      <span class="ccc-badge-name">${t.evaluation.name}</span>
    </button>`}_renderLegend(t){if(!t.some(t=>t.config.group))return G`<div class="ccc-legend">
        ${t.map((t,e)=>this._renderBadge(t,e))}
      </div>`;const e=[],i=new Map;return t.forEach((t,o)=>{const r=t.config.group;i.has(r)||(i.set(r,[]),e.push(r)),i.get(r).push(o)}),G`<div class="ccc-legend">
      ${e.flatMap(e=>{const o=i.get(e),r=o.filter(t=>!this._hidden.has(t)).length;return[G`<button
            type="button"
            class="ccc-group-head ${0===r?"is-off":""}"
            @click=${()=>this._toggleGroup(o)}
            @pointerenter=${t=>"mouse"===t.pointerType&&(this._hoveredGroup=e??me)}
            @pointerleave=${t=>"mouse"===t.pointerType&&(this._hoveredGroup=null)}
          >
            <span class="ccc-group-name">${e??this._t("legend.ungrouped")}</span>
            <span class="ccc-group-count">${r}/${o.length}</span>
          </button>`,...o.map(e=>this._renderBadge(t[e],e))]})}
    </div>`}};fe.styles=n`
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
    .ccc-playhead {
      animation-name: ccc-run;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      will-change: offset-distance;
    }
    @keyframes ccc-run {
      from {
        offset-distance: 0%;
      }
      to {
        offset-distance: 100%;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .ccc-playhead {
        display: none;
      }
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
    .ccc-tt-dim {
      color: var(--secondary-text-color, #888);
    }
    .ccc-tt-ref {
      margin-left: 6px;
      font-weight: 400;
      font-size: 10.5px;
      color: var(--ccc-reference-color, #7c8b99);
    }
    .ccc-legend {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
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
    .ccc-badge.is-grouphover {
      background: var(--secondary-background-color, #f0f0f0);
      border-color: var(--primary-color, #03a9f4);
    }
    .ccc-badge.is-off {
      opacity: 0.45;
    }
    .ccc-badge.is-off .ccc-badge-name {
      text-decoration: line-through;
    }
    .ccc-group-head {
      display: inline-flex;
      align-items: baseline;
      gap: 5px;
      margin-left: 4px;
      padding: 2px 2px;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color, #888);
      font: inherit;
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .ccc-group-head:first-child {
      margin-left: 0;
    }
    .ccc-group-head:hover {
      color: var(--primary-text-color, #333);
    }
    .ccc-group-head.is-off {
      opacity: 0.5;
    }
    .ccc-group-count {
      font-weight: 500;
      letter-spacing: 0;
      opacity: 0.8;
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
  `,t([mt({attribute:!1})],fe.prototype,"hass",void 0),t([_t()],fe.prototype,"_config",void 0),t([_t()],fe.prototype,"_hovered",void 0),t([_t()],fe.prototype,"_hidden",void 0),t([_t()],fe.prototype,"_hoveredGroup",void 0),t([_t()],fe.prototype,"_trails",void 0),fe=t([ht(ft)],fe);export{fe as ClimateComfortCard};
