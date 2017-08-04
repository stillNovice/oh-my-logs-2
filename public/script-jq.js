globalDir = '.';

function callDirApi() {
    $.get('v1/getDirectoryData', {url: globalDir}, (data) => {
        
        $('#myDiv').empty();

        let str = '<thead><tr><th>Name</th><th>Type</th></tr></thead><tbody>';

        let i = 1;
        for (let val of data) {
            str += '<tr>';

            str += '<td id=td' + i + 
            '> <a href="#" onclick=onClickFunc(); tempName="' + val.name + '" tempType="' + val.type + 
            '">' + val.name + '</a> </td>';

            let typeUrl;
            if(val.type == 'file') {
                typeUrl = '/file_img.png';
            } else {
                typeUrl = '/folder_img.jpg';
            }
            i ++;

            str += '<td> <img src="' + typeUrl + '" height="25px" width="25px" onclick=onClickFunc(); tempName="' +              val.name + '" tempType="' + val.type + '"/> </td>';
            str += '</tr>';
        }

        str += '</tbody>';
        $('#myDiv').append(str);
    });
}

callDirApi();

function callFileApi() {
    $.get('v1/getFileData', {url: globalDir}, (data) => {
        $('#myDiv').empty();
        $('#fileDiv').empty();
        $('#fileDiv').text(data);
    });
}

function onClickFunc() {
    if(event.target.getAttribute('tempType') === 'dir') {
        globalDir += '/' + event.target.getAttribute('tempName');
        callDirApi();
    } else {
        globalDir += '/' + event.target.getAttribute('tempName');
        callFileApi();
    }
}

$('#btn-back').click(function() {
    $('#fileDiv').empty();
    
    var globalDriArr = [];

    if(globalDir == '.') {
        return;
    }

    globalDirArr = globalDir.split('/');
    globalDirArr.pop();
    globalDir = globalDirArr.join('/');
    callDirApi();
});