!function(e){function a(a){for(var n,l,c=a[0],s=a[1],d=a[2],u=0,_=[];u<c.length;u++)l=c[u],o[l]&&_.push(o[l][0]),o[l]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);for(i&&i(a);_.length;)_.shift()();return r.push.apply(r,d||[]),t()}function t(){for(var e,a=0;a<r.length;a++){for(var t=r[a],n=!0,c=1;c<t.length;c++){var s=t[c];0!==o[s]&&(n=!1)}n&&(r.splice(a--,1),e=l(l.s=t[0]))}return e}var n={},o={1:0},r=[];function l(a){if(n[a])return n[a].exports;var t=n[a]={i:a,l:!1,exports:{}};return e[a].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.m=e,l.c=n,l.d=function(e,a,t){l.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,a){if(1&a&&(e=l(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var n in e)l.d(t,n,function(a){return e[a]}.bind(null,n));return t},l.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(a,"a",a),a},l.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},l.p="";var c=window.webpackJsonp=window.webpackJsonp||[],s=c.push.bind(c);c.push=a,c=c.slice();for(var d=0;d<c.length;d++)a(c[d]);var i=s;r.push([157,0]),t()}({157:function(e,a,t){(function(e){t(17),t(10),t(15),t(14),t(13),t(12);let a=sessionStorage.getItem("tag_search_string");e(document).ready(function(){tags_table=e("#tags_table"),tags_datatable=tags_table.DataTable({paging:!0,stateSave:!0,pageLength:50,responsive:!0,lengthMenu:[[10,50,100,500,-1],[10,50,100,500,"All"]],dom:'rt<"container"<"row"<"col-md-6"li><"col-md-6"p>>>',ajax:"api/tag/gets",deferRender:!0,columns:[{data:"name",render:function(e,a,t,n){return result='<a class="modal-opener" href="#">'+e+"</span></br>",result}},{data:"used_by",render:function(a,t,n,o){return result="",e(a).each(function(e,a){a.length>0&&(search_query="?command=search&col=2&q="+a,result+='<span class="badge" style="background-color: '+n.color+'"><a href="'+base_url+search_query+'" target="_blank">'+a+"</a></span>")}),result}},{data:"used_by",visible:!1,searchable:!1,render:function(a,t,n,o){return result="",e(a).each(function(e,a){a.length>0&&(result.length>1&&(result+=", "),result+=a)}),result}}],initComplete:function(){e("#search_bar").val(a)}}),tags_datatable.column(2).visible(!1),e("#search_bar").keyup(function(){tags_datatable.search(e(this).val()).draw(),sessionStorage.setItem("tag_search_string",e(this).val())}),tags_table.find("tbody").on("click","a.modal-opener",function(a){a.preventDefault();let t=tags_datatable.row(e(a.target).parent()).data(),n=tags_datatable.row(e(a.target).parent()).index();tag_modal_content=e(".modal-content"),e("#tag_modal").modal("show"),e("#modal_associated_row_index").val(n),e("#tag_name_old").val(t.name),e("#occurences").val(t.used_by),e("#tag_modal_title").html("Tag: "+t.name),e("#tag_name").val(t.name),e("#tag_color").val(t.color),tag_modal_content.LoadingOverlay("hide")}),e("#save_tag_modal").click(function(){!function(a){tag_modal_content=e(".modal-content"),tag_modal_content.LoadingOverlay("show"),tag_name=e("#tag_name").val(),tag_name_old=e("#tag_name_old").val(),occurences=e("#occurences").val(),tag_color=e("#tag_color").val(),associated_row_id=parseInt(e("#modal_associated_row_index").val()),e.post("api/tag/update",{name:tag_name,name_old:tag_name_old,occurences:occurences,color:tag_color},function(t){tag_modal_content.LoadingOverlay("hide",!0),!1===t.success?alert(t.errormsg):t.rebuild_table?location.reload():(a.row(associated_row_id).data(t.data).draw(),e("#tag_modal").modal("hide"))})}(tags_datatable)}),e(".delete_tag").confirmation({rootSelector:".delete_tag"}).click(function(){e(this).attr("name"),tag_modal_content=e(".modal-content"),tag_modal_content.LoadingOverlay("show"),tag_name=e("#tag_name").val(),occurences=e("#occurences").val(),e.post("api/tag/del_tag",{name:tag_name,occurences:occurences},function(a){tag_modal_content.LoadingOverlay("hide",!0),!1===a.success?alert(a.errormsg):a.rebuild_table?location.reload():(tags_datatable.row(associated_row_id).data(a.data).draw(),e("#tag_modal").modal("hide"))})})})}).call(this,t(3))}});