/*! jQuery UI - v1.11.4 - 2015-03-13
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed MIT */
(function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./mouse","./draggable"],t):t(jQuery)})(function(t){return t.widget("ui.droppable",{version:"1.11.4",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=t.isFunction(s)?s:function(t){return t.is(s)},this.proportions=function(){return arguments.length?(e=arguments[0],void 0):e?e:e={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(i.scope),i.addClasses&&this.element.addClass("ui-droppable")},_addToManager:function(e){t.ui.ddmanager.droppables[e]=t.ui.ddmanager.droppables[e]||[],t.ui.ddmanager.droppables[e].push(this)},_splice:function(t){for(var e=0;t.length>e;e++)t[e]===this&&t.splice(e,1)},_destroy:function(){var e=t.ui.ddmanager.droppables[this.options.scope];this._splice(e),this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(e,i){if("accept"===e)this.accept=t.isFunction(i)?i:function(t){return t.is(i)};else if("scope"===e){var s=t.ui.ddmanager.droppables[this.options.scope];this._splice(s),this._addToManager(i)}this._super(e,i)},_activate:function(e){var i=t.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",e,this.ui(i))},_deactivate:function(e){var i=t.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",e,this.ui(i))},_over:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",e,this.ui(i)))},_out:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",e,this.ui(i)))},_drop:function(e,i){var s=i||t.ui.ddmanager.current,o=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=t(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&t.ui.intersect(s,t.extend(i,{offset:i.element.offset()}),i.options.tolerance,e)?(o=!0,!1):void 0}),o?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",e,this.ui(s)),this.element):!1):!1},ui:function(t){return{draggable:t.currentItem||t.element,helper:t.helper,position:t.position,offset:t.positionAbs}}}),t.ui.intersect=function(){function t(t,e,i){return t>=e&&e+i>t}return function(e,i,s,o){if(!i.offset)return!1;var n=(e.positionAbs||e.position.absolute).left+e.margins.left,r=(e.positionAbs||e.position.absolute).top+e.margins.top,a=n+e.helperProportions.width,l=r+e.helperProportions.height,h=i.offset.left,p=i.offset.top,c=h+i.proportions().width,u=p+i.proportions().height;switch(s){case"fit":return n>=h&&c>=a&&r>=p&&u>=l;case"intersect":return n+e.helperProportions.width/2>h&&c>a-e.helperProportions.width/2&&r+e.helperProportions.height/2>p&&u>l-e.helperProportions.height/2;case"pointer":return t(o.pageY,p,i.proportions().height)&&t(o.pageX,h,i.proportions().width);case"touch":return(r>=p&&u>=r||l>=p&&u>=l||p>r&&l>u)&&(n>=h&&c>=n||a>=h&&c>=a||h>n&&a>c);default:return!1}}}(),t.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,i){var s,o,n=t.ui.ddmanager.droppables[e.options.scope]||[],r=i?i.type:null,a=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();t:for(s=0;n.length>s;s++)if(!(n[s].options.disabled||e&&!n[s].accept.call(n[s].element[0],e.currentItem||e.element))){for(o=0;a.length>o;o++)if(a[o]===n[s].element[0]){n[s].proportions().height=0;continue t}n[s].visible="none"!==n[s].element.css("display"),n[s].visible&&("mousedown"===r&&n[s]._activate.call(n[s],i),n[s].offset=n[s].element.offset(),n[s].proportions({width:n[s].element[0].offsetWidth,height:n[s].element[0].offsetHeight}))}},drop:function(e,i){var s=!1;return t.each((t.ui.ddmanager.droppables[e.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&t.ui.intersect(e,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(e,i){e.element.parentsUntil("body").bind("scroll.droppable",function(){e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)})},drag:function(e,i){e.options.refreshPositions&&t.ui.ddmanager.prepareOffsets(e,i),t.each(t.ui.ddmanager.droppables[e.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,o,n,r=t.ui.intersect(e,this,this.options.tolerance,i),a=!r&&this.isover?"isout":r&&!this.isover?"isover":null;a&&(this.options.greedy&&(o=this.options.scope,n=this.element.parents(":data(ui-droppable)").filter(function(){return t(this).droppable("instance").options.scope===o}),n.length&&(s=t(n[0]).droppable("instance"),s.greedyChild="isover"===a)),s&&"isover"===a&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[a]=!0,this["isout"===a?"isover":"isout"]=!1,this["isover"===a?"_over":"_out"].call(this,i),s&&"isout"===a&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(e,i){e.element.parentsUntil("body").unbind("scroll.droppable"),e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)}},t.ui.droppable});