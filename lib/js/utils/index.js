import rwx from 'reqwest-without-xhr2'


export const setTitle = title => {
    document.title = title;
    let iframe = document.createElement('iframe');
    iframe.src = '/lib/images/msg-bar.png'
    iframe.style.display = 'none'
    iframe.onload = () => {
        setTimeout(() => {
            document.body.removeChild(iframe);
        })
    }
    document.body.appendChild(iframe);
}

export const $post = (url, data) => {
    return rwx({
        url,
        type: 'json',
        method: 'post',
        data
    })
}


export const $get = (url) => {
    return rwx({
        url,
        type: 'json',
        method: 'get'
    })
}

export const trigger = function (type) {
    var event;
    event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    this.dispatchEvent(event);
}

export const isWX = () => {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
