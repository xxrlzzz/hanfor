!function(a){function e(e){for(var l,o,s=e[0],i=e[1],c=e[2],d=0,u=[];d<s.length;d++)o=s[d],r[o]&&u.push(r[o][0]),r[o]=0;for(l in i)Object.prototype.hasOwnProperty.call(i,l)&&(a[l]=i[l]);for(_&&_(e);u.length;)u.shift()();return n.push.apply(n,c||[]),t()}function t(){for(var a,e=0;e<n.length;e++){for(var t=n[e],l=!0,s=1;s<t.length;s++){var i=t[s];0!==r[i]&&(l=!1)}l&&(n.splice(e--,1),a=o(o.s=t[0]))}return a}var l={},r={3:0},n=[];function o(e){if(l[e])return l[e].exports;var t=l[e]={i:e,l:!1,exports:{}};return a[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=a,o.c=l,o.d=function(a,e,t){o.o(a,e)||Object.defineProperty(a,e,{configurable:!1,enumerable:!0,get:t})},o.r=function(a){Object.defineProperty(a,"__esModule",{value:!0})},o.n=function(a){var e=a&&a.__esModule?function(){return a.default}:function(){return a};return o.d(e,"a",e),e},o.o=function(a,e){return Object.prototype.hasOwnProperty.call(a,e)},o.p="";var s=window.webpackJsonp=window.webpackJsonp||[],i=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var _=i;n.push([214,0]),t()}({214:function(a,e,t){(function(a){t(19),t(12),t(18),t(17),t(152),t(16),t(15);let e=sessionStorage.getItem("var_search_string");var l=["CONST"];function r(e){!0===e?a("#variable_value_form_group").hide():a("#variable_value_form_group").show()}function n(e,t=!1){let l=a("body");l.LoadingOverlay("show");let r=a("#multi-change-type-input").val().trim(),n=[];e.rows({selected:!0}).every(function(){let a=this.data();n.push(a.name)}),a.post("api/var/multi_update",{change_type:r,selected_vars:JSON.stringify(n),del:t},function(a){l.LoadingOverlay("hide",!0),!1===a.success?alert(a.errormsg):location.reload()})}a(document).ready(function(){variables_table=a("#variables_table"),tags_datatable=variables_table.DataTable({paging:!0,stateSave:!0,select:{style:"os",selector:"td:first-child"},pageLength:50,responsive:!0,lengthMenu:[[10,50,100,500,-1],[10,50,100,500,"All"]],dom:'rt<"container"<"row"<"col-md-6"li><"col-md-6"p>>>',ajax:"api/var/gets",deferRender:!0,columns:[{orderable:!1,className:"select-checkbox",targets:[0],data:null,defaultContent:""},{data:"name",targets:[1],render:function(a,e,t,l){return result='<a class="modal-opener" href="#">'+a+"</span></br>",result}},{data:"type",targets:[2],render:function(a,e,t,r){return null!==a&&l.indexOf(a)<=-1&&l.push(a),null!==a&&"CONST"===a&&(a=a+" ("+t.const_val+")"),a}},{data:"used_by",targets:[3],render:function(e,t,l,r){return result="",a(e).each(function(a,e){e.length>0&&(search_query="?command=search&col=2&q="+e,result+='<span class="badge badge-info"><a href="'+base_url+search_query+'" target="_blank">'+e+"</a></span>")}),result.length<1&&(result+='<span class="badge badge-warning"><a href="#">Not used</a></span></br>'),result}},{data:"used_by",targets:[4],visible:!1,searchable:!1,render:function(e,t,l,r){return result="",a(e).each(function(a,e){e.length>0&&(result.length>1&&(result+=", "),result+=e)}),result}}],initComplete:function(){a("#search_bar").val(e)}}),tags_datatable.column(3).visible(!0),tags_datatable.column(4).visible(!1),a("#search_bar").keyup(function(){tags_datatable.search(a(this).val()).draw(),sessionStorage.setItem("var_search_string",a(this).val())}),variables_table.find("tbody").on("click","a.modal-opener",function(e){e.preventDefault();var t=tags_datatable.row(a(e.target).parent()).data(),n=tags_datatable.row(a(e.target).parent()).index();tag_modal_content=a(".modal-content"),a("#variable_value_form_group").hide(),a("#variable_modal").modal("show"),a("#modal_associated_row_index").val(n),a("#variable_name_old").val(t.name),a("#variable_type_old").val(t.type),a("#occurences").val(t.used_by),a("#variable_modal_title").html("Variable: "+t.name),a("#variable_name").val(t.name),type_input=a("#variable_type"),type_input.val(t.type),"CONST"===t.type?(r(),a("#variable_value").val(t.const_val),a("#variable_value_old").val(t.const_val)):(a("#variable_value").val(""),a("#variable_value_old").val("")),type_input.autocomplete({minLength:0,source:l}).on("focus",function(){a(this).keydown()}),tag_modal_content.LoadingOverlay("hide")}),a("#save_variable_modal").click(function(){tags_datatable,tag_modal_content=a(".modal-content"),tag_modal_content.LoadingOverlay("show"),var_name=a("#variable_name").val(),var_name_old=a("#variable_name_old").val(),var_type=a("#variable_type").val(),var_type_old=a("#variable_type_old").val(),associated_row_id=parseInt(a("#modal_associated_row_index").val()),occurences=a("#occurences").val(),const_val=a("#variable_value").val(),const_val_old=a("#variable_value_old").val(),null!==var_type&&l.indexOf(var_type)<=-1&&l.push(var_type),a.post("api/var/update",{name:var_name,name_old:var_name_old,type:var_type,const_val:const_val,const_val_old:const_val_old,type_old:var_type_old,occurences:occurences},function(e){tag_modal_content.LoadingOverlay("hide",!0),!1===e.success?alert(e.errormsg):e.rebuild_table?location.reload():(tags_datatable.row(associated_row_id).data(e.data).draw(),a("#variable_modal").modal("hide"))})}),a("#variable_type").on("keyup change autocompleteclose",function(){"CONST"===a(this).val()?r():r(revert=!0)}),a(".import_link").on("click",function(){!function(e,t){let l=a("#variable_import_modal");a("#variable_import_sess_name").val(e),a("#variable_import_sess_revision").val(t),a("#variable_import_modal_title").html("Import from Session: "+e+" at: "+t),l.modal("show"),l.LoadingOverlay("show"),a.post("api/var/var_import_info",{sess_name:e,sess_revision:t},function(e){l.LoadingOverlay("hide",!0),!1===e.success?alert(e.errormsg):(a("#import_tot_number").html("Total:\t"+e.tot_vars+" Variables."),a("#import_new_number").html("New:\t"+e.new_vars+" Variables."))})}(a(this).attr("data-name"),a(this).attr("data-revision"))}),a("#save_variable_import_modal").click(function(e){!function(){let e=a("#variable_import_modal"),t=a("#variable_import_sess_name").val(),l=a("#variable_import_sess_revision").val(),r=a("#import_option").val();e.LoadingOverlay("show"),a.post("api/var/var_import_collection",{sess_name:t,sess_revision:l,import_option:r},function(a){e.LoadingOverlay("hide",!0),!1===a.success?alert(a.errormsg):(e.modal("hide"),location.reload())})}()}),a(".select-all-button").on("click",function(e){a(this).hasClass("btn-secondary")?tags_datatable.rows({page:"current"}).select():tags_datatable.rows({page:"current"}).deselect(),a(".select-all-button").toggleClass("btn-secondary btn-primary")}),tags_datatable.on("user-select",function(){let e=a(".select-all-button");e.removeClass("btn-primary"),e.addClass("btn-secondary ")}),a("#multi-change-type-input").autocomplete({minLength:0,source:l,delay:100}).on("focus",function(){a(this).keydown()}).val(""),a(".apply-multi-edit").click(function(){n(tags_datatable)}),a(".delete_button").confirmation({rootSelector:".delete_button"}).click(function(){n(tags_datatable,del=!0)})})}).call(this,t(3))}});