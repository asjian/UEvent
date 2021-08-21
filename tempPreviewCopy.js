const imageUpload = () => {
        if(values.EventImage != '') {
            let localUri = values.EventImage;
            let filename = localUri.split('/').pop();
    
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            let formData = new FormData();
            formData.append('file', { uri: localUri, name: filename, type });
            formData.append('eventId',postedEvent.id);
            console.log('Image FormData:');
            console.log(formData);

            fetch('http://47.252.19.227/EventHub/fileuploader', {
                method: 'post',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },          
            }).then((response) => response.text())
            .then((text) => {
                console.log(text);
            })
            .catch((error) => {console.log('IMAGE UPLOAD ERROR');console.error(error);});
        }
        else {

        }
    }
