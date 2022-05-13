import React, { useEffect } from 'react';
import Slider from '../../components/slider';
import List from '../../components/list';
import Scroll from '../../baseUI/scroll';
import styled from 'styled-components';
// 负责将 ui 组件包装成容器组件
import { connect } from "react-redux";
// 导入常量
import * as actionCreaters from './store/actionCreators';
import {forceCheck} from 'react-lazyload';
import Loading from '../../baseUI/loading/index';


export const Content = styled.div`
  position: fixed;
  top: 2.4rem;
  bottom: 0;
  width: 100%;
  max-width: 750px;
`

function Recommend(props) {
  // 模拟获取的数据
  // 轮播图数据
  // const bannerList = [1, 2, 3, 4].map(item => {
  //   return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg"}
  // })
  // 推荐列表
  // const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
  //   return {
  //       id: index,
  //       picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
  //       playCount: 17171122,
  //       name: "[洗澡时听的歌] 浴室里听歌吹泡泡o○o○o○"
  //   }
  // });

  // 获取数据
  const { bannerList, recommendList, enterLoading } = props;
  // 把 immutable 数据类型转换为对应的 js 数据类型
  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() :[];

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
      getBannerDataDispatch();
      getRecommendListDataDispatch();
      // eslint-disable-next-line
  }, []);
  
  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <List recommendList={recommendListJS}></List>
        </div>
      </Scroll>
      {enterLoading ? <Loading></Loading> : null}
    </Content>
  )
}


// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend','recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])
})
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
        dispatch(actionCreaters.getBannerList());
    },
    getRecommendListDataDispatch() {
        dispatch(actionCreaters.getRecommendList());
    }
  }
}
// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))

// export default React.memo(Recommend);
