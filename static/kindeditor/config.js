KindEditor.ready(function(K) {
                K.create('textarea[name=content]',{
                    width:'800px',
                    height:'800px',
                    uploadJson: '/admin/upload/kindeditor',
                    filterMode: false,
                });
        });