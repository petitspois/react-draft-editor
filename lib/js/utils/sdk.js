import { $post } from './'
import { GET_TICKET } from '../../constants/api'
import {sha1} from './sha1.js';

export default () => {

	var url = window.location.href;
	var timestamp = Math.round((+new Date)/1000);
	var sign = signatrue => {
		wx.config({
			// debug:true,
			appId: 'wx57e637941627aeec',
			timestamp: timestamp,
			nonceStr: 'abcde',
			signature: signatrue,
			jsApiList: [
				'hideOptionMenu',
				'showOptionMenu',
				'onMenuShareQQ',
				'onMenuShareQZone',
				'onMenuShareAppMessage',
				'onMenuShareTimeline',
			]
		});
	}

	$post(GET_TICKET).then( ret => {
		ret = ret.data;
		var signature = "jsapi_ticket=" + ret.ticket + "&noncestr=abcde&timestamp=" + timestamp + "&url=" + url;
		var signatureSHA1 = sha1(signature);
		sign(signatureSHA1);
	});

};
