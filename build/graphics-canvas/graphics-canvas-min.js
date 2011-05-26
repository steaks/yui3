YUI.add("graphics-canvas",function(b){var h="canvasShape",e=b.AttributeLite,i=b.Plugin.Host,l,k,j,d,g,m;function f(){if(!m){m=b.config.doc.createElement("div");}m.style.height=0;m.style.width=0;m.style.overflow="hidden";b.config.doc.documentElement.appendChild(m);return m;}function a(){}a.prototype={_reHex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,_2RGBA:function(o,n){n=(n!==undefined)?n:1;if(this._reHex.exec(o)){o="rgba("+[parseInt(RegExp.$1,16),parseInt(RegExp.$2,16),parseInt(RegExp.$3,16)].join(",")+","+n+")";}return o;},_2RGB:function(o){var n=f();n.style.background=o;return n.style.backgroundColor;},setSize:function(n,o){if(this.get("autoSize")){if(n>this.node.getAttribute("width")){this.node.style.width=n+"px";this.node.setAttribute("width",n);}if(o>this.node.getAttribute("height")){this.node.style.height=o+"px";this.node.setAttribute("height",o);}}},_updatePosition:function(n,o){this._updateCoords(n,o);if(n<=this._left){this._left=n;}else{if(n>=this._right){this._right=n;}}if(o<=this._top){this._top=o;}else{if(o>=this._bottom){this._bottom=o;}}this._width=this._right-this._left;this._height=this._bottom-this._top;},_updateCoords:function(n,o){this._xcoords.push(n);this._ycoords.push(o);},_clearAndUpdateCoords:function(){var n=this._xcoords.pop()||0,o=this._ycoords.pop()||0;this._updateCoords(n,o);},_updateNodePosition:function(){var o=this.get("node"),n=this.get("x"),p=this.get("y");o.style.position="absolute";o.style.left=(n+this._left)+"px";o.style.top=(p+this._top)+"px";},_methods:null,_properties:null,_updateDrawingQueue:function(n){if(!this._methods){this._methods=[];}this._methods.push(n);},lineTo:function(s,r,p){var o=arguments,q,n;if(!this._lineToMethods){this._lineToMethods=[];}if(typeof s==="string"||typeof s==="number"){o=[[s,r]];}for(q=0,n=o.length;q<n;++q){this._updateDrawingQueue(["lineTo",o[q][0],o[q][1]]);this._lineToMethods[this._lineToMethods.length]=this._methods[this._methods.length-1];this._updateShapeProps.apply(this,o[q]);this._updatePosition(o[q][0],o[q][1]);}this._drawingComplete=false;return this;},moveTo:function(n,o){this._updateDrawingQueue(["moveTo",n,o]);this._updateShapeProps(n,o);this._updatePosition(n,o);this._drawingComplete=false;return this;},curveTo:function(q,o,v,u,t,s){var r,p,n,w;this._updateDrawingQueue(["bezierCurveTo",q,o,v,u,t,s]);this._drawingComplete=false;this._updateShapeProps(t,s);r=Math.max(t,Math.max(q,v));p=Math.max(s,Math.max(o,u));n=Math.min(t,Math.min(q,v));w=Math.min(s,Math.min(o,u));this._updatePosition(r,p);this._updatePosition(n,w);return this;},quadraticCurveTo:function(r,q,n,u){var p,o,t,s;this._updateDrawingQueue(["quadraticCurveTo",r,q,n,u]);this._drawingComplete=false;this._updateShapeProps(n,u);p=Math.max(n,r);o=Math.max(u,q);t=Math.min(n,r);s=Math.min(u,q);this._updatePosition(p,o);this._updatePosition(t,s);return this;},drawCircle:function(o,s,n){var q=0,p=2*Math.PI,r=n*2;this._shape={x:o,y:s,w:r,h:r};this._drawingComplete=false;this._updatePosition(o+r,s+r);this._updateDrawingQueue(["arc",o+n,s+n,n,q,p,false]);return this;},drawEllipse:function(A,v,B,G){this._shape={x:A,y:v,w:B,h:G};if(this._stroke&&this._strokeWeight>0){B-=this._strokeWeight*2;G-=this._strokeWeight*2;A+=this._strokeWeight;v+=this._strokeWeight;}var D=8,s=-(45/180)*Math.PI,I=0,r,p=B/2,q=G/2,E=0,u=A+p,t=v+q,C,z,H,F,o,n;C=u+Math.cos(0)*p;z=t+Math.sin(0)*q;this.moveTo(C,z);for(;E<D;E++){I+=s;r=I-(s/2);H=u+Math.cos(I)*p;F=t+Math.sin(I)*q;o=u+Math.cos(r)*(p/Math.cos(s/2));n=t+Math.sin(r)*(q/Math.cos(s/2));this.quadraticCurveTo(o,n,H,F);}this._trackPos(A,v);this._trackSize(A+B,v+G);return this;},drawRect:function(n,q,o,p){this._shape={x:n,y:q,w:o,h:p};this._drawingComplete=false;this.moveTo(n,q);this.lineTo(n+o,q);this.lineTo(n+o,q+p);this.lineTo(n,q+p);this.lineTo(n,q);return this;},drawRoundRect:function(n,s,o,q,p,r){this._shape={x:n,y:s,w:o,h:q};this._drawingComplete=false;this._updateDrawingQueue(["moveTo",n,s+r]);this._updateDrawingQueue(["lineTo",n,s+q-r]);this._updateDrawingQueue(["quadraticCurveTo",n,s+q,n+p,s+q]);this._updateDrawingQueue(["lineTo",n+o-p,s+q]);this._updateDrawingQueue(["quadraticCurveTo",n+o,s+q,n+o,s+q-r]);this._updateDrawingQueue(["lineTo",n+o,s+r]);this._updateDrawingQueue(["quadraticCurveTo",n+o,s,n+o-p,s]);this._updateDrawingQueue(["lineTo",n+p,s]);this._updateDrawingQueue(["quadraticCurveTo",n,s,n,s+r]);this._trackPos(n,s);this._trackSize(o,q);this._paint();return this;},drawWedge:function(q){var z=q.x,v=q.y,D=q.startAngle,u=q.arc,p=q.radius,r=q.yRadius,C,B,t,H,s,A,w,G,F,o,n,E=0;this._drawingComplete=false;this._updateRenderQueue(["moveTo",z,v]);r=r||p;if(Math.abs(u)>360){u=360;}C=Math.ceil(Math.abs(u)/45);B=u/C;t=-(B/180)*Math.PI;H=-(D/180)*Math.PI;if(C>0){A=z+Math.cos(D/180*Math.PI)*p;w=v+Math.sin(-D/180*Math.PI)*r;this.lineTo(A,w);for(;E<C;++E){H+=t;s=H-(t/2);G=z+Math.cos(H)*p;F=v+Math.sin(H)*r;o=z+Math.cos(s)*(p/Math.cos(t/2));n=v+Math.sin(s)*(r/Math.cos(t/2));this._updateRenderQueue(["quadraticCurveTo",o,n,G,F]);}this._updateRenderQueue(["lineTo",z,v]);}this._trackPos(z,v);this._trackSize(p,p);this._paint();},end:function(){this._paint();return this;},_getLinearGradient:function(){var D=b.Lang.isNumber,I=this.get("fill"),z=I.stops,t,H,G,J=0,K=z.length,n,B=0,A=0,C=this.get("width"),L=this.get("height"),F=I.rotation,N,M,s,p,q=B+C/2,o=A+L/2,v,u=Math.PI/180,E=parseFloat(parseFloat(Math.tan(F*u)).toFixed(8));if(Math.abs(E)*C/2>=L/2){if(F<180){s=A;p=A+L;}else{s=A+L;p=A;}N=q-((o-s)/E);M=q-((o-p)/E);}else{if(F>90&&F<270){N=B+C;M=B;}else{N=B;M=B+C;}s=((E*(q-N))-o)*-1;p=((E*(q-M))-o)*-1;}n=this._context.createLinearGradient(N,s,M,p);for(;J<K;++J){G=z[J];t=G.opacity;H=G.color;v=G.offset;if(D(t)){t=Math.max(0,Math.min(1,t));H=this._2RGBA(H,t);}else{H=this._2RGB(H);}v=G.offset||J/(K-1);n.addColorStop(v,H);}return n;},_getRadialGradient:function(){var G=b.Lang.isNumber,M=this.get("fill"),H=M.r,v=M.fx,t=M.fy,A=M.stops,u,J,I,N=0,P=A.length,o,D=0,C=0,E=this.get("width"),Q=this.get("height"),R,O,s,q,L,K,n,F,S,T,z,B,p;K=D+E/2;n=C+Q/2;
R=E*v;s=Q*t;O=D+E/2;q=C+Q/2;L=E*H;T=Math.sqrt(Math.pow(Math.abs(K-R),2)+Math.pow(Math.abs(n-s),2));if(T>=L){B=T/L;if(B===1){B=1.01;}F=(R-K)/B;S=(s-n)/B;F=F>0?Math.floor(F):Math.ceil(F);S=S>0?Math.floor(S):Math.ceil(S);R=K+F;s=n+S;}if(H>=0.5){o=this._context.createRadialGradient(R,s,H,O,q,H*E);p=1;}else{o=this._context.createRadialGradient(R,s,H,O,q,E/2);p=H*2;}for(;N<P;++N){I=A[N];u=I.opacity;J=I.color;z=I.offset;if(G(u)){u=Math.max(0,Math.min(1,u));J=this._2RGBA(J,u);}else{J=this._2RGB(J);}z=I.offset||N/(P-1);z*=p;if(z<=1){o.addColorStop(z,J);}}return o;},_initProps:function(){this._methods=[];this._lineToMethods=[];this._xcoords=[0];this._ycoords=[0];this._width=0;this._height=0;this._left=0;this._top=0;this._right=0;this._bottom=0;this._x=0;this._y=0;},_drawingComplete:false,_createGraphic:function(n){var o=b.config.doc.createElement("canvas");return o;},_trackSize:function(n,o){if(n>this._width){this._width=n;}if(o>this._height){this._height=o;}},_trackPos:function(n,o){if(n>this._x){this._x=n;}if(o>this._y){this._y=o;}},_updateShapeProps:function(n,q){var o,p;if(!this._shape){this._shape={};}if(!this._shape.x){this._shape.x=n;}else{this._shape.x=Math.min(this._shape.x,n);}if(!this._shape.y){this._shape.y=q;}else{this._shape.y=Math.min(this._shape.y,q);}o=Math.abs(n-this._shape.x);if(!this._shape.w){this._shape.w=o;}else{this._shape.w=Math.max(o,this._shape.w);}p=Math.abs(q-this._shape.y);if(!this._shape.h){this._shape.h=p;}else{this._shape.h=Math.max(p,this._shape.h);}}};b.CanvasDrawing=a;l=function(n){var p=this,o=b.Plugin&&b.Plugin.Host;if(p._initPlugins&&o){o.call(p);}p.name=p.constructor.NAME;p._eventPrefix=p.constructor.EVENT_PREFIX||p.constructor.NAME;e.call(p);p.addAttrs(n);p.init.apply(this,arguments);if(p._initPlugins){p._initPlugins(n);}p.initialized=true;};l.NAME="canvasShape";l.prototype=b.merge(b.CanvasDrawing.prototype,{init:function(){this.initializer.apply(this,arguments);},initializer:function(n){var o=this;o.createNode();o._graphic=n.graphic;o._xcoords=[0];o._ycoords=[0];o._updateHandler();},addClass:function(n){var o=b.one(this.get("node"));o.addClass(n);},removeClass:function(n){var o=b.one(this.get("node"));o.removeClass(n);},getXY:function(){var q=this.get("graphic"),o=q.getXY(),n=this.get("x"),p=this.get("y");return[o[0]+n,o[1]+p];},setXY:function(p){var r=this.get("graphic"),o=r.getXY(),n=p[0]-o[0],q=p[1]-o[1];this._set("x",n);this._set("y",q);this._updateNodePosition(n,q);},contains:function(n){return n===b.one(this.node);},test:function(n){return b.one(this.get("node")).test(n);},compareTo:function(n){var o=this.node;return o===n;},_getDefaultFill:function(){return{type:"solid",cx:0.5,cy:0.5,fx:0.5,fy:0.5,r:0.5};},_getDefaultStroke:function(){return{weight:1,dashstyle:"none",color:"#000",opacity:1};},_left:0,_right:0,_top:0,_bottom:0,createNode:function(){var n=b.config.doc.createElement("canvas"),o=this.get("id");this._context=n.getContext("2d");n.setAttribute("class","yui3-"+h);n.setAttribute("class","yui3-"+this.name);n.setAttribute("id",o);o="#"+o;this.node=n;},isMouseEvent:function(n){if(n.indexOf("mouse")>-1||n.indexOf("click")>-1){return true;}return false;},before:function(o,n){if(this.isMouseEvent(o)){return b.before(o,n,"#"+this.get("id"));}return b.on.apply(this,arguments);},on:function(o,n){if(this.isMouseEvent(o)){return b.on(o,n,"#"+this.get("id"));}return b.on.apply(this,arguments);},after:function(o,n){if(this.isMouseEvent(o)){return b.after(o,n,"#"+this.get("id"));}return b.on.apply(this,arguments);},_setStrokeProps:function(t){var o=t.color,s=t.weight,r=t.opacity,q=t.linejoin||"round",p=t.linecap||"butt",n=t.dashstyle;this._miterlimit=null;this._dashstyle=(n&&b.Lang.isArray(n)&&n.length>1)?n:null;this._strokeWeight=s;if(s){this._stroke=1;}else{this._stroke=0;}if(r){this._strokeStyle=this._2RGBA(o,r);}else{this._strokeStyle=o;}this._linecap=p;if(q=="round"||q=="square"){this._linejoin=q;}else{q=parseInt(q,10);if(b.Lang.isNumber(q)){this._miterlimit=Math.max(q,1);this._linejoin="miter";}}},set:function(){var n=this,o=arguments[0];e.prototype.set.apply(n,arguments);if(n.initialized&&o!="x"&&o!="y"){n._updateHandler();}},_setFillProps:function(r){var p=b.Lang.isNumber,n=r.color,o,q=r.type;if(q=="linear"||q=="radial"){this._fillType=q;}else{if(n){o=r.opacity;if(p(o)){o=Math.max(0,Math.min(1,o));n=this._2RGBA(n,o);}else{n=this._2RGB(n);}this._fillColor=n;this._fillType="solid";}else{this._fillColor=null;}}},translate:function(n,p){var o="translate("+n+"px, "+p+"px)";this._updateTransform("translate",/translate\(.*\)/,o);},skewX:function(n){},skewY:function(n){},_rotation:0,rotate:function(o){var n="rotate("+o+"deg)";this._rotation=o;this._updateTransform("rotate",/rotate\(.*\)/,n);},_transformOrigin:function(n,p){var o=this.get("node");o.style.MozTransformOrigin=(100*n)+"% "+(100*p)+"%";},scale:function(n){},matrix:function(o,n,s,r,q,p){},_updateTransform:function(p,s,r){var q=this.get("node"),o=q.style.MozTransform||q.style.webkitTransform||q.style.msTransform||q.style.OTransform,n=this.get("transformOrigin");if(o&&o.length>0){if(o.indexOf(p)>-1){o=o.replace(s,r);}else{o+=" "+r;}}else{o=r;}n=(100*n[0])+"% "+(100*n[1])+"%";q.style.MozTransformOrigin=n;q.style.webkitTransformOrigin=n;q.style.msTransformOrigin=n;q.style.OTransformOrigin=n;q.style.MozTransform=o;q.style.webkitTransform=o;q.style.msTransform=o;q.style.OTransform=o;},_updateHandler:function(){this._draw();},_draw:function(){this._paint();},_paint:function(){if(!this._methods){return;}var q=this.get("node"),y=this.get("width")||this._width,u=this.get("height")||this._height,o=this._context,r=[],p=this._methods.concat(),t=0,s,n,x,v=0;this._context.clearRect(0,0,y,u);if(this._methods){v=p.length;if(!v||v<1){return;}for(;t<v;++t){r[t]=p[t].concat();x=r[t];for(s=1;s<x.length;++s){if(s%2===0){x[s]=x[s]-this._top;}else{x[s]=x[s]-this._left;}}}q.setAttribute("width",y);q.setAttribute("height",u);o.beginPath();for(t=0;t<v;++t){x=r[t].concat();if(x&&x.length>0){n=x.shift();if(n){if(n&&n=="lineTo"&&this._dashstyle){x.unshift(this._xcoords[t]-this._left,this._ycoords[t]-this._top);
this._drawDashedLine.apply(this,x);}else{o[n].apply(o,x);}}}}if(this._fillType){if(this._fillType=="linear"){o.fillStyle=this._getLinearGradient();}else{if(this._fillType=="radial"){o.fillStyle=this._getRadialGradient();}else{o.fillStyle=this._fillColor;}}o.closePath();o.fill();}if(this._stroke){if(this._strokeWeight){o.lineWidth=this._strokeWeight;}o.lineCap=this._linecap;o.lineJoin=this._linejoin;if(this._miterlimit){o.miterLimit=this._miterlimit;}o.strokeStyle=this._strokeStyle;o.stroke();}this._drawingComplete=true;this._clearAndUpdateCoords();this._updateNodePosition();this._methods=p;}},_drawDashedLine:function(w,C,n,z){var o=this._context,A=this._dashstyle[0],y=this._dashstyle[1],q=A+y,t=n-w,x=z-C,B=Math.sqrt(Math.pow(t,2)+Math.pow(x,2)),r=Math.floor(Math.abs(B/q)),p=Math.atan2(x,t),v=w,u=C,s;t=Math.cos(p)*q;x=Math.sin(p)*q;for(s=0;s<r;++s){o.moveTo(v,u);o.lineTo(v+Math.cos(p)*A,u+Math.sin(p)*A);v+=t;u+=x;}o.moveTo(v,u);B=Math.sqrt((n-v)*(n-v)+(z-u)*(z-u));if(B>A){o.lineTo(v+Math.cos(p)*A,u+Math.sin(p)*A);}else{if(B>0){o.lineTo(v+Math.cos(p)*B,u+Math.sin(p)*B);}}o.moveTo(n,z);},clear:function(){var n=this.get("width"),o=this.get("height");this._initProps();this._context.clearRect(0,0,n,o);return this;}});l.ATTRS={transformOrigin:{valueFn:function(){return[0.5,0.5];}},rotation:{setter:function(n){this.rotate(n);},getter:function(){return this._rotation;}},node:{readOnly:true,getter:function(){return this.node;}},id:{valueFn:function(){return b.guid();}},width:{},height:{},x:{value:0},y:{value:0},visible:{value:true,setter:function(o){var n=o?"visible":"hidden";this.get("node").style.visibility=n;return o;}},fill:{valueFn:"_getDefaultFill",setter:function(p){var o,n=this.get("fill")||this._getDefaultFill();o=(p)?b.merge(n,p):null;if(o&&o.color){if(o.color===undefined||o.color=="none"){o.color=null;}}this._setFillProps(o);return o;}},stroke:{valueFn:"_getDefaultStroke",setter:function(o){var n=this.get("stroke")||this._getDefaultStroke();o=(o)?b.merge(n,o):null;this._setStrokeProps(o);return o;}},autoSize:{value:false},pointerEvents:{value:"visiblePainted"},graphic:{readOnly:true,getter:function(){return this._graphic;}}};b.mix(l,b.AttributeLite,false,null,1);b.mix(l,b.EventTarget,false,null,1);b.mix(l,i,false,null,1);l.plug=i.plug;l.unplug=i.unplug;b.CanvasShape=l;k=function(n){k.superclass.constructor.apply(this,arguments);};k.NAME="canvasPath";b.extend(k,b.CanvasShape,{_type:"path",_addListeners:function(){},_draw:function(){this._paint();},end:function(){this._draw();}});k.ATTRS=b.merge(b.CanvasShape.ATTRS,{width:{getter:function(){return this._width;},setter:function(n){this._width=n;return n;}},height:{getter:function(){return this._height;},setter:function(n){this._height=n;return n;}},path:{getter:function(){return this._path;},setter:function(n){this._path=n;return n;}}});b.CanvasPath=k;j=function(){j.superclass.constructor.apply(this,arguments);};j.NAME="canvasRect";b.extend(j,b.CanvasShape,{_type:"rect",_draw:function(){this.clear();var n=this.get("x"),q=this.get("y"),o=this.get("width"),p=this.get("height");this.drawRect(n,q,o,p);this._paint();}});j.ATTRS=b.CanvasShape.ATTRS;b.CanvasRect=j;d=function(n){d.superclass.constructor.apply(this,arguments);};d.NAME="canvasEllipse";b.extend(d,l,{_type:"ellipse",_draw:function(){var n=this.get("width"),o=this.get("height");this.drawEllipse(0,0,n,o);this._paint();}});d.ATTRS=l.ATTRS;b.CanvasEllipse=d;g=function(n){g.superclass.constructor.apply(this,arguments);};g.NAME="canvasCircle";b.extend(g,b.CanvasShape,{_type:"circle",_draw:function(){var n=this.get("radius");if(n){this.drawCircle(0,0,n);this._paint();}}});g.ATTRS=b.merge(b.CanvasShape.ATTRS,{width:{readOnly:true,getter:function(){return this.get("radius")*2;}},height:{readOnly:true,getter:function(){return this.get("radius")*2;}},radius:{lazyAdd:false}});b.CanvasCircle=g;function c(n){this.initializer.apply(this,arguments);}c.prototype={getXY:function(){var n=b.one(this.node),o=n.getXY();return o;},autoSize:true,autoDraw:true,initializer:function(o){this._shapes={};o=o||{};var n=o.width||0,p=o.height||0;this.node=b.config.doc.createElement("div");this.setSize(n,p);if(o.render){this.render(o.render);}},setSize:function(n,o){if(this.autoSize){if(n>this.node.getAttribute("width")){this.node.style.width=n+"px";this.node.setAttribute("width",n);}if(o>this.node.getAttribute("height")){this.node.style.height=o+"px";this.node.setAttribute("height",o);}}},_trackSize:function(n,o){if(n>this._width){this._width=n;}if(o>this._height){this._height=o;}this.setSize(n,o);},setPosition:function(n,o){this.node.style.left=n+"px";this.node.style.top=o+"px";},render:function(q){var r=this.node,n=b.one(q),o=n.get("width")||n.get("offsetWidth"),p=n.get("height")||n.get("offsetHeight");r.style.display="block";r.style.position="absolute";r.style.left=b.one(r).getStyle("left");r.style.top=b.one(r).getStyle("top");r.style.pointerEvents="visiblePainted";n=n||b.config.doc.body;n.appendChild(this.node);this.setSize(o,p);return this;},toggleVisible:function(n){this.node.style.visibility=n?"visible":"hidden";},addShape:function(o){var p=o.node,n=this._frag||this.node;n.appendChild(p);if(!this._graphicsList){this._graphicsList=[];}this._graphicsList.push(p);},getShape:function(n){n.graphic=this;var o=new this._shapeClass[n.type](n);this._shapes[o.get("id")]=o;this.addShape(o);return o;},_shapeClass:{circle:b.CanvasCircle,rect:b.CanvasRect,path:b.CanvasPath,ellipse:b.CanvasEllipse},batch:function(p){var n=this.node,o=document.createDocumentFragment();this._frag=o;this.autoDraw=false;p();n.appendChild(o);this._frag=null;this.autoDraw=true;},destroy:function(){this._removeChildren(this.node);if(this.node&&this.node.parentNode){this.node.parentNode.removeChild(this.node);}},_removeChildren:function(n){if(n.hasChildNodes()){var o;while(n.firstChild){o=n.firstChild;this._removeChildren(o);n.removeChild(o);}}}};b.CanvasGraphic=c;},"@VERSION@",{skinnable:false,requires:["graphics"]});