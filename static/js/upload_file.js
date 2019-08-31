$(function () {
   $("#upload_btn").on("click",function () {
       alert("hello");
       console.log("hellow");
       var upload_file = $("#upload_file")[0].files[0];
       alert(upload_file);
       if(!upload_file){
           alert("未选择文件");
           return false;
       }else{
           var form_data = new FormData();
           form_data.append("upload_file",upload_file);
           $.ajax({
               url:"./",
               data:form_data,
               type:"post",
               dataType:"json",
               async:"false",
               processData:false,
               contentType:false,
               success:function (data,status,xhr) {
                   alert(data.result);
                   if(data.result){
                       alert("文件上传成功");
                   }else{
                       alert("文件上传失败");
                   }
               },
               error:function (status,xhr,error) {
                   return false;
               }
           })
       }

   })
});