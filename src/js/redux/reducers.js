import { PLAYERSTEATESHIFT,REQUESTSONG,RECEIVESONG,SONGTIMEUPDATE,VOLUMEUPDATE,CHANGEPLAYMODE } from '../Constants/ActionType.js';
import { REQUESTLYRIC,RECEIVELYRIC,FAILLYRIC } from '../Constants/ActionType.js';
import { REQUESTCHANNELLIST,RECEIVECHANNELLIST,FAILQUERYCHANNELLIST} from '../Constants/ActionType.js';
import { UPDATEPLAYLIST,UPDATEPLAYLISTINDEX,CLEARALLPLAYLIST,SHOWPLAYLIST,UPDATEPLAYLISTSONG } from '../Constants/ActionType.js';
import { UPDATELOCALLIST,DELETEFROMLOCALLIST } from '../Constants/ActionType.js';
import { KEYWORDCHANGE,REQUESTKEYWORDQUERY,RECEIVEKEYWORDQUERY,KEYWORDQUERYFAIL } from '../Constants/ActionType.js';
import objectAssign from 'object-assign';
import { StorageGetter,getIndex} from '../util/tool.js';


const initMusicState = StorageGetter('musicState') || {
        playFlag: false,
        volume: 0.3,
        isFetching: false,
        currentTime: 0,
        song_id: -1,
        title: "",
        author: "",
        album_title:"",
        file_duration: 0,
        pic_small: "",
        pic_big: "",
        song_url: "",
        isFetchingLyric: false,
        lrcContent: [['00:00','选择下一首歌欣赏下']],
    };

const initLocalPlayList = StorageGetter('localPlayList') || {
        length: 0,
        date: '2017-01-01',
        name: '我喜欢的音乐',
        comment: '',
        avator_url: '',
        song_list: []
    };

const initCurPlayList = StorageGetter('curPlayList') || {
        isDisplay: false,
        length: 0,
        mode: 0,
        curIndex: -1,
        song_list:[]
    };
const initChannelPlayList = {
        isFetching: false,
        success: true
}
const initKeyWordSearchList = {
        keyword: '',
        isFetching: false,
        length: 0,
        success: true,
        result: []
}

//播放器Reducer,musicState
export const musicState = (preState = initMusicState,action) => {
        switch (action.type){
            case PLAYERSTEATESHIFT:
                    return objectAssign({},preState,{playFlag:action.playFlag});
            case VOLUMEUPDATE:{
                    return objectAssign({},preState,{volume:action.volume});
            }
            case SONGTIMEUPDATE:{
                    return objectAssign({},preState,{currentTime:action.currentTime});
            }
            case REQUESTSONG:{
                    return objectAssign({},preState,{playFlag:false,
                                                     isFetching:action.isFetching,
                                                     song_id:action.fetchSongId});
            }
            case RECEIVESONG:{
                    if (preState.song_id !== action.fetchSongId){
                            return preState;
                    }
                    return objectAssign({},preState,{
                            isFetching:action.isFetching,
                        song_id:action.fetchSongId,
                        currentTime:0,
                        title:action.item.songinfo.titile,
                        author:action.item.songinfo.author,
                        album_title: action.item.songinfo.album_title,
                        file_duration: action.item.bitrate.file_duration,
                        pic_small: action.item.songinfo.pic_small,
                        pic_big: action.item.songinfo.pic_big,
                        song_url: action.item.bitrate.show_link,
                        lrclink: action.item.songinfo.lrclink,
                    });
            }
            case REQUESTLYRIC:
                    return objectAssign({},preState,{isFetchingLyric:action.isFetchingLyric});
            case RECEIVELYRIC:
                    if(preState.song_id!==action.fetchSongId){
                            return preState
                    }
                    return objectAssign({},preState,{
                            isFetchingLyric:action.isFetchingLyric,
                            lrcContent:action.lrcContent
                    });
            default:
                    return preState;
        }
}

//本地列表 Reducer;localPlaylist
export const localPlayList = (preState = initLocalPlayList,action) => {
        switch (action.type){
            case UPDATELOCALLIST:
                    return objectAssign({},preState,{
                            length:preState.length + action.items.length,
                            song_list:preState.song_list.concat(action.items)
                    });
            case DELETEFROMLOCALLIST:
                    var preSongList = preState.song_list;
                    preSongList.splice(action.index,1);
                    return objectAssign({},preState,{
                            length:preSongList.length,
                        song_list:preSongList
                    })
            default:
                    return preState
        }

}

