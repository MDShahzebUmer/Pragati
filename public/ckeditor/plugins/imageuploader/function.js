﻿function showImage(a,b){$("#imageFSimg").attr("src",a);$("#imageFSimg").attr("style","max-width:"+b+"px");$("#imageFullSreen").show();$("#background").slideDown(250,"swing");$("#imgActionUse").attr("onclick","useImage('"+a+"')");$("#imgActionDelete").attr("onclick","window.location.href \x3d 'imgdelete.php?img\x3d"+a+"'");$("#imgActionDownload").attr("href",a)}
function showEditBar(a,b,c){$("#editbar").slideUp(100);$("#editbar").slideDown(100);$(".fileDiv,.fullWidthFileDiv").removeClass("selected");$("div[data-imgid\x3d'"+c+"']").addClass("selected");$("#updates").css("visibility","hidden");$("#updates").slideUp(150);$("#editbarDelete").attr("onclick","deleteImg('"+a+"', '"+c+"');");$("#editbarUse").attr("onclick","useImage('"+a+"')");$("#editbarView").attr("onclick","showImage('"+a+"','"+b+"')");$("#editbarDownload").attr("href",a)}
$(document).mouseup(function(a){var b=$(".fileDiv,.fullWidthFileDiv,#editbar");b.is(a.target)||0!==b.has(a.target).length||hideEditBar()});function hideEditBar(){$("#editbar").slideUp(100);$(".fileDiv,.fullWidthFileDiv").removeClass("selected");currentpluginver!=pluginversion&&($("#updates").slideDown(150),$("#updates").css("visibility","visible"))}
function useImage(a){var b=window.location.search.match(/(?:[?&]|&)CKEditorFuncNum=([^&]+)/i);window.opener.CKEDITOR.tools.callFunction(b&&1<b.length?b[1]:null,"ckeditor/plugins/imageuploader/"+a);window.close()}function uploadImg(){$("#uploadImgDiv").show();$("#background2").slideDown(250,"swing")}function pluginSettings(){$("#settingsDiv").show();$("#background3").slideDown(250,"swing")}
$(document).ready(function(){currentpluginver!=pluginversion&&($("#updates").show(),$("#updates").html("A new version of "+pluginname+" ("+pluginversion+') is available. \x3ca target\x3d"_blank" href\x3d"'+plugindwonload+'"\x3eDownload it now!\x3c/a\x3e'))});$(function(){$("img.lazy").lazyload()});
$(document).ready(function(){$("#uploadpathEditable").attr("contenteditable","true");$("#uploadpathEditable").click(function(){$(this).addClass("editableActive");$(".saveUploadPathA").fadeIn();$(".saveUploadPathP").show();$(".pathHistory").fadeIn()});$("#pathCancel").click(function(){$("#uploadpathEditable").removeClass("editableActive");$(".saveUploadPathA").hide();$(".saveUploadPathP").hide();$(".pathHistory").hide()})});
function updateImagePath(){var a=$("#uploadpathEditable").text();$.ajax({method:"POST",url:"pluginconfig.php",data:{newpath:a}}).done(function(a){location.reload()})}function useHistoryPath(a){$.ajax({method:"POST",url:"pluginconfig.php",data:{newpath:a}}).done(function(a){location.reload()})}function extensionSettings(a){$.ajax({method:"POST",url:"pluginconfig.php",data:{extension:a}}).done(function(a){location.reload()})}
function checkUpload(){if(0==document.getElementById("upload").files.length)return alert("Please select a file to upload."),!1}function toggleQEditIcons(){$(".fullWidthlastChild, .qEditIconsDiv").toggle()}function toogleQEditMode(){$("#qEditBtnOpen").is(":visible")?Cookies.set("qEditMode","yes"):Cookies.remove("qEditMode");toggleQEditIcons();$("#qEditBtnDone, #qEditBtnOpen").slideToggle()}$(document).ready(function(){"yes"==Cookies.get("qEditMode")&&toogleQEditMode()});
function drop(a){a.preventDefault();if((a=a.dataTransfer.files[0])&&a.type.match("image/*")){var b=new FormData;b.append("upload",a);var c=new XMLHttpRequest;c.open("POST","imgupload.php");c.send(b);c.onreadystatechange=function(){4==c.readyState&&200==c.status&&(hideEditBar(),reloadImages(),setTimeout(function(){$("#dropzone").slideUp(450,"swing")},50))}}}function toggleDropzone(a){var b=$("#dropzone");"show"==a?b.show():b.hide()}
$(document).ready(function(){$("#dropzone").click(function(){setTimeout(function(){toggleDropzone("hide")},500)})});function deleteImg(a,b){$.ajax({method:"GET",url:"imgdelete.php",data:{img:a}}).done(function(){var a=$("div[data-imgid\x3d'"+b+"']");"block"==Cookies.get("file_style")?a.addClass("deleteAnimationBlock"):a.slideUp(250,"swing");setTimeout(function(){a.hide();hideEditBar();reloadImages()},320)})}
function reloadImages(){$.ajaxSetup({cache:!1});$("#files").load("function.php?f\x3dloadImages",function(a,b,c){$("img.lazy").lazyload()})}
$(document).keyup(function(a){if(37==a.keyCode||38==a.keyCode){var b=$(".selected").data("imgid");"undefined"===typeof b&&(b=2);b=--b;$("div[data-imgid\x3d'"+b+"']").trigger("click")}if(39==a.keyCode||40==a.keyCode)b=$(".selected").data("imgid"),"undefined"===typeof b&&(b=0),b=++b,$("div[data-imgid\x3d'"+b+"']").trigger("click");32==a.keyCode&&($("#imageFullSreen").is(":visible")?$("#imageFullSreenClose").trigger("click"):(b=$(".selected").data("imgid"),"undefined"!==typeof b&&$("#editbarView").trigger("click")))});