<template>
  <div>
    <script :id="id" type="text/plain" ></script>
  </div>
</template>

<script>
  import '../../assets/ueditor/ueconfig'
  import '../../assets/ueditor/ueditor.all'
  import '../../assets/ueditor/zh-cn'
  
  const CONFIG = {
    toolbars: [
      ['undo', 'redo', '|', 'fontsize', '|', 'blockquote', 'horizontal', '|', 'formatmatch', 'removeformat', '|', 'link', 'unlink', '|', 'inserttable', 'deletetable', 'insertframe',],
      ['bold', 'italic', 'underline', 'forecolor', 'backcolor', '|', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter',]
    ],
    insertorderedlist: {
      decimal: "",
      "lower-alpha": "",
      "lower-roman": "",
      "upper-alpha": "",
      "upper-roman": ""
    },
    insertunorderedlist: {
      circle: "", // '○ 小圆圈'
      disc: "", // '● 小圆点'
      square: "" //'■ 小方块'
    },
    imagePopup: false,
    saveInterval: 1000000,
    initialFrameHeight: 500,
    autoHeightEnabled: false,
    autoFloatEnabled: true,
    enableAutoSave: false
  };
  export default {
    name: "UEditor",
    props: {
      id: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: '请输入内容...'
      },
      config: {
        type: Object,
        default: () => {
          return CONFIG
        }
      }
    },
    data() {
      return {
        editor: null
      }
    },
    mounted () {
      this.initUEditor()
    },
    methods:{
      getUEContent: function(){
        return this.editor.getContent();
      },
      insertImage(appendHtml) {
        this.editor.execCommand("inserthtml", appendHtml)
      },
      insertVideo(appendHtml) {
        this.editor.execCommand("inserthtml", appendHtml)
      },
      initUEditor () {
        const that = this;
        UE.registerUI(
          "图片上传",
          function(editor, uiName) {
            //注册按钮执行时的command命令，使用命令默认就会带有回退操作
            editor.registerCommand(uiName, {
              execCommand: () => {
                that.$emit('uploadImg', that.id)
              }
            });
            //创建一个button
            var btn = new UE.ui.Button({
              //按钮的名字
              name: uiName,
              //提示
              title: uiName,
              //添加额外样式，指定icon图标，这里默认使用一个重复的icon
              cssRules: "background-position: -380px 0",
              //点击时执行的命令
              onclick: function() {
                //这里可以不用执行命令,做你自己的操作也可
                editor.execCommand(uiName);
              }
            });
            //当点到编辑内容上时，按钮要做的状态反射
            editor.addListener("selectionchange", function() {
              var state = editor.queryCommandState(uiName);
              if (state == -1) {
                btn.setDisabled(true);
                btn.setChecked(false);
              } else {
                btn.setDisabled(false);
                btn.setChecked(state);
              }
            });
            //因为你是添加button,所以需要返回这个button
            return btn
          },
          6
        );
        UE.registerUI(
          "视频上传",
          function(editor, uiName) {
            //注册按钮执行时的command命令，使用命令默认就会带有回退操作
            editor.registerCommand(uiName, {
              execCommand: function() {
                that.$emit('uploadVideo', that.id)
              }
            });
            //创建一个button
            var btn = new UE.ui.Button({
              //按钮的名字
              name: uiName,
              //提示
              title: uiName,
              //添加额外样式，指定icon图标，这里默认使用一个重复的icon
              cssRules: "background-position: -320px -20px",
              //点击时执行的命令
              onclick: function() {
                //这里可以不用执行命令,做你自己的操作也可
                editor.execCommand(uiName);
              }
            });
            //当点到编辑内容上时，按钮要做的状态反射
            editor.addListener("selectionchange", function() {
              var state = editor.queryCommandState(uiName);
              if (state == -1) {
                btn.setDisabled(true);
                btn.setChecked(false);
              } else {
                btn.setDisabled(false);
                btn.setChecked(state);
              }
            });
            //因为你是添加button,所以需要返回这个button
            return btn;
          },
          7
        );
        this.editor = UE.getEditor(this.id, this.config);
        this.editor.ready( () => {
          this.editor.setContent(this.content)
        })
      }
    }
  }
</script>
