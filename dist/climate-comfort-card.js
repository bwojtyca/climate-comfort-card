function t(t,e,i,o){var r,s=arguments.length,n=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(s<3?r(n):s>3?r(e,i,n):r(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),r=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new s(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,f=m.trustedTypes,_=f?f.emptyScript:"",g=m.reactiveElementPolyfillSupport,$=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&l(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const s=o?.call(this);r?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),r=e.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=o;const s=r.fromAttribute(e,t.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(t,e,i,o=!1,r){if(void 0!==t){const s=this.constructor;if(!1===o&&(r=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:r},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==r||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,g?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,E=w.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,z=`<${P}>`,H=document,U=()=>H.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,M="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,j=/>/g,L=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,B=/"/g,I=/^(?:script|style|textarea|title)$/i,K=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=K(1),W=K(2),Z=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),F=new WeakMap,J=H.createTreeWalker(H,129);function G(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,o=[];let r,s=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===N?"!--"===c[1]?n=R:void 0!==c[1]?n=j:void 0!==c[2]?(I.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=L):void 0!==c[3]&&(n=L):n===L?">"===c[0]?(n=r??N,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?L:'"'===c[3]?B:D):n===B||n===D?n=L:n===R||n===j?n=N:(n=L,r=void 0);const h=n===L&&t[e+1].startsWith("/>")?" ":"";s+=n===N?i+z:l>=0?(o.push(a),i.slice(0,l)+k+i.slice(l)+C+h):i+C+(-2===l?e:h)}return[G(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Q{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,s=0;const n=t.length-1,a=this.parts,[c,l]=Y(t,e);if(this.el=Q.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=J.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(k)){const e=l[s++],i=o.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?ot:"?"===n[1]?rt:"@"===n[1]?st:it}),o.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),o.removeAttribute(t));if(I.test(o.tagName)){const t=o.textContent.split(C),e=t.length-1;if(e>0){o.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],U()),J.nextNode(),a.push({type:2,index:++r});o.append(t[e],U())}}}else if(8===o.nodeType)if(o.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=H.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,o){if(e===Z)return e;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const s=O(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(t),r._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??H).importNode(e,!0);J.currentNode=o;let r=J.nextNode(),s=0,n=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new et(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new nt(r,this,t)),this._$AV.push(e),a=i[++n]}s!==a?.index&&(r=J.nextNode(),s++)}return J.currentNode=H,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==Z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Q(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new et(this.O(U()),this.O(U()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,o){const r=this.strings;let s=!1;if(void 0===r)t=X(this,t,e,0),s=!O(t)||t!==this._$AH&&t!==Z,s&&(this._$AH=t);else{const o=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=X(this,o[i+n],e,n),a===Z&&(a=this._$AH[n]),s||=!O(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}s&&!o&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends it{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===Z)return;const i=this._$AH,o=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==q&&(i===q||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(Q,et),(w.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;class lt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let r=o._$litPart$;if(void 0===r){const t=i?.renderBefore??null;o._$litPart$=r=new et(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}}lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const dt=ct.litElementPolyfillSupport;dt?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},ut=(t=pt,e,i)=>{const{kind:o,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,r,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];e.call(this,i),this.requestUpdate(o,r,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function mt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ft(t){return mt({...t,state:!0,attribute:!1})}const _t="climate-comfort-card",gt={min:10,max:32},$t={min:20,max:90},yt={good:"var(--ccc-good-color, #2e9e5b)",warn:"var(--ccc-warn-color, #e0a400)",bad:"var(--ccc-bad-color, #e5484d)"},vt=[{id:"living_room",labelKey:"preset.living_room",icon:"mdi:sofa",profile:{temperature:{preferred:{min:20,max:23},acceptable:{min:18,max:25}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"bedroom",labelKey:"preset.bedroom",icon:"mdi:bed",profile:{temperature:{preferred:{min:16,max:19},acceptable:{min:15,max:21}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"kitchen",labelKey:"preset.kitchen",icon:"mdi:stove",profile:{temperature:{preferred:{min:18,max:22},acceptable:{min:17,max:24}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"bathroom",labelKey:"preset.bathroom",icon:"mdi:shower",profile:{temperature:{preferred:{min:22,max:24},acceptable:{min:20,max:26}},humidity:{preferred:{min:50,max:70},acceptable:{min:40,max:75}}}},{id:"nursery",labelKey:"preset.nursery",icon:"mdi:baby-carriage",profile:{temperature:{preferred:{min:20,max:22},acceptable:{min:19,max:23}},humidity:{preferred:{min:45,max:60},acceptable:{min:40,max:65}}}},{id:"office",labelKey:"preset.office",icon:"mdi:desk",profile:{temperature:{preferred:{min:20,max:23},acceptable:{min:19,max:25}},humidity:{preferred:{min:40,max:60},acceptable:{min:30,max:65}}}},{id:"basement",labelKey:"preset.basement",icon:"mdi:home-floor-negative-1",profile:{temperature:{preferred:{min:12,max:16},acceptable:{min:8,max:18}},humidity:{preferred:{min:50,max:65},acceptable:{min:40,max:70}}}},{id:"server_room",labelKey:"preset.server_room",icon:"mdi:server",profile:{temperature:{preferred:{min:18,max:24},acceptable:{min:15,max:27}},humidity:{preferred:{min:40,max:55},acceptable:{min:30,max:60}}}}],bt=new Map(vt.map(t=>[t.id,t]));function xt(t){return function(t){return t?bt.get(t):void 0}(t)?.profile}const wt={good:0,warn:1,bad:2};function At(t,e){return wt[t]>=wt[e]?t:e}function Et(t,e){return t.comfort?t.comfort:xt(t.preset)??xt(e)??xt("living_room")??{}}function St(t,e,i){const{preferred:o,acceptable:r}=i;let s,n;return e>=o.min&&e<=o.max?(s="comfortable",n="good"):e<r.min?(s="too_low",n="bad"):e>r.max?(s="too_high",n="bad"):e<o.min?(s="bit_low",n="warn"):(s="bit_high",n="warn"),{dimension:t,value:e,status:s,severity:n}}function kt(t){if(void 0===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Ct(t){if(0===t.length)return;const e=t.reduce((t,e)=>({min:t.min+e.min,max:t.max+e.max}),{min:0,max:0});return{min:e.min/t.length,max:e.max/t.length}}function Pt(t){return void 0!==t}function zt(t){if("comfortable"===t.status)return"status.comfortable";const e="temperature"===t.dimension;switch(t.status){case"too_low":return e?"status.too_cold":"status.too_dry";case"too_high":return e?"status.too_hot":"status.too_humid";case"bit_low":return e?"status.bit_cold":"status.bit_dry";case"bit_high":return e?"status.bit_warm":"status.bit_humid"}}const Ht={width:400,height:320,margin:{top:14,right:16,bottom:40,left:46}};function Ut(t,e){const i=(t.max-t.min)/e,o=[];for(let r=0;r<=e;r++)o.push(Math.round(t.min+i*r));return o}function Ot(t){const{layout:e,tempAxis:i,humAxis:o}=t,r=function(t,e,i){const o=t.margin.left,r=t.width-t.margin.right,s=t.margin.top,n=t.height-t.margin.bottom,a=(t,e,i)=>Math.max(e,Math.min(i,t));return{plot:{left:o,right:r,top:s,bottom:n},x:t=>o+(a(t,e.min,e.max)-e.min)/(e.max-e.min)*(r-o),y:t=>n-(a(t,i.min,i.max)-i.min)/(i.max-i.min)*(n-s)}}(e,i,o),{plot:s}=r,n=Ut(i,5),a=Ut(o,5),c=t.points.find(e=>e.index===t.hoveredIndex);return W`
    <svg viewBox="0 0 ${e.width} ${e.height}" class="ccc-chart"
      role="img" preserveAspectRatio="xMidYMid meet">
      <!-- grid -->
      <g class="ccc-grid">
        ${n.map(t=>W`<line x1=${r.x(t)} y1=${s.top}
          x2=${r.x(t)} y2=${s.bottom} />`)}
        ${a.map(t=>W`<line x1=${s.left} y1=${r.y(t)}
          x2=${s.right} y2=${r.y(t)} />`)}
      </g>

      <!-- comfort zone(s) -->
      ${t.zone?function(t,e,i){const{plot:o}=e,r=i.faint?.5:1,s=(t,i)=>{const r=t.temp?e.x(t.temp.min):o.left,s=t.temp?e.x(t.temp.max):o.right,n=t.hum?e.y(t.hum.max):o.top,a=t.hum?e.y(t.hum.min):o.bottom;return W`<rect x=${r} y=${n} width=${s-r} height=${a-n}
      fill=${i} stroke="none" rx="2" />`};return W`<g opacity=${r}>
    ${s({temp:t.temperature?.acceptable,hum:t.humidity?.acceptable},"var(--ccc-acceptable-fill, rgba(46, 158, 91, 0.10))")}
    ${s({temp:t.temperature?.preferred,hum:t.humidity?.preferred},"var(--ccc-preferred-fill, rgba(46, 158, 91, 0.22))")}
  </g>`}(t.zone,r,{faint:t.zoneFaint}):q}
      ${c?function(t,e){const{plot:i}=e,o=t.temperature?e.x(t.temperature.acceptable.min):i.left,r=t.temperature?e.x(t.temperature.acceptable.max):i.right,s=t.humidity?e.y(t.humidity.acceptable.max):i.top,n=t.humidity?e.y(t.humidity.acceptable.min):i.bottom;return W`<rect x=${o} y=${s} width=${r-o} height=${n-s}
    fill="none" stroke=${"var(--ccc-zone-stroke, rgba(46, 158, 91, 0.5))"} stroke-width="1.5" stroke-dasharray="4 3" rx="2" />`}(c.eval.profile,r):q}

      <!-- axes -->
      <line class="ccc-axis" x1=${s.left} y1=${s.bottom} x2=${s.right} y2=${s.bottom} />
      <line class="ccc-axis" x1=${s.left} y1=${s.top} x2=${s.left} y2=${s.bottom} />

      <!-- tick labels -->
      <g class="ccc-tick-label">
        ${n.map(t=>W`<text x=${r.x(t)} y=${s.bottom+14}
          text-anchor="middle">${t}</text>`)}
        ${a.map(t=>W`<text x=${s.left-6} y=${r.y(t)+3}
          text-anchor="end">${t}</text>`)}
      </g>

      <!-- axis titles -->
      <text class="ccc-axis-title" x=${(s.left+s.right)/2} y=${e.height-4}
        text-anchor="middle">${t.labels.x}</text>
      <text class="ccc-axis-title" transform="translate(11 ${(s.top+s.bottom)/2}) rotate(-90)"
        text-anchor="middle">${t.labels.y}</text>

      <!-- points -->
      ${t.points.map(e=>function(t,e,i){const{plot:o}=e,r=t.eval.temperature?.value,s=t.eval.humidity?.value;let n,a;if("x-axis"===t.pin&&void 0!==r)n=e.x(r),a=o.bottom-6;else if("y-axis"===t.pin&&void 0!==s)n=o.left+6,a=e.y(s);else{if(void 0===r||void 0===s)return W``;n=e.x(r),a=e.y(s)}const c=t.index===i.hoveredIndex,l=c?8:6;return W`<g class="ccc-point ${c?"is-hovered":""}"
    @mouseenter=${()=>i.onHover(t.index)}
    @mouseleave=${()=>i.onHover(null)}
    @click=${()=>i.onSelect(t.index)}
    @focus=${()=>i.onHover(t.index)}
    @blur=${()=>i.onHover(null)}
    tabindex="0" role="button">
    ${c?W`<circle cx=${n} cy=${a} r=${l+4} fill=${t.color} opacity="0.25" />`:q}
    <circle cx=${n} cy=${a} r=${l} fill=${t.color}
      stroke="var(--card-background-color, #fff)" stroke-width="1.5" />
  </g>`}(e,r,t))}
    </svg>
  `}function Tt(t){return yt[t]}const Mt={"card.name":"Climate Comfort Card","card.description":"Plot temperature/humidity for rooms on a shared comfort chart.","card.no_points":"No points configured yet. Add at least one location.","card.unavailable":"unavailable","axis.temperature":"Temperature (°C)","axis.humidity":"Humidity (%)","status.comfortable":"Comfortable","status.too_cold":"Too cold","status.too_hot":"Too hot","status.too_dry":"Too dry","status.too_humid":"Too humid","status.bit_cold":"A bit cold","status.bit_warm":"A bit warm","status.bit_dry":"A bit dry","status.bit_humid":"A bit humid","preset.living_room":"Living room","preset.bedroom":"Bedroom","preset.kitchen":"Kitchen","preset.bathroom":"Bathroom","preset.nursery":"Nursery","preset.office":"Office","preset.basement":"Basement","preset.server_room":"Server room","editor.title":"Title","editor.default_preset":"Default preset","editor.zone_mode":"Comfort zones","editor.zone_mode.auto":"Auto","editor.zone_mode.average":"Averaged","editor.zone_mode.hidden":"Hidden","editor.show_legend":"Show legend","editor.points":"Points (rooms)","editor.add_point":"Add point","editor.point_name":"Name","editor.temperature_entity":"Temperature entity","editor.humidity_entity":"Humidity entity","editor.point_preset":"Preset","editor.use_default":"Use default","editor.remove":"Remove","editor.legend":"Legend"},Nt={en:Mt,pl:{"card.name":"Karta Komfortu Klimatu","card.description":"Nanieś temperaturę/wilgotność pokoi na wspólny wykres komfortu.","card.no_points":"Brak skonfigurowanych punktów. Dodaj co najmniej jedną lokalizację.","card.unavailable":"niedostępny","axis.temperature":"Temperatura (°C)","axis.humidity":"Wilgotność (%)","status.comfortable":"Komfortowo","status.too_cold":"Za zimno","status.too_hot":"Za ciepło","status.too_dry":"Za sucho","status.too_humid":"Za wilgotno","status.bit_cold":"Nieco zimno","status.bit_warm":"Nieco ciepło","status.bit_dry":"Nieco sucho","status.bit_humid":"Nieco wilgotno","preset.living_room":"Salon","preset.bedroom":"Sypialnia","preset.kitchen":"Kuchnia","preset.bathroom":"Łazienka","preset.nursery":"Pokój dziecięcy","preset.office":"Gabinet","preset.basement":"Piwnica","preset.server_room":"Serwerownia","editor.title":"Tytuł","editor.default_preset":"Domyślny preset","editor.zone_mode":"Strefy komfortu","editor.zone_mode.auto":"Automatyczne","editor.zone_mode.average":"Uśrednione","editor.zone_mode.hidden":"Ukryte","editor.show_legend":"Pokaż legendę","editor.points":"Punkty (pokoje)","editor.add_point":"Dodaj punkt","editor.point_name":"Nazwa","editor.temperature_entity":"Encja temperatury","editor.humidity_entity":"Encja wilgotności","editor.point_preset":"Preset","editor.use_default":"Użyj domyślnego","editor.remove":"Usuń","editor.legend":"Legenda"}};function Rt(t,e){const i=(e??"en").split("-")[0].toLowerCase();return Nt[i]?.[t]??Mt[t]??t}var jt,Lt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(jt||(jt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Lt||(Lt={}));const Dt=["auto","average","hidden"];let Bt=class extends lt{setConfig(t){this._config={...t,points:t.points??[]}}get _lang(){return this.hass?.language??"en"}_t(t){return Rt(t,this._lang)}_emit(t){this._config=t,function(t,e,i,o){o=o||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});r.detail=i,t.dispatchEvent(r)}(this,"config-changed",{config:t})}_updateRoot(t){this._config&&this._emit({...this._config,...t})}_updatePoint(t,e){if(!this._config)return;const i=this._config.points.map((i,o)=>o===t?{...i,...e}:i);this._emit({...this._config,points:i})}_addPoint(){if(!this._config)return;const t=[...this._config.points,{}];this._emit({...this._config,points:t})}_removePoint(t){if(!this._config)return;const e=this._config.points.filter((e,i)=>i!==t);this._emit({...this._config,points:e})}_renderPresetChips(t,e,i){const o=[];e&&o.push(this._chip(this._t("editor.use_default"),"mdi:home-outline",!t,()=>i(void 0)));for(const e of vt)o.push(this._chip(this._t(e.labelKey),e.icon,t===e.id,()=>i(e.id)));return V`<div class="ccc-chips">${o}</div>`}_chip(t,e,i,o){return V`<button
      type="button"
      class="ccc-chip ${i?"is-active":""}"
      @click=${o}
    >
      <ha-icon icon=${e}></ha-icon><span>${t}</span>
    </button>`}_renderRangeHint(t){const e=[],i=t.temperature?.acceptable,o=t.humidity?.acceptable;return i&&e.push(`🌡 ${i.min}–${i.max} °C`),o&&e.push(`💧 ${o.min}–${o.max} %`),0===e.length?q:V`<div class="ccc-range-hint">${e.join("   ·   ")}</div>`}render(){return this._config&&this.hass?V`
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

        <ha-select
          label=${this._t("editor.zone_mode")}
          .value=${this._config.zone_mode??"auto"}
          @selected=${t=>this._updateRoot({zone_mode:t.target.value})}
          @closed=${t=>t.stopPropagation()}
        >
          ${Dt.map(t=>V`<mwc-list-item value=${t}>${this._t(`editor.zone_mode.${t}`)}</mwc-list-item>`)}
        </ha-select>

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
    `:q}_renderPointEditor(t,e){return V`
      <div class="ccc-point-editor">
        <div class="ccc-point-header">
          <ha-textfield
            class="grow"
            label=${this._t("editor.point_name")}
            .value=${t.name??""}
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
          ${this._renderRangeHint(Et(t,this._config.preset))}
        </div>
      </div>
    `}};Bt.styles=n`
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
  `,t([mt({attribute:!1})],Bt.prototype,"hass",void 0),t([ft()],Bt.prototype,"_config",void 0),Bt=t([ht("climate-comfort-card-editor")],Bt),console.info("%c CLIMATE-COMFORT-CARD %c v0.1.0-beta.2 ","color: white; background: #2e9e5b; font-weight: 700;","color: #2e9e5b; background: white; font-weight: 700;"),window.customCards=window.customCards||[],window.customCards.push({type:_t,name:Rt("card.name"),description:Rt("card.description"),preview:!0});let It=class extends lt{constructor(){super(...arguments),this._hovered=null}static async getConfigElement(){return document.createElement(`${_t}-editor`)}static getStubConfig(){return{type:`custom:${_t}`,title:"Comfort",preset:"living_room",points:[]}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={zone_mode:"auto",show_legend:!0,...t,points:t.points??[]}}getCardSize(){return 6}get _lang(){return this.hass?.language??"en"}_t(t){return Rt(t,this._lang)}_resolvePoints(){return this._config&&this.hass?this._config.points.map(t=>{const e=Et(t,this._config.preset),i=t.temperature?kt(this.hass.states[t.temperature]?.state):void 0,o=t.humidity?kt(this.hass.states[t.humidity]?.state):void 0,r=function(t){const{name:e,profile:i}=t;let o,r,s="good";return void 0!==t.temperature&&i.temperature&&(o=St("temperature",t.temperature,i.temperature),s=At(s,o.severity)),void 0!==t.humidity&&i.humidity&&(r=St("humidity",t.humidity,i.humidity),s=At(s,r.severity)),{name:e,profile:i,temperature:o,humidity:r,severity:s,unavailable:!o&&!r}}({name:t.name||this._entityFallbackName(t),profile:e,temperature:i,humidity:o});return{config:t,profile:e,evaluation:r,color:t.color??Tt(r.severity)}}):[]}_entityFallbackName(t){const e=t.temperature||t.humidity;return e&&this.hass?.states[e]?this.hass.states[e].attributes.friendly_name??e:e??"—"}_overallLabel(t){if(t.unavailable)return this._t("card.unavailable");const e=[];return t.temperature&&"comfortable"!==t.temperature.status&&e.push(this._t(zt(t.temperature))),t.humidity&&"comfortable"!==t.humidity.status&&e.push(this._t(zt(t.humidity))),e.length?e.join(", "):this._t("status.comfortable")}shouldUpdate(t){if(t.has("_config")||t.has("_hovered"))return!0;if(!this._config)return!1;const e=t.get("hass");return!e||this._config.points.some(t=>[t.temperature,t.humidity].some(t=>t&&e.states[t]!==this.hass.states[t]))}render(){if(!this._config||!this.hass)return q;const t=this._resolvePoints(),e=this._config.temperature_axis??gt,i=this._config.humidity_axis??$t,o=t.map((t,e)=>{const{evaluation:i}=t;if(i.unavailable)return null;const o=void 0!==i.temperature,r=void 0!==i.humidity,s=o&&r?"none":o?"x-axis":"y-axis";return{index:e,eval:i,color:t.color,pin:s}}).filter(t=>null!==t),r=this._computeZone(t),s=null!==this._hovered?t[this._hovered]:void 0;return V`
      <ha-card .header=${this._config.title}>
        <div class="ccc-body">
          <div class="ccc-chart-wrap">
            ${Ot({layout:Ht,tempAxis:e,humAxis:i,points:o,zone:r?.zone,zoneFaint:r?.faint??!1,hoveredIndex:this._hovered,labels:{x:this._t("axis.temperature"),y:this._t("axis.humidity")},onHover:t=>this._hovered=t,onSelect:t=>this._hovered=t})}
            ${s?this._renderTooltip(s):q}
          </div>
          ${0===t.length?V`<div class="ccc-empty">${this._t("card.no_points")}</div>`:this._config.show_legend?this._renderLegend(t):q}
        </div>
      </ha-card>
    `}_computeZone(t){if("hidden"===this._config?.zone_mode)return;const e=t.filter(t=>!t.evaluation.unavailable).map(t=>t.profile).filter(t=>t.temperature||t.humidity);if(0===e.length)return;const i=function(t){if(0===t.length)return;const e=t.map(t=>t.temperature?.preferred).filter(Pt),i=t.map(t=>t.temperature?.acceptable).filter(Pt),o=t.map(t=>t.humidity?.preferred).filter(Pt),r=t.map(t=>t.humidity?.acceptable).filter(Pt),s=t=>JSON.stringify(t),n=t.every(e=>s(e)===s(t[0])),a={sources:t.length,uniform:n},c=Ct(e),l=Ct(i);c&&l&&(a.temperature={preferred:c,acceptable:l});const d=Ct(o),h=Ct(r);return d&&h&&(a.humidity={preferred:d,acceptable:h}),a}(e);if(!i)return;return{zone:i,faint:"average"!==this._config?.zone_mode&&!i.uniform}}_renderTooltip(t){const{evaluation:e}=t,i=t=>{const i=e[t];return i?V`<div class="ccc-tt-row">
        <span class="ccc-swatch" style=${`background:${Tt(i.severity)}`}></span>
        <span>${i.value}${(t=>"temperature"===t?"°C":"%")(t)}</span>
        <span class="ccc-tt-status">${this._t(zt(i))}</span>
      </div>`:q};return V`<div class="ccc-tooltip">
      <div class="ccc-tt-name">${e.name}</div>
      ${i("temperature")}
      ${i("humidity")}
    </div>`}_renderLegend(t){return V`<div class="ccc-legend">
      ${t.map((t,e)=>{const i=t.evaluation.unavailable;return V`<div
          class="ccc-legend-item ${this._hovered===e?"is-hovered":""}"
          @mouseenter=${()=>this._hovered=e}
          @mouseleave=${()=>this._hovered=null}
        >
          <span class="ccc-swatch" style=${`background:${t.color}`}></span>
          <span class="ccc-legend-name">${t.evaluation.name}</span>
          <span class="ccc-legend-status ${i?"is-unavailable":""}">
            ${this._overallLabel(t.evaluation)}
          </span>
        </div>`})}
    </div>`}};It.styles=n`
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
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .ccc-legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 3px 6px;
      border-radius: 6px;
      cursor: default;
    }
    .ccc-legend-item.is-hovered {
      background: var(--secondary-background-color, #f0f0f0);
    }
    .ccc-legend-name {
      font-weight: 500;
    }
    .ccc-legend-status {
      margin-left: auto;
      color: var(--secondary-text-color, #888);
      font-size: 12px;
    }
    .ccc-legend-status.is-unavailable {
      font-style: italic;
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
  `,t([mt({attribute:!1})],It.prototype,"hass",void 0),t([ft()],It.prototype,"_config",void 0),t([ft()],It.prototype,"_hovered",void 0),It=t([ht(_t)],It);export{It as ClimateComfortCard};
