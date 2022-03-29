(()=>{var t,e={703:(t,e,a)=>{var n=a(9755);a(1388),a(3734),a(7634),a(1112),a(6099),a(2993),a(944),a(3889),a(5269);let o=["bool","int","real","unknown","CONST","ENUM","ENUMERATOR"],r=!1;const{SearchNode:s}=a(3024);let i,l=sessionStorage.getItem("var_import_search_string"),c=[!0,!0,!0,!0,!0,!0];function d(){l=n("#search_bar").val().trim(),sessionStorage.setItem("var_import_search_string",l),i=s.fromQuery(l)}function u(t,e,a=!0,n=!0){let o=t.data();for(var r in"source"===e&&"source"!==o.action?void 0!==o.source.name&&(o.result=o.source,o.action="source"):"target"===e&&"target"!==o.action?void 0!==o.target.name&&(o.result=o.target,o.action="target"):"skip"===e&&(o.result=o.target,o.action=void 0!==o.target.name?"target":"skipped"),o.available_constraints){let t=o.available_constraints[r];o.available_constraints[r].to_result=t.origin===e}a?t.data(o).draw("full-hold"):t.data(o),n&&p(o)}function p(t=!1){let e=n("body");e.LoadingOverlay("show");let a=Object();t?a[t.name]={action:t.action}:n("#var_import_table").DataTable().rows({selected:!0}).every((function(){let t=this.data();a[t.name]={action:t.action}})),a=JSON.stringify(a),n.post("api/"+session_id+"/store_table",{rows:a},(function(t){e.LoadingOverlay("hide",!0),!1===t.success&&alert(t.errormsg)}))}n(document).ready((function(){let t=n("#var_import_table").DataTable({paging:!0,stateSave:!0,select:{style:"os",selector:"td:first-child"},pageLength:200,responsive:!0,lengthMenu:[[10,50,100,500,-1],[10,50,100,500,"All"]],dom:'rt<"container"<"row"<"col-md-6"li><"col-md-6"p>>>',ajax:"api/"+session_id+"/get_table_data",deferRender:!0,rowId:"name",columns:[{orderable:!1,className:"select-checkbox",targets:[0],data:null,defaultContent:""},{data:function(t,e,a,n){return t},targets:[1],orderable:!1,render:function(t,e,a,n){return'<div class="btn-group" role="group" aria-label="Basic example"><button type="button" data-action="skip" class="skip-btn btn btn-secondary'+("skipped"===t.action?" active":"")+'">Skip</button><button type="button" data-action="source" class="source-btn btn btn-secondary'+("source"===t.action?" active":"")+'">Source</button><button type="button" data-action="target" class="target-btn btn btn-secondary'+("target"===t.action?" active":"")+'">Target</button><button type="button" data-action="custom" class="custom-btn btn btn-secondary'+("custom"===t.action?" active":"")+'">Custom</button></div>'}},{data:function(t,e,a,n){return t},targets:[1],render:function(t,e,a,n){let o="";const r=void 0!==t.source.name,s=void 0!==t.target.name;return r&&s?(o+='<span class="badge badge-info">match_in_source_and_target</span>',t.source.type!==t.target.type?o+='<span class="badge badge-info">unmatched_types</span>':o+='<span class="badge badge-info">same_types</span>'):(r||(o+='<span class="badge badge-info">no_match_in_source</span>'),s||(o+='<span class="badge badge-info">no_match_in_target</span>')),r&&t.source.constraints.length>0&&(o+='<span class="badge badge-info">source_has_constraints</span>'),s&&t.target.constraints.length>0&&(o+='<span class="badge badge-info">target_has_constraints</span>'),o}},{data:function(t,e,a,n){return t.source},targets:[3],render:function(t,e,a,n){let o="";return o=void 0!==t.name?'<p class="var_link" data-type="source" style="cursor: pointer"><code>'+t.name+'</code> <span class="badge badge-info">'+t.type+"</span></p>":"No match.",o}},{data:function(t,e,a,n){return t.target},targets:[4],order:"asc",render:function(t,e,a,n){let o="";return o=void 0!==t.name?'<p class="var_link" data-type="target" style="cursor: pointer"><code>'+t.name+'</code><span class="badge badge-info">'+t.type+"</span>":"No match.",o}},{data:function(t,e,a,n){return t.result},targets:[5],render:function(t,e,a,n){let o="";return o=void 0!==t.name?'<p class="var_link" data-type="result" style="cursor: pointer"><code>'+t.name+'</code><span class="badge badge-info">'+t.type+"</span>":"Skipped.",o}}],infoCallback:function(t,e,a,o,r,s){var i=this.api().page.info();n("#clear-all-filters-text").html("Showing "+r+"/"+i.recordsTotal+". Clear all.");let l="Showing "+e+" to "+a+" of "+r+" entries";return l+=" (filtered from "+i.recordsTotal+" total entries).",l},initComplete:function(){n("#search_bar").val(l),d(),n.fn.dataTable.ext.search.push((function(t,e,a){return function(t){return i.evaluate(t,c)}(e)})),this.api().draw()}});new n.fn.dataTable.ColReorder(t,{}),n("#search_bar").keypress((function(e){13===e.which&&(d(),t.draw())}));let e=n("#var_import_table tbody");e.on("click",".var_link",(function(e){e.preventDefault();let a=t.row(n(this).parents("tr")).data(),s=n(this).attr("data-type");!function(t,e,a){let s=n("#variable_modal"),i=n("#variable_value_form_group"),l=n(".enum-controls"),c=n("#constraints_container"),d=Object(),u=n("#variable_type"),p=n("#variable_value"),b=n("#save_variable_modal"),g="";u.prop("disabled",!0),p.prop("disabled",!0),b.hide(),r=!1,"source"===a?(d=t.source,g="Source Variable:"):"target"===a?(d=t.target,g="Target Variable:"):"result"===a&&(g="Resulting Variable:",d=t.result,u.prop("disabled",!1),p.prop("disabled",!1),b.show()),u.autocomplete({minLength:0,source:o}).on("focus",(function(){n(this).keydown()})),n("#variable_modal_title").html(g+" <code>"+t.name+"</code>"),b.attr("data-name",t.name),u.val(d.type),i.hide(),l.hide(),c.hide(),"CONST"===d.type||"ENUMERATOR"===d.type?(i.show(),p.val(d.const_val)):"ENUM"===d.type&&(l.show(),n("#enumerators").html(""),function(t,e){let a=n("#enumerators");a.html("");let o="";e.rows().every((function(){let e=this.data();t.length<e.name.length&&e.name.startsWith(t)&&void 0!==e.result.name&&(o+="<p><code>"+e.name+"</code> : <code>"+e.result.const_val+"</code></p>")})),a.html(o)}(d.name,e)),function(t,e,a,o){function r(t,e=!1,a="none"){let n="";for(var o in t){let r=t[o];if(r.origin===a)if(e){let t="",e="";r.to_result?(t="Included in result (click to toggle).",e="btn-success"):(t="Not Included in result (click to toggle).",e="btn-secondary"),n+='<div class="constraint-element">',n+='<button type="button" data-type="'+a+'" data-constrid="'+r.id+'" class="btn '+e+' btn-sm constraint-handle">'+t+"</button>",n+="<pre>"+r.constraint+"</pre>",n+="</div>"}else n+="<pre>"+r.constraint+"</pre>"}return n}let s=n("#constraints_list"),i="";"result"===o?(void 0!==t.target.constraints&&t.target.constraints.length>0&&(i+="<h6>From Target</h6>",i+=r(t.available_constraints,!0,"target")),void 0!==t.source.constraints&&t.source.constraints.length>0&&(i+="<h6>From Source</h6>",i+=r(t.available_constraints,!0,"source"))):i+=r(t.available_constraints,!1,o),s.html(i),a.show()}(t,0,c,a),n(".constraint-handle").click((function(){r=!0;let a=n(this).attr("data-constrid"),o=n(this).closest("div").find("pre"),s=e.row("#"+t.name),i=s.data();o.effect("highlight",{color:"green"},800),n(this).toggleClass("btn-success"),n(this).toggleClass("btn-secondary"),n(this).hasClass("btn-success")?(n(this).html("Included in result (click to toggle)."),i.available_constraints[a].to_result=!0):(n(this).html("Not Included in result (click to toggle)."),i.available_constraints[a].to_result=!1),s.data(i)})),s.modal("show")}(a,t,s)})),n("#save_variable_modal").click((function(){let e=n(this).attr("data-name");!function(t,e){let a=n("#variable_modal"),o=n("#variable_type").val(),s=n("#variable_value").val(),i=e.data(),l=!1;i.result.type!==o&&(l=!0,i.result.type=o),"CONST"!==i.result.type&&"ENUMERATOR"!==i.result.type||i.result.const_val===s||(l=!0,i.result.const_val=s),l||r?(i.action="custom",a.LoadingOverlay("show"),n.post("api/"+session_id+"/store_variable",{row:JSON.stringify(i)},(function(t){a.LoadingOverlay("hide",!0),!1===t.success?alert(t.errormsg):(e.data(i).draw("full-hold"),a.modal("hide"),n(e.node()).effect("highlight",{color:"green"},800))}))):a.modal("hide")}(0,t.row("#"+e))})),n("#variable_type").on("change, focusout, keyup",(function(){let t=n("#variable_value_form_group");["CONST","ENUMERATOR"].includes(n(this).val())?t.show():t.hide()})),e.on("click",".target-btn, .source-btn, .skip-btn",(function(e){e.preventDefault(),u(t.row(n(this).parents("tr")),n(this).attr("data-action"))})),n(".select-all-button").on("click",(function(e){n(this).hasClass("btn-secondary")?t.rows({page:"current"}).select():t.rows({page:"current"}).deselect(),n(".select-all-button").toggleClass("btn-secondary btn-primary")})),n(".action-btn").click((function(e){!function(t,e){t.rows({selected:!0}).every((function(){u(this,e,!1,!1)})),p()}(t,n(this).attr("data-action"))})),n("#delete_session_button").confirmation({rootSelector:"#delete_session_button"}),n(".tools-btn").click((function(t){var e;"apply-import"===(e=n(this).attr("data-action"))&&function(t){let e=n("body");e.LoadingOverlay("show"),n.post("api/"+session_id+"/apply_import",{},(function(t){e.LoadingOverlay("hide",!0),!1===t.success?alert(t.errormsg):alert("Imported result variables.")}))}(),"delete-session"===e&&function(){let t=n("body");t.LoadingOverlay("show"),n.post("api/"+session_id+"/delete_me",{id:session_id},(function(e){t.LoadingOverlay("hide",!0),!1===e.success?alert(e.errormsg):window.location.href=base_url+"variables"}))}()})),t.on("user-select",(function(){let t=n(".select-all-button");t.removeClass("btn-primary"),t.addClass("btn-secondary ")})),n(".clear-all-filters").click((function(){n("#search_bar").val("").effect("highlight",{color:"green"},500),d(),t.draw()}))}))}},a={};function n(t){var o=a[t];if(void 0!==o)return o.exports;var r=a[t]={id:t,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.exports}n.m=e,t=[],n.O=(e,a,o,r)=>{if(!a){var s=1/0;for(d=0;d<t.length;d++){for(var[a,o,r]=t[d],i=!0,l=0;l<a.length;l++)(!1&r||s>=r)&&Object.keys(n.O).every((t=>n.O[t](a[l])))?a.splice(l--,1):(i=!1,r<s&&(s=r));if(i){t.splice(d--,1);var c=o();void 0!==c&&(e=c)}}return e}r=r||0;for(var d=t.length;d>0&&t[d-1][2]>r;d--)t[d]=t[d-1];t[d]=[a,o,r]},n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.j=229,(()=>{var t={229:0};n.O.j=e=>0===t[e];var e=(e,a)=>{var o,r,[s,i,l]=a,c=0;if(s.some((e=>0!==t[e]))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(l)var d=l(n)}for(e&&e(a);c<s.length;c++)r=s[c],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(d)},a=self.webpackChunkhanfor=self.webpackChunkhanfor||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))})();var o=n.O(void 0,[351],(()=>n(703)));o=n.O(o)})();