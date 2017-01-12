import React, { Component } from 'react'
import { Router,Route,IndexRoute,useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import NProgress from 'ngrogress'
import App from '../Containers/App'
import LocalList from '../Containers/LocalList'

var appHistory = useRouterHistory(createHashHistory({ queryKey: false }));


/*按需加载组件
* require.ensure(dependencies, callback, chunkName)
 这是 webpack 提供的方法，这也是按需加载的核心方法。第一个参数是依赖，第二个是回调函数，
 第三个就是上面提到的 chunkName，用来指定这个 chunk file 的 name
* */


let Channel = (location, cb) => {
    require.ensure([],require => {
        cb(null,require('../Containers/Channel.js').default)
    }, 'channel')
}

let Search = (location, cb) => {
    require.ensure([],require => {
        cb(null,require('../Containers/Search.js').default)
    },'search')
}

let Lyric = (location,cb) => {
    require.ensure([],require => {
        cb(null,require('../Containers/Lyric.js').default)
    } ,'lyric')
}

/*设计多重路由, 主页LocalList*/
const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={LocalList} />
        <Route path="/locallist" component={LocalList} />
        <Route path="/search" getComponent={Search} />
        <Route path="/channel/:id" getComponent={Channel} />
        <Route path="/lyric" getComponent={Lyric} />
    </Route>
)

export default class Root extends Component {
    render(){
        return <Router history={appHistory} routes={routes} />
    }
}