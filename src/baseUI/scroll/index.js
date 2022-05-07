// import React,{ useEffect, useState } from 'react';
// import BScroll from "better-scroll";

// // forwardRef通过父组件向子组件自动传递 引用ref
// // 这个 ref 仅仅指向的是子组件，而不能知道子组件中的 DOM 节点。
// const Scroll = forwardRef((props, ref) => {
//   // better-scroll实例对象
//   const [bScroll, setBScroll] = useState();
//   // current指向初始化bs实例需要的DOM元素
//   const scrollContainerRef = useRef();
//   //上层组件代码
//   const scrollRef = useRef();

//   // better-scroll
//   useEffect(() => {
//     const scroll = new BScroll(scrollContainerRef.current, {
//       scrollX: direction === "horizental",
//       scrollY: direction === "vertical",
//       probeType: 3,
//       click: click,
//       bounce:{
//         top: bounceTop,
//         bottom: bounceBottom
//       }
//     });
//     setBScroll(scroll);
//     return () => { // 清除函数
//       setBScroll(null);
//     }
//   }, []);

//   // 每次重新渲染都要刷新实例，防止无法滑动
//   useEffect(() => {
//     if(refresh && bScroll){
//       bScroll.refresh();
//     }
//   });

//   // 给实例绑定 scroll 事件
//   useEffect(() => {
//     if(!bScroll || !onScroll) return;
//     bScroll.on('scroll', (scroll) => {
//       onScroll(scroll);
//     })
//     return () => {
//       bScroll.off('scroll');
//     }
//   }, [onScroll, bScroll]);

//   // 上拉刷新
//   useEffect(() => {
//     if(!bScroll || !pullUp) return;
//     bScroll.on('scrollEnd', () => {
//       //判断是否滑动到了底部
//       if(bScroll.y <= bScroll.maxScrollY + 100){
//         pullUp();
//       }
//     });
//     return () => {
//       bScroll.off('scrollEnd');
//     }
//   }, [pullUp, bScroll]);

//   // 下拉刷新
//   useEffect(() => {
//     if(!bScroll || !pullDown) return;
//     bScroll.on('touchEnd', (pos) => {
//       //判断用户的下拉动作
//       if(pos.y > 50) {
//         pullDown();
//       }
//     });
//     return () => {
//       bScroll.off('touchEnd');
//     }
//   }, [pullDown, bScroll]);

//   return (
//     <ScrollContainer ref={scrollContainerRef}>
//       {props.children}
//     </ScrollContainer>
//   )
// })


// // 可配置参数
// Scroll.propTypes = {
//   direction: PropTypes.oneOf(['vertical', 'horizental']),
//   refresh: PropTypes.bool,
//   onScroll: PropTypes.func,
//   pullUp: PropTypes.func,
//   pullDown: PropTypes.func,
//   pullUpLoading: PropTypes.bool,
//   pullDownLoading: PropTypes.bool,
//   bounceTop: PropTypes.bool,//是否支持向上吸顶
//   bounceBottom: PropTypes.bool//是否支持向上吸顶
// };
// export default Scroll;

import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import styled from 'styled-components';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const Scroll = forwardRef((props, ref) => {
    // better-scroll实例对象
    const [bScroll, setBScroll] = useState();
    // current指向初始化bs实例需要的DOM元素 
    const scrollContaninerRef = useRef();

    // 对象结构获取参数
    const { direction, click, refresh, bounceTop, bounceBottom } = props;
    const { pullUp, pullDown, onScroll } = props;

    // 创建 better-scroll
    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
          // 滚动方向
          scrollX: direction === "horizental",
          scrollY: direction === "vertical",
          // 有时候我们需要知道滚动的位置。
          // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
          probeType: 3,
          // 支持点击事件
          click: true,
          // 回弹
          bounce: {
              top: bounceTop,
              bottom: bounceBottom
          }
        });
        setBScroll(scroll);
        return () => {
            setBScroll(null);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 每次渲染都刷新实例，防止无法滑动
    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh();
        }
    });

    // 给实例绑定scroll事件
    useEffect(() => {
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', (scroll) => {
            onScroll(scroll);
        })
        return () => {
            bScroll.off('scroll');
        }
    }, [onScroll, bScroll]);

    // 进行上拉到底的判断，调用上拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullUp) return;
        bScroll.on('scrollEnd', () => {
            //判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUp();
            }
        });
        return () => {
            bScroll.off('scrollEnd');
        }
    }, [pullUp, bScroll]);

    // 进行下拉到底的判断，调用下拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullDown) return;
        bScroll.on('touchEnd', (pos) => {
            //判断用户的下拉动作
            if (pos.y > 50) {
                pullDown();
            }
        });
        return () => {
            bScroll.off('touchEnd');
        }
    }, [pullDown, bScroll]);

    // 一般和forwardRef一起使用，ref已经在forWardRef中默认传入
    useImperativeHandle(ref, () => ({
        //给外界暴露refresh方法
        refresh() {
            if (bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0, 0);
            }
        },
        //给外界暴露getBScroll方法, 提供bs实例
        getBScroll() {
            if (bScroll) {
                return bScroll;
            }
        }
    }));

    return (
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}
        </ScrollContainer>
    );
})

// 默认赋值
Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
};

// 类型检查
Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,//是否支持向上吸顶
    bounceBottom: PropTypes.bool//是否支持向上吸顶
};

export default Scroll;
