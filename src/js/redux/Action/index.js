import { PLAYERSTEATESHIFT,REQUESTSONG,RECEIVESONG,
         SONGTIMEUPDATE,VOLUMEUPDATE,CHANGEPLAYMODE } from '../../Constants/ActionType.js'
import { REQUESTLYRIC,RECEIVELYRIC,FAILLYRIC } from '../../Constants/ActionType.js'
import { REQUESTCHANNELLIST,RECEIVECHANNELLIST,SHOWCHANNELLIST,FAILQUERYCHANNELLIST } from '../../Constants/ActionType.js';
import { UPDATEPLAYLIST,UPDATEPLAYLISTINDEX,CLEARALLPLAYLIST,
         SHOWPLAYLIST,UPDATEPLAYLISTSONG } from '../../Constants/ActionType.js'
import { UPDATELOCALLIST,DELETEFROMLOCALLIST } from '../../Constants/ActionType.js'
import { KEYWORDCHANGE,REQUESTKEYWORDQUERY,
         RECEIVEKEYWORDQUERY,KEYWORDQUERYFAIL } from '../../Constants/ActionType.js'
import fetchJSONP from 'fetch-jsonp'
import fetch from 'isomorphic-fetch'
import { CONFIG } from '../../Constants/Config'
import { offsetLeft,trim,formatLrc,filter,getIndex,StorageSetter } from '../../util/tool.js';

function requestChannelList(channel_type) {
    return {
        isFetching: true,
        type: REQUESTCHANNELLIST,
        channel_type: channel_type
    }
}

